const express = require('express');
const http = require('http');
const { WebSocketServer } = require('ws');
const qrcode = require('qrcode');
const { QUESTIONS } = require('./questions');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.static('public'));

// Friendly routes (QR targets /play; presenter link /host).
app.get('/host', (req, res) => res.sendFile(require('path').join(__dirname, 'public', 'host.html')));
app.get('/play', (req, res) => res.sendFile(require('path').join(__dirname, 'public', 'play.html')));

// QR endpoint: build the join URL from the requesting host so it works on any deployment.
app.get('/api/qr', async (req, res) => {
  const url = `${req.protocol}://${req.headers.host}/play`;
  const dataUrl = await qrcode.toDataURL(url, { width: 320, margin: 1 });
  res.json({ url, dataUrl });
});

// ---------------------------------------------------------------------------
// Game state (single live session — supports many players).
// ---------------------------------------------------------------------------
const BASE_POINTS = 1000; // max per correct answer
let game = freshGame();

function freshGame() {
  return {
    phase: 'lobby',             // lobby | question | reveal | gameover
    current: -1,
    qStart: 0,                  // ms timestamp when current question began
    qTime: 20,                  // seconds for current question
    players: new Map(),         // id -> { id, name, score, answers[] }
    answers: new Map(),         // playerId -> { choice, elapsed }
    timer: null
  };
}

// Need JSON-serialisable player list helpers
function playerList() {
  return Array.from(game.players.values()).map(p => ({ id: p.id, name: p.name, score: p.score }));
}

function broadcast(msg, wsFilter) {
  let data;
  try { data = JSON.stringify(msg); } catch (e) { return; }
  wss.clients.forEach(c => {
    if (c.readyState === 1 && (!wsFilter || wsFilter(c))) c.send(data);
  });
}

function stateForHost() {
  const ranked = playerList().sort((a, b) => b.score - a.score);
  const total = QUESTIONS.length;
  return {
    type: 'hostState',
    phase: game.phase,
    current: game.current,
    total,
    qTime: game.qTime,
    qStart: game.qStart,
    players: ranked,
    answerCount: game.answers.size,
    playerCount: game.players.size,
    questions: QUESTIONS.map(q => ({ text: q.text, time: q.time })), // not answers shown to host view mid-game
    // include the live question payload so a (re)connected host renders even mid-question
    currentQuestion: (game.phase === 'question' && game.current >= 0)
      ? { text: QUESTIONS[game.current].text, options: QUESTIONS[game.current].options, time: QUESTIONS[game.current].time }
      : null
  };
}

function stateForPlayer(p) {
  return {
    type: 'playerState',
    phase: game.phase,
    current: game.current,
    total: QUESTIONS.length,
    qTime: game.qTime,
    qStart: game.qStart,
    myScore: p ? p.score : 0,
    rank: p ? rankOf(p.id) : 0,
    count: game.players.size
  };
}

function rankOf(id) {
  const ranked = playerList().sort((a, b) => b.score - a.score);
  return ranked.findIndex(p => p.id === id) + 1;
}

function sendTo(ws, msg) { if (ws.readyState === 1) ws.send(JSON.stringify(msg)); }

// Push up-to-date score/rank to every connected player.
function pushPlayerStates() {
  wss.clients.forEach(c => {
    if (c.readyState === 1 && c._role === 'player' && c._pid && game.players.has(c._pid)) {
      sendTo(c, stateForPlayer(game.players.get(c._pid)));
    }
  });
}

function clearTimer() { if (game.timer) { clearTimeout(game.timer); game.timer = null; } }

// ---------------------------------------------------------------------------
// Question lifecycle
// ---------------------------------------------------------------------------
function startQuestion(idx) {
  clearTimer();
  game.phase = 'question';
  game.current = idx;
  game.qTime = QUESTIONS[idx].time;
  game.qStart = Date.now();
  game.answers.clear();

  const q = QUESTIONS[idx];
  broadcast({ type: 'question', index: idx, total: QUESTIONS.length, time: q.qTime, qStart: game.qStart,
              text: q.text, options: q.options });
  await_state(); // push fresh state to host (q display handles options above)

  game.timer = setTimeout(() => reveal(), game.qTime * 1000 + 500);
}

function await_state() {
  // Push host state after the question broadcast so host UI stays in sync.
  broadcast(stateForHost(), c => c._role === 'host');
}

function reveal() {
  clearTimer();
  game.phase = 'reveal';
  const q = QUESTIONS[game.current];

  // Award points: correct => speed bonus scaled by how fast the player answered.
  const results = [];
  game.answers.forEach((a, pid) => {
    const p = game.players.get(pid);
    if (!p) return;
    let gained = 0;
    const correct = a.choice === q.correct;
    if (correct) {
      const ratio = Math.max(0, 1 - a.elapsed / game.qTime);
      gained = Math.round(BASE_POINTS * ratio);
    }
    p.score += gained;
    results.push({ pid, correct, gained });
  });

  broadcast({
    type: 'reveal',
    index: game.current,
    correct: q.correct,
    options: q.options,
    text: q.text,
    total: QUESTIONS.length,
    results
  });
  await_state();
  pushPlayerStates();

  // Auto-advance to next question unless this was the last one.
  if (game.current + 1 < QUESTIONS.length) {
    game.timer = setTimeout(() => startQuestion(game.current + 1), 8000);
  } else {
    endOfGame();
  }
}

function endOfGame() {
  clearTimer();
  game.phase = 'gameover';
  broadcast({ type: 'gameover', total: QUESTIONS.length });
  await_state();
  pushPlayerStates();
}

// ---------------------------------------------------------------------------
// WebSocket handling
// ---------------------------------------------------------------------------
wss.on('connection', ws => {
  ws._role = null;   // 'host' | 'player'
  ws._pid = null;

  ws.on('message', raw => {
    let msg;
    try { msg = JSON.parse(raw.toString()); } catch (e) { return; }

    if (msg.type === 'joinHost') {
      ws._role = 'host';
      sendTo(ws, stateForHost());
      return;
    }

    if (msg.type === 'join') {
      const name = String(msg.name || 'Player').trim().slice(0, 20) || 'Player';
      const id = Math.random().toString(36).slice(2, 10);
      ws._role = 'player';
      ws._pid = id;
      game.players.set(id, { id, name, score: 0 });
      broadcast({ type: 'joined', name, count: game.players.size }, c => c._role === 'host');
      sendTo(ws, { type: 'welcome', playerId: id, name });
      sendTo(ws, stateForPlayer(game.players.get(id)));
      await_state();
      return;
    }

    if (msg.type === 'answer' && ws._role === 'player' && ws._pid) {
      if (game.phase !== 'question' || msg.index !== game.current) return;
      if (game.answers.has(ws._pid)) return; // one answer per question
      const elapsed = (Date.now() - game.qStart) / 1000;
      // ignore late answers beyond the time window
      if (elapsed > game.qTime) return;
      game.answers.set(ws._pid, { choice: Number(msg.choice), elapsed });
      await_state();
      return;
    }

    // ---------- Host controls ----------
    if (msg.type === 'ctrl' && ws._role === 'host') {
      if (msg.action === 'start' && game.phase === 'lobby') {
        startQuestion(0);
      } else if (msg.action === 'next' && game.phase === 'reveal') {
        if (game.current + 1 < QUESTIONS.length) startQuestion(game.current + 1);
        else endOfGame();
      } else if (msg.action === 'reset') {
        // reset scores but keep names
        game.players.forEach(p => { p.score = 0; });
        game.phase = 'lobby';
        game.current = -1;
        clearTimer();
        broadcast({ type: 'reset' });
        await_state();
      } else if (msg.action === 'end') {
        endOfGame();
      }
    }
  });

  ws.on('close', () => {
    if (ws._role === 'player' && ws._pid && game.players.has(ws._pid)) {
      game.players.delete(ws._pid);
      broadcast({ type: 'left', count: game.players.size }, c => c._role === 'host');
      await_state();
    }
  });
});

// ---------------------------------------------------------------------------
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`QuizRush running on port ${PORT}`);
  console.log(`Questions loaded: ${QUESTIONS.length}`);
});

// Full end-to-end simulation. Run against a FRESH server (game in lobby).
const { WebSocket } = require('ws');
const { QUESTIONS } = require('./questions');
const URL = 'ws://localhost:3000';
const log = (...a) => console.log(...a);

function open(name) {
  return new Promise(res => {
    const ws = new WebSocket(URL);
    ws.name = name; ws.tally = 0; ws.wrong = 0; ws.seen = 0; ws.id = null;
    ws.on('open', () => res(ws));
  });
}

async function main() {
  const host = await open('host');
  host.send(JSON.stringify({type:'joinHost', name:'Host'}));
  const players = [await open('Player1'), await open('Player2'), await open('Player3')];
  players.forEach(p => p.send(JSON.stringify({type:'join', name:p.name})));

  let ready = 0;
  players.forEach(p => {
    p.on('message', d => {
      const m = JSON.parse(d);
      if (m.type === 'welcome') { p.id = m.playerId; ready++; }
      if (m.type === 'question') {
        const ci = QUESTIONS[m.index].correct;
        const slow = p.name === 'Player3';
        setTimeout(() => {
          const choice = slow ? (ci + 1) % m.options.length : ci;
          p.send(JSON.stringify({type:'answer', index:m.index, choice}));
        }, slow ? m.time * 900 : 250);
      }
      if (m.type === 'reveal') {
        p.seen++;
        const r = (m.results || []).find(x => x.pid === p.id);
        if (r && r.correct) p.tally += r.gained;
        if (r && !r.correct) p.wrong++;
        setTimeout(() => host.send(JSON.stringify({type:'ctrl', action:'next'})), 120);
      }
    });
  });

  while (ready < 3) await new Promise(r => setTimeout(r, 50));
  host.send(JSON.stringify({type:'ctrl', action:'start'}));

  const start = Date.now();
  while (Date.now() - start < 260000) {
    if (players.every(p => p.seen >= QUESTIONS.length)) break;
    await new Promise(r => setTimeout(r, 300));
  }

  log('=== FINAL RESULTS (full playthrough) ===');
  const rows = players.map(p => ({ name: p.name, score: p.tally, wrong: p.wrong, seen: p.seen }));
  rows.sort((a, b) => b.score - a.score);
  rows.forEach(r => log(`  ${r.name}: ${r.score} pts  (wrong: ${r.wrong}, questions seen: ${r.seen})`));

  const one = rows.find(r => r.name === 'Player1').score;
  const two = rows.find(r => r.name === 'Player2').score;
  const three = rows.find(r => r.name === 'Player3').score;
  console.log('\n✔ Player1 & Player2 equal (both fast-correct)?', one === two);
  console.log('✔ Player3 (slow/wrong) lowest?', three < one && three <= two);
  console.log('✔ Fast-correct scored high (>7000)?', one >= 7000 && two >= 7000);
  console.log(one === two && three < one && one >= 7000 ? '\nPASS ✅' : '\nFAIL ❌');
  process.exit(0);
}
main().catch(e => { console.error(e); process.exit(1); });

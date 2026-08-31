# ⚡ QuizRush — Rapid Timed Quiz (Endpoint Security × Trend Micro)

A Kahoot-style, real-time quiz that runs in the browser. A presenter shows the **host screen**,
players scan a **QR code** to join on their own phones, and everyone answers **10 rapid-fire
questions** on endpoint security (with Trend Micro product references). The **winner is decided
by correct answers + answer speed** (faster correct answer = more points).

---

## What's built

| Feature | How it works |
|---|---|
| **QR join** | `/api/qr` generates a QR pointing at `/play` on the *current host*, so it works on localhost or a deployed URL |
| **Real-time** | WebSockets (`ws`) — instantly pushes questions, answers, and leaderboard to every device |
| **Timing** | Each question has a visible countdown bar + timer; answers past the deadline are rejected |
| **Scoring** | Correct answer = **up to 1000 pts**, scaled by how fast you answered. Wrong/no answer = 0 |
| **10 questions** | Defined in `questions.js` — easy to edit |
| **Winner** | Based on total points (accuracy × speed). Host can press **Next** to skip ahead |
| **Live leaderboard** | Host sees ranked players; reveal shows who was right/wrong and points gained |

### Tech stack
- **Node.js** + **Express** and **ws** (WebSockets)
- Browser frontend (no build step — plain HTML/CSS/JS)
- `qrcode` for the join QR code

---

## Run it

```bash
npm install        # install dependencies
npm start          # or: node server.js
```

Open **http://localhost:3000** — then click **Open Presenter (Host) Screen**.
You'll see the QR code. Scan it (or open `/play`) from any phone on the network
to join as a player. Press **Start Quiz** and go!

For real deployment (e.g., on a server your audience can reach), the QR code automatically
uses whatever host you're served from.

> ⚠️ The QR only works if phones can reach the host. For a live event, expose the server on
> a public URL or the same LAN (`node listen on 0.0.0.0` — already set). Set `PORT` to change
> the port: `PORT=8080 node server.js`.

---

## Game flow

1. **Lobby** — presenter /host shows QR; players scan `/play`, type a name, join.
2. **Question** — countdown starts. Players tap an option. Points awarded live.
3. **Reveal** — shows the correct answer and each player's result/points gained.
4. **...repeat for 10 questions...** — host can press **Next** to skip a reveal early.
5. **Game over** — final leaderboard + 🏆 winner. **Play Again** resets scores (keeps names).

### Host controls
- **Start Quiz** (lobby)
- **Next Question** (during reveal — skip forward)
- **End Game** (finish now and show winner)
- **Play Again** (reset scores)

---

## Editing the questions

Open `questions.js`. Each entry:

```js
{
  text: "What is ENDPOINT SECURITY designed primarily to protect?",
  options: ["...A...", "...B...", "...C...", "...D..."],
  correct: 1,        // index (0-based) of the correct option
  time: 20           // seconds allowed for this question
}
```

You can change the number of questions, the answers, and the per-question time freely.
The score multiplier (`BASE_POINTS`) is in `server.js` (default 1000).

---

## Files

```
server.js        WebSocket server + game engine + QR endpoint
questions.js     the quiz bank (edit this)
public/host.html presenter / host screen
public/play.html player screens (join, answer, results)
public/index.html landing page
test-simulation.js  automated end-to-end test of 3 simulated players
```

## Verify with the simulator

With the server running and **back in the lobby** (restart it to be safe):

```bash
node test-simulation.js
```

Simulates 2 fast-correct players and 1 slow-wrong player, and checks the scoring is correct.

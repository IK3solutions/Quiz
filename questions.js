// Quiz content: Endpoint Security fundamentals, with Trend Micro product references.
// Each question: text, options[4], correct (index of correct option), time (seconds).
// A question flagged "tf" still uses 2 options (True / False).

const QUESTIONS = [
  {
    text: "What is ENDPOINT SECURITY designed primarily to protect?",
    options: [
      "The corporate email server only",
      "End-user devices — laptops, desktops, servers and mobile devices",
      "The building's Wi-Fi routers",
      "Only cloud-hosted databases"
    ],
    correct: 1,
    time: 20
  },
  {
    text: "Which Trend Micro solution protects endpoint devices for businesses?",
    options: [
      "Trend Micro Apex One",
      "Trend Micro antivirus for home only",
      "Trend Micro Deep Freeze",
      "Trend Micro Anti-Virus Shredder"
    ],
    correct: 0,
    time: 20
  },
  {
    text: "What does the acronym XDR stand for in Trend Micro's portfolio?",
    options: [
      "Extended Detection and Response",
      "External Data Restoration",
      "Exclusive Device Registry",
      "Extra Defense Routine"
    ],
    correct: 0,
    time: 20
  },
  {
    text: "TRUE or FALSE: A complete endpoint security suite should typically include anti-malware, a personal firewall, and device control.",
    options: ["True", "False"],
    correct: 0,
    time: 15
  },
  {
    text: "Which of these is the MOST common way ransomware gets an initial foothold on an endpoint?",
    options: [
      "Direct USB hardware faults",
      "Phishing emails with malicious attachments or links",
      "Normal operating system updates",
      "A screen going to sleep"
    ],
    correct: 1,
    time: 20
  },
  {
    text: "What is a ZERO-DAY vulnerability?",
    options: [
      "A bug that only appears on the first day of the month",
      "A flaw that is exploited before the vendor releases a patch",
      "A vulnerability that is impossible to fix",
      "A bug with no severity rating"
    ],
    correct: 1,
    time: 20
  },
  {
    text: "Trend Micro's predictive machine learning and behaviour monitoring let consoles detect new malware. What do these techniques run a suspicious file in FIRST?",
    options: [
      "A sandbox — an isolated environment to watch its behaviour",
      "A live production server",
      "The public internet",
      "A text editor"
    ],
    correct: 0,
    time: 20
  },
  {
    text: "Which BEST-PRACTICE step most reduces the risk of endpoint exploitation?",
    options: [
      "Keeping the OS and software patched and updated",
      "Disabling all security agents",
      "Sharing one shared admin account",
      "Using only the default browser settings"
    ],
    correct: 0,
    time: 20
  },
  {
    text: "TRUE or FALSE: A sandbox analysis in endpoint security can safely 'detonate' suspect files without harming the real network.",
    options: ["True", "False"],
    correct: 0,
    time: 15
  },
  {
    text: "Which Trend Micro platform helps security teams VISUALISE endpoint detections alongside email and network telemetry in one place?",
    options: [
      "Trend Micro Vision One",
      "Trend Micro Calendar",
      "Trend Micro Editor",
      "Trend Micro Music Studio"
    ],
    correct: 0,
    time: 20
  }
];

module.exports = { QUESTIONS };

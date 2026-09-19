// IK3 Community — Basic Cybersecurity Rapid Round
// Short, simple and funny questions for a fast live quiz.
// Correct answers are randomized across positions 1–4.

// Each question: text, options[4], correct (0-based), time (seconds).

const QUESTIONS = [
  {
    text: "What is phishing?",
    options: [
      "A firewall",
      "An antivirus",
      "A game",
      "A fake message to steal information"
    ],
    correct: 3,
    time: 12
  },

  {
    text: "Which password is safer?",
    options: [
      "T!ger#92",
      "123456",
      "111111",
      "password"
    ],
    correct: 0,
    time: 10
  },

  {
    text: "What should you do with a strange link?",
    options: [
      "Open it quickly",
      "Check it first",
      "Click it",
      "Share it"
    ],
    correct: 1,
    time: 10
  },

  {
    text: "What does MFA do?",
    options: [
      "Deletes viruses",
      "Increases storage",
      "Makes Wi-Fi faster",
      "Adds extra login security"
    ],
    correct: 3,
    time: 10
  },

  {
    text: "What is ransomware?",
    options: [
      "An antivirus",
      "A browser",
      "Malware that locks your files",
      "A game"
    ],
    correct: 2,
    time: 12
  },

  {
    text: "What should you do with a strange USB?",
    options: [
      "Do not use it",
      "Format your PC",
      "Plug it in",
      "Share it"
    ],
    correct: 0,
    time: 10
  },

  {
    text: "What does a firewall mainly protect?",
    options: [
      "Your coffee",
      "Your network",
      "Your chair",
      "Your keyboard"
    ],
    correct: 1,
    time: 10
  },

  {
    text: "Should you share your OTP?",
    options: [
      "Only on WhatsApp",
      "No",
      "Yes",
      "Only with friends"
    ],
    correct: 1,
    time: 10
  },

  {
    text: "What should you do with a suspicious email?",
    options: [
      "Check the sender",
      "Forward it",
      "Click the link",
      "Reply immediately"
    ],
    correct: 0,
    time: 10
  },

  {
    text: "Which one is malware?",
    options: [
      "Virus",
      "All of these",
      "Trojan",
      "Ransomware"
    ],
    correct: 1,
    time: 10
  },

  {
    text: "Should you use the same password everywhere?",
    options: [
      "Only at work",
      "Yes",
      "No",
      "Only for social media"
    ],
    correct: 2,
    time: 10
  },

  {
    text: "You get a message: You won ₹10 Lakhs! What do you do?",
    options: [
      "Share with friends",
      "Check if it is real",
      "Click immediately",
      "Send bank details"
    ],
    correct: 1,
    time: 12
  },

  {
    text: "What should you do after using a public computer?",
    options: [
      "Save your password",
      "Give it to a friend",
      "Log out",
      "Leave it logged in"
    ],
    correct: 2,
    time: 10
  },

  {
    text: "What should you do with an unknown email attachment?",
    options: [
      "Forward it",
      "Do not open it",
      "Download it",
      "Open it"
    ],
    correct: 1,
    time: 10
  },

  {
    text: "Who is responsible for cybersecurity?",
    options: [
      "Only the firewall",
      "Everyone",
      "Only the IT team",
      "Only the security team"
    ],
    correct: 1,
    time: 10
  }
];

module.exports = { QUESTIONS };

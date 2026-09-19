// IK3 Community — Basic Cybersecurity Rapid Round
// Short, simple and funny questions for a fast live quiz.
// Each question: text, options[4], correct (0-based), time (seconds).

const QUESTIONS = [
  {
    text: "What is phishing?",
    options: [
      "A game",
      "A fake message to steal information",
      "A firewall",
      "An antivirus"
    ],
    correct: 1,
    time: 12
  },
  {
    text: "Which password is safer?",
    options: [
      "123456",
      "password",
      "T!ger#92",
      "111111"
    ],
    correct: 2,
    time: 10
  },
  {
    text: "What should you do with a strange link?",
    options: [
      "Click it",
      "Share it",
      "Check it first",
      "Open it quickly"
    ],
    correct: 2,
    time: 10
  },
  {
    text: "What does MFA do?",
    options: [
      "Makes Wi-Fi faster",
      "Adds extra login security",
      "Deletes viruses",
      "Increases storage"
    ],
    correct: 1,
    time: 10
  },
  {
    text: "What is ransomware?",
    options: [
      "A game",
      "Malware that locks your files",
      "An antivirus",
      "A browser"
    ],
    correct: 1,
    time: 12
  },
  {
    text: "What should you do with a strange USB?",
    options: [
      "Plug it in",
      "Do not use it",
      "Share it",
      "Format your PC"
    ],
    correct: 1,
    time: 10
  },
  {
    text: "What does a firewall mainly protect?",
    options: [
      "Your chair",
      "Your keyboard",
      "Your network",
      "Your coffee"
    ],
    correct: 2,
    time: 10
  },
  {
    text: "Should you share your OTP?",
    options: [
      "Yes",
      "Only with friends",
      "Only on WhatsApp",
      "No"
    ],
    correct: 3,
    time: 10
  },
  {
    text: "What should you do with a suspicious email?",
    options: [
      "Click the link",
      "Reply immediately",
      "Check the sender",
      "Forward it"
    ],
    correct: 2,
    time: 10
  },
  {
    text: "Which one is malware?",
    options: [
      "Ransomware",
      "Virus",
      "Trojan",
      "All of these"
    ],
    correct: 3,
    time: 10
  },
  {
    text: "Should you use the same password everywhere?",
    options: [
      "Yes",
      "No",
      "Only for social media",
      "Only at work"
    ],
    correct: 1,
    time: 10
  },
  {
    text: "You get a message: You won ₹10 Lakhs! What do you do?",
    options: [
      "Click immediately",
      "Send bank details",
      "Check if it is real",
      "Share with friends"
    ],
    correct: 2,
    time: 12
  },
  {
    text: "What should you do after using a public computer?",
    options: [
      "Leave it logged in",
      "Save your password",
      "Log out",
      "Give it to a friend"
    ],
    correct: 2,
    time: 10
  },
  {
    text: "What should you do with an unknown email attachment?",
    options: [
      "Open it",
      "Download it",
      "Do not open it",
      "Forward it"
    ],
    correct: 2,
    time: 10
  },
  {
    text: "Who is responsible for cybersecurity?",
    options: [
      "Only the IT team",
      "Only the firewall",
      "Only the security team",
      "Everyone"
    ],
    correct: 3,
    time: 10
  }
];

module.exports = { QUESTIONS };

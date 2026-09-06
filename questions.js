// Quiz content: Basic Bitdefender GravityZone fundamentals.
// Each question: text, options[4], correct (index of correct option), time (seconds).
// A question flagged "tf" still uses 2 options (True / False).

const QUESTIONS = [
  {
    text: "What is Bitdefender GravityZone mainly used for?",
    options: [
      "Managing and protecting security across endpoints",
      "Managing company payroll",
      "Creating websites",
      "Monitoring office attendance"
    ],
    correct: 0,
    time: 20
  },
  {
    text: "Which devices can GravityZone help protect?",
    options: [
      "Only printers",
      "Endpoints such as laptops, desktops and servers",
      "Only mobile phones",
      "Only network switches"
    ],
    correct: 1,
    time: 20
  },
  {
    text: "Where do administrators manage security policies and endpoint protection in GravityZone?",
    options: [
      "GravityZone Control Center",
      "Windows Notepad",
      "Microsoft Paint",
      "BIOS Setup"
    ],
    correct: 0,
    time: 20
  },
  {
    text: "TRUE or FALSE: GravityZone can provide malware protection for endpoints.",
    options: ["True", "False"],
    correct: 0,
    time: 15
  },
  {
    text: "What is the main purpose of an endpoint security policy in GravityZone?",
    options: [
      "To define how security controls should protect devices",
      "To increase internet speed",
      "To change the company logo",
      "To create employee salaries"
    ],
    correct: 0,
    time: 20
  },
  {
    text: "What should an administrator do when GravityZone reports a malware detection?",
    options: [
      "Ignore the alert immediately",
      "Review the alert and follow the configured remediation process",
      "Disable all endpoint protection",
      "Restart every server without checking the alert"
    ],
    correct: 1,
    time: 20
  },
  {
    text: "What does an endpoint agent do on a protected device?",
    options: [
      "Applies security controls and communicates with GravityZone",
      "Only changes the desktop wallpaper",
      "Acts as a printer driver",
      "Replaces the operating system"
    ],
    correct: 0,
    time: 20
  },
  {
    text: "Which security capability helps detect suspicious activity by looking at how programs behave?",
    options: [
      "Behavior-based detection",
      "Screen brightness control",
      "Disk formatting",
      "Keyboard layout"
    ],
    correct: 0,
    time: 20
  },
  {
    text: "TRUE or FALSE: Keeping endpoint operating systems and applications updated helps reduce security risk.",
    options: ["True", "False"],
    correct: 0,
    time: 15
  },
  {
    text: "What is one useful benefit of centralized endpoint security management with GravityZone?",
    options: [
      "Security settings and alerts can be managed from one console",
      "Every device must be configured manually with no console",
      "It removes the need for user authentication",
      "It guarantees that no security incident can ever happen"
    ],
    correct: 0,
    time: 20
  }
];

module.exports = { QUESTIONS };

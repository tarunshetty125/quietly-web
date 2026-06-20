import type { ModeData, SmartActionState, CompetitorRow, StatItem, PlatformCard } from "./types";

export const MODES: ModeData[] = [
  {
    id: "interview",
    name: "Interview",
    icon: "🎯",
    color: "199 89% 48%",
    description: "Answer behavioral and situational questions with STAR structure, natural speech patterns, and resume-grounded confidence.",
    quickActions: [
      { id: "star", label: "STAR Response", icon: "🌟" },
      { id: "resume", label: "Resume Alignment", icon: "📄" },
      { id: "confidence", label: "Confidence Coach", icon: "🗣️" },
      { id: "improve", label: "Improve", icon: "📈" },
    ],
    noteTemplate: ["Behavioral Questions", "STAR Responses", "Weak Areas", "Improvements"],
  },
  {
    id: "sales",
    name: "Sales",
    icon: "💼",
    color: "142 71% 45%",
    description: "Close deals with strategic discovery, real-time objection handling, pricing reframes, and next-step momentum.",
    quickActions: [
      { id: "objection", label: "Handle Objection", icon: "🛟" },
      { id: "pricing", label: "Pricing Response", icon: "💰" },
      { id: "discovery", label: "Discovery Question", icon: "🧭" },
      { id: "negotiate", label: "Negotiation Angle", icon: "🤝" },
    ],
    noteTemplate: ["Pain Points", "Objections", "Pricing Discussion", "Next Steps"],
  },
  {
    id: "technical",
    name: "Technical",
    icon: "⚙️",
    color: "262 83% 58%",
    description: "Ace DSA and coding rounds with structured reasoning, complete runnable code, complexity analysis, and edge case coverage.",
    quickActions: [
      { id: "hint", label: "Hint", icon: "🧩" },
      { id: "solution", label: "Solution", icon: "⚙️" },
      { id: "complexity", label: "Complexity", icon: "⏱️" },
      { id: "edge", label: "Edge Cases", icon: "🛡️" },
    ],
    noteTemplate: ["Question Asked", "Approach", "Complexity", "Follow-ups"],
  },
  {
    id: "system-design",
    name: "System Design",
    icon: "🏗️",
    color: "33 100% 52%",
    description: "Generate architecture diagrams with 12–60+ nodes, tradeoff analysis, scale estimation, and technology recommendations.",
    quickActions: [
      { id: "tradeoffs", label: "Tradeoffs", icon: "⚖️" },
      { id: "clarify", label: "Clarify", icon: "❓" },
      { id: "approaches", label: "Approaches", icon: "🧠" },
      { id: "deepdive", label: "Deep Dive", icon: "🔍" },
    ],
    noteTemplate: ["Requirements", "Architecture", "Tradeoffs", "Scale Estimates"],
  },
  {
    id: "lecture",
    name: "Lecture",
    icon: "📘",
    color: "199 89% 48%",
    description: "Capture key concepts, formulas, and frameworks from lectures in real-time with study-ready notes.",
    quickActions: [
      { id: "explain", label: "Explain Concept", icon: "📘" },
      { id: "summarize", label: "Summarize Section", icon: "📝" },
      { id: "takeaway", label: "Key Takeaway", icon: "⭐" },
      { id: "questions", label: "Questions to Ask", icon: "🙋" },
    ],
    noteTemplate: ["Key Concepts", "Questions", "Examples", "Learnings"],
  },
  {
    id: "recruiting",
    name: "Recruiting",
    icon: "🔎",
    color: "262 83% 58%",
    description: "Evaluate candidates with structured signal detection — ownership, leadership, impact, and red-flag analysis.",
    quickActions: [
      { id: "strength", label: "Candidate Strength", icon: "✅" },
      { id: "redflag", label: "Red Flag", icon: "🚩" },
      { id: "followup", label: "Follow-up Question", icon: "🔎" },
      { id: "evaluation", label: "Evaluation", icon: "📋" },
    ],
    noteTemplate: ["Strengths", "Concerns", "Signals", "Recommendation"],
  },
  {
    id: "team",
    name: "Team Meeting",
    icon: "👥",
    color: "142 71% 45%",
    description: "Track action items, decisions, blockers, and owners from standups, planning, and retrospectives.",
    quickActions: [
      { id: "decision", label: "Decision", icon: "🧾" },
      { id: "action", label: "Action Item", icon: "✅" },
      { id: "blocker", label: "Blocker", icon: "⚠️" },
      { id: "owner", label: "Owner", icon: "👤" },
    ],
    noteTemplate: ["Decisions", "Action Items", "Risks", "Owners"],
  },
  {
    id: "negotiation",
    name: "Negotiation",
    icon: "💰",
    color: "33 100% 52%",
    description: "Negotiate compensation with market data anchoring, counter-offer language, BATNA strategy, and confidence coaching.",
    quickActions: [
      { id: "negotiate_action", label: "Negotiate", icon: "🤝" },
      { id: "counter", label: "Counter", icon: "💰" },
      { id: "confidence_neg", label: "Confidence", icon: "🗣️" },
      { id: "anchor", label: "Anchor", icon: "⚓" },
    ],
    noteTemplate: ["Offer Details", "Market Data", "Counter Strategy", "BATNA"],
  },
  {
    id: "demo",
    name: "Demo",
    icon: "🎬",
    color: "199 89% 48%",
    description: "Present products with live objection handling, feature storytelling, and audience engagement analysis.",
    quickActions: [
      { id: "feature_highlight", label: "Feature Highlight", icon: "✨" },
      { id: "objection_demo", label: "Handle Objection", icon: "🛟" },
      { id: "story", label: "Tell Story", icon: "📖" },
      { id: "engage", label: "Engage Audience", icon: "🎯" },
    ],
    noteTemplate: ["Features Shown", "Objections", "Interest Signals", "Follow-ups"],
  },
  {
    id: "brainstorm",
    name: "Brainstorm",
    icon: "💡",
    color: "262 83% 58%",
    description: "Generate ideas, explore possibilities, and converge on solutions with structured creative thinking.",
    quickActions: [
      { id: "ideate", label: "Generate Ideas", icon: "💡" },
      { id: "expand", label: "Expand", icon: "🔄" },
      { id: "converge", label: "Converge", icon: "🎯" },
      { id: "synthesize", label: "Synthesize", icon: "🧬" },
    ],
    noteTemplate: ["Ideas Generated", "Top Candidates", "Evaluation", "Next Steps"],
  },
  {
    id: "general",
    name: "General",
    icon: "⚡",
    color: "0 0% 65%",
    description: "Adaptive everyday copilot for any unstructured meeting. Dynamically switches to specialized modes when it detects context.",
    quickActions: [
      { id: "suggest", label: "Suggest", icon: "💡" },
      { id: "clarify_gen", label: "Clarify", icon: "❓" },
      { id: "brainstorm_gen", label: "Brainstorm", icon: "🧠" },
      { id: "followup_gen", label: "Follow Up", icon: "↩️" },
    ],
    noteTemplate: ["Summary", "Action Items", "Key Points", "Decisions"],
  },
];

export const SMART_ACTION_STATES: SmartActionState[] = [
  {
    id: "interview",
    modeName: "Interview",
    modeColor: "199 89% 48%",
    transcript: "Tell me about a time you led a project under pressure.",
    actions: [
      { id: "star", label: "STAR Response", icon: "🌟" },
      { id: "resume", label: "Resume Align", icon: "📄" },
      { id: "confidence", label: "Confidence", icon: "🗣️" },
      { id: "improve", label: "Improve", icon: "📈" },
    ],
    recommendedId: "star",
  },
  {
    id: "system-design",
    modeName: "System Design",
    modeColor: "33 100% 52%",
    transcript: "Design a URL shortener that handles 100M daily active users.",
    actions: [
      { id: "tradeoffs", label: "Tradeoffs", icon: "⚖️" },
      { id: "clarify", label: "Clarify", icon: "❓" },
      { id: "approaches", label: "Approaches", icon: "🧠" },
      { id: "deepdive", label: "Deep Dive", icon: "🔍" },
    ],
    recommendedId: "tradeoffs",
  },
  {
    id: "negotiation",
    modeName: "Negotiation",
    modeColor: "33 100% 52%",
    transcript: "We'd like to offer you $145,000 base. What are your thoughts?",
    actions: [
      { id: "negotiate", label: "Negotiate", icon: "🤝" },
      { id: "counter", label: "Counter", icon: "💰" },
      { id: "confidence_neg", label: "Confidence", icon: "🗣️" },
      { id: "anchor", label: "Anchor", icon: "⚓" },
    ],
    recommendedId: "counter",
  },
];

export const STATS: StatItem[] = [
  { label: "Modes", value: 11 },
  { label: "AI Brains", value: 8 },
  { label: "Smart Actions", value: 51 },
  { label: "Providers", value: 8, suffix: "+" },
  { label: "Response", value: 2, prefix: "<", suffix: "s" },
  { label: "Purchase", value: 1, suffix: "×" },
];

export const COMPARISON: CompetitorRow[] = [
  { feature: "12-month cost", quietly: "~$99", cluely: "$1,800", finalRound: "$300–500", lockedIn: "$576–792" },
  { feature: "Meeting Modes", quietly: "11", cluely: "1", finalRound: "1", lockedIn: "2" },
  { feature: "Smart Actions", quietly: "51", cluely: false, finalRound: false, lockedIn: false },
  { feature: "AI Brains", quietly: "8", cluely: false, finalRound: false, lockedIn: "Basic" },
  { feature: "Phone Mirror", quietly: true, cluely: false, finalRound: false, lockedIn: false },
  { feature: "Architecture Diagrams", quietly: true, cluely: false, finalRound: false, lockedIn: false },
  { feature: "Local AI Processing", quietly: true, cluely: false, finalRound: false, lockedIn: false },
  { feature: "Stealth Architecture", quietly: "7-layer", cluely: "Basic CSS", finalRound: "Basic", lockedIn: "Basic" },
  { feature: "Data Breaches", quietly: "None", cluely: "83K users", finalRound: "None", lockedIn: "None" },
];

export const PLATFORM_CARDS: PlatformCard[] = [
  {
    kicker: "PROVIDERS",
    headline: "8+ AI Models",
    description: "Claude, GPT-4o, Gemini, Bedrock, Ollama, Codex CLI. Bring your own API keys.",
    items: ["Claude", "GPT-4o", "Gemini", "Bedrock", "Ollama", "Codex CLI"],
  },
  {
    kicker: "SKILLS",
    headline: "Type / to invoke",
    description: "Built-in skills and custom SKILL.md files. Summarize, draft replies, analyze — instant workflows.",
    items: ["Summarize", "Draft Reply", "Analyze", "Code Review", "Meeting Notes", "Custom"],
  },
  {
    kicker: "CALENDAR",
    headline: "Pre-Meeting Prep",
    description: "Connect Google Calendar. Get pre-meeting context, likely topics, and mode recommendations.",
    items: ["Event sync", "Mode suggestion", "Participant context", "Saved notes"],
  },
];

export const STEALTH_LAYERS = [
  "Undetectable by screen sharing",
  "Invisible to recordings",
  "Hidden from Mission Control",
  "Process identity masked",
  "Window title disguised",
  "Environment scrubbed",
  "No system trace",
];

export const CAPABILITIES = [
  { icon: "🎤", name: "Live Transcription", description: "Real-time speech-to-text with Whisper and cloud fallback" },
  { icon: "📸", name: "Screenshot OCR", description: "Capture screen, extract text, ask AI about what's visible" },
  { icon: "⚡", name: "Smart Actions", description: "Hint, Solution, Complexity, Tradeoffs, Deep Dive, STAR" },
  { icon: "🖱️", name: "Mouse Passthrough", description: "Overlay visible, clicks pass through to apps beneath" },
  { icon: "⌨️", name: "Keyboard Shortcuts", description: "Cmd+B toggle, global shortcuts, zero mouse required" },
  { icon: "📜", name: "Response History", description: "Navigate, pin, and revisit previous AI responses" },
];

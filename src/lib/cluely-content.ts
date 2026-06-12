import type {
  CompatibilityTool,
  FaqItem,
  UndetectabilityPerson,
} from "@/types/cluely";

export const faqItems: FaqItem[] = [
  {
    question: "What does Quietly AI do during a live meeting?",
    answer:
      "Quietly AI listens alongside you, understands the conversation, and gives you useful answers while the meeting is still happening. It can surface context, suggest responses, capture action items, and help you stay ready without interrupting the call.",
  },
  {
    question: "How is Quietly AI different from a normal AI notetaker?",
    answer:
      "Most AI notetakers summarize the meeting after it ends. Quietly AI is built for the moment itself, so it can help with live questions, objections, follow-ups, and decisions while you are still talking.",
  },
  {
    question: "Can other people see Quietly AI on my screen?",
    answer:
      "Quietly AI is designed to stay visible only to you. It does not join as a meeting participant, and its overlay is built to stay out of recordings and screen shares so you can use it discreetly during calls.",
  },
  {
    question: "Does Quietly AI create meeting notes too?",
    answer:
      "Yes. Quietly AI can turn the conversation into clean notes, summaries, action items, and follow-ups after the meeting. You get both live assistance during the call and organized notes when it is done.",
  },
  {
    question: "Which meeting apps does Quietly AI work with?",
    answer:
      "Quietly AI works with major meeting platforms including Zoom, Google Meet, Microsoft Teams, Webex, and Slack calls. It is built for everyday calls, interviews, sales meetings, lectures, and client conversations.",
  },
  {
    question: "Who should use Quietly AI?",
    answer:
      "Quietly AI is for anyone who needs to perform better in conversations: founders, sales teams, recruiters, consultants, students, managers, and operators who want real-time support without losing focus.",
  },
];

export const compatibilityTools: CompatibilityTool[] = [
  { name: "Zoom", icon: "/images/cluely/zoom.398e9568.png" },
  { name: "Slack", icon: "/images/cluely/slack.0e754017.png" },
  { name: "Webex", icon: "/images/cluely/webex.6e65e4a4.png" },
  { name: "Microsoft Teams", icon: "/images/cluely/teams.845b90a5.png" },
  { name: "Google Meet", icon: "/images/cluely/meet.7640c976.png" },
];

export const meetingParticipants: UndetectabilityPerson[] = [
  {
    name: "Gina Huels",
    email: "ginahue65@quietly.ai",
    role: "Owner",
    image: "/images/cluely/gina-huels.b14409cf.png",
    isCurrentUser: true,
  },
  {
    name: "Todd Cremin",
    email: "todd.cremin@quietly.ai",
    role: "Speaker",
    image: "/images/cluely/todd-cremin.9cbbdf9c.png",
  },
  {
    name: "Holly Gleason",
    email: "holly_gleaso1972@quietly.ai",
    role: "Speaker",
    image: "/images/cluely/holly-gleason.528905fb.png",
  },
  {
    name: "Tomas Hansen",
    email: "tomas_hansen@quietly.ai",
    role: "Speaker",
    image: "/images/cluely/tomas-hansen.5f58da3e.png",
  },
];

import type {
  CompatibilityTool,
  FaqItem,
  FooterColumn,
  UndetectabilityPerson,
} from "@/types/cluely";

export const faqItems: FaqItem[] = [
  {
    question: "Why real-time vs. a regular AI notetaker?",
    answer:
      "Unlike regular AI notetakers like Otter or Granola that work after your meeting ends, Cluely provides real-time meeting intelligence during your calls. While other AI meeting assistants create meeting summaries afterward, Cluely helps you answer technical questions, handle objections, and perform better during high-stakes conversations.",
  },
  {
    question: "Who is Cluely for?",
    answer:
      "Cluely is perfect for students, professionals, sales teams, recruiters, consultants, executives, and anyone who needs to perform well in meetings. If you're in back-to-back sales calls, lectures, or client meetings where you can't afford to look unprepared, Cluely delivers you answers at moments when you most need them.",
  },
  {
    question: "Is Cluely free?",
    answer:
      "Yes, you can use Cluely's AI meeting assistant for free, and you will have limited access to all core Cluely features. The pro plan gives you access to unlimited meeting notes and unlimited AI responses with Cluely.",
  },
  {
    question: "How is it undetectable in meetings?",
    answer:
      "Unlike other meeting AI tools, it never joins your calls as a participant, doesn't appear in meeting recordings, and won't show up in screen shares. It captures meeting audio in the background and provides a discreet, translucent overlay that only you can see, making it completely undetectable to other meeting participants.",
  },
  {
    question: "What languages and apps are supported?",
    answer:
      "Cluely's AI meeting assistant works with all major meeting platforms including Zoom, Microsoft Teams, Webex, and Slack calls. It supports English and major international languages for meeting transcription and real-time insights.",
  },
  {
    question: "Can I talk to customer support?",
    answer:
      "Yes, our support team is available to help you get the most out of your AI meeting assistant. You can reach out via live chat, email, or through the support center. We provide technical support and help with optimizing Cluely for your specific meeting and sales workflows.",
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
    email: "ginahue65@cluely.com",
    role: "Owner",
    image: "/images/cluely/gina-huels.b14409cf.png",
    isCurrentUser: true,
  },
  {
    name: "Todd Cremin",
    email: "todd.cremin@cluely.com",
    role: "Speaker",
    image: "/images/cluely/todd-cremin.9cbbdf9c.png",
  },
  {
    name: "Holly Gleason",
    email: "holly_gleaso1972@cluely.com",
    role: "Speaker",
    image: "/images/cluely/holly-gleason.528905fb.png",
  },
  {
    name: "Tomas Hansen",
    email: "tomas_hansen@cluely.com",
    role: "Speaker",
    image: "/images/cluely/tomas-hansen.5f58da3e.png",
  },
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Resources",
    links: [
      { label: "Mobile", href: "/mobile", badge: "New" },
      { label: "Manifesto", href: "/manifesto" },
      { label: "Press", href: "/press" },
      { label: "Bug Bounty", href: "https://cluelyhq.notion.site/bugbounty" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "https://support.cluely.com/en/" },
      { label: "Contact Us", href: "mailto:help@cluely.com" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Subprocessors", href: "/subprocessors" },
    ],
  },
];

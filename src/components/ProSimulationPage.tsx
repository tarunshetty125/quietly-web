"use client";

import {
  Check,
  ChevronRight,
  RefreshCw,
  Sparkles,
  Zap,
} from "lucide-react";
import {
  type Dispatch,
  type RefObject,
  type SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { lifetimePurchaseHref } from "@/lib/purchase";
import { cn } from "@/lib/utils";
import { FadingVideo } from "@/components/pro/FadingVideo";

type Pane = "free" | "pro";
type ChipKey = "what" | "shorten" | "recap" | "fup" | "answer";
type MessageKind = "user" | "answer" | "citation" | "negotiation" | "followups" | "thinking";

type SimMessage = Readonly<{
  id: string;
  kind: MessageKind;
  text: string;
  citations?: readonly string[];
  followups?: readonly string[];
}>;

type PanelCopy = Readonly<{
  tier: string;
  title: string;
  badge: string;
  engine: string;
  mode: string;
  input: string;
  eyebrowClassName: string;
  backgroundClassName: string;
  glowClassName: string;
}>;

const copy = {
  badge: "Interactive Simulation",
  title: "Built to get the offer.",
  intro:
    "Watch the real-time simulation. See how Quietly AI Pro tailors answers specifically to your resume, YOE, and target company in real time, while the free version runs general local models.",
  interviewer: "Interviewer Statement",
  skip: "Skip Demo ->",
  chips: {
    what: "What to answer?",
    shorten: "Shorten",
    recap: "Recap",
    fup: "Follow Up",
    answer: "Answer",
  },
  listening: "Listening for interviewer...",
  q1Announcement: '"What is the difference between TCP and UDP?"',
  q2Announcement: '"What compensation are you targeting for this role?"',
  q3Announcement: '"Do you have any questions for us?"',
  q1Action: 'Both panels: pressing "What to answer?"',
  q2Action: 'Both panels: holding "Answer" to speak',
  q3Action: 'Both panels: pressing "Follow Up"',
  q1User: "What to answer?",
  q2User: "What should I say about salary?",
  q3User: "Questions I should ask them?",
  q1Free:
    "TCP is connection-oriented, guaranteeing that packets are delivered in order without data loss. UDP is connectionless, prioritizing speed by sending packets immediately without verification.",
  q1Pro:
    "At Stripe's API layer, we use TCP over TLS/HTTP to ensure transactional reliability and packet ordering. For low-overhead telemetry and log aggregation, we use UDP to minimize latency and CPU overhead.",
  q2Free:
    "I'm open to discussing compensation. I'm targeting something competitive with market rate for this role and location. I'm flexible and happy to discuss the full package.",
  q2Pro:
    "Based on my research, I'm targeting $280-295K total comp for this level at Stripe. That's anchored to L5 benchmarks and reflects my distributed infrastructure background.",
  q3Free: [
    "How does the team handle packet loss in lossy network environments?",
    "When is UDP preferred over TCP in client-facing applications?",
    "How does HTTP/3 change the reliability characteristics of UDP?",
  ],
  q3Pro: [
    "Does Stripe use HTTP/3 or QUIC internally to mitigate TCP head-of-line blocking?",
    "How is telemetry packet loss handled over UDP at Stripe's scale?",
    "How do we balance consistency and performance for low-latency Stripe API endpoints?",
  ],
  citations: {
    q1: ["Stripe network protocol cited", "Matched your resume", "Latency tradeoffs included"],
    q2: ["L5 TC: $245K-$310K", "Anchor: $280-$295K", "Counter within 15%"],
  },
  context: ["Stripe - Senior Backend", "Resume loaded", "5 YOE - Infra", "Negotiation ON"],
  end: {
    free: {
      eyebrow: "Quietly AI Free",
      title: "Good enough to get by.",
      body:
        "Real-time AI. Any model. Runs locally. Free forever with your own API keys.",
      button: "Download free ->",
      note: "Open source local assistant",
      features: [
        "Live transcription & AI answers",
        "Screenshot OCR analysis",
        "Undetectable stealth mode",
        "Local RAG memory",
      ],
    },
    pro: {
      eyebrow: "Quietly AI Pro",
      title: "Built to get the offer.",
      body:
        "Everything in Free, plus resume & JD context, live company intelligence, and salary negotiation copilot.",
      button: "Get Quietly AI Pro ->",
      note: "One-time purchase - No subscription - yours forever",
      features: [
        "Resume & JD context awareness",
        "Live company research & dossiers",
        "Salary negotiation copilot",
        "Priority support & feature access",
      ],
    },
  },
} as const;

const panels = {
  free: {
    tier: "Standard Tier",
    title: "Quietly AI Free",
    badge: "Free forever",
    engine: "Local Engine",
    mode: "Ollama Mode",
    input: "Ask anything on screen or conversation...",
    eyebrowClassName: "text-white/40",
    backgroundClassName: "",
    glowClassName: "-top-12 -left-12 bg-white/[0.02] blur-[100px]",
  },
  pro: {
    tier: "Premium License",
    title: "Quietly AI Pro",
    badge: "One-time - yours forever",
    engine: "Cloud Max Engine",
    mode: "Quietly AI API",
    input: "Ask anything - Quietly AI knows your resume and this company...",
    eyebrowClassName: "text-violet-400/80",
    backgroundClassName: "",
    glowClassName: "-right-16 -bottom-16 bg-violet-500/[0.06] blur-[120px]",
  },
} satisfies Record<Pane, PanelCopy>;

const emptyMessages: readonly SimMessage[] = [];
const chipOrder: readonly ChipKey[] = ["what", "shorten", "recap", "fup", "answer"];

function wait(ms: number, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const timeout = window.setTimeout(resolve, ms);

    signal.addEventListener(
      "abort",
      () => {
        window.clearTimeout(timeout);
        reject(new DOMException("Aborted", "AbortError"));
      },
      { once: true },
    );
  });
}

async function typeText(
  text: string,
  delay: number,
  signal: AbortSignal,
  update: (value: string) => void,
) {
  let value = "";

  for (const character of text) {
    if (signal.aborted) {
      throw new DOMException("Aborted", "AbortError");
    }

    value += character;
    update(value);
    await wait(delay, signal);
  }
}

function ThinkingDots() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="quietly-pro-thinking-dot" />
      <span className="quietly-pro-thinking-dot [animation-delay:120ms]" />
      <span className="quietly-pro-thinking-dot [animation-delay:240ms]" />
    </div>
  );
}

function SendButton({ tone }: Readonly<{ tone: Pane }>) {
  return (
    <div
      className={cn(
        "flex size-5 shrink-0 items-center justify-center rounded-full",
        tone === "pro" ? "bg-violet-500/20 text-violet-400" : "bg-white/[0.08] text-white/40",
      )}
    >
      <ChevronRight className="size-3" aria-hidden="true" />
    </div>
  );
}

function Chip({
  chip,
  activeChip,
  pane,
}: Readonly<{ chip: ChipKey; activeChip: ChipKey | null; pane: Pane }>) {
  const active = activeChip === chip;

  return (
    <span
      className={cn(
        "rounded-full border px-2.5 py-1 text-[9.5px] leading-none font-medium transition-all duration-200",
        active && pane === "pro"
          ? "liquid-glass-strong border-violet-500/30 text-white shadow-[0_8px_20px_rgba(139,92,246,0.22)]"
          : active
            ? "liquid-glass border-white/20 text-white"
            : "liquid-glass border-white/[0.08] text-white/50",
      )}
    >
      {copy.chips[chip]}
    </span>
  );
}

function ContextStrip({ visible }: Readonly<{ visible: boolean }>) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-1.5 border-b border-violet-500/10 bg-violet-500/[0.04] px-3 py-2 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
        visible
          ? "max-h-24 opacity-100"
          : "max-h-0 overflow-hidden border-b-0 py-0 opacity-0",
      )}
    >
      {copy.context.map((item) => (
        <span
          className="rounded-full border border-violet-500/15 bg-violet-500/[0.06] px-2 py-1 text-[9px] font-semibold text-violet-300/80 shadow-[0_4px_12px_rgba(139,92,246,0.04)]"
          key={item}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function MessageBubble({
  message,
  pane,
}: Readonly<{ message: SimMessage; pane: Pane }>) {
  if (message.kind === "thinking") {
    return (
      <div className="quietly-pro-message-in w-fit rounded-2xl border border-white/[0.08] bg-white/[0.04] px-3.5 py-3 shadow-sm">
        <ThinkingDots />
      </div>
    );
  }

  if (message.kind === "user") {
    return (
      <div className="quietly-pro-message-in ml-auto max-w-[82%] rounded-2xl bg-white/[0.1] px-3.5 py-2 text-[12px] leading-relaxed font-medium text-white shadow-[0_10px_24px_rgba(0,0,0,0.2)]">
        {message.text}
      </div>
    );
  }

  if (message.kind === "followups") {
    return (
      <div
        className={cn(
          "quietly-pro-message-in max-w-[92%] rounded-[18px] border bg-white/[0.03] p-3.5 shadow-[0_12px_30px_rgba(0,0,0,0.15)]",
          pane === "pro" ? "border-violet-500/15" : "border-white/[0.08]",
        )}
      >
        <div className="mb-2 flex items-center gap-2 text-[10px] font-bold text-white/50">
          <Sparkles className="size-3 text-violet-400" aria-hidden="true" />
          {pane === "pro" ? "Follow-up questions - Stripe-tailored" : "Follow-up questions"}
        </div>
        <div className="space-y-2">
          {(message.followups ?? []).map((followup) => (
            <div
              className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-[11px] leading-snug font-medium text-white/70"
              key={followup}
            >
              {followup}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (message.kind === "negotiation") {
    return (
      <div className="quietly-pro-message-in max-w-[94%] overflow-hidden rounded-[20px] border border-violet-500/15 bg-white/[0.03] shadow-[0_18px_42px_rgba(139,92,246,0.08)]">
        <div className="flex items-center justify-between border-b border-violet-500/10 bg-violet-500/[0.05] px-3.5 py-2.5">
          <div>
            <p className="text-[10px] font-bold text-violet-400">Negotiation copilot - Stripe L5</p>
            <p className="mt-0.5 text-[9px] font-semibold text-white/30">Live - Mar 2026</p>
          </div>
          <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-[9px] font-bold text-emerald-400">
            Live
          </span>
        </div>
        <div className="p-3.5">
          <p className="text-[12px] leading-relaxed font-semibold text-white/90">
            {message.text}
          </p>
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {(message.citations ?? []).map((citation) => (
              <span
                className="rounded-xl bg-violet-500/[0.08] px-2 py-1.5 text-center text-[9px] leading-tight font-bold text-violet-300/80"
                key={citation}
              >
                {citation}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "quietly-pro-message-in max-w-[92%] rounded-[18px] border bg-white/[0.03] p-3.5 shadow-[0_12px_30px_rgba(0,0,0,0.15)]",
        pane === "pro" ? "border-violet-500/15" : "border-white/[0.08]",
      )}
    >
      <div className="mb-1.5 flex items-center gap-2 text-[10px] font-bold text-white/50">
        <Sparkles
          className={cn("size-3", pane === "pro" ? "text-violet-400" : "text-white/40")}
          aria-hidden="true"
        />
        {pane === "pro" ? "Say this - tailored to Stripe" : "Say this"}
      </div>
      <p className="text-[12px] leading-relaxed font-medium text-white/70">
        {message.text}
      </p>
      {message.citations ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {message.citations.map((citation) => (
            <span
              className="rounded-full border border-violet-500/15 bg-violet-500/[0.06] px-2 py-1 text-[9px] font-semibold text-violet-300/80"
              key={citation}
            >
              {citation}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function PanelFrame({
  pane,
  messages,
  listening,
  activeChip,
  contextVisible,
  ended,
  activePanel,
  messageRef,
  restartDemo,
}: Readonly<{
  pane: Pane;
  messages: readonly SimMessage[];
  listening: string;
  activeChip: ChipKey | null;
  contextVisible: boolean;
  ended: boolean;
  activePanel: Pane;
  messageRef: RefObject<HTMLDivElement | null>;
  restartDemo: () => void;
}>) {
  const panel = panels[pane];
  const isPro = pane === "pro";

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden p-6 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] md:block md:p-10 bg-black/40 backdrop-blur-md",
        activePanel === pane ? "block" : "hidden",
        panel.backgroundClassName,
      )}
    >
      <div
        aria-hidden="true"
        className={cn("pointer-events-none absolute size-96 rounded-full", panel.glowClassName)}
      />
      <div className="relative z-10 mb-8 flex items-center justify-between gap-3">
        <div>
          <p
            className={cn(
              "text-[10px] leading-none font-bold uppercase",
              panel.eyebrowClassName,
            )}
          >
            {panel.tier}
          </p>
          <h2 className="mt-1 text-[20px] font-bold text-white">{panel.title}</h2>
        </div>
        <span
          className={cn(
            "rounded-full border px-3 py-1 text-[11px] font-bold",
            isPro
              ? "liquid-glass border-violet-500/20 text-violet-400"
              : "liquid-glass border-white/[0.1] text-white/50",
          )}
        >
          {panel.badge}
        </span>
      </div>

      <div
        className={cn(
          "relative z-10 mx-auto flex min-h-[360px] max-w-[480px] flex-col justify-between rounded-[1.25rem] bg-black/60 shadow-2xl backdrop-blur-2xl md:max-h-[380px]",
          isPro ? "border border-violet-500/15" : "border border-white/[0.08]",
        )}
      >
        {isPro ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-0 left-0 h-[1.5px] bg-gradient-to-r from-transparent via-violet-500/40 to-transparent"
          />
        ) : null}

        <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "size-2 rounded-full",
                isPro ? "bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.7)]" : "bg-rose-500",
              )}
            />
            <span
              className={cn(
                "text-[11px] font-semibold",
                isPro ? "text-violet-400" : "text-white/50",
              )}
            >
              {panel.mode}
            </span>
          </div>
          <span className="font-mono text-[10px] text-white/30">{panel.engine}</span>
        </div>

        {isPro ? <ContextStrip visible={contextVisible} /> : null}

        <div className="flex items-center gap-2.5 border-b border-white/[0.04] bg-white/[0.01] px-4 py-2 text-white/60">
          <div
            className={cn(
              "size-2 rounded-full transition-colors duration-300",
              listening ? "bg-emerald-400" : "bg-white/20",
            )}
          />
          <p
            className={cn(
              "truncate text-[11px] font-light italic",
              listening ? "text-white/60" : "text-white/30",
            )}
          >
            {listening || copy.listening}
          </p>
        </div>

        <div
          className="scrollbar-none flex flex-1 flex-col gap-3 overflow-y-auto scroll-smooth p-4"
          ref={messageRef}
        >
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} pane={pane} />
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-1.5 border-t border-white/[0.06] p-3">
          {chipOrder.map((chip) => (
            <Chip activeChip={activeChip} chip={chip} key={chip} pane={pane} />
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-white/[0.06] p-3">
          <span
            className={cn(
              "max-w-[80%] truncate text-[11px] font-light italic",
              isPro ? "text-violet-400/60" : "text-white/30",
            )}
          >
            {panel.input}
          </span>
          <SendButton tone={pane} />
        </div>

        {ended ? (
          <EndOverlay pane={pane} restartDemo={restartDemo} />
        ) : null}
      </div>
      <div className="h-6" />
    </div>
  );
}

function EndOverlay({
  pane,
  restartDemo,
}: Readonly<{ pane: Pane; restartDemo: () => void }>) {
  const data = copy.end[pane];
  const isPro = pane === "pro";

  return (
    <div
      className="quietly-pro-end-card absolute inset-0 z-30 flex flex-col justify-center bg-black/85 p-6 backdrop-blur-2xl"
    >
      <div className="mx-auto max-w-[340px]">
        <p
          className={cn(
            "mb-2 text-[11px] font-bold uppercase",
            isPro ? "text-violet-400" : "text-white/40",
          )}
        >
          {data.eyebrow}
        </p>
        <h3 className="text-2xl leading-tight font-bold text-white">{data.title}</h3>
        <p className="mt-3 text-[13px] leading-relaxed text-white/50">{data.body}</p>
        <div className="mt-5 space-y-2">
          {data.features.map((feature) => (
            <div className="flex items-center gap-2 text-[12px] font-semibold text-white/70" key={feature}>
              <span
                className={cn(
                  "flex size-4 items-center justify-center rounded-full",
                  isPro ? "bg-violet-500 text-white" : "bg-white/[0.1] text-white/60",
                )}
              >
                <Check className="size-2.5" aria-hidden="true" />
              </span>
              {feature}
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            className={cn(
              "inline-flex h-10 items-center justify-center rounded-full px-4 text-[12px] font-bold transition-transform duration-200 hover:scale-[1.02]",
              isPro ? "liquid-glass-strong text-white" : "bg-white text-black",
            )}
            href={isPro ? lifetimePurchaseHref : "/"}
          >
            {data.button}
          </a>
          <button
            className="liquid-glass inline-flex h-10 items-center gap-2 rounded-full px-4 text-[12px] font-bold text-white/50 transition-transform duration-200 hover:scale-[1.02]"
            onClick={restartDemo}
            type="button"
          >
            <RefreshCw className="size-3.5" aria-hidden="true" />
            Replay
          </button>
        </div>
        <p className="mt-4 text-[10px] font-medium text-white/25">{data.note}</p>
      </div>
    </div>
  );
}

function MobileSwitch({
  activePanel,
  setActivePanel,
}: Readonly<{
  activePanel: Pane;
  setActivePanel: Dispatch<SetStateAction<Pane>>;
}>) {
  return (
    <div className="relative z-20 flex w-full bg-black px-4 pt-4 md:hidden">
      <div className="flex w-full rounded-xl p-1">
        {(["free", "pro"] satisfies readonly Pane[]).map((pane) => (
          <button
            className={cn(
              "flex-1 rounded-lg py-2 text-center text-xs font-bold transition-all duration-300",
              activePanel === pane ? "liquid-glass text-white shadow-sm" : "text-white/40",
            )}
            key={pane}
            onClick={() => setActivePanel(pane)}
            type="button"
          >
            {panels[pane].title}
          </button>
        ))}
      </div>
    </div>
  );
}

function addMessage(
  setMessages: Dispatch<SetStateAction<readonly SimMessage[]>>,
  message: SimMessage,
) {
  setMessages((messages) => [...messages, message]);
}

function updateMessageText(
  setMessages: Dispatch<SetStateAction<readonly SimMessage[]>>,
  id: string,
  text: string,
) {
  setMessages((messages) =>
    messages.map((message) => (message.id === id ? { ...message, text } : message)),
  );
}

function removeThinking(setMessages: Dispatch<SetStateAction<readonly SimMessage[]>>) {
  setMessages((messages) => messages.filter((message) => message.kind !== "thinking"));
}

function appendFollowup(
  setMessages: Dispatch<SetStateAction<readonly SimMessage[]>>,
  id: string,
  followup: string,
) {
  setMessages((messages) =>
    messages.map((message) =>
      message.id === id
        ? {
          ...message,
          followups: [...(message.followups ?? []), followup],
        }
        : message,
    ),
  );
}

export function ProSimulationPage() {
  const [activePanel, setActivePanel] = useState<Pane>("free");
  const [progress, setProgress] = useState(0);
  const [announcement, setAnnouncement] = useState<string>(copy.q1Announcement);
  const [action, setAction] = useState("");
  const [freeListening, setFreeListening] = useState("");
  const [proListening, setProListening] = useState("");
  const [activeChip, setActiveChip] = useState<ChipKey | null>(null);
  const [freeMessages, setFreeMessages] = useState<readonly SimMessage[]>(emptyMessages);
  const [proMessages, setProMessages] = useState<readonly SimMessage[]>(emptyMessages);
  const [contextVisible, setContextVisible] = useState(false);
  const [ended, setEnded] = useState(false);
  const freeMessageRef = useRef<HTMLDivElement | null>(null);
  const proMessageRef = useRef<HTMLDivElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const timeLabel = "2:56 PM";

  const resetDemo = useCallback(() => {
    setProgress(0);
    setAnnouncement(copy.q1Announcement);
    setAction("");
    setFreeListening("");
    setProListening("");
    setActiveChip(null);
    setFreeMessages(emptyMessages);
    setProMessages(emptyMessages);
    setContextVisible(false);
    setEnded(false);
  }, []);

  const runDemo = useCallback(
    async (signal: AbortSignal) => {
      try {
        resetDemo();

        await wait(1500, signal);
        setProgress(4);
        await Promise.all([
          typeText(copy.q1Announcement, 20, signal, setFreeListening),
          typeText(copy.q1Announcement, 20, signal, setProListening),
        ]);

        await wait(800, signal);
        setProgress(12);
        setAction(copy.q1Action);
        setActiveChip("what");

        await wait(800, signal);
        addMessage(setFreeMessages, { id: "q1-free-user", kind: "user", text: copy.q1User });
        addMessage(setProMessages, { id: "q1-pro-user", kind: "user", text: copy.q1User });
        setProgress(20);
        addMessage(setFreeMessages, { id: "q1-free-thinking", kind: "thinking", text: "" });
        addMessage(setProMessages, { id: "q1-pro-thinking", kind: "thinking", text: "" });

        await wait(1500, signal);
        removeThinking(setFreeMessages);
        removeThinking(setProMessages);
        addMessage(setFreeMessages, { id: "q1-free-answer", kind: "answer", text: "" });
        addMessage(setProMessages, {
          id: "q1-pro-answer",
          kind: "citation",
          text: "",
          citations: copy.citations.q1,
        });
        setProgress(40);
        await Promise.all([
          typeText(copy.q1Free, 12, signal, (text) =>
            updateMessageText(setFreeMessages, "q1-free-answer", text),
          ),
          typeText(copy.q1Pro, 10, signal, (text) =>
            updateMessageText(setProMessages, "q1-pro-answer", text),
          ),
        ]);

        await wait(2500, signal);
        setAnnouncement(copy.q2Announcement);
        setAction("");
        setActiveChip(null);
        setFreeListening("");
        setProListening("");
        setProgress(50);
        await Promise.all([
          typeText(copy.q2Announcement, 18, signal, setFreeListening),
          typeText(copy.q2Announcement, 18, signal, setProListening),
        ]);

        await wait(700, signal);
        setAction(copy.q2Action);
        setActiveChip("answer");
        setContextVisible(true);
        addMessage(setFreeMessages, { id: "q2-free-user", kind: "user", text: copy.q2User });
        addMessage(setProMessages, { id: "q2-pro-user", kind: "user", text: copy.q2User });
        addMessage(setFreeMessages, { id: "q2-free-thinking", kind: "thinking", text: "" });
        addMessage(setProMessages, { id: "q2-pro-thinking", kind: "thinking", text: "" });

        await wait(1500, signal);
        removeThinking(setFreeMessages);
        removeThinking(setProMessages);
        addMessage(setFreeMessages, { id: "q2-free-answer", kind: "answer", text: "" });
        addMessage(setProMessages, {
          id: "q2-pro-answer",
          kind: "negotiation",
          text: "",
          citations: copy.citations.q2,
        });
        setProgress(68);
        await Promise.all([
          typeText(copy.q2Free, 12, signal, (text) =>
            updateMessageText(setFreeMessages, "q2-free-answer", text),
          ),
          typeText(copy.q2Pro, 10, signal, (text) =>
            updateMessageText(setProMessages, "q2-pro-answer", text),
          ),
        ]);

        await wait(2500, signal);
        setAnnouncement(copy.q3Announcement);
        setAction("");
        setActiveChip(null);
        setFreeListening("");
        setProListening("");
        setProgress(78);
        await Promise.all([
          typeText(copy.q3Announcement, 18, signal, setFreeListening),
          typeText(copy.q3Announcement, 18, signal, setProListening),
        ]);

        await wait(700, signal);
        setAction(copy.q3Action);
        setActiveChip("fup");
        addMessage(setFreeMessages, { id: "q3-free-user", kind: "user", text: copy.q3User });
        addMessage(setProMessages, { id: "q3-pro-user", kind: "user", text: copy.q3User });
        addMessage(setFreeMessages, { id: "q3-free-thinking", kind: "thinking", text: "" });
        addMessage(setProMessages, { id: "q3-pro-thinking", kind: "thinking", text: "" });

        await wait(1400, signal);
        removeThinking(setFreeMessages);
        removeThinking(setProMessages);
        addMessage(setFreeMessages, {
          id: "q3-free-followups",
          kind: "followups",
          text: "",
          followups: [],
        });
        addMessage(setProMessages, {
          id: "q3-pro-followups",
          kind: "followups",
          text: "",
          followups: [],
        });
        setProgress(92);

        for (let index = 0; index < copy.q3Free.length; index += 1) {
          await wait(500, signal);
          appendFollowup(setFreeMessages, "q3-free-followups", copy.q3Free[index]);
          appendFollowup(setProMessages, "q3-pro-followups", copy.q3Pro[index]);
        }

        await wait(3000, signal);
        setProgress(100);
        await wait(500, signal);
        setActiveChip(null);
        setAction("");
        setEnded(true);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        throw error;
      }
    },
    [resetDemo],
  );

  const restartDemo = useCallback(() => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    void runDemo(controller.signal);
  }, [runDemo]);

  const skipDemo = useCallback(() => {
    abortRef.current?.abort();
    setProgress(100);
    setAction("");
    setActiveChip(null);
    setContextVisible(true);
    setEnded(true);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    abortRef.current = controller;
    const timer = window.setTimeout(() => {
      void runDemo(controller.signal);
    }, 0);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [runDemo]);

  useEffect(() => {
    freeMessageRef.current?.scrollTo({
      top: freeMessageRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [freeMessages]);

  useEffect(() => {
    proMessageRef.current?.scrollTo({
      top: proMessageRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [proMessages]);

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Background video */}
      <FadingVideo
        src="/videos/pro-hero-bg.mp4"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <main className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 flex-col px-4 pt-16 pb-16 md:px-8 md:pt-24">
        <section className="quietly-pro-hero-copy mb-10 flex flex-col items-start text-left">
          <div className="mb-6">
            <span className="liquid-glass relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[10px] font-bold text-violet-300">
              <Zap className="relative z-10 size-3" aria-hidden="true" />
              <span className="relative z-10 uppercase">{copy.badge}</span>
            </span>
          </div>
          <h1
            className="mb-3 text-5xl leading-tight font-medium tracking-[-2px] text-white md:text-7xl md:leading-[1.15]"
            style={{ fontFamily: "'Instrument Sans', sans-serif" }}
          >
            Built to get
            <br />
            <span className="italic font-normal" style={{ fontFamily: "'Instrument Serif', serif" }}>
              the offer.
            </span>
          </h1>
          <p
            className="max-w-xl text-lg leading-6 font-normal opacity-90"
            style={{ color: "hsl(210 17% 95%)", fontFamily: "'Instrument Sans', sans-serif" }}
          >
            {copy.intro}
          </p>
        </section>

        <section className="quietly-pro-frame w-full" aria-label="Quietly AI Pro live simulation">
          <div className="relative flex w-full flex-col items-center overflow-hidden rounded-[1.25rem] bg-black/50 shadow-2xl backdrop-blur-xl border border-white/[0.06]">
            <div className="relative z-20 flex w-full flex-col items-center justify-between gap-4 border-b border-white/[0.06] px-6 py-5 md:flex-row md:px-10">
              <div className="flex w-full items-center gap-3 md:w-auto">
                <div className="size-2.5 shrink-0 rounded-full bg-rose-500 motion-safe:animate-pulse" />
                <div className="flex min-w-0 flex-col">
                  <span className="text-[10px] leading-none font-bold text-rose-400 uppercase">
                    {copy.interviewer}
                  </span>
                  <p className="mt-1 line-clamp-1 max-w-[340px] text-[14px] font-semibold text-white/90 md:max-w-[480px] md:text-[15px]">
                    {announcement}
                  </p>
                </div>
              </div>
              <div className="flex w-full shrink-0 items-center justify-between gap-4 md:w-auto md:justify-end">
                {action ? (
                  <span className="liquid-glass hidden rounded-full px-3 py-1 text-[10px] font-bold text-violet-300 md:inline-flex">
                    {action}
                  </span>
                ) : null}
                <button
                  className="shrink-0 text-[12px] font-bold text-white/40 uppercase transition-colors hover:text-white"
                  onClick={skipDemo}
                  type="button"
                >
                  {copy.skip}
                </button>
                <div className="text-[12px] font-semibold text-white/30">{timeLabel}</div>
              </div>
            </div>

            <div className="relative z-20 h-1 w-full overflow-hidden bg-white/[0.06]">
              <div
                className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-violet-600 to-blue-500 transition-[width] duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
                style={{ width: `${progress}%` }}
              />
            </div>

            <MobileSwitch activePanel={activePanel} setActivePanel={setActivePanel} />

            <div className="relative grid min-h-[520px] w-full grid-cols-1 overflow-hidden md:grid-cols-2">
              <div className="pointer-events-none absolute top-0 bottom-0 left-1/2 z-30 hidden w-px -translate-x-1/2 bg-white/[0.06] md:block">
                <div className="liquid-glass-strong absolute top-1/2 left-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-lg">
                  <span className="text-[10px] font-bold text-white/60 uppercase">VS</span>
                </div>
              </div>

              <PanelFrame
                activeChip={activeChip}
                activePanel={activePanel}
                contextVisible={contextVisible}
                ended={ended}
                listening={freeListening}
                messageRef={freeMessageRef}
                messages={freeMessages}
                pane="free"
                restartDemo={restartDemo}
              />
              <PanelFrame
                activeChip={activeChip}
                activePanel={activePanel}
                contextVisible={contextVisible}
                ended={ended}
                listening={proListening}
                messageRef={proMessageRef}
                messages={proMessages}
                pane="pro"
                restartDemo={restartDemo}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

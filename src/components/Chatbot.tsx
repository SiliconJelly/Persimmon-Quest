"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage, type Lang } from "@/lib/LanguageContext";
import { chatbot as chatContent } from "@/data/content";

interface Message {
  role: "user" | "assistant";
  text: string;
}

const SYSTEM_PROMPT = `You are Persimmon Quest's on-site assistant. Persimmon Quest builds AI-powered eldercare infrastructure for Japanese nursing homes.

Products:
1. Healthcare Kiosk — facility-grade intake/biometrics node with antimicrobial construction, 3D LiDAR non-contact biometrics, and nursing workflow automation.
2. Medical Tablet — ruggedized PoE bedside device with one-touch emergency calls, IP-rated enclosure, <120ms latency.
3. Yunomi OS — senior-first video communication layer with large touch targets, family/care-team sessions, and behavioral signal logging.

Intelligence Wings:
- Acoustic Biomarkers: ambient stress/respiratory detection.
- Context-Aware Social Connectivity: pre-escalation check-ins.
- Outcome Intelligence: daily routines → measurable care outcomes.

Be warm, knowledgeable, concise (2–4 sentences). If asked about pricing, say "enterprise/volume/SaaS" and recommend contacting founder@persimmon.quest.`;

function getSystemPromptForLang(lang: Lang) {
  if (lang === "ja") {
    return SYSTEM_PROMPT + "\n\nIMPORTANT: Always reply in Japanese (日本語で回答してください).";
  }
  return SYSTEM_PROMPT + "\n\nAlways reply in English.";
}

async function callGemini(messages: Message[], lang: Lang): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    return lang === "ja"
      ? "申し訳ございません。チャットサービスは現在設定中です。founder@persimmon.quest までお問い合わせください。"
      : "Sorry, the chat service is not configured yet. Please contact founder@persimmon.quest.";
  }

  const contents = [
    { role: "user", parts: [{ text: getSystemPromptForLang(lang) }] },
    { role: "model", parts: [{ text: "Understood. I will act as Persimmon Quest's assistant." }] },
    ...messages.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.text }]
    }))
  ];

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents })
    }
  );

  if (!res.ok) {
    const err = await res.text().catch(() => "Unknown error");
    console.error("Gemini API error:", err);
    return lang === "ja"
      ? "申し訳ございません。一時的なエラーが発生しました。しばらくしてからもう一度お試しください。"
      : "Sorry, something went wrong. Please try again in a moment.";
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  return text || (lang === "ja" ? "応答を生成できませんでした。" : "Could not generate a response.");
}

export default function Chatbot() {
  const { lang, t } = useLanguage();
  const [triggered, setTriggered] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const bottomCountRef = useRef(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setTriggered(true);
    }, 3 * 60 * 1000);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollBottom = window.innerHeight + window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      if (scrollBottom >= docHeight - 100) {
        bottomCountRef.current += 1;
        if (bottomCountRef.current >= 2) {
          setTriggered(true);
        }
      }
    };

    let ticking = false;
    const throttled = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
    };

    window.addEventListener("scroll", throttled, { passive: true });
    return () => window.removeEventListener("scroll", throttled);
  }, []);

  useEffect(() => {
    if (triggered && !dismissed && !open) {
      setOpen(true);
    }
  }, [triggered, dismissed, open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const greeting = t(chatContent.greeting);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const userMsg: Message = { role: "user", text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setLoading(true);
    try {
      const reply = await callGemini(updated, lang);
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, lang]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        send();
      }
    },
    [send]
  );

  const handleClose = () => {
    setOpen(false);
    setDismissed(true);
  };

  if (!open) {
    if (triggered && dismissed) {
      return (
        <button
          onClick={() => { setOpen(true); setDismissed(false); }}
          className="fixed bottom-6 right-6 z-[80] flex h-14 w-14 items-center justify-center rounded-full bg-persimmon text-white shadow-[0_0_24px_rgba(244,82,45,0.6)] transition hover:scale-110 hover:brightness-110"
          aria-label="Open chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
          </svg>
        </button>
      );
    }
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-[80] flex w-[min(92vw,24rem)] flex-col overflow-hidden rounded-2xl border border-white/15 bg-zinc-950/95 shadow-2xl backdrop-blur-xl sm:bottom-6 sm:right-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 bg-black/60 px-4 py-3">
        <p className="text-sm font-semibold text-white">{t(chatContent.title)}</p>
        <button
          onClick={handleClose}
          className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-400 transition hover:bg-white/10 hover:text-white"
          aria-label="Close chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4" style={{ maxHeight: "22rem" }}>
        <div className="rounded-xl bg-persimmon/10 px-3 py-2.5 text-sm leading-relaxed text-zinc-200">
          {greeting}
        </div>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`rounded-xl px-3 py-2.5 text-sm leading-relaxed ${
              msg.role === "user"
                ? "ml-auto max-w-[85%] bg-persimmon/20 text-white"
                : "max-w-[85%] bg-white/5 text-zinc-200"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="flex gap-1.5 px-3 py-2.5">
            <span className="h-2 w-2 animate-bounce rounded-full bg-persimmon/60 [animation-delay:0ms]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-persimmon/60 [animation-delay:150ms]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-persimmon/60 [animation-delay:300ms]" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-white/10 p-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t(chatContent.placeholder)}
            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-persimmon/50"
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-persimmon text-white transition hover:brightness-110 disabled:opacity-40"
            aria-label="Send message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

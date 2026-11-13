"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MessageCircle, RotateCcw, Send, X } from "lucide-react";
import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "@/components/ui/Icons";

type Link_ = { text: string; url: string };
type Entry = { id: string; patterns: string[]; response: string; links?: Link_[]; followUp?: string[] };
type KB = { faqEntries: Entry[]; suggestedQuestions: string[]; welcomeMessage: { text: string; links?: Link_[] } };
type Msg = { role: "bot" | "user"; text: string; links?: Link_[]; chips?: string[] };

/* Floating WhatsApp button + the existing Adelogix assistant (same knowledge base
   and keyword-scoring logic as the original site, now lazy-loaded on first open). */
export default function FloatingActions() {
  const [open, setOpen] = useState(false);
  const [kb, setKb] = useState<KB | null>(null);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  const welcome = (k: KB): Msg[] => [{ role: "bot", text: k.welcomeMessage.text, links: k.welcomeMessage.links, chips: k.suggestedQuestions }];

  const toggle = async () => {
    if (!kb) {
      const mod = await import("@/data/chatbot-knowledge.json");
      const data = (mod.default ?? mod) as unknown as KB;
      setKb(data); setMsgs(welcome(data));
    }
    setOpen((o) => !o);
  };

  useEffect(() => { listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" }); }, [msgs, typing]);

  const findResponse = (message: string): Entry => {
    const entries = kb!.faqEntries;
    const fallback = entries.find((e) => e.id === "fallback")!;
    const n = message.toLowerCase().trim();
    if (!n) return fallback;
    let best = fallback, bestScore = 0;
    entries.forEach((e) => {
      if (e.id === "fallback") return;
      let score = 0;
      e.patterns.forEach((p) => { if (n.includes(p.toLowerCase())) score += p.length; });
      if (score > bestScore) { bestScore = score; best = e; }
    });
    return bestScore > 0 ? best : fallback;
  };

  const ask = (text: string) => {
    const q = text.trim(); if (!q || !kb || typing) return;
    setMsgs((m) => [...m.map((x) => ({ ...x, chips: undefined })), { role: "user", text: q }]);
    setInput(""); setTyping(true);
    setTimeout(() => {
      const r = findResponse(q);
      setMsgs((m) => [...m, { role: "bot", text: r.response, links: r.links, chips: r.followUp }]);
      setTyping(false);
    }, 650);
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-[45] flex flex-col items-end gap-3 md:bottom-6 md:right-6">
        <button onClick={toggle} aria-expanded={open} aria-controls="adx-chat" aria-label={open ? "Close chat assistant" : "Open chat assistant"} className="glass grid h-12 w-12 place-items-center rounded-full text-white shadow-lg transition-transform duration-200 hover:scale-105">
          {open ? <X size={20} /> : <MessageCircle size={20} />}
        </button>
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp" className="group relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_40px_-8px_rgba(37,211,102,.6)] transition-transform duration-200 hover:scale-105">
          <WhatsAppIcon size={28} className="relative" />
          <span className="pointer-events-none absolute right-[calc(100%+12px)] top-1/2 hidden -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-full bg-ivory px-4 py-2 text-sm font-medium text-ink opacity-0 shadow-lg transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 md:block">Chat With Us</span>
        </a>
      </div>

      {open && kb && (
        <div id="adx-chat" role="dialog" aria-label="Adelogix assistant" className="fixed bottom-[148px] right-3 z-[46] flex h-[min(560px,calc(100dvh-180px))] w-[calc(100vw-24px)] max-w-[390px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink-2/95 shadow-2xl backdrop-blur-xl md:right-6">
          <div className="flex items-center justify-between border-b border-white/10 bg-brand-gradient px-5 py-4">
            <div><p className="font-medium">Adelogix Assistant</p><p className="text-xs text-white/70">Services, case studies &amp; getting started</p></div>
            <button onClick={() => kb && setMsgs(welcome(kb))} aria-label="Start new conversation" className="rounded-full p-2 hover:bg-white/15"><RotateCcw size={16} /></button>
          </div>
          <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto p-4" data-lenis-prevent aria-live="polite">
            {msgs.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-relaxed ${message.role === "user" ? "bg-brand-500 text-white" : "bg-white/[0.06] text-white/85"}`}>
                  {message.text}
                  {message.links && message.links.length > 0 && <ul className="mt-3 flex flex-wrap gap-2">{message.links.map((link) => <li key={link.url + link.text}>{link.url.startsWith("/") ? <Link href={link.url} onClick={() => setOpen(false)} className="inline-block rounded-full border border-brand-300/40 px-3 py-1 text-xs text-brand-200 hover:bg-brand-500/20">{link.text}</Link> : <a href={link.url} target="_blank" rel="noopener noreferrer" className="inline-block rounded-full border border-brand-300/40 px-3 py-1 text-xs text-brand-200 hover:bg-brand-500/20">{link.text}</a>}</li>)}</ul>}
                  {message.chips && message.chips.length > 0 && <div className="mt-3 flex flex-wrap gap-2">{message.chips.map((chip) => <button key={chip} onClick={() => ask(chip)} className="rounded-full bg-white/10 px-3 py-1.5 text-left text-xs text-white/80 hover:bg-white/20">{chip}</button>)}</div>}
                </div>
              </div>
            ))}
            {typing && <div className="flex w-fit gap-1 rounded-2xl bg-white/[0.06] px-4 py-3" aria-label="Assistant is typing">{[0, 1, 2].map((delay) => <span key={delay} className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/60" style={{ animationDelay: `${delay * 0.15}s` }} />)}</div>}
          </div>
          <form onSubmit={(event) => { event.preventDefault(); ask(input); }} className="flex gap-2 border-t border-white/10 p-3">
            <label htmlFor="adx-chat-input" className="sr-only">Your question</label>
            <input id="adx-chat-input" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about services, case studies or contact..." autoComplete="off" className="field !rounded-full !py-2.5 text-sm" />
            <button type="submit" aria-label="Send" disabled={!input.trim()} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-gradient disabled:opacity-40"><Send size={16} /></button>
          </form>
        </div>
      )}
    </>
  );
}

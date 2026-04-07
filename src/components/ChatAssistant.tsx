"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Send, MessageSquare, Loader2, Activity, ShieldCheck, AlertCircle } from "lucide-react";
import { chatWithGemini } from "@/lib/gemini";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "model";
  parts: { text: string }[];
}

export default function ChatAssistant({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState<"none" | "api_error" | "no_key">("none");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async (overrideInput?: string) => {
    const messageText = overrideInput || input;
    if (!messageText.trim() || isLoading) return;

    setErrorState("none");
    const userMsg: Message = { role: "user", parts: [{ text: messageText }] };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const responseText = await chatWithGemini(messageText, messages);
      const modelMsg: Message = { role: "model", parts: [{ text: responseText }] };
      setMessages(prev => [...prev, modelMsg]);
    } catch (error: unknown) {
      console.error("Gemini Error:", error);
      if (error instanceof Error && error.message === "API_KEY_MISSING") {
        setErrorState("no_key");
      } else {
        setErrorState("api_error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed right-0 top-0 h-full w-full md:w-[400px] bg-slate-950/80 backdrop-blur-2xl border-l border-white/5 z-[150] flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.5)] animate-[slide-left_0.4s_ease-out]"
    >
      {/* Header */}
      <div className="p-6 border-b border-white/5 flex items-center justify-between bg-slate-950/40">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent-cyan rounded-xl text-slate-950 shadow-lg shadow-accent-cyan/20">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-tight text-white">Cyclone Intelligence</h3>
            <div className="flex items-center gap-2 mt-0.5">
                <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", errorState === "none" ? "bg-emerald-500" : "bg-red-500")} />
                <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold">
                    {errorState === "none" ? "Neural Link Active" : "System Offline"}
                </p>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl text-slate-500 hover:text-white transition-all active:scale-90">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-40 px-8">
            <div className="p-4 bg-slate-900 rounded-3xl border border-white/5">
                <Activity className="w-10 h-10 text-accent-cyan" />
            </div>
            <div className="space-y-2">
                <p className="text-xs font-bold text-white uppercase tracking-widest leading-relaxed">
                    Awaiting Directives
                </p>
                <p className="text-[11px] text-slate-400 font-medium">
                    Ask about historical cyclones, coastal safety, or meteorological patterns in the Indian subcontinent.
                </p>
            </div>
            <div className="grid grid-cols-1 gap-2 w-full">
                <QuickPrompt text="Tell me about Cyclone Amphan" onClick={() => {
                    handleSend("Tell me about Cyclone Amphan");
                }} />
                <QuickPrompt text="What are the safest states?" onClick={() => {
                    handleSend("Which Indian states are least affected by cyclones?");
                }} />
            </div>
          </div>
        )}
        
        {messages.map((msg, i) => (
          <div key={i} className={cn("flex w-full animate-slide-up", msg.role === "user" ? "justify-end" : "justify-start")}>
            <div 
              className={cn(
                "max-w-[85%] p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-xl custom-scrollbar max-h-[300px] overflow-y-auto break-words",
                msg.role === "user" 
                ? "bg-accent-blue text-white rounded-tr-none" 
                : "bg-slate-900 text-slate-200 border border-white/5 rounded-tl-none prose prose-invert prose-p:leading-snug prose-sm"
              )}
            >
              <div 
                  dangerouslySetInnerHTML={{ __html: msg.parts[0].text }} 
              />
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start animate-slide-up">
            <div className="bg-slate-900 p-4 rounded-2xl rounded-tl-none border border-white/5 shadow-xl flex items-center gap-3">
              <Loader2 className="w-4 h-4 text-accent-cyan animate-spin" />
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black">Processing Signal...</span>
            </div>
          </div>
        )}

        {errorState !== "none" && (
            <div className="flex flex-col items-center gap-4 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-center">
                <AlertCircle className="w-8 h-8 text-red-500" />
                <div className="space-y-1">
                    <p className="text-xs font-black uppercase text-red-500">
                        {errorState === "no_key" ? "API Key Missing" : "Connection Refused"}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                        {errorState === "no_key" 
                            ? "Please configure NEXT_PUBLIC_GEMINI_API_KEY in your environment variables." 
                            : "Intelligence services are currently unreachable. Please attempt reconnect later."}
                    </p>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-white/5 bg-slate-950/60">
        <div className="flex items-center gap-3 p-2 bg-slate-900 rounded-2xl border border-white/5 focus-within:border-accent-cyan/50 transition-all shadow-inner">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={errorState === "no_key" ? "System Offline" : "Search Intelligence Database..."}
            disabled={errorState === "no_key"}
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-white px-3 outline-none placeholder:text-slate-600 font-medium"
          />
          <button 
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim() || errorState === "no_key"}
            className="p-3 bg-accent-cyan text-slate-950 rounded-xl hover:bg-white disabled:opacity-30 active:scale-90 transition-all shadow-lg shadow-accent-cyan/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 text-slate-600">
            <ShieldCheck className="w-3 h-3" />
            <p className="text-[9px] font-mono uppercase tracking-widest font-bold">
                Safety First Protocol Enabled
            </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-left {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

function QuickPrompt({ text, onClick }: { text: string; onClick: () => void }) {
    return (
        <button 
            onClick={onClick}
            className="text-left px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-[10px] font-bold text-slate-400 hover:text-accent-cyan hover:border-accent-cyan/30 hover:bg-accent-cyan/5 transition-all focus:outline-none focus:ring-1 focus:ring-accent-cyan/30"
        >
            {text}
        </button>
    );
}

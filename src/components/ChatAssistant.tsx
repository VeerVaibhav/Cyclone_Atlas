"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Send, MessageSquare, Loader2, Info } from "lucide-react";
import { chatWithGemini } from "@/lib/gemini";

interface Message {
  role: "user" | "model";
  parts: { text: string }[];
}

export default function ChatAssistant({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: "user", parts: [{ text: input }] };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const responseText = await chatWithGemini(input, messages);
      const modelMsg: Message = { role: "model", parts: [{ text: responseText }] };
      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      console.error("Gemini Error:", error);
      const errMsg: Message = { role: "model", parts: [{ text: "Error communicating with AI. Please check your connection." }] };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed right-0 top-0 h-full w-full md:w-96 bg-slate-900 border-l border-slate-800 z-[60] flex flex-col shadow-2xl"
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-cyan-500 rounded text-slate-950">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-tight text-white">Cyclone AI Assistant</h3>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Mission Support Active</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50 px-6">
            <Info className="w-8 h-8 text-cyan-400" />
            <p className="text-sm text-slate-300">
              Ask me about historical cyclones like Amphan, or how to prepare for the next storm.
            </p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div 
              className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                msg.role === "user" 
                ? "bg-blue-600 text-white rounded-tr-none" 
                : "bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none"
              }`}
            >
              {msg.parts[0].text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-700">
              <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-800 bg-slate-900">
        <div className="flex items-center gap-2 p-1.5 bg-slate-950 rounded-xl border border-slate-800 focus-within:border-cyan-400/50 transition-colors">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about cyclone history..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-slate-200 px-3 outline-none"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="p-2 bg-cyan-500 text-slate-950 rounded-lg hover:bg-white disabled:opacity-50 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

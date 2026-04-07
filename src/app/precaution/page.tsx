"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import ChatAssistant from "@/components/ChatAssistant";
import { ShieldCheck, AlertTriangle, Home, Zap, Phone, Package, Droplets, Wind, CheckCircle2 } from "lucide-react";

export default function PrecautionPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-orange-500/30">
      <Navbar onOpenChat={() => setIsChatOpen(true)} />
      <ChatAssistant isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      <main className="max-w-7xl mx-auto px-8 py-16">
        <header className="mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-mono tracking-widest text-[10px] uppercase">
            <ShieldCheck className="w-3 h-3" />
            <span>Safety First Protocol</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">
            Precaution <span className="text-slate-500">Center</span>
          </h1>
          <p className="max-w-2xl text-slate-400 text-lg">
            A comprehensive guide to staying safe during cyclonic events. 
            Follow official IMD guidelines and local authority instructions at all times.
          </p>
        </header>

        <div className="space-y-24">
          {/* Stage 1: Before */}
          <section id="before">
            <StageHeader 
                step="01" 
                title="Before the Storm" 
                subtitle="Preparation & Mitigation" 
                color="text-cyan-400"
                bg="bg-cyan-500/10"
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <PrecautionCard 
                icon={<Package className="text-cyan-400" />}
                title="Emergency Kit"
                items={[
                  "Dry food for 3-5 days",
                  "At least 3L water per person/day",
                  "First-aid kit & medicines",
                  "Battery-operated radio"
                ]}
              />
              <PrecautionCard 
                icon={<Zap className="text-cyan-400" />}
                title="Power & Comms"
                items={[
                  "Charge all mobile phones",
                  "Keep power banks ready",
                  "Store extra batteries",
                  "Download offline maps"
                ]}
              />
              <PrecautionCard 
                icon={<Home className="text-cyan-400" />}
                title="Property Safety"
                items={[
                  "Secure loose roof tiles",
                  "Trim overhanging tree branches",
                  "Install storm shutters/boards",
                  "Clear drainage channels"
                ]}
              />
            </div>
          </section>

          {/* Stage 2: During */}
          <section id="during">
            <StageHeader 
                step="02" 
                title="During the Event" 
                subtitle="Active Survival & Protection" 
                color="text-orange-500"
                bg="bg-orange-500/10"
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <PrecautionCard 
                icon={<AlertTriangle className="text-orange-500" />}
                title="Immediate Actions"
                items={[
                  "Stay indoors, away from windows",
                  "Switch off gas and electricity",
                  "Listen to radio for updates",
                  "Stay in the strongest part of house"
                ]}
              />
              <PrecautionCard 
                icon={<Droplets className="text-orange-500" />}
                title="Flood Safety"
                items={[
                  "Move to higher ground if advised",
                  "Don't drive through flood waters",
                  "Avoid touching electric poles",
                  "Keep important docs in waterproof bag"
                ]}
              />
              <PrecautionCard 
                icon={<Wind className="text-orange-500" />}
                title="The Eye Effect"
                items={[
                  "Don't go out during the 'calm eye'",
                  "Winds will return suddenly",
                  "Stay inside until official 'All Clear'",
                  "Expect heavy rainfall to continue"
                ]}
              />
            </div>
          </section>

          {/* Stage 3: After */}
          <section id="after">
            <StageHeader 
                step="03" 
                title="After Landfall" 
                subtitle="Recovery & Caution" 
                color="text-emerald-500"
                bg="bg-emerald-500/10"
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <PrecautionCard 
                icon={<Phone className="text-emerald-500" />}
                title="Post-Storm Comms"
                items={[
                  "Only make essential calls",
                  "Report fallen poles/wires",
                  "Check on vulnerable neighbors",
                  "Stay away from disaster areas"
                ]}
              />
              <PrecautionCard 
                icon={<Droplets className="text-emerald-500" />}
                title="Health & Hygiene"
                items={[
                  "Drink only boiled/chlorinated water",
                  "Dispose of spoiled food",
                  "Clear stagnant water pools",
                  "Watch for snakes and insects"
                ]}
              />
              <PrecautionCard 
                icon={<CheckCircle2 className="text-emerald-500" />}
                title="Home Inspection"
                items={[
                  "Check for structural cracks",
                  "Look for gas leaks cautiously",
                  "Avoid entering damaged buildings",
                  "Document damage for insurance"
                ]}
              />
            </div>
          </section>
        </div>

        {/* Emergency Contacts Strip */}
        <section className="mt-32 p-10 bg-slate-900 border border-slate-800 border-l-4 border-l-red-600 rounded-3xl">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="space-y-2">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Emergency Support</h3>
                    <p className="text-slate-400 text-sm">Immediate contact numbers for national and coastal relief agencies.</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    <EmergencyContact label="National Helpline" number="1070" />
                    <EmergencyContact label="Coastal Disaster Management" number="1077" />
                    <EmergencyContact label="Police / Emergency" number="112" />
                </div>
            </div>
        </section>
      </main>
    </div>
  );
}

function StageHeader({ step, title, subtitle, color, bg }: { step: string; title: string; subtitle: string; color: string; bg: string }) {
  return (
    <div className="flex items-center gap-6 mb-12">
      <div className={`w-16 h-16 ${bg} rounded-2xl flex items-center justify-center border border-white/10`}>
        <span className={`text-2xl font-black ${color}`}>{step}</span>
      </div>
      <div>
        <h2 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">{title}</h2>
        <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em] mt-2">{subtitle}</p>
      </div>
    </div>
  );
}

function PrecautionCard({ icon, title, items }: { icon: React.ReactNode; title: string; items: string[] }) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl group hover:border-cyan-500 transition-all">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
          {icon}
        </div>
        <h4 className="text-lg font-bold text-white uppercase tracking-tight">{title}</h4>
      </div>
      <ul className="space-y-4">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3">
            <div className="mt-1 flex-shrink-0 w-4 h-4 rounded-full border border-slate-700 flex items-center justify-center group-hover:border-cyan-400 transition-colors">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-cyan-400 transition-colors" />
            </div>
            <span className="text-sm text-slate-400 font-medium leading-snug">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EmergencyContact({ label, number }: { label: string; number: string }) {
    return (
        <div className="text-center md:text-left">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">{label}</div>
            <div className="text-2xl font-black text-red-500 font-mono tracking-tighter">{number}</div>
        </div>
    );
}

"use client";

import { Activity, Thermometer, Waves, CloudRain } from "lucide-react";

export default function InsightCards() {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-mono text-slate-500 uppercase tracking-[0.3em] mb-4">Intelligence Feed</h3>
      
      <InsightCard 
        icon={<Waves className="text-blue-400" />}
        title="Basin Analysis"
        description="The Bay of Bengal records 4x higher cyclone frequency compared to the Arabian Sea."
        tag="Geographic"
      />
      
      <InsightCard 
        icon={<Thermometer className="text-amber-400" />}
        title="Thermal Signal"
        description="Rising sea surface temperatures are intensifying pre-monsoon storm systems."
        tag="Climate"
      />
      
      <InsightCard 
        icon={<CloudRain className="text-accent-cyan" />}
        title="Flood Exposure"
        description="Low-lying coastal belts in Odisha and West Bengal face 60% higher storm surge risk."
        tag="Impact"
      />
    </div>
  );
}

function InsightCard({ icon, title, description, tag }: { icon: React.ReactNode, title: string, description: string, tag: string }) {
  return (
    <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors group">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 group-hover:bg-slate-800 transition-colors">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-sm font-bold text-white uppercase tracking-tight">{title}</h4>
            <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">{tag}</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-medium">{description}</p>
        </div>
      </div>
    </div>
  );
}

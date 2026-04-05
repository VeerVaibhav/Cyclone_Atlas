"use client";

import React, { useState } from 'react';
import coastalData from "@/data/coastalRegions.json";
import { cn } from '@/lib/utils';
import { Wind, AlertCircle, Info } from 'lucide-react';

interface CoastalMapProps {
  highlightedStates?: string[];
  onStateClick?: (state: string) => void;
}

export default function CoastalMap({ highlightedStates = [], onStateClick }: CoastalMapProps) {
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  // Refined simplified coordinates for Indian coastal states
  const states = [
    { name: "Gujarat", path: "M 20,40 Q 30,50 25,70 L 40,80 L 45,70 L 30,40 Z" },
    { name: "Maharashtra", path: "M 40,80 L 50,110 L 45,130 L 35,110 Z" },
    { name: "Goa", path: "M 45,130 L 48,135 L 44,140 Z" },
    { name: "Karnataka", path: "M 48,135 L 55,170 L 50,180 L 44,140 Z" },
    { name: "Kerala", path: "M 55,170 L 65,210 L 55,210 L 50,180 Z" },
    { name: "Tamil Nadu", path: "M 65,210 L 85,180 L 95,150 L 75,150 L 65,210 Z" },
    { name: "Andhra Pradesh", path: "M 95,150 L 110,120 L 120,100 L 90,120 L 75,150 Z" },
    { name: "Odisha", path: "M 120,100 L 140,85 L 150,70 L 120,80 Z" },
    { name: "West Bengal", path: "M 150,70 L 165,65 L 170,50 L 145,55 Z" },
  ];

  // Example Cyclone Paths (Animated)
  const cyclonePaths = [
    { id: "amphan-track", path: "M 180,150 Q 160,100 155,65", color: "#ef4444", name: "Amphan Track" },
    { id: "fani-track", path: "M 160,180 Q 140,120 135,85", color: "#f97316", name: "Fani Track" },
    { id: "tauktae-track", path: "M 10,180 Q 30,120 35,70", color: "#ef4444", name: "Tauktae Track" },
  ];

  const getRiskColor = (level: string, isHighlighted: boolean, isHovered: boolean) => {
    if (highlightedStates.length > 0 && !isHighlighted && !isHovered) return "#1e293b"; 

    switch (level) {
      case "Very High": return "#ef4444"; 
      case "High": return "#f97316"; 
      case "Medium": return "#eab308"; 
      case "Low": return "#22c55e"; 
      default: return "#64748b"; 
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4 min-h-[500px]">
      {/* Legend */}
      <div className="absolute top-4 left-4 glass-card p-4 z-10 space-y-3 min-w-[140px]">
        <div className="flex items-center gap-2 mb-1">
            <Info className="w-3 h-3 text-slate-500" />
            <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">Severity Legend</h4>
        </div>
        <div className="space-y-2">
          <LegendItem color="#ef4444" label="Very High" />
          <LegendItem color="#f97316" label="High Risk" />
          <LegendItem color="#eab308" label="Moderate" />
          <LegendItem color="#22c55e" label="Low Risk" />
        </div>
      </div>

      <svg viewBox="0 0 200 250" className="w-full h-full max-h-[450px] drop-shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        {/* Mainland India Silhouette */}
        <path 
          d="M 50,10 L 150,10 L 180,50 L 170,70 L 150,80 L 120,110 L 95,160 L 65,220 L 50,180 L 40,120 L 20,70 L 30,30 Z" 
          fill="#0f172a" 
          stroke="#334155" 
          strokeWidth="0.5"
        />

        {/* Coastal States */}
        {coastalData.map((region) => {
          const statePath = states.find(s => s.name === region.state);
          if (!statePath) return null;

          const isHighlighted = highlightedStates.includes(region.state);
          const isHovered = hoveredState === region.state;

          return (
            <path
              key={region.state}
              d={statePath.path}
              fill={getRiskColor(region.riskLevel, isHighlighted, isHovered)}
              opacity={(highlightedStates.length === 0 || isHighlighted || isHovered) ? 1 : 0.2}
              stroke={(isHighlighted || isHovered) ? "#fff" : "#1e293b"}
              strokeWidth={(isHighlighted || isHovered) ? 1 : 0.5}
              className="cursor-pointer transition-all duration-300"
              onMouseEnter={() => setHoveredState(region.state)}
              onMouseLeave={() => setHoveredState(null)}
              onClick={() => onStateClick?.(region.state)}
            >
              <title>{`${region.state}: ${region.riskLevel} Risk`}</title>
            </path>
          );
        })}

        {/* Cyclone Tracks */}
        {cyclonePaths.map((track) => (
            <g key={track.id} className="pointer-events-none">
                <path
                    d={track.path}
                    fill="none"
                    stroke={track.color}
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                    className="opacity-40"
                />
                <path
                    d={track.path}
                    fill="none"
                    stroke={track.color}
                    strokeWidth="2"
                    strokeDasharray="100"
                    strokeDashoffset="100"
                    className="animate-[dash_3s_linear_infinite]"
                    style={{ filter: `drop-shadow(0 0 5px ${track.color})` }}
                />
            </g>
        ))}
      </svg>

      <style jsx>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -100;
          }
        }
      `}</style>
      
      <p className="mt-6 text-[10px] font-mono text-slate-600 uppercase tracking-[0.4em] flex items-center gap-2">
        <Wind className="w-3 h-3" />
        Tactical Impact Mapping | v2.0.4
      </p>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
    return (
        <div className="flex items-center gap-3 group cursor-default">
            <div className="w-2 h-2 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)] transition-transform group-hover:scale-125" style={{ backgroundColor: color }}></div>
            <span className="text-[9px] text-slate-500 uppercase font-bold tracking-tighter group-hover:text-slate-300 transition-colors">{label}</span>
        </div>
    );
}

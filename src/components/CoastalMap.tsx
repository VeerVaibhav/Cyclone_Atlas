"use client";

import React from 'react';
import coastalData from "@/data/coastalRegions.json";

export default function CoastalMap({ highlightedStates = [] }: { highlightedStates?: string[] }) {
  // Simplified coordinates for Indian coastal states for visualization
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

  const getRiskColor = (level: string, isHighlighted: boolean) => {
    if (highlightedStates.length > 0 && !isHighlighted) return "#1e293b"; 

    switch (level) {
      case "Very High": return "#ef4444"; 
      case "High": return "#f97316"; 
      case "Medium": return "#eab308"; 
      case "Low": return "#22c55e"; 
      default: return "#64748b"; 
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
      <svg viewBox="0 0 200 250" className="w-full h-full max-h-[450px]">
        {/* Simple stylized India Outline (Mainland) */}
        <path 
          d="M 50,10 L 150,10 L 180,50 L 170,70 L 150,80 L 120,110 L 95,160 L 65,220 L 50,180 L 40,120 L 20,70 L 30,30 Z" 
          fill="#020617" 
          stroke="#1e293b" 
          strokeWidth="1"
        />

        {/* Coastal States */}
        {coastalData.map((region) => {
          const statePath = states.find(s => s.name === region.state);
          if (!statePath) return null;

          const isHighlighted = highlightedStates.includes(region.state);

          return (
            <path
              key={region.state}
              d={statePath.path}
              fill={getRiskColor(region.riskLevel, isHighlighted)}
              opacity={(highlightedStates.length === 0 || isHighlighted) ? 1 : 0.2}
              stroke={isHighlighted ? "#fff" : "#334155"}
              strokeWidth={isHighlighted ? 1.5 : 0.5}
              style={{ transition: 'all 0.3s' }}
            >
              <title>{`${region.state}: ${region.riskLevel} Risk`}</title>
            </path>
          );
        })}
      </svg>
    </div>
  );
}

import React from "react";
import { useResearch } from "../context/ResearchContext";

export default function Stepper() {
  const { steps, currentStep } = useResearch();
  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center gap-2 ${
                index === currentStep ? "text-green-600 font-bold" :
                index < currentStep ? "text-green-500" : "text-gray-400"
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                index === currentStep ? "bg-green-600 text-white" :
                index < currentStep ? "bg-green-500 text-white" : "bg-gray-200"
              }`}>
                {index < currentStep ? "✓" : step.icon}
              </div>
              <span className="hidden md:block">{step.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
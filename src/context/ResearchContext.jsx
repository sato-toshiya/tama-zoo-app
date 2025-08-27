// src/context/ResearchContext.jsx
import { createContext, useContext, useCallback, useState } from "react";
import { observationThemes, categories, steps } from "../constants/observationThemes";

const ResearchContext = createContext(null);

export function ResearchProvider({ children }) {
  const [formData, setFormData] = useState({
    grade: "",
    category: "",
    difficulty: "",
    email: "",
    selectedTheme: "",
    selectionReason: "",
    observationPoints: [],
    reflection: "",
  });
  const [proposedThemes, setProposedThemes] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [showCompletedReport, setShowCompletedReport] = useState(false);

  const handleInputChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const goTo = useCallback((idx) => {
    setCurrentStep((prev) => {
      const clamped = Math.max(0, Math.min(idx, steps.length - 1));
      return clamped;
    });
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((s) => Math.max(s - 1, 0));
  }, []);

  const generateThemes = useCallback(() => {
    const cat = formData.category;
    const diff =
      formData.difficulty === "1" ? "easy" :
      formData.difficulty === "2" ? "normal" : "hard";

    const categoryThemes = observationThemes[cat];
    if (!categoryThemes) {
      setProposedThemes([]);
      return false;
    }
    const themes = categoryThemes[diff] || [];
    setProposedThemes(themes);
    setCurrentStep(1); // Layout で URL 同期している場合もOK
    setShowCompletedReport(false);
    return true;
  }, [formData.category, formData.difficulty]);

  const selectTheme = useCallback((theme) => {
    const t = typeof theme === "string" ? { title: theme, points: [] } : theme;
    const initialPoints = (t.points || []).map((p) => ({
      ...p,
      hypothesis: "",
      observation: "",
      observationImage: null,
      insights: "",
    }));
    setFormData((prev) => ({
      ...prev,
      selectedTheme: t.title,
      observationPoints: initialPoints,
    }));
  }, []);

  const updateObservationPoint = (pointId, field, value) => {
    const updatedPoints = formData.observationPoints.map(point => point.id === pointId ? { ...point, [field]: value } : point);
    setFormData(prev => ({ ...prev, observationPoints: updatedPoints }));
  };

  const value = {
    // 定数
    steps,
    categories,
    observationThemes,
    // 状態
    formData,
    setFormData,
    proposedThemes,
    setProposedThemes,
    currentStep,
    setCurrentStep,
    showCompletedReport,
    setShowCompletedReport,
    // 操作
    handleInputChange,
    generateThemes,
    selectTheme,
    nextStep,
    prevStep,
    goTo,
    updateObservationPoint,
  };

  return (
    <ResearchContext.Provider value={value}>
      {children}
    </ResearchContext.Provider>
  );
}

export const useResearch = () => useContext(ResearchContext);
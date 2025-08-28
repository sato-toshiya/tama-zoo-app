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
  const [isLoading, setIsLoading] = useState(false);

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

const generateMoreThemes = useCallback(async () => {
  if (isLoading) return;
  setIsLoading(true);

  try {
    const categoryName = categories.find((c) => c.id === formData.category)?.name || "";
    const difficultyMap = { "1": "かんたん", "2": "ふつう", "3": "むずかしい"};
    const difficultyLabel = difficultyMap[formData.difficulty];
    const existingThemes = proposedThemes.map(theme => (typeof theme === 'object' ? theme.title : theme)).join("、"); 

    //プロンプト 既存のテーマと重複しないように
    
    const prompt = `
      あなたは動物に関する自由研究テーマを提案する専門家です。
      対象者は多摩動物公園にいる動物や昆虫を観察研究します。
      以下の条件と既存のテーマリストを参考にして、**まだ提案されていない、ユニークで面白い研究テーマを新たに2つ**提案してください。
      

      # 条件
      - 対象学年：${formData.grade}年生
      - 興味のある動物のカテゴリ：${categoryName}
      - 難易度: ${difficultyLabel}
    
      # 既存のテーマリスト(これらのテーマと重複しないようにしてください)
      ${existingThemes}

  # 出力形式
  必ず以下のJSON形式("themes"というキーを持つオブジェクト)のフォーマットで、**新しいテーマのみを2つ**応答してください。
  
  - **研究テーマ**: 全体のタイトルや問いを設定します。
  - **points**: 研究テーマを達成するための、より具体的な観察ポイントを複数（4つ推奨）設定してください。各ポイントにもタイトル、問い、ガイドを含めてください。
  - **id**: 他のテーマやポイントと重複しないユニークな**数値**を割り振ってください。

    {
      "themes": [
        {
          "id": "new_theme_${Date.now()}_1" 
        "title": "（ここに新しい研究テーマのタイトル1）",
          "question": "（この研究で中心となる問い・仮説）",
          "guide": "（この研究で何をするかの簡単な説明）",
          "points": [
            {
              "id": 1,
              "title": "（観察ポイント1のタイトル）",
              "question": "（観察ポイント1での具体的な問い）",
              "guide": "（観察ポイント1で何をするかの具体的な指示）"
            },
            {
              "id": 2,
              "title": "（観察ポイント2のタイトル）",
              "question": "（観察ポイント2での具体的な問い）",
              "guide": "（観察ポイント2で何をするかの具体的な指示）"
            },
            {
              "id": 3,
              "title": "（観察ポイント3のタイトル）",
              "question": "（観察ポイント3での具体的な問い）",
              "guide": "（観察ポイント3で何をするかの具体的な指示）"
            },
            {
              "id": 4,
              "title": "（観察ポイント4のタイトル）",
              "question": "（観察ポイント4での具体的な問い）",
              "guide": "（観察ポイント4で何をするかの具体的な指示）"
            }
          ],
          "schedule": [
            "（観察や調査に適した時期や時間帯の例1）",
            "（例2）"
          ]
        },
        {
          "id": "new_theme_${Date.now()}_2"
        "title": "（ここに新しい研究テーマのタイトル2）",
          "question": "（この研究で中心となる問い・仮説）",
          "guide": "（この研究で何をするかの簡単な説明）",
          "points": [
            {
              "id": 1,
              "title": "（観察ポイント1のタイトル）",
              "question": "（観察ポイント1での具体的な問い）",
              "guide": "（観察ポイント1で何をするかの具体的な指示）"
            },
            {
              "id": 2,
              "title": "（観察ポイント2のタイトル）",
              "question": "（観察ポイント2での具体的な問い）",
              "guide": "（観察ポイント2で何をするかの具体的な指示）"
            }
            // ... さらにポイントを追加 ...
          ],
          "schedule": [
            "（観察や調査に適した時期や時間帯の例1）",
            "（例2）"
          ]
        }
      ]
    }

    `;

  const response = await fetch('/api/generate-themes',{
    method: 'POST',
    headers: {'Content-Type': 'application/json' },
    body: JSON.stringify({prompt}),
  });

  if (!response.ok) {
    throw new Error('APIリクエストに失敗しました。');
  }

  const result = await response.json();
  const newThemesArray = result;

  if (newThemesArray.length > 0){
    setProposedThemes((prevThemes) => [...prevThemes, ...newThemesArray]);
  }

} catch (error) {
  console.error("テーマの追加生成に失敗しました",error);
  alert("新しいテーマの取得に失敗しました。もう一度お試しください。")
} finally {
  setIsLoading(false);
}

}, [isLoading, formData, proposedThemes, categories]);

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

  const value = {
    // 定数
    steps,
    categories,
    observationThemes,
    // 状態
    isLoading,
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
    generateMoreThemes,
    selectTheme,
    nextStep,
    prevStep,
    goTo,
  };

  return (
    <ResearchContext.Provider value={value}>
      {children}
    </ResearchContext.Provider>
  );
}

export const useResearch = () => useContext(ResearchContext);
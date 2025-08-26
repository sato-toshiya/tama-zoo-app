import React from "react";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { useResearch } from "../context/ResearchContext";
import { useNavigate } from "react-router-dom";

export default function Themes() {
  const {
    formData,
    categories,
    proposedThemes,
    observationThemes,
    setProposedThemes,
    selectTheme,
    nextStep,
    prevStep,
  } = useResearch();

  const navigate = useNavigate();

  const handlePrev = () => {
    prevStep();
    // フォールバック：URLも明示的に戻す
    navigate("/questions", { replace: true });
  };

  const handleNext = () => {
    if (!formData.selectedTheme) return;
    nextStep();
    // フォールバック：URLも明示的に進める
    navigate("/selection", { replace: true });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-green-800 mb-6">🎯 あなたにおすすめの研究テーマ</h2>

      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
        <p className="text-blue-800">
          <strong>{formData.grade}年生</strong>の
          <strong>{categories.find((c) => c.id === formData.category)?.name}</strong>で
          <strong>難易度{formData.difficulty}</strong>のテーマをAIが選びました！
        </p>
      </div>

      <div className="space-y-4">
        {proposedThemes.map((theme, index) => {
          if (typeof theme === "string") {
            return (
              <div
                key={index}
                className={`bg-white p-6 rounded-lg shadow-md border-2 cursor-pointer transition-colors ${
                  formData.selectedTheme === theme ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-green-300"
                }`}
                onClick={() => selectTheme(theme)}
              >
                <div className="flex items-start gap-4">
                  <div className="text-2xl">{index === 0 ? "🦁" : index === 1 ? "🦒" : "🐧"}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{theme}</h3>
                    <p className="text-gray-600 text-sm">詳細な研究テーマです。</p>
                  </div>
                  {formData.selectedTheme === theme && (
                    <div className="text-green-500">
                      <Eye className="w-6 h-6" />
                    </div>
                  )}
                </div>
              </div>
            );
          }

          return (
            <div
              key={theme.id}
              className={`bg-white p-6 rounded-lg shadow-md border-2 cursor-pointer transition-colors ${
                formData.selectedTheme === theme.title ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-green-300"
              }`}
              onClick={() => selectTheme(theme)}
            >
              <div className="flex items-start gap-4">
                <div className="text-2xl">
                  {formData.category === "mammal" && ["🦁", "🦒", "🐘", "🦍", "🐺", "🐼"][index % 6]}
                  {formData.category === "bird" && ["🐧", "🦩", "🦅", "🦚"][index % 4]}
                  {formData.category === "insect" && ["🦋", "🐜", "✨"][index % 3]}
                  {formData.category === "other" && ["🔍", "🗺️", "👁️"][index % 3]}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{theme.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{theme.guide}</p>
                  <div className="text-sm text-blue-600 bg-blue-50 p-2 rounded">
                    <strong>メインテーマ：</strong>
                    {theme.question}
                  </div>
                  {theme.schedule && (
                    <div className="text-xs text-gray-500 mt-2">
                      <strong>観察スケジュール：</strong>
                      {theme.schedule.join(", ")}
                    </div>
                  )}
                </div>
                {formData.selectedTheme === theme.title && (
                  <div className="text-green-500">
                    <Eye className="w-6 h-6" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 mb-6">
        <p className="text-yellow-800 mb-3">
          <strong>💡 気に入ったテーマがない場合は：</strong>
          下のボタンで他のテーマを提案してもらうことができます！
        </p>
        <button
          onClick={() => {
            const categoryThemes = observationThemes[formData.category];
            if (categoryThemes) {
              const difficultyLevel = formData.difficulty === '1' ? 'easy' : 
                                     formData.difficulty === '2' ? 'normal' : 'hard';
              const allThemes = categoryThemes[difficultyLevel] || [];
              // 現在表示されていないテーマをランダムに選択
              const availableThemes = allThemes.filter(theme => 
                !proposedThemes.some(proposed => proposed.id === theme.id)
              );
              if (availableThemes.length > 0) {
                const newThemes = [...proposedThemes, ...availableThemes.slice(0, 2)];
                setProposedThemes(newThemes);
              } else {
                // 全てのテーマを再表示
                setProposedThemes(allThemes);
              }
            }
          }}
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          🔄 他のテーマを提案してもらう
        </button>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handlePrev}
          className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          一つ前に戻る
        </button>
        <button
          onClick={handleNext}
          disabled={!formData.selectedTheme}
          className="flex-1 bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          このテーマに決める
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
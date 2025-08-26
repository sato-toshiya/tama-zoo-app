import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useResearch } from "../context/ResearchContext";
import { useNavigate } from "react-router-dom";

export default function Reflection() {
  const { formData, handleInputChange, prevStep, nextStep } = useResearch();
  const navigate = useNavigate();

  const handlePrev = () => {
    prevStep();
    // フォールバックでURLも戻す
    navigate("/research", { replace: true });
  };

  const handleNext = () => {
    nextStep();
    // フォールバックでURLも進める
    navigate("/preview", { replace: true });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-green-800 mb-6">💭 感想を聞かせてください</h2>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <label className="block text-lg font-semibold text-gray-700 mb-3">
          今回の研究はどうでしたか？感想を自由に書いてください
        </label>
        <textarea
          value={formData.reflection}
          onChange={(e) => handleInputChange("reflection", e.target.value)}
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
          rows="6"
          placeholder="楽しかったこと、難しかったこと、新しく知ったこと、もっと調べたいことなど、何でも書いてください..."
        />
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
        <p className="text-yellow-800">
          <strong>💡 ヒント：</strong>
          「○○が一番印象に残った」「○○について詳しく知れた」「今度は○○も調べてみたい」など、具体的に書くともっと良くなります！
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handlePrev}
          className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          戻る
        </button>
        <button
          onClick={handleNext}
          className="flex-1 bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
        >
          プレビューを見る
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
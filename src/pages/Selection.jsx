import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useResearch } from "../context/ResearchContext";
import { useNavigate } from "react-router-dom";

export default function Selection() {
  const { formData, handleInputChange, prevStep, nextStep } = useResearch();
  const navigate = useNavigate();

  const reasons = [
    "動物が好きだから",
    "面白そうだから",
    "新しいことを発見したいから",
    "友達に教えたいから",
    "写真を撮りたいから",
    "動物園でよく見る動物だから",
  ];

  const current = formData.selectionReason.split(",").filter(Boolean);

  const toggleReason = (reason, checked) => {
    const set = new Set(current);
    if (checked) set.add(reason);
    else set.delete(reason);
    handleInputChange("selectionReason", Array.from(set).join(","));
  };

  const handlePrev = () => {
    prevStep();
    // フォールバックでURLも戻す
    navigate("/themes", { replace: true });
  };

  const handleNext = () => {
    nextStep();
    // フォールバックでURLも進める
    navigate("/research", { replace: true });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-green-800 mb-6">📝 テーマ選択の理由</h2>

      <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
        <h3 className="text-lg font-bold text-green-800 mb-2">選んだテーマ</h3>
        <p className="text-green-700">{formData.selectedTheme}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <label className="block text-lg font-semibold text-gray-700 mb-3">
          なぜこのテーマを選びましたか？（複数選択可）
        </label>
        <div className="space-y-3">
          {reasons.map((reason) => (
            <label key={reason} className="flex items-center gap-3">
              <input
                type="checkbox"
                className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                checked={current.includes(reason)}
                onChange={(e) => toggleReason(reason, e.target.checked)}
              />
              <span className="text-gray-700">{reason}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <label className="block text-lg font-semibold text-gray-700 mb-3">
          他に理由があれば自由に書いてください
        </label>
        <textarea
          value={formData.selectionReason}
          onChange={(e) => handleInputChange("selectionReason", e.target.value)}
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
          rows="3"
          placeholder="例：お母さんと一緒に見に行ったことがあるから..."
        />
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
          研究を始める
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
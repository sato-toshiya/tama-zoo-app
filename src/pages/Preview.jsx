import React from "react";
import { ChevronLeft } from "lucide-react";
import { FileDown, Mail, Share2 } from "lucide-react";
import { useResearch } from "../context/ResearchContext";
import { useNavigate } from "react-router-dom";

export default function Preview() {
  const { formData, prevStep, setShowCompletedReport } = useResearch();
  const navigate = useNavigate();

  const handlePrev = () => {
    prevStep();
    // フォールバックでURLも戻す
    navigate("/reflection", { replace: true });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-green-800 mb-6">研究レポートプレビュー</h2>

      <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-xl font-bold text-brown-800 max-w-md mx-auto">
              {formData.selectedTheme}
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <div className="bg-blue-100 p-3 rounded-t-lg border-l-4 border-blue-500">
                  <h3 className="font-bold text-blue-800 text-sm">📝 研究するきっかけ</h3>
                </div>
                <div className="bg-blue-50 p-4 rounded-b-lg min-h-[100px]">
                  <div className="text-gray-800 text-sm leading-relaxed break-words">
                    {formData.selectionReason || '○'.repeat(50)}
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-blue-100 p-3 rounded-t-lg border-l-4 border-blue-500">
                  <h3 className="font-bold text-blue-800 text-sm">💡 予想</h3>
                </div>
                <div className="bg-blue-50 p-4 rounded-b-lg min-h-[160px]">
                  <div className="space-y-3">
                    {formData.observationPoints.length > 0 ? (
                      formData.observationPoints.map((point, index) => (
                        <div key={index} className="text-xs">
                          <div className="font-semibold text-gray-700 mb-1">{index + 1}. {point.question.length > 25 ? point.question.slice(0, 25) + '...' : point.question}</div>
                          <div className="text-gray-600 bg-white p-2 rounded text-xs leading-tight">
                            {point.hypothesis || '○'.repeat(20)}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-800 text-sm">
                        {[1,2].map(i => (
                          <div key={i} className="mb-2">
                            <div className="flex space-x-1">
                              {[...Array(20)].map((_, j) => (
                                <span key={j} className="inline-block">○</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="bg-blue-100 p-3 rounded-t-lg border-l-4 border-blue-500">
                  <h3 className="font-bold text-blue-800 text-sm">📊 結果</h3>
                </div>
                <div className="bg-blue-50 p-4 rounded-b-lg min-h-[220px]">
                  <div className="space-y-3">
                    {formData.observationPoints.length > 0 ? (
                      formData.observationPoints.map((point, index) => (
                        <div key={index} className="text-xs">
                          <div className="font-semibold text-gray-700 mb-1">{index + 1}. {point.question.length > 25 ? point.question.slice(0, 25) + '...' : point.question}</div>
                          <div className="text-gray-600 bg-white p-2 rounded text-xs leading-tight">
                            {point.observation || '○'.repeat(24)}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-800 text-sm">観察結果がここに表示されます</div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-blue-100 p-3 rounded-t-lg border-l-4 border-blue-500">
                  <h3 className="font-bold text-blue-800 text-sm">💭 わかったこと</h3>
                </div>
                <div className="bg-blue-50 p-4 rounded-b-lg min-h-[160px]">
                  <div className="space-y-3">
                    {formData.observationPoints.length > 0 ? (
                      formData.observationPoints.map((point, index) => (
                        <div key={index} className="text-xs">
                          <div className="font-semibold text-gray-700 mb-1">{index + 1}. {point.question.length > 25 ? point.question.slice(0, 25) + '...' : point.question}</div>
                          <div className="text-gray-600 bg-white p-2 rounded text-xs leading-tight">
                            {point.insights || '○'.repeat(20)}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-800 text-sm">気づきがここに表示されます</div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-blue-100 p-3 rounded-t-lg border-l-4 border-blue-500">
                  <h3 className="font-bold text-blue-800 text-sm">📝 まとめ</h3>
                </div>
                <div className="bg-blue-50 p-4 rounded-b-lg min-h-[100px]">
                  <div className="text-gray-800 text-sm leading-relaxed">
                    {formData.reflection || 'まとめがここに表示されます'}
                  </div>
                </div>
              </div>
            </div>
          </div>
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
            onClick={() => {
              setShowCompletedReport(true);
              navigate("/completed");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex-1 bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
          >
            🎉 完了！
          </button>
        </div>
      </div>
  );
}
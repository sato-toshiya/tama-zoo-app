import React from "react";
import { ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { useResearch } from "../context/ResearchContext";
import { useNavigate } from "react-router-dom";

export default function Research() {
  const {
    formData,
    updateObservationPoint,
    handleImageUpload,
    prevStep,
    nextStep,
  } = useResearch();
  const navigate = useNavigate();

  const handlePrev = () => {
    prevStep();
    // フォールバックでURLも戻す
    navigate("/selection", { replace: true });
  };

  const handleNext = () => {
    nextStep();
    // フォールバックでURLも進める
    navigate("/reflection", { replace: true });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-green-800 mb-6">🔍 研究を始めよう！</h2>

      <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
        <h3 className="text-lg font-bold text-blue-800 mb-2">研究テーマ</h3>
        <p className="text-blue-700">{formData.selectedTheme}</p>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
        <p className="text-yellow-800">
          <strong>📋 研究の進め方：</strong>
          それぞれの観察テーマについて、まず「予想」をしてから、実際に「観察」、最後に「気づき」を書いてみよう！
        </p>
      </div>

      {formData.observationPoints.map((point, index) => (
        <div
          key={point.id}
          className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-400"
        >
          <h3 className="text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
            <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">
              {index + 1}
            </span>
            {point.question}を調べてみよう！
          </h3>

          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <p className="text-green-700 text-sm">
              <span className="font-bold">🎯 調べるヒント：</span>
              {point.guide}
            </p>
          </div>

          <div className="space-y-4">
            {/* 仮説 */}
            <div>
              <label className="block text-md font-semibold text-gray-700 mb-2">
                💡 予想してみよう！（きっと○○だと思う！）
              </label>
              <textarea
                value={point.hypothesis}
                onChange={(e) =>
                  updateObservationPoint(point.id, "hypothesis", e.target.value)
                }
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                rows="2"
                placeholder={`「${point.question}」について、きっと○○だと思う！その理由は...`}
              />
            </div>

            {/* 観察結果 */}
            <div>
              <label className="block text-md font-semibold text-gray-700 mb-2">
                👀 実際に見てわかったこと
              </label>
              <textarea
                value={point.observation}
                onChange={(e) =>
                  updateObservationPoint(point.id, "observation", e.target.value)
                }
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none mb-3"
                rows="3"
                placeholder="動物園で実際に見た様子を詳しく書いてみよう！どんなことをしていたかな？"
              />

              {/* 写真アップロード */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageUpload(point.id, e.target.files?.[0] || null)
                  }
                  className="hidden"
                  id={`photo-upload-${point.id}`}
                />
                <label htmlFor={`photo-upload-${point.id}`} className="cursor-pointer">
                  <Camera className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                  <p className="text-gray-600 text-sm">📷 写真を撮ったら追加しよう！</p>
                  {point.observationImage && (
                    <p className="text-green-600 text-sm mt-1">📷 {point.observationImage}</p>
                  )}
                </label>
              </div>
            </div>

            {/* 気づき */}
            <div>
              <label className="block text-md font-semibold text-gray-700 mb-2">
                ✨ 新しい発見・気づいたこと
              </label>
              <textarea
                value={point.insights}
                onChange={(e) =>
                  updateObservationPoint(point.id, "insights", e.target.value)
                }
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                rows="3"
                placeholder="予想と違っていたこと、びっくりしたこと、新しく知ったこと、「なぜ？」と思ったことを書いてみよう！"
              />
            </div>
          </div>
        </div>
      ))}

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
          感想を書く
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
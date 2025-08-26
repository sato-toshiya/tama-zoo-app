import React from "react";
import { ChevronRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useResearch } from "../context/ResearchContext";

export default function Questions() {
  const navigate = useNavigate();
  const { formData, handleInputChange, categories, generateThemes } = useResearch();

  const onGenerate = () => {
    const ok = generateThemes(); // テーマ生成 + currentStep=1
    if (ok) {
      // URL同期が無効でも確実に進む
      navigate("/themes", { replace: false });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-green-800 mb-6">あなたについて教えてください</h2>

      {/* 学年 */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <label className="block text-lg font-semibold text-gray-700 mb-3">学年を選んでください</label>
        <div className="grid grid-cols-6 gap-3">
          {[1,2,3,4,5,6].map((grade) => (
            <button
              key={grade}
              onClick={() => handleInputChange("grade", grade.toString())}
              className={`p-3 rounded-lg border-2 text-lg font-bold transition-colors ${
                formData.grade === grade.toString()
                  ? "border-green-500 bg-green-100 text-green-800"
                  : "border-gray-300 hover:border-green-300"
              }`}
            >
              {grade}年生
            </button>
          ))}
        </div>
      </div>

      {/* カテゴリ */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <label className="block text-lg font-semibold text-gray-700 mb-3">興味のある動物のカテゴリは？</label>
        <div className="space-y-3">
          {categories.map((c) => (
            <div key={c.id}>
              <button
                onClick={() => handleInputChange("category", c.id)}
                className={`w-full p-3 rounded-lg border-2 text-left transition-colors ${
                  formData.category === c.id
                    ? "border-green-500 bg-green-100 text-green-800"
                    : "border-gray-300 hover:border-green-300"
                }`}
              >
                <span className="font-semibold">{c.name}</span>
                <span className="text-sm text-gray-600 ml-2">({c.subcategories.join("、")})</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 難易度 */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <label className="block text-lg font-semibold text-gray-700 mb-3">難易度を選んでください</label>
        <div className="grid grid-cols-3 gap-4">
          {[
            { level: "1", label: "かんたん", desc: "観察中心" },
            { level: "2", label: "ふつう", desc: "比較・分析" },
            { level: "3", label: "むずかしい", desc: "深い研究" },
          ].map((item) => (
            <button
              key={item.level}
              onClick={() => handleInputChange("difficulty", item.level)}
              className={`p-4 rounded-lg border-2 text-center transition-colors ${
                formData.difficulty === item.level
                  ? "border-green-500 bg-green-100 text-green-800"
                  : "border-gray-300 hover:border-green-300"
              }`}
            >
              <div className="font-bold text-lg">{item.label}</div>
              <div className="text-sm text-gray-600 mt-1">{item.desc}</div>
              <div className="flex justify-center mt-2">
                {[...Array(parseInt(item.level))].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* メール */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <label className="block text-lg font-semibold text-gray-700 mb-3">メールアドレス（結果送信用）</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
          placeholder="example@email.com"
        />
      </div>

      {/* 次へ */}
      <button
        onClick={onGenerate}
        disabled={!formData.grade || !formData.category || !formData.difficulty || !formData.email}
        className="w-full bg-green-600 text-white text-xl font-bold py-4 px-6 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        テーマを提案してもらう
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
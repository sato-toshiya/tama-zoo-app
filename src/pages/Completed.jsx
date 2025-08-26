// src/pages/Completed.jsx
import React from "react";
import { FileDown, Mail, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useResearch } from "../context/ResearchContext";

export default function Completed() {
  const navigate = useNavigate();
  const { setShowCompletedReport, setCurrentStep, setFormData } = useResearch();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-green-800 mb-4">🎉 研究レポート完成！</h2>

        <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white p-6 rounded-lg shadow-lg mb-6">
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-2xl font-bold mb-2">おめでとうございます！</h3>
          <p className="text-lg">素晴らしい研究レポートができました！</p>
          <p className="text-lg">きみの観察力と発見力は本当にすごいです！</p>
        </div>

        <div className="bg-blue-100 p-4 rounded-lg text-blue-800 text-lg mb-6">
          <p>📄 研究レポートが完成しました</p>
          <p>🎯 素晴らしい研究をありがとうございました！</p>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-bold text-blue-800 mb-4">📤 レポートを保存・共有</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <button className="flex items-center justify-center gap-2 bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 transition-colors">
              <FileDown className="w-5 h-5" />
              PDF保存
            </button>
            <button className="flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              <Mail className="w-5 h-5" />
              メール送信
            </button>
            <button className="flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
              <Share2 className="w-5 h-5" />
              SNS共有
            </button>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => {
              // 状態初期化してホームへ
              setShowCompletedReport(false);
              setCurrentStep(0);
              setFormData({
                grade: "",
                category: "",
                difficulty: "",
                email: "",
                selectedTheme: "",
                selectionReason: "",
                observationPoints: [],
                reflection: "",
              });
              navigate("/");
            }}
            className="bg-green-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-green-700 transition-colors text-lg"
          >
            🏠 ホームに戻る
          </button>
        </div>
      </div>
    </div>
  );
}
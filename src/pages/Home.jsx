// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useResearch } from "../context/ResearchContext";

export default function Home() {
  const navigate = useNavigate();
  const { resetForNewResearch } = useResearch();

  const goResearch = () => {
    resetForNewResearch();     // 学年/カテゴリ/難易度など初期化
    navigate("/questions");    // 研究フロー開始
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-green-800 mb-4">🦁 Zooっと自由研究へようこそ！</h2>
        <p className="text-lg text-gray-600 mb-8">動物たちと一緒に素敵な研究をしよう！</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 研究ツール */}
        <div
          onClick={goResearch}
          className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-green-500"
        >
          <div className="p-6">
            <div className="text-6xl text-center mb-4">🔬</div>
            <h3 className="text-xl font-bold text-gray-800 text-center mb-2">自由研究作成ツール</h3>
            <p className="text-gray-600 text-center text-sm">
              動物たちを観察して、オリジナルの研究レポートを作ろう！
            </p>
            <div className="mt-4 bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full text-center">
              今すぐ始める
            </div>
          </div>
        </div>

        {/* 履歴 */}
        <div
          onClick={() => navigate("/history")}
          className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-500"
        >
          <div className="p-6">
            <div className="text-6xl text-center mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-800 text-center mb-2">作ったレポートの履歴</h3>
            <p className="text-gray-600 text-center text-sm">これまでに作成した研究レポートを見返そう！</p>
            <div className="mt-4 bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full text-center">
              履歴を見る
            </div>
          </div>
        </div>

        {/* みんなの研究 */}
        <div
          onClick={() => navigate("/others")}
          className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-purple-500"
        >
          <div className="p-6">
            <div className="text-6xl text-center mb-4">👥</div>
            <h3 className="text-xl font-bold text-gray-800 text-center mb-2">他の人の研究</h3>
            <p className="text-gray-600 text-center text-sm">みんなが作った面白い研究レポートをチェックしよう！</p>
            <div className="mt-4 bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full text-center">
              研究を見る
            </div>
          </div>
        </div>

        {/* お知らせ */}
        <div
          onClick={() => navigate("/news")}
          className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-orange-500"
        >
          <div className="p-6">
            <div className="text-6xl text-center mb-4">📢</div>
            <h3 className="text-xl font-bold text-gray-800 text-center mb-2">お知らせ</h3>
            <p className="text-gray-600 text-center text-sm">動物園の最新情報やイベント情報をチェックしよう！</p>
            <div className="mt-4 bg-orange-100 text-orange-800 text-xs font-semibold px-3 py-1 rounded-full text-center">
              お知らせを見る
            </div>
          </div>
        </div>

        {/* ヘルプ */}
        <div
          onClick={() => navigate("/help")}
          className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-red-500"
        >
          <div className="p-6">
            <div className="text-6xl text-center mb-4">❓</div>
            <h3 className="text-xl font-bold text-gray-800 text-center mb-2">ヘルプ</h3>
            <p className="text-gray-600 text-center text-sm">使い方がわからない時はここをチェックしよう！</p>
            <div className="mt-4 bg-red-100 text-red-800 text-xs font-semibold px-3 py-1 rounded-full text-center">
              ヘルプを見る
            </div>
          </div>
        </div>

        {/* 注目動物 */}
        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg shadow-lg text-white">
          <div className="p-6">
            <div className="text-6xl text-center mb-4">⭐</div>
            <h3 className="text-xl font-bold text-center mb-2">今月の注目動物</h3>
            <p className="text-center text-sm opacity-90 mb-2">レッサーパンダの赤ちゃんが生まれました！</p>
            <div className="text-center text-xs bg-white text-orange-600 font-semibold px-3 py-1 rounded-full">
              特別企画
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
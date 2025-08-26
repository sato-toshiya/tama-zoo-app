// src/components/Layout.jsx
import React, { useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import Stepper from "./Stepper";
import { useResearch } from "../context/ResearchContext";

// 研究フローのパス（steps の順序と一致させる）
const STEP_PATHS = [
  "/questions",
  "/themes",
  "/selection",
  "/research",
  "/reflection",
  "/preview",
];

const isResearchPath = (path) => STEP_PATHS.includes(path);

export default function Layout() {
  const { currentStep, setCurrentStep } = useResearch(); // ← goTo は使わない
  const location = useLocation();
  const navigate = useNavigate();

  // 相互更新ループを防ぐフラグ
  const syncingRef = useRef(false);

  // URL → state 同期（直打ちで来たとき等）
  useEffect(() => {
    const path = location.pathname;
    const idx = STEP_PATHS.indexOf(path);
    if (idx >= 0 && idx !== currentStep) {
      syncingRef.current = true;
      setCurrentStep(idx);
      queueMicrotask(() => (syncingRef.current = false));
    }
  }, [location.pathname, currentStep, setCurrentStep]);

  // state → URL 同期（ボタンクリック等で currentStep が変わったとき）
  useEffect(() => {
    if (syncingRef.current) return;
    if (!isResearchPath(location.pathname)) return;

    const expected = STEP_PATHS[currentStep];
    if (expected && expected !== location.pathname) {
      syncingRef.current = true;
      navigate(expected, { replace: true });
      queueMicrotask(() => (syncingRef.current = false));
    }
  }, [currentStep, location.pathname, navigate]);

  const tabs = [
    { to: "/", label: "ホーム", icon: "🏠" },
    { to: "/questions", label: "研究ツール", icon: "🔬" },
    { to: "/history", label: "履歴", icon: "📚" },
    { to: "/others", label: "みんなの研究", icon: "👥" },
    { to: "/news", label: "お知らせ", icon: "📢" },
    { to: "/help", label: "ヘルプ", icon: "❓" },
  ];

  // 研究フロー配下は「研究ツール」をアクティブ表示
  const activeForTab = (to) => {
    if (to === "/questions") return isResearchPath(location.pathname);
    return location.pathname === to;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* ヘッダー */}
      <header className="bg-green-700 text-white p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <h1 className="text-2xl font-bold flex items-center gap-2">
                🦁 Zooっと自由研究
              </h1>
              <p className="text-green-100 mt-1">
                動物たちと一緒に素敵な研究をしよう！
              </p>
            </Link>
          </div>

          <nav className="mt-4">
            <div className="flex flex-wrap gap-2">
              {tabs.map((t) => (
                <Link
                  key={t.to}
                  to={t.to}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors flex items-center gap-1 ${
                    activeForTab(t.to)
                      ? "bg-white text-green-700"
                      : "bg-green-600 text-white hover:bg-green-500"
                  }`}
                >
                  <span className="text-lg">{t.icon}</span>
                  <span className="hidden sm:inline">{t.label}</span>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* 研究フローURLの時だけステッパー表示 */}
      {isResearchPath(location.pathname) && (
        <div className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto p-4">
            <Stepper />
          </div>
        </div>
      )}

      {/* ページ本体 */}
      <main className="max-w-6xl mx-auto p-6">
        <Outlet />
      </main>

      {/* フッター */}
      <footer className="bg-green-700 text-white p-4 mt-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-green-100">© Zooっと自由研究</p>
        </div>
      </footer>
    </div>
  );
}
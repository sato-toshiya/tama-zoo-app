import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { ResearchProvider } from "./context/ResearchContext";

// 既存のステップページ
import Questions from "./pages/Questions";
import Themes from "./pages/Themes";
import Selection from "./pages/Selection";
import Research from "./pages/Research";
import Reflection from "./pages/Reflection";
import Preview from "./pages/Preview";
import Completed from "./pages/Completed";

// 新規の一般ページ
import Home from "./pages/Home";
import History from "./pages/History";
import Others from "./pages/Others";
import News from "./pages/News";
import Help from "./pages/Help";

export default function App() {
  return (
    <ResearchProvider>
      <Routes>
        <Route element={<Layout />}>
          {/* 一般ページ */}
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/others" element={<Others />} />
          <Route path="/news" element={<News />} />
          <Route path="/help" element={<Help />} />

          {/* 研究フロー */}
          <Route path="/questions" element={<Questions />} />
          <Route path="/themes" element={<Themes />} />
          <Route path="/selection" element={<Selection />} />
          <Route path="/research" element={<Research />} />
          <Route path="/reflection" element={<Reflection />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/completed" element={<Completed />} />
        </Route>
      </Routes>
    </ResearchProvider>
  );
}
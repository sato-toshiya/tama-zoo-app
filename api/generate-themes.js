const generateThemes = async () => {
    // 1. ローディング画面を表示し、次のステップへ移動
    setIsLoading(true);
    setCurrentStep(1);

    // 2. AIへの指示（プロンプト）を作成
    const animalCategory = categories.find(c => c.id === formData.category)?.name || '動物';
    const difficultyText = formData.difficulty === '1' ? '簡単な観察中心' : formData.difficulty === '2' ? '少し詳しい比較や分析' : 'より深い研究';

    // 既存のテーマをAIへの高品質な「お手本」として使う
    const exampleTheme = JSON.stringify(observationThemes.mammal.easy[0], null, 2);

    const prompt = `
あなたは小学生向けの自由研究をサポートするAIアシスタントです。
以下の#条件に合った、動物園で観察できる面白い研究テーマを3つ提案してください。

#条件
- 対象学年: 小学${formData.grade}年生
- 興味のある動物カテゴリ: ${animalCategory}
- 希望する難易度: ${difficultyText}
- 出力形式: 必ず以下のJSON形式の「配列」として返してください。idはユニークな連番にしてください。

#出力形式のサンプル
\`\`\`json
[
  ${exampleTheme}
]
\`\`\`
`;

    // 3. AI APIを呼び出す（※ ここではシミュレーションを行います）
    try {
      // --- 将来的に、ここに実際のAPI呼び出しコード（fetchなど）を記述します ---
      console.log("AIへの指示（プロンプト）:", prompt);

      // AIが2秒間考えているように見せるシミュレーション
      const aiResponse = await new Promise(resolve => {
        setTimeout(() => {
          // シミュレーションのため、既存のデータから3つのテーマを返す
          const categoryThemes = observationThemes[formData.category] || observationThemes.mammal;
          const themes = (categoryThemes[formData.difficulty === '1' ? 'easy' : 'normal'] || categoryThemes.easy).slice(0, 3);
          resolve(themes);
        }, 2000);
      });
      // --- シミュレーションここまで ---

      setProposedThemes(aiResponse);

    } catch (error) {
      console.error("AIからのテーマ取得に失敗しました:", error);
      alert("テーマの生成に失敗しました。もう一度お試しください。");
      setCurrentStep(0); // エラー時は質問画面に戻る
    } finally {
      setIsLoading(false); // ローディングを終了
    }
  };
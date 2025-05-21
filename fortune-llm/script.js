const apiKey = window.OPENAI_API_KEY || '';

const resultEl = document.getElementById('result');

document.getElementById('fortuneForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!apiKey) {
        resultEl.textContent = 'APIキーが設定されていません。script.jsを編集するか OPENAI_API_KEY 環境変数を設定してください。';
        return;
    }

    const name = document.getElementById('name').value;
    const prompt = `${name}さんの今日の運勢を教えてください。`;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [{ role: 'user', content: prompt }]
            })
        });

        const data = await response.json();
        const result = data.choices?.[0]?.message?.content;
        resultEl.textContent = result || 'エラーが発生しました';
    } catch (err) {
        resultEl.textContent = 'リクエストに失敗しました。';
    }
});

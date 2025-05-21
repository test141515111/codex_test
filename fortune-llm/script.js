const apiKey = '';

async function getFortune(name) {
    if (!apiKey) {
        throw new Error('APIキーが設定されていません');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: `${name}さんの今日の運勢を教えてください。` }]
        })
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`API request failed: ${response.status} ${text}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content;
}

document.getElementById('fortuneForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = '占い中...';
    try {
        const result = await getFortune(name);
        resultDiv.textContent = result || '回答が空です';
    } catch (err) {
        console.error(err);
        resultDiv.textContent = `エラーが発生しました: ${err.message}`;
    }
});

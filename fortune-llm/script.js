const resultEl = document.getElementById('result');
const formEl = document.getElementById('fortuneForm');
const apiKeyInput = document.getElementById('apiKey');

const storedKey = localStorage.getItem('OPENAI_API_KEY');
if (storedKey) {
    apiKeyInput.value = storedKey;
}

formEl.addEventListener('submit', async (e) => {
    e.preventDefault();

    const apiKey = apiKeyInput.value.trim() || window.OPENAI_API_KEY || storedKey || '';
    if (!apiKey) {
        resultEl.textContent = 'API キーを入力してください。';
        return;
    }
    localStorage.setItem('OPENAI_API_KEY', apiKey);

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

        if (!response.ok) {
            resultEl.textContent = `API リクエストに失敗しました: ${response.status} ${response.statusText}`;
            return;
        }

        const data = await response.json();
        const result = data.choices?.[0]?.message?.content;
        resultEl.textContent = result || 'エラーが発生しました';
    } catch (err) {
        resultEl.textContent = 'リクエストに失敗しました。';
    }
});

const apiKey = '';

document.getElementById('fortuneForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const prompt = `${name}さんの今日の運勢を教えてください。`;

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
    const result = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
    document.getElementById('result').textContent = result || 'エラーが発生しました';
});


document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h2>NextDam Translator ✨</h2>
    <textarea id="text" placeholder="Write your post..."></textarea>
    <div class="inputs">
      <input id="lang" placeholder="Language (e.g. nl, en)" value="en" />
      <input id="tone" placeholder="Tone (e.g. professional, casual)" value="professional" />
    </div>
    <button id="btn">Translate & Adapt</button>
    <div id="result"></div>
  `;

  document.getElementById('btn').addEventListener('click', async () => {
    const text = document.getElementById('text').value;
    const language = document.getElementById('lang').value;
    const tone = document.getElementById('tone').value;

    if (!text.trim()) return alert("Please enter some text.");

    const result = document.getElementById('result');
    result.innerHTML = '<p><em>Loading...</em></p>';

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer YOUR_OPENAI_API_KEY',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{
            role: 'user',
            content: `Translate the following to ${language} with a ${tone} tone: "${text}"`
          }]
        })
      });
      const data = await res.json();
      result.innerHTML = '<strong>Translated:</strong><p>' + data.choices[0].message.content.trim() + '</p>';
    } catch (err) {
      console.error(err);
      result.innerHTML = '<p style="color:red;">Translation failed.</p>';
    }
  });
});

const express = require('express');
const path = require('path');
const OpenAI = require('openai');
const router = express.Router();

// Initialize OpenAI client
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Serve the index.html file for the root route
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

// Handle chat requests and return OpenAI responses
router.post('/chat', async (req, res) => {
  const { message } = req.body;
  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });
    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    console.error('OpenAI API error:', err);
    res.status(500).json({ error: 'Erro ao gerar resposta.' });
  }
});

module.exports = router;

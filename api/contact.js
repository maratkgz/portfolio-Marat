export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const { name, email, message } = req.body || {}

  if (
    typeof name !== 'string' || !name.trim() ||
    typeof email !== 'string' || !email.trim() ||
    typeof message !== 'string' || !message.trim()
  ) {
    res.status(400).json({ error: 'Missing fields' })
    return
  }

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    res.status(500).json({ error: 'Telegram is not configured' })
    return
  }

  const text = [
    '📩 Новое сообщение с портфолио',
    '',
    `Имя: ${name.slice(0, 200)}`,
    `Email: ${email.slice(0, 200)}`,
    '',
    message.slice(0, 3000),
  ].join('\n')

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    })

    if (!tgRes.ok) {
      res.status(502).json({ error: 'Telegram request failed' })
      return
    }

    res.status(200).json({ ok: true })
  } catch {
    res.status(502).json({ error: 'Telegram request failed' })
  }
}

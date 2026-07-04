const QUESTIONS = [
  { key: 'Тип проекта', text: 'Какой тип проекта вас интересует? (сайт, бот, мобильное приложение, другое)' },
  { key: 'Бюджет', text: 'Какой бюджет закладываете?' },
  { key: 'Сроки', text: 'Какие сроки нужны?' },
  { key: 'Email', text: 'Какой у вас email?' },
  { key: 'Телефон', text: 'Какой у вас номер телефона?' },
]

function buildChecklist(answers) {
  return Object.entries(answers)
    .map(([key, value]) => `✅ ${key}: ${value}`)
    .join('\n')
}

function parseAnswersFromText(text) {
  const answers = {}
  if (!text) return answers
  for (const line of text.split('\n')) {
    const match = line.match(/^✅ (.+?): (.+)$/)
    if (match) answers[match[1]] = match[2]
  }
  return answers
}

async function sendMessage(token, chatId, text, forceReply = false) {
  const body = { chat_id: chatId, text }
  if (forceReply) {
    body.reply_markup = { force_reply: true, input_field_placeholder: 'Ваш ответ...' }
  }
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end()
    return
  }

  const webhookSecret = process.env.TELEGRAM_WEBHOOK_SECRET
  if (webhookSecret && req.headers['x-telegram-bot-api-secret-token'] !== webhookSecret) {
    res.status(401).end()
    return
  }

  const token = process.env.TELEGRAM_BOT_TOKEN
  const ownerChatId = process.env.TELEGRAM_CHAT_ID
  const message = req.body?.message

  if (!token || !message?.text) {
    res.status(200).json({ ok: true })
    return
  }

  const chatId = message.chat.id
  const incomingText = message.text.trim()
  const repliedText = message.reply_to_message?.text
  const questionIndex = QUESTIONS.findIndex((q) => repliedText?.includes(q.text))

  if (questionIndex === -1) {
    if (incomingText === '/start') {
      await sendMessage(token, chatId, 'Привет! Помогу быстро оформить заявку — просто отвечайте на вопросы.')
    }
    await sendMessage(token, chatId, QUESTIONS[0].text, true)
    res.status(200).json({ ok: true })
    return
  }

  const answers = parseAnswersFromText(repliedText)
  answers[QUESTIONS[questionIndex].key] = incomingText
  const nextIndex = questionIndex + 1
  const checklist = buildChecklist(answers)

  if (nextIndex < QUESTIONS.length) {
    await sendMessage(token, chatId, `${checklist}\n\n${QUESTIONS[nextIndex].text}`, true)
  } else {
    const from = message.from
    const telegramHandle = from?.username ? `@${from.username}` : from?.first_name || 'не указан'
    answers['Telegram'] = telegramHandle
    const finalChecklist = buildChecklist(answers)

    await sendMessage(
      token,
      chatId,
      `Спасибо! Вот что записал:\n\n${finalChecklist}\n\nСвяжусь с вами в ближайшее время 🙌`,
    )

    if (ownerChatId && String(ownerChatId) !== String(chatId)) {
      await sendMessage(token, ownerChatId, `📋 Новая заявка от ${telegramHandle}:\n\n${finalChecklist}`)
    }
  }

  res.status(200).json({ ok: true })
}

import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { Cookie, Calendar, FolderKanban, Wallet, NotebookPen } from 'lucide-react'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '..', 'public', 'images')

const W = 1200
const H = 750

function dotGrid(seed) {
  const cols = 20
  const rows = 13
  const marginX = 50
  const marginY = 40
  const colGap = (W - marginX * 2) / (cols - 1)
  const rowGap = (H - marginY * 2) / (rows - 1)
  let dots = ''
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = marginX + c * colGap
      const y = marginY + r * rowGap
      const n = Math.abs(Math.sin((c + seed) * 12.9898 + (r + seed) * 78.233) * 43758.5453) % 1
      const isEmber = n > 0.88
      dots += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${isEmber ? 2.4 : 1.4}" fill="${isEmber ? '#ec5e27' : '#daf1de'}" opacity="${isEmber ? 0.55 : 0.12}"/>`
    }
  }
  return dots
}

function iconMarkup(IconComponent) {
  const svg = renderToStaticMarkup(
    createElement(IconComponent, { size: 240, strokeWidth: 1.15, color: '#daf1de' }),
  )
  return `<g transform="translate(${W - 480}, ${H / 2 - 120})" opacity="0.9">${svg}</g>`
}

function buildSvg({ kicker, title, tag, IconComponent, seed }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow" cx="80%" cy="38%" r="55%">
      <stop offset="0%" stop-color="#ec5e27" stop-opacity="0.14"/>
      <stop offset="70%" stop-color="#ec5e27" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#163832"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <g>${dotGrid(seed)}</g>

  <rect x="80" y="90" width="3" height="${H - 180}" fill="#ec5e27" opacity="0.85"/>

  <text x="112" y="140" font-family="'JetBrains Mono', monospace" font-size="18" letter-spacing="3" fill="#ec5e27">${kicker}</text>
  <text x="108" y="230" font-family="'Arial', sans-serif" font-weight="700" font-size="56" fill="#daf1de">${title}</text>
  <text x="112" y="272" font-family="'JetBrains Mono', monospace" font-size="17" fill="#9dbcad">${tag}</text>

  ${iconMarkup(IconComponent)}
</svg>`
}

const covers = [
  {
    file: 'aidan-cookies.png',
    kicker: 'E-COMMERCE · РЕАЛЬНЫЙ КЛИЕНТ',
    title: 'AIDAN cookies',
    tag: 'Express + MongoDB → Firebase',
    IconComponent: Cookie,
    seed: 1,
  },
  {
    file: 'white-rabbit.png',
    kicker: 'ОПЕРАЦИИ · РЕСТОРАН',
    title: 'White Rabbit',
    tag: 'React · Node.js · SQLite',
    IconComponent: Calendar,
    seed: 2,
  },
  {
    file: 'priyomnaya.png',
    kicker: 'КОД · УПРАВЛЕНИЕ',
    title: 'Приёмная',
    tag: 'React · PostgreSQL · Prisma · VPS',
    IconComponent: FolderKanban,
    seed: 3,
  },
  {
    file: 'birge.png',
    kicker: 'PWA · СЕМЕЙНЫЙ БЮДЖЕТ',
    title: 'Бирге',
    tag: 'React · Vite · Firebase',
    IconComponent: Wallet,
    seed: 4,
  },
  {
    file: 'gak-quiz.png',
    kicker: 'ОБРАЗОВАНИЕ · 160 ВОПРОСОВ',
    title: 'Квиз ГАК',
    tag: 'Vite · React · Tailwind',
    IconComponent: NotebookPen,
    seed: 5,
  },
]

for (const cover of covers) {
  const svg = buildSvg(cover)
  await sharp(Buffer.from(svg)).png().toFile(join(outDir, cover.file))
  console.log('generated', cover.file)
}

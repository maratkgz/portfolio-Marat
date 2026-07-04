import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '..', 'public')

const W = 1200
const H = 630
const COLS = 24
const ROWS = 13
const marginX = 40
const marginY = 30
const colGap = (W - marginX * 2) / (COLS - 1)
const rowGap = (H - marginY * 2) / (ROWS - 1)

let dots = ''
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    const x = marginX + c * colGap
    const y = marginY + r * rowGap
    const distFromEmberZone = Math.hypot(c - COLS * 0.72, r - ROWS * 0.4)
    const isEmber = distFromEmberZone < 3.4 && (c + r) % 3 === 0
    dots += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${isEmber ? 2.6 : 1.6}" fill="${isEmber ? '#ec5e27' : '#daf1de'}" opacity="${isEmber ? 0.8 : 0.15}"/>`
  }
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow" cx="78%" cy="42%" r="60%">
      <stop offset="0%" stop-color="#ec5e27" stop-opacity="0.16"/>
      <stop offset="70%" stop-color="#ec5e27" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#163832"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <g>${dots}</g>
  <rect x="96" y="120" width="3" height="380" fill="#ec5e27" opacity="0.9"/>
  <text x="132" y="168" font-family="'JetBrains Mono', monospace" font-size="19" letter-spacing="3" fill="#ec5e27">ПРИВЕТ, Я — МАРАТ</text>
  <text x="128" y="266" font-family="'Arial', sans-serif" font-weight="700" font-size="64" fill="#daf1de">Baktiyar uulu</text>
  <text x="128" y="341" font-family="'Arial', sans-serif" font-weight="700" font-size="64" fill="#ec5e27">Marat</text>
  <text x="132" y="404" font-family="'JetBrains Mono', monospace" font-size="23" fill="#9dbcad">Frontend &#183; Executive Assistant &#183; SMM</text>
  <text x="132" y="500" font-family="'JetBrains Mono', monospace" font-size="17" letter-spacing="2" fill="#9dbcad">portfolio-marat.vercel.app</text>
</svg>`

writeFileSync(join(outDir, 'og-cover.svg'), svg, 'utf-8')

await sharp(Buffer.from(svg)).png().toFile(join(outDir, 'og-cover.png'))

console.log('og-cover.svg + og-cover.png generated')

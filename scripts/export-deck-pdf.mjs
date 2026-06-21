import { spawn } from 'node:child_process'
import { mkdir } from 'node:fs/promises'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const chromePath =
  process.platform === 'darwin'
    ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    : process.platform === 'win32'
      ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
      : '/usr/bin/google-chrome'

async function main() {
  let playwright
  try {
    playwright = await import('playwright-core')
  } catch {
    console.error('playwright-core is not installed. Install it to use npm run export:deck.')
    process.exit(1)
  }

  const server = spawn('npm', ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '4174'], {
    stdio: 'ignore',
    shell: process.platform === 'win32',
  })

  try {
    await wait(2500)
    await mkdir('dist', { recursive: true })
    const browser = await playwright.chromium.launch({ executablePath: chromePath })
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })
    await page.goto('http://127.0.0.1:4174/deck?print=1', { waitUntil: 'networkidle' })
    await page.emulateMedia({ media: 'print' })
    await page.pdf({
      path: 'dist/cfo-control-deck.pdf',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    })
    await browser.close()
  } finally {
    server.kill()
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

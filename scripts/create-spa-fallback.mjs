import { copyFile, mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'

const copies = ['dist/404.html', 'dist/deck/index.html', 'dist/privacy/index.html']

await Promise.all(
  copies.map(async (target) => {
    await mkdir(dirname(target), { recursive: true })
    await copyFile('dist/index.html', target)
  }),
)

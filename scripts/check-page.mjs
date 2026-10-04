// Compile-check one or more page files without starting the dev server:
//   node scripts/check-page.mjs src/content/english/Tenses.jsx
// Catches syntax errors, bad relative imports and CSS module problems.
import { build } from 'vite'
import react from '@vitejs/plugin-react'

const files = process.argv.slice(2)
if (!files.length) {
  console.error('usage: node scripts/check-page.mjs <file.jsx> [...]')
  process.exit(1)
}

let failed = false
for (const file of files) {
  try {
    await build({
      configFile: false,
      logLevel: 'error',
      plugins: [react()],
      build: {
        write: false,
        lib: { entry: file, formats: ['es'], fileName: 'page' },
        rollupOptions: { external: [/^react/, /^antd/, /^@ant-design\//] },
      },
    })
    console.log('OK  ', file)
  } catch (err) {
    failed = true
    console.error('FAIL', file, '\n', err.message)
  }
}
process.exit(failed ? 1 : 0)

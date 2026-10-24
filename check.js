import { chromium } from 'playwright';
let browser;
try {
  browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  console.log('Playwright Chromium iniciou com sucesso.');
} catch (err) {
  console.error('Falha ao iniciar Chromium:', err.message);
  process.exitCode = 1;
} finally {
  await browser?.close();
}

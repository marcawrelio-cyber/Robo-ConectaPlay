import express from 'express';
import { chromium } from 'playwright';

const app = express();
const port = Number(process.env.PORT || 3000);
const TARGET = 'https://problack.sigma.vin/';
let running = false;

app.disable('x-powered-by');
app.get('/', (_req, res) => res.json({
  app: 'Robo ConectaPlay', status: 'online', mode: 'simulation',
  provider: 'PROBLACK', realActions: false, testEndpoint: '/teste-problack'
}));
app.get('/health', (_req, res) => res.json({ ok: true }));

app.get('/teste-problack', async (_req, res) => {
  if (running) return res.status(429).json({ ok: false, message: 'Um teste já está em andamento.' });
  running = true;
  let browser;
  try {
    browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    const response = await page.goto(TARGET, { waitUntil: 'domcontentloaded', timeout: 25000 });
    const title = (await page.title()).slice(0, 150);
    const finalUrl = page.url();
    res.json({
      ok: true, test: 'abertura da pagina publica',
      httpStatus: response?.status() ?? null, title,
      finalUrl, loginAttempted: false, realActions: false,
      note: 'Pagina carregada; isso nao comprova que login automatizado seja permitido.'
    });
  } catch (err) {
    console.error('Falha no teste PROBLACK:', err.message);
    res.status(503).json({
      ok: false, test: 'abertura da pagina publica',
      error: String(err.message).slice(0, 300),
      loginAttempted: false, realActions: false
    });
  } finally {
    if (browser) await browser.close().catch(() => {});
    running = false;
  }
});

app.listen(port, '0.0.0.0', () => console.log(`Robo ConectaPlay online na porta ${port}`));

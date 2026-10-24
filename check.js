import { chromium } from 'playwright';
const browser = await chromium.launch({headless:true});
const page = await browser.newPage();
await page.goto('about:blank');
console.log('Playwright OK:', await page.title());
await browser.close();

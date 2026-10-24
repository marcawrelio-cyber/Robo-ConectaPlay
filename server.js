import express from 'express';
import { chromium } from 'playwright';

const app = express();
const port = Number(process.env.PORT || 3000);
const TARGET = 'https://problack.sigma.vin/';
let running = false;
app.disable('x-powered-by');
app.get('/', (_req, res) => res.json({app:'Robo ConectaPlay',status:'online',mode:'diagnostic',provider:'PROBLACK',realActions:false,testEndpoint:'/teste-problack'}));
app.get('/health', (_req,res) => res.json({ok:true}));
app.get('/teste-problack', async (_req,res) => {
  if (running) return res.status(429).json({ok:false,error:'Teste em andamento. Aguarde.'});
  running = true;
  let browser;
  try {
    browser = await chromium.launch({headless:true,args:['--no-sandbox']});
    const page = await browser.newPage({viewport:{width:1280,height:800}});
    const response = await page.goto(TARGET,{waitUntil:'domcontentloaded',timeout:30000});
    await page.waitForTimeout(3500);
    const title = await page.title();
    const finalUrl = page.url();
    const text = (await page.locator('body').innerText().catch(()=>'' )).slice(0,350);
    const status = response?.status() ?? null;
    res.json({ok:status !== null && status < 400,test:'abertura da página pública',httpStatus:status,title,finalUrl,bodyPreview:text,loginAttempted:false,realActions:false,note:'Este teste não faz login nem contorna proteções.'});
  } catch (e) {
    console.error('PROBLACK diagnostic:',e.message);
    res.status(503).json({ok:false,test:'abertura da página pública',error:e.message.slice(0,300),loginAttempted:false,realActions:false});
  } finally {
    await browser?.close().catch(()=>{});
    running=false;
  }
});
app.listen(port,'0.0.0.0',()=>console.log(`Robo ConectaPlay ouvindo na porta ${port}`));

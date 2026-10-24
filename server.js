import express from 'express';
import { chromium } from 'playwright';

const app = express();
const port = Number(process.env.PORT || 3000);
const TARGET = 'https://panel-web.resell.media/#/login?redirect=/info/accountSecurity';
app.disable('x-powered-by');

app.get('/', (_req, res) => res.json({app:'Robo ConectaPlay',status:'online',version:'reseller-login-preparacao-v2',provider:'Reseller System',testEndpoint:'/teste-reseller',configEndpoint:'/config-login',realActions:false}));
app.get('/health', (_req,res) => res.json({ok:true}));

app.get('/config-login', (_req,res) => {
  res.json({ok:true,usernameConfigured:Boolean(process.env.RESELLER_USERNAME),passwordConfigured:Boolean(process.env.RESELLER_PASSWORD),note:'Somente informa se as variaveis estao presentes. Nunca retorna credenciais.',loginAttempted:false});
});

app.get('/teste-reseller', async (_req,res) => {
  let browser;
  try {
    browser = await chromium.launch({headless:true});
    const page = await browser.newPage({viewport:{width:1280,height:800}});
    const response = await page.goto(TARGET,{waitUntil:'domcontentloaded',timeout:30000});
    await page.waitForTimeout(3500);
    const result = await page.evaluate(() => ({
      title:document.title,
      visibleInputs:Array.from(document.querySelectorAll('input')).filter(e=>e.getClientRects().length>0).map(e=>({type:e.type||'text',placeholder:e.getAttribute('placeholder')||'',autocomplete:e.getAttribute('autocomplete')||''})),
      visibleButtons:Array.from(document.querySelectorAll('button')).filter(e=>e.getClientRects().length>0).map(e=>(e.innerText||e.getAttribute('aria-label')||'').trim().slice(0,60)).filter(Boolean).slice(0,12)
    }));
    res.json({ok:true,test:'public login page structure',httpStatus:response?.status()??null,finalUrl:page.url(),...result,loginAttempted:false,realActions:false,note:'Diagnostico sem usuario, senha ou leitura de codigo de verificacao.'});
  } catch(e) {res.status(200).json({ok:false,error:String(e.message||e).slice(0,400),loginAttempted:false,realActions:false});}
  finally {if(browser) await browser.close().catch(()=>{});}
});
app.listen(port,'0.0.0.0',()=>console.log(`Robo ConectaPlay online na porta ${port}`));

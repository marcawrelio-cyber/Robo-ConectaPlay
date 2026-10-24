import express from 'express';
const app = express();
const port = Number(process.env.PORT || 3000);
app.disable('x-powered-by');
app.get('/', (_req,res) => res.json({app:'Robo ConectaPlay',status:'online',mode:'simulation',provider:'PROBLACK',realActions:false}));
app.get('/health', (_req,res) => res.json({ok:true}));
app.listen(port,'0.0.0.0',()=>console.log(`Robo ConectaPlay online na porta ${port}`));

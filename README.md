# Robô ConectaPlay — Etapa 2

Servidor Express + Playwright, em modo de simulação.

- `/` estado do serviço
- `/health` verificação de saúde
- `/teste-problack` abre **somente a página pública** do PROBLACK em Chromium e devolve status HTTP, título e URL final.

**Não faz login, não envia credenciais, não cria nem renova contas e não consome créditos.**

## Instalação no GitHub/Render

Substitua na raiz do repositório os arquivos `Dockerfile`, `package.json`, `server.js`, `check.js` e `README.md` pelos arquivos deste pacote. O Render com Docker e branch `main` fará o redeploy. Não adicione senhas ao GitHub.

Depois do deploy, abra `https://robo-conectaplay.onrender.com/health` e `https://robo-conectaplay.onrender.com/teste-problack`.

**Limitação:** o Render gratuito com 512 MB pode não conseguir executar Chromium. Se falhar por memória, não contrate um plano sem antes analisar os logs. O teste não tenta superar bloqueios antibot.

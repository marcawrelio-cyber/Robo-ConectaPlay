# Robô ConectaPlay — Railway (Etapa inicial)

Este pacote publica apenas um servidor de teste. **Não acessa o PROBLACK, não armazena credenciais e não consome créditos.**

## Instalação pelo celular
1. Crie um repositório privado `Robo-ConectaPlay` no GitHub.
2. Envie os arquivos deste ZIP para a raiz do repositório (não envie o ZIP fechado).
3. No Railway, escolha **New Project > Deploy from GitHub repo** e selecione o repositório.
4. Aguarde o deploy; o Railway detectará o Dockerfile.
5. Em **Settings > Networking**, gere um domínio público e abra o endereço. Deve aparecer `status: online` e `mode: simulation`.

## Segurança e próximos passos
- Não publique usuário/senha do painel no GitHub, nem mesmo em repositório privado.
- Nunca exponha operações administrativas sem autenticação.
- O próximo passo será validar autorização de automação e os seletores reais do painel, com autenticação supervisionada.
- A integração Asaas deve validar a assinatura do webhook, deduplicar eventos e conferir o pagamento no servidor antes de solicitar qualquer ativação.
- A execução real deverá usar uma fila de trabalhos, logs seguros e verificações de idempotência para evitar consumo duplo de créditos.
- O serviço inicial responde `/` e `/health` e não realiza nenhuma operação no fornecedor.

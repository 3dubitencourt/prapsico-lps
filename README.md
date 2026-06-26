# Prapsico LPs

Landing pages do projeto Prapsico × Anhanguera (Next.js 16 + Tailwind 4 + Radix).

## Stack

- Next.js 16 (App Router)
- Tailwind CSS 4
- Radix UI
- Zod (validação dos forms)
- GTM ID: `GTM-PRHTN3VV`

## Rodando localmente

```bash
cp .env.example .env.local   # preencha as variáveis
npm install
npm run dev
```

Abrir http://localhost:3000.

---

## Para onde vão os formulários

Cada uma das 4 LPs com formulário envia para uma rota interna que dispara em paralelo:

| LP                       | Rota POST                     | Destinos                                                                    |
| ------------------------ | ----------------------------- | --------------------------------------------------------------------------- |
| `/aula-gratuita-cert`    | `/api/leads/aula-cert`        | Kommo · WhatsApp do time                                                    |
| `/aula-gratuita-pos`     | `/api/leads/aula-pos`         | Kommo · WhatsApp do time                                                    |
| `/inscricao-cert`        | `/api/leads/inscricao-cert`   | Kommo · WhatsApp do time · WhatsApp automático pro lead · Slack/Telegram    |
| `/inscricao-pos`         | `/api/leads/inscricao-pos`    | Kommo · WhatsApp do time · WhatsApp automático pro lead · Slack/Telegram    |

> Se uma env var de destino não estiver setada, aquele destino é **pulado silenciosamente** (com `console.log`). Nenhum form quebra.

---

## Setup: Kommo CRM (API v4 direta — recomendado)

Subdomínio: `psicoeducacao` (URL: `psicoeducacao.kommo.com`).

**Criar a integração privada (1 vez só):**

1. Kommo → **Configurações → Integrações**
2. Botão **"+ CRIAR INTEGRAÇÃO"** (canto superior direito)
3. Tipo: **"Integração privada"** (Private integration)
4. Nome: `Prapsico LPs`
5. Marcar scopes: **CRM / Leads / Contacts / Custom Fields / Notes**
6. Salvar → copiar o **"Token de acesso de longa duração"**

**Setar no Vercel:**

```env
KOMMO_SUBDOMAIN=psicoeducacao
KOMMO_ACCESS_TOKEN=<o token longo>
```

**O que acontecem quando um lead chega:**

- Cria Lead `Lead · {source}` no Kommo
- Cria Contato com `first_name`, `last_name`, `phone` (formatado 55…), `email`
- Adiciona tags: `source:<rota>`, `persona_B` (pós), `qualified` (inscrição), `pipeline:coordenacao_academica` (pós qualificada)
- Adiciona nota com detalhes extras: área, timing, formação, CRP

**Roteamento por pipeline:** crie automações no Kommo que filtram pela tag `source:*` e movem pro pipeline certo (CERT, PÓS, etc.).

### Alternativa: webhook genérico (Make/Zapier/n8n)

Se preferir não usar a API direta, setar `CRM_WEBHOOK_URL=<url-do-make>` no lugar dos `KOMMO_*`. O payload enviado é o JSON cru do lead com todos os labels já resolvidos.

---

## Setup: WhatsApp (notificação do time)

A cada lead, o time da Prapsico recebe um WhatsApp de aviso.

**Opções de provedor** (qualquer um que aceite webhook `{phone, message}`):

- **Z-API** ([z-api.io](https://z-api.io)) — mais simples, R$ ~80/mês
- **Evolution API** (self-hosted, grátis)
- **Make.com / n8n / Zapier** — encadeia com qualquer canal
- **WhatsApp Cloud API (Meta)** — oficial, free tier, mas requer template aprovado

Setar no env:

```env
WHATSAPP_NOTIFY_URL=https://api.z-api.io/instances/SEU_INSTANCE/token/SEU_TOKEN/send-text
SALES_WHATSAPP_NUMBER=5535992571045
```

Contrato do webhook (POST):

```json
{ "phone": "5535992571045", "message": "🔥 *Lead qualificado · CERT*\n*Nome:* ..." }
```

> Se o Kommo já dispara WhatsApp via automação interna, dá pra **deixar `WHATSAPP_NOTIFY_URL` vazia**. A notificação direta é só pra ter latência mais previsível (<5s) — meta de 1ª resposta < 5min.

---

## Setup: WhatsApp automático pro lead (opcional)

Quando alguém manda `/inscricao-cert` ou `/inscricao-pos`, o sistema envia uma mensagem automática de boas-vindas pro WhatsApp do lead. Use o mesmo provedor:

```env
WHATSAPP_AUTOMSG_WEBHOOK_URL=https://api.z-api.io/instances/...
```

---

## Setup: Slack / Telegram (opcional)

Notificação adicional pros canais internos. Tudo opcional — se não setar, é pulado.

```env
SLACK_LEADS_WEBHOOK_URL=https://hooks.slack.com/services/...
SLACK_COORDENACAO_WEBHOOK_URL=https://hooks.slack.com/services/...
TELEGRAM_BOT_TOKEN=...
TELEGRAM_LEADS_CHAT_ID=...
TELEGRAM_COORDENACAO_CHAT_ID=...
```

---

## Deploy

Auto via Vercel. Preencher todas as envs em **Vercel → Settings → Environment Variables** (Production + Preview).

Após setar as envs, fazer um redeploy manual pra forçar re-leitura.

---

## Testando o fluxo

```bash
# Local (sem envs setadas, vai cair no console.log)
curl -X POST http://localhost:3000/api/leads/aula-cert \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teste","whatsapp":"35999999999","email":"teste@teste.com"}'
```

Resposta esperada: `{"ok":true}`. Conferir logs do servidor pra ver o lead.

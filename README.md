# Nexus Executive Briefing

Portal executivo diário da Nexus Global Group, com três pautas para Nexus Global Aviation, três para Nexus Global Education e um Radar Executivo com as prioridades do dia.

## Tecnologia

- Next.js App Router
- OpenAI Responses API com pesquisa web
- GPT-5.6 Sol para análise e estruturação
- GPT Image 2 para imagens editoriais 4:5
- Vercel para hospedagem e funções server-side

## Desenvolvimento local

1. Copie `.env.example` para `.env.local`.
2. Defina `OPENAI_API_KEY` apenas no arquivo local.
3. Defina `NEXUS_ACCESS_CODE` para proteger as rotas que geram custos.
4. Instale as dependências com `npm install`.
5. Execute `npm run dev`.

O arquivo `.env.local` é ignorado pelo Git e nunca deve ser publicado. O código
administrativo é solicitado no navegador somente quando uma nova edição é gerada
e permanece na sessão atual.

## Segurança editorial

O briefing diferencia fatos, estimativas e inferências, prioriza fontes primárias e mantém links diretos. Todo conteúdo deve ser validado antes de decisões regulatórias, financeiras ou operacionais.

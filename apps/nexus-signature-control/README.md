# Nexus Signature Control

Aplicativo institucional para criação, pré-visualização, cópia e validação assistida de assinaturas de e-mail do ecossistema Nexus.

## Escopo

- 5 cargos requeridos pelo RBAC 119.69;
- 8 funções condicionais ou de sustentação;
- 3 funções da Nexus Global Education;
- exportação em HTML compatível com clientes de e-mail;
- cópia simultânea em HTML e texto simples;
- revisão de completude e coerência com a OpenAI Responses API;
- nenhuma alegação automática de homologação, nomeação ou aceitação pela ANAC.

## Desenvolvimento

```bash
npm install
npm run dev
```

Variáveis usadas no servidor:

```text
OPENAI_API_KEY
OPENAI_MODEL
```

O modelo padrão é `gpt-5.6-luna`. A chave deve ser configurada exclusivamente como segredo do ambiente de hospedagem.

## Validação

```bash
npm run lint
npm run build
```

O endpoint `/api/health` informa apenas se o serviço está ativo e se a integração de IA está configurada, sem expor credenciais.

import OpenAI from "openai";
import type { ExecutiveBriefing } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 300;

function isAuthorized(request: Request) {
  const expected = process.env.NEXUS_ACCESS_CODE;
  const received = request.headers.get("x-nexus-access-code");
  return Boolean(expected && received && received === expected);
}

const SYSTEM_PROMPT = `
Você é o núcleo de inteligência executiva da Nexus Global Group.
Pesquise notícias novas em cada execução, priorizando as últimas 24 horas e ampliando para 72 horas somente quando necessário.

Entregue JSON válido, sem markdown, com:
- title, generatedAt, windowHours (24, 48 ou 72), transparencyNote;
- articles: exatamente 6 itens;
- os 3 primeiros com division "aviation" e os 3 últimos com division "education";
- radar: exatamente 3 prioridades.

Cada article deve conter:
id, division, headline, imagePrompt, sourceName, publicationDate, factDate opcional,
sourceUrl direto, summary (3 a 5 frases), impact, action, relevance ("Alta", "Média" ou "Baixa")
e relevanceReason.

Requisitos editoriais:
- português do Brasil;
- fontes primárias e oficiais sempre que possível;
- links diretos e datas verificadas;
- nenhuma pauta repetida;
- diferencie fatos, estimativas e inferências;
- não invente números, declarações, fontes ou links;
- exclua rumores, conteúdo patrocinado disfarçado e pautas sem valor operacional;
- aviation: aviação comercial/executiva, fabricantes, aeroportos, tecnologia, segurança,
  sustentabilidade, ANAC, RBAC 121/135, DECEA, ICAO, IATA, FAA ou EASA;
- education: educação corporativa, treinamento em aviação/saúde, EdTech, IA na aprendizagem,
  compliance, certificação, liderança, simulação e alta performance;
- imagePrompt deve descrever uma única imagem editorial vertical 4:5 diretamente ligada ao fato,
  sem logos ou marcas regulatórias.
`;

function parseJson(text: string): ExecutiveBriefing {
  const clean = text
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/, "");
  const parsed = JSON.parse(clean) as ExecutiveBriefing;

  if (
    !Array.isArray(parsed.articles) ||
    parsed.articles.length !== 6 ||
    parsed.articles.filter((item) => item.division === "aviation").length !== 3 ||
    parsed.articles.filter((item) => item.division === "education").length !== 3 ||
    !Array.isArray(parsed.radar) ||
    parsed.radar.length !== 3
  ) {
    throw new Error("A resposta não respeitou a estrutura 3+3 do briefing.");
  }

  return parsed;
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return Response.json(
      { error: "Acesso administrativo não autorizado." },
      { status: 401 }
    );
  }

  if (!process.env.OPENAI_API_KEY) {
    return Response.json(
      { error: "OPENAI_API_KEY não configurada." },
      { status: 503 }
    );
  }

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const now = new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "America/Sao_Paulo"
    }).format(new Date());

    const response = await client.responses.create({
      model: "gpt-5.6-sol",
      reasoning: { effort: "medium" },
      tools: [{ type: "web_search" }],
      input: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Data e hora de referência em São Paulo: ${now}. Gere o briefing executivo de hoje.`
        }
      ],
      text: { verbosity: "medium" }
    });

    return Response.json(parseJson(response.output_text));
  } catch (error) {
    console.error("briefing_generation_failed", error);
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Falha ao gerar o briefing."
      },
      { status: 500 }
    );
  }
}

import OpenAI from "openai";

export const runtime = "nodejs";
export const maxDuration = 60;

type ReviewPayload = {
  selectedTitle?: string;
  usage?: string;
  basis?: string;
  functionalMailbox?: string;
  legalName?: string;
};

function isAuthorized(request: Request) {
  const expected = process.env.NEXUS_ACCESS_CODE;
  const received = request.headers.get("x-nexus-access-code");
  return Boolean(expected && received && received === expected);
}

const schema = {
  type: "object",
  additionalProperties: false,
  properties: {
    suggestedTitle: { type: "string" },
    functionalMailbox: { type: "string" },
    rationale: { type: "string" },
    cautions: {
      type: "array",
      items: { type: "string" },
      maxItems: 4
    }
  },
  required: ["suggestedTitle", "functionalMailbox", "rationale", "cautions"]
} as const;

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return Response.json({ error: "Acesso administrativo não autorizado." }, { status: 401 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return Response.json({ error: "OPENAI_API_KEY não configurada na Vercel." }, { status: 503 });
  }

  try {
    const payload = (await request.json()) as ReviewPayload;
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await client.responses.create({
      model: "gpt-5-mini",
      store: false,
      reasoning: { effort: "low" },
      input: [
        {
          role: "system",
          content:
            "Você revisa nomenclaturas de assinaturas institucionais para uma organização de aviação brasileira. Preserve rigor regulatório e corporativo. Não declare que uma pessoa está aprovada, homologada ou aceita pela ANAC. Não transforme função de apoio em cargo requerido. Não invente razão social, CNPJ, habilitação, designação ou base normativa. Produza português do Brasil objetivo."
        },
        {
          role: "user",
          content: JSON.stringify({
            tarefa: "Revisar título e caixa postal funcional de uma assinatura de e-mail",
            tituloSelecionado: payload.selectedTitle ?? "",
            orientacaoDeUso: payload.usage ?? "",
            baseInformada: payload.basis ?? "",
            caixaPostalAtual: payload.functionalMailbox ?? "",
            razaoSocial: payload.legalName ?? "não informada"
          })
        }
      ],
      text: {
        verbosity: "low",
        format: {
          type: "json_schema",
          name: "signature_review",
          strict: true,
          schema
        }
      }
    });

    return Response.json(JSON.parse(response.output_text));
  } catch (error) {
    console.error("signature_review_failed", error);
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : "Falha ao revisar a assinatura."
      },
      { status: 500 }
    );
  }
}

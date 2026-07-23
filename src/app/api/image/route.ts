import OpenAI from "openai";
import type { Division } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 300;

type RequestBody = {
  headline?: string;
  imagePrompt?: string;
  division?: Division;
};

function brandPrompt(
  headline: string,
  imagePrompt: string,
  division: Division
) {
  const context =
    division === "aviation"
      ? "cinematic realism; commercial or executive aviation, infrastructure, precision, safety and global connectivity"
      : "cinematic documentary photography; diverse professionals in authentic training, simulation, laboratory or control-centre environments; Knowledge Blue #58B7C8 limited to 20%";

  return `
Create one individual, high-resolution vertical 4:5 editorial image for this news:
"${headline}"

Scene: ${imagePrompt}
Visual context: ${context}.

Nexus visual system:
- deep Nexus Night #182947 and Aviation Blue #1D415C dominate;
- white #FFFFFF and restrained Aureus Gold #F39700 / Aureus Yellow #F3DE00 accents;
- premium corporate editorial aesthetic, geometric minimalism, sophisticated lighting;
- clean composition, generous negative space, subtle technical grid, thin orbital lines and discreet gold nodes.

No visible words. Do not add or reconstruct any logo. No government, regulator, airline,
manufacturer or partner marks. No certificates, seals, badges or approval symbols.
Avoid collage, neon, cartoon style, amateur photography, generic stock-photo appearance,
clutter, dominant warm tones, bevels, glow and 3D branding.
`;
}

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return Response.json(
      { error: "OPENAI_API_KEY não configurada." },
      { status: 503 }
    );
  }

  try {
    const body = (await request.json()) as RequestBody;
    if (!body.headline || !body.imagePrompt || !body.division) {
      return Response.json(
        { error: "headline, imagePrompt e division são obrigatórios." },
        { status: 400 }
      );
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const result = await client.images.generate({
      model: "gpt-image-2",
      prompt: brandPrompt(body.headline, body.imagePrompt, body.division),
      size: "1024x1536",
      quality: "medium"
    });

    const image = result.data?.[0];
    const imageUrl =
      image && "b64_json" in image && image.b64_json
        ? `data:image/png;base64,${image.b64_json}`
        : image && "url" in image
          ? image.url
          : undefined;

    if (!imageUrl) {
      throw new Error("A API não retornou uma imagem.");
    }

    return Response.json({ imageUrl });
  } catch (error) {
    console.error("image_generation_failed", error);
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : "Falha ao gerar a imagem."
      },
      { status: 500 }
    );
  }
}

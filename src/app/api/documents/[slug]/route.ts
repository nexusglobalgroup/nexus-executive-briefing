import { NextRequest } from "next/server";
import { getInstitutionalDocument } from "@/lib/institutional-documents";
import { buildReferencePdf } from "@/lib/reference-pdf";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const configuredCode = process.env.NEXUS_ACCESS_CODE;

  if (!configuredCode) {
    return Response.json(
      { error: "NEXUS_ACCESS_CODE não está configurado neste ambiente." },
      { status: 503 }
    );
  }

  const providedCode = request.headers.get("x-nexus-access-code");
  if (!providedCode || providedCode !== configuredCode) {
    return Response.json({ error: "Acesso não autorizado." }, { status: 401 });
  }

  const { slug } = await params;
  const document = getInstitutionalDocument(slug);
  if (!document) {
    return Response.json({ error: "Documento não encontrado." }, { status: 404 });
  }

  const pdf = buildReferencePdf(document);
  const safeName = `${document.slug}-nexus-web-reference.pdf`;

  return new Response(pdf, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${safeName}"`,
      "Cache-Control": "private, no-store, max-age=0",
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex, nofollow"
    }
  });
}

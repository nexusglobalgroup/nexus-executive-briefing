export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(
    {
      status: "ok",
      service: "nexus-signature-control",
      aiConfigured: Boolean(process.env.OPENAI_API_KEY),
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

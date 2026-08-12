import type { InstitutionalDocument } from "@/lib/institutional-documents";

type PdfEntry = {
  text: string;
  bold: boolean;
  size: number;
  kind: "brand" | "label" | "title" | "subtitle" | "status" | "note" | "heading" | "paragraph" | "space";
};

function normalizePdfText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[–—]/g, "-")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[^\x20-\x7E]/g, "");
}

function escapePdfText(value: string) {
  return normalizePdfText(value)
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function wrapText(value: string, maxLength = 88) {
  const words = normalizePdfText(value).split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxLength && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }

  if (line) lines.push(line);
  return lines;
}

function leadingFor(entry: PdfEntry) {
  if (entry.kind === "title") return 24;
  if (entry.kind === "heading") return 18;
  if (entry.kind === "space") return 7;
  return 14;
}

export function buildReferencePdf(document: InstitutionalDocument) {
  const entries: PdfEntry[] = [
    { text: "NEXUS GLOBAL GROUP", bold: true, size: 10, kind: "brand" },
    { text: "WEB REFERENCE DERIVATIVE", bold: true, size: 9, kind: "label" },
    { text: document.title, bold: true, size: 19, kind: "title" },
    { text: document.subtitle, bold: false, size: 11, kind: "subtitle" },
    { text: document.classification, bold: true, size: 10, kind: "status" },
    { text: document.status, bold: true, size: 10, kind: "status" },
    { text: document.sourceNote, bold: false, size: 9, kind: "note" }
  ];

  for (const section of document.sections) {
    entries.push({ text: section.heading, bold: true, size: 13, kind: "heading" });
    for (const paragraph of section.paragraphs) {
      entries.push({ text: paragraph, bold: false, size: 10, kind: "paragraph" });
    }
  }

  const rendered: PdfEntry[] = [];
  for (const entry of entries) {
    const maxLength = entry.kind === "title" ? 52 : entry.kind === "heading" ? 66 : 88;
    for (const line of wrapText(entry.text, maxLength)) {
      rendered.push({ ...entry, text: line });
    }
    if (["title", "subtitle", "note", "heading", "paragraph"].includes(entry.kind)) {
      rendered.push({ text: "", bold: false, size: 5, kind: "space" });
    }
  }

  const pages: PdfEntry[][] = [];
  let current: PdfEntry[] = [];
  let y = 748;

  for (const entry of rendered) {
    const leading = leadingFor(entry);
    if (y - leading < 64) {
      pages.push(current);
      current = [];
      y = 748;
    }
    current.push(entry);
    y -= leading;
  }
  if (current.length) pages.push(current);

  const objects: string[] = [];
  const addObject = (body: string) => {
    objects.push(body);
    return objects.length;
  };

  const catalogId = addObject("");
  const pagesId = addObject("");
  const regularFontId = addObject(
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>"
  );
  const boldFontId = addObject(
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>"
  );
  const pageIds: number[] = [];

  for (let pageIndex = 0; pageIndex < pages.length; pageIndex += 1) {
    let stream =
      "0.094 0.161 0.278 rg 0 780 595 62 re f\n" +
      "0.953 0.592 0 rg 0 775 595 5 re f\n";
    let yPosition = 748;

    for (const entry of pages[pageIndex]) {
      const leading = leadingFor(entry);
      if (entry.kind !== "space") {
        const font = entry.bold ? "F2" : "F1";
        let color = "0.10 0.16 0.25 rg";
        if (entry.kind === "brand" || entry.kind === "label") color = "1 1 1 rg";
        if (entry.kind === "status") color = "0.30 0.30 0.30 rg";
        stream += `BT /${font} ${entry.size} Tf ${color} 1 0 0 1 54 ${yPosition} Tm (${escapePdfText(entry.text)}) Tj ET\n`;
      }
      yPosition -= leading;
    }

    stream += `BT /F1 8 Tf 0.35 0.35 0.35 rg 1 0 0 1 54 35 Tm (Nexus Executive Briefing - reference derivative - page ${pageIndex + 1} of ${pages.length}) Tj ET\n`;

    const contentId = addObject(
      `<< /Length ${Buffer.byteLength(stream, "ascii")} >>\nstream\n${stream}endstream`
    );
    const pageId = addObject(
      `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${regularFontId} 0 R /F2 ${boldFontId} 0 R >> >> /Contents ${contentId} 0 R >>`
    );
    pageIds.push(pageId);
  }

  objects[catalogId - 1] = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`;
  objects[pagesId - 1] = `<< /Type /Pages /Kids [${pageIds
    .map((id) => `${id} 0 R`)
    .join(" ")}] /Count ${pageIds.length} >>`;

  let pdf = "%PDF-1.4\n%NEXUS\n";
  const offsets = [0];

  for (let index = 0; index < objects.length; index += 1) {
    offsets.push(Buffer.byteLength(pdf, "ascii"));
    pdf += `${index + 1} 0 obj\n${objects[index]}\nendobj\n`;
  }

  const xrefOffset = Buffer.byteLength(pdf, "ascii");
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let index = 1; index <= objects.length; index += 1) {
    pdf += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  return new Uint8Array(Buffer.from(pdf, "ascii"));
}

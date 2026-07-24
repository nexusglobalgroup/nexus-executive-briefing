import type { RoleDefinition } from "@/lib/roles";

export type SignatureForm = {
  fullName: string;
  personalEmail: string;
  phone: string;
  location: string;
  legalName: string;
  cnpj: string;
  domain: string;
  siteUrl: string;
  privacyUrl: string;
  dpoChannel: string;
  confidentialFooter: boolean;
};

export const initialForm: SignatureForm = {
  fullName: "",
  personalEmail: "",
  phone: "",
  location: "",
  legalName: "",
  cnpj: "",
  domain: "",
  siteUrl: "",
  privacyUrl: "",
  dpoChannel: "",
  confidentialFooter: false,
};

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const safeUrl = (value: string) => {
  const candidate = value.trim();
  if (!candidate) return "";

  try {
    const parsed = new URL(candidate);
    return parsed.protocol === "https:" || parsed.protocol === "http:"
      ? parsed.toString()
      : "";
  } catch {
    return "";
  }
};

const normalizeDomain = (value: string) =>
  value
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/\/.*$/, "")
    .replace(/^@/, "");

export function functionalAddress(role: RoleDefinition, domain: string) {
  const normalizedDomain = normalizeDomain(domain);
  return normalizedDomain
    ? `${role.functionalEmail}@${normalizedDomain}`
    : role.functionalEmail;
}

export function signatureText(form: SignatureForm, role: RoleDefinition) {
  const unit =
    role.unit === "education"
      ? "NEXUS GLOBAL EDUCATION\nUma marca Nexus Global Group"
      : "NEXUS GLOBAL GROUP\nOperações Aéreas | RBAC 135";
  const lines = [
    unit,
    "",
    form.fullName || "NOME COMPLETO",
    role.title,
    [form.phone, form.personalEmail].filter(Boolean).join(" | "),
    `Canal funcional: ${functionalAddress(role, form.domain)}${
      form.location ? ` | ${form.location}` : ""
    }`,
    [form.legalName, form.cnpj ? `CNPJ ${form.cnpj}` : "", form.siteUrl]
      .filter(Boolean)
      .join(" | "),
    [form.privacyUrl ? `Privacidade: ${form.privacyUrl}` : "", form.dpoChannel]
      .filter(Boolean)
      .join(" | "),
  ];

  if (form.confidentialFooter) {
    lines.push(
      "",
      "CONFIDENCIALIDADE — Esta mensagem pode conter informação restrita. Se você não é o destinatário, comunique o remetente e elimine o conteúdo.",
    );
  }

  return lines.filter((line, index) => line || index === 2).join("\n");
}

export function signatureHtml(form: SignatureForm, role: RoleDefinition) {
  const education = role.unit === "education";
  const accent = education ? "#58B7C8" : "#F39700";
  const brand = education ? "NEXUS GLOBAL EDUCATION" : "NEXUS GLOBAL GROUP";
  const descriptor = education
    ? "Uma marca Nexus Global Group"
    : "Operações Aéreas | RBAC 135";
  const person = escapeHtml(form.fullName.trim() || "NOME COMPLETO");
  const title = escapeHtml(role.title);
  const phone = escapeHtml(form.phone.trim());
  const email = escapeHtml(form.personalEmail.trim());
  const location = escapeHtml(form.location.trim());
  const legalName = escapeHtml(form.legalName.trim());
  const cnpj = escapeHtml(form.cnpj.trim());
  const site = safeUrl(form.siteUrl);
  const privacy = safeUrl(form.privacyUrl);
  const dpo = escapeHtml(form.dpoChannel.trim());
  const functionEmail = escapeHtml(functionalAddress(role, form.domain));

  const contactParts = [
    phone,
    email
      ? `<a href="mailto:${email}" style="color:#1D415C;text-decoration:none;">${email}</a>`
      : "",
  ].filter(Boolean);
  const legalParts = [
    legalName,
    cnpj ? `CNPJ ${cnpj}` : "",
    site
      ? `<a href="${escapeHtml(site)}" style="color:#1D415C;text-decoration:none;">${escapeHtml(
          site.replace(/^https?:\/\//, "").replace(/\/$/, ""),
        )}</a>`
      : "",
  ].filter(Boolean);
  const privacyParts = [
    privacy
      ? `Privacidade: <a href="${escapeHtml(privacy)}" style="color:#1D415C;text-decoration:none;">Aviso de Privacidade</a>`
      : "",
    dpo,
  ].filter(Boolean);

  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;font-family:Montserrat,'Open Sans',Arial,Helvetica,sans-serif;color:#182947;max-width:620px;background:#ffffff;">
  <tr>
    <td style="border-left:4px solid ${accent};padding:0 0 0 16px;">
      <div style="font-size:10px;line-height:14px;font-weight:700;letter-spacing:.6px;color:#182947;">${brand}</div>
      <div style="font-size:9px;line-height:14px;color:#1D415C;">${descriptor}</div>
      <div style="height:9px;line-height:9px;font-size:9px;">&nbsp;</div>
      <div style="font-size:16px;line-height:21px;font-weight:700;color:#182947;">${person}</div>
      <div style="font-size:11px;line-height:16px;font-weight:700;color:#1D415C;">${title}</div>
      <div style="height:7px;line-height:7px;font-size:7px;">&nbsp;</div>
      ${
        contactParts.length
          ? `<div style="font-size:10px;line-height:15px;color:#182947;">${contactParts.join(" &nbsp;|&nbsp; ")}</div>`
          : ""
      }
      <div style="font-size:9px;line-height:14px;color:#61718A;">Canal funcional: <a href="mailto:${functionEmail}" style="color:#1D415C;text-decoration:none;">${functionEmail}</a>${location ? ` &nbsp;|&nbsp; ${location}` : ""}</div>
      ${
        legalParts.length
          ? `<div style="font-size:9px;line-height:14px;color:#61718A;">${education ? "Operada por " : ""}${legalParts.join(" &nbsp;|&nbsp; ")}</div>`
          : ""
      }
      ${
        privacyParts.length
          ? `<div style="font-size:8px;line-height:13px;color:#61718A;">${privacyParts.join(" &nbsp;|&nbsp; ")}</div>`
          : ""
      }
      ${
        form.confidentialFooter
          ? `<div style="margin-top:9px;padding-top:7px;border-top:1px solid #D9E1EC;font-size:7.5px;line-height:11px;color:#7B8798;max-width:590px;">CONFIDENCIALIDADE — Esta mensagem pode conter informação restrita. Se você não é o destinatário, comunique o remetente e elimine o conteúdo.</div>`
          : ""
      }
    </td>
  </tr>
</table>`;
}

export function standaloneHtml(form: SignatureForm, role: RoleDefinition) {
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Assinatura — ${escapeHtml(form.fullName || role.shortTitle)}</title>
</head>
<body style="margin:0;padding:32px;background:#ffffff;">
${signatureHtml(form, role)}
</body>
</html>`;
}

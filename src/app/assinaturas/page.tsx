"use client";

import {
  BadgeCheck,
  BrainCircuit,
  Check,
  Clipboard,
  Download,
  Mail,
  Plane,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { useMemo, useState } from "react";
import styles from "./signatures.module.css";

type SignatureRole = {
  id: string;
  category: "required" | "support" | "education";
  brand: "group" | "education";
  title: string;
  usage: string;
  basis: string;
  functionalLocal: string;
};

type FormState = {
  fullName: string;
  phone: string;
  emailLocal: string;
  domain: string;
  city: string;
  legalName: string;
  cnpj: string;
  site: string;
  privacyUrl: string;
  dpoChannel: string;
};

const roles: SignatureRole[] = [
  { id: "accountable-manager", category: "required", brand: "group", title: "CEO | Gestor Responsável da Empresa de Transporte Aéreo", usage: "Ativar somente quando a designação estiver refletida nos atos constitutivos ou em delegação válida da operadora.", basis: "Estrutura de administração da operadora", functionalLocal: "gestor.responsavel" },
  { id: "operations-director", category: "required", brand: "group", title: "Diretor(a) ou Gerente de Operações", usage: "Pessoal de administração requerido para a condução das operações.", basis: "RBAC 119.69(a)(1)", functionalLocal: "diretor.operacoes" },
  { id: "chief-pilot", category: "required", brand: "group", title: "Piloto(a) Chefe", usage: "Pessoal de administração requerido para supervisão técnica das tripulações.", basis: "RBAC 119.69(a)(2)", functionalLocal: "piloto.chefe" },
  { id: "maintenance-director", category: "required", brand: "group", title: "Diretor(a) ou Gerente de Manutenção", usage: "Pessoal de administração requerido para a gestão da manutenção.", basis: "RBAC 119.69(a)(3)", functionalLocal: "diretor.manutencao" },
  { id: "safety-director", category: "required", brand: "group", title: "Diretor(a) ou Gerente de Segurança Operacional", usage: "Pessoal de administração requerido para a gestão da segurança operacional.", basis: "RBAC 119.69(a)(4)", functionalLocal: "seguranca.operacional" },
  { id: "operational-control", category: "support", brand: "group", title: "Coordenador(a) de Controle Operacional | Pessoa Autorizada", usage: "Nome e título devem constar no MGO quando houver autorização para exercer controle operacional.", basis: "RBAC 135.77", functionalLocal: "controle.operacional" },
  { id: "continuing-airworthiness", category: "support", brand: "group", title: "Coordenador(a) de Aeronavegabilidade Continuada", usage: "A função e sua subordinação devem refletir os manuais e programas aplicáveis.", basis: "PMAC/MGM aplicáveis", functionalLocal: "aeronavegabilidade" },
  { id: "required-inspection", category: "support", brand: "group", title: "Responsável pela Inspeção Obrigatória de Manutenção", usage: "Aplicável quando a estrutura de manutenção exigir pessoal de inspeção obrigatória.", basis: "RBAC 135.429", functionalLocal: "inspecao.manutencao" },
  { id: "training", category: "support", brand: "group", title: "Coordenador(a) de Treinamento Operacional e Qualificação", usage: "Função de suporte ao programa aprovado; instrutores e examinadores seguem requisitos próprios.", basis: "Programa de treinamento aprovado", functionalLocal: "treinamento.operacional" },
  { id: "quality", category: "support", brand: "group", title: "Coordenador(a) de Qualidade, Conformidade e Controle Documental", usage: "Função recomendada para governar manuais, revisões, evidências e conformidade; não substitui cargos requeridos.", basis: "Governança documental e conformidade", functionalLocal: "qualidade.documentos" },
  { id: "avsec", category: "support", brand: "group", title: "Responsável de Segurança da Aviação Civil | AVSEC", usage: "Aplicar conforme o escopo operacional e o programa de segurança da operadora.", basis: "PSOA/RBAC 108, quando aplicáveis", functionalLocal: "avsec" },
  { id: "dangerous-goods", category: "support", brand: "group", title: "Responsável por Artigos Perigosos", usage: "Aplicar conforme o escopo aprovado e as autorizações constantes das especificações operativas.", basis: "RBAC 175 e EO aplicáveis", functionalLocal: "artigos.perigosos" },
  { id: "dpo", category: "support", brand: "group", title: "Encarregado(a) de Dados | DPO", usage: "Função corporativa de privacidade; não integra o quadro regulatório requerido pelo RBAC 119.69.", basis: "LGPD e governança de privacidade", functionalLocal: "dpo" },
  { id: "education-executive", category: "education", brand: "education", title: "Diretor(a) Executivo(a) | Nexus Global Education", usage: "Liderança institucional da unidade educacional; não substitui cargo regulatório do operador aéreo.", basis: "Governança corporativa", functionalLocal: "education" },
  { id: "education-academic", category: "education", brand: "education", title: "Diretor(a) Acadêmico(a) e de Treinamento Aeronáutico", usage: "Responsável pela governança acadêmica e aderência pedagógica; a validação regulatória depende do treinamento ofertado.", basis: "Governança acadêmica", functionalLocal: "academico" },
  { id: "education-records", category: "education", brand: "education", title: "Coordenador(a) de Registros, Certificação e Qualidade Educacional", usage: "Responsável pela rastreabilidade de trilhas, registros e certificados; não alegar certificação regulatória sem base documental.", basis: "Rastreabilidade e qualidade educacional", functionalLocal: "registros.education" }
];

const initialForm: FormState = {
  fullName: "Vladimir Eustaquio Ferreira Antonoff",
  phone: "",
  emailLocal: "vladimir.antonoff",
  domain: "nexusglobalgroup.com.br",
  city: "Belo Horizonte/MG - Brasil",
  legalName: "",
  cnpj: "",
  site: "https://voenexus.aero",
  privacyUrl: "",
  dpoChannel: "dpo@nexusglobalgroup.com.br"
};

function clean(value: string) { return value.trim(); }
function escapeHtml(value: string) { return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;"); }
function normalizeDomain(value: string) { return clean(value).replace(/^https?:\/\//, "").replace(/\/$/, ""); }
function normalizeUrl(value: string) { const next = clean(value); if (!next) return ""; return /^https?:\/\//i.test(next) ? next : `https://${next}`; }

function signatureText(role: SignatureRole, form: FormState) {
  const domain = normalizeDomain(form.domain);
  const personal = form.emailLocal && domain ? `${clean(form.emailLocal)}@${domain}` : "";
  const functional = domain ? `${role.functionalLocal}@${domain}` : "";
  const company = role.brand === "education" ? "NEXUS GLOBAL EDUCATION" : "NEXUS GLOBAL GROUP";
  const subtitle = role.brand === "education" ? "Uma marca Nexus Global Group" : "Operações Aéreas | RBAC 135";
  return [company, subtitle, "", clean(form.fullName), role.title, "", [clean(form.phone), personal].filter(Boolean).join(" | "), [functional ? `Canal funcional: ${functional}` : "", clean(form.city)].filter(Boolean).join(" | "), [clean(form.legalName), form.cnpj ? `CNPJ ${clean(form.cnpj)}` : "", clean(form.site)].filter(Boolean).join(" | "), [form.privacyUrl ? `Privacidade: ${clean(form.privacyUrl)}` : "", clean(form.dpoChannel)].filter(Boolean).join(" | ")].filter((line, index, list) => line || (index > 0 && list[index - 1])).join("\n");
}

function signatureHtml(role: SignatureRole, form: FormState) {
  const domain = normalizeDomain(form.domain);
  const personalEmail = form.emailLocal && domain ? `${clean(form.emailLocal)}@${domain}` : "";
  const functionalEmail = domain ? `${role.functionalLocal}@${domain}` : "";
  const siteUrl = normalizeUrl(form.site);
  const privacyUrl = normalizeUrl(form.privacyUrl);
  const brand = role.brand === "education" ? "NEXUS GLOBAL EDUCATION" : "NEXUS GLOBAL GROUP";
  const subtitle = role.brand === "education" ? "Uma marca Nexus Global Group" : "Operações Aéreas | RBAC 135";
  const accent = role.brand === "education" ? "#58B7C8" : "#F39700";
  const companyPrefix = role.brand === "education" ? "Operada por " : "";
  const companyParts = [form.legalName ? `${companyPrefix}${escapeHtml(clean(form.legalName))}` : "", form.cnpj ? `CNPJ ${escapeHtml(clean(form.cnpj))}` : "", form.site ? `<a href="${escapeHtml(siteUrl)}" style="color:#1D415C;text-decoration:none;">${escapeHtml(clean(form.site))}</a>` : ""].filter(Boolean);
  const privacyParts = [form.privacyUrl ? `Privacidade: <a href="${escapeHtml(privacyUrl)}" style="color:#1D415C;text-decoration:none;">${escapeHtml(clean(form.privacyUrl))}</a>` : "", form.dpoChannel ? escapeHtml(clean(form.dpoChannel)) : ""].filter(Boolean);
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;font-family:Montserrat,Open Sans,Arial,Helvetica,sans-serif;color:#182947;max-width:620px;background:#ffffff;"><tr><td style="border-left:4px solid ${accent};padding:0 0 0 14px;"><div style="font-size:10px;line-height:14px;font-weight:700;letter-spacing:.45px;color:#182947;">${brand}</div><div style="font-size:9px;line-height:14px;color:#1D415C;">${subtitle}</div><div style="height:8px;line-height:8px;font-size:8px;">&nbsp;</div><div style="font-size:16px;line-height:21px;font-weight:700;color:#182947;">${escapeHtml(clean(form.fullName) || "NOME COMPLETO")}</div><div style="font-size:11px;line-height:16px;font-weight:700;color:#1D415C;">${escapeHtml(role.title)}</div><div style="height:7px;line-height:7px;font-size:7px;">&nbsp;</div><div style="font-size:10px;line-height:15px;color:#182947;">${form.phone ? `${escapeHtml(clean(form.phone))} &nbsp;|&nbsp; ` : ""}${personalEmail ? `<a href="mailto:${escapeHtml(personalEmail)}" style="color:#1D415C;text-decoration:none;">${escapeHtml(personalEmail)}</a>` : ""}</div><div style="font-size:9px;line-height:14px;color:#61718A;">${functionalEmail ? `Canal funcional: <a href="mailto:${escapeHtml(functionalEmail)}" style="color:#1D415C;text-decoration:none;">${escapeHtml(functionalEmail)}</a>` : ""}${functionalEmail && form.city ? " &nbsp;|&nbsp; " : ""}${escapeHtml(clean(form.city))}</div>${companyParts.length ? `<div style="font-size:9px;line-height:14px;color:#61718A;">${companyParts.join(" &nbsp;|&nbsp; ")}</div>` : ""}${privacyParts.length ? `<div style="font-size:8px;line-height:13px;color:#61718A;">${privacyParts.join(" &nbsp;|&nbsp; ")}</div>` : ""}</td></tr></table>`;
}

export default function SignaturesPage() {
  const [selectedRoleId, setSelectedRoleId] = useState(roles[0].id);
  const [form, setForm] = useState<FormState>(initialForm);
  const [copied, setCopied] = useState<"html" | "text" | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<{ suggestedTitle: string; functionalMailbox: string; rationale: string; cautions: string[] } | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const selectedRole = roles.find((role) => role.id === selectedRoleId) ?? roles[0];
  const html = useMemo(() => signatureHtml(selectedRole, form), [selectedRole, form]);
  const text = useMemo(() => signatureText(selectedRole, form), [selectedRole, form]);

  function updateField(field: keyof FormState, value: string) { setForm((current) => ({ ...current, [field]: value })); }
  async function copyHtml() { try { if (typeof ClipboardItem !== "undefined") { await navigator.clipboard.write([new ClipboardItem({ "text/html": new Blob([html], { type: "text/html" }), "text/plain": new Blob([text], { type: "text/plain" }) })]); } else { await navigator.clipboard.writeText(html); } setCopied("html"); window.setTimeout(() => setCopied(null), 1800); } catch { await navigator.clipboard.writeText(html); setCopied("html"); } }
  async function copyText() { await navigator.clipboard.writeText(text); setCopied("text"); window.setTimeout(() => setCopied(null), 1800); }
  function downloadHtml() { const documentHtml = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Assinatura Nexus</title></head><body>${html}</body></html>`; const blob = new Blob([documentHtml], { type: "text/html;charset=utf-8" }); const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = `assinatura-${selectedRole.id}.html`; link.click(); URL.revokeObjectURL(url); }

  async function reviewWithAi() {
    const savedCode = sessionStorage.getItem("nexus-access-code");
    const accessCode = savedCode ?? window.prompt("Digite o código administrativo Nexus para usar a revisão por IA:");
    if (!accessCode) return;
    sessionStorage.setItem("nexus-access-code", accessCode);
    setAiLoading(true); setAiError(null); setAiResult(null);
    try {
      const response = await fetch("/api/assinaturas/assist", { method: "POST", headers: { "Content-Type": "application/json", "x-nexus-access-code": accessCode }, body: JSON.stringify({ selectedTitle: selectedRole.title, usage: selectedRole.usage, basis: selectedRole.basis, functionalMailbox: `${selectedRole.functionalLocal}@${normalizeDomain(form.domain)}`, legalName: form.legalName }) });
      const payload = (await response.json()) as { suggestedTitle: string; functionalMailbox: string; rationale: string; cautions: string[] } | { error: string };
      if (!response.ok || "error" in payload) { if (response.status === 401) sessionStorage.removeItem("nexus-access-code"); throw new Error("error" in payload ? payload.error : "Falha na revisão por IA."); }
      setAiResult(payload);
    } catch (cause) { setAiError(cause instanceof Error ? cause.message : "Não foi possível concluir a revisão."); } finally { setAiLoading(false); }
  }

  const groupedRoles = [{ id: "required", label: "Cargos requeridos" }, { id: "support", label: "Funções de sustentação" }, { id: "education", label: "Nexus Global Education" }] as const;

  return <main className={styles.page}>
    <header className={styles.topbar}><a className={styles.brand} href="/" aria-label="Nexus Global Group"><span className={styles.brandMark}>✦</span><span><strong>NEXUS</strong><small>GLOBAL GROUP</small></span></a><span className={styles.status}><ShieldCheck size={15}/> Ambiente institucional</span></header>
    <section className={styles.hero}><div className={styles.heroGrid}/><div className={styles.heroContent}><span className={styles.eyebrow}><Sparkles size={15}/> Comunicação corporativa</span><h1>Gerador de assinaturas <span>RBAC 135</span></h1><p>Padronize identificação, canais funcionais e dados institucionais com pré-visualização em tempo real e HTML compatível com clientes de e-mail.</p><div className={styles.heroBadges}><span><BadgeCheck size={16}/> 16 funções mapeadas</span><span><Mail size={16}/> HTML + texto simples</span><span><Plane size={16}/> Nexus Aviation & Education</span></div></div></section>
    <div className={styles.notice}><ShieldCheck size={19}/><div><strong>Ativação controlada.</strong><p>O modelo não nomeia profissionais, não comprova aceitação da ANAC e deve refletir os atos societários, manuais e designações vigentes.</p></div></div>
    <div className={styles.workspace}>
      <section className={styles.controlPanel}><div className={styles.panelHeading}><span>01</span><div><small>Configuração</small><h2>Dados da assinatura</h2></div></div>
        <label className={styles.fieldWide}><span>Função institucional</span><select value={selectedRoleId} onChange={(event)=>{setSelectedRoleId(event.target.value);setAiResult(null)}}>{groupedRoles.map((group)=><optgroup label={group.label} key={group.id}>{roles.filter((role)=>role.category===group.id).map((role)=><option value={role.id} key={role.id}>{role.title}</option>)}</optgroup>)}</select></label>
        <div className={styles.roleNote}><strong>{selectedRole.basis}</strong><p>{selectedRole.usage}</p></div>
        <div className={styles.formGrid}>
          <label className={styles.fieldWide}><span>Nome completo</span><input value={form.fullName} onChange={(e)=>updateField("fullName",e.target.value)}/></label>
          <label><span>Telefone</span><input value={form.phone} placeholder="+55 31 00000-0000" onChange={(e)=>updateField("phone",e.target.value)}/></label>
          <label><span>E-mail nominal</span><div className={styles.compound}><input value={form.emailLocal} onChange={(e)=>updateField("emailLocal",e.target.value)}/><i>@</i><input value={form.domain} onChange={(e)=>updateField("domain",e.target.value)}/></div></label>
          <label className={styles.fieldWide}><span>Cidade/UF</span><input value={form.city} onChange={(e)=>updateField("city",e.target.value)}/></label>
          <label className={styles.fieldWide}><span>Razão social da operadora</span><input value={form.legalName} placeholder="Preencher após validação societária" onChange={(e)=>updateField("legalName",e.target.value)}/></label>
          <label><span>CNPJ</span><input value={form.cnpj} placeholder="00.000.000/0000-00" onChange={(e)=>updateField("cnpj",e.target.value)}/></label>
          <label><span>Site oficial</span><input value={form.site} onChange={(e)=>updateField("site",e.target.value)}/></label>
          <label><span>Aviso de Privacidade</span><input value={form.privacyUrl} placeholder="URL validada" onChange={(e)=>updateField("privacyUrl",e.target.value)}/></label>
          <label><span>Canal do DPO</span><input value={form.dpoChannel} onChange={(e)=>updateField("dpoChannel",e.target.value)}/></label>
        </div>
        <button className={styles.aiButton} onClick={reviewWithAi} disabled={aiLoading}><BrainCircuit size={18}/>{aiLoading?"Revisando nomenclatura...":"Revisar nomenclatura com IA"}</button>
        {aiError&&<div className={styles.aiError}>{aiError}</div>}
        {aiResult&&<div className={styles.aiResult}><span><Sparkles size={15}/> Parecer assistido</span><h3>{aiResult.suggestedTitle}</h3><code>{aiResult.functionalMailbox}</code><p>{aiResult.rationale}</p>{aiResult.cautions.length>0&&<ul>{aiResult.cautions.map((item)=><li key={item}>{item}</li>)}</ul>}</div>}
      </section>
      <section className={styles.previewPanel}><div className={styles.panelHeading}><span>02</span><div><small>Resultado</small><h2>Pré-visualização</h2></div></div><div className={styles.previewStage}><div className={styles.mailChrome}><span/><span/><span/><small>Nova mensagem</small></div><div className={styles.mailBody}><p>Atenciosamente,</p><div className={styles.signaturePreview} dangerouslySetInnerHTML={{__html:html}}/></div></div><div className={styles.actions}><button className={styles.primaryAction} onClick={copyHtml}>{copied==="html"?<Check size={18}/>:<Clipboard size={18}/>} {copied==="html"?"HTML copiado":"Copiar assinatura"}</button><button onClick={copyText}>{copied==="text"?<Check size={18}/>:<Mail size={18}/>} {copied==="text"?"Texto copiado":"Copiar texto"}</button><button onClick={downloadHtml}><Download size={18}/> Baixar HTML</button></div><div className={styles.installGuide}><strong>Aplicação recomendada</strong><ol><li>Preencha e valide todos os dados institucionais.</li><li>Use “Copiar assinatura” e cole no editor de assinatura do Gmail ou Outlook.</li><li>Envie uma mensagem de teste e confirme links, quebras e responsividade.</li></ol></div></section>
    </div>
    <footer className={styles.footer}><div><span>✦</span><strong>NEXUS GLOBAL GROUP</strong></div><p>Documento operacional de apoio. Validação regulatória, societária e de privacidade permanece sob responsabilidade da organização.</p></footer>
  </main>;
}

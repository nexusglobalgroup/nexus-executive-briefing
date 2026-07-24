"use client";

import {
  BadgeCheck,
  Building2,
  Check,
  ChevronRight,
  Clipboard,
  Download,
  FileCheck2,
  Mail,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  UserRound,
  WandSparkles,
} from "lucide-react";
import { useMemo, useState } from "react";

import {
  categoryLabels,
  getRole,
  roles,
  type RoleCategory,
} from "@/lib/roles";
import {
  functionalAddress,
  initialForm,
  signatureHtml,
  signatureText,
  standaloneHtml,
  type SignatureForm,
} from "@/lib/signature";

type ReviewCheck = {
  label: string;
  status: "ok" | "attention" | "missing";
  detail: string;
};

type ReviewResult = {
  summary: string;
  readiness: "ready" | "review" | "incomplete";
  checks: ReviewCheck[];
  recommendations: string[];
  disclaimer: string;
};

const categories: RoleCategory[] = ["required", "support", "education"];

const readinessLabels = {
  ready: "Consistente para validação",
  review: "Revisão recomendada",
  incomplete: "Dados incompletos",
};

const readinessIcons = {
  ready: BadgeCheck,
  review: ShieldCheck,
  incomplete: FileCheck2,
};

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  icon: Icon,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  icon?: typeof UserRound;
  hint?: string;
}) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <span className="input-shell">
        {Icon ? <Icon aria-hidden="true" size={16} /> : null}
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete="off"
        />
      </span>
      {hint ? <span className="field-hint">{hint}</span> : null}
    </label>
  );
}

export function SignatureStudio() {
  const [activeRoleId, setActiveRoleId] = useState("accountable-executive");
  const [form, setForm] = useState<SignatureForm>(initialForm);
  const [query, setQuery] = useState("");
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");
  const [reviewState, setReviewState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [review, setReview] = useState<ReviewResult | null>(null);
  const [reviewError, setReviewError] = useState("");

  const activeRole = getRole(activeRoleId);
  const html = useMemo(
    () => signatureHtml(form, activeRole),
    [activeRole, form],
  );

  const visibleRoles = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("pt-BR");
    if (!normalized) return roles;

    return roles.filter((role) =>
      [role.title, role.shortTitle, role.reference]
        .join(" ")
        .toLocaleLowerCase("pt-BR")
        .includes(normalized),
    );
  }, [query]);

  const updateForm = <Key extends keyof SignatureForm>(
    key: Key,
    value: SignatureForm[Key],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
    if (reviewState === "success") {
      setReviewState("idle");
      setReview(null);
    }
  };

  const selectRole = (roleId: string) => {
    setActiveRoleId(roleId);
    setReviewState("idle");
    setReview(null);
    document
      .getElementById("studio-workspace")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const copySignature = async () => {
    const plain = signatureText(form, activeRole);
    try {
      if (typeof ClipboardItem !== "undefined" && navigator.clipboard?.write) {
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/html": new Blob([html], { type: "text/html" }),
            "text/plain": new Blob([plain], { type: "text/plain" }),
          }),
        ]);
      } else {
        await navigator.clipboard.writeText(plain);
      }

      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 2200);
    } catch {
      await navigator.clipboard.writeText(plain);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 2200);
    }
  };

  const downloadSignature = () => {
    const file = standaloneHtml(form, activeRole);
    const blob = new Blob([file], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    const slug = (form.fullName || activeRole.shortTitle)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    anchor.href = url;
    anchor.download = `assinatura-nexus-${slug || activeRole.id}.html`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const requestReview = async () => {
    setReviewState("loading");
    setReviewError("");

    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form, role: activeRole }),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(
          payload?.error ?? "Não foi possível concluir a revisão.",
        );
      }

      setReview(payload.review);
      setReviewState("success");
    } catch (error) {
      setReviewState("error");
      setReviewError(
        error instanceof Error
          ? error.message
          : "Não foi possível concluir a revisão.",
      );
    }
  };

  return (
    <>
      <header className="site-header">
        <a className="brand-lockup" href="#top" aria-label="Nexus — início">
          <span className="brand-symbol">N</span>
          <span>
            <strong>NEXUS</strong>
            <small>GLOBAL GROUP</small>
          </span>
        </a>
        <div className="header-meta">
          <span className="status-dot" />
          <span>Comunicação Corporativa</span>
          <span className="header-count">16 modelos oficiais</span>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-orbit hero-orbit-one" />
          <div className="hero-orbit hero-orbit-two" />
          <div className="hero-grid" />
          <div className="hero-content">
            <div className="eyebrow">
              <span />
              NEXUS SIGNATURE CONTROL
            </div>
            <h1>
              Assinaturas institucionais
              <span> com precisão regulatória.</span>
            </h1>
            <p>
              Crie, valide e copie assinaturas compatíveis com clientes de
              e-mail para as funções do ecossistema Nexus, com governança RBAC
              135 e identidade visual unificada.
            </p>
            <a className="hero-cta" href="#studio">
              Acessar estúdio
              <ChevronRight aria-hidden="true" size={17} />
            </a>
          </div>
          <div className="hero-stats" aria-label="Resumo do catálogo">
            <div>
              <strong>05</strong>
              <span>Cargos requeridos</span>
            </div>
            <div>
              <strong>08</strong>
              <span>Funções de sustentação</span>
            </div>
            <div>
              <strong>03</strong>
              <span>Funções educacionais</span>
            </div>
          </div>
        </section>

        <section className="studio-section" id="studio">
          <div className="section-heading">
            <div>
              <span className="section-kicker">CENTRAL DE PADRONIZAÇÃO</span>
              <h2>Estúdio de assinaturas</h2>
            </div>
            <p>
              Selecione a função, preencha os dados validados e exporte o bloco
              pronto para Outlook, Gmail ou Apple Mail.
            </p>
          </div>

          <div className="studio-shell">
            <aside className="role-rail" aria-label="Catálogo de funções">
              <div className="rail-heading">
                <span>Catálogo de funções</span>
                <strong>{visibleRoles.length.toString().padStart(2, "0")}</strong>
              </div>
              <label className="search-box">
                <Search aria-hidden="true" size={16} />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Buscar função"
                  aria-label="Buscar função"
                />
              </label>

              <div className="role-groups">
                {categories.map((category) => {
                  const categoryRoles = visibleRoles.filter(
                    (role) => role.category === category,
                  );
                  if (!categoryRoles.length) return null;

                  return (
                    <div className="role-group" key={category}>
                      <div className="role-group-title">
                        <span>{categoryLabels[category]}</span>
                        <small>{categoryRoles.length}</small>
                      </div>
                      {categoryRoles.map((role) => (
                        <button
                          className={`role-button ${
                            role.id === activeRoleId ? "is-active" : ""
                          }`}
                          key={role.id}
                          onClick={() => selectRole(role.id)}
                          type="button"
                        >
                          <span className="role-index">
                            {String(roles.indexOf(role) + 1).padStart(2, "0")}
                          </span>
                          <span>
                            <strong>{role.shortTitle}</strong>
                            <small>{role.reference}</small>
                          </span>
                          <ChevronRight aria-hidden="true" size={15} />
                        </button>
                      ))}
                    </div>
                  );
                })}
              </div>
            </aside>

            <div className="workspace" id="studio-workspace">
              <div className="workspace-header">
                <div>
                  <span className={`role-badge ${activeRole.unit}`}>
                    {activeRole.category === "required"
                      ? "REQUERIDO"
                      : activeRole.unit === "education"
                        ? "EDUCATION"
                        : "SUSTENTAÇÃO"}
                  </span>
                  <h3>{activeRole.title}</h3>
                  <p>{activeRole.note}</p>
                </div>
                <span className="reference-chip">{activeRole.reference}</span>
              </div>

              <div className="workspace-grid">
                <form
                  className="data-panel"
                  onSubmit={(event) => event.preventDefault()}
                >
                  <div className="panel-title">
                    <div className="panel-number">01</div>
                    <div>
                      <h4>Dados do profissional</h4>
                      <p>Informações exibidas no bloco principal.</p>
                    </div>
                  </div>

                  <div className="field-grid">
                    <div className="field-span">
                      <Field
                        label="Nome completo"
                        value={form.fullName}
                        onChange={(value) => updateForm("fullName", value)}
                        placeholder="Nome completo validado"
                        icon={UserRound}
                      />
                    </div>
                    <Field
                      label="E-mail individual"
                      value={form.personalEmail}
                      onChange={(value) => updateForm("personalEmail", value)}
                      placeholder="nome.sobrenome@dominio"
                      type="email"
                      icon={Mail}
                    />
                    <Field
                      label="Telefone"
                      value={form.phone}
                      onChange={(value) => updateForm("phone", value)}
                      placeholder="+55 31 00000-0000"
                      icon={Phone}
                    />
                    <div className="field-span">
                      <Field
                        label="Cidade / UF"
                        value={form.location}
                        onChange={(value) => updateForm("location", value)}
                        placeholder="Belo Horizonte/MG — Brasil"
                        icon={Building2}
                      />
                    </div>
                  </div>

                  <div className="panel-divider" />

                  <div className="panel-title">
                    <div className="panel-number">02</div>
                    <div>
                      <h4>Dados corporativos</h4>
                      <p>Use somente informações formalmente validadas.</p>
                    </div>
                  </div>

                  <div className="field-grid">
                    <div className="field-span">
                      <Field
                        label="Razão social / unidade operadora"
                        value={form.legalName}
                        onChange={(value) => updateForm("legalName", value)}
                        placeholder="Razão social validada"
                      />
                    </div>
                    <Field
                      label="CNPJ"
                      value={form.cnpj}
                      onChange={(value) => updateForm("cnpj", value)}
                      placeholder="00.000.000/0000-00"
                    />
                    <Field
                      label="Domínio oficial"
                      value={form.domain}
                      onChange={(value) => updateForm("domain", value)}
                      placeholder="voenexus.aero"
                      hint={`Canal: ${functionalAddress(activeRole, form.domain)}`}
                    />
                    <div className="field-span">
                      <Field
                        label="Site oficial"
                        value={form.siteUrl}
                        onChange={(value) => updateForm("siteUrl", value)}
                        placeholder="https://voenexus.aero"
                        type="url"
                      />
                    </div>
                  </div>

                  <div className="panel-divider" />

                  <div className="panel-title">
                    <div className="panel-number">03</div>
                    <div>
                      <h4>Privacidade e classificação</h4>
                      <p>Controles para comunicação externa.</p>
                    </div>
                  </div>

                  <div className="field-grid">
                    <div className="field-span">
                      <Field
                        label="URL do Aviso de Privacidade"
                        value={form.privacyUrl}
                        onChange={(value) => updateForm("privacyUrl", value)}
                        placeholder="https://dominio/privacidade"
                        type="url"
                      />
                    </div>
                    <div className="field-span">
                      <Field
                        label="Canal do DPO / Encarregado"
                        value={form.dpoChannel}
                        onChange={(value) => updateForm("dpoChannel", value)}
                        placeholder="dpo@dominio"
                      />
                    </div>
                  </div>

                  <label className="switch-row">
                    <span>
                      <strong>Rodapé de confidencialidade</strong>
                      <small>
                        Ative apenas para mensagens classificadas como
                        Confidenciais ou Restritas.
                      </small>
                    </span>
                    <input
                      type="checkbox"
                      checked={form.confidentialFooter}
                      onChange={(event) =>
                        updateForm(
                          "confidentialFooter",
                          event.target.checked,
                        )
                      }
                    />
                    <span className="switch-control" aria-hidden="true">
                      <span />
                    </span>
                  </label>
                </form>

                <div className="preview-column">
                  <div className="preview-panel">
                    <div className="preview-toolbar">
                      <div>
                        <span>PRÉ-VISUALIZAÇÃO</span>
                        <small>Renderização segura para e-mail</small>
                      </div>
                      <span className="live-indicator">
                        <span />
                        AO VIVO
                      </span>
                    </div>

                    <div className="mail-window">
                      <div className="mail-topbar">
                        <span />
                        <span />
                        <span />
                        <small>Nova mensagem</small>
                      </div>
                      <div className="mail-meta">
                        <span>Para</span>
                        <div />
                        <span>Assunto</span>
                        <div />
                      </div>
                      <div className="mail-body">
                        <p>Atenciosamente,</p>
                        <div
                          className="signature-render"
                          dangerouslySetInnerHTML={{ __html: html }}
                        />
                      </div>
                    </div>

                    <div className="preview-actions">
                      <button
                        className="primary-action"
                        type="button"
                        onClick={copySignature}
                      >
                        {copyState === "copied" ? (
                          <Check aria-hidden="true" size={17} />
                        ) : (
                          <Clipboard aria-hidden="true" size={17} />
                        )}
                        {copyState === "copied"
                          ? "Assinatura copiada"
                          : "Copiar assinatura"}
                      </button>
                      <button
                        className="secondary-action"
                        type="button"
                        onClick={downloadSignature}
                      >
                        <Download aria-hidden="true" size={17} />
                        Baixar HTML
                      </button>
                    </div>
                    <p className="copy-note">
                      A cópia inclui versões HTML e texto simples para maior
                      compatibilidade.
                    </p>
                  </div>

                  <div className="governance-card">
                    <ShieldCheck aria-hidden="true" size={21} />
                    <div>
                      <strong>Ativação controlada</strong>
                      <p>
                        A assinatura padroniza a comunicação, mas não nomeia
                        profissional nem comprova homologação ou aceitação pela
                        ANAC.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <section className="ai-review">
                <div className="ai-heading">
                  <span className="ai-icon">
                    <WandSparkles aria-hidden="true" size={20} />
                  </span>
                  <div>
                    <span className="section-kicker">OPENAI · REVISÃO ASSISTIDA</span>
                    <h4>Verificação institucional inteligente</h4>
                    <p>
                      Analisa completude, coerência de domínio e cautelas de
                      uso. A decisão final permanece humana e documental.
                    </p>
                  </div>
                  <button
                    className="ai-button"
                    type="button"
                    onClick={requestReview}
                    disabled={reviewState === "loading"}
                  >
                    <Sparkles aria-hidden="true" size={17} />
                    {reviewState === "loading"
                      ? "Analisando..."
                      : review
                        ? "Revisar novamente"
                        : "Revisar com IA"}
                  </button>
                </div>

                {reviewState === "error" ? (
                  <div className="review-error" role="alert">
                    <ShieldCheck aria-hidden="true" size={18} />
                    <span>{reviewError}</span>
                  </div>
                ) : null}

                {review ? (
                  <div className="review-result">
                    <div className={`review-summary ${review.readiness}`}>
                      {(() => {
                        const Icon = readinessIcons[review.readiness];
                        return <Icon aria-hidden="true" size={24} />;
                      })()}
                      <div>
                        <span>{readinessLabels[review.readiness]}</span>
                        <p>{review.summary}</p>
                      </div>
                    </div>
                    <div className="review-checks">
                      {review.checks.map((check) => (
                        <div className="review-check" key={check.label}>
                          <span className={`check-dot ${check.status}`} />
                          <div>
                            <strong>{check.label}</strong>
                            <p>{check.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {review.recommendations.length ? (
                      <div className="review-recommendations">
                        <strong>Próximas validações</strong>
                        <ul>
                          {review.recommendations.map((recommendation) => (
                            <li key={recommendation}>{recommendation}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    <p className="review-disclaimer">{review.disclaimer}</p>
                  </div>
                ) : null}
              </section>
            </div>
          </div>
        </section>

        <section className="principles">
          <div className="section-heading principles-heading">
            <div>
              <span className="section-kicker">PADRÃO NEXUS</span>
              <h2>Três camadas de confiança</h2>
            </div>
          </div>
          <div className="principle-grid">
            <article>
              <span>01</span>
              <ShieldCheck aria-hidden="true" size={25} />
              <h3>Governança regulatória</h3>
              <p>
                Separação clara entre cargos requeridos, funções condicionais
                e papéis institucionais.
              </p>
            </article>
            <article>
              <span>02</span>
              <FileCheck2 aria-hidden="true" size={25} />
              <h3>Consistência documental</h3>
              <p>
                Campos críticos permanecem visíveis para validação antes da
                ativação corporativa.
              </p>
            </article>
            <article>
              <span>03</span>
              <BadgeCheck aria-hidden="true" size={25} />
              <h3>Identidade institucional</h3>
              <p>
                Nexus Night, Aviation Blue e acentos Aureus aplicados sem
                reconstruir ativos de marca.
              </p>
            </article>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="brand-lockup footer-brand">
          <span className="brand-symbol">N</span>
          <span>
            <strong>NEXUS</strong>
            <small>GLOBAL GROUP</small>
          </span>
        </div>
        <p>
          Tecnologia, inovação e excelência operacional para negócios de alta
          performance.
        </p>
        <span>Comunicação Corporativa · RBAC 135</span>
      </footer>
    </>
  );
}

"use client";

import { ArrowLeft, ExternalLink, FileText, LoaderCircle, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { institutionalDocuments } from "@/lib/institutional-documents";
import styles from "./documentos.module.css";

export default function DocumentsPage() {
  const [loadingSlug, setLoadingSlug] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function openReferencePdf(slug: string) {
    const savedCode = sessionStorage.getItem("nexus-access-code");
    const accessCode =
      savedCode ??
      window.prompt("Digite o código administrativo Nexus para abrir a referência PDF:");

    if (!accessCode) return;
    sessionStorage.setItem("nexus-access-code", accessCode);
    setLoadingSlug(slug);
    setError(null);

    try {
      const response = await fetch(`/api/documents/${slug}`, {
        headers: { "x-nexus-access-code": accessCode },
        cache: "no-store"
      });

      if (response.status === 401) {
        sessionStorage.removeItem("nexus-access-code");
      }

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(payload?.error ?? "Não foi possível abrir a referência PDF.");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank", "noopener,noreferrer");
      window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Não foi possível abrir a referência PDF."
      );
    } finally {
      setLoadingSlug(null);
    }
  }

  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <a href="/" className={styles.backLink}>
          <ArrowLeft size={17} />
          Briefing executivo
        </a>
        <span>NEXUS GLOBAL GROUP · CONTROLLED DOCUMENT REFERENCES</span>
      </header>

      <section className={styles.hero}>
        <div>
          <span className={styles.kicker}>Biblioteca institucional</span>
          <h1>Documentos de referência Nexus</h1>
          <p>
            Camada digital para consulta controlada dos padrões institucionais que
            sustentam o Nexus Executive Briefing e o modelo de despacho operacional.
          </p>
        </div>
        <ShieldCheck size={46} />
      </section>

      <section className={styles.boundary}>
        <ShieldCheck size={19} />
        <p>
          As referências PDF abertas nesta página são derivados web gerados no
          servidor. Elas não substituem os PDFs institucionais originais, seus
          controles documentais, manuais aprovados, autorizações operacionais ou
          fontes vigentes do operador.
        </p>
      </section>

      {error && <div className={styles.error}>{error}</div>}

      <section className={styles.grid}>
        {institutionalDocuments.map((document, index) => {
          const loading = loadingSlug === document.slug;
          return (
            <article className={styles.card} key={document.slug}>
              <div className={styles.cardHeader}>
                <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                <FileText size={28} />
              </div>
              <span className={styles.classification}>{document.classification}</span>
              <h2>{document.title}</h2>
              <p className={styles.subtitle}>{document.subtitle}</p>
              <div className={styles.status}>{document.status}</div>
              <p className={styles.sourceNote}>{document.sourceNote}</p>
              <button
                type="button"
                onClick={() => openReferencePdf(document.slug)}
                disabled={loadingSlug !== null}
              >
                {loading ? <LoaderCircle className={styles.spin} size={17} /> : <ExternalLink size={17} />}
                {loading ? "Abrindo referência..." : "Abrir referência PDF"}
              </button>
            </article>
          );
        })}
      </section>

      <footer className={styles.footer}>
        <strong>NEXUS GLOBAL GROUP</strong>
        <span>GitHub · Vercel · OpenAI · controlled web references</span>
      </footer>
    </main>
  );
}

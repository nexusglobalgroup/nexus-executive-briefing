"use client";

import {
  ArrowUpRight,
  BookOpen,
  Check,
  Clock3,
  GraduationCap,
  LoaderCircle,
  Plane,
  Radar,
  RefreshCw,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { useMemo, useState } from "react";
import { seedBriefing } from "@/lib/seed";
import type {
  BriefingArticle,
  Division,
  ExecutiveBriefing
} from "@/lib/types";

const sectionData: Record<
  Division,
  { eyebrow: string; title: string; icon: typeof Plane }
> = {
  aviation: {
    eyebrow: "Nexus Global Aviation",
    title: "Aviação, operação e conectividade",
    icon: Plane
  },
  education: {
    eyebrow: "Nexus Global Education",
    title: "Conhecimento que transforma performance",
    icon: GraduationCap
  }
};

function ArtPlaceholder({ division }: { division: Division }) {
  return (
    <div className={`art-placeholder ${division}`} aria-hidden="true">
      <div className="orbital orbital-one" />
      <div className="orbital orbital-two" />
      <div className="gold-star">✦</div>
      <div className="technical-grid" />
      <div className="visual-mark">
        {division === "aviation" ? <Plane /> : <BookOpen />}
      </div>
    </div>
  );
}

function ArticleCard({
  article,
  index,
  imageLoading
}: {
  article: BriefingArticle;
  index: number;
  imageLoading: boolean;
}) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className="news-card">
      <div className="news-visual">
        {article.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={article.imageUrl} alt="" />
        ) : (
          <ArtPlaceholder division={article.division} />
        )}
        {imageLoading && (
          <div className="image-loading">
            <LoaderCircle className="spin" />
            <span>Gerando ilustração</span>
          </div>
        )}
        <span className="illustration-label">
          {article.imageUrl ? "Ilustração gerada por IA" : "Visual editorial"}
        </span>
        <span className="story-number">{number}</span>
      </div>

      <div className="news-body">
        <div className="source-row">
          <span>{article.sourceName}</span>
          <span className="source-dot" />
          <span>{article.publicationDate}</span>
        </div>

        <h3>{article.headline}</h3>

        <div className="summary">
          {article.summary.map((sentence) => (
            <p key={sentence}>{sentence}</p>
          ))}
        </div>

        <div className="analysis-block">
          <span className="analysis-kicker">Impacto para a Nexus</span>
          <p>{article.impact}</p>
        </div>

        <div className="action-row">
          <div>
            <span className="analysis-kicker">Ação recomendada</span>
            <p>{article.action}</p>
          </div>
          <span className={`relevance ${article.relevance.toLowerCase()}`}>
            {article.relevance}
          </span>
        </div>

        <div className="relevance-reason">
          <ShieldCheck size={15} />
          <span>{article.relevanceReason}</span>
        </div>

        <a
          className="source-link"
          href={article.sourceUrl}
          target="_blank"
          rel="noreferrer"
        >
          Acessar fonte original
          <ArrowUpRight size={16} />
        </a>
      </div>
    </article>
  );
}

export default function Home() {
  const [briefing, setBriefing] = useState<ExecutiveBriefing>(seedBriefing);
  const [generating, setGenerating] = useState(false);
  const [imageProgress, setImageProgress] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const sections = useMemo(
    () =>
      (["aviation", "education"] as Division[]).map((division) => ({
        division,
        ...sectionData[division],
        articles: briefing.articles.filter(
          (article) => article.division === division
        )
      })),
    [briefing]
  );

  async function generateImages(next: ExecutiveBriefing) {
    const articles = [...next.articles];

    for (let index = 0; index < articles.length; index += 1) {
      const article = articles[index];
      setImageProgress((current) => [...current, article.id]);

      const response = await fetch("/api/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          headline: article.headline,
          imagePrompt: article.imagePrompt,
          division: article.division
        })
      });

      if (!response.ok) continue;
      const payload = (await response.json()) as { imageUrl?: string };
      if (payload.imageUrl) {
        articles[index] = { ...article, imageUrl: payload.imageUrl };
        setBriefing({ ...next, articles: [...articles] });
      }
    }
  }

  async function generateBriefing() {
    setGenerating(true);
    setError(null);
    setImageProgress([]);

    try {
      const response = await fetch("/api/briefing", { method: "POST" });
      const payload = (await response.json()) as
        | ExecutiveBriefing
        | { error: string };

      if (!response.ok || "error" in payload) {
        throw new Error("error" in payload ? payload.error : "Falha na geração.");
      }

      setBriefing(payload);
      await generateImages(payload);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Não foi possível atualizar o briefing."
      );
    } finally {
      setGenerating(false);
      setImageProgress([]);
    }
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Nexus Executive Briefing">
          <span className="brand-star">✦</span>
          <span>
            <strong>NEXUS</strong>
            <small>EXECUTIVE INTELLIGENCE</small>
          </span>
        </a>
        <div className="topbar-meta">
          <span>
            <Clock3 size={15} />
            Atualização diária
          </span>
          <button onClick={generateBriefing} disabled={generating}>
            {generating ? (
              <LoaderCircle className="spin" size={17} />
            ) : (
              <RefreshCw size={17} />
            )}
            {generating ? "Atualizando..." : "Gerar briefing"}
          </button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" />
        <div className="hero-orbit orbit-a" />
        <div className="hero-orbit orbit-b" />
        <div className="hero-content">
          <div className="hero-kicker">
            <Sparkles size={16} />
            Inteligência executiva aplicada
          </div>
          <h1>
            Decisões melhores começam
            <span> com contexto confiável.</span>
          </h1>
          <p className="hero-copy">
            Seis sinais estratégicos por dia para antecipar movimentos em
            aviação, educação, tecnologia e operações críticas.
          </p>
          <div className="hero-footer">
            <div>
              <small>Edição</small>
              <strong>{briefing.generatedAt}</strong>
            </div>
            <div>
              <small>Janela editorial</small>
              <strong>Até {briefing.windowHours} horas</strong>
            </div>
            <div>
              <small>Composição</small>
              <strong>3 Aviation + 3 Education</strong>
            </div>
          </div>
        </div>
      </section>

      <div className="status-strip">
        <Check size={16} />
        <span>{briefing.transparencyNote}</span>
      </div>

      {error && (
        <div className="error-banner">
          <strong>Atualização não concluída.</strong>
          <span>{error}</span>
        </div>
      )}

      <div className="briefing-shell">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <section className="division-section" key={section.division}>
              <header className="section-heading">
                <div className={`section-icon ${section.division}`}>
                  <Icon />
                </div>
                <div>
                  <span>{section.eyebrow}</span>
                  <h2>{section.title}</h2>
                </div>
                <div className="section-count">03 pautas</div>
              </header>

              <div className="news-grid">
                {section.articles.map((article, index) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    index={
                      section.division === "aviation" ? index : index + 3
                    }
                    imageLoading={imageProgress.includes(article.id)}
                  />
                ))}
              </div>
            </section>
          );
        })}

        <section className="radar-section">
          <div className="radar-heading">
            <Radar />
            <div>
              <span>Fechamento do dia</span>
              <h2>Radar Executivo Nexus</h2>
            </div>
          </div>
          <div className="radar-grid">
            {briefing.radar.map((priority, index) => (
              <article key={priority}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{priority}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <footer>
        <div className="footer-brand">
          <span className="brand-star">✦</span>
          <strong>NEXUS GLOBAL GROUP</strong>
        </div>
        <p>
          Conteúdo de apoio à decisão. Fontes devem ser verificadas antes de
          decisões regulatórias, financeiras ou operacionais.
        </p>
        <span>Powered by OpenAI</span>
      </footer>
    </main>
  );
}

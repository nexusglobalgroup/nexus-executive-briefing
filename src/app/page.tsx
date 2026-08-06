import Link from "next/link";
import { ArrowRight, Plane, GraduationCap, Shield, BarChart3, Target, Zap, Globe, CheckCircle, Star } from "lucide-react";

const services = [
  {
    icon: Plane,
    title: "Nexus Global Aviation",
    description: "Operações aéreas executivas, MRO, consultoria regulatória ANAC e gerenciamento de frota para empresas e executivos de alto desempenho.",
    cta: "/servicos",
    accent: "#f39700"
  },
  {
    icon: GraduationCap,
    title: "Nexus Global Education",
    description: "Formação e certificação de tripulantes, cursos aeromédicos, simuladores e programas de desenvolvimento para profissionais da aviação.",
    cta: "/servicos",
    accent: "#58b7c8"
  },
  {
    icon: BarChart3,
    title: "Inteligência Executiva",
    description: "Briefings estratégicos diários, análise de mercado, oportunidades de negócio e painel de decisão para líderes que precisam de contexto confiável.",
    cta: "/dashboard",
    accent: "#4caf7d"
  }
];

const capabilities = [
  { icon: Shield, label: "Conformidade ANAC", desc: "Gestão regulatória com zero tolerância a desvios." },
  { icon: Target, label: "Pipeline Comercial", desc: "Identificação e qualificação de oportunidades estratégicas." },
  { icon: Zap, label: "Resposta Operacional", desc: "Estrutura ágil para demandas críticas de voo e suporte." },
  { icon: Globe, label: "Alcance Nacional", desc: "Presença e relacionamento em todos os hubs estratégicos do Brasil." },
  { icon: BarChart3, label: "Análise de Mercado", desc: "Inteligência aplicada ao setor de aviação e educação." },
  { icon: Star, label: "Certificação Internacional", desc: "Programas alinhados às normas FAA, EASA e ICAO." }
];

const differentiators = [
  "Integração entre aviação e educação — único operador com as duas vertentes sob uma só gestão",
  "Equipe com experiência operacional real, não apenas consultiva",
  "Briefings diários com inteligência de mercado aplicada ao seu negócio",
  "Compliance regulatório como cultura, não como checklist",
  "Relacionamento direto com órgãos reguladores e parceiros estratégicos"
];

const marketStats = [
  { label: "Mercado de aviação executiva no Brasil", value: "R$ 8,4B", sub: "estimativa 2025" },
  { label: "Crescimento anual do setor", value: "+11%", sub: "CAGR 2022–2026" },
  { label: "Pilotos certificados em formação", value: "12.000+", sub: "demanda crescente" },
  { label: "Empresas com frota própria no Brasil", value: "3.200+", sub: "potenciais clientes" }
];

export default function LandingPage() {
  return (
    <main className="landing">
      {/* HERO */}
      <section className="lp-hero" aria-labelledby="hero-heading">
        <div className="lp-hero-grid" aria-hidden="true" />
        <div className="lp-hero-orbit lp-orbit-a" aria-hidden="true" />
        <div className="lp-hero-orbit lp-orbit-b" aria-hidden="true" />
        <div className="lp-hero-content">
          <div className="lp-kicker">
            <span className="lp-star" aria-hidden="true">✦</span>
            Inteligência executiva aplicada à aviação e educação
          </div>
          <h1 id="hero-heading" className="lp-headline">
            Decisões estratégicas
            <span className="lp-headline-accent"> com contexto de alto padrão.</span>
          </h1>
          <p className="lp-subheadline">
            A Nexus Global Group une operações aéreas executivas e formação de tripulantes com inteligência de mercado diária — tudo o que líderes precisam para voar mais alto.
          </p>
          <div className="lp-hero-ctas">
            <Link href="/dashboard" className="btn btn-primary btn-lg">
              Acessar Dashboard
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/servicos" className="btn btn-secondary btn-lg">
              Nossos Serviços
            </Link>
          </div>
        </div>
      </section>

      {/* MARKET STATS */}
      <section className="lp-stats" aria-labelledby="stats-heading">
        <div className="lp-container">
          <h2 id="stats-heading" className="sr-only">Mercado de aviação executiva</h2>
          <div className="lp-stats-grid">
            {marketStats.map((stat) => (
              <div key={stat.label} className="lp-stat-card">
                <strong className="lp-stat-value">{stat.value}</strong>
                <span className="lp-stat-label">{stat.label}</span>
                <small className="lp-stat-sub">{stat.sub}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION */}
      <section className="lp-value" aria-labelledby="value-heading">
        <div className="lp-container lp-two-col">
          <div className="lp-value-text">
            <span className="section-eyebrow">Por que a Nexus</span>
            <h2 id="value-heading" className="section-title">
              Uma plataforma completa para o setor aeronáutico executivo
            </h2>
            <p>
              Combinamos operação aérea, capacitação profissional e inteligência estratégica em um único ecossistema — reduzindo custos, aumentando conformidade e acelerando decisões.
            </p>
            <ul className="lp-check-list" role="list">
              {differentiators.map((d) => (
                <li key={d}>
                  <CheckCircle size={18} aria-hidden="true" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
            <Link href="/oportunidades" className="btn btn-primary btn-md lp-value-cta">
              Ver Oportunidades
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="lp-value-art" aria-hidden="true">
            <div className="lp-art-inner">
              <div className="lp-art-ring lp-ring-1" />
              <div className="lp-art-ring lp-ring-2" />
              <div className="lp-art-ring lp-ring-3" />
              <div className="lp-art-center">
                <Plane size={48} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="lp-services" aria-labelledby="services-heading">
        <div className="lp-container">
          <div className="section-header section-header-center">
            <span className="section-eyebrow">Nossas Divisões</span>
            <h2 id="services-heading" className="section-title">Capacidades que criam vantagem competitiva</h2>
            <p className="section-subtitle">Três pilares integrados para cobertura total do ecossistema aeronáutico executivo.</p>
          </div>
          <div className="lp-services-grid">
            {services.map(({ icon: Icon, title, description, cta, accent }) => (
              <article key={title} className="lp-service-card" style={{ borderTopColor: accent }}>
                <div className="lp-service-icon" style={{ color: accent }} aria-hidden="true">
                  <Icon size={32} />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
                <Link href={cta} className="lp-service-link">
                  Saiba mais <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="lp-capabilities" aria-labelledby="cap-heading">
        <div className="lp-container">
          <div className="section-header section-header-center">
            <span className="section-eyebrow">Competências Centrais</span>
            <h2 id="cap-heading" className="section-title">O que nos diferencia no mercado</h2>
          </div>
          <div className="lp-cap-grid">
            {capabilities.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="lp-cap-card">
                <div className="lp-cap-icon" aria-hidden="true"><Icon size={24} /></div>
                <h3>{label}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DASHBOARD CTA */}
      <section className="lp-dashboard-cta" aria-labelledby="dcta-heading">
        <div className="lp-container lp-dcta-inner">
          <div>
            <span className="section-eyebrow">Dashboard Executivo</span>
            <h2 id="dcta-heading" className="section-title">KPIs, oportunidades e ações — tudo em um painel.</h2>
            <p>Monitore em tempo real o pipeline comercial, as iniciativas prioritárias e o plano de ação de 15 dias. Dados estruturados, prontos para integração com suas APIs.</p>
          </div>
          <Link href="/dashboard" className="btn btn-primary btn-lg lp-dcta-btn">
            Abrir Dashboard
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="lp-final-cta" aria-labelledby="fcta-heading">
        <div className="lp-container lp-fcta-inner">
          <div className="lp-kicker lp-kicker-center">
            <span className="lp-star" aria-hidden="true">✦</span>
            Pronto para decolar?
          </div>
          <h2 id="fcta-heading" className="lp-headline lp-headline-center">
            Conecte-se com a Nexus Global Group
          </h2>
          <p className="lp-subheadline lp-subheadline-center">
            Fale com nossa equipe e descubra como podemos acelerar seus objetivos no setor aeronáutico.
          </p>
          <div className="lp-hero-ctas lp-ctas-center">
            <Link href="/contato" className="btn btn-primary btn-lg">
              Entrar em Contato
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/briefing" className="btn btn-ghost btn-lg">
              Ver Briefing Diário
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer" role="contentinfo">
        <div className="lp-container footer-inner">
          <div className="footer-brand">
            <span className="lp-star" aria-hidden="true">✦</span>
            <strong>NEXUS GLOBAL GROUP</strong>
          </div>
          <nav aria-label="Rodapé">
            <ul className="footer-links" role="list">
              <li><Link href="/servicos">Serviços</Link></li>
              <li><Link href="/dashboard">Dashboard</Link></li>
              <li><Link href="/briefing">Briefing</Link></li>
              <li><Link href="/contato">Contato</Link></li>
            </ul>
          </nav>
          <p className="footer-legal">
            © {new Date().getFullYear()} Nexus Global Group. Todos os direitos reservados.
            Conteúdo de apoio à decisão — fontes devem ser verificadas antes de decisões regulatórias, financeiras ou operacionais.
          </p>
        </div>
      </footer>
    </main>
  );
}

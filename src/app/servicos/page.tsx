import Link from "next/link";
import { ArrowRight, Plane, GraduationCap, Shield, Wrench, Radio, BookOpen, Users, BarChart3, FileText, Compass } from "lucide-react";

const aviationServices = [
  { icon: Plane, title: "Operações Aéreas Executivas", desc: "Gestão de voos executivos com padrão de segurança e pontualidade para empresas e executivos." },
  { icon: Wrench, title: "MRO — Manutenção de Aeronaves", desc: "Serviços de manutenção, reparo e revisão com homologação ANAC para aeronaves executivas e comerciais." },
  { icon: Shield, title: "Consultoria Regulatória ANAC", desc: "Suporte completo para certificações, renovações e conformidade com a regulamentação aeronáutica brasileira." },
  { icon: Radio, title: "Gestão de Frota", desc: "Planejamento operacional, controle de horas de voo, manutenção preventiva e relatórios de desempenho." },
  { icon: Compass, title: "Charter e Fretamento", desc: "Solução de fretamento de aeronaves para grupos, eventos corporativos e trajetos não cobertos por linhas regulares." }
];

const educationServices = [
  { icon: GraduationCap, title: "Formação de Pilotos", desc: "Cursos PPL, IFR, CPL e ATPL com instrutores certificados e simuladores de última geração." },
  { icon: BookOpen, title: "Certificação de Tripulação de Cabine", desc: "Formação inicial e recorrente para comissários e agentes de segurança de voo conforme RBAC." },
  { icon: Users, title: "Treinamento Corporativo In-Company", desc: "Programas customizados de capacitação aeronáutica para equipes de empresas do setor." },
  { icon: BarChart3, title: "Simuladores de Voo", desc: "Treinamento em simuladores certificados para qualificação de tipo e treino de emergência." },
  { icon: FileText, title: "Cursos Aeromédicos", desc: "Formação em medicina aeronáutica, primeiros socorros e protocolos de saúde para tripulantes." }
];

export default function ServicosPage() {
  return (
    <main className="inner-page" id="main-content">
      <div className="inner-hero">
        <div className="lp-container">
          <span className="section-eyebrow">Nossas Divisões</span>
          <h1 className="inner-title">Serviços</h1>
          <p className="inner-subtitle">Cobertura completa do ecossistema aeronáutico executivo — da operação à capacitação.</p>
        </div>
      </div>

      <div className="lp-container inner-body">
        <section aria-labelledby="av-heading" className="services-section">
          <div className="services-section-header">
            <div className="services-section-icon aviation" aria-hidden="true"><Plane size={28} /></div>
            <div>
              <span className="section-eyebrow">Divisão 01</span>
              <h2 id="av-heading">Nexus Global Aviation</h2>
            </div>
          </div>
          <div className="services-grid">
            {aviationServices.map(({ icon: Icon, title, desc }) => (
              <article key={title} className="service-card">
                <div className="service-card-icon aviation" aria-hidden="true"><Icon size={24} /></div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="ed-heading" className="services-section">
          <div className="services-section-header">
            <div className="services-section-icon education" aria-hidden="true"><GraduationCap size={28} /></div>
            <div>
              <span className="section-eyebrow">Divisão 02</span>
              <h2 id="ed-heading">Nexus Global Education</h2>
            </div>
          </div>
          <div className="services-grid">
            {educationServices.map(({ icon: Icon, title, desc }) => (
              <article key={title} className="service-card">
                <div className="service-card-icon education" aria-hidden="true"><Icon size={24} /></div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="services-cta-bar">
          <h2>Pronto para avançar?</h2>
          <p>Entre em contato com nossa equipe e descubra o plano ideal para sua operação.</p>
          <Link href="/contato" className="btn btn-primary btn-lg">
            Fale com a Nexus <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </main>
  );
}

export type InstitutionalDocument = {
  slug: string;
  title: string;
  subtitle: string;
  classification: string;
  status: string;
  sourceNote: string;
  sections: Array<{ heading: string; paragraphs: string[] }>;
};

export const institutionalDocuments: InstitutionalDocument[] = [
  {
    slug: "standard-01",
    title: "Standard 01 · Padrão Operacional de Despacho",
    subtitle: "Conteúdo, estrutura, treinamento e alta performance",
    classification: "Referência de planejamento, treinamento e assurance",
    status: "Não é liberação de voo, cálculo certificado ou aprovação regulatória.",
    sourceNote:
      "Derivado web de referência. Consulte sempre o PDF institucional controlado, a regulamentação atual, o manual aplicável, a fonte aprovada e a autoridade operacional competente.",
    sections: [
      {
        heading: "Mandato e limite operacional",
        paragraphs: [
          "O Standard 01 organiza preparação, decisão, comunicação e monitoramento por meio de evidência rastreável e autoridade humana explícita.",
          "O padrão estrutura o trabalho, mas não substitui processos, autorizações, especificações operativas, manuais aprovados ou dados vigentes do operador."
        ]
      },
      {
        heading: "Modelo de operação em quatro fases",
        paragraphs: [
          "01 · Preparar: confirmar cenário, dados atuais, aeronave, tripulação, meteorologia, NOTAM, restrições, massa e premissas.",
          "02 · Decidir: examinar ameaças, alternativas, combustível, performance de fonte aprovada, critérios de revisão e escalonamento.",
          "03 · Comunicar: assegurar briefing objetivo, pacote OFP, instruções de carga e mensagens aplicáveis com responsáveis e horário de atualização.",
          "04 · Monitorar e fechar: acompanhar mudanças, desvios, handover, fechamento e lições operacionais."
        ]
      },
      {
        heading: "Gates de alta performance",
        paragraphs: [
          "G1 · Dados atuais: fonte, hora de consulta e contexto precisam estar claros.",
          "G2 · Capacidade: aeronave, tripulação e infraestrutura precisam atender às condições planejadas.",
          "G3 · Decisão operacional: ameaças, margens, alternativas e critérios precisam ser examinados.",
          "G4 · Revisão independente: uma segunda leitura proporcional ao risco deve estar evidenciada quando aplicável."
        ]
      },
      {
        heading: "Pacote de despacho",
        paragraphs: [
          "O padrão organiza OFP, loadsheet, LDM quando aplicável, flight watch e closeout com fonte, versão, horário, responsável e condição de validade.",
          "Nenhum formulário preenchido, cálculo disponível ou rascunho salvo equivale, por si só, a aprovação operacional."
        ]
      }
    ]
  },
  {
    slug: "operational-dispatch-demo",
    title: "Operational Dispatch · End-to-End Pack",
    subtitle: "RBAC 135 international charter training scenario · SBGR–SAEZ",
    classification: "Demonstração controlada de planejamento e treinamento",
    status: "PLANNING DRAFT · REVIEW BLOCKED",
    sourceNote:
      "Derivado web de referência do cenário de treinamento. Não é OFP, flight release, loadsheet, LDM, aprovação legal ou cálculo certificado de performance.",
    sections: [
      {
        heading: "Cenário de demonstração",
        paragraphs: [
          "Cenário fictício de charter internacional RBAC 135 entre SBGR e SAEZ, planejado para 15 de agosto de 2026 às 1330Z, com Embraer Praetor 600 sob alias de treinamento NX-PR6 e sete passageiros planejados.",
          "EO/MGO, status técnico da aeronave, MEL/CDL, dados de peso e balanceamento, registros de jornada da tripulação, manifesto, meteorologia, NOTAM e dados de aeroporto não foram fornecidos e não podem ser inventados."
        ]
      },
      {
        heading: "Resultado controlado",
        paragraphs: [
          "O quadro operacional pode ser estruturado como briefing controlado, mas o log de decisões permanece aberto e OFP, loadsheet e LDM são apenas skeletons sem valores operacionais inventados.",
          "A revisão humana permanece bloqueada enquanto os quatro gates críticos contêm itens não resolvidos. Operador, PIC e funções autorizadas mantêm os direitos de decisão operacional."
        ]
      },
      {
        heading: "Itens P0 antes de revisão",
        paragraphs: [
          "Confirmar escopo COA/EO e processo aprovado de controle operacional; atribuir aeronave e verificar status técnico/MEL/CDL; recuperar MET, NOTAM, rota e dados de aeroporto atuais.",
          "Verificar qualificação, jornada e fadiga da tripulação; completar manifesto, bagagem, assentos e cargas especiais; executar processos aprovados de rota, combustível, performance e W&B; completar revisão independente.",
          "O próximo passo válido é aquisição de fontes e população controlada do pacote, não sign-off."
        ]
      }
    ]
  },
  {
    slug: "executive-briefing-standard",
    title: "Nexus Executive Briefing · Padrão Oficial",
    subtitle: "Implantação, configuração, segurança e operação",
    classification: "Documento técnico controlado · uso interno Nexus Global Group",
    status: "Arquitetura oficial: GitHub → Vercel → runtime server-side → OpenAI",
    sourceNote:
      "Derivado web de referência. O PDF institucional controlado continua sendo a versão documental autoritativa para apresentação e governança visual.",
    sections: [
      {
        heading: "Arquitetura de produção",
        paragraphs: [
          "O repositório oficial é nexusglobalgroup/nexus-executive-briefing, com branch de produção main, Root Directory na raiz e Framework Preset Auto-detect.",
          "A integração Git nativa entre GitHub e Vercel é o padrão de CI/CD. O runtime permanece server-side e a OpenAI é acessada por chamadas autenticadas. FTP, FTPS, SFTP e publicação estática não fazem parte da arquitetura aprovada."
        ]
      },
      {
        heading: "Segurança e segredos",
        paragraphs: [
          "OPENAI_API_KEY e NEXUS_ACCESS_CODE são credenciais protegidas e devem permanecer em Environment Variables da plataforma de execução.",
          "A chave da OpenAI não deve ser exposta ao navegador, incluída no código-fonte, README, logs ou variáveis NEXT_PUBLIC. O uso deve ocorrer exclusivamente em código server-side."
        ]
      },
      {
        heading: "Fonte de verdade e mudança",
        paragraphs: [
          "Código: GitHub. Produção: Vercel. Segredos de runtime: Vercel Environment Variables. Integração de IA: OpenAI Platform. Branch oficial: main.",
          "Mudanças estruturais em arquitetura, autenticação, variáveis de ambiente, modelos, endpoints, domínios, dependências, build, runtime ou segurança devem preservar rastreabilidade e validação pós-deploy."
        ]
      }
    ]
  }
];

export function getInstitutionalDocument(slug: string) {
  return institutionalDocuments.find((document) => document.slug === slug);
}

import type { ExecutiveBriefing } from "@/lib/types";

export const seedBriefing: ExecutiveBriefing = {
  title: "Nexus Executive Briefing",
  generatedAt: "Edição inicial",
  windowHours: 72,
  transparencyNote:
    "Edição de referência: gere uma nova edição para atualizar as pautas com fontes verificadas.",
  articles: [
    {
      id: "aviation-operational-resilience",
      division: "aviation",
      headline:
        "Resiliência operacional: priorizar cenários de contingência em rotas e aeroportos críticos",
      imagePrompt:
        "executive aviation operations room with a route map, weather layers and a discreet aircraft silhouette",
      sourceName: "ICAO",
      publicationDate: "Monitoramento contínuo",
      sourceUrl: "https://www.icao.int/",
      summary: [
        "Esta pauta inicial estabelece uma referência para a leitura de risco operacional.",
        "A próxima edição deve substituir este conteúdo por fatos recentes e fontes primárias verificadas.",
        "A análise considera continuidade, segurança e impacto na experiência do cliente."
      ],
      impact:
        "Oscilações em capacidade, clima ou infraestrutura podem alterar rapidamente a previsibilidade das operações.",
      action:
        "Revisar os planos de contingência das rotas e dos aeroportos com maior criticidade operacional.",
      relevance: "Alta",
      relevanceReason:
        "Continuidade operacional e segurança exigem decisões antecipadas."
    },
    {
      id: "aviation-safety-data",
      division: "aviation",
      headline:
        "Dados de segurança: consolidar indicadores antes do próximo ciclo executivo",
      imagePrompt:
        "aviation safety analyst reviewing operational indicators on a large dark blue dashboard in a control centre",
      sourceName: "ANAC",
      publicationDate: "Monitoramento contínuo",
      sourceUrl: "https://www.gov.br/anac/pt-br",
      summary: [
        "A disciplina de dados conecta ocorrências, treinamento e desempenho operacional.",
        "O briefing diário deve destacar apenas sinais com impacto material e fonte rastreável.",
        "A visualização inicial serve como base para a próxima atualização automatizada."
      ],
      impact:
        "Indicadores dispersos atrasam a identificação de tendências e a priorização de recursos.",
      action:
        "Definir um painel mínimo de segurança, pontualidade e capacidade para a reunião de gestão.",
      relevance: "Alta",
      relevanceReason:
        "Uma visão única reduz o tempo entre sinal, decisão e ação."
    },
    {
      id: "aviation-connectivity",
      division: "aviation",
      headline:
        "Conectividade e capacidade: acompanhar movimentos que alteram a malha de valor",
      imagePrompt:
        "modern airport apron at dawn with connected aircraft, subtle orbital lines and premium editorial lighting",
      sourceName: "IATA",
      publicationDate: "Monitoramento contínuo",
      sourceUrl: "https://www.iata.org/",
      summary: [
        "Capacidade, conectividade e disponibilidade de infraestrutura são variáveis estratégicas para a aviação.",
        "A edição inicial não representa uma notícia em tempo real; ela orienta a coleta da próxima rodada.",
        "A análise deve cruzar dados oficiais, contexto regional e impacto para clientes."
      ],
      impact:
        "Mudanças de capacidade podem afetar receita, nível de serviço e planejamento de parceiros.",
      action:
        "Mapear semanalmente alterações de malha e seus efeitos sobre os segmentos prioritários da Nexus.",
      relevance: "Média",
      relevanceReason:
        "O tema orienta planejamento comercial e operacional de médio prazo."
    },
    {
      id: "education-learning-performance",
      division: "education",
      headline:
        "Aprendizagem aplicada: alinhar trilhas de desenvolvimento a indicadores de performance",
      imagePrompt:
        "diverse executive team in a high-fidelity professional training simulation with subtle technical grid",
      sourceName: "OECD Education",
      publicationDate: "Monitoramento contínuo",
      sourceUrl: "https://www.oecd.org/en/topics/education.html",
      summary: [
        "Programas de formação geram mais valor quando conectam competências, prática e métricas de resultado.",
        "Esta pauta-base deve ser renovada com fontes atuais antes de qualquer decisão executiva.",
        "A curadoria prioriza evidências, aplicabilidade e ganho operacional mensurável."
      ],
      impact:
        "Treinamentos desconectados das prioridades do negócio diluem investimento e velocidade de execução.",
      action:
        "Revisar as trilhas críticas e definir indicadores de aplicação após cada jornada de aprendizagem.",
      relevance: "Alta",
      relevanceReason:
        "Competências críticas sustentam qualidade, compliance e crescimento."
    },
    {
      id: "education-ai-governance",
      division: "education",
      headline:
        "IA na aprendizagem: evoluir com governança, evidência e proteção de dados",
      imagePrompt:
        "professional learning lab with an AI-assisted screen, diverse team, deep navy and restrained gold accents",
      sourceName: "UNESCO",
      publicationDate: "Monitoramento contínuo",
      sourceUrl: "https://www.unesco.org/en/education",
      summary: [
        "A adoção de IA em educação precisa combinar ganho de produtividade com critérios claros de qualidade.",
        "A geração diária deve separar fatos observáveis de hipóteses e recomendações.",
        "O conteúdo inicial preserva esse padrão editorial enquanto a primeira edição é criada."
      ],
      impact:
        "Sem governança, soluções de IA podem ampliar riscos de privacidade, vieses e uso inconsistente.",
      action:
        "Estabelecer princípios de uso, revisão humana e avaliação de eficácia para experiências com IA.",
      relevance: "Alta",
      relevanceReason:
        "O tema combina oportunidade estratégica e responsabilidade operacional."
    },
    {
      id: "education-leadership-readiness",
      division: "education",
      headline:
        "Liderança e prontidão: transformar prioridades estratégicas em rituais de execução",
      imagePrompt:
        "executive leadership workshop with strategic planning boards, authentic collaboration and refined editorial composition",
      sourceName: "World Economic Forum",
      publicationDate: "Monitoramento contínuo",
      sourceUrl: "https://www.weforum.org/topics/education/",
      summary: [
        "Liderança preparada traduz contexto externo em decisões, comunicação e prioridades claras.",
        "A pauta de referência indica o tipo de sinal que a curadoria diária deve monitorar.",
        "O detalhamento final deve sempre apontar para fontes diretas e datadas."
      ],
      impact:
        "A falta de alinhamento reduz a velocidade de resposta em iniciativas transversais.",
      action:
        "Converter as três prioridades do radar em responsáveis, marcos e pontos de controle semanais.",
      relevance: "Média",
      relevanceReason:
        "Rituais de liderança conectam estratégia, pessoas e execução."
    }
  ],
  radar: [
    "Configurar as variáveis de ambiente antes de gerar a primeira edição automatizada.",
    "Validar as fontes e critérios de relevância para os dois eixos de negócio.",
    "Definir responsáveis pela leitura diária e pelas ações decorrentes do briefing."
  ]
};

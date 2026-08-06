import type { DashboardData } from "@/lib/dashboard-types";

export const dashboardData: DashboardData = {
  kpis: [
    {
      id: "kpi-1",
      label: "Oportunidades Ativas",
      value: "12",
      delta: "+3 este mês",
      deltaType: "positive",
      icon: "🎯",
      accent: "#f39700"
    },
    {
      id: "kpi-2",
      label: "Receita em Pipeline",
      value: "R$ 4,2M",
      delta: "+18% vs. meta",
      deltaType: "positive",
      icon: "💹",
      accent: "#58b7c8"
    },
    {
      id: "kpi-3",
      label: "Tarefas Críticas",
      value: "5",
      delta: "2 vencendo hoje",
      deltaType: "negative",
      icon: "⚡",
      accent: "#e84c4c"
    },
    {
      id: "kpi-4",
      label: "Conclusão do Plano",
      value: "64%",
      delta: "+8% esta semana",
      deltaType: "positive",
      icon: "📊",
      accent: "#4caf7d"
    }
  ],

  opportunities: [
    {
      id: "op-1",
      title: "Expansão Frota Executiva — Campinas",
      segment: "Aviation",
      value: "R$ 1.200.000",
      status: "Ativo",
      responsible: "Carlos Mendes",
      deadline: "30/08/2026",
      priority: "Crítica"
    },
    {
      id: "op-2",
      title: "Parceria Instituto Federal SP — Pilotagem",
      segment: "Education",
      value: "R$ 320.000",
      status: "Em análise",
      responsible: "Ana Ribeiro",
      deadline: "15/09/2026",
      priority: "Alta"
    },
    {
      id: "op-3",
      title: "Contrato MRO — Aeronaves Legacy",
      segment: "Aviation",
      value: "R$ 780.000",
      status: "Em análise",
      responsible: "Roberto Lima",
      deadline: "05/09/2026",
      priority: "Alta"
    },
    {
      id: "op-4",
      title: "Plataforma e-Learning Corporativo",
      segment: "Education",
      value: "R$ 210.000",
      status: "Em espera",
      responsible: "Fernanda Costa",
      deadline: "20/10/2026",
      priority: "Média"
    },
    {
      id: "op-5",
      title: "Consultoria Regulatória ANAC — Fase II",
      segment: "Aviation",
      value: "R$ 450.000",
      status: "Ativo",
      responsible: "Carlos Mendes",
      deadline: "12/08/2026",
      priority: "Crítica"
    },
    {
      id: "op-6",
      title: "Certificação Tripulantes — Contrato Anual",
      segment: "Education",
      value: "R$ 190.000",
      status: "Concluído",
      responsible: "Ana Ribeiro",
      deadline: "01/08/2026",
      priority: "Baixa"
    }
  ],

  priorities: [
    {
      id: "pri-1",
      title: "Renovação CHETA — Habilitação regulatória",
      description: "Garantir conformidade com Resolução ANAC 2024-07 antes da janela de vencimento.",
      priority: "Crítica",
      owner: "Compliance",
      deadline: "10/08/2026",
      progress: 75
    },
    {
      id: "pri-2",
      title: "Lançamento módulo aeromédico",
      description: "Finalizar conteúdo, validar instrutores e publicar no LMS até a data-alvo.",
      priority: "Alta",
      owner: "Education",
      deadline: "25/08/2026",
      progress: 50
    },
    {
      id: "pri-3",
      title: "Adequação hangar base operacional",
      description: "Obras de ampliação para receber aeronaves de maior porte. Aprovação prefeitura pendente.",
      priority: "Alta",
      owner: "Operações",
      deadline: "30/09/2026",
      progress: 30
    },
    {
      id: "pri-4",
      title: "Implementação CRM comercial",
      description: "Migração de dados e treinamento da equipe comercial no novo sistema.",
      priority: "Média",
      owner: "Comercial",
      deadline: "15/09/2026",
      progress: 20
    },
    {
      id: "pri-5",
      title: "Auditoria interna de segurança de dados",
      description: "Revisão de políticas e controles de acesso conforme LGPD.",
      priority: "Alta",
      owner: "TI",
      deadline: "31/08/2026",
      progress: 60
    }
  ],

  planTasks: [
    { id: "t-1", day: 1, title: "Reunião de alinhamento estratégico", description: "Definição de OKRs do trimestre com liderança.", status: "Concluído", assignee: "Diretoria", tags: ["estratégia"] },
    { id: "t-2", day: 2, title: "Revisão pipeline comercial", description: "Análise de todas as oportunidades ativas e classificação por probabilidade.", status: "Concluído", assignee: "Comercial", tags: ["vendas"] },
    { id: "t-3", day: 3, title: "Submissão documentação ANAC", description: "Envio de documentos para renovação de certificados.", status: "Concluído", assignee: "Compliance", tags: ["regulatório"] },
    { id: "t-4", day: 4, title: "Entrevistas seleção instrutores", description: "Processo seletivo para 3 vagas de instrutor de simulador.", status: "Concluído", assignee: "RH", tags: ["educação"] },
    { id: "t-5", day: 5, title: "Análise proposta parceiro MRO", description: "Revisão jurídica e financeira da proposta recebida.", status: "Em andamento", assignee: "Jurídico", tags: ["aviação"] },
    { id: "t-6", day: 6, title: "Workshop segurança operacional", description: "Treinamento obrigatório para tripulantes.", status: "Em andamento", assignee: "Operações", tags: ["treinamento"] },
    { id: "t-7", day: 7, title: "Fechamento relatório semanal", description: "Consolidação de KPIs e envio ao board.", status: "Em andamento", assignee: "Diretoria", tags: ["gestão"] },
    { id: "t-8", day: 8, title: "Demo plataforma e-learning", description: "Apresentação interna da nova plataforma para validação.", status: "Pendente", assignee: "Education", tags: ["educação", "tecnologia"] },
    { id: "t-9", day: 9, title: "Visita técnica hangar expansão", description: "Inspeção com engenheiro responsável pelas obras.", status: "Pendente", assignee: "Operações", tags: ["infraestrutura"] },
    { id: "t-10", day: 10, title: "Reunião clientes VIP Aviation", description: "Alinhamento de contrato de uso compartilhado.", status: "Pendente", assignee: "Comercial", tags: ["aviação", "vendas"] },
    { id: "t-11", day: 11, title: "Treinamento equipe CRM", description: "Capacitação do time comercial no novo sistema.", status: "Pendente", assignee: "TI", tags: ["tecnologia"] },
    { id: "t-12", day: 12, title: "Auditoria LGPD — Fase I", description: "Revisão de contratos de processamento de dados.", status: "Pendente", assignee: "Jurídico", tags: ["compliance"] },
    { id: "t-13", day: 13, title: "Preparação relatório investidores", description: "Dados financeiros e operacionais do trimestre.", status: "Pendente", assignee: "Finanças", tags: ["gestão"] },
    { id: "t-14", day: 14, title: "Review 14 dias — correções", description: "Revisão de desvios e ajuste do plano seguinte.", status: "Pendente", assignee: "Diretoria", tags: ["gestão"] },
    { id: "t-15", day: 15, title: "Apresentação resultados board", description: "Apresentação executiva dos resultados do ciclo de 15 dias.", status: "Pendente", assignee: "Diretoria", tags: ["gestão", "estratégia"] }
  ],

  alerts: [
    {
      id: "al-1",
      title: "Vencimento certificado ANAC em 12 dias",
      description: "O certificado de habilitação operacional vence em 18/08. Ação imediata necessária.",
      level: "Alto",
      category: "Regulatório",
      date: "06/08/2026"
    },
    {
      id: "al-2",
      title: "Flutuação cambial impacta importação de peças",
      description: "Dólar acima de R$5,90 eleva custo de componentes MRO em ~12%.",
      level: "Médio",
      category: "Financeiro",
      date: "05/08/2026"
    },
    {
      id: "al-3",
      title: "Atraso fornecedor de simulador — 10 dias",
      description: "Fornecedor reportou atraso na entrega do módulo de simulação IFR.",
      level: "Médio",
      category: "Operacional",
      date: "04/08/2026"
    },
    {
      id: "al-4",
      title: "Nova portaria DECEA sobre espaço aéreo Classe A",
      description: "Publicada portaria com novos procedimentos. Revisar SOPs até 30/08.",
      level: "Baixo",
      category: "Regulatório",
      date: "03/08/2026"
    }
  ]
};

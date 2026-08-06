export type OpportunityStatus = "Em análise" | "Ativo" | "Concluído" | "Em espera";
export type RiskLevel = "Alto" | "Médio" | "Baixo";
export type Priority = "Crítica" | "Alta" | "Média" | "Baixa";
export type PlanStatus = "Concluído" | "Em andamento" | "Pendente" | "Atrasado";

export interface KPIItem {
  id: string;
  label: string;
  value: string;
  delta: string;
  deltaType: "positive" | "negative" | "neutral";
  icon: string;
  accent: string;
}

export interface Opportunity {
  id: string;
  title: string;
  segment: string;
  value: string;
  status: OpportunityStatus;
  responsible: string;
  deadline: string;
  priority: Priority;
}

export interface PriorityItem {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  owner: string;
  deadline: string;
  progress: number;
}

export interface PlanTask {
  id: string;
  day: number;
  title: string;
  description: string;
  status: PlanStatus;
  assignee: string;
  tags: string[];
}

export interface RiskAlert {
  id: string;
  title: string;
  description: string;
  level: RiskLevel;
  category: string;
  date: string;
}

export interface DashboardData {
  kpis: KPIItem[];
  opportunities: Opportunity[];
  priorities: PriorityItem[];
  planTasks: PlanTask[];
  alerts: RiskAlert[];
}

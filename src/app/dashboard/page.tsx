"use client";

import { useState, useMemo } from "react";
import { AlertTriangle, ChevronDown, ChevronUp, Target, TrendingUp, Zap, BarChart3 } from "lucide-react";
import { dashboardData } from "@/data/dashboard-data";
import type { Opportunity, PlanTask, OpportunityStatus } from "@/lib/dashboard-types";

const kpiIcons = [Target, TrendingUp, Zap, BarChart3];

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="progress-track" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
      <div className="progress-fill" style={{ width: `${value}%` }} />
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    "Ativo": "badge-success",
    "Em análise": "badge-info",
    "Em espera": "badge-warning",
    "Concluído": "badge-default",
    "Em andamento": "badge-info",
    "Pendente": "badge-default",
    "Atrasado": "badge-danger"
  };
  return <span className={`badge ${map[status] ?? "badge-default"}`}>{status}</span>;
}

function PriorityBadge({ priority }: { priority: string }) {
  const map: Record<string, string> = {
    "Crítica": "badge-danger",
    "Alta": "badge-warning",
    "Média": "badge-info",
    "Baixa": "badge-default"
  };
  return <span className={`badge ${map[priority] ?? "badge-default"}`}>{priority}</span>;
}

function RiskBadge({ level }: { level: string }) {
  const map: Record<string, string> = {
    "Alto": "badge-danger",
    "Médio": "badge-warning",
    "Baixo": "badge-info"
  };
  return <span className={`badge ${map[level] ?? "badge-default"}`}>{level}</span>;
}

export default function DashboardPage() {
  const [oppFilter, setOppFilter] = useState<OpportunityStatus | "Todos">("Todos");
  const [oppSort, setOppSort] = useState<keyof Opportunity>("priority");
  const [taskFilter, setTaskFilter] = useState<string>("Todos");

  const filteredOpps = useMemo(() => {
    const list = oppFilter === "Todos"
      ? dashboardData.opportunities
      : dashboardData.opportunities.filter((o) => o.status === oppFilter);
    const priorityOrder: Record<string, number> = { Crítica: 0, Alta: 1, Média: 2, Baixa: 3 };
    if (oppSort === "priority") {
      return [...list].sort((a, b) => (priorityOrder[a.priority] ?? 9) - (priorityOrder[b.priority] ?? 9));
    }
    return [...list].sort((a, b) => a[oppSort]?.toString().localeCompare(b[oppSort]?.toString() ?? "") ?? 0);
  }, [oppFilter, oppSort]);

  const filteredTasks = useMemo(() => {
    if (taskFilter === "Todos") return dashboardData.planTasks;
    return dashboardData.planTasks.filter((t) => t.status === taskFilter);
  }, [taskFilter]);

  return (
    <main className="dashboard" id="main-content">
      <div className="dashboard-header">
        <div className="dash-container">
          <div className="dash-header-inner">
            <div>
              <span className="section-eyebrow">Nexus Global Group</span>
              <h1 className="dash-title">Dashboard Executivo</h1>
            </div>
            <div className="dash-date">
              <span>Atualizado em</span>
              <strong>{new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="dash-container dash-body">
        {/* KPI CARDS */}
        <section aria-labelledby="kpi-heading">
          <h2 id="kpi-heading" className="sr-only">Indicadores Chave</h2>
          <div className="kpi-grid">
            {dashboardData.kpis.map((kpi, i) => {
              const Icon = kpiIcons[i % kpiIcons.length];
              return (
                <div key={kpi.id} className="stat-card" style={{ borderTopColor: kpi.accent }}>
                  <div className="stat-icon" style={{ color: kpi.accent }} aria-hidden="true">
                    <Icon size={22} />
                  </div>
                  <div className="stat-body">
                    <span className="stat-label">{kpi.label}</span>
                    <strong className="stat-value">{kpi.value}</strong>
                    <span className={`stat-delta stat-delta-${kpi.deltaType}`}>{kpi.delta}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <div className="dash-two-col">
          {/* OPPORTUNITIES TABLE */}
          <section className="dash-card" aria-labelledby="opp-heading">
            <div className="dash-card-header">
              <h2 id="opp-heading">Pipeline de Oportunidades</h2>
              <div className="dash-filters" role="group" aria-label="Filtrar por status">
                {(["Todos", "Ativo", "Em análise", "Em espera", "Concluído"] as const).map((s) => (
                  <button
                    key={s}
                    className={`filter-btn ${oppFilter === s ? "filter-btn-active" : ""}`}
                    onClick={() => setOppFilter(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="table-wrap" role="region" aria-label="Tabela de oportunidades">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>
                      <button
                        className="sort-btn"
                        onClick={() => setOppSort("title")}
                        aria-label="Ordenar por título"
                      >
                        Oportunidade {oppSort === "title" ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                      </button>
                    </th>
                    <th>Segmento</th>
                    <th>Valor</th>
                    <th>Status</th>
                    <th>
                      <button
                        className="sort-btn"
                        onClick={() => setOppSort("priority")}
                        aria-label="Ordenar por prioridade"
                      >
                        Prioridade {oppSort === "priority" ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                      </button>
                    </th>
                    <th>Prazo</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOpps.map((opp) => (
                    <tr key={opp.id}>
                      <td>
                        <span className="opp-title">{opp.title}</span>
                        <small className="opp-resp">{opp.responsible}</small>
                      </td>
                      <td>
                        <span className={`segment-tag segment-${opp.segment.toLowerCase()}`}>{opp.segment}</span>
                      </td>
                      <td className="value-cell">{opp.value}</td>
                      <td><StatusBadge status={opp.status} /></td>
                      <td><PriorityBadge priority={opp.priority} /></td>
                      <td className="date-cell">{opp.deadline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ALERTS */}
          <section className="dash-card" aria-labelledby="alerts-heading">
            <div className="dash-card-header">
              <h2 id="alerts-heading">
                <AlertTriangle size={18} aria-hidden="true" />
                Alertas e Riscos
              </h2>
            </div>
            <ul className="alerts-list" role="list">
              {dashboardData.alerts.map((alert) => (
                <li key={alert.id} className={`alert-item alert-${alert.level.toLowerCase()}`}>
                  <div className="alert-top">
                    <span className="alert-title">{alert.title}</span>
                    <RiskBadge level={alert.level} />
                  </div>
                  <p className="alert-desc">{alert.description}</p>
                  <div className="alert-meta">
                    <span className="alert-cat">{alert.category}</span>
                    <span>{alert.date}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="dash-two-col">
          {/* PRIORITIES */}
          <section className="dash-card" aria-labelledby="pri-heading">
            <div className="dash-card-header">
              <h2 id="pri-heading">Iniciativas Prioritárias</h2>
            </div>
            <ul className="priority-list" role="list">
              {dashboardData.priorities.map((p) => (
                <li key={p.id} className="priority-item">
                  <div className="priority-top">
                    <span className="priority-title">{p.title}</span>
                    <PriorityBadge priority={p.priority} />
                  </div>
                  <p className="priority-desc">{p.description}</p>
                  <div className="priority-meta">
                    <span>{p.owner} · {p.deadline}</span>
                    <span className="priority-pct">{p.progress}%</span>
                  </div>
                  <ProgressBar value={p.progress} />
                </li>
              ))}
            </ul>
          </section>

          {/* 15-DAY PLAN */}
          <section className="dash-card" aria-labelledby="plan-heading">
            <div className="dash-card-header">
              <h2 id="plan-heading">Plano 15 Dias</h2>
              <div className="dash-filters" role="group" aria-label="Filtrar tarefas">
                {["Todos", "Concluído", "Em andamento", "Pendente"].map((s) => (
                  <button
                    key={s}
                    className={`filter-btn ${taskFilter === s ? "filter-btn-active" : ""}`}
                    onClick={() => setTaskFilter(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <ul className="plan-list" role="list">
              {filteredTasks.map((task) => (
                <li key={task.id} className={`plan-item plan-${task.status.replace(" ", "-").toLowerCase()}`}>
                  <div className="plan-day">D{task.day}</div>
                  <div className="plan-body">
                    <div className="plan-top">
                      <span className="plan-title">{task.title}</span>
                      <StatusBadge status={task.status} />
                    </div>
                    <p className="plan-desc">{task.description}</p>
                    <div className="plan-meta">
                      <span>{task.assignee}</span>
                      <div className="plan-tags">
                        {task.tags.map((tag) => (
                          <span key={tag} className="plan-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}

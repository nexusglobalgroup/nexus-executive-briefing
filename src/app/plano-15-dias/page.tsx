"use client";

import { useState } from "react";
import { CheckCircle, Circle, Clock, AlertCircle } from "lucide-react";
import { dashboardData } from "@/data/dashboard-data";
import type { PlanStatus } from "@/lib/dashboard-types";

const statusIcons: Record<PlanStatus, React.ComponentType<{ size?: number; "aria-hidden"?: boolean | "true" | "false" }>> = {
  "Concluído": CheckCircle,
  "Em andamento": Clock,
  "Pendente": Circle,
  "Atrasado": AlertCircle
};

const statusColors: Record<PlanStatus, string> = {
  "Concluído": "#4caf7d",
  "Em andamento": "#58b7c8",
  "Pendente": "#607187",
  "Atrasado": "#e84c4c"
};

export default function Plano15DiasPage() {
  const [filter, setFilter] = useState<PlanStatus | "Todos">("Todos");

  const tasks = filter === "Todos"
    ? dashboardData.planTasks
    : dashboardData.planTasks.filter((t) => t.status === filter);

  const stats = {
    total: dashboardData.planTasks.length,
    concluido: dashboardData.planTasks.filter((t) => t.status === "Concluído").length,
    andamento: dashboardData.planTasks.filter((t) => t.status === "Em andamento").length,
    pendente: dashboardData.planTasks.filter((t) => t.status === "Pendente").length
  };

  const pct = Math.round((stats.concluido / stats.total) * 100);

  return (
    <main className="inner-page" id="main-content">
      <div className="inner-hero">
        <div className="lp-container">
          <span className="section-eyebrow">Execução Operacional</span>
          <h1 className="inner-title">Plano de Ação — 15 Dias</h1>
          <p className="inner-subtitle">Cronograma de tarefas estruturadas com responsáveis, status e classificação para execução do ciclo atual.</p>
        </div>
      </div>

      <div className="lp-container inner-body">
        {/* PROGRESS SUMMARY */}
        <div className="plan-summary">
          <div className="plan-summary-stat">
            <strong style={{ color: "#4caf7d" }}>{stats.concluido}</strong>
            <span>Concluídas</span>
          </div>
          <div className="plan-summary-stat">
            <strong style={{ color: "#58b7c8" }}>{stats.andamento}</strong>
            <span>Em andamento</span>
          </div>
          <div className="plan-summary-stat">
            <strong style={{ color: "#607187" }}>{stats.pendente}</strong>
            <span>Pendentes</span>
          </div>
          <div className="plan-summary-progress">
            <div className="plan-pct-label">
              <span>Progresso geral</span>
              <strong>{pct}%</strong>
            </div>
            <div className="progress-track" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
              <div className="progress-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>

        {/* FILTER */}
        <div className="filter-bar" role="group" aria-label="Filtrar por status">
          <span className="filter-label">Status:</span>
          {(["Todos", "Concluído", "Em andamento", "Pendente", "Atrasado"] as const).map((s) => (
            <button key={s} className={`filter-btn ${filter === s ? "filter-btn-active" : ""}`} onClick={() => setFilter(s)}>{s}</button>
          ))}
        </div>

        {/* TIMELINE */}
        <ol className="timeline" aria-label="Linha do tempo de 15 dias">
          {tasks.map((task) => {
            const Icon = statusIcons[task.status as PlanStatus] ?? Circle;
            const color = statusColors[task.status as PlanStatus] ?? "#607187";
            return (
              <li key={task.id} className="timeline-item">
                <div className="timeline-marker" style={{ color }} aria-hidden="true">
                  <Icon size={22} aria-hidden={true} />
                </div>
                <div className="timeline-content">
                  <div className="timeline-day-badge">Dia {task.day}</div>
                  <div className="timeline-header">
                    <h3 className="timeline-title">{task.title}</h3>
                    <span className={`badge badge-${task.status === "Concluído" ? "success" : task.status === "Em andamento" ? "info" : task.status === "Atrasado" ? "danger" : "default"}`}>{task.status}</span>
                  </div>
                  <p className="timeline-desc">{task.description}</p>
                  <div className="timeline-meta">
                    <span>👤 {task.assignee}</span>
                    <div className="plan-tags">
                      {task.tags.map((tag) => (
                        <span key={tag} className="plan-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </main>
  );
}

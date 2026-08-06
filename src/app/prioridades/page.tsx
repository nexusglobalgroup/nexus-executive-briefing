"use client";

import { useState } from "react";
import { dashboardData } from "@/data/dashboard-data";
import type { Priority } from "@/lib/dashboard-types";

function PriorityBadge({ priority }: { priority: string }) {
  const map: Record<string, string> = { "Crítica": "badge-danger", "Alta": "badge-warning", "Média": "badge-info", "Baixa": "badge-default" };
  return <span className={`badge ${map[priority] ?? "badge-default"}`}>{priority}</span>;
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="progress-track" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
      <div className="progress-fill" style={{ width: `${value}%` }} />
    </div>
  );
}

export default function PrioridadesPage() {
  const [filter, setFilter] = useState<Priority | "Todos">("Todos");

  const items = filter === "Todos"
    ? dashboardData.priorities
    : dashboardData.priorities.filter((p) => p.priority === filter);

  return (
    <main className="inner-page" id="main-content">
      <div className="inner-hero">
        <div className="lp-container">
          <span className="section-eyebrow">Gestão Estratégica</span>
          <h1 className="inner-title">Prioridades</h1>
          <p className="inner-subtitle">Iniciativas de alto impacto com acompanhamento de progresso e responsáveis definidos.</p>
        </div>
      </div>

      <div className="lp-container inner-body">
        <div className="filter-bar" role="group" aria-label="Filtrar por prioridade">
          <span className="filter-label">Prioridade:</span>
          {(["Todos", "Crítica", "Alta", "Média", "Baixa"] as const).map((p) => (
            <button key={p} className={`filter-btn ${filter === p ? "filter-btn-active" : ""}`} onClick={() => setFilter(p)}>{p}</button>
          ))}
        </div>

        <div className="priority-full-list">
          {items.length === 0 ? (
            <p className="empty-msg">Nenhuma iniciativa com esse nível de prioridade.</p>
          ) : items.map((p) => (
            <article key={p.id} className="priority-full-card">
              <div className="pfc-header">
                <div>
                  <h2 className="pfc-title">{p.title}</h2>
                  <p className="pfc-desc">{p.description}</p>
                </div>
                <PriorityBadge priority={p.priority} />
              </div>
              <div className="pfc-meta">
                <span className="pfc-owner">👤 {p.owner}</span>
                <span className="pfc-deadline">📅 {p.deadline}</span>
                <span className="pfc-pct">{p.progress}% concluído</span>
              </div>
              <ProgressBar value={p.progress} />
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

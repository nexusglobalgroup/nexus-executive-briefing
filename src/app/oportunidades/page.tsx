"use client";

import { useState, useMemo } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { dashboardData } from "@/data/dashboard-data";
import type { Opportunity, OpportunityStatus } from "@/lib/dashboard-types";

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    "Ativo": "badge-success",
    "Em análise": "badge-info",
    "Em espera": "badge-warning",
    "Concluído": "badge-default"
  };
  return <span className={`badge ${map[status] ?? "badge-default"}`}>{status}</span>;
}

function PriorityBadge({ priority }: { priority: string }) {
  const map: Record<string, string> = { "Crítica": "badge-danger", "Alta": "badge-warning", "Média": "badge-info", "Baixa": "badge-default" };
  return <span className={`badge ${map[priority] ?? "badge-default"}`}>{priority}</span>;
}

export default function OportunidadesPage() {
  const [filter, setFilter] = useState<OpportunityStatus | "Todos">("Todos");
  const [sortKey, setSortKey] = useState<keyof Opportunity>("priority");
  const [segFilter, setSegFilter] = useState<"Todos" | "Aviation" | "Education">("Todos");

  const filtered = useMemo(() => {
    let list = dashboardData.opportunities;
    if (filter !== "Todos") list = list.filter((o) => o.status === filter);
    if (segFilter !== "Todos") list = list.filter((o) => o.segment === segFilter);
    const priorityOrder: Record<string, number> = { Crítica: 0, Alta: 1, Média: 2, Baixa: 3 };
    if (sortKey === "priority") return [...list].sort((a, b) => (priorityOrder[a.priority] ?? 9) - (priorityOrder[b.priority] ?? 9));
    return [...list].sort((a, b) => (a[sortKey]?.toString() ?? "").localeCompare(b[sortKey]?.toString() ?? ""));
  }, [filter, sortKey, segFilter]);

  const totalValue = useMemo(() => {
    const sum = filtered.reduce((acc, o) => {
      const num = parseFloat(o.value.replace(/[^\d,]/g, "").replace(",", ".")) * 1000;
      return acc + (isNaN(num) ? 0 : num);
    }, 0);
    return `R$ ${(sum / 1_000_000).toFixed(1)}M`;
  }, [filtered]);

  return (
    <main className="inner-page" id="main-content">
      <div className="inner-hero">
        <div className="lp-container">
          <span className="section-eyebrow">Pipeline Comercial</span>
          <h1 className="inner-title">Oportunidades</h1>
          <p className="inner-subtitle">Gestão e acompanhamento de todas as oportunidades comerciais ativas da Nexus Global Group.</p>
        </div>
      </div>

      <div className="lp-container inner-body">
        <div className="opp-summary-bar">
          <div className="opp-summary-stat">
            <strong>{filtered.length}</strong>
            <span>oportunidades</span>
          </div>
          <div className="opp-summary-stat">
            <strong>{totalValue}</strong>
            <span>em pipeline filtrado</span>
          </div>
        </div>

        <div className="filter-bar" role="group" aria-label="Filtros de oportunidades">
          <div className="filter-group">
            <span className="filter-label">Status:</span>
            {(["Todos", "Ativo", "Em análise", "Em espera", "Concluído"] as const).map((s) => (
              <button key={s} className={`filter-btn ${filter === s ? "filter-btn-active" : ""}`} onClick={() => setFilter(s)}>{s}</button>
            ))}
          </div>
          <div className="filter-group">
            <span className="filter-label">Segmento:</span>
            {(["Todos", "Aviation", "Education"] as const).map((s) => (
              <button key={s} className={`filter-btn ${segFilter === s ? "filter-btn-active" : ""}`} onClick={() => setSegFilter(s)}>{s}</button>
            ))}
          </div>
        </div>

        <div className="table-wrap">
          <table className="dash-table">
            <thead>
              <tr>
                <th>
                  <button className="sort-btn" onClick={() => setSortKey("title")}>
                    Oportunidade {sortKey === "title" ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  </button>
                </th>
                <th>Segmento</th>
                <th>Valor Estimado</th>
                <th>Responsável</th>
                <th>Status</th>
                <th>
                  <button className="sort-btn" onClick={() => setSortKey("priority")}>
                    Prioridade {sortKey === "priority" ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  </button>
                </th>
                <th>
                  <button className="sort-btn" onClick={() => setSortKey("deadline")}>
                    Prazo {sortKey === "deadline" ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="table-empty">Nenhuma oportunidade encontrada com os filtros selecionados.</td></tr>
              ) : (
                filtered.map((opp) => (
                  <tr key={opp.id}>
                    <td><span className="opp-title">{opp.title}</span></td>
                    <td><span className={`segment-tag segment-${opp.segment.toLowerCase()}`}>{opp.segment}</span></td>
                    <td className="value-cell">{opp.value}</td>
                    <td>{opp.responsible}</td>
                    <td><StatusBadge status={opp.status} /></td>
                    <td><PriorityBadge priority={opp.priority} /></td>
                    <td className="date-cell">{opp.deadline}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

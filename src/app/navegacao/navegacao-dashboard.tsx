'use client';

import type { CSSProperties } from 'react';
import { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Circle,
  CircleAlert,
  Filter,
  ListChecks,
  Plane,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import {
  navigationConcepts,
  navigationFormulas,
  navigationModules,
  navigationRoute,
  priorityOptions,
  studyStatuses,
  type StudyStatus,
} from '@/lib/navigation-data';
import styles from './navegacao.module.css';

type ConceptProgress = {
  status: StudyStatus;
  revision1: boolean;
  revision2: boolean;
};

type StoredProgress = {
  concepts?: Record<string, ConceptProgress>;
  route?: Record<string, boolean>;
};

const storageKey = 'nexus-navigation-study-v1';
const initialConceptProgress = (): Record<string, ConceptProgress> =>
  Object.fromEntries(
    navigationConcepts.map((concept) => [
      concept.id,
      {
        status: concept.initialStatus,
        revision1: Boolean(concept.revision1),
        revision2: Boolean(concept.revision2),
      },
    ]),
  );
const initialRouteProgress = (): Record<string, boolean> =>
  Object.fromEntries(navigationRoute.map((step) => [step.step, false]));

const statusClass: Record<StudyStatus, string> = {
  'Não iniciado': styles.notStarted,
  'Em estudo': styles.inStudy,
  Revisar: styles.review,
  Dominado: styles.mastered,
};

function isStudyStatus(value: unknown): value is StudyStatus {
  return typeof value === 'string' && studyStatuses.includes(value as StudyStatus);
}

function moduleCode(module: string) {
  return module.split(' - ')[0].replace('NAV ', '');
}

function priorityClass(priority: string) {
  if (priority === 'Alta') return styles.priorityHigh;
  if (priority === 'Média') return styles.priorityMedium;
  return styles.priorityLow;
}

export default function NavigationDashboard() {
  const [conceptProgress, setConceptProgress] = useState<Record<string, ConceptProgress>>(initialConceptProgress);
  const [routeProgress, setRouteProgress] = useState<Record<string, boolean>>(initialRouteProgress);
  const [moduleFilter, setModuleFilter] = useState('Todos os módulos');
  const [statusFilter, setStatusFilter] = useState('Todos os status');
  const [priorityFilter, setPriorityFilter] = useState('Todas as prioridades');
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(24);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored) as StoredProgress;
        if (parsed.concepts) {
          setConceptProgress((current) => {
            const next = { ...current };
            for (const concept of navigationConcepts) {
              const saved = parsed.concepts?.[concept.id];
              if (saved && isStudyStatus(saved.status)) {
                next[concept.id] = {
                  status: saved.status,
                  revision1: Boolean(saved.revision1),
                  revision2: Boolean(saved.revision2),
                };
              }
            }
            return next;
          });
        }
        if (parsed.route) {
          setRouteProgress((current) => ({ ...current, ...parsed.route }));
        }
      }
    } catch {
      window.localStorage.removeItem(storageKey);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(
      storageKey,
      JSON.stringify({ concepts: conceptProgress, route: routeProgress }),
    );
  }, [conceptProgress, hydrated, routeProgress]);

  const totals = useMemo(() => {
    const summary = {
      total: navigationConcepts.length,
      mastered: 0,
      inStudy: 0,
      review: 0,
      notStarted: 0,
    };

    navigationConcepts.forEach((concept) => {
      const status = conceptProgress[concept.id]?.status ?? 'Não iniciado';
      if (status === 'Dominado') summary.mastered += 1;
      if (status === 'Em estudo') summary.inStudy += 1;
      if (status === 'Revisar') summary.review += 1;
      if (status === 'Não iniciado') summary.notStarted += 1;
    });

    return summary;
  }, [conceptProgress]);

  const overallProgress = Math.round((totals.mastered / totals.total) * 100);
  const routeCompleted = navigationRoute.filter((step) => routeProgress[step.step]).length;
  const progressStyle = { '--progress': `${overallProgress * 3.6}deg` } as CSSProperties;

  const moduleSummary = useMemo(
    () =>
      navigationModules.map((module) => {
        const concepts = navigationConcepts.filter((concept) => concept.module === module);
        const mastered = concepts.filter(
          (concept) => conceptProgress[concept.id]?.status === 'Dominado',
        ).length;
        const active = concepts.filter((concept) => {
          const status = conceptProgress[concept.id]?.status;
          return status === 'Em estudo' || status === 'Revisar';
        }).length;
        return {
          module,
          total: concepts.length,
          mastered,
          active,
          progress: Math.round((mastered / concepts.length) * 100),
        };
      }),
    [conceptProgress],
  );

  const filteredConcepts = useMemo(() => {
    const term = query.trim().toLocaleLowerCase('pt-BR');
    return navigationConcepts.filter((concept) => {
      const current = conceptProgress[concept.id]?.status ?? 'Não iniciado';
      const searchIndex = [
        concept.id,
        concept.module,
        concept.subtopic,
        concept.concept,
        concept.definition,
        concept.application,
      ]
        .join(' ')
        .toLocaleLowerCase('pt-BR');

      return (
        (moduleFilter === 'Todos os módulos' || concept.module === moduleFilter) &&
        (statusFilter === 'Todos os status' || current === statusFilter) &&
        (priorityFilter === 'Todas as prioridades' || concept.priority === priorityFilter) &&
        (!term || searchIndex.includes(term))
      );
    });
  }, [conceptProgress, moduleFilter, priorityFilter, query, statusFilter]);

  const visibleConcepts = filteredConcepts.slice(0, visibleCount);

  function updateStatus(id: string, status: StudyStatus) {
    setConceptProgress((current) => ({
      ...current,
      [id]: { ...current[id], status },
    }));
  }

  function toggleRevision(id: string, revision: 'revision1' | 'revision2') {
    setConceptProgress((current) => ({
      ...current,
      [id]: { ...current[id], [revision]: !current[id][revision] },
    }));
  }

  function selectModule(module: string) {
    setModuleFilter(module);
    setVisibleCount(24);
  }

  function resetProgress() {
    if (!window.confirm('Limpar todos os status, revisões e itens do roteiro neste dispositivo?')) return;
    setConceptProgress(initialConceptProgress());
    setRouteProgress(initialRouteProgress());
  }

  return (
    <main className={styles.dashboard}>
      <header className={styles.topbar}>
        <a className={styles.brand} href="/" aria-label="Nexus Executive Briefing">
          <span className={styles.brandMark}>✦</span>
          <span>
            <strong>NEXUS</strong>
            <small>STUDY SYSTEMS</small>
          </span>
        </a>
        <div className={styles.topbarMeta}>
          <span className={hydrated ? styles.saved : styles.saving}>
            <CheckCircle2 size={15} />
            {hydrated ? 'Progresso salvo neste dispositivo' : 'Carregando progresso'}
          </span>
          <button className={styles.resetButton} type="button" onClick={resetProgress}>
            <RotateCcw size={15} />
            Reiniciar
          </button>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroGrid} />
        <div className={styles.heroOrbitOne} />
        <div className={styles.heroOrbitTwo} />
        <div className={styles.heroContent}>
          <div className={styles.eyebrow}><Plane size={15} />Navegação Aérea · PPA/ANAC</div>
          <h1>Estude a rota.<span> Enxergue o progresso.</span></h1>
          <p>
            Uma matriz de estudo VFR com 128 conceitos, revisões e roteiro de preparação organizados para apoiar seu aprendizado.
          </p>
          <div className={styles.heroFacts}>
            <span><strong>128</strong> conceitos</span>
            <span><strong>12</strong> módulos</span>
            <span><strong>12</strong> etapas VFR</span>
          </div>
        </div>

        <div className={styles.progressPanel}>
          <div className={styles.progressRing} style={progressStyle}>
            <div><strong>{overallProgress}%</strong><span>dominado</span></div>
          </div>
          <div className={styles.progressLegend}>
            <div><i className={styles.legendGold} /><span>Dominados</span><strong>{totals.mastered}</strong></div>
            <div><i className={styles.legendBlue} /><span>Em estudo</span><strong>{totals.inStudy}</strong></div>
            <div><i className={styles.legendMist} /><span>Para revisar</span><strong>{totals.review}</strong></div>
          </div>
        </div>
      </section>

      <section className={styles.safetyNotice}>
        <CircleAlert size={19} />
        <p><strong>Uso acadêmico.</strong> Este painel organiza o estudo e não substitui publicações aeronáuticas vigentes, documentação da aeronave, instrução qualificada ou decisão operacional.</p>
      </section>

      <section className={styles.metrics} aria-label="Resumo do progresso">
        <article><span>Conceitos</span><strong>{totals.total}</strong><small>na matriz de estudo</small></article>
        <article><span>Dominados</span><strong>{totals.mastered}</strong><small>{overallProgress}% do total</small></article>
        <article><span>Em movimento</span><strong>{totals.inStudy + totals.review}</strong><small>em estudo ou revisão</small></article>
        <article><span>Roteiro VFR</span><strong>{routeCompleted}/{navigationRoute.length}</strong><small>itens marcados</small></article>
      </section>

      <div className={styles.contentShell}>
        <section className={styles.studyArea}>
          <div className={styles.sectionIntro}>
            <div>
              <span className={styles.sectionLabel}>Trilha de conceitos</span>
              <h2>Domínio por módulo</h2>
            </div>
            <p>Selecione um módulo para concentrar a leitura. O progresso usa os itens marcados como “Dominado”.</p>
          </div>

          <div className={styles.moduleGrid}>
            <button
              type="button"
              onClick={() => selectModule('Todos os módulos')}
              className={`${styles.moduleCard} ${moduleFilter === 'Todos os módulos' ? styles.moduleActive : ''}`}
            >
              <span className={styles.moduleNumber}>ALL</span>
              <strong>Visão completa</strong>
              <small>{totals.total} conceitos</small>
              <span className={styles.moduleProgress}><i style={{ width: `${overallProgress}%` }} /></span>
            </button>
            {moduleSummary.map((module) => (
              <button
                type="button"
                key={module.module}
                onClick={() => selectModule(module.module)}
                className={`${styles.moduleCard} ${moduleFilter === module.module ? styles.moduleActive : ''}`}
              >
                <span className={styles.moduleNumber}>{moduleCode(module.module)}</span>
                <strong>{module.module.split(' - ')[1]}</strong>
                <small>{module.mastered}/{module.total} dominados · {module.active} ativos</small>
                <span className={styles.moduleProgress}><i style={{ width: `${module.progress}%` }} /></span>
              </button>
            ))}
          </div>

          <div className={styles.listHeader}>
            <div>
              <span className={styles.sectionLabel}>Checklist de estudo</span>
              <h2>Conceitos de navegação</h2>
            </div>
            <span className={styles.resultCount}>{filteredConcepts.length} de {totals.total} itens</span>
          </div>

          <div className={styles.filterBar}>
            <div className={styles.searchField}>
              <Search size={17} />
              <label className={styles.srOnly} htmlFor="navigation-search">Buscar conceito</label>
              <input
                id="navigation-search"
                value={query}
                onChange={(event) => { setQuery(event.target.value); setVisibleCount(24); }}
                placeholder="Buscar conceito, módulo ou aplicação"
              />
              {query && <button type="button" onClick={() => { setQuery(''); setVisibleCount(24); }} aria-label="Limpar busca"><X size={15} /></button>}
            </div>
            <button type="button" className={styles.filterToggle} onClick={() => setFiltersOpen((open) => !open)} aria-expanded={filtersOpen}>
              <SlidersHorizontal size={16} />Filtros<ChevronDown size={15} />
            </button>
            <div className={`${styles.filterControls} ${filtersOpen ? styles.filtersVisible : ''}`}>
              <label><Filter size={14} /><span>Módulo</span>
                <select value={moduleFilter} onChange={(event) => { setModuleFilter(event.target.value); setVisibleCount(24); }}>
                  <option>Todos os módulos</option>
                  {navigationModules.map((module) => <option key={module}>{module}</option>)}
                </select>
              </label>
              <label><span>Status</span>
                <select value={statusFilter} onChange={(event) => { setStatusFilter(event.target.value); setVisibleCount(24); }}>
                  <option>Todos os status</option>
                  {studyStatuses.map((status) => <option key={status}>{status}</option>)}
                </select>
              </label>
              <label><span>Prioridade</span>
                <select value={priorityFilter} onChange={(event) => { setPriorityFilter(event.target.value); setVisibleCount(24); }}>
                  <option>Todas as prioridades</option>
                  {priorityOptions.map((priority) => <option key={priority}>{priority}</option>)}
                </select>
              </label>
            </div>
          </div>

          <div className={styles.conceptList}>
            {visibleConcepts.map((concept) => {
              const progress = conceptProgress[concept.id];
              const mastered = progress.status === 'Dominado';
              return (
                <article className={styles.conceptCard} key={concept.id}>
                  <button
                    type="button"
                    className={`${styles.masteryButton} ${mastered ? styles.masteryComplete : ''}`}
                    onClick={() => updateStatus(concept.id, mastered ? 'Em estudo' : 'Dominado')}
                    aria-label={mastered ? `Marcar ${concept.concept} como em estudo` : `Marcar ${concept.concept} como dominado`}
                    title={mastered ? 'Marcar como em estudo' : 'Marcar como dominado'}
                  >
                    {mastered ? <Check size={16} /> : <Circle size={16} />}
                  </button>
                  <div className={styles.conceptMain}>
                    <div className={styles.conceptMeta}>
                      <span>{concept.id}</span><i /><span>{moduleCode(concept.module)}</span>
                      <b className={priorityClass(concept.priority)}>{concept.priority}</b>
                    </div>
                    <h3>{concept.concept}</h3>
                    <p>{concept.definition}</p>
                    <details className={styles.conceptDetails}>
                      <summary>Ver aplicação e referência <ChevronRight size={15} /></summary>
                      <div>
                        <dl>
                          <div><dt>Aplicação e foco</dt><dd>{concept.application}</dd></div>
                          <div><dt>Fórmula / convenção</dt><dd>{concept.formula}</dd></div>
                          <div><dt>Objetivo ANAC / referência</dt><dd>{concept.objective}</dd></div>
                        </dl>
                      </div>
                    </details>
                    <div className={styles.conceptControls}>
                      <label className={styles.statusControl}>
                        <span>Status</span>
                        <select value={progress.status} onChange={(event) => updateStatus(concept.id, event.target.value as StudyStatus)}>
                          {studyStatuses.map((status) => <option key={status}>{status}</option>)}
                        </select>
                      </label>
                      <label className={`${styles.revisionCheck} ${progress.revision1 ? styles.checked : ''}`}>
                        <input type="checkbox" checked={progress.revision1} onChange={() => toggleRevision(concept.id, 'revision1')} />
                        <span>R1</span>
                      </label>
                      <label className={`${styles.revisionCheck} ${progress.revision2 ? styles.checked : ''}`}>
                        <input type="checkbox" checked={progress.revision2} onChange={() => toggleRevision(concept.id, 'revision2')} />
                        <span>R2</span>
                      </label>
                      <span className={`${styles.statusBadge} ${statusClass[progress.status]}`}>{progress.status}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {filteredConcepts.length === 0 && (
            <div className={styles.emptyState}><Search size={22} /><strong>Nenhum conceito encontrado.</strong><span>Ajuste a busca ou os filtros aplicados.</span></div>
          )}

          {visibleCount < filteredConcepts.length && (
            <button className={styles.loadMore} type="button" onClick={() => setVisibleCount((count) => count + 24)}>
              Mostrar mais {Math.min(24, filteredConcepts.length - visibleCount)} conceitos <ChevronDown size={16} />
            </button>
          )}
        </section>

        <aside className={styles.sidePanel}>
          <section className={styles.routeCard}>
            <div className={styles.sideHeader}>
              <div className={styles.sideIcon}><ListChecks size={20} /></div>
              <div><span>Checklist guiado</span><h2>Roteiro VFR</h2></div>
              <strong>{routeCompleted}/{navigationRoute.length}</strong>
            </div>
            <div className={styles.routeProgress}><i style={{ width: `${(routeCompleted / navigationRoute.length) * 100}%` }} /></div>
            <ol className={styles.routeList}>
              {navigationRoute.map((step) => (
                <li key={step.step} className={routeProgress[step.step] ? styles.routeDone : ''}>
                  <label>
                    <input
                      type="checkbox"
                      checked={routeProgress[step.step] ?? false}
                      onChange={() => setRouteProgress((current) => ({ ...current, [step.step]: !current[step.step] }))}
                    />
                    <span className={styles.routeCheck}>{routeProgress[step.step] ? <Check size={13} /> : null}</span>
                    <span className={styles.routeNumber}>{step.step}</span>
                    <span className={styles.routeAction}>{step.action}</span>
                  </label>
                  <details>
                    <summary>Ver apoio</summary>
                    <p><strong>Dados / fontes:</strong> {step.sources}</p>
                    <p><strong>Checagem:</strong> {step.check}</p>
                    <p><strong>Bloco de estudo:</strong> {step.studyBlock}</p>
                  </details>
                </li>
              ))}
            </ol>
          </section>

          <section className={styles.formulaCard}>
            <div className={styles.formulaHeading}><BookOpen size={19} /><div><span>Referência rápida</span><h2>Fórmulas & convenções</h2></div></div>
            <div className={styles.formulaList}>
              {navigationFormulas.map((formula) => (
                <details key={`${formula.topic}-${formula.relation}`}>
                  <summary><span>{formula.topic}</span><ChevronRight size={15} /></summary>
                  <div>
                    <strong>{formula.relation}</strong>
                    <p>{formula.meaning}</p>
                    <small><b>Atenção:</b> {formula.attention}</small>
                  </div>
                </details>
              ))}
            </div>
          </section>
        </aside>
      </div>

      <section className={styles.footerNotice}>
        <Plane size={18} />
        <div><strong>Navegação consciente é tomada de decisão.</strong><span>Use esta estrutura para consolidar estudo, organizar revisões e preparar perguntas de instrução.</span></div>
      </section>
    </main>
  );
}

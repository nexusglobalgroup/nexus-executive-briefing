import sourceData from './navigation-data.json';

export const studyStatuses = ['Não iniciado', 'Em estudo', 'Revisar', 'Dominado'] as const;
export type StudyStatus = (typeof studyStatuses)[number];

export type NavigationConcept = {
  id: string;
  module: string;
  subtopic: string;
  concept: string;
  definition: string;
  application: string;
  formula: string;
  objective: string;
  priority: 'Alta' | 'Média' | 'Baixa';
  initialStatus: StudyStatus;
  revision1: string;
  revision2: string;
  notes: string;
};

export type NavigationRouteStep = {
  step: string;
  action: string;
  sources: string;
  check: string;
  studyBlock: string;
};

export type NavigationFormula = {
  topic: string;
  relation: string;
  unit: string;
  meaning: string;
  attention: string;
  source: string;
};

type NavigationData = {
  concepts: NavigationConcept[];
  route: NavigationRouteStep[];
  formulas: NavigationFormula[];
};

const navigationData = sourceData as NavigationData;

export const navigationConcepts = navigationData.concepts;
export const navigationRoute = navigationData.route;
export const navigationFormulas = navigationData.formulas;
export const navigationModules = Array.from(new Set(navigationConcepts.map((item) => item.module)));
export const priorityOptions = ['Alta', 'Média', 'Baixa'] as const;

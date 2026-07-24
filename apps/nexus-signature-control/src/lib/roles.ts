export type RoleCategory = "required" | "support" | "education";

export type RoleDefinition = {
  id: string;
  title: string;
  shortTitle: string;
  category: RoleCategory;
  unit: "aviation" | "education";
  functionalEmail: string;
  reference: string;
  note: string;
};

export const roles: RoleDefinition[] = [
  {
    id: "accountable-executive",
    title: "CEO | Gestor Responsável da Empresa de Transporte Aéreo",
    shortTitle: "Gestor Responsável",
    category: "required",
    unit: "aviation",
    functionalEmail: "gestor.responsavel",
    reference: "RBAC 119.69",
    note: "Ativar somente quando a designação estiver refletida nos atos constitutivos ou em delegação válida da operadora.",
  },
  {
    id: "operations-director",
    title: "Diretor(a) ou Gerente de Operações",
    shortTitle: "Direção de Operações",
    category: "required",
    unit: "aviation",
    functionalEmail: "diretor.operacoes",
    reference: "RBAC 119.69(a)(1)",
    note: "Pessoal de administração requerido para a condução das operações.",
  },
  {
    id: "chief-pilot",
    title: "Piloto(a) Chefe",
    shortTitle: "Piloto Chefe",
    category: "required",
    unit: "aviation",
    functionalEmail: "piloto.chefe",
    reference: "RBAC 119.69(a)(2)",
    note: "Pessoal de administração requerido, sujeito aos requisitos de qualificação aplicáveis.",
  },
  {
    id: "maintenance-director",
    title: "Diretor(a) ou Gerente de Manutenção",
    shortTitle: "Direção de Manutenção",
    category: "required",
    unit: "aviation",
    functionalEmail: "diretor.manutencao",
    reference: "RBAC 119.69(a)(3)",
    note: "Pessoal de administração requerido para a governança da manutenção.",
  },
  {
    id: "safety-director",
    title: "Diretor(a) ou Gerente de Segurança Operacional",
    shortTitle: "Segurança Operacional",
    category: "required",
    unit: "aviation",
    functionalEmail: "seguranca.operacional",
    reference: "RBAC 119.69(a)(4)",
    note: "Pessoal de administração requerido para a gestão da segurança operacional.",
  },
  {
    id: "operational-control",
    title: "Coordenador(a) de Controle Operacional | Pessoa Autorizada",
    shortTitle: "Controle Operacional",
    category: "support",
    unit: "aviation",
    functionalEmail: "controle.operacional",
    reference: "RBAC 135.77",
    note: "Nome e título devem constar no MGO quando a pessoa estiver autorizada a exercer controle operacional.",
  },
  {
    id: "continuing-airworthiness",
    title: "Coordenador(a) de Aeronavegabilidade Continuada",
    shortTitle: "Aeronavegabilidade",
    category: "support",
    unit: "aviation",
    functionalEmail: "aeronavegabilidade",
    reference: "PMAC / MGM",
    note: "Função de execução subordinada à manutenção; a nomenclatura deve refletir os manuais aprovados.",
  },
  {
    id: "required-inspection",
    title: "Responsável pela Inspeção Obrigatória de Manutenção",
    shortTitle: "Inspeção de Manutenção",
    category: "support",
    unit: "aviation",
    functionalEmail: "inspecao.manutencao",
    reference: "RBAC 135.429",
    note: "Aplicável quando a estrutura de manutenção exigir pessoal de inspeção obrigatória.",
  },
  {
    id: "operational-training",
    title: "Coordenador(a) de Treinamento Operacional e Qualificação",
    shortTitle: "Treinamento Operacional",
    category: "support",
    unit: "aviation",
    functionalEmail: "treinamento.operacional",
    reference: "Programa de Treinamento",
    note: "Função de suporte ao programa aprovado; instrutores e examinadores permanecem sujeitos a requisitos próprios.",
  },
  {
    id: "quality-compliance",
    title: "Coordenador(a) de Qualidade, Conformidade e Controle Documental",
    shortTitle: "Qualidade e Conformidade",
    category: "support",
    unit: "aviation",
    functionalEmail: "qualidade.documentos",
    reference: "Governança documental",
    note: "Função recomendada para governar manuais, revisões e evidências; não substitui os cargos requeridos.",
  },
  {
    id: "avsec",
    title: "Responsável de Segurança da Aviação Civil — AVSEC",
    shortTitle: "AVSEC",
    category: "support",
    unit: "aviation",
    functionalEmail: "avsec",
    reference: "RBAC 108 / PSOA",
    note: "Aplicar conforme o escopo da operação e do PSOA; não classificar como cargo requerido pelo RBAC 119.69.",
  },
  {
    id: "dangerous-goods",
    title: "Responsável por Artigos Perigosos",
    shortTitle: "Artigos Perigosos",
    category: "support",
    unit: "aviation",
    functionalEmail: "artigos.perigosos",
    reference: "RBAC 175",
    note: "Aplicar conforme o escopo de artigos perigosos e as autorizações registradas nas Especificações Operativas.",
  },
  {
    id: "dpo",
    title: "Encarregado(a) de Dados | DPO",
    shortTitle: "Privacidade e Dados",
    category: "support",
    unit: "aviation",
    functionalEmail: "dpo",
    reference: "LGPD",
    note: "Função corporativa de privacidade; não é cargo de administração requerido pelo RBAC 119.69.",
  },
  {
    id: "education-executive",
    title: "Diretor(a) Executivo(a) | Nexus Global Education",
    shortTitle: "Direção Executiva",
    category: "education",
    unit: "education",
    functionalEmail: "education",
    reference: "Governança institucional",
    note: "Liderança da unidade educacional; não substitui indicação de cargo regulatório do operador aéreo.",
  },
  {
    id: "academic-director",
    title: "Diretor(a) Acadêmico(a) e de Treinamento Aeronáutico",
    shortTitle: "Direção Acadêmica",
    category: "education",
    unit: "education",
    functionalEmail: "academico",
    reference: "Governança acadêmica",
    note: "A validação regulatória específica depende do tipo e do escopo do treinamento oferecido.",
  },
  {
    id: "education-quality",
    title: "Coordenador(a) de Registros, Certificação e Qualidade Educacional",
    shortTitle: "Registros e Certificação",
    category: "education",
    unit: "education",
    functionalEmail: "registros.education",
    reference: "Rastreabilidade educacional",
    note: "Não alegar certificação regulatória sem base documental específica e verificável.",
  },
];

export const categoryLabels: Record<RoleCategory, string> = {
  required: "Cargos requeridos",
  support: "Sustentação operacional",
  education: "Nexus Global Education",
};

export function getRole(roleId: string) {
  return roles.find((role) => role.id === roleId) ?? roles[0];
}

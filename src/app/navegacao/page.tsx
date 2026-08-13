import type { Metadata } from 'next';
import NavigationDashboard from './navegacao-dashboard';

export const metadata: Metadata = {
  title: 'Navegação Aérea PPA/ANAC | Nexus Executive Briefing',
  description: 'Painel de estudo com checklist, revisões e progresso por módulo de navegação aérea.',
};

export default function NavigationPage() {
  return <NavigationDashboard />;
}

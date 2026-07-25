export const metadata = {
  title: "Pé de Galinha PPA NAV1 | Nexus Global Education",
  description:
    "Curso técnico focado em rumos, proas, declinação magnética, desvio de bússola e correção de deriva para preparação PPA NAV1."
};

const modules = [
  ["01", "Anatomia do Pé de Galinha", "RV, RM, RB, PV, PM, PB, DMG, DB e CD."],
  ["02", "Regra dos sinais E/W", "Movimento para a direita, para a esquerda e normalização 000°–359°."],
  ["03", "Linha dos rumos", "Conversões RV ↔ RM ↔ RB em qualquer sentido."],
  ["04", "Linha das proas", "Conversões PV ↔ PM ↔ PB em qualquer sentido."],
  ["05", "Correção de deriva", "Relação PV = RV + CD e sua operação inversa."],
  ["06", "Cadeias completas", "Resolução PB → RV e RV → PB sem saltos mentais."],
  ["07", "Estratégia de prova", "Protocolo de 45 segundos e controle de plausibilidade."],
  ["08", "Simulado técnico", "20 exercícios com respostas comentadas e meta de 70%."],
];

const glossary = [
  ["RV", "Rumo Verdadeiro", "Trajetória pretendida sobre o solo, referida ao Norte Verdadeiro."],
  ["RM", "Rumo Magnético", "Rumo referido ao Norte Magnético."],
  ["RB", "Rumo de Bússola", "Rumo indicado após considerar o desvio de bússola."],
  ["PV", "Proa Verdadeira", "Direção longitudinal da aeronave, referida ao Norte Verdadeiro."],
  ["PM", "Proa Magnética", "Proa referida ao Norte Magnético."],
  ["PB", "Proa de Bússola", "Proa indicada pela bússola após considerar o desvio."],
  ["DMG", "Declinação Magnética", "Ângulo entre os nortes verdadeiro e magnético."],
  ["DB", "Desvio de Bússola", "Erro residual do sistema de bússola da aeronave."],
  ["CD", "Correção de Deriva", "Ângulo aplicado ao rumo para obter a proa necessária."],
];

const exercises = [
  ["RV 090°, DMG 10°E. Calcule RM.", "RM 080°. Verdadeiro → Magnético: E subtrai."],
  ["RV 270°, DMG 12°W. Calcule RM.", "RM 282°. Verdadeiro → Magnético: W soma."],
  ["RM 160°, DMG 8°E. Calcule RV.", "RV 168°. Magnético → Verdadeiro: E soma."],
  ["RM 005°, DMG 15°W. Calcule RV.", "RV 350°. Magnético → Verdadeiro: W subtrai; normalize o resultado."],
  ["RM 120°, DB 4°E. Calcule RB.", "RB 116°. Magnético → Bússola: E subtrai."],
  ["RM 355°, DB 8°W. Calcule RB.", "RB 003°. Magnético → Bússola: W soma e o resultado é normalizado."],
  ["RB 220°, DB 5°E. Calcule RM.", "RM 225°. Bússola → Magnético: E soma."],
  ["RB 010°, DB 7°W. Calcule RM.", "RM 003°. Bússola → Magnético: W subtrai."],
  ["PV 200°, DMG 14°E. Calcule PM.", "PM 186°. Verdadeiro → Magnético: E subtrai."],
  ["PM 045°, DMG 9°W. Calcule PV.", "PV 036°. Magnético → Verdadeiro: W subtrai."],
  ["PM 300°, DB 6°E. Calcule PB.", "PB 294°. Magnético → Bússola: E subtrai."],
  ["PB 100°, DB 3°W. Calcule PM.", "PM 097°. Bússola → Magnético: W subtrai."],
  ["RV 110°, CD +8°. Calcule PV.", "PV 118°. Use PV = RV + CD."],
  ["RV 350°, CD +15°. Calcule PV.", "PV 005°. Some e normalize acima de 359°."],
  ["PV 060°, CD −10°. Calcule RV.", "RV 070°. Use RV = PV − CD; subtrair valor negativo equivale a somar."],
  ["PB 120°, DB 5°W, DMG 20°E, CD +10°. Calcule RV.", "PM 115°; PV 135°; RV 125°. Resolva PB → PM → PV → RV."],
  ["PB 280°, DB 4°E, DMG 12°W, CD −6°. Calcule RV.", "PM 284°; PV 272°; RV 278°."],
  ["RV 045°, CD −7°, DMG 10°W, DB 3°E. Calcule PB.", "PV 038°; PM 048°; PB 045°."],
  ["RV 330°, CD +12°, DMG 18°E, DB 5°W. Calcule PB.", "PV 342°; PM 324°; PB 329°."],
  ["PB 015°, DB 6°E, DMG 11°E, CD +5°. Calcule RV.", "PM 021°; PV 032°; RV 027°."],
];

export default function CoursePage() {
  return (
    <main>
      <style>{`
        :root{--night:#182947;--deep:#09182d;--blue:#1d415c;--gold:#f39700;--yellow:#f3de00;--knowledge:#58b7c8;--paper:#f5f7fb;--ink:#13223a;--muted:#637188}
        *{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--paper);color:var(--ink);font-family:Montserrat,Arial,sans-serif;line-height:1.55}a{color:inherit}.top{position:sticky;top:0;z-index:5;display:flex;justify-content:space-between;align-items:center;padding:16px 7vw;background:rgba(9,24,45,.96);color:white;border-bottom:1px solid rgba(243,151,0,.45)}.brand strong{letter-spacing:.28em;color:var(--gold)}.brand small{display:block;letter-spacing:.2em}.nav{display:flex;gap:22px;font-size:13px}.nav a{text-decoration:none}.hero{padding:90px 7vw 78px;background:radial-gradient(circle at 90% 10%,rgba(88,183,200,.16),transparent 30%),linear-gradient(135deg,var(--deep),var(--night));color:white}.eyebrow{font-size:13px;font-weight:700;letter-spacing:.16em;color:var(--yellow)}h1{font-size:clamp(48px,7vw,100px);line-height:.94;margin:26px 0;max-width:980px}h1 span{display:block;color:var(--gold)}.lead{max-width:850px;font-size:19px;color:#cad5e5}.stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;max-width:850px;margin-top:48px}.stats div{border-top:1px solid rgba(255,255,255,.22);padding-top:20px}.stats strong{display:block;font-size:31px;color:var(--yellow)}.stats span{font-size:12px;letter-spacing:.12em;text-transform:uppercase}.notice{padding:18px 7vw;background:#fff3cf;color:#634a13;font-size:13px}.section{padding:76px 7vw}.section:nth-of-type(even){background:white}.head{display:flex;justify-content:space-between;gap:30px;align-items:end;margin-bottom:34px}.head span{color:#b66b00;font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase}.head h2{font-size:clamp(32px,4vw,55px);line-height:1.05;margin:8px 0}.head p{max-width:500px;color:var(--muted)}.modules,.terms,.rules,.steps,.exerciseGrid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px}.card,.term,.rule,.step,.exercise{background:white;border:1px solid rgba(24,41,71,.12);border-radius:18px;padding:24px;box-shadow:0 10px 30px rgba(24,41,71,.06)}.card b{font-size:13px;color:#c57200}.card h3,.term h3,.rule h3,.step h3{margin:10px 0 7px}.card p,.term p,.rule p,.step p{font-size:14px;color:var(--muted)}.diagram{background:linear-gradient(145deg,var(--deep),var(--night));color:white;padding:36px;border-radius:24px;overflow:auto}.diagramRow{display:grid;grid-template-columns:1fr .7fr 1fr .7fr 1fr;min-width:680px;align-items:center;text-align:center;margin:18px 0}.diagramRow strong{font-size:clamp(28px,4vw,54px)}.diagramRow span{padding:12px;border-radius:999px;background:rgba(88,183,200,.13);color:var(--yellow);font-weight:800}.direction{display:flex;justify-content:space-between;min-width:680px;color:var(--knowledge);font-weight:800}.cd{margin:28px auto 0;max-width:520px;text-align:center;padding:18px;border:1px solid rgba(243,222,0,.35);border-radius:15px;color:var(--yellow);font-size:20px}.rules{margin-top:24px}.rule strong{display:block;font-size:28px;color:var(--gold)}.term strong{font-size:30px;color:var(--blue)}.example{display:grid;grid-template-columns:.8fr 1.2fr;gap:24px}.data{background:var(--night);color:white;border-radius:22px;padding:30px}.data dl{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.data div{padding:14px;border:1px solid rgba(255,255,255,.16);border-radius:12px}.data dt{font-size:12px;color:#b8c5d6}.data dd{font-size:25px;font-weight:800;margin:0}.worked{display:grid;gap:13px}.worked article{display:flex;gap:18px;background:white;border-radius:16px;padding:20px;border:1px solid rgba(24,41,71,.12)}.worked span{display:grid;place-items:center;flex:0 0 42px;height:42px;border-radius:50%;background:var(--gold);font-weight:800}.worked h3{margin:0}.answer{background:#eaf8f4!important;border-color:#a6ddcb!important}.strategy{background:var(--night)!important;color:white}.strategy .head p,.strategy .step p{color:#c6d0df}.strategy .step{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.12)}.strategy .step strong{font-size:31px;color:var(--yellow)}.exerciseGrid{grid-template-columns:repeat(2,minmax(0,1fr))}.exercise{padding:0;overflow:hidden}.exercise summary{cursor:pointer;padding:20px;font-weight:700;list-style:none}.exercise summary::before{content:'+';display:inline-grid;place-items:center;width:28px;height:28px;margin-right:12px;border-radius:50%;background:var(--gold);color:#111}.exercise p{margin:0;padding:0 20px 20px;color:#315b4f}.sources{background:var(--deep);color:white}.sourceLinks{display:grid;gap:12px}.sourceLinks a{padding:18px;border:1px solid rgba(255,255,255,.15);border-radius:14px;text-decoration:none}.sourceLinks a:hover{border-color:var(--gold)}footer{padding:28px 7vw;background:#050f1e;color:#b7c3d4;display:flex;justify-content:space-between;gap:30px;font-size:13px}.canva{display:inline-block;margin-top:24px;padding:14px 20px;border-radius:10px;background:linear-gradient(90deg,var(--gold),var(--yellow));color:#111;text-decoration:none;font-weight:800}@media(max-width:900px){.modules,.terms,.rules,.steps{grid-template-columns:repeat(2,1fr)}.example{grid-template-columns:1fr}.nav{display:none}.stats{grid-template-columns:1fr}.head{display:block}}@media(max-width:590px){.modules,.terms,.rules,.steps,.exerciseGrid{grid-template-columns:1fr}.hero,.section{padding-left:22px;padding-right:22px}.top{padding:14px 22px}.diagram{padding:22px}footer{display:block}.brand strong{font-size:13px}}
      `}</style>

      <header className="top">
        <div className="brand"><strong>NEXUS</strong><small>GLOBAL EDUCATION</small></div>
        <nav className="nav"><a href="#trilha">Trilha</a><a href="#metodo">Método</a><a href="#exemplo">Exemplo</a><a href="#exercicios">Exercícios</a></nav>
      </header>

      <section className="hero">
        <div className="eyebrow">PPA · NAV1 · PREPARAÇÃO TÉCNICA</div>
        <h1>Pé de Galinha<span>sem erro de sinal.</span></h1>
        <p className="lead">Curso técnico concentrado em rumos, proas, declinação magnética, desvio de bússola e correção de deriva, com método visual, resolução em cadeia e treino orientado à prova teórica.</p>
        <div className="stats"><div><strong>08</strong><span>módulos técnicos</span></div><div><strong>20</strong><span>exercícios comentados</span></div><div><strong>70%</strong><span>meta mínima de treino</span></div></div>
        <a className="canva" href="https://www.canva.com/d/FINJR-27oIH48Fr" target="_blank" rel="noreferrer">Abrir versão visual no Canva</a>
      </section>

      <aside className="notice"><strong>Nota de compliance:</strong> curso preparatório independente. O “pé de galinha” é apresentado como método gráfico de aprendizagem. O conteúdo não reproduz banco sigiloso e não representa homologação ou vínculo com a ANAC.</aside>

      <section className="section" id="trilha">
        <div className="head"><div><span>Trilha curricular</span><h2>Do conceito à execução</h2></div><p>Carga sugerida: 6 horas, com estudo progressivo e repetição deliberada dos sinais.</p></div>
        <div className="modules">{modules.map(([n,t,p])=><article className="card" key={n}><b>MÓDULO {n}</b><h3>{t}</h3><p>{p}</p></article>)}</div>
      </section>

      <section className="section" id="metodo">
        <div className="head"><div><span>Método visual</span><h2>Leia o desenho antes dos números</h2></div><p>Localize o ponto de partida, o dado pedido e o sentido do deslocamento.</p></div>
        <div className="diagram">
          <div className="direction"><span>← PARA A ESQUERDA: E + · W −</span><span>PARA A DIREITA: E − · W + →</span></div>
          <div className="diagramRow"><strong>RV</strong><span>DMG</span><strong>RM</strong><span>DB</span><strong>RB</strong></div>
          <div className="diagramRow"><strong>PV</strong><span>DMG</span><strong>PM</strong><span>DB</span><strong>PB</strong></div>
          <div className="cd">PV = RV + CD &nbsp; | &nbsp; RV = PV − CD</div>
        </div>
        <div className="rules"><article className="rule"><strong>Direita</strong><h3>E subtrai · W soma</h3><p>Verdadeiro → Magnético e Magnético → Bússola.</p></article><article className="rule"><strong>Esquerda</strong><h3>E soma · W subtrai</h3><p>Bússola → Magnético e Magnético → Verdadeiro.</p></article><article className="rule"><strong>Rumo</strong><h3>Trajetória sobre o solo</h3><p>Use RV, RM e RB.</p></article><article className="rule"><strong>Proa</strong><h3>Direção do nariz</h3><p>Use PV, PM e PB.</p></article></div>
      </section>

      <section className="section">
        <div className="head"><div><span>Vocabulário técnico</span><h2>Nove termos indispensáveis</h2></div></div>
        <div className="terms">{glossary.map(([a,b,c])=><article className="term" key={a}><strong>{a}</strong><h3>{b}</h3><p>{c}</p></article>)}</div>
      </section>

      <section className="section" id="exemplo">
        <div className="head"><div><span>Resolução comentada</span><h2>Exemplo completo PB → RV</h2></div><p>Dados: PB 120°, DB 5°W, DMG 20°E e CD +10°.</p></div>
        <div className="example"><article className="data"><h3>Qual é o Rumo Verdadeiro?</h3><dl><div><dt>PB</dt><dd>120°</dd></div><div><dt>DB</dt><dd>5°W</dd></div><div><dt>DMG</dt><dd>20°E</dd></div><div><dt>CD</dt><dd>+10°</dd></div></dl></article><div className="worked"><article><span>1</span><div><h3>PB → PM</h3><p>Movimento à esquerda; W diminui: 120° − 5° = <strong>115°</strong>.</p></div></article><article><span>2</span><div><h3>PM → PV</h3><p>Movimento à esquerda; E aumenta: 115° + 20° = <strong>135°</strong>.</p></div></article><article><span>3</span><div><h3>PV → RV</h3><p>RV = PV − CD: 135° − 10° = <strong>125°</strong>.</p></div></article><article className="answer"><span>✓</span><div><h3>Resposta final</h3><p>Rumo Verdadeiro = <strong>125°</strong>.</p></div></article></div></div>
      </section>

      <section className="section strategy">
        <div className="head"><div><span>Estratégia de prova</span><h2>Protocolo de 45 segundos</h2></div><p>Evite cálculos mentais em cadeia. Registre cada transformação.</p></div>
        <div className="steps"><article className="step"><strong>1</strong><h3>Circule o pedido</h3><p>Descubra em qual sigla deve terminar.</p></article><article className="step"><strong>2</strong><h3>Marque a origem</h3><p>Posicione o valor fornecido no desenho.</p></article><article className="step"><strong>3</strong><h3>Desenhe a seta</h3><p>A direção define o quadro de sinais.</p></article><article className="step"><strong>4</strong><h3>Calcule por etapas</h3><p>Uma transformação por linha.</p></article><article className="step"><strong>5</strong><h3>Normalize</h3><p>Acima de 359°, subtraia 360°; abaixo de 0°, some 360°.</p></article><article className="step"><strong>6</strong><h3>Valide</h3><p>Confirme sentido e plausibilidade antes de marcar.</p></article></div>
      </section>

      <section className="section" id="exercicios">
        <div className="head"><div><span>Avaliação formativa</span><h2>20 exercícios comentados</h2></div><p>Abra cada cartão somente depois de concluir o cálculo. Meta: pelo menos 14 acertos.</p></div>
        <div className="exerciseGrid">{exercises.map(([q,a],i)=><details className="exercise" key={q}><summary>{String(i+1).padStart(2,"0")} · {q}</summary><p><strong>Resposta:</strong> {a}</p></details>)}</div>
      </section>

      <section className="section sources">
        <div className="head"><div><span>Base técnica pública</span><h2>Referências de alinhamento</h2></div><p>Confirme sempre as normas e orientações vigentes antes do exame.</p></div>
        <div className="sourceLinks"><a href="https://www.anac.gov.br/assuntos/legislacao/legislacao-1/portarias/2023/anexo-i-a-portaria-no-9-592-spl-de-21-de-outubro-de-2022-no-exame-ppa" target="_blank" rel="noreferrer">Objetivos de aprendizagem do exame PPA — ANAC</a><a href="https://www.anac.gov.br/assuntos/legislacao/legislacao-1/portarias/2022/portaria-9592" target="_blank" rel="noreferrer">Portaria dos exames teóricos — ANAC</a><a href="https://www.gov.br/anac/pt-br/assuntos/regulados/profissionais-da-aviacao-civil/processo-de-licencas-e-habilitacoes" target="_blank" rel="noreferrer">Processo de licenças e habilitações — ANAC</a></div>
      </section>

      <footer><strong>NEXUS GLOBAL EDUCATION</strong><span>Learn. Standardize. Perform.</span></footer>
    </main>
  );
}

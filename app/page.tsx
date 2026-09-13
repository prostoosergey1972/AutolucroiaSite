"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, Bot, Check, ChevronDown, ChevronLeft, ChevronRight,
  CreditCard, Cpu, FileCheck2, LineChart, LockKeyhole, ScanSearch, ShieldCheck, Sparkles,
} from "lucide-react";

const reviews = [
  ["/images/review-01.jpeg", "Leonardo", "Primeiro resultado e acompanhamento"],
  ["/images/review-02.jpeg", "Francisco", "Experiência com a plataforma"],
  ["/images/review-03.jpeg", "Olívia", "Resultado partilhado pela cliente"],
  ["/images/review-04.jpeg", "Cristiana", "Ciclo concluído"],
  ["/images/review-05.jpeg", "João", "Resultado e levantamento"],
  ["/images/review-06.jpeg", "Rita Sabrosa", "Resultado recebido e partilhado"],
  ["/images/review-07.jpeg", "Amanda", "Experiência após o levantamento"],
  ["/images/review-08.jpeg", "Pedro Ribeiro", "Resultado confirmado pelo cliente"],
  ["/images/review-09.jpeg", "Martha Nunes", "Levantamento partilhado pela cliente"],
  ["/images/review-10.jpeg", "Rita Estrada", "Resultado recebido na conta"],
  ["/images/review-11.jpeg", "Marina", "Experiência e resultado partilhados"],
];

const questions = [
  ["O que é a AutoLucro IA?", "A AutoLucro IA é um ecossistema alimentado por inteligência artificial que identifica operações potencialmente lucrativas em tempo real. O algoritmo analisa centenas de pares a cada segundo e calcula pequenas diferenças de preço nas bolsas globais."],
  ["Porque é uma experiência automatizada?", "Enquanto o utilizador acompanha o processo, a AutoLucro IA analisa o mercado 24 horas por dia, procura diferenças de preço e apresenta as operações. Segundo a dinâmica do projeto, o sistema aprende com os dados processados e torna-se mais preciso a cada ciclo."],
  ["Como ajudo a treinar a IA?", "A conta disponibiliza poder de computação para processar dados e ajudar o algoritmo a identificar as melhores operações. Quanto mais utilizadores ativos houver, maior é o volume de informação analisado pelo sistema."],
  ["Quando posso levantar e quanto demora?", "Após a conclusão das 7 operações, o utilizador escolhe onde deseja receber o valor apresentado no saldo, introduz os dados da conta bancária ou da carteira de criptomoedas e solicita o levantamento. O prazo de chegada depende do banco, do método escolhido e das verificações aplicáveis; o tempo exato é apresentado no momento do pedido."],
  ["Quanto posso ganhar?", "Os ganhos dependem da atividade do mercado. O projeto apresenta exemplos de ciclos até €12.500 e disponibiliza €65 de capital inicial de boas-vindas. Estes valores são exemplos da experiência e não constituem garantia de rentabilidade."],
  ["O que é o VIP?", "O nível VIP reflete o grau de atividade do utilizador e o sucesso na conclusão das operações. A cada novo nível, o sistema pode disponibilizar operações mais exclusivas, novos limites e privilégios adicionais."],
  ["Este projeto é adequado para principiantes?", "Sim. A IA encarrega-se da análise complexa dos gráficos. Não é preciso ser trader: basta acompanhar o processo e ativar os ciclos de operações com um simples toque num botão."],
];

function Logo() {
  return <span className="logo"><i>A</i><b>AutoLucro</b><em>IA</em></span>;
}

export default function Home() {
  const rail = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState("");
  const [liquidPill, setLiquidPill] = useState({ left: 0, width: 0, visible: false });

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("visible")),
      { threshold: .12 },
    );
    document.querySelectorAll(".reveal").forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updatePill = () => {
      const navigation = menu.current;
      const link = navigation?.querySelector<HTMLAnchorElement>("a.active");
      if (!navigation || !link) {
        setLiquidPill(current => ({ ...current, visible: false }));
        return;
      }
      link.scrollIntoView({ block: "nearest", inline: "nearest" });
      setLiquidPill({ left: link.offsetLeft, width: link.offsetWidth, visible: true });
    };
    updatePill();
    window.addEventListener("resize", updatePill);
    return () => window.removeEventListener("resize", updatePill);
  }, [activeSection]);

  useEffect(() => {
    const sectionIds = ["como", "resultados", "seguranca", "lucas", "faq"];
    const updateSection = () => {
      const marker = window.scrollY + Math.min(window.innerHeight * .34, 280);
      let current = "";
      sectionIds.forEach(id => {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= marker) current = id;
      });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) current = "faq";
      setActiveSection(current);
    };
    updateSection();
    window.addEventListener("scroll", updateSection, { passive: true });
    window.addEventListener("resize", updateSection);
    return () => {
      window.removeEventListener("scroll", updateSection);
      window.removeEventListener("resize", updateSection);
    };
  }, []);

  const moveReviews = (direction: number) => {
    const element = rail.current;
    if (!element) return;
    const card = element.querySelector<HTMLElement>(".review");
    const gap = Number.parseFloat(getComputedStyle(element).gap) || 0;
    const distance = (card?.getBoundingClientRect().width || 300) + gap;
    element.scrollBy({ left: direction * distance, behavior: "smooth" });
  };

  return (
    <main>
      <header>
        <a href="#inicio" aria-label="AutoLucro IA — início"><Logo /></a>
        <nav ref={menu} aria-label="Navegação">
          <span className="nav-liquid" aria-hidden="true" style={{ left: liquidPill.left, width: liquidPill.width, opacity: liquidPill.visible ? 1 : 0 }} />
          {[["como", "Como funciona"], ["resultados", "Clientes"], ["seguranca", "Segurança"], ["lucas", "Fundador"], ["faq", "Dúvidas"]].map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setActiveSection(id)} className={activeSection === id ? "active" : ""} aria-current={activeSection === id ? "location" : undefined}>{label}</a>)}
        </nav>
      </header>

      <section className="hero" id="inicio">
        <div className="red-orb" />
        <div className="hero-copy">
          <div className="kicker reveal"><span /> IA DE ARBITRAGEM NO TELEGRAM</div>
          <h1 className="reveal">7 operações.<br /><span>Um ciclo até<br />€12.500<sup>*</sup></span></h1>
          <p className="lead reveal">Uma experiência de rendimento passivo: enquanto toma café, a inteligência artificial analisa centenas de pares 24 horas por dia, identifica diferenças de preço e apresenta oportunidades de lucro diretamente no Telegram.</p>
          <div className="hero-actions reveal"><a href="#como" className="ghost-link">Ver como funciona <ChevronDown size={17} /></a></div>
          <div className="quick-facts reveal">
            <div><strong>€65</strong><span>capital inicial<br />de boas-vindas</span></div><ArrowRight className="fact-arrow" />
            <div><strong>7</strong><span>operações num<br />ciclo completo</span></div><ArrowRight className="fact-arrow" />
            <div><strong>€12.500<sup>*</sup></strong><span>levantamento para<br />a sua conta</span></div>
          </div>
        </div>

        <div className="hero-product reveal">
          <div className="lucas-chip"><Image src="/images/lucas-portrait.jpeg" alt="Lucas Vieira" width={72} height={72} /><span><small>CRIADO POR</small><b>Lucas Vieira</b></span><i><Check size={12} /></i></div>
          <div className="phone hero-phone"><div className="island" /><Image src="/images/flow-dashboard.jpeg" alt="Conta pessoal no AutoLucro IA" width={706} height={1536} priority /></div>
          <div className="live-card"><span /><div><small>SISTEMA ATIVO</small><b>Analisando mercados</b></div><Cpu size={18} /></div>
          <div className="mini-result"><small>CICLO</small><strong>1 / 7</strong><div><i /></div></div>
        </div>
        <p className="hero-note">*Valor ilustrativo apresentado no projeto. Resultados não são garantidos e podem variar.</p>
      </section>

      <section className="how" id="como">
        <div className="section-head reveal"><span>COMO FUNCIONA</span><h2>Do crédito inicial<br /><em>ao levantamento.</em></h2></div>
        <div className="how-grid">
          <div className="steps">
            <article className="reveal"><span>01</span><ScanSearch /><div><h3>Começa com €65 no saldo</h3><p>O novo utilizador recebe o capital inicial apresentado pelo projeto e pode iniciar a primeira pesquisa sem fazer um depósito inicial.</p></div></article>
            <article className="reveal"><span>02</span><LineChart /><div><h3>A IA encontra a operação</h3><p>O sistema analisa centenas de pares 24 horas por dia, compara preços entre bolsas e mostra a oportunidade encontrada diretamente no painel.</p></div></article>
            <article className="reveal"><span>03</span><Bot /><div><h3>Conclui o ciclo de 7 operações</h3><p>Cada operação concluída é adicionada ao saldo e aproxima o utilizador do resultado final. Ao mesmo tempo, os dados processados ajudam a treinar e aperfeiçoar a IA.</p></div></article>
            <article className="reveal"><span>04</span><CreditCard /><div><h3>Levanta até €12.500 para a sua conta</h3><p>Quando o ciclo termina, o utilizador escolhe os dados da conta bancária ou da carteira de criptomoedas e solicita a transferência do valor apresentado no saldo, segundo as condições do projeto.</p></div></article>
          </div>
          <div className="flow-visual reveal">
            {[ ["/images/flow-pairs.jpeg", "A IA encontra o par"], ["/images/flow-result.jpeg", "Operação concluída"], ["/images/flow-dashboard.jpeg", "Saldo e ciclo 1/7"] ].map(([src,label],i) => <figure key={src} className={`flow-card flow-${i+1}`}><div className="phone"><div className="island" /><Image src={src} alt={label} width={706} height={1536} /></div><figcaption><b>0{i + 1}</b><span>{label}</span></figcaption></figure>)}
          </div>
        </div>
        <div className="trust-strip reveal"><span><LockKeyhole /> Acesso protegido</span><span><Cpu /> Análise 24 horas</span><span><Check /> 7 operações por ciclo</span><span><LineChart /> Termos e documentação</span></div>
      </section>

      <section className="results" id="resultados">
        <div className="results-top reveal"><div><span>12 EXPERIÊNCIAS PARTILHADAS</span><h2>Pessoas reais<br /><em>contam como foi.</em></h2></div><div className="rail-controls"><button onClick={() => moveReviews(-1)} aria-label="Avaliações anteriores"><ChevronLeft /></button><button onClick={() => moveReviews(1)} aria-label="Próximas avaliações"><ChevronRight /></button></div></div>
        <article className="video-story reveal">
          <div className="video-frame"><video controls playsInline preload="metadata" poster="/images/ines-video-cover.jpeg" aria-label="Depoimento em vídeo de Inês"><source src="/videos/ines-review.mp4" type="video/mp4" /></video></div>
          <div><span>DEPOIMENTO EM VÍDEO · 00:31</span><h3>Inês mostra a sua experiência</h3><p>A Inês juntou-se recentemente ao projeto e partilhou em vídeo os seus primeiros resultados, com €6.356 apresentados.</p><small>Relato individual da cliente. Os resultados variam.</small></div>
        </article>
        <div className="review-rail reveal" ref={rail}>
          {reviews.map(([src,name,caption]) => <article className="review" key={src}><a href={src} target="_blank" className="review-image" aria-label={`Abrir avaliação de ${name}`}><Image src={src} alt={`Avaliação de ${name}`} width={706} height={1536} /></a><div><span>CLIENTE</span><b>{name}</b><p>{caption}</p></div><button type="button" className="review-next" onClick={() => moveReviews(1)} aria-label="Mostrar a próxima avaliação"><ChevronRight size={18} /></button></article>)}
        </div>
        <p className="results-note">Experiências partilhadas por utilizadores. Resultados individuais variam.</p>
      </section>

      <section className="assurance" id="seguranca">
        <div className="assurance-head reveal"><span>SEGURANÇA E TRANSPARÊNCIA</span><h2>Consulte. Verifique.<br /><em>Decida com clareza.</em></h2><p>Antes de participar, confirme sempre quem é a entidade responsável, quais são as condições aplicáveis e que riscos existem.</p></div>
        <div className="assurance-grid">
          <figure className="assurance-document reveal"><Image src="/images/documento-exemplo.jpeg" alt="Exemplo visual de documentação regulatória" width={1080} height={1600} /><figcaption>EXEMPLO VISUAL DE DOCUMENTAÇÃO · NÃO CONSTITUI LICENÇA, CERTIFICAÇÃO OU GARANTIA</figcaption></figure>
          <div className="assurance-copy reveal">
            <article><Check /><div><span>CONDIÇÕES DO CICLO</span><h3>Saiba exatamente em que está a participar</h3><p>Antes de começar, confirme o capital inicial apresentado, o número de operações, os critérios de participação, os custos aplicáveis e todas as regras do ciclo.</p></div></article>
            <article><CreditCard /><div><span>LEVANTAMENTOS</span><h3>Confirme o processo antes de avançar</h3><p>Verifique antecipadamente os métodos de levantamento aceites, eventuais limites, documentação pedida, prazos previstos e como são comunicadas atualizações do pedido.</p></div></article>
            <article><ShieldCheck /><div><span>PROTEÇÃO E SEGURO</span><h3>Peça informação verificável sobre qualquer cobertura</h3><p>Se for mencionada uma proteção, seguro ou fundo de cobertura, confirme por escrito a entidade responsável, o número da apólice, os limites, as exclusões e em que situações ela se aplica.</p></div></article>
            <article><FileCheck2 /><div><span>LICENÇAS E DOCUMENTAÇÃO</span><h3>Valide tudo em fontes independentes</h3><p>Imagens, logótipos e referências não substituem uma verificação. Confirme a entidade, os dados de contacto, os documentos e qualquer registo citado através das fontes oficiais adequadas.</p></div></article>
            <p className="assurance-note"><b>Nota importante:</b> ativos digitais envolvem risco e os resultados podem variar. Nenhum conteúdo desta página representa garantia de rentabilidade, cobertura de perdas ou aconselhamento financeiro.</p>
          </div>
        </div>
      </section>

      <section className="lucas" id="lucas">
        <div className="lucas-photo reveal"><Image src="/images/lucas-portrait.jpeg" alt="Retrato de Lucas Vieira, fundador do AutoLucro IA" width={640} height={640} /><span>LUCAS VIEIRA · FUNDADOR</span></div>
        <div className="lucas-copy reveal"><span>QUEM ESTÁ POR TRÁS</span><h2>De noites sem dormir<br />a um sistema <em>simples.</em></h2><p>Lucas Vieira é o criador e fundador da AutoLucro IA. Construiu o seu caminho sem uma família abastada nem atalhos fáceis, enfrentando dúvidas, contratempos e muitas noites sem dormir. Depois, desenvolveu uma solução que combina inteligência artificial com análise do mercado real.</p><blockquote>O objetivo é proporcionar às pessoas as ferramentas, os conhecimentos e as oportunidades que ele próprio não tinha quando começou.</blockquote><div className="lucas-sign"><Sparkles size={18} /><span><b>AutoLucro IA</b><small>Criado por Lucas Vieira</small></span></div></div>
      </section>

      <section className="faq" id="faq">
        <div className="faq-copy reveal"><span>PERGUNTAS FREQUENTES</span><h2>O essencial.<br /><em>Direto ao ponto.</em></h2><p>As respostas do próprio bot, reunidas num só lugar: funcionamento, automatização, levantamentos e níveis VIP.</p></div>
        <div className="questions reveal">{questions.map(([q,a],i) => <details key={q} open={i===0}><summary><span>0{i+1}</span>{q}<i><ChevronDown size={18} /></i></summary><p>{a}</p></details>)}</div>
      </section>

      <footer><Logo /><p>© 2026 AutoLucro IA</p><small>Ativos digitais envolvem risco. Os conteúdos e valores exibidos têm caráter informativo e ilustrativo e não constituem garantia de rentabilidade.</small></footer>
    </main>
  );
}

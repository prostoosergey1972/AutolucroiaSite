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
  ["Como funciona?", "Obtenha lucro ao ajudar a treinar a nossa IA. Ao utilizar o poder de computação da sua conta para processar dados, o algoritmo identifica as melhores transações. Quanto mais nós (utilizadores) ativos houver, mais preciso será o funcionamento do sistema e maior será o lucro global."],
  ["E quanto às garantias e à fiabilidade?", "A sua segurança é garantida pelo Fundo de Seguros até 50.000,00 €. O sistema está certificado de acordo com as normas MiCA. Todas as transações que efetuar estão protegidas e quaisquer erros algorítmicos, são totalmente cobertos por nós."],
  ["Como posso levantar os meus lucros?", "Os levantamentos podem ser efetuados para cartões bancários ou carteiras de criptomoedas. Os levantamentos são desbloqueados após a conclusão de 7 transações."],
  ["Quanto posso ganhar?", "Os seus ganhos dependem da atividade do mercado. Em média, os nossos utilizadores ganham cerca de 10.000,00 € por dia. Também oferecemos um bónus de boas-vindas de 65,00 € para que possa obter o seu primeiro lucro sem necessidade de investimento inicial."],
  ["O que é o VIP?", "O seu nível VIP reflete o seu grau de atividade como utilizador e o seu sucesso na conclusão de transações. Quanto mais negociar e ganhar, mais elevada será a sua classificação no nosso sistema. A cada novo nível, terá acesso a transações mais lucrativas e exclusivas, aumentará os seus lucros e desfrutará de mais privilégios."],
  ["Este projeto é adequado para principiantes?", "Sem dúvida. A IA encarrega-se de toda a análise complexa dos gráficos. Não é preciso ser um trader – basta acompanhar o processo e ativar os ciclos de transações com um simples toque num botão."],
];

function Logo() {
  return <span className="logo"><i>A</i><b>AutoLucro</b><em>IA</em></span>;
}

export default function Home() {
  const rail = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLElement>(null);
  const menuScrollLock = useRef(false);
  const menuScrollTimer = useRef<number | null>(null);
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
      if (menuScrollLock.current) return;
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
  const goToSection = (id: string) => {
    setActiveSection(id);
    menuScrollLock.current = true;

    if (menuScrollTimer.current) {
      window.clearTimeout(menuScrollTimer.current);
    }

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    menuScrollTimer.current = window.setTimeout(() => {
      menuScrollLock.current = false;
    }, 1400);
  };
  return (
    <main>
      <header>
        <a href="#inicio" aria-label="AutoLucro IA — início"><Logo /></a>
        <nav ref={menu} aria-label="Navegação">
          <span className="nav-liquid" aria-hidden="true" style={{ left: liquidPill.left, width: liquidPill.width, opacity: liquidPill.visible ? 1 : 0 }} />
          {[["como", "Como funciona"], ["resultados", "Clientes"], ["seguranca", "Garantias"], ["lucas", "Fundador"], ["faq", "Dúvidas"]].map(([id, label]) => <a key={id} href={`#${id}`} onClick={(event) => {
            event.preventDefault();
            goToSection(id);
          }} className={activeSection === id ? "active" : ""} aria-current={activeSection === id ? "location" : undefined}>{label}</a>)}
        </nav>
      </header>

      <section className="hero" id="inicio">
        <div className="red-orb" />
        <div className="hero-copy">
          <div className="kicker reveal"><span /> IA DE ARBITRAGEM NO TELEGRAM</div>
          <h1 className="reveal">7 transações.<br /><span>Lucros no piloto<br />automático!</span></h1>
          <p className="lead reveal">Sem investimento • Sem risco • Totalmente automatizado. Enquanto relaxa, a AutoLucro IA analisa o mercado 24 horas por dia para encontrar diferenças de preço lucrativas. A IA realiza as transações e ganha dinheiro para si.</p>
          <div className="hero-actions reveal"><a href="#como" className="ghost-link">Ver como funciona <ChevronDown size={17} /></a></div>
          <div className="quick-facts reveal">
            <div><strong>65,00 €</strong><span>bónus inicial<br />de boas-vindas</span></div><ArrowRight className="fact-arrow" />
            <div><strong>7</strong><span>transações num<br />ciclo completo</span></div><ArrowRight className="fact-arrow" />
            <div><strong>12.600,00 €</strong><span>lucro potencial<br />em 7 transações</span></div>
          </div>
        </div>

        <div className="hero-product reveal">
          <div className="lucas-chip"><Image src="/images/lucas-portrait.jpeg" alt="Lucas Vieira" width={72} height={72} /><span><small>CRIADO POR</small><b>Lucas Vieira</b></span><i><Check size={12} /></i></div>
          <div className="phone hero-phone"><div className="island" /><Image src="/images/flow-dashboard.jpeg" alt="Conta pessoal no AutoLucro IA" width={706} height={1536} priority /></div>
          <div className="live-card"><span /><div><small>SISTEMA ATIVO</small><b>Analisando mercados</b></div><Cpu size={18} /></div>
          <div className="mini-result"><small>CICLO</small><strong>1 / 7</strong><div><i /></div></div>
        </div>
      </section>

      <section className="how" id="como">
        <div className="section-head reveal"><span>COMO FUNCIONA</span><h2>Do bónus inicial<br /><em>ao levantamento.</em></h2></div>
        <div className="how-grid">
          <div className="steps">
            <article className="reveal"><span>01</span><ScanSearch /><div><h3>Comece com 65,00 € no saldo</h3><p>Oferecemos capital inicial de boas-vindas a cada novo utilizador. Pode iniciar a sua primeira sessão de transações sem precisar de depositar nada.</p></div></article>
            <article className="reveal"><span>02</span><LineChart /><div><h3>A IA encontra a transação</h3><p>O nosso algoritmo analisa centenas de pares a cada segundo, calculando as pequenas diferenças de preço nas bolsas globais em tempo real.</p></div></article>
            <article className="reveal"><span>03</span><Bot /><div><h3>Conclua 7 transações</h3><p>O sistema torna-se mais preciso ao aprender com cada transação. Após a conclusão de apenas 7 transações, os seus fundos ficam disponíveis.</p></div></article>
            <article className="reveal"><span>04</span><CreditCard /><div><h3>Levante os seus lucros</h3><p>Introduza os seus dados bancários ou da carteira de criptomoedas e receba o seu dinheiro. Os levantamentos ficam disponíveis assim que o limite mínimo for atingido.</p></div></article>
          </div>
          <div className="flow-visual reveal">
            {[["/images/flow-pairs.jpeg", "A IA encontra o par"], ["/images/flow-result.jpeg", "Operação concluída"], ["/images/flow-dashboard.jpeg", "Saldo e ciclo 1/7"]].map(([src, label], i) => <figure key={src} className={`flow-card flow-${i + 1}`}><div className="phone"><div className="island" /><Image src={src} alt={label} width={706} height={1536} /></div><figcaption><b>0{i + 1}</b><span>{label}</span></figcaption></figure>)}
          </div>
        </div>
        <div className="trust-strip reveal"><span><LockKeyhole /> Acesso protegido</span><span><Cpu /> Análise 24 horas</span><span><Check /> 7 transações por ciclo</span><span><LineChart /> Regulação MiCA</span></div>
      </section>

      <section className="results" id="resultados">
        <div className="results-top reveal"><div><span>HISTÓRIAS DE SUCESSO</span><h2>Pessoas reais<br /><em>confiam em nós.</em></h2></div><div className="rail-controls"><button onClick={() => moveReviews(-1)} aria-label="Avaliações anteriores"><ChevronLeft /></button><button onClick={() => moveReviews(1)} aria-label="Próximas avaliações"><ChevronRight /></button></div></div>
        <article className="video-story reveal">
          <div className="video-frame"><video controls playsInline preload="metadata" poster="/images/ines-video-cover.jpeg" aria-label="Depoimento em vídeo de Inês"><source src="/videos/ines-review.mp4" type="video/mp4" /></video></div>
          <div><span>DEPOIMENTO EM VÍDEO · 00:31</span><h3>Inês mostra a sua experiência</h3><p>A Inês juntou-se recentemente ao projeto e partilhou em vídeo os seus primeiros resultados, com €6.356 gerados na plataforma.</p></div>
        </article>
        <div className="review-rail reveal" ref={rail}>
          {reviews.map(([src, name, caption]) => <article className="review" key={src}><a href={src} target="_blank" className="review-image" aria-label={`Abrir avaliação de ${name}`}><Image src={src} alt={`Avaliação de ${name}`} width={706} height={1536} /></a><div><span>CLIENTE</span><b>{name}</b><p>{caption}</p></div><button type="button" className="review-next" onClick={() => moveReviews(1)} aria-label="Mostrar a próxima avaliação"><ChevronRight size={18} /></button></article>)}
        </div>
      </section>

      <section className="assurance" id="seguranca">
        <div className="assurance-head reveal"><span>GARANTIAS E FIABILIDADE</span><h2>Proteção total para<br /><em>os seus ativos.</em></h2><p>A AutoLucro IA opera de forma legal e transparente, garantindo total segurança apoiada pelas licenças MiCA.</p></div>
        <div className="assurance-grid">
          <figure className="assurance-document reveal"><Image src="/images/documento-exemplo.jpeg" alt="Licença MiCA" width={1080} height={1600} /><figcaption>LICENÇA DE PRESTADOR DE SERVIÇOS DE CRIPTOATIVOS (MiCA)</figcaption></figure>
          <div className="assurance-copy reveal">
            <article><ShieldCheck /><div><span>FUNDO DE SEGUROS</span><h3>Proteção até 50.000,00 €</h3><p>Cada sessão de transações está segurada no valor de 50.000,00 €. Todas as transações que efetuar estão protegidas e quaisquer erros algorítmicos são totalmente cobertos por nós.</p></div></article>
            <article><FileCheck2 /><div><span>REGULAÇÃO OFICIAL</span><h3>Licenças MiCA</h3><p>O algoritmo funciona em total conformidade com os requisitos regulamentares. Esta licença autoriza transações oficiais e o processamento de operações e lucros em criptomoedas.</p></div></article>
            <article><Check /><div><span>SEM RISCO INICIAL</span><h3>Bónus de 65,00 €</h3><p>Oferecemos 65,00 € de capital inicial a cada novo utilizador, para que possa comprovar por si mesmo a fiabilidade do sistema sem correr qualquer risco.</p></div></article>
            <article><CreditCard /><div><span>LEVANTAMENTOS</span><h3>Acesso aos seus fundos</h3><p>Os levantamentos são desbloqueados após a conclusão de 7 transações. Basta introduzir os seus dados bancários ou da carteira de criptomoedas para efetuar a transferência.</p></div></article>
          </div>
        </div>
      </section>

      <section className="lucas" id="lucas">
        <div className="lucas-photo reveal"><Image src="/images/lucas-portrait.jpeg" alt="Retrato de Lucas Vieira, fundador do AutoLucro IA" width={640} height={640} /><span>LUCAS VIEIRA · FUNDADOR</span></div>
        <div className="lucas-copy reveal"><span>QUEM É O LUCAS?</span><h2>Criador e fundador da<br /><em>AutoLucro IA.</em></h2><p>Um homem que fez fortuna por conta própria: começou sem uma família abastada nem atalhos fáceis, apesar de ter enfrentado dúvidas, contratempos e muitas noites sem dormir. Desenvolveu esta solução tecnológica que combina as capacidades da inteligência artificial com a análise do mercado real.</p><blockquote>O seu objetivo é simples: proporcionar às pessoas as ferramentas, os conhecimentos e as oportunidades de que ele próprio não dispunha quando iniciou a sua jornada.</blockquote><div className="lucas-sign"><Sparkles size={18} /><span><b>AutoLucro IA</b><small>Criado por Lucas Vieira</small></span></div></div>
      </section>

      <section className="faq" id="faq">
        <div className="faq-copy reveal"><span>PERGUNTAS FREQUENTES</span><h2>O essencial.<br /><em>Direto ao ponto.</em></h2><p>As respostas mais importantes sobre o funcionamento, garantias e levantamentos do sistema.</p></div>
        <div className="questions reveal">{questions.map(([q, a], i) => <details key={q}><summary><span>0{i + 1}</span>{q}<i><ChevronDown size={18} /></i></summary><p>{a}</p></details>)}</div>
      </section>

      <footer><Logo /><p>© 2026 AutoLucro IA</p></footer>
    </main>
  );
}

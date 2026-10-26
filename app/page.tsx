"use client";

import Image from "next/image";
import { useEffect, useState, useRef, type ReactNode } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  MessageCircle,
  MapPin,
  Menu,
  HeartHandshake,
  Scale,
  ShieldCheck,
  Camera,
  Star,
  X,
} from "lucide-react";
import PrimaryButton from "./components/PrimaryButton";
import { brand, contact, whatsapp, telephone, whatsappFor, maps, reviews } from "./lib/brand";
import { googleReviews } from "./lib/reviews";

function WhatsAppMark({size = 16, strokeWidth = 1.8}: {size?: number; strokeWidth?: number}) { return <MessageCircle size={size} strokeWidth={strokeWidth} aria-hidden="true" />; }

const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.04 } },
};

const areas = [
  {
    title: "Aposentadorias", icon: Scale,
    summary: "Seu histórico de trabalho merece uma análise cuidadosa para compreender os caminhos da aposentadoria.",
    details: "O atendimento considera sua trajetória profissional e os documentos disponíveis para orientar os próximos passos de uma demanda de aposentadoria. Cada situação é analisada individualmente, com explicações claras sobre as possibilidades.",
    topics: ["Análise do histórico contributivo", "Orientação sobre documentos", "Avaliação da demanda de aposentadoria", "Acompanhamento conforme o serviço contratado"],
  },
  {
    title: "BPC/LOAS", icon: HeartHandshake,
    summary: "Escuta e orientação para pessoas idosas, pessoas com deficiência e suas famílias.",
    details: "O atendimento sobre o Benefício de Prestação Continuada começa pela compreensão da realidade da pessoa e de sua família. A Dra. Fabiana analisa os documentos apresentados e esclarece as possibilidades e as providências relacionadas à demanda.",
    topics: ["Escuta da pessoa e de sua família", "Análise da documentação apresentada", "Orientação sobre a demanda de BPC/LOAS", "Acompanhamento conforme o serviço contratado"],
  },
  {
    title: "Benefícios por incapacidade", icon: ShieldCheck,
    summary: "Orientação para quem precisa compreender seus direitos diante de uma incapacidade temporária ou permanente.",
    details: "Uma situação de incapacidade pede atenção ao histórico profissional e à documentação médica. O atendimento busca esclarecer a demanda e os caminhos possíveis para benefícios por incapacidade temporária ou permanente, conforme as particularidades do caso.",
    topics: ["Compreensão do histórico de trabalho", "Análise dos documentos médicos disponíveis", "Orientação sobre a demanda previdenciária", "Definição das providências adequadas ao caso"],
  },
  {
    title: "Pensão por morte", icon: HeartHandshake,
    summary: "Acolhimento e informação para a família em um momento que pede atenção e cuidado.",
    details: "Questões relacionadas à pensão por morte são tratadas com sensibilidade e atenção à história familiar. O atendimento considera os documentos e as particularidades da situação para explicar os caminhos possíveis e as providências adequadas ao caso.",
    topics: ["Compreensão da situação familiar", "Análise dos documentos disponíveis", "Esclarecimento sobre a demanda de pensão", "Orientação sobre os próximos passos"],
  },
];

function Heading({
  children,
  description,
  light = false,
}: {
  children: ReactNode;
  description?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-2xl">

      <h2
        className={
          light
            ? "section-heading font-display text-[2rem] leading-[1.18] tracking-[-0.025em] text-white sm:text-[2.5rem] lg:text-[3rem]"
            : "section-heading font-display text-[2rem] leading-[1.18] tracking-[-0.025em] text-ink sm:text-[2.5rem] lg:text-[3rem]"
        }
      >
        {children}
      </h2>
      {description && (
        <p
          className={
            light
              ? "section-description mt-5 max-w-xl text-[15px] leading-7 text-brand-100"
              : "section-description mt-5 max-w-xl text-[15px] leading-7 text-ink-soft"
          }
        >
          {description}
        </p>
      )}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeArea, setActiveArea] =
    useState<(typeof areas)[number] | null>(null);

  const dialogRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  useEffect(() => {
    if (!activeArea) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const content = contentRef.current;
    content?.setAttribute("inert", "");
    const timer = window.setTimeout(() => dialogRef.current?.querySelector<HTMLButtonElement>("button")?.focus(), 0);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveArea(null);
      if (event.key !== "Tab") return;
      const controls = dialogRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (!controls?.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = previousOverflow;
      content?.removeAttribute("inert");
      previousFocus?.focus();
    };
  }, [activeArea]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <MotionConfig reducedMotion="user">
      <main className="bg-mist text-ink">
        <div ref={contentRef}>
        <a href="#inicio" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-2xl focus:bg-white focus:p-4 focus:text-ink">Ir para o conteúdo</a>
        <header className="brand-header sticky top-0 z-40 border-b border-white/15 bg-brand-950 text-white">
          <div className="mx-auto flex h-[88px] max-w-7xl items-center justify-between gap-5 px-5 sm:h-[96px] sm:px-8 lg:px-12">
            <a
              href="#inicio"
              aria-label={`${brand.businessName} — início`}
              onClick={closeMenu}
              className="shrink-0"
            >
              <Image
                src={brand.logo}
                width={2172}
                height={724}
                alt={brand.businessName}
                preload
                className="h-auto w-[210px] min-[360px]:w-[235px] sm:w-[280px]"
                sizes="(max-width: 359px) 210px, (max-width: 640px) 235px, 280px"
              />
            </a>
            <nav
              aria-label="Navegação principal"
              className="hidden items-center gap-7 lg:flex"
            >
              <a className="nav-link" href="#inicio">
                Início
              </a>
              <a className="nav-link" href="#atuacao">
                Atendimento
              </a>
              <a className="nav-link" href="#sobre">
                Sobre
              </a>
              <a className="nav-link" href="#avaliacoes">
                Avaliações
              </a>
              <a className="nav-link" href="#contato">
                Contato
              </a>
            </nav>
            <div className="hidden items-center gap-3 lg:flex">
              <a
                href={contact}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp da Dra. Fabiana Mota"
                className="grid size-11 place-items-center rounded-full border border-silver/40 text-silver transition-colors hover:bg-brand-900"
              >
                <WhatsAppMark size={17} strokeWidth={1.7} />
              </a>
              <PrimaryButton
                href={whatsapp}
                target="_blank"
                size="sm"
              >
                WhatsApp <ArrowUpRight size={14} />
              </PrimaryButton>
            </div>
            <button
              type="button"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="grid size-11 shrink-0 place-items-center rounded-full border border-silver/40 text-silver transition-colors lg:hidden"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
          <AnimatePresence>
            {menuOpen && (
              <motion.nav
                id="mobile-navigation"
                aria-label="Navegação móvel"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22 }}
                className="absolute inset-x-0 top-full overflow-hidden border-b border-ink/10 bg-mist px-6 lg:hidden"
              >
                <div className="mx-auto flex max-h-[calc(100dvh-88px)] max-w-7xl flex-col gap-1 overflow-y-auto py-4 sm:max-h-[calc(100dvh-96px)]">
                  {[
                    ["Início", "#inicio"],
                    ["Atendimento", "#atuacao"],
                    ["Sobre", "#sobre"],
                    ["Avaliações no Google", "#avaliacoes"],
                    ["Contato", "#contato"],
                  ].map(([label, href]) => (
                    <a
                      key={label}
                      href={href}
                      onClick={closeMenu}
                      className="py-3 text-sm text-ink-soft transition-colors hover:text-brand-700"
                    >
                      {label}
                    </a>
                  ))}
                  <a
                    className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-silver px-5 py-3.5 text-sm font-semibold text-brand-950"
                    href={whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    onClick={closeMenu}
                  >
                    <Phone size={15} /> WhatsApp
                  </a>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </header>

        <section
          id="inicio"
          className="brand-hero relative isolate overflow-hidden scroll-mt-28 border-b border-ink/10"
        >
          <div className="mx-auto grid min-h-[600px] max-w-7xl items-center gap-12 px-5 py-12 sm:px-8 sm:py-16 lg:min-h-[700px] lg:grid-cols-[1.12fr_0.88fr] lg:gap-14 lg:px-12 lg:py-12">
            <motion.div
              initial={false}
              animate="visible"
              variants={stagger}
              className="relative z-10 max-w-2xl lg:py-6"
            >
              <motion.h1
                variants={reveal}
                className="hero-title max-w-[720px] font-display text-[2.25rem] leading-[1.18] tracking-[-0.025em] text-ink sm:text-[3rem] lg:text-[3.5rem]"
              >
                Seu direito começa
                <span className="hero-title-emphasis block">com informação.</span>
              </motion.h1>
              <motion.p
                variants={reveal}
                className="hero-copy mt-7 max-w-xl text-[15px] leading-7 text-ink-soft sm:text-base sm:leading-8"
              >
                Aposentadoria, benefícios e pensão. Com a Dra. Fabiana Mota, você encontra orientação previdenciária com clareza e atenção à sua história, em Araxá, MG.
              </motion.p>
              <motion.div
                variants={reveal}
                className="hero-actions mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
              >
                <PrimaryButton
                  href={whatsapp}
                  target="_blank"
                  size="lg"
                >
                  <WhatsAppMark size={17} /> Fale com a Dra. Fabiana
                </PrimaryButton>
                <a
                  href="#atuacao"
                  className="hero-secondary-link group inline-flex items-center gap-2 px-1 py-3 text-sm font-medium text-ink transition-colors hover:text-brand-700"
                >
                  Áreas de atuação{" "}
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>
              </motion.div>
              <motion.div
                variants={reveal}
                className="hero-meta mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-ink/10 pt-5 text-xs text-ink-soft"
              >
                <span className="inline-flex items-center gap-2">
                  <MapPin size={15} className="text-brand-700" />
                  {brand.location}
                </span>
                <span className="inline-flex items-center gap-2">
                  <MessageCircle size={15} className="text-brand-700" />
                  Direito Previdenciário
                </span>
                <a href="#avaliacoes" className="inline-flex min-h-11 items-center gap-2 py-2 text-sm text-brand-700 underline underline-offset-4">
                  <ArrowUpRight size={15} aria-hidden="true" /> Conheça as avaliações
                </a>
              </motion.div>
            </motion.div>
            <motion.div initial={false} animate={{ opacity: 1 }} className="hero-portrait relative mx-auto w-full max-w-[340px] lg:ml-auto lg:mr-6 lg:max-w-[390px]">
              <figure className="hero-signature">
                <div className="hero-portrait-frame">
                  <Image src={brand.portrait} alt="Dra. Fabiana Mota em seu escritório" width={1170} height={2080} preload sizes="(max-width: 350px) 88vw, (max-width: 1024px) 340px, 390px" className="h-auto w-full" />
                </div>
                <figcaption className="hero-caption mt-5 flex flex-col gap-2 border-t border-silver/40 pt-5 text-left leading-6 text-brand-100">
                  <span className="font-display text-2xl text-silver">Dra. Fabiana Mota</span>
                  <span className="text-xs leading-6">Advogada Previdenciária · Araxá, MG</span>
                </figcaption>
              </figure>
            </motion.div>
          </div>
        </section>

        <section
          aria-label="Informações de atendimento"
          className="brand-assurance border-b border-white/15 bg-brand-900"
        >
          <div className="mx-auto grid max-w-7xl gap-6 px-5 py-7 sm:grid-cols-3 sm:gap-4 sm:px-8 lg:px-12">
            {[
              ["Escuta", "Sua história como ponto de partida"],
              ["Proximidade", "Diálogo com a sua advogada"],
              ["Cuidado", "Sigilo e atenção em cada etapa"],
            ].map(([value, label], index) => (
              <div
                key={value}
                className={
                  index > 0
                    ? "flex items-center gap-4 sm:justify-center sm:border-l sm:border-ink/10"
                    : "flex items-center gap-4 sm:justify-center"
                }
              >
                <span className="font-display text-2xl text-brand-700 sm:text-[1.7rem]">
                  {value}
                </span>
                <span className="max-w-[145px] text-xs leading-5 text-ink-soft">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section
          id="atuacao"
          className="scroll-mt-24 bg-mist py-20 sm:py-28 lg:py-32"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <motion.div
              initial={false}
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={reveal}
              className="flex flex-col justify-between gap-6 md:flex-row md:items-end"
            >
              <Heading

                description="Da primeira conversa à análise do seu caso, um atendimento pautado pela escuta, pelo sigilo e pela clareza."
              >
                Direito com estratégia.{" "}
                <span className="text-brand-700">Atuação com cuidado.</span>
              </Heading>
              <p className="max-w-[250px] pb-1 text-xs leading-6 text-ink-soft">
                Aposentadorias, BPC/LOAS, benefícios por incapacidade e pensão. Conheça as frentes de atendimento.
              </p>
            </motion.div>
            <motion.div
              initial={false}
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              variants={stagger}
              className="service-list mt-12 divide-y divide-ink/15 border-y border-ink/15"
            >
              {areas.map((area) => {
                const Icon = area.icon;
                return (
                  <motion.article
                    key={area.title}
                    variants={reveal}
                    className="service-row group grid items-start gap-5 py-8 sm:grid-cols-[48px_1fr_auto] sm:gap-7 sm:py-9"
                  >
                    <div className="flex items-start justify-between">
                      <span className="service-icon grid size-12 place-items-center rounded-full border border-ink/20 text-ink">
                        <Icon size={21} strokeWidth={1.5} />
                      </span>
                    </div>
                    <div>
                    <h3 className="max-w-xl font-display text-[1.55rem] sm:text-[1.8rem] leading-tight text-ink">
                      {area.title}
                    </h3>
                    <p className="service-copy mt-3 max-w-xl text-[13px] leading-6 text-ink-soft">
                      {area.summary}
                    </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveArea(area)}
                      aria-haspopup="dialog"
                      aria-label={`Saiba mais sobre ${area.title.toLowerCase()}`}
                      className="service-action group/link inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold text-brand-800 hover:text-brand-700 sm:self-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700"
                    >
                      Saiba mais{" "}
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover/link:translate-x-1"
                      />
                    </button>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </section>

        <section id="sobre" className="brand-about scroll-mt-28 bg-brand-950 py-20 sm:py-28 lg:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24 lg:px-12">
            <figure className="mx-auto flex w-full max-w-[460px] flex-col justify-center border-y border-silver/30 py-12 sm:py-16 lg:mx-0">
              <Image src={brand.logo} alt={brand.businessName} width={2172} height={724} sizes="(max-width: 640px) 90vw, 460px" className="h-auto w-full" />
              <figcaption className="mt-8 text-center text-sm leading-7 text-brand-100">Escuta, clareza e compromisso com seus direitos.</figcaption>
              <Image src={brand.institutionalPhoto} alt="Identidade institucional da Dra. Fabiana Mota, advogada previdenciária: seu direito começa com informação" width={680} height={192} sizes="(max-width: 640px) 90vw, 460px" className="mt-10 h-auto w-full" />
            </figure>
            <div>
              <Heading>Uma história de trabalho merece{" "}<span className="text-brand-700">ser ouvida.</span></Heading>
              <p className="about-copy mt-6 max-w-xl text-[15px] leading-7 text-ink-soft">A Dra. Fabiana Mota é advogada especialista em Direito Previdenciário, em Araxá, Minas Gerais. Sua atuação é voltada à orientação de pessoas e famílias em questões de aposentadoria, benefícios e pensão.</p>
              <p className="about-copy mt-4 max-w-xl text-[15px] leading-7 text-ink-soft">Cada trajetória tem suas particularidades. Por isso, o atendimento começa pela escuta e pela análise dos documentos, com explicações acessíveis para que você compreenda as possibilidades e os próximos passos.</p>
              <div className="mt-7 flex flex-col items-start gap-2 border-t border-silver/30 pt-5">
                <a href={brand.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-3 text-sm text-silver underline-offset-4 hover:underline">Conheça a Dra. Fabiana no Instagram<ArrowUpRight size={15} aria-hidden="true" /></a>
              </div>
              <a href={contact} target="_blank" rel="noopener noreferrer" className="about-link group mt-6 inline-flex min-h-11 items-center gap-2 border-b border-brand-700/40 py-2 text-sm font-semibold text-brand-800 transition-colors hover:text-brand-700">Converse com a Dra. Fabiana <ArrowUpRight size={16} /></a>
            </div>
          </div>
        </section>

        <section className="journey-section relative overflow-hidden border-t border-white/10 bg-brand-900 py-20 text-white sm:py-28 lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.86fr_1.14fr] lg:gap-20 lg:px-12">
            <Heading

              light
              description="Decisões sobre seus direitos merecem informação e cuidado. Do primeiro contato ao acompanhamento, entenda como funciona o atendimento."
            >
              Clareza para compreender cada{" "}
              <span className="text-brand-200">etapa.</span>
            </Heading>
            <motion.div
              initial={false}
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
              className="divide-y divide-white/15"
            >
              {[
                [
                  "Primeiro, a sua história",
                  "Conte sua situação pelo WhatsApp e receba informações para agendar um atendimento com a Dra. Fabiana em Araxá.",
                ],
                [
                  "Depois, os documentos",
                  "Seu histórico e os documentos apresentados são analisados com atenção às particularidades da sua demanda.",
                ],
                [
                  "Um caminho compreensível",
                  "Você recebe explicações sobre as alternativas, os próximos passos e o acompanhamento da sua demanda, com atenção e sigilo.",
                ],
              ].map(([title, description]) => (
                <motion.div
                  key={title}
                  variants={reveal}
                  className="py-6 first:pt-0 sm:py-7"
                >
                  <div>
                    <h3 className="journey-title font-display text-2xl">{title}</h3>
                    <p className="journey-copy mt-2 max-w-lg text-[13px] leading-6 text-brand-100">
                      {description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="faq-section bg-fog py-20 sm:py-24" aria-labelledby="questions-title">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-12">
            <h2 id="questions-title" className="section-heading font-display text-3xl leading-tight text-ink sm:text-4xl">Antes da nossa primeira conversa.</h2>
            <div className="divide-y divide-ink/15 border-y border-ink/15">
              {[
                ["Como funciona o primeiro contato?", `Envie uma mensagem pelo WhatsApp ou ligue para ${brand.phone}. Conte brevemente sua situação para receber informações sobre o atendimento e os documentos iniciais necessários.`],
                ["Onde fica o escritório?", `O escritório fica na ${brand.address}. Entre em contato para combinar sua visita.`],
                ["Como agendar uma consulta?", "Fale com a Dra. Fabiana pelo WhatsApp ou por telefone. Você receberá informações sobre a disponibilidade, a modalidade do atendimento e os documentos iniciais para sua demanda."],
                ["Quais documentos devo separar?", "Os documentos variam conforme a situação. Documentos pessoais e registros relacionados à sua demanda podem ajudar na análise. No agendamento, você receberá orientação sobre o que apresentar para o seu caso."],
              ].map(([question, answer]) => (
                <details key={question} className="group py-6">
                  <summary className="faq-question min-h-11 cursor-pointer text-base font-semibold text-ink marker:text-brand-700">{question}</summary>
                  <p className="faq-answer mt-4 max-w-xl text-sm leading-7 text-ink-soft">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="avaliacoes" className="reviews-section scroll-mt-24 bg-paper py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.8fr] lg:gap-24">
            <Heading description="Atenção, clareza e acolhimento nos relatos de quem conhece o escritório. Leia algumas experiências compartilhadas por clientes no Google.">
              Confiança construída <span className="text-brand-700">no atendimento.</span>
            </Heading>
            <div className="google-rating border-y border-ink/15 py-8">
              <h3 className="font-display text-2xl text-ink">Dra. Fabiana Mota no Google</h3>
              <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm leading-7 text-ink">
                <span className="inline-flex items-center gap-2 font-semibold"><Star size={17} fill="currentColor" className="text-brand-700" aria-hidden="true" />{brand.googleRating.toFixed(1).replace(".", ",")} de 5</span>
                <span className="text-ink-soft">{brand.googleReviewCount} avaliações no Google</span>
              </p>
              <a href={reviews} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-brand-700 underline underline-offset-4 hover:text-ink">Ver todas as avaliações <ArrowUpRight size={17} aria-hidden="true" /></a>
            </div>
            </div>
            <div className="mt-12 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
              {googleReviews.map((review) => (
                <figure key={review.author} className="review-card flex min-w-0 flex-col gap-6 py-8 sm:py-9">
                  <blockquote className="review-copy flex-1 text-base leading-8 text-ink">
                    <p>“{review.excerpt}”</p>
                  </blockquote>
                  <figcaption className="review-author text-sm font-semibold leading-6 text-brand-700">{review.author}</figcaption>
                </figure>
              ))}
            </div>
            <p className="review-note border-t border-ink/15 pt-5 text-xs leading-6 text-ink-soft">Trechos selecionados de avaliações no Google. Nota e quantidade registradas em {brand.googleReviewsProvidedOn}. Consulte os relatos completos e os dados atuais no perfil.</p>
          </div>
        </section>

        <section
          id="contato"
          className="contact-section scroll-mt-24 bg-mist py-20 sm:py-28 lg:py-32"
        >
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-12">
            <div>
              <Heading

                description="Precisa de orientação sobre aposentadoria, BPC/LOAS, incapacidade ou pensão? Converse com a Dra. Fabiana sobre o atendimento."
              >
                Um primeiro contato com{" "}
                <span className="text-brand-700">tranquilidade.</span>
              </Heading>
              <div className="mt-9 flex flex-col items-start gap-4">
                <PrimaryButton
                  href={whatsapp}
                  target="_blank"
                  size="lg"
                >
                  <WhatsAppMark size={17} /> Fale com a Dra. Fabiana
                </PrimaryButton>
                <a href={telephone} className="inline-flex min-h-11 items-center gap-2 text-sm text-brand-700 hover:text-brand-800"><Phone size={16} /> Ligue: {brand.phone}</a>
                <a href={brand.instagram} target="_blank" rel="noopener noreferrer" className="contact-handle inline-flex min-h-11 max-w-full items-center gap-2 py-2 text-sm text-brand-700 hover:text-brand-800"><Camera size={16} /> {brand.instagramHandle}</a>
              </div>
            </div>
            <div className="contact-card relative overflow-hidden border border-ink/10 bg-white p-7 sm:p-10">
              <div className="absolute right-0 top-0 h-1 w-28 bg-brand-600" />
              <div className="flex items-center gap-4">
                <span className="contact-icon grid size-12 place-items-center rounded-2xl bg-brand-50 text-brand-700">
                  <MapPin size={21} strokeWidth={1.6} />
                </span>
                <div>
                  <h3 className="font-display text-2xl text-ink">Encontre o escritório em Araxá</h3>
                </div>
              </div>
              <p className="mt-6 text-sm font-semibold text-brand-700">{brand.businessName}</p>
              <address className="mt-2 max-w-md not-italic text-[14px] leading-7 text-ink-soft">
                {brand.address}
              </address>
              <div className="my-7 h-px bg-ink/10" />
              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-ink-soft">
                  Entre em contato para agendar sua visita.
                </p>
                <a
                  href={maps}
                  target="_blank"
                  rel="noreferrer"
                  className="map-link inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/15 px-5 py-3 text-xs font-semibold uppercase tracking-[0.13em] text-ink transition-colors hover:border-brand-700 hover:text-brand-700"
                >
                  Ver no Google Maps <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="closing-cta-section border-b border-white/15 bg-brand-950 px-5 py-14 text-white sm:px-8 sm:py-16 lg:px-12">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 sm:flex-row sm:items-center">
            <div>
              <h2 className="closing-title mt-3 max-w-2xl font-display text-3xl leading-tight sm:text-4xl">
                O primeiro passo é conversar.
              </h2>
            </div>
            <a
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
              className="closing-cta group inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-semibold uppercase tracking-[0.08em] text-brand-800 transition-transform hover:-translate-y-0.5"
            >
              Fale pelo WhatsApp <ArrowUpRight size={15} />
            </a>
          </div>
        </section>

        <footer className="brand-footer bg-brand-950 px-5 py-12 text-brand-100 sm:px-8 lg:px-12">
          <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.1fr_0.9fr_1fr]">
            <div>
              <div className="inline-flex py-1">
                <Image
                  src={brand.logo}
                  width={2172}
                  height={724}
                  alt={brand.businessName}
                  className="h-auto w-[240px]"
                  sizes="240px"
                />
              </div>
              <p className="mt-4 max-w-xs text-xs leading-6 text-ink-soft">
                Advocacia Previdenciária. Informação, escuta e atenção aos seus direitos, em Araxá, MG.
              </p>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
                Navegação
              </h2>
              <div className="mt-4 flex flex-col items-start gap-3 text-xs text-ink-soft">
                <a className="footer-link" href="#atuacao">
                  Áreas de atuação
                </a>
                <a className="footer-link" href="#sobre">
                  Sobre a Dra. Fabiana
                </a>
                <a className="footer-link" href="#avaliacoes">
                  Perfil no Google
                </a>
                <a className="footer-link" href="#contato">
                  Contato e endereço
                </a>
              </div>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
                Informações
              </h2>
              <div className="mt-4 flex flex-col items-start gap-3 text-xs text-ink-soft">
                <a
                  href={telephone}
                  className="footer-link inline-flex items-center gap-2"
                >
                  <Phone size={14} /> {brand.phone}
                </a>
                <a
                  href={maps}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-link inline-flex items-start gap-2"
                >
                  <MapPin size={14} className="mt-0.5 shrink-0" />
                  {brand.address}
                </a>
                <a href={brand.instagram} target="_blank" rel="noopener noreferrer" className="contact-handle footer-link inline-flex max-w-full items-center gap-2"><Camera size={14} /> {brand.instagramHandle}</a>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-ink/15 pt-5 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {brand.businessName}. Todos os direitos
              reservados.
            </p>
            <p>
              Conteúdo informativo. Cada situação deve ser analisada
              individualmente.
            </p>
          </div>
        </footer>

        <a
          href={whatsapp}
          target="_blank"
          rel="noreferrer"
          aria-label="Converse com a Dra. Fabiana pelo WhatsApp"
          className="floating-whatsapp"
        >
          <WhatsAppMark size={25} strokeWidth={1.8} />
          <span className="floating-whatsapp-label" aria-hidden="true">Fale pelo WhatsApp</span>
        </a>
        </div>
        <AnimatePresence>
          {activeArea && (
            <motion.div
              className="fixed inset-0 z-50 flex items-end justify-center bg-ink/55 p-0 backdrop-blur-sm sm:items-center sm:p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveArea(null)}
            >
              <motion.section
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="area-dialog-title"
                aria-describedby="area-dialog-description"
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.99 }}
                transition={{ duration: 0.24 }}
                onClick={(event) => event.stopPropagation()}
                className="service-dialog relative max-h-[90dvh] w-full overflow-y-auto rounded-2xl bg-paper p-7 shadow-card sm:max-w-xl sm:p-10"
              >
                <button
                  type="button"
                  aria-label="Fechar detalhes do atendimento"
                  onClick={() => setActiveArea(null)}
                  className="service-dialog-close absolute right-5 top-5 grid size-11 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:text-brand-700"
                >
                  <X size={18} />
                </button>

                <h2
                  id="area-dialog-title"
                  className="mt-4 max-w-sm pr-10 font-display text-[1.7rem] leading-tight text-ink sm:text-3xl"
                >
                  {activeArea.title}
                </h2>
                <p id="area-dialog-description" className="mt-5 text-sm leading-7 text-ink-soft">
                  {activeArea.details}
                </p>
                <ul className="mt-6 space-y-3">
                  {activeArea.topics.map((topic) => (
                    <li
                      key={topic}
                      className="flex items-start gap-3 text-sm leading-6 text-ink"
                    >
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-700" />
                      {topic}
                    </li>
                  ))}
                </ul>
                <PrimaryButton
                  href={whatsappFor(activeArea.title.toLowerCase())}
                  target="_blank"
                  size="md"
                  className="mt-8 w-full sm:w-auto"
                >
                  <Phone size={15} /> Conversar sobre este atendimento
                  <ArrowUpRight size={15} />
                </PrimaryButton>
              </motion.section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </MotionConfig>
  );
}

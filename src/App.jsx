import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Check, ChevronDown, ExternalLink, Mail, MapPin, Menu, MessageCircle, Phone, Send, Star, X } from "lucide-react";
import { siteCopy } from "./content/siteCopy";
import { getFlowInteractionProps } from "./utils/flowInteractions";
import CountUp from "./components/CountUp";

const locales = ["es", "en"];
const flowCardProps = getFlowInteractionProps({ tilt: 3 });
const flowButtonProps = getFlowInteractionProps();

const getProjectDomain = (href) => {
  try { return new URL(href).hostname.replace(/^www\./, ""); } catch { return href; }
};

const getInitialLocale = () => {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem("digital-am-locale");
  if (stored && locales.includes(stored)) return stored;
  // Default English — primary language for the site
  return "en";
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0, margin: "0px 0px -60px 0px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export default function App() {
  const [locale, setLocale] = useState(getInitialLocale);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitState, setSubmitState] = useState("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [previewLoaded, setPreviewLoaded] = useState({});
  const currentYear = new Date().getFullYear();
  const copy = siteCopy[locale];
  const location = useLocation();

  useEffect(() => {
    window.localStorage.setItem("digital-am-locale", locale);
    document.documentElement.lang = locale;
    document.title = copy.meta.title;
    // Meta description for SEO
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", locale === "es"
        ? "Full-Stack AI Engineer en Louisville KY. Sitios web profesionales, automatización con IA (Claude/Gemini), SaaS multi-tenant, lead capture. 10+ apps en producción. Bilingual ES/EN."
        : "Full-Stack AI Engineer in Louisville KY. Custom websites, AI automation (Claude/Gemini), multi-tenant SaaS, lead capture. 10+ production apps shipped. Bilingual ES/EN service.");
    }
  }, [copy.meta.title, locale]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setSubmitState("error");
      setSubmitMessage(copy.contact.messages.incomplete);
      return;
    }
    try {
      setSubmitState("submitting");
      const payload = new FormData();
      payload.append("name", form.name);
      payload.append("email", form.email);
      payload.append("message", form.message);
      payload.append("_replyto", form.email);
      payload.append("_subject", "New contact from Digital AM");
      payload.append("_template", "table");
      const res = await fetch("https://formsubmit.co/ajax/ferkmas88@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload,
      });
      const ct = res.headers.get("content-type") || "";
      const data = ct.includes("application/json") ? await res.json() : await res.text();
      if (!res.ok || (typeof data !== "string" && data?.success === "false")) {
        throw new Error(typeof data === "string" ? data : data?.message || "Error");
      }
      setSubmitState("success");
      setSubmitMessage(copy.contact.messages.success);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setSubmitState("error");
      setSubmitMessage(copy.contact.messages.fallback);
    }
  };

  return (
    <div className="min-h-screen bg-[#070809] font-sans text-[#F5F7FA]">
      {/* Subtle top glow */}
      <div className="pointer-events-none fixed inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_-10%,rgba(59,130,246,0.06),transparent)]" />
      {/* Branded grid overlay — replaces Three.js stars */}
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-[0.07]"
        style={{ backgroundImage: "linear-gradient(rgba(99,179,237,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,0.4) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#070809]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-8xl items-center justify-between px-6 py-5 lg:px-8">
          <a href="#top" className="flex items-center gap-3">
            <img src="/logo-digital-am.png" alt="Digital AM" className="h-9 w-9 rounded-xl object-cover" />
            <span className="hidden text-[15px] font-semibold text-white sm:inline">{copy.brand.name}</span>
          </a>

          <nav className="hidden items-center gap-10 lg:flex">
            {copy.nav.map((item) => (
              item.route ? (
                <Link key={item.href} to={item.href}
                  className="text-sm font-medium text-[#9AA3AE] transition-colors hover:text-white">
                  {item.label}
                </Link>
              ) : (
                <a key={item.href} href={item.href}
                  className="text-sm font-medium text-[#9AA3AE] transition-colors hover:text-white">
                  {item.label}
                </a>
              )
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="tel:+18304750779"
              className="hidden items-center gap-2 text-sm font-semibold text-[#9AA3AE] transition hover:text-white xl:inline-flex">
              <Phone className="h-4 w-4" /> (830) 475-0779
            </a>
            <div className="hidden items-center rounded-lg border border-white/8 bg-white/[0.03] p-0.5 sm:inline-flex">
              {locales.map((code) => (
                <button key={code} type="button" onClick={() => setLocale(code)}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
                    locale === code ? "bg-white/10 text-white" : "text-[#9AA3AE] hover:text-white"
                  }`}>
                  {code}
                </button>
              ))}
            </div>
            <a href="#pricing" {...flowButtonProps}
              className="flow-button inline-flex items-center gap-2 whitespace-nowrap rounded-xl bg-white px-3 py-2 text-xs font-semibold text-[#070809] transition hover:bg-white/90 sm:px-4 sm:py-2.5 sm:text-sm">
              {copy.brand.headerCta}
            </a>
            <button type="button" onClick={() => setMobileMenuOpen(true)}
              className="rounded-xl border border-white/8 bg-white/[0.03] p-2.5 text-[#9AA3AE] transition hover:text-white lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE MENU ── */}
      {mobileMenuOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[60] flex flex-col bg-[#070809] lg:hidden">
          <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-5">
            <span className="text-[15px] font-semibold text-white">{copy.brand.name}</span>
            <button type="button" onClick={() => setMobileMenuOpen(false)} className="rounded-xl border border-white/8 p-2.5 text-[#9AA3AE]">
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-col gap-1 p-6">
            {copy.nav.map((item) => (
              item.route ? (
                <Link key={item.href} to={item.href} onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-4 text-lg font-medium text-[#D3D8E0] transition hover:bg-white/[0.04] hover:text-white">
                  {item.label}
                </Link>
              ) : (
                <a key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-4 text-lg font-medium text-[#D3D8E0] transition hover:bg-white/[0.04] hover:text-white">
                  {item.label}
                </a>
              )
            ))}
          </nav>
          <div className="space-y-4 px-6">
            <div className="inline-flex w-full items-center justify-center rounded-lg border border-white/8 bg-white/[0.03] p-1">
              {locales.map((code) => (
                <button key={code} type="button" onClick={() => setLocale(code)}
                  className={`flex-1 rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                    locale === code ? "bg-white/10 text-white" : "text-[#9AA3AE]"
                  }`}>
                  {code}
                </button>
              ))}
            </div>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center rounded-xl bg-white px-6 py-4 text-base font-semibold text-[#070809]">
              {copy.brand.headerCta}
            </a>
          </div>
        </motion.div>
      )}

      <main id="top">

        {/* ══════════════════════════════════════
            1. HERO
        ══════════════════════════════════════ */}
        <section className="relative overflow-hidden min-h-[90vh] flex flex-col justify-center">
          {/* Background image */}
          <motion.div initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0">
            <img src="/ai-images/hero.png" alt="Digital systems visualization"
              className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0" style={{background: 'linear-gradient(180deg, rgba(7,8,9,0.55) 0%, rgba(7,8,9,0.7) 50%, rgba(7,8,9,1) 100%)'}} />
            <div className="absolute inset-0" style={{background: 'linear-gradient(90deg, rgba(7,8,9,0.85) 0%, rgba(7,8,9,0.4) 60%, rgba(7,8,9,0) 100%)'}} />
          </motion.div>

          {/* Text content */}
          <div className="relative z-10 mx-auto max-w-8xl w-full px-6 pt-16 pb-24 lg:px-8 lg:pt-20 lg:pb-32">
            <div className="max-w-2xl">
              <motion.p {...fadeUp} className="mb-6 text-sm font-medium text-[#9AA3AE]">
                {copy.hero.eyebrow}
              </motion.p>
              <motion.h1 {...fadeUp} transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-hero-sm font-semibold text-white lg:text-hero">
                {copy.hero.title}
              </motion.h1>
              <motion.p {...fadeUp} transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="mt-7 max-w-lg text-lg leading-relaxed text-[#9AA3AE]">
                {copy.hero.subtitle}
              </motion.p>
              <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.15 }}
                className="mt-10 flex flex-wrap items-center gap-4">
                <a href={copy.hero.primaryCta.href} {...flowButtonProps}
                  className="flow-button inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#070809] transition hover:bg-white/90">
                  {copy.hero.primaryCta.label}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href={copy.hero.secondaryCta.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#9AA3AE] transition hover:text-white">
                  {copy.hero.secondaryCta.label}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>
            </div>
          </div>

          {/* Scroll cue */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.6 }}
            className="relative z-10 pb-10 flex justify-center">
            <a href="#pricing" className="flex flex-col items-center gap-2 text-[#9AA3AE]/50 transition hover:text-[#9AA3AE]">
              <ChevronDown className="h-5 w-5 animate-bounce" />
            </a>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════
            METRICS — animated counters
        ══════════════════════════════════════ */}
        <section className="relative border-t border-white/[0.06] bg-[#0D1117]">
          <div className="mx-auto max-w-8xl px-6 py-20 lg:px-8 lg:py-24">
            <motion.div {...fadeUp} className="max-w-3xl">
              <h2 className="font-display text-section-sm font-semibold text-white lg:text-section">
                {copy.metrics.title}
              </h2>
              <p className="mt-5 text-lg text-[#9AA3AE]">{copy.metrics.text}</p>
            </motion.div>
            <div className="mt-14 grid gap-px overflow-hidden rounded-[24px] border border-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
              {copy.metrics.items.map((m, i) => (
                <motion.div key={m.label} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="bg-[#0D1117] p-8 lg:p-10">
                  <p className="font-display text-5xl font-bold text-white lg:text-6xl">
                    <CountUp value={m.value} suffix={m.suffix} />
                  </p>
                  <p className="mt-3 text-sm text-[#9AA3AE]">{m.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            FOUNDER mini — Soy Fernando
        ══════════════════════════════════════ */}
        <section className="border-t border-white/[0.06]">
          <div className="mx-auto grid max-w-8xl gap-12 px-6 py-20 lg:grid-cols-5 lg:items-center lg:px-8 lg:py-28">
            <motion.div {...fadeUp} className="lg:col-span-3">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">{copy.founder.eyebrow}</p>
              <h2 className="font-display mt-4 text-section-sm font-semibold text-white lg:text-section">
                {copy.founder.title}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-[#9AA3AE]">{copy.founder.text}</p>
              <ul className="mt-8 space-y-3">
                {copy.founder.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-base text-[#D3D8E0]">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-400" />{b}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a href={copy.founder.cta.href} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-[#070809] transition hover:bg-emerald-400">
                  <MessageCircle className="h-4 w-4" /> {copy.founder.cta.label}
                </a>
                <Link to="/sobre-mi" className="inline-flex items-center gap-2 text-sm font-semibold text-[#9AA3AE] transition hover:text-white">
                  Conocé más sobre Fernando <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }}
              className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-white/[0.08] lg:col-span-2">
              <img src={copy.founder.photo} alt="Fernando Mastrapa"
                className="h-full w-full object-cover object-center"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const fb = e.currentTarget.nextElementSibling;
                  if (fb) fb.style.display = "grid";
                }} />
              <div className="absolute inset-0 hidden place-items-center bg-gradient-to-br from-blue-500/15 via-transparent to-emerald-500/10">
                <div className="text-center">
                  <div className="mx-auto grid h-24 w-24 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-3xl font-bold text-blue-300">FM</div>
                  <p className="mt-4 text-sm font-semibold text-white">Fernando Mastrapa</p>
                  <p className="text-xs text-[#9AA3AE]">Louisville, Kentucky</p>
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#070809] to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            2. PRICING
        ══════════════════════════════════════ */}
        <section id="pricing" className="relative border-t border-white/[0.06] bg-[#0D1117]">
          <div className="relative mx-auto max-w-8xl px-6 py-20 lg:px-8 lg:py-24">
            <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-300">{copy.pricing.eyebrow}</p>
              <h2 className="font-display mt-4 text-section-sm font-semibold text-white lg:text-section">
                {copy.pricing.title}
              </h2>
              <p className="mt-5 text-lg text-[#9AA3AE]">{copy.pricing.text}</p>
            </motion.div>

            <div className="mt-16 grid gap-6 lg:grid-cols-3">
              {copy.pricing.plans.map((plan, i) => (
                <motion.div key={plan.name} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }}
                  {...flowCardProps}
                  className={`flow-surface relative flex flex-col rounded-[24px] border p-8 lg:p-10 transition ${
                    plan.featured
                      ? "border-blue-400/50 bg-[#0F1A2E]"
                      : "border-white/[0.07] bg-[#14171C]"
                  }`}>
                  {plan.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-400 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#070809]">
                      {copy.pricing.featuredBadge}
                    </span>
                  )}
                  <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                  <p className="mt-2 text-sm text-[#9AA3AE]">{plan.tagline}</p>

                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    <span className="text-lg text-[#9AA3AE]">{copy.pricing.monthlyLabel}</span>
                  </div>
                  <p className="mt-1 text-sm text-[#9AA3AE]/70">{copy.pricing.annualLabel(plan.annual)}</p>

                  <div className="mt-8 mb-2 text-xs font-semibold uppercase tracking-wider text-[#9AA3AE]">
                    {copy.pricing.includesLabel}
                  </div>
                  <ul className="space-y-3 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-[#D3D8E0]">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a href={plan.whatsapp} target="_blank" rel="noreferrer" {...flowButtonProps}
                    className={`flow-button mt-8 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition ${
                      plan.featured
                        ? "bg-blue-400 text-[#070809] hover:bg-blue-300"
                        : "bg-white text-[#070809] hover:bg-white/90"
                    }`}>
                    <MessageCircle className="h-4 w-4" />
                    {plan.cta}
                  </a>
                </motion.div>
              ))}
            </div>

            <motion.div {...fadeUp} className="mt-12 flex flex-col items-center gap-3 text-center">
              <p className="text-sm text-[#9AA3AE]">{copy.pricing.guarantee}</p>
              <p className="text-base text-white">
                <span className="text-[#9AA3AE]">{copy.pricing.customLabel}</span>{" "}
                <a href={copy.pricing.customWhatsapp} target="_blank" rel="noreferrer"
                  className="font-semibold text-blue-300 underline-offset-4 hover:underline">
                  {copy.pricing.customCta}
                </a>
              </p>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            3. SYSTEM VISUAL
        ══════════════════════════════════════ */}
        <section id="system" className="border-t border-white/[0.06] bg-[#0D1117]">
          <div className="mx-auto max-w-8xl px-6 py-30 lg:px-8">
            <motion.div {...fadeUp} className="text-center">
              <h2 className="font-display text-section-sm font-semibold text-white lg:text-section">
                {copy.system.title}
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-[#9AA3AE]">{copy.system.text}</p>
            </motion.div>

            {/* Flow diagram */}
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-16 flex flex-wrap items-center justify-center gap-3">
              {copy.system.flow.map((step, i) => (
                <React.Fragment key={step}>
                  <div className="flex items-center gap-3">
                    <div className={`rounded-xl border px-5 py-3 text-sm font-semibold ${
                      i === 0 ? "border-blue-500/30 bg-blue-500/10 text-blue-300"
                      : i === copy.system.flow.length - 1 ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                      : "border-white/10 bg-white/[0.04] text-[#D3D8E0]"
                    }`}>
                      {step}
                    </div>
                  </div>
                  {i < copy.system.flow.length - 1 && (
                    <div className="h-px w-8 bg-gradient-to-r from-white/20 to-white/5 hidden sm:block" />
                  )}
                  {i < copy.system.flow.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-white/20 sm:hidden" />
                  )}
                </React.Fragment>
              ))}
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }} className="mt-14 flex flex-wrap items-center justify-center gap-4">
              <a href="https://wa.me/18304750779?text=Hola%2C%20quiero%20que%20mi%20negocio%20entre%20en%20este%20sistema"
                target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#070809] transition hover:bg-white/90">
                {locale === "es" ? "Activar este sistema en mi negocio" : "Activate this system for my business"} <ArrowRight className="h-4 w-4" />
              </a>
              <Link to="/casos" className="inline-flex items-center gap-2 text-sm font-semibold text-[#9AA3AE] transition hover:text-white">
                {locale === "es" ? "Ver caso real" : "See real case"} <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            3. PROBLEM
        ══════════════════════════════════════ */}
        <section className="mx-auto max-w-8xl px-6 py-30 lg:px-8">
          <motion.h2 {...fadeUp} className="font-display text-section-sm font-semibold text-white lg:text-section max-w-3xl">
            {copy.problem.title}
          </motion.h2>

          <div className="mt-16 grid gap-px border border-white/[0.06] rounded-[24px] overflow-hidden md:grid-cols-3">
            {copy.problem.items.map((item, i) => (
              <motion.a key={item.title} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }}
                href={`https://wa.me/18304750779?text=${encodeURIComponent("Hola, quiero resolver: " + item.title)}`}
                target="_blank" rel="noreferrer"
                className="group flex flex-col bg-[#0D1117] p-8 lg:p-10 transition hover:bg-[#11161D]">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9AA3AE]/60">0{i + 1}</p>
                <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 flex-1 leading-7 text-[#9AA3AE]">{item.text}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-300 transition group-hover:text-blue-200">
                  {locale === "es" ? "Cómo lo resolvemos" : "How I solve it"} <ArrowRight className="h-4 w-4" />
                </span>
              </motion.a>
            ))}
          </div>

          <motion.div {...fadeUp} className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <a href="https://wa.me/18304750779?text=Hola%2C%20quiero%20una%20auditor%C3%ADa%20gratis%20para%20mi%20negocio"
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-[#070809] transition hover:bg-emerald-400">
              <MessageCircle className="h-4 w-4" /> {locale === "es" ? "Auditoría gratis" : "Free audit"}
            </a>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════
            4. PLATFORM
        ══════════════════════════════════════ */}
        <section id="platform" className="border-t border-white/[0.06] bg-[#0D1117]">
          <div className="mx-auto max-w-8xl px-6 py-30 lg:px-8">
            <motion.div {...fadeUp}>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                {copy.platform.eyebrow}
              </p>
              <h2 className="font-display mt-4 max-w-2xl text-section-sm font-semibold text-white lg:text-section">
                {copy.platform.title}
              </h2>
            </motion.div>

            {/* 2×2 grid — clickable modules */}
            <div className="mt-16 grid gap-4 md:grid-cols-2">
              {copy.platform.modules.map((mod, i) => (
                <motion.a key={mod.title} {...flowCardProps} {...fadeUp}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  href={`https://wa.me/18304750779?text=${encodeURIComponent("Hola, me interesa: " + mod.title)}`}
                  target="_blank" rel="noreferrer"
                  className="flow-surface group block rounded-[20px] border border-white/[0.07] bg-[#14171C] p-8 transition hover:border-blue-400/40 hover:bg-[#161A22] lg:p-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9AA3AE]/50">0{i + 1}</p>
                  <h3 className="flow-child mt-4 text-2xl font-semibold text-white">{mod.title}</h3>
                  <p className="flow-child mt-3 text-base leading-7 text-[#9AA3AE]">{mod.text}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-300 transition group-hover:text-blue-200">
                    {locale === "es" ? "Quiero esto en mi negocio" : "I want this for my business"} <ArrowRight className="h-4 w-4" />
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Platform CTA */}
            <motion.div {...fadeUp} className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <a href="https://wa.me/18304750779?text=Hola%2C%20quiero%20ver%20cu%C3%A1l%20de%20estos%20servicios%20me%20conviene"
                target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#070809] transition hover:bg-white/90">
                <MessageCircle className="h-4 w-4" /> {locale === "es" ? "Auditoría gratis para mi negocio" : "Free audit for my business"}
              </a>
              <Link to="/casos" className="inline-flex items-center gap-2 text-sm font-semibold text-[#9AA3AE] transition hover:text-white">
                {locale === "es" ? "Ver caso real" : "See real case"} <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            5. WORK
        ══════════════════════════════════════ */}
        <section id="work" className="mx-auto max-w-8xl px-6 py-30 lg:px-8">
          <motion.h2 {...fadeUp} className="font-display text-section-sm font-semibold text-white lg:text-section">
            {copy.work.title}
          </motion.h2>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {copy.work.items.map((project, index) => {
              const domain = getProjectDomain(project.href);
              return (
                <motion.a key={project.title} href={project.href} target="_blank" rel="noreferrer"
                  {...flowCardProps} {...fadeUp} transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="flow-surface group flex flex-col rounded-[20px] border border-white/[0.07] bg-[#0D1117] overflow-hidden transition hover:-translate-y-1">

                  {/* Site preview */}
                  <div className="relative overflow-hidden bg-[#091426]">
                    <div className="flex items-center gap-2 border-b border-white/[0.06] bg-black/20 px-4 py-3">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                      <span className="ml-2 text-[11px] uppercase tracking-[0.2em] text-[#9AA3AE]/60">{domain}</span>
                    </div>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <iframe src={project.href} title={project.title} loading="lazy"
                        onLoad={() => setPreviewLoaded(p => ({ ...p, [project.title]: true }))}
                        className="pointer-events-none absolute left-0 top-0 border-0"
                        style={{ width: "160%", height: "160%", transform: "scale(0.625)", transformOrigin: "top left" }} />
                      <div className={`pointer-events-none absolute inset-0 bg-[#091426] transition-opacity duration-700 ${
                        previewLoaded[project.title] ? "opacity-0" : "opacity-100"}`} />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#091426] to-transparent" />
                      <div className="absolute bottom-3 left-3 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
                        {project.status}
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="flow-child text-xl font-semibold text-white">{project.title}</h3>
                    <p className="flow-child mt-2 text-sm leading-6 text-[#9AA3AE]">{project.text}</p>
                    <div className="mt-4 space-y-2">
                      {project.outcomes.map((o) => (
                        <div key={o} className="flex items-center gap-2 text-sm text-[#D3D8E0]">
                          <Check className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                          {o}
                        </div>
                      ))}
                    </div>
                    <span className="flow-button mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold text-[#9AA3AE] transition group-hover:text-white">
                      {copy.work.linkLabel}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </motion.a>
              );
            })}
          </div>

          <motion.div {...fadeUp} className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link to="/casos"
              className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/[0.04]">
              {locale === "es" ? "Ver casos en detalle" : "See detailed cases"} <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </section>

        {/* Reviews section removed — pending real reviews */}

        {/* ══════════════════════════════════════
            7. FINAL CTA
        ══════════════════════════════════════ */}
        <section id="contact" className="mx-auto max-w-8xl px-6 py-30 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start">

            {/* Left: CTA text */}
            <motion.div {...fadeUp}>
              <h2 className="font-display text-section-sm font-semibold text-white lg:text-section">
                {copy.cta.title}
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-[#9AA3AE]">{copy.cta.text}</p>
              <div className="mt-10 space-y-4">
                {copy.cta.phone && (
                  <a href={copy.cta.phoneHref || `tel:+18304750779`}
                    className="flex items-center gap-3 text-[#9AA3AE] transition hover:text-white">
                    <Phone className="h-4 w-4 text-blue-400" />
                    {copy.cta.phone}
                  </a>
                )}
                <a href={`mailto:${copy.cta.email}`}
                  className="flex items-center gap-3 text-[#9AA3AE] transition hover:text-white">
                  <Mail className="h-4 w-4 text-blue-400" />
                  {copy.cta.email}
                </a>
                <div className="flex items-center gap-3 text-[#9AA3AE]">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  {copy.cta.location}
                </div>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.form onSubmit={handleSubmit} {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-[24px] border border-white/[0.07] bg-[#0D1117] p-8 lg:p-10">
              <p className="text-lg font-semibold text-white">{copy.contact.formTitle}</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <input type="text" required placeholder={copy.contact.fields.name.placeholder}
                  value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                  className="col-span-1 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 text-white outline-none placeholder:text-[#9AA3AE]/60 focus:border-blue-500/40 focus:bg-white/[0.05] transition-colors" />
                <input type="email" required placeholder={copy.contact.fields.email.placeholder}
                  value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                  className="col-span-1 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 text-white outline-none placeholder:text-[#9AA3AE]/60 focus:border-blue-500/40 focus:bg-white/[0.05] transition-colors" />
              </div>
              <textarea required placeholder={copy.contact.fields.message.placeholder}
                value={form.message} onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                className="mt-4 min-h-[130px] w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 text-white outline-none placeholder:text-[#9AA3AE]/60 focus:border-blue-500/40 focus:bg-white/[0.05] transition-colors" />
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button type="submit" disabled={submitState === "submitting"}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#070809] transition hover:bg-white/90 disabled:opacity-50">
                  {submitState === "submitting" ? copy.contact.actions.submitting : copy.contact.actions.submit}
                  <Send className="h-4 w-4" />
                </button>
                <a href={locale === "es" ? "https://wa.me/18304750779?text=Hola%2C%20quiero%20una%20auditoría%20gratis%20para%20mi%20negocio" : `mailto:${copy.cta.email}`}
                  target={locale === "es" ? "_blank" : undefined}
                  rel={locale === "es" ? "noreferrer" : undefined}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] px-6 py-3.5 text-sm font-semibold text-[#9AA3AE] transition hover:border-white/20 hover:text-white">
                  {copy.contact.actions.direct}
                  <Mail className="h-4 w-4" />
                </a>
              </div>
              {submitState === "success" && <p className="mt-4 text-sm text-emerald-400">{submitMessage}</p>}
              {submitState === "error" && <p className="mt-4 text-sm text-rose-400">{submitMessage}</p>}
            </motion.form>
          </div>
        </section>

      </main>

      {/* ── STICKY WHATSAPP ── */}
      <a href={locale === "es" ? "https://wa.me/18304750779?text=Hola%2C%20quiero%20m%C3%A1s%20info%20sobre%20los%20planes%20de%20Digital%20AM" : "https://wa.me/18304750779?text=Hi%2C%20I%27d%20like%20more%20info%20about%20your%20plans"}
        target="_blank" rel="noreferrer"
        aria-label={locale === "es" ? "Enviar mensaje" : "Send message"}
        className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_8px_30px_rgba(16,185,129,0.45)] transition hover:scale-105 hover:bg-emerald-400">
        <MessageCircle className="h-6 w-6" />
      </a>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-8xl flex-col gap-2 px-6 py-8 text-xs text-[#9AA3AE]/50 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>{copy.footer.copyright.replace("{year}", String(currentYear))}</p>
          <div className="flex flex-col gap-1 lg:items-end">
            <p>{copy.footer.credit}</p>
            <div className="flex items-center gap-4">
              <a href="/privacy" className="hover:text-[#9AA3AE] transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-[#9AA3AE] transition-colors">Terms &amp; Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

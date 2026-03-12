import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  ChevronRight,
  Code2,
  Gem,
  Globe,
  Mail,
  MapPin,
  MessageSquare,
  MonitorSmartphone,
  QrCode,
  Send,
  Sparkles,
} from "lucide-react";
import PremiumHero from "./components/PremiumHero";
import { usePointerAura } from "./hooks/usePointerAura";
import { siteCopy } from "./content/siteCopy";
import { getFlowInteractionProps } from "./utils/flowInteractions";

const serviceIcons = [QrCode, Bot, Code2, Globe, MonitorSmartphone, Gem];
const philosophyIcons = [MessageSquare, Globe, Send, MapPin];
const proofIcons = [Sparkles, MessageSquare, Bot];
const locales = ["es", "en"];
const flowCardProps = getFlowInteractionProps({ tilt: 4 });
const flowPanelProps = getFlowInteractionProps({ tilt: 5 });
const flowButtonProps = getFlowInteractionProps();

const getInitialLocale = () => {
  if (typeof window === "undefined") return "es";

  const storedLocale = window.localStorage.getItem("digital-am-locale");
  if (storedLocale && locales.includes(storedLocale)) {
    return storedLocale;
  }

  return window.navigator.language?.toLowerCase().startsWith("es") ? "es" : "en";
};

function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="max-w-3xl space-y-4">
      {eyebrow && (
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-blue-300">
          <Sparkles className="h-3.5 w-3.5" />
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</h2>
      {text && <p className="max-w-2xl text-base leading-7 text-slate-300 md:text-lg">{text}</p>}
    </div>
  );
}

export default function App() {
  const [locale, setLocale] = useState(getInitialLocale);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitState, setSubmitState] = useState("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const currentYear = new Date().getFullYear();
  const copy = siteCopy[locale];
  const pointerAura = usePointerAura();

  useEffect(() => {
    window.localStorage.setItem("digital-am-locale", locale);
    document.documentElement.lang = locale;
    document.title = copy.meta.title;
  }, [copy.meta.title, locale]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setSubmitState("error");
      setSubmitMessage(copy.contact.messages.incomplete);
      return;
    }

    try {
      setSubmitState("submitting");
      setSubmitMessage("");

      const payload = new FormData();
      payload.append("name", form.name);
      payload.append("email", form.email);
      payload.append("message", form.message);
      payload.append("_replyto", form.email);
      payload.append("_subject", "Nuevo contacto desde Digital AM");
      payload.append("_template", "table");

      const response = await fetch("https://formsubmit.co/ajax/ferkmas88@gmail.com", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: payload,
      });

      const contentType = response.headers.get("content-type") || "";
      const data = contentType.includes("application/json") ? await response.json() : await response.text();
      const serviceMessage =
        typeof data === "string"
          ? data
          : data?.message || data?.error || data?.errors?.[0]?.message || "";

      if (!response.ok || (typeof data !== "string" && data?.success === "false")) {
        throw new Error(serviceMessage || `FormSubmit returned an error (${response.status}).`);
      }

      setSubmitState("success");
      setSubmitMessage(copy.contact.messages.success);
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to submit the form.";
      const looksLikeLocalFileIssue = /open this page through a web server|html files/i.test(message);

      setSubmitState("error");
      setSubmitMessage(
        looksLikeLocalFileIssue
          ? copy.contact.messages.localPreview
          : `${message} ${copy.contact.messages.fallback}`
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#020611] text-slate-100">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.16),_transparent_22%),radial-gradient(circle_at_80%_18%,_rgba(14,165,233,0.08),_transparent_15%),linear-gradient(to_bottom,rgba(59,130,246,0.03),transparent_25%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(96,165,250,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.025)_1px,transparent_1px)] bg-[size:42px_42px]" />
      <motion.div
        aria-hidden="true"
        style={{ left: pointerAura.x, top: pointerAura.y }}
        className="pointer-events-none fixed z-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.12),rgba(14,165,233,0.08)_28%,transparent_68%)] blur-3xl"
      />

      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#020611]/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
          <a href="#top" className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl border border-blue-400/25 bg-blue-500/10 shadow-[0_0_30px_rgba(37,99,235,0.15)]">
              <span className="text-sm font-black tracking-[0.24em] text-blue-300">AM</span>
            </div>
            <div>
              <div className="text-lg font-semibold text-white">{copy.brand.name}</div>
              <div className="text-xs uppercase tracking-[0.18em] text-slate-400">{copy.brand.tagline}</div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {copy.nav.map((item) => (
              <a key={item.href} href={item.href} className="flow-link text-sm font-medium text-slate-300 transition hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div
              className="inline-flex items-center rounded-2xl border border-white/10 bg-white/[0.04] p-1"
              aria-label={copy.ui.languageLabel}
            >
              {locales.map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLocale(code)}
                  {...flowButtonProps}
                  className={`rounded-xl px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                    locale === code ? "bg-cyan-400 text-slate-950" : "text-slate-300 hover:text-white"
                  } flow-button`}
                >
                  {code}
                </button>
              ))}
            </div>

            <a
              href="#contact"
              {...flowButtonProps}
              className="flow-button hidden items-center gap-2 rounded-2xl border border-blue-400/20 bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_40px_rgba(37,99,235,0.28)] transition hover:bg-blue-500 sm:inline-flex"
            >
              {copy.brand.headerCta}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        <PremiumHero copy={copy.hero} ui={copy.ui} />

        <section className="mx-auto max-w-7xl px-6 py-6 lg:px-8 lg:py-10">
          <div {...flowPanelProps} className="flow-surface rounded-[32px] border border-white/8 bg-white/[0.03] p-6 backdrop-blur-sm lg:p-8">
            <div className="max-w-3xl">
              <div className="flow-child text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/75">Digital AM</div>
              <h2 className="flow-child mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">{copy.proof.title}</h2>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {copy.proof.items.map((item, index) => {
                const Icon = proofIcons[index];

                return (
                  <div key={item.title} {...flowCardProps} className="flow-surface rounded-[26px] border border-white/10 bg-[#08111f]/75 p-5">
                    <div className="flow-child inline-flex rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-cyan-100">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="flow-child mt-4 text-lg font-semibold text-white">{item.title}</h3>
                    <p className="flow-child mt-3 text-sm leading-6 text-slate-300">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <SectionTitle eyebrow={copy.services.eyebrow} title={copy.services.title} text={copy.services.text} />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {copy.services.items.map((service, index) => {
              const Icon = serviceIcons[index];
              return (
                <motion.div
                  key={service.title}
                  {...flowCardProps}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className="flow-surface group rounded-[28px] border border-white/8 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-blue-400/20 hover:bg-white/[0.06]"
                >
                  <div className="flow-child mb-5 inline-flex rounded-2xl border border-blue-400/20 bg-blue-500/10 p-3 text-blue-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="flow-child text-xl font-semibold text-white">{service.title}</h3>
                  <p className="flow-child mt-3 leading-7 text-slate-300">{service.description}</p>
                  <div className="mt-5 space-y-3">
                    {service.bullets.map((bullet) => (
                      <div key={bullet} className="flow-child flex items-start gap-3 text-sm text-slate-400">
                        <ChevronRight className="mt-[2px] h-4 w-4 text-blue-300" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section id="projects" className="border-y border-white/5 bg-white/[0.02]">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
            <SectionTitle eyebrow={copy.projects.eyebrow} title={copy.projects.title} text={copy.projects.text} />

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {copy.projects.items.map((project, index) => (
                <motion.div
                  key={project.title}
                  {...flowCardProps}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className="flow-surface flex h-full flex-col rounded-[30px] border border-white/8 bg-[#06101d] p-6"
                >
                  <div className="flow-child mb-4 flex items-center justify-between gap-4">
                    <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
                      {project.status}
                    </span>
                    <div className="h-2.5 w-2.5 rounded-full bg-blue-400 shadow-[0_0_16px_rgba(96,165,250,0.8)]" />
                  </div>
                  <h3 className="flow-child text-2xl font-semibold text-white">{project.title}</h3>
                  <p className="flow-child mt-4 leading-7 text-slate-300">{project.text}</p>
                  {project.href && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      {...flowButtonProps}
                      className="flow-button mt-6 inline-flex items-center gap-2 self-start rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/30 hover:bg-cyan-300/15"
                    >
                      {copy.projects.linkLabel}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  )}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tech.map((tag) => (
                      <span
                        key={tag}
                        className="flow-child rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <SectionTitle eyebrow={copy.process.eyebrow} title={copy.process.title} text={copy.process.text} />

          <div className="mt-12 grid gap-6 lg:grid-cols-4">
            {copy.process.items.map((item, index) => (
              <motion.div
                key={item.step}
                {...flowCardProps}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="flow-surface rounded-[28px] border border-white/8 bg-white/[0.04] p-6"
              >
                <div className="flow-child mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 font-semibold text-white">
                  {item.step}
                </div>
                <h3 className="flow-child text-xl font-semibold text-white">{item.title}</h3>
                <p className="flow-child mt-3 leading-7 text-slate-300">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-8 lg:px-8">
          <div className="rounded-[36px] border border-white/8 bg-[linear-gradient(135deg,rgba(37,99,235,0.16),rgba(15,23,42,0.82)_48%,rgba(2,6,23,0.98))] p-8 md:p-10 lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-blue-100">
                  <Sparkles className="h-3.5 w-3.5" />
                  {copy.philosophy.eyebrow}
                </div>
                <h3 className="max-w-2xl text-3xl font-semibold tracking-tight text-white md:text-5xl">{copy.philosophy.title}</h3>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-50/85">{copy.philosophy.text}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {copy.philosophy.cards.map((card, index) => {
                  const Icon = philosophyIcons[index];

                  return (
                    <div key={card.title} {...flowCardProps} className="flow-surface rounded-3xl border border-white/10 bg-black/20 p-5 backdrop-blur-sm">
                      <Icon className="flow-child h-5 w-5 text-blue-200" />
                      <div className="flow-child mt-4 text-lg font-semibold text-white">{card.title}</div>
                      <div className="flow-child mt-2 text-sm leading-6 text-blue-50/75">{card.text}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div {...flowPanelProps} className="flow-surface rounded-[30px] border border-white/8 bg-white/[0.04] p-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
                <Mail className="h-3.5 w-3.5" />
                {copy.contact.eyebrow}
              </div>
              <h2 className="flow-child mt-5 text-3xl font-semibold tracking-tight text-white md:text-4xl">{copy.contact.title}</h2>
              <p className="flow-child mt-4 max-w-xl leading-7 text-slate-300">{copy.contact.text}</p>

              <div className="mt-8 space-y-4">
                <a
                  href="mailto:ferkmas88@gmail.com"
                  {...flowButtonProps}
                  className="flow-button flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-slate-200 transition hover:border-blue-400/20 hover:bg-white/[0.06]"
                >
                  <Mail className="h-4 w-4 text-blue-300" />
                  ferkmas88@gmail.com
                </a>
                <div {...flowCardProps} className="flow-surface flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-slate-300">
                  <MapPin className="h-4 w-4 text-blue-300" />
                  Louisville, Kentucky
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              {...flowPanelProps}
              className="flow-surface rounded-[30px] border border-white/8 bg-[#071120] p-8 shadow-[0_20px_80px_rgba(2,8,23,0.45)]"
            >
              <div className="flow-child mb-6 text-xl font-semibold text-white">{copy.contact.formTitle}</div>
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  required
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-white outline-none placeholder:text-slate-500 focus:border-blue-400/30"
                  placeholder={copy.contact.fields.name.placeholder}
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                />
                <input
                  type="email"
                  name="email"
                  required
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-white outline-none placeholder:text-slate-500 focus:border-blue-400/30"
                  placeholder={copy.contact.fields.email.placeholder}
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                />
              </div>
              <textarea
                name="message"
                required
                className="mt-4 min-h-[150px] w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-white outline-none placeholder:text-slate-500 focus:border-blue-400/30"
                placeholder={copy.contact.fields.message.placeholder}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              />

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={submitState === "submitting"}
                  {...flowButtonProps}
                  className="flow-button inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 text-base font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-900/70"
                >
                  {submitState === "submitting" ? copy.contact.actions.submitting : copy.contact.actions.submit}
                  <Send className="h-4 w-4" />
                </button>
                <a
                  href="mailto:ferkmas88@gmail.com"
                  {...flowButtonProps}
                  className="flow-button inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 text-base font-semibold text-white transition hover:border-blue-400/20 hover:bg-white/[0.06]"
                >
                  {copy.contact.actions.direct}
                  <Mail className="h-4 w-4" />
                </a>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-400">
                {submitState === "success" && <span className="text-emerald-300">{submitMessage}</span>}
                {submitState === "error" && <span className="text-rose-300">{submitMessage}</span>}
                {submitState === "idle" && copy.contact.notes.idle}
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-black/20">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-xs text-slate-500 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>{copy.footer.copyright.replace("{year}", String(currentYear))}</p>
          <div className="flex flex-col gap-2 text-right lg:items-end">
            <p>{copy.footer.credit}</p>
            <div className="flex items-center gap-4">
              <a href="/privacy" className="flow-link hover:text-slate-300">
                Privacy Policy
              </a>
              <a href="/terms" className="flow-link hover:text-slate-300">
                Terms &amp; Conditions
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

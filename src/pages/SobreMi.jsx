import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, MessageCircle, MapPin, Mail } from "lucide-react";
import InnerLayout from "../components/InnerLayout";
import { siteCopy } from "../content/siteCopy";

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

export default function SobreMiPage() {
  return (
    <InnerLayout pageTitle={siteCopy.es.founder.pageTitle}>
      {({ copy }) => {
        const f = copy.founder;
        return (
          <>
            <section className="mx-auto max-w-8xl px-6 pt-20 lg:px-8 lg:pt-28">
              <Link to="/" className="inline-flex items-center gap-2 text-sm text-[#9AA3AE] transition hover:text-white">
                <ArrowLeft className="h-4 w-4" /> {f.back}
              </Link>
              <div className="mt-10 grid gap-12 lg:grid-cols-5 lg:items-center">
                <motion.div {...fadeUp} className="lg:col-span-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">{f.eyebrow}</p>
                  <h1 className="font-display mt-4 text-4xl font-semibold text-white lg:text-6xl">{f.title}</h1>
                  <p className="mt-7 text-lg leading-relaxed text-[#9AA3AE]">{f.text}</p>
                  <ul className="mt-10 space-y-3">
                    {f.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-base text-[#D3D8E0]">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-400" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-10 flex flex-wrap items-center gap-4">
                    <a href={f.cta.href} target="_blank" rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-[#070809] transition hover:bg-emerald-400">
                      <MessageCircle className="h-4 w-4" /> {f.cta.label}
                    </a>
                    <Link to="/casos"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#9AA3AE] transition hover:text-white">
                      Ver casos reales <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>

                <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }}
                  className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-white/[0.08] lg:col-span-2">
                  <img src={f.photo} alt="Fernando Mastrapa"
                    className="h-full w-full object-cover object-center"
                    onError={(e) => { e.currentTarget.style.display = "none"; }} />
                  <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-blue-500/15 via-transparent to-emerald-500/10">
                    <div className="text-center">
                      <div className="mx-auto grid h-24 w-24 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-3xl font-bold text-blue-300">
                        FM
                      </div>
                      <p className="mt-4 text-sm font-semibold text-white">Fernando Mastrapa</p>
                      <p className="text-xs text-[#9AA3AE]">Louisville, Kentucky</p>
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#070809] to-transparent" />
                </motion.div>
              </div>
            </section>

            <section className="border-t border-white/[0.06] bg-[#0D1117]">
              <div className="mx-auto max-w-8xl px-6 py-20 lg:px-8 lg:py-28">
                <motion.div {...fadeUp} className="grid gap-12 lg:grid-cols-3">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9AA3AE]/60">Background</h3>
                    <p className="mt-4 leading-7 text-[#D3D8E0]">
                      Industrial Engineer (B.S. 2017) + 10 años en IT systems administration antes de pasarme full-time
                      a software. Trabajé en plantas industriales y court systems administrando 50+ endpoints en
                      ambientes compliance-heavy. Esa disciplina la traigo a cada proyecto.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9AA3AE]/60">Tech Stack</h3>
                    <p className="mt-4 leading-7 text-[#D3D8E0]">
                      Next.js 14 · React · TypeScript · Python · Node.js · PostgreSQL + Prisma · Supabase RLS ·
                      Anthropic Claude API · Google Gemini · Ollama (local LLMs) · MCP servers · Vercel/Railway ·
                      GitHub Actions CI/CD. Production-grade desde día uno.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9AA3AE]/60">How I work</h3>
                    <p className="mt-4 leading-7 text-[#D3D8E0]">
                      Direct work conmigo, no con becarios ni equipo offshore. Bilingüe ES/EN. Delivery 7-14 días según
                      scope. Sin contratos largos. Si no funciona, te vas. Atención por WhatsApp, llamada o email —
                      lo que prefieras.
                    </p>
                  </div>
                </motion.div>

                <motion.div {...fadeUp} className="mt-16 rounded-[28px] border border-white/[0.07] bg-[#14171C] p-8 lg:p-12">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">Selected Production Work · 2024-2026</h3>
                  <div className="mt-8 grid gap-8 md:grid-cols-2">
                    <div>
                      <h4 className="text-base font-semibold text-white">Bilingual Notary + Immigration Platform</h4>
                      <p className="mt-2 text-sm leading-6 text-[#9AA3AE]">
                        Live bilingual platform with Gemini conversational booking agent + Google Calendar Service
                        Account integration across 4 calendars + WhatsApp bot on Railway. Stack: Next.js 14, TypeScript, PHP, Gemini API.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-white">NotaryAI Desktop</h4>
                      <p className="mt-2 text-sm leading-6 text-[#9AA3AE]">
                        Privacy-first AI document assistant running entirely on-device. Local Ollama + qwen2.5:3b
                        with branded Spanish UI, Windows installer. Stack: Ollama, AnythingLLM, SQLite, Python, Inno Setup.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-white">Clientes360 — Multi-Tenant CRM SaaS</h4>
                      <p className="mt-2 text-sm leading-6 text-[#9AA3AE]">
                        Postgres Row-Level Security + Auth.js tenant isolation enforced at database layer.
                        Stack: Next.js, PostgreSQL, Prisma, Auth.js, Resend, Vercel.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-white">AutoLeadLink — Lead Capture SaaS</h4>
                      <p className="mt-2 text-sm leading-6 text-[#9AA3AE]">
                        Dealer-specific link turning Facebook, Instagram, Messenger and WhatsApp conversations
                        into structured CRM leads. Stack: Next.js, Supabase, Resend, Vercel.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-white">Louisville Lead Hunter — Segmentation Pipeline</h4>
                      <p className="mt-2 text-sm leading-6 text-[#9AA3AE]">
                        Python scraping + scoring pipeline. 816 raw records → 408 deduped → 147 niche-validated
                        leads across 6 verticals. Stack: Python, Google Places API, BeautifulSoup, custom scoring.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-white">Custom MCP Servers + Claude Agent Crews</h4>
                      <p className="mt-2 text-sm leading-6 text-[#9AA3AE]">
                        MCP servers and Claude-agent crews driving day-to-day operations: source ingest, competitor
                        audits, offer generation, proposal writing — orchestrated from 75+ page knowledge base.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            <section className="mx-auto max-w-3xl px-6 py-20 text-center lg:py-28">
              <motion.h2 {...fadeUp} className="font-display text-section-sm font-semibold text-white lg:text-section">
                Let's talk
              </motion.h2>
              <motion.div {...fadeUp} className="mt-8 flex flex-col items-center gap-4 text-[#9AA3AE]">
                <a href={f.cta.href} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-[#070809] transition hover:bg-emerald-400">
                  <MessageCircle className="h-4 w-4" /> WhatsApp direct
                </a>
                <a href="tel:+18304750779" className="inline-flex items-center gap-2 transition hover:text-white">
                  📞 (830) 475-0779
                </a>
                <a href="mailto:ferkmas88@gmail.com" className="inline-flex items-center gap-2 transition hover:text-white">
                  <Mail className="h-4 w-4 text-blue-400" /> ferkmas88@gmail.com
                </a>
                <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-blue-400" /> Louisville, Kentucky</span>
              </motion.div>
            </section>
          </>
        );
      }}
    </InnerLayout>
  );
}

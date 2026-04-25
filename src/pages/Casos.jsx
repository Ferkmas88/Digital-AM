import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import InnerLayout from "../components/InnerLayout";
import { siteCopy } from "../content/siteCopy";
import { getFlowInteractionProps } from "../utils/flowInteractions";

const cardProps = getFlowInteractionProps({ tilt: 2 });
const fadeUp = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

export default function CasosPage() {
  return (
    <InnerLayout pageTitle={siteCopy.es.casos.pageTitle}>
      {({ copy }) => {
        const c = copy.casos;
        return (
          <>
            <section className="mx-auto max-w-8xl px-6 pt-20 lg:px-8 lg:pt-28">
              <Link to="/" className="inline-flex items-center gap-2 text-sm text-[#9AA3AE] transition hover:text-white">
                <ArrowLeft className="h-4 w-4" /> {c.backHome}
              </Link>
              <motion.div {...fadeUp} className="mt-10 max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">{c.eyebrow}</p>
                <h1 className="font-display mt-4 text-4xl font-semibold text-white lg:text-6xl">{c.title}</h1>
                <p className="mt-6 text-lg leading-relaxed text-[#9AA3AE]">{c.pageSub}</p>
              </motion.div>
            </section>

            <section className="mx-auto max-w-8xl px-6 py-20 lg:px-8 lg:py-28">
              <div className="space-y-10">
                {c.items.map((caso, i) => (
                  <motion.article key={caso.slug} {...fadeUp} {...cardProps}
                    transition={{ duration: 0.55, delay: i * 0.05 }}
                    className="flow-surface grid gap-8 rounded-[24px] border border-white/[0.07] bg-[#0D1117] p-8 lg:grid-cols-3 lg:gap-12 lg:p-12">
                    <div className="lg:col-span-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9AA3AE]/60">
                        0{i + 1} · {caso.industry}
                      </p>
                      <h2 className="font-display mt-3 text-3xl font-semibold text-white">{caso.title}</h2>
                      <p className="mt-2 text-sm text-[#9AA3AE]">{caso.city}</p>
                      <p className="mt-6 text-base leading-relaxed text-[#D3D8E0]">{caso.summary}</p>
                      <div className="mt-8 inline-flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300">
                        {caso.metric}
                      </div>
                      <div className="mt-8">
                        <a href={caso.href} target="_blank" rel="noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-300 transition hover:text-blue-200">
                          {c.visitSite} <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>

                    <div className="space-y-6 lg:col-span-2">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-300/80">{c.sections.problem}</p>
                        <p className="mt-2 leading-7 text-[#D3D8E0]">{caso.problem}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300/80">{c.sections.solution}</p>
                        <p className="mt-2 leading-7 text-[#D3D8E0]">{caso.solution}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300/80">{c.sections.result}</p>
                        <p className="mt-2 leading-7 text-[#D3D8E0]">{caso.result}</p>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>

            <section className="border-t border-white/[0.06] bg-[#0D1117]">
              <div className="mx-auto max-w-3xl px-6 py-20 text-center lg:py-28">
                <motion.h2 {...fadeUp} className="font-display text-section-sm font-semibold text-white lg:text-section">
                  ¿El próximo caso es el tuyo?
                </motion.h2>
                <motion.p {...fadeUp} className="mt-5 text-lg text-[#9AA3AE]">
                  Auditoría gratis por WhatsApp. En 30 minutos sabés exactamente qué cambiar.
                </motion.p>
                <motion.div {...fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
                  <a href="https://wa.me/18304750779?text=Hola%2C%20quiero%20una%20auditor%C3%ADa%20para%20mi%20negocio"
                    target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#070809] transition hover:bg-white/90">
                    Auditoría gratis <ArrowRight className="h-4 w-4" />
                  </a>
                  <Link to="/#pricing"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] px-6 py-3.5 text-sm font-semibold text-[#9AA3AE] transition hover:text-white">
                    Ver precios
                  </Link>
                </motion.div>
              </div>
            </section>
          </>
        );
      }}
    </InnerLayout>
  );
}

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Star, ExternalLink, MessageCircle } from "lucide-react";
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

function Stars({ count = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < count ? "fill-amber-300 text-amber-300" : "text-white/20"}`} />
      ))}
    </div>
  );
}

function ReviewCard({ r }) {
  return (
    <motion.a {...fadeUp} {...cardProps} href={r.sourceHref} target="_blank" rel="noreferrer"
      className="flow-surface group flex flex-col rounded-[20px] border border-white/[0.07] bg-[#0D1117] p-7 transition hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <Stars count={r.rating} />
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9AA3AE]/60">{r.source}</span>
      </div>
      <p className="mt-5 text-[15px] leading-7 text-[#D3D8E0]">"{r.text}"</p>
      <div className="mt-6 flex items-center gap-3 border-t border-white/[0.05] pt-5">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-blue-500/15 text-sm font-bold text-blue-300">
          {r.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-white">{r.name}</p>
          <p className="text-xs text-[#9AA3AE]">{r.business} · {r.city}</p>
        </div>
        <ExternalLink className="h-4 w-4 text-[#9AA3AE]/40 transition group-hover:text-white" />
      </div>
    </motion.a>
  );
}

function LeaveReviewForm({ copy }) {
  const r = copy.reviews;
  const [form, setForm] = useState({ name: "", business: "", city: "", rating: 5, message: "" });
  const [state, setState] = useState("idle");

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.business || !form.message) {
      setState("error");
      return;
    }
    try {
      setState("sending");
      const payload = new FormData();
      Object.entries(form).forEach(([k, v]) => payload.append(k, String(v)));
      payload.append("_subject", `Nueva reseña Digital AM — ${form.name}`);
      payload.append("_template", "table");
      const res = await fetch("https://formsubmit.co/ajax/ferkmas88@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload,
      });
      if (!res.ok) throw new Error();
      setState("success");
      setForm({ name: "", business: "", city: "", rating: 5, message: "" });
    } catch {
      setState("error");
    }
  };

  return (
    <motion.form {...fadeUp} onSubmit={submit}
      className="rounded-[24px] border border-white/[0.07] bg-[#0D1117] p-8 lg:p-10">
      <h3 className="text-2xl font-semibold text-white">{r.formTitle}</h3>
      <p className="mt-2 text-sm text-[#9AA3AE]">{r.formNote}</p>

      <a href={r.googleWriteHref} target="_blank" rel="noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-xl border border-blue-400/40 bg-blue-500/10 px-5 py-3 text-sm font-semibold text-blue-200 transition hover:bg-blue-500/20">
        <Star className="h-4 w-4 fill-amber-300 text-amber-300" />
        {r.googleReviewCta}
        <ArrowRight className="h-4 w-4" />
      </a>

      <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#9AA3AE]/50">
        <span className="h-px flex-1 bg-white/[0.06]" />o<span className="h-px flex-1 bg-white/[0.06]" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <input required placeholder={r.formFields.name} value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 text-white outline-none placeholder:text-[#9AA3AE]/60 focus:border-blue-500/40" />
        <input required placeholder={r.formFields.business} value={form.business}
          onChange={(e) => setForm((f) => ({ ...f, business: e.target.value }))}
          className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 text-white outline-none placeholder:text-[#9AA3AE]/60 focus:border-blue-500/40" />
        <input placeholder={r.formFields.city} value={form.city}
          onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
          className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 text-white outline-none placeholder:text-[#9AA3AE]/60 focus:border-blue-500/40" />
        <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5">
          <span className="text-xs uppercase tracking-wider text-[#9AA3AE]/60">{r.formFields.rating}</span>
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} type="button" onClick={() => setForm((f) => ({ ...f, rating: n }))}>
              <Star className={`h-5 w-5 ${n <= form.rating ? "fill-amber-300 text-amber-300" : "text-white/20"}`} />
            </button>
          ))}
        </div>
      </div>
      <textarea required placeholder={r.formFields.message} value={form.message}
        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
        className="mt-4 min-h-[130px] w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 text-white outline-none placeholder:text-[#9AA3AE]/60 focus:border-blue-500/40" />
      <button type="submit" disabled={state === "sending"}
        className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#070809] transition hover:bg-white/90 disabled:opacity-50">
        {state === "sending" ? r.formSubmitting : r.formSubmit}
      </button>
      {state === "success" && <p className="mt-4 text-sm text-emerald-400">{r.formSuccess}</p>}
      {state === "error" && <p className="mt-4 text-sm text-rose-400">{r.formError}</p>}
    </motion.form>
  );
}

export default function ResenasPage() {
  return (
    <InnerLayout pageTitle={siteCopy.es.reviews.pageTitle}>
      {({ copy }) => {
        const r = copy.reviews;
        return (
          <>
            <section className="mx-auto max-w-8xl px-6 pt-20 lg:px-8 lg:pt-28">
              <Link to="/" className="inline-flex items-center gap-2 text-sm text-[#9AA3AE] transition hover:text-white">
                <ArrowLeft className="h-4 w-4" /> {r.back}
              </Link>
              <motion.div {...fadeUp} className="mt-10 max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">{r.eyebrow}</p>
                <h1 className="font-display mt-4 text-4xl font-semibold text-white lg:text-6xl">{r.pageHeading}</h1>
                <p className="mt-6 text-lg leading-relaxed text-[#9AA3AE]">{r.pageSub}</p>
                <a href={r.googleHref} target="_blank" rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl border border-white/[0.08] px-5 py-3 text-sm font-semibold text-white transition hover:border-white/20">
                  <Star className="h-4 w-4 fill-amber-300 text-amber-300" />
                  {r.googleCta}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>
            </section>

            <section className="mx-auto max-w-8xl px-6 py-20 lg:px-8 lg:py-28">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {r.items.map((review, i) => <ReviewCard key={i} r={review} />)}
              </div>
            </section>

            <section className="border-t border-white/[0.06] bg-[#0D1117]">
              <div className="mx-auto grid max-w-8xl gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
                <motion.div {...fadeUp}>
                  <h2 className="font-display text-section-sm font-semibold text-white lg:text-section">
                    ¿Trabajaste con Digital AM?
                  </h2>
                  <p className="mt-5 max-w-md text-lg leading-relaxed text-[#9AA3AE]">
                    Tu reseña nos ayuda a llegar a más negocios latinos. Te toma 60 segundos.
                  </p>
                  <a href="https://wa.me/18304750779?text=Hola%2C%20quiero%20dejar%20una%20rese%C3%B1a"
                    target="_blank" rel="noreferrer"
                    className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-300 transition hover:text-blue-200">
                    <MessageCircle className="h-4 w-4" /> Prefiero mandarla por WhatsApp
                  </a>
                </motion.div>
                <LeaveReviewForm copy={copy} />
              </div>
            </section>
          </>
        );
      }}
    </InnerLayout>
  );
}

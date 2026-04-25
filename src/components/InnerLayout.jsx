import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, MessageCircle, X } from "lucide-react";
import { motion } from "framer-motion";
import { siteCopy } from "../content/siteCopy";

const locales = ["es", "en"];

const getInitialLocale = () => {
  if (typeof window === "undefined") return "es";
  const stored = window.localStorage.getItem("digital-am-locale");
  return stored && locales.includes(stored) ? stored : "es";
};

function NavLink({ item, onClick }) {
  if (item.route) {
    return (
      <Link to={item.href} onClick={onClick}
        className="text-sm font-medium text-[#9AA3AE] transition-colors hover:text-white">
        {item.label}
      </Link>
    );
  }
  return (
    <a href={item.href} onClick={onClick}
      className="text-sm font-medium text-[#9AA3AE] transition-colors hover:text-white">
      {item.label}
    </a>
  );
}

export default function InnerLayout({ children, pageTitle }) {
  const [locale, setLocale] = useState(getInitialLocale);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const copy = siteCopy[locale];
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    window.localStorage.setItem("digital-am-locale", locale);
    document.documentElement.lang = locale;
    if (pageTitle) document.title = pageTitle;
  }, [locale, pageTitle]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#070809] font-sans text-[#F5F7FA]">
      <div className="pointer-events-none fixed inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_-10%,rgba(59,130,246,0.06),transparent)]" />

      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#070809]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-8xl items-center justify-between px-6 py-5 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
              <span className="text-xs font-bold tracking-[0.2em] text-blue-300">AM</span>
            </div>
            <span className="hidden text-[15px] font-semibold text-white sm:inline">{copy.brand.name}</span>
          </Link>

          <nav className="hidden items-center gap-10 lg:flex">
            {copy.nav.map((item) => <NavLink key={item.href} item={item} />)}
          </nav>

          <div className="flex items-center gap-3">
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
            <Link to="/#pricing"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl bg-white px-3 py-2 text-xs font-semibold text-[#070809] transition hover:bg-white/90 sm:px-4 sm:py-2.5 sm:text-sm">
              {copy.brand.headerCta}
            </Link>
            <button type="button" onClick={() => setMobileMenuOpen(true)}
              className="rounded-xl border border-white/8 bg-white/[0.03] p-2.5 text-[#9AA3AE] transition hover:text-white lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

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
              <span key={item.href} className="block rounded-xl px-4 py-4 text-lg font-medium text-[#D3D8E0] transition hover:bg-white/[0.04] hover:text-white">
                <NavLink item={item} onClick={() => setMobileMenuOpen(false)} />
              </span>
            ))}
          </nav>
          <div className="px-6">
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
          </div>
        </motion.div>
      )}

      <main>{typeof children === "function" ? children({ locale, copy }) : children}</main>

      <a href="https://wa.me/18304750779?text=Hola%2C%20quiero%20m%C3%A1s%20info%20sobre%20Digital%20AM"
        target="_blank" rel="noreferrer" aria-label="WhatsApp"
        className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_8px_30px_rgba(16,185,129,0.45)] transition hover:scale-105 hover:bg-emerald-400">
        <MessageCircle className="h-6 w-6" />
      </a>

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

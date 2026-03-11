import React, { useEffect, useMemo, useRef, useState } from "react";
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
  ShieldCheck,
  Sparkles,
  Store,
  Workflow,
  Zap,
} from "lucide-react";

const navItems = [
  { label: "Servicios", href: "#services" },
  { label: "Proyectos", href: "#projects" },
  { label: "Proceso", href: "#process" },
  { label: "Contacto", href: "#contact" },
];

const services = [
  {
    icon: QrCode,
    title: "QR + SMS + Reviews",
    description:
      "Sistemas diseñados para captar clientes, solicitar reseñas y mantener el seguimiento por SMS con una operación más consistente.",
    bullets: [
      "Captura por QR",
      "Solicitud de reviews",
      "Seguimiento por SMS",
      "Enfoque para negocios locales",
    ],
  },
  {
    icon: Bot,
    title: "Automatización conversacional",
    description:
      "Flujos conversacionales que ordenan la atención, filtran oportunidades y preparan una base sólida para automatizaciones más avanzadas.",
    bullets: [
      "Flujos personalizados",
      "Respuestas más organizadas",
      "Filtrado de leads",
      "Base lista para evolucionar",
    ],
  },
  {
    icon: Code2,
    title: "Software a medida",
    description:
      "Herramientas web desarrolladas alrededor del flujo real del negocio: formularios, paneles, procesos internos y operación.",
    bullets: [
      "Dashboards simples",
      "Procesos personalizados",
      "Menos trabajo manual",
      "Construido según necesidad",
    ],
  },
  {
    icon: Globe,
    title: "Sitios web que convierten",
    description:
      "Sitios con estructura estratégica, diseño cuidado y un enfoque claro en comunicar valor, generar confianza y convertir.",
    bullets: [
      "Mensajes claros",
      "CTA correctos",
      "Diseño limpio y rápido",
      "Base lista para crecer",
    ],
  },
  {
    icon: MonitorSmartphone,
    title: "Sistemas para negocio local",
    description:
      "Una combinación de web, automatización y estructura digital para que la operación gane orden, claridad y continuidad.",
    bullets: [
      "Captura de leads",
      "Mejor presentación",
      "Procesos más claros",
      "Más orden comercial",
    ],
  },
  {
    icon: Gem,
    title: "Ecommerce para joyería",
    description:
      "Tiendas con presentación refinada, catálogo claro y una experiencia visual alineada con marcas que necesitan vender mejor online.",
    bullets: [
      "Catálogo premium",
      "Presentación elegante",
      "Estructura ecommerce",
      "Preparado para escalar",
    ],
  },
];

const projects = [
  {
    title: "Sistema QR + SMS + reseñas",
    status: "En desarrollo",
    text: "Una solución orientada a captar clientes, solicitar reseñas y dar seguimiento con una experiencia más ordenada y profesional.",
    tech: ["QR", "SMS", "Lead capture", "Reviews"],
  },
  {
    title: "Automatización conversacional",
    status: "En evolución",
    text: "Una base para organizar conversaciones, filtrar consultas y escalar después hacia automatizaciones más relevantes para el negocio.",
    tech: ["Automation", "Flows", "Lead routing", "AI-ready"],
  },
  {
    title: "Ecommerce para joyería",
    status: "Implementación activa",
    text: "Una tienda concebida para marcas de joyería que necesitan elevar su presentación de producto y ofrecer una experiencia de compra más cuidada.",
    tech: ["Ecommerce", "Catalog", "Product UX", "Storefront"],
  },
];

const process = [
  {
    step: "01",
    title: "Diagnosticar",
    text: "Entender dónde se pierde tiempo, oportunidades o claridad antes de definir cualquier solución.",
  },
  {
    step: "02",
    title: "Arquitectura",
    text: "Diseñar la estructura correcta: landing, sistema, flujo, SaaS o software según la necesidad real.",
  },
  {
    step: "03",
    title: "Construcción",
    text: "Desarrollar una base funcional, elegante y técnicamente sólida, pensada para sostenerse en el tiempo.",
  },
  {
    step: "04",
    title: "Iteración",
    text: "Refinar a partir del uso real, la fricción detectada y la evolución natural del negocio o producto.",
  },
];

const stats = [
  { value: "01", label: "Enfoque actual", text: "Pasar de servicios aislados a sistemas con mayor profundidad y valor." },
  { value: "04", label: "Áreas de trabajo", text: "SaaS, automatización, software a medida y ecommerce." },
  { value: "∞", label: "Visión a largo plazo", text: "Soluciones concebidas para crecer, integrarse y madurar con el tiempo." },
];

function AdvancedCanvas() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = 0;
    let height = 0;
    let frame = 0;
    let t = 0;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    const nodes = [];
    const sparks = [];
    const orbs = [];
    const labels = [];
    const labelPool = ["QR", "SMS", "AI", "SHOP", "BOT", "SEO", "FLOW", "CRM"];

    const roundedRect = (x, y, w, h, r) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * DPR);
      canvas.height = Math.floor(height * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      nodes.length = 0;
      sparks.length = 0;
      orbs.length = 0;
      labels.length = 0;

      const cols = 8;
      const rows = 6;
      const gapX = width / (cols + 1);
      const gapY = height / (rows + 1);

      for (let y = 1; y <= rows; y++) {
        for (let x = 1; x <= cols; x++) {
          nodes.push({
            x: x * gapX + (Math.random() - 0.5) * 34,
            y: y * gapY + (Math.random() - 0.5) * 34,
            baseX: x * gapX,
            baseY: y * gapY,
            size: 1.8 + Math.random() * 2.8,
            phase: Math.random() * Math.PI * 2,
            speed: 0.8 + Math.random() * 1.2,
          });
        }
      }

      for (let i = 0; i < 56; i++) {
        sparks.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          size: 1 + Math.random() * 2,
          alpha: 0.12 + Math.random() * 0.25,
        });
      }

      for (let i = 0; i < 14; i++) {
        labels.push({
          x: 70 + Math.random() * (width - 140),
          y: 70 + Math.random() * (height - 140),
          drift: 0.2 + Math.random() * 0.3,
          phase: Math.random() * 100,
          text: labelPool[i % labelPool.length],
          w: 54 + Math.random() * 18,
          h: 28 + Math.random() * 10,
        });
      }

      for (let i = 0; i < 5; i++) {
        orbs.push({
          x: width * (0.18 + i * 0.16),
          y: height * (0.22 + (i % 2) * 0.18),
          r: 90 + Math.random() * 40,
          alpha: 0.06 + Math.random() * 0.06,
        });
      }
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
      mouse.current.active = true;
    };

    const onLeave = () => {
      mouse.current.active = false;
    };

    const draw = () => {
      t += 0.012;
      ctx.clearRect(0, 0, width, height);

      const base = ctx.createLinearGradient(0, 0, width, height);
      base.addColorStop(0, "rgba(3,7,18,0)");
      base.addColorStop(0.5, "rgba(37,99,235,0.06)");
      base.addColorStop(1, "rgba(59,130,246,0.02)");
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, width, height);

      orbs.forEach((o, i) => {
        const gx = o.x + Math.sin(t + i) * 18;
        const gy = o.y + Math.cos(t * 0.9 + i) * 18;
        const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, o.r);
        grad.addColorStop(0, `rgba(59,130,246,${o.alpha})`);
        grad.addColorStop(1, "rgba(59,130,246,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(gx, gy, o.r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.save();
      ctx.strokeStyle = "rgba(96,165,250,0.05)";
      for (let x = 0; x < width; x += 38) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 38) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      sparks.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      nodes.forEach((n, idx) => {
        n.x = n.baseX + Math.sin(t * n.speed + n.phase) * 10;
        n.y = n.baseY + Math.cos(t * n.speed + n.phase) * 10;

        for (let j = idx + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = n.x - b.x;
          const dy = n.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < 150) {
            const alpha = (1 - d / 150) * 0.16;
            const grad = ctx.createLinearGradient(n.x, n.y, b.x, b.y);
            grad.addColorStop(0, `rgba(37,99,235,${alpha})`);
            grad.addColorStop(1, `rgba(125,211,252,${alpha * 0.45})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      });

      if (mouse.current.active) {
        const mg = ctx.createRadialGradient(mouse.current.x, mouse.current.y, 0, mouse.current.x, mouse.current.y, 140);
        mg.addColorStop(0, "rgba(59,130,246,0.22)");
        mg.addColorStop(1, "rgba(59,130,246,0)");
        ctx.fillStyle = mg;
        ctx.beginPath();
        ctx.arc(mouse.current.x, mouse.current.y, 140, 0, Math.PI * 2);
        ctx.fill();

        nodes.forEach((n) => {
          const d = Math.hypot(mouse.current.x - n.x, mouse.current.y - n.y);
          if (d < 180) {
            ctx.strokeStyle = `rgba(96,165,250,${0.22 * (1 - d / 180)})`;
            ctx.beginPath();
            ctx.moveTo(mouse.current.x, mouse.current.y);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();
          }
        });
      }

      nodes.forEach((n) => {
        const pulse = (Math.sin(t * 1.5 + n.phase) + 1) / 2;
        ctx.beginPath();
        ctx.fillStyle = `rgba(96,165,250,${0.3 + pulse * 0.45})`;
        ctx.arc(n.x, n.y, n.size + pulse * 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = "rgba(255,255,255,0.92)";
        ctx.arc(n.x, n.y, Math.max(1, n.size - 0.4), 0, Math.PI * 2);
        ctx.fill();
      });

      labels.forEach((l, i) => {
        const x = l.x + Math.sin(t + l.phase) * 16;
        const y = l.y + Math.cos(t * 0.9 + l.phase) * 12;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.sin(t * 0.4 + i) * 0.04);
        ctx.shadowBlur = 18;
        ctx.shadowColor = "rgba(37,99,235,0.32)";
        roundedRect(-l.w / 2, -l.h / 2, l.w, l.h, 12);
        ctx.fillStyle = "rgba(8,16,31,0.82)";
        ctx.fill();
        ctx.strokeStyle = "rgba(96,165,250,0.26)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.fillStyle = "rgba(191,219,254,0.94)";
        ctx.font = "600 12px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(l.text, 0, 1);
        ctx.restore();
      });

      const cx = width * 0.74;
      const cy = height * 0.48;
      const mainR = Math.min(width, height) * 0.18;

      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = "rgba(96,165,250,0.2)";
      ctx.lineWidth = 22;
      ctx.arc(cx, cy, mainR + 10 + Math.sin(t * 2) * 2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.strokeStyle = "rgba(59,130,246,0.36)";
      ctx.lineWidth = 2;
      ctx.arc(cx, cy, mainR, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.fillStyle = "rgba(5,11,24,0.92)";
      ctx.arc(cx, cy, mainR - 18, 0, Math.PI * 2);
      ctx.fill();

      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, mainR - 10);
      coreGrad.addColorStop(0, "rgba(59,130,246,0.15)");
      coreGrad.addColorStop(1, "rgba(2,6,23,0)");
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, mainR - 10, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(255,255,255,0.98)";
      ctx.textAlign = "center";
      ctx.font = "700 18px Inter, sans-serif";
      ctx.fillText("BUILDING", cx, cy - 18);
      ctx.font = "800 34px Inter, sans-serif";
      ctx.fillText("SYSTEMS", cx, cy + 16);
      ctx.font = "600 13px Inter, sans-serif";
      ctx.fillStyle = "rgba(191,219,254,0.86)";
      ctx.fillText("Digital AM", cx, cy + 42);
      ctx.restore();

      frame = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}

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

function MockCard({ title, subtitle, lines = [] }) {
  return (
    <div className="rounded-[26px] border border-white/10 bg-[#071120]/90 p-5 shadow-[0_20px_60px_rgba(2,8,23,0.45)] backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-white">{title}</div>
          <div className="text-xs uppercase tracking-[0.16em] text-slate-400">{subtitle}</div>
        </div>
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        </div>
      </div>
      <div className="space-y-3">
        {lines.map((line, i) => (
          <div key={i} className="rounded-2xl border border-white/6 bg-white/[0.04] px-3 py-3 text-sm text-slate-300">
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const web3FormsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim() || "";
  const [form, setForm] = useState({ name: "", email: "", business: "", message: "" });
  const [submitState, setSubmitState] = useState("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const currentYear = new Date().getFullYear();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setSubmitState("error");
      setSubmitMessage("Completa nombre, email y mensaje para enviarlo.");
      return;
    }

    if (!web3FormsAccessKey) {
      setSubmitState("error");
      setSubmitMessage("Falta configurar Web3Forms. Agrega la clave VITE_WEB3FORMS_ACCESS_KEY y vuelve a publicar el sitio.");
      return;
    }

    try {
      setSubmitState("submitting");
      setSubmitMessage("");

      const payload = new FormData();
      payload.append("access_key", web3FormsAccessKey);
      payload.append("name", form.name);
      payload.append("email", form.email);
      payload.append("business", form.business);
      payload.append("message", form.message);
      payload.append("subject", `Nuevo contacto desde Digital AM${form.business ? ` - ${form.business}` : ""}`);
      payload.append("from_name", "Digital AM");
      payload.append("replyto", form.email);
      payload.append("botcheck", "");

      const response = await fetch("https://api.web3forms.com/submit", {
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
          : data?.body?.message || data?.message || data?.error || data?.errors?.[0]?.message || "";

      if (!response.ok || (typeof data !== "string" && data?.success !== true)) {
        throw new Error(serviceMessage || `Web3Forms devolvió un error (${response.status}).`);
      }

      setSubmitState("success");
      setSubmitMessage("Mensaje enviado. Te responderé por correo lo antes posible.");
      setForm({ name: "", email: "", business: "", message: "" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "No se pudo enviar el formulario.";
      const looksLikeConfigIssue = /access key|unauthorized|invalid/i.test(message);

      setSubmitState("error");
      setSubmitMessage(
        looksLikeConfigIssue
          ? "La clave de Web3Forms no está bien configurada. Revisa VITE_WEB3FORMS_ACCESS_KEY y vuelve a publicar."
          : `${message} Si sigue fallando, revisa spam o escríbeme directo a ferkmas88@gmail.com.`
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#020611] text-slate-100">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.16),_transparent_22%),radial-gradient(circle_at_80%_18%,_rgba(14,165,233,0.08),_transparent_15%),linear-gradient(to_bottom,rgba(59,130,246,0.03),transparent_25%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(96,165,250,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.025)_1px,transparent_1px)] bg-[size:42px_42px]" />

      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#020611]/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <a href="#top" className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl border border-blue-400/25 bg-blue-500/10 shadow-[0_0_30px_rgba(37,99,235,0.15)]">
              <span className="text-sm font-black tracking-[0.24em] text-blue-300">AM</span>
            </div>
            <div>
              <div className="text-lg font-semibold text-white">Digital AM</div>
              <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Diseño web · Software · Automatización</div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-sm font-medium text-slate-300 transition hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-2xl border border-blue-400/20 bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_40px_rgba(37,99,235,0.28)] transition hover:bg-blue-500"
          >
            Hablar de un proyecto
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      <main id="top">
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
            <div className="flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-blue-300"
              >
                <Zap className="h-3.5 w-3.5" />
                Diseño de sistemas digitales con visión de negocio
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.04 }}
                className="max-w-4xl text-3xl font-semibold leading-[1.02] tracking-tight text-white sm:text-4xl md:text-[3.35rem] xl:text-[3.95rem]"
              >
                Sistemas digitales con claridad, estructura y buena ejecución
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.08 }}
                className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl"
              >
                Diseño sitios, software y automatizaciones para negocios que necesitan una presencia más sólida y procesos más claros. La idea es simple: que lo digital se vea bien, funcione bien y ayude de verdad al negocio.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.12 }}
                className="mt-8 flex flex-col gap-4 sm:flex-row"
              >
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 text-base font-semibold text-white shadow-[0_15px_45px_rgba(37,99,235,0.28)] transition hover:bg-blue-500"
                >
                  Ver proyectos actuales
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-base font-semibold text-white transition hover:border-blue-400/30 hover:bg-white/10"
                >
                  Escribirme directo
                  <Mail className="h-4 w-4" />
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.16 }}
                className="mt-10 grid gap-4 sm:grid-cols-3"
              >
                {stats.map((item) => (
                  <div key={item.label} className="rounded-[24px] border border-white/8 bg-white/[0.04] p-5">
                    <div className="text-3xl font-semibold text-white">{item.value}</div>
                    <div className="mt-2 text-sm font-medium text-slate-200">{item.label}</div>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative min-h-[680px] overflow-hidden rounded-[36px] border border-white/10 bg-[#040b19] shadow-[0_35px_100px_rgba(2,8,23,0.8)]"
            >
              <AdvancedCanvas />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_22%),linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent_26%,rgba(255,255,255,0.02))]" />

              <div className="absolute left-6 top-6 right-6 grid gap-4 md:grid-cols-2">
                <MockCard
                  title="Enfoque actual"
                  subtitle="Servicios y productos"
                  lines={[
                    "Sistemas de QR + SMS + reseñas",
                    "Automatización lista para escalar",
                    "Software a medida para operaciones reales",
                  ]}
                />
                <MockCard
                  title="Criterio detrás"
                  subtitle="Dirección estratégica"
                  lines={[
                    "Mayor profundidad que un servicio aislado",
                    "Sistemas con mejor capacidad de reutilización",
                    "Más valor estructural en cada proyecto",
                  ]}
                />
              </div>

              <div className="absolute bottom-6 left-6 right-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-[26px] border border-white/10 bg-[#08111f]/85 p-5 backdrop-blur-sm">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                    <Store className="h-4 w-4 text-blue-300" />
                    Sistemas para negocio local
                  </div>
                  <p className="text-sm leading-6 text-slate-300">
                    Soluciones para negocios que necesitan captar mejor, responder con agilidad y operar con más consistencia.
                  </p>
                </div>
                <div className="rounded-[26px] border border-white/10 bg-[#08111f]/85 p-5 backdrop-blur-sm">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                    <Workflow className="h-4 w-4 text-blue-300" />
                    Arquitectura del sistema
                  </div>
                  <p className="text-sm leading-6 text-slate-300">
                    No solo diseño visual. También lógica, procesos, estructura y margen real para escalar.
                  </p>
                </div>
                <div className="rounded-[26px] border border-white/10 bg-[#08111f]/85 p-5 backdrop-blur-sm">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                    <ShieldCheck className="h-4 w-4 text-blue-300" />
                    Mentalidad de construcción
                  </div>
                  <p className="text-sm leading-6 text-slate-300">
                    La meta es construir activos digitales más sólidos: software, automatización y sistemas sostenibles.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <SectionTitle
            eyebrow="Servicios"
            title="Servicios diseñados para aportar estructura, claridad y valor al negocio."
            text="Más allá de la presencia digital, el objetivo es construir una base que permita captar mejor, responder con más precisión y operar con una lógica más sólida."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className="group rounded-[28px] border border-white/8 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-blue-400/20 hover:bg-white/[0.06]"
                >
                  <div className="mb-5 inline-flex rounded-2xl border border-blue-400/20 bg-blue-500/10 p-3 text-blue-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                  <p className="mt-3 leading-7 text-slate-300">{service.description}</p>
                  <div className="mt-5 space-y-3">
                    {service.bullets.map((bullet) => (
                      <div key={bullet} className="flex items-start gap-3 text-sm text-slate-400">
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
          <SectionTitle
            eyebrow="Proyectos actuales"
            title="Una selección de proyectos alineados con la dirección que estoy construyendo hoy."
            text="Cada uno responde a una lógica concreta: resolver mejor, presentar mejor y crear sistemas con mayor proyección."
          />

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className="rounded-[30px] border border-white/8 bg-[#06101d] p-6"
                >
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
                      {project.status}
                    </span>
                    <div className="h-2.5 w-2.5 rounded-full bg-blue-400 shadow-[0_0_16px_rgba(96,165,250,0.8)]" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-4 leading-7 text-slate-300">{project.text}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tech.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-300">
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
          <SectionTitle
            eyebrow="Proceso"
            title="Cada proyecto parte de una lectura precisa del problema."
            text="A partir de ahí se define la estructura, la herramienta y la mejor forma de construir una solución con sentido, coherencia y recorrido."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-4">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="rounded-[28px] border border-white/8 bg-white/[0.04] p-6"
              >
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 font-semibold text-white">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{item.text}</p>
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
                  Filosofía de trabajo
                </div>
                <h3 className="max-w-2xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
                  Un sistema bien pensado mejora la presencia del negocio y también la forma en que se trabaja por dentro.
                </h3>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-50/85">
                  No se trata de meter herramientas porque sí, sino de construir una base digital coherente, útil y lista para acompañar el crecimiento con más orden.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  [MessageSquare, "Captación y seguimiento", "Procesos más claros para atraer clientes y sostener cada conversación con mejor criterio."],
                  [Globe, "Visión de producto", "Pensar en soluciones útiles, sostenibles y alineadas con una marca que quiere elevar su nivel."],
                  [Send, "Automatización", "Una base preparada para integrar flujos más avanzados cuando el proyecto lo requiera."],
                  [MapPin, "Base en Louisville", "Trabajo con contexto local, ejecución digital y una visión diseñada para proyectarse."],
                ].map(([Icon, title, text]) => (
                  <div key={title} className="rounded-3xl border border-white/10 bg-black/20 p-5 backdrop-blur-sm">
                    <Icon className="h-5 w-5 text-blue-200" />
                    <div className="mt-4 text-lg font-semibold text-white">{title}</div>
                    <div className="mt-2 text-sm leading-6 text-blue-50/75">{text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[30px] border border-white/8 bg-white/[0.04] p-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
                <Mail className="h-3.5 w-3.5" />
                Contacto
              </div>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white md:text-4xl">Si tienes una idea o un negocio en marcha, conversemos.</h2>
              <p className="mt-4 max-w-xl leading-7 text-slate-300">
                Cuéntame qué quieres mejorar y reviso contigo la mejor forma de aterrizarlo: sitio web, software, automatización o una mezcla de varias piezas.
              </p>

              <div className="mt-8 space-y-4">
                <a
                  href="mailto:ferkmas88@gmail.com"
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-slate-200 transition hover:border-blue-400/20 hover:bg-white/[0.06]"
                >
                  <Mail className="h-4 w-4 text-blue-300" />
                  ferkmas88@gmail.com
                </a>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-slate-300">
                  <MapPin className="h-4 w-4 text-blue-300" />
                  Louisville, Kentucky
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-[30px] border border-white/8 bg-[#071120] p-8 shadow-[0_20px_80px_rgba(2,8,23,0.45)]"
            >
              <div className="mb-6 text-xl font-semibold text-white">Cuéntame qué te gustaría construir o mejorar</div>
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  required
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-white outline-none placeholder:text-slate-500 focus:border-blue-400/30"
                  placeholder="Nombre"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                />
                <input
                  type="email"
                  name="email"
                  required
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-white outline-none placeholder:text-slate-500 focus:border-blue-400/30"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                />
              </div>
              <input
                type="text"
                name="business"
                className="mt-4 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-white outline-none placeholder:text-slate-500 focus:border-blue-400/30"
                placeholder="Negocio o proyecto"
                value={form.business}
                onChange={(e) => setForm((f) => ({ ...f, business: e.target.value }))}
              />
              <textarea
                name="message"
                required
                className="mt-4 min-h-[150px] w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-white outline-none placeholder:text-slate-500 focus:border-blue-400/30"
                placeholder="Cuéntame un poco sobre tu negocio, tu proyecto o la oportunidad que quieres desarrollar."
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              />

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={submitState === "submitting"}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 text-base font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-900/70"
                >
                  {submitState === "submitting" ? "Enviando..." : "Enviar mensaje"}
                  <Send className="h-4 w-4" />
                </button>
                <a
                  href="mailto:ferkmas88@gmail.com"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 text-base font-semibold text-white transition hover:border-blue-400/20 hover:bg-white/[0.06]"
                >
                  Escribirme directo
                  <Mail className="h-4 w-4" />
                </a>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-400">
                {submitState === "success" && <span className="text-emerald-300">{submitMessage}</span>}
                {submitState === "error" && <span className="text-rose-300">{submitMessage}</span>}
                {submitState === "idle" && "Cuando quede configurada la clave de Web3Forms, los mensajes deberían llegar directo a tu correo."}
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-black/20">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-xs text-slate-500 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>© {currentYear} Digital AM.</p>
          <p>Sitio diseñado y desarrollado por Fernando Martínez.</p>
        </div>
      </footer>
    </div>
  );
}

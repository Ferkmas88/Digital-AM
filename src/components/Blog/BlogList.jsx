import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { blogPosts } from "../../content/blog";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export default function BlogList() {
  return (
    <div className="min-h-screen bg-[#070809] font-sans text-[#F5F7FA]">
      <div className="pointer-events-none fixed inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#070809]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
              <span className="text-xs font-bold tracking-[0.2em] text-blue-300">AM</span>
            </div>
            <span className="text-[15px] font-semibold text-white">Digital AM</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-[#9AA3AE] transition hover:text-white">← Inicio</Link>
            <a href="/#contact" className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#070809] transition hover:bg-white/90">
              Auditoría Gratis
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        {/* Page title */}
        <motion.div {...fadeUp} className="mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400 mb-4">Blog</p>
          <h1 className="text-4xl font-bold text-white lg:text-5xl">
            Marketing Digital para<br />Negocios en Louisville
          </h1>
          <p className="mt-5 max-w-xl text-lg text-[#9AA3AE]">
            Casos de éxito, estrategias y consejos para hacer crecer tu negocio con presencia digital.
          </p>
        </motion.div>

        {/* Posts grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <motion.article key={post.slug} {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex flex-col rounded-[20px] border border-white/[0.07] bg-[#0D1117] overflow-hidden transition hover:-translate-y-1">

              {/* Image */}
              <div className="relative overflow-hidden aspect-[16/9]">
                <img src={post.image} alt={post.title}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/60 to-transparent" />
                <span className="absolute top-4 left-4 rounded-full bg-blue-500/20 border border-blue-500/30 px-3 py-1 text-xs font-semibold text-blue-300">
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3 text-xs text-[#9AA3AE]/60 mb-3">
                  <span>{new Date(post.date).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                </div>
                <h2 className="text-lg font-semibold text-white leading-snug mb-3 group-hover:text-blue-300 transition">
                  {post.title}
                </h2>
                <p className="text-sm leading-6 text-[#9AA3AE] flex-1">{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#9AA3AE] transition group-hover:text-white">
                  Leer más <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </main>

      {/* Footer CTA */}
      <div className="border-t border-white/[0.06] mt-20">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">¿Listo para hacer crecer tu negocio?</h2>
          <p className="text-[#9AA3AE] mb-8">Primera auditoría digital completamente gratis.</p>
          <a href="/#contact"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#070809] transition hover:bg-white/90">
            Solicitar auditoría gratis <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";
import { blogPosts } from "../../content/blog";

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prev = blogPosts[currentIndex - 1];
  const next = blogPosts[currentIndex + 1];

  return (
    <div className="min-h-screen bg-[#070809] font-sans text-[#F5F7FA]">
      <div className="pointer-events-none fixed inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#070809]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
              <span className="text-xs font-bold tracking-[0.2em] text-blue-300">AM</span>
            </div>
            <span className="text-[15px] font-semibold text-white">Digital AM</span>
          </Link>
          <Link to="/blog" className="text-sm font-medium text-[#9AA3AE] transition hover:text-white flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Blog
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        {/* Hero image */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="rounded-[24px] overflow-hidden mb-12 border border-white/[0.07]">
          <img src={post.image} alt={post.title} className="w-full h-[400px] object-cover" />
        </motion.div>

        {/* Article */}
        <motion.article initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          {/* Meta */}
          <div className="flex items-center gap-4 mb-6">
            <span className="rounded-full bg-blue-500/20 border border-blue-500/30 px-3 py-1 text-xs font-semibold text-blue-300">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[#9AA3AE]/60">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(post.date).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[#9AA3AE]/60">
              <Clock className="h-3.5 w-3.5" /> {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-white lg:text-4xl leading-snug mb-10">
            {post.title}
          </h1>

          {/* Content */}
          <div
            className="prose-blog"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.article>

        {/* CTA box */}
        <div className="mt-16 rounded-[24px] border border-blue-500/20 bg-blue-500/5 p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-3">¿Tu negocio necesita esto?</h3>
          <p className="text-[#9AA3AE] mb-6">Primera auditoría digital completamente gratis. Sin compromiso.</p>
          <a href="/#contact"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#070809] transition hover:bg-white/90">
            Solicitar auditoría gratis <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Prev / Next */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {prev && (
            <Link to={`/blog/${prev.slug}`}
              className="flex flex-col gap-2 rounded-[16px] border border-white/[0.07] bg-[#0D1117] p-6 transition hover:border-white/20">
              <span className="text-xs text-[#9AA3AE]/60 flex items-center gap-1"><ArrowLeft className="h-3 w-3" /> Anterior</span>
              <span className="text-sm font-semibold text-white">{prev.title}</span>
            </Link>
          )}
          {next && (
            <Link to={`/blog/${next.slug}`}
              className="flex flex-col gap-2 rounded-[16px] border border-white/[0.07] bg-[#0D1117] p-6 transition hover:border-white/20 sm:text-right">
              <span className="text-xs text-[#9AA3AE]/60 flex items-center gap-1 sm:justify-end">Siguiente <ArrowRight className="h-3 w-3" /></span>
              <span className="text-sm font-semibold text-white">{next.title}</span>
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}

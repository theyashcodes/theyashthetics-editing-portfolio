import { useState, useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useInView } from 'motion/react'
import { ArrowUpRight, Menu, X, Play, Volume2, VolumeX, Phone, Mail, MessageCircle, ChevronRight } from 'lucide-react'

// ─── Custom Icons ─────────────────────────────────────────────────────────────
function InstagramIcon({ size = 15, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function WhatsAppIcon({ size = 15, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

// ─── useTypewriter ────────────────────────────────────────────────────────────
function useTypewriter(text, speed = 42, startDelay = 700) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    const timer = setTimeout(() => {
      const iv = setInterval(() => {
        setDisplayed(text.slice(0, i + 1))
        i++
        if (i >= text.length) { clearInterval(iv); setDone(true) }
      }, speed)
      return () => clearInterval(iv)
    }, startDelay)
    return () => clearTimeout(timer)
  }, [text, speed, startDelay])
  return { displayed, done }
}

// ─── AnimatedCounter ─────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = '', duration = 2000, delay = 0 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = Math.ceil(target / (duration / 16))
    const timer = setTimeout(() => {
      const iv = setInterval(() => {
        start += step
        if (start >= target) { setCount(target); clearInterval(iv) }
        else setCount(start)
      }, 16)
      return () => clearInterval(iv)
    }, delay)
    return () => clearTimeout(timer)
  }, [inView, target, duration, delay])
  return <span ref={ref}>{count}{suffix}</span>
}

// ─── FadeIn wrapper ──────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ dark = false }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const textBase = dark ? 'text-white/90' : 'text-neutral-900'
  const textMuted = dark ? 'text-white/40 hover:text-white' : 'text-neutral-400 hover:text-neutral-900'
  const logoDot = dark ? 'text-white/30 group-hover:text-white/70' : 'text-neutral-400 group-hover:text-neutral-700'
  const ctaBorder = dark ? 'border-white/30 hover:border-white' : 'border-neutral-200 hover:border-neutral-900'
  const ctaText = dark ? 'text-white/90' : 'text-neutral-900'
  const links = [
    { label: 'Work',    href: '#work' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ]

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-50 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto w-full"
      >
        <a href="/" className="flex items-center gap-2 group select-none">
          <span className={`text-[10px] tracking-widest transition-colors duration-300 ${logoDot}`}>&#10022;</span>
          <span className={`text-[13px] font-medium tracking-[0.14em] lowercase ${textBase}`}>theyashthetics</span>
        </a>

        <ul className="hidden lg:flex items-center gap-10">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} className={`text-[13px] font-normal transition-colors duration-300 tracking-wide ${textMuted}`}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="mailto:iamyash.200@gmail.com?subject=Project%20Inquiry"
          className={`hidden lg:flex items-center gap-1.5 text-[12px] font-normal tracking-[0.06em] border-b pb-0.5 transition-colors duration-300 group ${ctaText} ${ctaBorder}`}
        >
          Let&apos;s work
          <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </a>

        <button onClick={() => setMenuOpen(true)} className={`lg:hidden p-1 ${dark ? 'text-white' : 'text-neutral-700'}`} aria-label="Open menu">
          <Menu size={19} />
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-[#FAFAF9] flex flex-col px-8 py-6"
          >
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-medium tracking-[0.14em] text-neutral-900 lowercase">theyashthetics</span>
              <button onClick={() => setMenuOpen(false)} className="p-1 text-neutral-700"><X size={19} /></button>
            </div>
            <ul className="flex flex-col gap-6 mt-16">
              {links.map((l, i) => (
                <motion.li
                  key={l.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a href={l.href} onClick={() => setMenuOpen(false)} className="text-4xl font-light text-neutral-900 tracking-tight hover:text-neutral-400 transition-colors duration-200">
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-2">
              <a href="mailto:iamyash.200@gmail.com" className="text-sm text-neutral-400 tracking-wide">iamyash.200@gmail.com</a>
              <a href="tel:+918533017236" className="text-sm text-neutral-400 tracking-wide">+91 85330 17236</a>
              <span className="text-[10px] text-neutral-300 tracking-widest uppercase mt-2">2025 &copy; theyashthetics</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ─── HeroBackground ──────────────────────────────────────────────────────────
function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden w-full h-full">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: 'easeOut' }}
      >
        <img
          src="/hero_bg.jpg"
          alt="Cinematic visual"
          className="w-full h-full object-cover object-center lg:object-right"
          fetchPriority="high"
        />
      </motion.div>
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-transparent to-black/20" />
      <div className="absolute inset-0 z-10 bg-black/45 lg:hidden" />
    </div>
  )
}

// ─── HeroContent ─────────────────────────────────────────────────────────────
function HeroContent({ headline, subtitle }) {
  const { displayed, done } = useTypewriter(headline, 38, 600)

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 16, filter: 'blur(5px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <div className="w-full py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-6 w-full">

        <motion.div {...fadeUp(0.2)} className="flex items-center gap-2.5 mb-8">
          <div className="w-4 h-px bg-white/40" />
          <span className="text-[10px] uppercase tracking-[0.24em] text-white/50 font-light">Video Editor &middot; theyashthetics</span>
        </motion.div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-light tracking-[-0.02em] leading-[1.08] text-white mb-8 whitespace-pre-line min-h-[2.2em]">
          {displayed}
          {!done && <span className="animate-blink font-extralight text-white/40 ml-0.5">|</span>}
        </h1>

        <motion.p {...fadeUp(1.8)} className="text-[15px] sm:text-[17px] text-white/60 leading-relaxed max-w-[520px] mb-10 font-light">
          {subtitle}
        </motion.p>

        <motion.div {...fadeUp(2.2)} className="flex flex-wrap items-center gap-4">
          <a
            href="#work"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-neutral-900 text-[13px] font-medium tracking-wide rounded-full hover:bg-neutral-100 transition-colors duration-200"
          >
            See Relevant Work
            <ChevronRight size={14} />
          </a>
          <a
            href="https://wa.me/918533017236?text=Hi%20Yash%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/30 text-white text-[13px] font-normal tracking-wide rounded-full hover:border-white/60 hover:bg-white/5 transition-all duration-200"
          >
            Book a Call
            <ArrowUpRight size={13} />
          </a>
        </motion.div>

      </div>
    </div>
  )
}

// ─── TrustStrip ──────────────────────────────────────────────────────────────
function TrustStrip() {
  const clients = [
    { name: 'Pan Pacific Singapore', initials: 'PP', color: 'bg-emerald-900 text-emerald-100' },
    { name: 'Taj Amritsar', initials: 'TA', color: 'bg-amber-800 text-amber-100' },
    { name: 'Salim Merchant Event', initials: 'SM', color: 'bg-violet-900 text-violet-100' },
    { name: 'Media Scoop', initials: 'MS', color: 'bg-sky-900 text-sky-100' },
  ]

  const indicators = [
    { label: 'International Projects' },
    { label: 'Hospitality Experience' },
    { label: 'Event & Brand Content' },
    { label: 'Fast Turnaround' },
  ]

  return (
    <FadeIn>
      <section className="px-6 pt-12 pb-10 max-w-7xl mx-auto">
        <p className="text-[10px] uppercase tracking-[0.24em] text-neutral-400 mb-6 font-light">Trusted By</p>
        <div className="flex flex-wrap gap-2.5 mb-8">
          {clients.map(c => (
            <div key={c.name} className="trust-client">
              <span className={`trust-initial ${c.color}`}>{c.initials}</span>
              {c.name}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-6 md:gap-12 pt-6 border-t border-neutral-200/50">
          {indicators.map(({ label }) => (
            <div key={label} className="flex flex-col">
              <span className="text-[28px] font-light text-neutral-900 tracking-tight leading-none mb-1">✓</span>
              <span className="text-[10px] text-neutral-400 tracking-[0.16em] uppercase font-light">{label}</span>
            </div>
          ))}
        </div>
      </section>
    </FadeIn>
  )
}

// ─── VideoBreakdown (outreach pages only) ────────────────────────────────────
function VideoBreakdown() {
  const steps = [
    { num: '1', title: 'Send', desc: 'Share your current videos or social links' },
    { num: '2', title: 'Review', desc: "I'll analyze pacing, retention signals, and presentation quality" },
    { num: '3', title: 'Report', desc: 'You get a clear breakdown of what to fix — free, no strings' },
  ]

  return (
    <FadeIn>
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl px-8 py-14 md:px-14 text-center">
          <p className="text-[10px] uppercase tracking-[0.24em] text-emerald-400/70 mb-4 font-light">Free Offer</p>
          <h2 className="text-2xl md:text-3xl font-light text-white tracking-tight mb-3">
            Get a Free Video Breakdown
          </h2>
          <p className="text-[15px] text-white/50 font-light max-w-lg mx-auto mb-12 leading-relaxed">
            I&apos;ll review one of your current videos and show you exactly where viewers drop off and what I&apos;d improve.
          </p>

          <div className="flex flex-col md:flex-row gap-6 md:gap-0 max-w-2xl mx-auto mb-12">
            {steps.map((s, i) => (
              <div key={s.num} className="flex-1 flex flex-col items-center text-center gap-3 relative">
                <div className="w-9 h-9 rounded-full bg-white text-neutral-900 flex items-center justify-center text-[13px] font-semibold">
                  {s.num}
                </div>
                <p className="text-[14px] font-medium text-white">{s.title}</p>
                <p className="text-[12px] text-white/40 font-light leading-relaxed max-w-[200px]">{s.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-4 left-[60%] w-[80%] h-px bg-white/10" />
                )}
              </div>
            ))}
          </div>

          <a
            href="mailto:iamyash.200@gmail.com?subject=Free%20Video%20Breakdown%20Request&body=Hi%20Yash%2C%0A%0AI%27d%20like%20a%20free%20video%20breakdown.%20Here%20are%20my%20current%20videos%3A%0A%0A"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-neutral-900 text-[13px] font-medium tracking-wide rounded-full hover:bg-neutral-100 transition-colors duration-200"
          >
            Get Your Free Breakdown
            <ArrowUpRight size={13} />
          </a>
        </div>
      </section>
    </FadeIn>
  )
}

// ─── VideoCard ────────────────────────────────────────────────────────────────
function VideoCard({ src, title, tag, subtitle, delay = 0, orientation = 'landscape' }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (playing) { v.pause(); setPlaying(false) }
    else { v.play().catch(() => {}); setPlaying(true) }
  }

  const toggleMute = (e) => {
    e.stopPropagation()
    const v = videoRef.current
    if (!v) return
    v.muted = !muted
    setMuted(!muted)
  }

  const aspectClass = orientation === 'portrait' ? 'aspect-[9/16]' : 'aspect-video'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-2xl bg-neutral-100/50 border border-neutral-200/40 cursor-pointer shadow-sm hover:shadow-[0_24px_50px_rgba(0,0,0,0.06)] hover:border-neutral-300/80 transition-all duration-500 ${aspectClass}`}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="metadata"
        loop
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        onEnded={() => setPlaying(false)}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent transition-opacity duration-400 opacity-100 lg:opacity-0 lg:group-hover:opacity-100" />

      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!playing ? (
            <motion.div
              key="play"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg transition-opacity duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
            >
              <Play size={16} className="text-neutral-900 ml-0.5" fill="currentColor" />
            </motion.div>
          ) : (
            <motion.div
              key="pause"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.7 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-11 h-11 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center"
            >
              <div className="flex gap-1">
                <div className="w-[3px] h-4 bg-white rounded-full" />
                <div className="w-[3px] h-4 bg-white rounded-full" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-4 py-3 flex items-end justify-between transition-all duration-300 opacity-100 translate-y-0 lg:opacity-0 lg:translate-y-2 lg:group-hover:opacity-100 lg:group-hover:translate-y-0">
        <div className="flex-1 min-w-0 pr-3">
          {tag && <span className="text-[9px] uppercase tracking-[0.18em] text-white/60 font-light block mb-0.5 truncate">{tag}</span>}
          <p className="text-[13px] font-normal text-white leading-tight truncate">{title}</p>
          {subtitle && <span className="text-[10.5px] text-white/75 font-light block mt-0.5 truncate">{subtitle}</span>}
        </div>
        <button
          onClick={toggleMute}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/25 transition-colors"
        >
          {muted ? <VolumeX size={12} className="text-white" /> : <Volume2 size={12} className="text-white" />}
        </button>
      </div>
    </motion.div>
  )
}

// ─── Project Data (ordered: commercial-first, then events/personal) ──────────
const ALL_PROJECTS = [
  // Strongest commercial work first
  { src: '/pan-pacific-singapore.mp4', title: 'Pan Pacific Singapore', tag: 'HOSPITALITY · BRAND FILM', subtitle: '5-Star Hotel Brand Film', orientation: 'landscape', categories: ['hospitality'] },
  { src: '/taj-amritsar.mp4', title: 'Taj Amritsar', tag: 'HOSPITALITY · BRAND FILM', subtitle: 'Luxury Hospitality Showcase', orientation: 'landscape', categories: ['hospitality'] },
  { src: '/pan-pacific-shorts.mp4', title: 'Pan Pacific — Social Reel', tag: 'HOSPITALITY · BRAND FILM', subtitle: 'Hospitality Social Campaign', orientation: 'portrait', categories: ['hospitality'] },
  { src: '/mukteshwar-cinematic.mp4', title: 'Mukteshwar', tag: 'REAL ESTATE · WALKTHROUGH', subtitle: 'Luxury Lifestyle Content', orientation: 'landscape', categories: ['real-estate'] },
  { src: '/varanasi-cinematic.mp4', title: 'Varanasi', tag: 'REAL ESTATE · WALKTHROUGH', subtitle: 'Destination Storytelling', orientation: 'landscape', categories: ['real-estate'] },
  // Events & personal brands lower
  { src: '/salim-sulaiman-concert-edit.mp4', title: 'Salim-Sulaiman — Live', tag: 'EVENT · AFTERMOVIE', subtitle: 'Concert Highlights & Aftermovie', orientation: 'landscape', categories: ['events'] },
  { src: '/salim-sulaiman-promo.mp4', title: 'Salim-Sulaiman — Promo', tag: 'PERSONAL BRAND · CONTENT', subtitle: 'Personal Brand Promotion', orientation: 'portrait', categories: ['personal-brands'] },
  { src: '/true-detective-intro-remake.mp4', title: 'True Detective — Remake', tag: 'PERSONAL BRAND · CONTENT', subtitle: 'Cinematic Production Showcase', orientation: 'landscape', categories: ['personal-brands'] },
  { src: '/techwalk2-short.mp4', title: 'TechWalk', tag: 'EVENT · AFTERMOVIE', subtitle: 'Event Highlight Reel', orientation: 'portrait', categories: ['events'] },
  { src: '/semicon-summit-glau.mp4', title: 'Semicon Summit', tag: 'EVENT · AFTERMOVIE', subtitle: 'Corporate Summit Recap', orientation: 'portrait', categories: ['events'] },
]

// ─── WorkSection ─────────────────────────────────────────────────────────────
function WorkSection({ title = 'Selected Work', subtitle = 'Work organized by industry. Click tabs to filter.', filter = null }) {
  const [activeTab, setActiveTab] = useState('all')
  const showTabs = !filter
  const tabs = ['all', 'hospitality', 'real-estate', 'events', 'personal-brands']
  const tabLabels = { 'all': 'All', 'hospitality': 'Hospitality', 'real-estate': 'Real Estate', 'events': 'Events', 'personal-brands': 'Personal Brands' }

  const effectiveFilter = filter || (activeTab === 'all' ? null : activeTab)
  const projects = effectiveFilter
    ? ALL_PROJECTS.filter(p => p.categories.includes(effectiveFilter))
    : ALL_PROJECTS

  const landscape = projects.filter(p => p.orientation === 'landscape')
  const portrait = projects.filter(p => p.orientation === 'portrait')

  return (
    <FadeIn>
      <section id="work" className="px-6 py-16 max-w-7xl mx-auto">
        <div className="mb-10 pb-4 border-b border-neutral-200/50">
          <h2 className="text-2xl md:text-3xl font-light text-neutral-900 tracking-tight mb-1">{title}</h2>
          <p className="text-[12px] text-neutral-400 font-light tracking-wide">{subtitle}</p>
        </div>

        {showTabs && (
          <div className="flex flex-wrap gap-2 mb-10">
            {tabs.map(t => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`cat-tab ${activeTab === t ? 'active' : ''}`}
              >
                {tabLabels[t]}
              </button>
            ))}
          </div>
        )}

        {landscape.length > 0 && (
          <div className={`grid grid-cols-1 ${landscape.length > 1 ? 'md:grid-cols-2' : ''} gap-5 mb-8`}>
            {landscape.map((v, i) => <VideoCard key={v.src} {...v} delay={i * 0.1} />)}
          </div>
        )}

        {portrait.length > 0 && (
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            {portrait.map((v, i) => (
              <div key={v.src} className="w-full max-w-[320px] md:w-[280px] lg:w-[300px] flex-shrink-0">
                <VideoCard {...v} delay={i * 0.1} />
              </div>
            ))}
          </div>
        )}

        {projects.length === 0 && (
          <p className="text-neutral-400 text-sm py-12 text-center">No projects in this category yet.</p>
        )}
      </section>
    </FadeIn>
  )
}

// ─── CaseStudies ─────────────────────────────────────────────────────────────
function CaseStudies() {
  const cases = [
    {
      challenge: 'Property footage looked flat and generic.',
      changed: 'Color grading, pacing, motion graphics and sound design.',
      result: 'Premium luxury presentation with stronger audience retention.',
    },
    {
      challenge: 'Hotel needed content for multiple platforms.',
      changed: 'Created long-form brand film + short-form reels from same footage.',
      result: 'Consistent brand identity across Instagram, YouTube and website.',
    },
    {
      challenge: 'Event coverage felt like raw footage.',
      changed: 'Dynamic editing, beat-synced cuts, and energy-driven pacing.',
      result: 'Professional recap that drove engagement and future attendance.',
    },
  ]

  return (
    <FadeIn>
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <div className="mb-10 pb-4 border-b border-neutral-200/50">
          <h2 className="text-2xl md:text-3xl font-light text-neutral-900 tracking-tight">Why Clients Hire Me</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cases.map((c, i) => (
            <div key={i} className="case-card">
              <div className="mb-5">
                <p className="case-label text-red-400">Challenge</p>
                <p className="text-[14px] text-neutral-700 leading-relaxed font-light">{c.challenge}</p>
              </div>
              <div className="mb-5">
                <p className="case-label text-amber-500">What Changed</p>
                <p className="text-[14px] text-neutral-700 leading-relaxed font-light">{c.changed}</p>
              </div>
              <div>
                <p className="case-label text-emerald-500">Result</p>
                <p className="text-[14px] text-neutral-700 leading-relaxed font-light">{c.result}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </FadeIn>
  )
}

// ─── CommunityFeedback ───────────────────────────────────────────────────────
function CommunityFeedback() {
  const cards = [
    { src: '/comment_1.jpg', alt: "Instagram comment: Never misses a chance to cook 💪🥳" },
    { src: '/comment_2.jpg', alt: "Instagram comment: Woah.. the edit!! 🙌🔥" },
    { src: '/comment_3.jpg', alt: "Instagram comment: Thank you for this ❤️" },
  ]

  return (
    <FadeIn>
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[10px] uppercase tracking-[0.24em] text-emerald-400 font-semibold mb-3">REAL AUDIENCE REACTIONS</p>
          <h2 className="text-3xl md:text-4xl font-light text-neutral-900 tracking-tight mb-3">Community Feedback</h2>
          <p className="text-[15px] text-neutral-400 font-light max-w-lg mx-auto">Real reactions from creators, audiences and collaborators.</p>
        </div>

        <div className="instagram-grid-container mb-10">
          {cards.map((card, idx) => (
            <div key={idx} className="instagram-card-wrapper">
              <div className="instagram-card-inner">
                <img
                  src={card.src}
                  alt={card.alt}
                  className="instagram-comment-img"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-[11px] text-neutral-400 font-light tracking-wide mt-10">
          &ldquo;Screenshots taken from public Instagram interactions.&rdquo;
        </p>
      </section>
    </FadeIn>
  )
}

// ─── HowWeWork ───────────────────────────────────────────────────────────────
function HowWeWork() {
  const steps = [
    { num: '01', title: 'Share Your Footage', desc: 'Upload your raw files or share a drive link. Tell me the goal.' },
    { num: '02', title: 'Strategy & Direction', desc: 'I plan the edit — pacing, music, color direction — before touching the timeline.' },
    { num: '03', title: 'First Cut in 48–72 hrs', desc: 'You receive the first draft. Two rounds of revisions included.' },
    { num: '04', title: 'Final Delivery', desc: 'Export optimized for every platform — Instagram, YouTube, website, ads.' },
  ]

  return (
    <FadeIn>
      <section id="process" className="px-6 py-16 max-w-7xl mx-auto">
        <div className="mb-10 pb-4 border-b border-neutral-200/50">
          <h2 className="text-2xl md:text-3xl font-light text-neutral-900 tracking-tight mb-1">How We Work</h2>
          <p className="text-[12px] text-neutral-400 font-light tracking-wide">Simple process. Premium results.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map(s => (
            <div key={s.num} className="process-step">
              <p className="process-step-num">{s.num}</p>
              <p className="text-[15px] font-medium text-neutral-800 mb-2">{s.title}</p>
              <p className="text-[13px] text-neutral-500 font-light leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </FadeIn>
  )
}

// ─── Services ────────────────────────────────────────────────────────────────
function Services() {
  const services = [
    { title: 'Real Estate Videos', desc: 'Showcase properties. Attract inquiries.' },
    { title: 'Hospitality Films', desc: 'Elevate brand perception. Drive bookings.' },
    { title: 'Short Form Reels', desc: 'Improve watch time. Boost retention.' },
    { title: 'Restaurant Content', desc: 'Make viewers hungry. Bring them in.' },
    { title: 'Personal Brand Editing', desc: 'Build authority. Grow your audience.' },
    { title: 'YouTube Editing', desc: 'Optimize retention. Convert subscribers.' },
  ]

  return (
    <FadeIn>
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <div className="mb-10 pb-4 border-b border-neutral-200/50">
          <h2 className="text-2xl md:text-3xl font-light text-neutral-900 tracking-tight">What I Edit</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map(s => (
            <div key={s.title} className="service-card">
              <p className="text-[15px] font-medium text-neutral-800 mb-2">{s.title}</p>
              <p className="text-[13px] text-neutral-500 font-light leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </FadeIn>
  )
}

// ─── FloatingCTA ─────────────────────────────────────────────────────────────
function FloatingCTA() {
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (!e.target.closest('.floating-cta')) setOpen(false)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [open])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="floating-cta"
        >
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
                className="floating-cta-menu"
              >
                <a href="mailto:iamyash.200@gmail.com?subject=Project%20Inquiry">
                  <Mail size={15} className="text-neutral-400" />
                  Email
                </a>
                <a href="https://instagram.com/theyashthetics" target="_blank" rel="noopener noreferrer">
                  <InstagramIcon size={15} className="text-neutral-400" />
                  Instagram
                </a>
                <a href="https://wa.me/918533017236?text=Hi%20Yash%2C%20I%20saw%20your%20portfolio." target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon size={15} className="text-neutral-400" />
                  WhatsApp
                </a>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            className="floating-cta-btn"
            onClick={(e) => { e.stopPropagation(); setOpen(!open) }}
          >
            <MessageCircle size={15} />
            Let&apos;s Talk
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Footer / Contact ─────────────────────────────────────────────────────────
function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const contacts = [
    { icon: Mail,          label: 'iamyash.200@gmail.com',  href: 'mailto:iamyash.200@gmail.com?subject=Project%20Inquiry' },
    { icon: Phone,         label: '+91 85330 17236',         href: 'tel:+918533017236' },
    { icon: InstagramIcon, label: '@theyashthetics',         href: 'https://instagram.com/theyashthetics' },
    { icon: WhatsAppIcon,  label: 'WhatsApp',                href: 'https://wa.me/918533017236?text=Hi%20Yash%2C%20I%20saw%20your%20portfolio.' },
  ]

  return (
    <footer id="contact" className="border-t border-neutral-200/50 bg-transparent px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-neutral-900 tracking-tight leading-[1.05] mb-4 max-w-2xl">
            Need content that actually gets watched?
          </h2>
          <p className="text-[16px] text-neutral-400 font-light mb-6 max-w-lg">Let&apos;s discuss your next project.</p>
          <p className="text-[12px] text-neutral-400 font-light tracking-wide mb-6">Average response time: within 24 hours</p>

          <div className="flex flex-wrap gap-4 mb-16">
            {contacts.map(({ icon: Icon, label, href }) => (
              <a
                key={href}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-3 px-5 py-3.5 rounded-xl border border-neutral-200/60 bg-white/60 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 hover:-translate-y-1 hover:shadow-lg hover:shadow-neutral-200/40 transition-all duration-300 group backdrop-blur-sm"
              >
                <Icon size={15} className="text-neutral-400 group-hover:text-white transition-colors duration-300" />
                <span className="text-[13px] font-normal text-neutral-700 group-hover:text-white transition-colors duration-300 tracking-wide">{label}</span>
              </a>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-neutral-100">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-neutral-300 tracking-widest">&#10022;</span>
              <span className="text-[11px] font-medium tracking-[0.14em] text-neutral-400 lowercase">theyashthetics</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-[10px] text-neutral-300 tracking-widest uppercase">Video Editor</span>
              <span className="text-[10px] text-neutral-200 tracking-widest">|</span>
              <span className="text-[10px] text-neutral-300 tracking-widest uppercase">&copy; 2025</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

// ─── Page Layouts ─────────────────────────────────────────────────────────────

function MainPage() {
  return (
    <>
      <div className="relative min-h-[100dvh] flex flex-col justify-between">
        <HeroBackground />
        <Navbar dark />
        <div className="relative z-10 flex-grow flex flex-col justify-center">
          <HeroContent
            headline={"Content that drives views,\ninquiries & bookings."}
            subtitle="I help real estate brands, hotels and personal brands turn raw footage into content that increases attention, generates inquiries and drives bookings."
          />
        </div>
      </div>

      <div className="cinematic-bg border-t border-neutral-200/30">
        <TrustStrip />
        <WorkSection />
        <CaseStudies />
        <CommunityFeedback />
        <HowWeWork />
        <Services />
        <Footer />
      </div>

      <FloatingCTA />
    </>
  )
}

function RealEstatePage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <>
      <div className="relative min-h-[100dvh] flex flex-col justify-between">
        <HeroBackground />
        <Navbar dark />
        <div className="relative z-10 flex-grow flex flex-col justify-center">
          <HeroContent
            headline={"Video editing for luxury\nreal estate & property marketing."}
            subtitle="I help real estate brands, hotels and personal brands turn raw footage into content that increases attention, generates inquiries and drives bookings."
          />
        </div>
      </div>

      <div className="cinematic-bg border-t border-neutral-200/30">
        <TrustStrip />
        <VideoBreakdown />
        <WorkSection
          title="Content for Realtors & Luxury Property Brands"
          subtitle="Designed for agents, brokerages and luxury property marketing."
          filter="real-estate"
        />
        <CaseStudies />
        <CommunityFeedback />
        <HowWeWork />
        <Footer />
      </div>

      <FloatingCTA />
    </>
  )
}

function HospitalityPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <>
      <div className="relative min-h-[100dvh] flex flex-col justify-between">
        <HeroBackground />
        <Navbar dark />
        <div className="relative z-10 flex-grow flex flex-col justify-center">
          <HeroContent
            headline={"Video editing for hotels,\nrestaurants & hospitality brands."}
            subtitle="I help real estate brands, hotels and personal brands turn raw footage into content that increases attention, generates inquiries and drives bookings."
          />
        </div>
      </div>

      <div className="cinematic-bg border-t border-neutral-200/30">
        <TrustStrip />
        <VideoBreakdown />
        <WorkSection
          title="Content for Hotels, Restaurants & Hospitality Brands"
          subtitle="Crafted to elevate brand perception and drive bookings."
          filter="hospitality"
        />
        <CaseStudies />
        <CommunityFeedback />
        <HowWeWork />
        <Footer />
      </div>

      <FloatingCTA />
    </>
  )
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  const { pathname } = useLocation()

  // Scroll to top on route change
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])

  return (
    <div className="relative bg-neutral-950 text-neutral-900 font-sans selection:bg-emerald-500/20 selection:text-neutral-900 antialiased overflow-x-hidden">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/real-estate" element={<RealEstatePage />} />
        <Route path="/hospitality" element={<HospitalityPage />} />
      </Routes>
    </div>
  )
}

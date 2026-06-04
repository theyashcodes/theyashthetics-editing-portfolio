import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'motion/react'
import { Check, ArrowUpRight, Menu, X, Play, Volume2, VolumeX, Phone, Mail } from 'lucide-react'

// Custom Instagram icon (not in lucide-react)
function InstagramIcon({ size = 15, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
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
    { label: 'About',  href: '#about' },
    { label: 'Contact',href: '#contact' },
  ]

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-50 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto w-full"
      >
        <a href="#" className="flex items-center gap-2 group select-none">
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
          href="mailto:iamyash.200@gmail.com"
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

// ─── HeroBackground (cinematic static image) ────────────────────────────────
function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden w-full h-full">

      {/* Ken Burns slow zoom — cinematic entrance */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: 'easeOut' }}
      >
        <img
          src="/hero_bg.jpg"
          alt="Varanasi ghats at sunrise — cinematic"
          className="w-full h-full object-cover object-center lg:object-right"
          fetchPriority="high"
        />
      </motion.div>

      {/* Left gradient — dark to transparent so white text is readable */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      {/* Top gradient — subtle */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-transparent to-black/20" />

      {/* Mobile: dark semi-transparent overlay to ensure text readability */}
      <div className="absolute inset-0 z-10 bg-black/45 lg:hidden" />
    </div>
  )
}

// ─── StylePill ────────────────────────────────────────────────────────────────
function StylePill({ label, selected, onClick }) {
  return (
    <motion.button
      onClick={onClick} whileTap={{ scale: 0.96 }}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-normal tracking-wide border transition-all duration-250 cursor-pointer select-none
        ${selected
          ? 'bg-white text-neutral-900 border-white'
          : 'bg-white/10 text-white/70 border-white/20 hover:border-white/50 hover:text-white backdrop-blur-sm'
        }`}
    >
      <AnimatePresence mode="wait">
        {selected ? (
          <motion.span key="chk" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ duration: 0.18 }}>
            <Check size={12} strokeWidth={2.5} />
          </motion.span>
        ) : (
          <motion.span key="dot" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.18 }} className="w-1 h-1 rounded-full bg-neutral-300 flex-shrink-0" />
        )}
      </AnimatePresence>
      {label}
    </motion.button>
  )
}

// ─── CollabBanner ─────────────────────────────────────────────────────────────
function CollabBanner({ selected }) {
  return (
    <AnimatePresence mode="wait">
      {selected.length > 0 ? (
        <motion.div
          key="active"
          initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -6, filter: 'blur(6px)' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-4 flex items-center justify-between gap-4"
        >
          <div>
            <p className="text-[10px] text-white/50 uppercase tracking-[0.18em] mb-1">You are interested in</p>
            <p className="text-sm text-white/90 leading-snug">{selected.join(' · ')}</p>
          </div>
          <a
            href="mailto:iamyash.200@gmail.com"
            className="flex-shrink-0 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white hover:gap-2.5 transition-all duration-300 group"
          >
            Let&apos;s talk
            <ArrowUpRight size={11} strokeWidth={2} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </a>
        </motion.div>
      ) : (
        <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
          className="text-[13px] text-white/30 px-1 py-3 tracking-wide"
        >
          Pick the styles that match your vision.
        </motion.p>
      )}
    </AnimatePresence>
  )
}

// ─── HeroContent ─────────────────────────────────────────────────────────────
function HeroContent() {
  const { displayed, done } = useTypewriter('raw footage.\ncinematic story.', 42, 800)
  const [selectedStyles, setSelectedStyles] = useState([])

  const editingStyles = ['Travel Films', 'Reels & Shorts', 'Hotel & Hospitality', 'Personal Brand', 'Commercials', 'YouTube', 'Wedding Films', 'Real Estate']

  // ← Corrected real stats
  const stats = [
    { value: 50, suffix: '+', label: 'Projects' },
    { value: 5,  suffix: 'M+', label: 'Views' },
    { value: 2,  suffix: '+', label: 'Years' },
    { value: 3,  suffix: '+', label: 'Brands' },
  ]

  const toggleStyle = (s) => setSelectedStyles(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])

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

        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[78px] font-light tracking-[-0.02em] leading-[1.04] text-white mb-8 whitespace-pre-line min-h-[3.3em] sm:min-h-[2.15em]"
        >
          {displayed}
          {!done && <span className="animate-blink font-extralight text-white/40 ml-0.5">|</span>}
        </h1>

        <motion.p {...fadeUp(2.0)} className="text-[15px] sm:text-[17px] md:text-lg text-white/60 leading-relaxed max-w-[480px] mb-8 font-light">
          I edit videos that don&apos;t just look good &mdash;
          <br />they <em className="not-italic text-white/90">feel</em> something.
          From travel films to brand stories.
        </motion.p>

        <motion.div {...fadeUp(2.3)} className="flex flex-wrap items-center gap-6 md:gap-10 mb-10 pb-8 border-b border-white/10">
          {stats.map(({ value, suffix, label }) => (
            <div key={label} className="flex flex-col">
              <span className="text-[28px] font-light text-white tracking-tight tabular-nums leading-none mb-1">
                <AnimatedCounter target={value} suffix={suffix} delay={2300} />
              </span>
              <span className="text-[10px] text-white/40 tracking-[0.16em] uppercase font-light">{label}</span>
            </div>
          ))}
          <div className="h-8 w-px bg-white/10 hidden md:block" />
          <motion.a href="#work" whileHover={{ x: 3 }} transition={{ duration: 0.2 }}
            className="hidden md:flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white transition-colors duration-200 tracking-wide group"
          >
            View all work
            <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </motion.a>
        </motion.div>

        <motion.div {...fadeUp(2.6)} className="flex flex-col gap-4">
          <div>
            <p className="text-[14px] text-white/80 font-normal">What kind of edit are you looking for?</p>
            <p className="text-[11px] text-white/40 tracking-wide font-light">Select all that apply</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {editingStyles.map((s) => (
              <StylePill key={s} label={s} selected={selectedStyles.includes(s)} onClick={() => toggleStyle(s)} />
            ))}
          </div>
          <CollabBanner selected={selectedStyles} />
        </motion.div>

      </div>
    </div>
  )
}

// ─── SectionLabel ─────────────────────────────────────────────────────────────
function SectionLabel({ index, title, subtitle }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group/label mb-10 pb-4 border-b border-neutral-200/50 relative overflow-hidden"
    >
      {/* Subtle green hover line accent */}
      <div className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-emerald-500/80 group-hover/label:w-28 transition-all duration-500 ease-out" />
      <div className="flex items-baseline gap-4 mb-1">
        <span className="text-[10px] text-neutral-300 tracking-[0.2em] uppercase tabular-nums font-light group-hover/label:text-emerald-500 transition-colors duration-300">0{index}</span>
        <h2 className="text-2xl md:text-3xl font-light text-neutral-900 tracking-tight group-hover/label:translate-x-1.5 transition-all duration-300">{title}</h2>
      </div>
      {subtitle && <p className="text-[12px] text-neutral-400 font-light tracking-wide ml-8 group-hover/label:text-neutral-500 transition-colors duration-300">{subtitle}</p>}
    </motion.div>
  )
}

// ─── VideoCard ─────────────────────────────────────────────────────────────────
// orientation: 'landscape' = 16:9 | 'portrait' = 9:16
function VideoCard({ src, title, tag, delay = 0, orientation = 'landscape' }) {
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
      whileHover={{ y: -6 }}
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

      {/* Dark gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent transition-opacity duration-400 opacity-100 lg:opacity-0 lg:group-hover:opacity-100" />

      {/* Play / Pause button */}
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

      {/* Bottom info bar */}
      <div className="absolute bottom-0 left-0 right-0 px-4 py-3 flex items-end justify-between transition-all duration-300 opacity-100 translate-y-0 lg:opacity-0 lg:translate-y-2 lg:group-hover:opacity-100 lg:group-hover:translate-y-0">
        <div className="flex-1 min-w-0 pr-3">
          {tag && <span className="text-[9px] uppercase tracking-[0.18em] text-white/60 font-light block mb-0.5 truncate">{tag}</span>}
          <p className="text-[13px] font-normal text-white leading-tight truncate">{title}</p>
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

// ─── WorkSection ─────────────────────────────────────────────────────────────
function WorkSection() {

  // 1. Featured — long-form, 16:9
  const featured = [
    { src: '/pan-pacific-singapore.mp4', title: 'Pan Pacific Singapore', tag: 'Hotel & Hospitality · Long Form', orientation: 'landscape' },
    { src: '/taj-amritsar.mp4',           title: 'Taj Amritsar',          tag: 'Hotel & Hospitality · Long Form', orientation: 'landscape' },
  ]

  // 2. Cinematic — 16:9
  const cinematic = [
    { src: '/mukteshwar-cinematic.mp4',        title: 'Mukteshwar',              tag: 'Cinematic · Travel',   orientation: 'landscape' },
    { src: '/varanasi-cinematic.mp4',           title: 'Varanasi',                tag: 'Cinematic · Travel',   orientation: 'landscape' },
    { src: '/true-detective-intro-remake.mp4',title: 'True Detective — Remake', tag: 'Cinematic · Fiction',  orientation: 'landscape' },
  ]

  // 3. Shorts & Reels — 9:16 vertical
  const shorts = [
    { src: '/pan-pacific-shorts.mp4', title: 'Pan Pacific — Short',  tag: 'Short · Hotel',  orientation: 'portrait' },
    { src: '/techwalk2-short.mp4',    title: 'TechWalk',             tag: 'Short · Event',  orientation: 'portrait' },
  ]

  // 4. Other Work — mixed: concert is 16:9, rest are 9:16 vertical
  const otherLandscape = [
    { src: '/salim-sulaiman-concert-edit.mp4', title: 'Salim Sulaiman — Concert', tag: 'Concert · Live Event', orientation: 'landscape' },
  ]
  const otherPortrait = [
    { src: '/salim-sulaiman-promo.mp4',  title: 'Salim Sulaiman — Promo', tag: 'Promo · Music',         orientation: 'portrait' },
    { src: '/semicon-summit-glau.mp4',   title: 'Semicon Summit GLAU',    tag: 'Corporate · Event',     orientation: 'portrait' },
  ]

  return (
    <section id="work" className="bg-transparent px-6 py-20 max-w-7xl mx-auto w-full">

      {/* ── 01 Featured / Long-form ── */}
      <SectionLabel index={1} title="Featured Work" subtitle="Long-form hospitality & brand films" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-24">
        {featured.map((v, i) => <VideoCard key={v.src} {...v} delay={i * 0.12} />)}
      </div>

      {/* ── 02 Cinematic ── */}
      <SectionLabel index={2} title="Cinematic Films" subtitle="Storytelling through motion & light" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-24">
        {cinematic.map((v, i) => <VideoCard key={v.src} {...v} delay={i * 0.1} />)}
      </div>

      {/* ── 03 Shorts & Reels — vertical cards centred ── */}
      <SectionLabel index={3} title="Shorts & Reels" subtitle="High-impact vertical short-form content" />
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-24">
        {/*
          Vertical 9:16 cards: limit max-width so they don't stretch wide.
          On mobile: stack vertically, centered. On md+: side by side with fixed width.
        */}
        {shorts.map((v, i) => (
          <div key={v.src} className="w-full max-w-[320px] md:w-[280px] lg:w-[320px] flex-shrink-0">
            <VideoCard {...v} delay={i * 0.12} />
          </div>
        ))}
      </div>

      {/* ── 04 Other Work ── */}
      <SectionLabel index={4} title="Other Work" subtitle="Concerts, events & personal brand" />

      {/* Concert — full landscape */}
      <div className="mb-5">
        {otherLandscape.map((v, i) => (
          <VideoCard key={v.src} {...v} delay={i * 0.1} />
        ))}
      </div>

      {/* Promo / Event / Brand — vertical row */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6">
        {otherPortrait.map((v, i) => (
          <div key={v.src} className="w-full max-w-[320px] md:w-[280px] lg:w-[300px] flex-shrink-0">
            <VideoCard {...v} delay={i * 0.1} />
          </div>
        ))}
      </div>

    </section>
  )
}

// ─── Footer / Contact ─────────────────────────────────────────────────────────
function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const contacts = [
    { icon: Mail,      label: 'iamyash.200@gmail.com',                href: 'mailto:iamyash.200@gmail.com' },
    { icon: Phone,     label: '+91 85330 17236',                       href: 'tel:+918533017236' },
    { icon: InstagramIcon, label: '@theyashthetics',                    href: 'https://instagram.com/theyashthetics' },
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
          <p className="text-[10px] uppercase tracking-[0.24em] text-neutral-400 mb-5">Let&apos;s collaborate</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-neutral-900 tracking-tight leading-[1.05] mb-14 max-w-2xl">
            Got a vision?<br />
            <span className="text-neutral-300">Let&apos;s make it cinematic.</span>
          </h2>

          {/* Contact links */}
          <div className="flex flex-col sm:flex-row gap-5 mb-16">
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

          {/* Bottom bar */}
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

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="relative bg-neutral-950 text-neutral-900 font-sans selection:bg-emerald-500/20 selection:text-neutral-900 antialiased overflow-x-hidden">

      {/* Hero */}
      <div className="relative min-h-[100dvh] flex flex-col justify-between">
        <HeroBackground />
        <Navbar dark />
        <div className="relative z-10 flex-grow flex flex-col justify-center">
          <HeroContent />
        </div>
      </div>

      {/* Work & Footer with textured cinematic background */}
      <div className="cinematic-bg border-t border-neutral-200/30">
        <WorkSection />
        <Footer />
      </div>

    </div>
  )
}

import { ArrowDown, ArrowRight, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolio';
import { GitHubBrandIcon, LinkedInBrandIcon } from './TechIcons';

export function Hero() {
  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden pt-24 pb-8 sm:pb-10 lg:pb-12"
    >
      {/*
        LAYER 1 (z-10): Monumental Edge-to-Edge Analog-to-Pixel Display Backdrop
        Sits intentionally BEHIND the fixed z-20 3D Particle Self bust so the sculpted
        head & shoulders emerge in front of the colossal letters (just like Particle Self).
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[21%] sm:top-[22%] lg:top-[22%] z-10 flex w-full select-none items-center justify-between px-3 sm:px-6 lg:px-10"
      >
        {/* Left side: clean geometric sans transitioning to crisp pixel glyphs behind the head */}
        <div className="flex items-baseline whitespace-nowrap leading-none">
          <span className="font-display font-light tracking-[-0.04em] text-[clamp(2.85rem,9.8vw,9.4rem)] bg-gradient-to-b from-white via-zinc-200 to-zinc-400/90 bg-clip-text text-transparent">
            HI,&nbsp;I&apos;
          </span>
          <span className="font-pixel tracking-[-0.04em] text-[clamp(2.55rem,8.8vw,8.4rem)] bg-gradient-to-b from-white via-zinc-200 to-zinc-500/80 bg-clip-text text-transparent">
            M
          </span>
        </div>

        {/* Right side: digital pixel display letters */}
        <div className="flex items-baseline whitespace-nowrap leading-none">
          <span className="font-pixel tracking-[-0.04em] text-[clamp(2.55rem,8.8vw,8.4rem)] bg-gradient-to-b from-white via-zinc-200 to-zinc-400/90 bg-clip-text text-transparent">
            HEMANT
          </span>
        </div>
      </div>

      {/* Top spacer below floating dock */}
      <div className="h-14 sm:h-20" aria-hidden="true" />

      {/*
        LAYER 3 (z-30): Bottom Editorial Foreground Overlay
        Anchored cleanly at the bottom-left and bottom-right so the center interactive
        3D Particle Self remains unobstructed and responds freely to the cursor.
      */}
      <div className="relative z-30 mx-auto mt-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10 pt-[38vh] sm:pt-[42vh] lg:pt-[46vh]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          {/* Bottom-Left Editorial Statement (exact Swiss framing of Particle Self) */}
          <div className="max-w-xl space-y-4">
            {/* Micro Status Pill */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.11] bg-[#121218]/90 px-3 py-1 font-medium text-zinc-100 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_#a78bfa]" />
                <span>{PERSONAL_INFO.greeting}</span>
              </span>
              <span className="font-mono text-[11px] tracking-wide text-zinc-400">
                B.Tech CSE &middot; ABES Engineering College
              </span>
            </div>

            {/* Two-Tone Editorial Heading & Subtitle */}
            <div className="space-y-1">
              <h1 className="font-display text-2xl sm:text-3xl lg:text-[2.15rem] font-medium leading-[1.18] tracking-[-0.02em] text-white">
                {PERSONAL_INFO.heroHeadlineStart}{' '}
                {PERSONAL_INFO.heroHeadlineAccent}
              </h1>
              <p className="font-display text-lg sm:text-xl lg:text-[1.35rem] font-normal leading-snug tracking-[-0.01em] text-zinc-400/90">
                {PERSONAL_INFO.heroSubtitle}
              </p>
            </div>

            {/* Concise Authentic Description */}
            <p className="max-w-md text-sm leading-relaxed text-zinc-400">
              {PERSONAL_INFO.heroDescription}
            </p>

            {/* Primary & Secondary Action Buttons (No Resume Button) */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-xl bg-[#e5f04e] px-5 py-2.5 text-sm font-semibold text-black shadow-[0_0_28px_-6px_rgba(229,240,78,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#eef76b]"
              >
                <span>Explore My Projects</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/[0.14] bg-[#121216]/80 px-5 py-2.5 text-sm font-medium text-zinc-100 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-400/45 hover:bg-white/[0.08] hover:text-white"
              >
                <Mail className="h-4 w-4 text-violet-300" />
                <span>Let&apos;s Connect</span>
              </a>
            </div>
          </div>

          {/* Bottom-Right Interactive Social Dock & Scroll Cue */}
          <div className="flex flex-wrap items-center justify-between gap-4 lg:flex-col lg:items-end lg:gap-3">
            <div className="hidden lg:inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-black/55 px-3 py-1 text-[11px] font-mono text-zinc-400 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/80" />
              <span>Move cursor across canvas to interact</span>
            </div>

            <div className="flex items-center gap-2 rounded-2xl border border-white/[0.1] bg-[#121216]/80 p-1.5 backdrop-blur-xl">
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Hemant Kumar on GitHub"
                title="GitHub"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-zinc-300 transition-colors hover:bg-white/[0.09] hover:text-white"
              >
                <GitHubBrandIcon className="h-[18px] w-[18px]" />
              </a>

              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Hemant Kumar on LinkedIn"
                title="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-zinc-300 transition-colors hover:bg-white/[0.09] hover:text-violet-300"
              >
                <LinkedInBrandIcon className="h-[18px] w-[18px]" />
              </a>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                aria-label={`Email Hemant Kumar at ${PERSONAL_INFO.email}`}
                title={PERSONAL_INFO.email}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-zinc-300 transition-colors hover:bg-white/[0.09] hover:text-[#e5f04e]"
              >
                <Mail className="h-[18px] w-[18px]" />
              </a>

              <span className="mx-0.5 h-4 w-px bg-white/10" aria-hidden="true" />

              <a
                href="#about"
                aria-label="Scroll to About Me section"
                title="Scroll to explore"
                className="group inline-flex h-9 items-center gap-1.5 rounded-xl px-2.5 text-xs font-mono text-zinc-400 transition-colors hover:bg-white/[0.07] hover:text-white"
              >
                <span>Scroll</span>
                <ArrowDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

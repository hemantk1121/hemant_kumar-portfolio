import {
  Bot,
  ExternalLink,
  Globe,
  MessageSquare,
  Mic,
  Sparkles,
} from 'lucide-react';
import { FEATURED_PROJECT } from '../data/portfolio';
import { Reveal } from './Reveal';
import { SectionHeader } from './SectionHeader';
import { SpotlightCard } from './SpotlightCard';

export function FeaturedProject() {
  return (
    <section id="projects" className="relative py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            index="03"
            eyebrow="Featured Work"
            title="Featured Project"
            description="A focused highlight of my work applying Artificial Intelligence to practical, real-world challenges."
          />
        </Reveal>

        <Reveal delay={100}>
          <SpotlightCard
            spotlightColor="rgba(196, 181, 253, 0.15)"
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Visual Browser Mockup */}
              <div className="relative flex items-center justify-center overflow-hidden border-b border-white/[0.08] bg-gradient-to-br from-[#07070b] via-[#0a0a10] to-[#050508] p-6 sm:p-9 lg:col-span-6 lg:border-b-0 lg:border-r">
                {/* Ambient lavender & chartreuse glow behind mockup */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-10 left-1/2 h-52 w-72 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500/20 via-blue-500/16 to-[#e5f04e]/12 blur-3xl"
                />

                {/* Sleek Obsidian Browser Frame */}
                <div className="relative w-full max-w-md rounded-2xl border border-white/[0.11] bg-[#060609]/95 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.85)] overflow-hidden transition-transform duration-500 group-hover:scale-[1.015]">
                  {/* Browser Top Chrome */}
                  <div className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.025] px-4 py-2.5">
                    <div className="flex items-center gap-1.5" aria-hidden="true">
                      <span className="h-2.5 w-2.5 rounded-full bg-zinc-600/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-zinc-600/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-zinc-600/80" />
                    </div>
                    <div className="flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 text-[11px] font-mono text-zinc-400">
                      <Globe className="h-3 w-3 text-violet-300/80" />
                      <span className="truncate max-w-[180px] sm:max-w-none">
                        {FEATURED_PROJECT.displayUrl}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Live
                    </span>
                  </div>

                  {/* Conceptual AI Interview Interface Preview */}
                  <div className="p-5 sm:p-6 space-y-4">
                    {/* App Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/25 via-blue-500/20 to-cyan-500/20 border border-violet-300/30">
                          <Bot className="h-4 w-4 text-violet-200" />
                        </div>
                        <div>
                          <div className="font-display text-sm font-semibold text-zinc-100">
                            HireReady
                          </div>
                          <div className="text-[11px] text-zinc-400">
                            AI Interviewing Agent
                          </div>
                        </div>
                      </div>
                      <span className="rounded-full border border-violet-400/25 bg-violet-500/12 px-2.5 py-0.5 text-[11px] font-medium text-violet-200">
                        Practice Mode
                      </span>
                    </div>

                    {/* Central AI Voice / Signal Core */}
                    <div className="relative flex flex-col items-center justify-center rounded-xl border border-white/[0.08] bg-gradient-to-b from-violet-500/[0.06] to-white/[0.01] px-4 py-6">
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-violet-300/35 bg-gradient-to-tr from-violet-600/25 via-blue-500/20 to-[#e5f04e]/15 shadow-[0_0_32px_rgba(167,139,250,0.28)]">
                        <Mic className="h-6 w-6 text-white" />
                      </div>

                      {/* Subtle animated audio waveform bars */}
                      <div
                        aria-hidden="true"
                        className="mt-4 flex h-6 items-center gap-1.5"
                      >
                        <span className="h-3 w-1 rounded-full bg-violet-300/80 animate-eq-1" />
                        <span className="h-5 w-1 rounded-full bg-blue-400/85 animate-eq-2" />
                        <span className="h-6 w-1 rounded-full bg-[#e5f04e]/90 animate-eq-3" />
                        <span className="h-4 w-1 rounded-full bg-cyan-300/85 animate-eq-4" />
                        <span className="h-6 w-1 rounded-full bg-violet-300/85 animate-eq-1" />
                        <span className="h-5 w-1 rounded-full bg-blue-400/80 animate-eq-2" />
                        <span className="h-3 w-1 rounded-full bg-violet-300/75 animate-eq-3" />
                      </div>
                      <p className="mt-2.5 text-xs text-zinc-400">
                        Interactive Interview Practice Session
                      </p>
                    </div>

                    {/* Abstract Prompt & Response Preview Strips */}
                    <div className="space-y-2.5">
                      <div className="flex items-start gap-2.5 rounded-lg border border-white/[0.07] bg-white/[0.025] p-3">
                        <MessageSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-300" />
                        <div className="w-full space-y-1.5">
                          <div className="h-2 w-3/4 rounded-full bg-zinc-600/55" />
                          <div className="h-2 w-1/2 rounded-full bg-zinc-700/50" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-[11px] text-zinc-300">
                        <span>Response Guidance &amp; Preparation</span>
                        <span className="font-pixel text-[10px] text-[#e5f04e]">AI</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Details Column */}
              <div className="flex flex-col justify-center p-7 sm:p-10 lg:col-span-6">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-violet-300/25 bg-violet-500/10 px-3.5 py-1 text-xs font-medium text-violet-200">
                  <Sparkles className="h-3.5 w-3.5 text-[#e5f04e]" />
                  <span>Featured Highlight</span>
                </div>

                <h3 className="mt-5 font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {FEATURED_PROJECT.name}
                </h3>

                <p className="mt-4 text-base leading-relaxed text-zinc-300">
                  {FEATURED_PROJECT.description}
                </p>

                {/* General Verified Tags Only */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {FEATURED_PROJECT.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-zinc-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Live Demo CTA */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href={FEATURED_PROJECT.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center gap-2 rounded-xl bg-[#e5f04e] px-6 py-3 text-sm font-semibold text-black shadow-[0_0_28px_-6px_rgba(229,240,78,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#eef76b]"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </a>

                  <a
                    href={FEATURED_PROJECT.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-zinc-400 underline-offset-4 transition-colors hover:text-violet-300 hover:underline"
                  >
                    {FEATURED_PROJECT.displayUrl}
                  </a>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}

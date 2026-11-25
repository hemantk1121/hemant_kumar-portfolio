import {
  BrainCircuit,
  Code2,
  GraduationCap,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { ABOUT_CONTENT, EDUCATION } from '../data/portfolio';
import { Reveal } from './Reveal';
import { SectionHeader } from './SectionHeader';
import { SpotlightCard } from './SpotlightCard';

const HIGHLIGHT_ICONS = {
  brain: BrainCircuit,
  code: Code2,
  sparkles: Sparkles,
};

const ACCENT_STYLES = {
  blue: {
    iconWrap: 'border-blue-400/25 bg-blue-500/12 text-blue-300',
    spotlight: 'rgba(59, 130, 246, 0.16)',
  },
  violet: {
    iconWrap: 'border-violet-400/25 bg-violet-500/12 text-violet-300',
    spotlight: 'rgba(139, 92, 246, 0.16)',
  },
  cyan: {
    iconWrap: 'border-cyan-400/25 bg-cyan-500/12 text-cyan-300',
    spotlight: 'rgba(34, 211, 238, 0.15)',
  },
};

export function About() {
  return (
    <section id="about" className="relative py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            index="01"
            eyebrow="Background"
            title={ABOUT_CONTENT.heading}
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 items-start">
          {/* Left Narrative Card */}
          <Reveal delay={80} className="lg:col-span-7">
            <SpotlightCard className="p-7 sm:p-9">
              <div className="space-y-5 text-base sm:text-[17px] leading-[1.8] text-slate-300">
                {ABOUT_CONTENT.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Authentic Academic Context Strip */}
              <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/[0.07] pt-6 text-sm text-slate-400">
                <span className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-slate-200">
                  <GraduationCap className="h-4 w-4 text-blue-400" />
                  <span>B.Tech CSE (Core)</span>
                </span>
                <span className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-slate-300">
                  <MapPin className="h-4 w-4 text-cyan-400" />
                  <span>{EDUCATION.institution}, Ghaziabad</span>
                </span>
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Right 3 Highlight Cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {ABOUT_CONTENT.highlights.map((item, idx) => {
              const Icon = HIGHLIGHT_ICONS[item.icon];
              const style = ACCENT_STYLES[item.accent];
              return (
                <Reveal key={item.id} delay={140 + idx * 90}>
                  <SpotlightCard
                    spotlightColor={style.spotlight}
                    className="p-5 sm:p-6 transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${style.iconWrap}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-display text-base sm:text-[17px] font-semibold text-slate-100">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </SpotlightCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

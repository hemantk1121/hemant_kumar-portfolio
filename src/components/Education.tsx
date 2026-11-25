import { GraduationCap, MapPin } from 'lucide-react';
import { EDUCATION } from '../data/portfolio';
import { Reveal } from './Reveal';
import { SectionHeader } from './SectionHeader';
import { SpotlightCard } from './SpotlightCard';

export function Education() {
  return (
    <section id="education" className="relative py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            index="06"
            eyebrow="Academic Foundation"
            title="Education"
          />
        </Reveal>

        <Reveal delay={90}>
          <SpotlightCard
            spotlightColor="rgba(59, 130, 246, 0.16)"
            className="max-w-3xl overflow-hidden"
          >
            <div className="relative flex flex-col gap-5 p-7 sm:flex-row sm:items-start sm:gap-6 sm:p-9">
              {/* Left luminous accent strip */}
              <div
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-violet-400 via-blue-400 to-[#e5f04e]"
              />

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-violet-300/25 bg-violet-500/12 text-violet-200 shadow-[0_0_24px_rgba(167,139,250,0.2)]">
                <GraduationCap className="h-6 w-6" />
              </div>

              <div className="space-y-2.5">
                <span className="inline-flex items-center rounded-full border border-violet-300/25 bg-violet-500/10 px-3 py-1 text-xs font-mono uppercase tracking-wider text-violet-200">
                  {EDUCATION.label}
                </span>

                <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-slate-50">
                  {EDUCATION.degree}
                </h3>

                <p className="text-base sm:text-lg font-medium text-slate-200">
                  {EDUCATION.institution}
                </p>

                <p className="inline-flex items-center gap-2 text-sm text-slate-400">
                  <MapPin className="h-4 w-4 text-cyan-400/85" />
                  <span>{EDUCATION.location}</span>
                </p>
              </div>
            </div>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}

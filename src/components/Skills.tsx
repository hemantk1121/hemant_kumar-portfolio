import { Cpu, Globe, Terminal, Wrench } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolio';
import { Reveal } from './Reveal';
import { SectionHeader } from './SectionHeader';
import { SpotlightCard } from './SpotlightCard';
import { SkillIcon } from './TechIcons';

const CATEGORY_ICONS = {
  terminal: Terminal,
  cpu: Cpu,
  globe: Globe,
  wrench: Wrench,
};

const CATEGORY_ACCENTS = {
  blue: {
    badge: 'border-blue-400/25 bg-blue-500/12 text-blue-300',
    glow: 'rgba(59, 130, 246, 0.16)',
    pillHover: 'hover:border-blue-400/40 hover:bg-blue-500/[0.08]',
  },
  violet: {
    badge: 'border-violet-400/25 bg-violet-500/12 text-violet-300',
    glow: 'rgba(139, 92, 246, 0.16)',
    pillHover: 'hover:border-violet-400/40 hover:bg-violet-500/[0.08]',
  },
  cyan: {
    badge: 'border-cyan-400/25 bg-cyan-500/12 text-cyan-300',
    glow: 'rgba(34, 211, 238, 0.15)',
    pillHover: 'hover:border-cyan-400/40 hover:bg-cyan-500/[0.08]',
  },
  indigo: {
    badge: 'border-indigo-400/25 bg-indigo-500/12 text-indigo-300',
    glow: 'rgba(99, 102, 241, 0.16)',
    pillHover: 'hover:border-indigo-400/40 hover:bg-indigo-500/[0.08]',
  },
};

export function Skills() {
  return (
    <section id="skills" className="relative py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            index="02"
            eyebrow="Toolkit"
            title="Technical Skills"
            description="Languages, libraries, and platforms I work with across AI/ML exploration, data analysis, and web development."
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {SKILL_CATEGORIES.map((category, idx) => {
            const Icon = CATEGORY_ICONS[category.icon];
            const accent = CATEGORY_ACCENTS[category.accent];

            return (
              <Reveal key={category.id} delay={idx * 90}>
                <SpotlightCard
                  spotlightColor={accent.glow}
                  className="h-full p-6 sm:p-7"
                >
                  {/* Category Header */}
                  <div className="mb-6 flex items-center gap-3.5 border-b border-white/[0.07] pb-5">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl border ${accent.badge}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-lg font-semibold tracking-tight text-slate-100">
                      {category.title}
                    </h3>
                  </div>

                  {/* Clean Technology Grid (No fake bars or percentages) */}
                  <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-3">
                    {category.skills.map((skill) => (
                      <div
                        key={`${category.id}-${skill.name}`}
                        className={`flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] px-3.5 py-3 text-sm font-medium text-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:text-white ${accent.pillHover}`}
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06]">
                          <SkillIcon icon={skill.icon} className="h-4 w-4" />
                        </span>
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

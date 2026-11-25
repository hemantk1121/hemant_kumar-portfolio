import { BarChart3, Building2, CheckCircle2, Cpu } from 'lucide-react';
import { INTERNSHIPS } from '../data/portfolio';
import { Reveal } from './Reveal';
import { SectionHeader } from './SectionHeader';
import { SpotlightCard } from './SpotlightCard';

export function Experience() {
  return (
    <section id="experience" className="relative py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            index="04"
            eyebrow="Experience"
            title="Internship Experience"
            description="Completed internships building practical exposure in Artificial Intelligence, Machine Learning, and Data Analysis."
          />
        </Reveal>

        {/* Vertical Timeline */}
        <div className="relative max-w-3xl pl-8 sm:pl-10">
          {/* Glowing vertical spine */}
          <div
            aria-hidden="true"
            className="absolute top-3 bottom-3 left-[11px] sm:left-[15px] w-px bg-gradient-to-b from-violet-400/70 via-blue-400/45 to-[#e5f04e]/25"
          />

          <div className="space-y-6">
            {INTERNSHIPS.map((item, idx) => {
              const RoleIcon = item.icon === 'cpu' ? Cpu : BarChart3;

              return (
                <Reveal key={item.id} delay={idx * 120}>
                  <div className="relative">
                    {/* Timeline Node Dot */}
                    <span
                      aria-hidden="true"
                      className="absolute -left-8 sm:-left-10 top-7 flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-violet-300/40 bg-[#08080c] shadow-[0_0_18px_rgba(167,139,250,0.35)]"
                    >
                      <span className="h-2 w-2 rounded-full bg-gradient-to-r from-violet-300 to-[#e5f04e]" />
                    </span>

                    <SpotlightCard
                      spotlightColor={
                        idx === 0
                          ? 'rgba(59, 130, 246, 0.15)'
                          : 'rgba(139, 92, 246, 0.15)'
                      }
                      className="p-6 sm:p-7 transition-transform duration-300 hover:-translate-y-0.5"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-4">
                          <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${
                              idx === 0
                                ? 'border-blue-400/25 bg-blue-500/12 text-blue-300'
                                : 'border-violet-400/25 bg-violet-500/12 text-violet-300'
                            }`}
                          >
                            <RoleIcon className="h-5 w-5" />
                          </div>

                          <div>
                            <h3 className="font-display text-lg sm:text-xl font-semibold tracking-tight text-slate-50">
                              {item.role}
                            </h3>
                            <div className="mt-1.5 inline-flex items-center gap-2 text-sm sm:text-base text-slate-300">
                              <Building2 className="h-4 w-4 text-slate-400" />
                              <span>{item.organization}</span>
                            </div>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className="sm:self-center">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-300">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span>{item.status}</span>
                          </span>
                        </div>
                      </div>
                    </SpotlightCard>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

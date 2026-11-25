import { Award, ExternalLink } from 'lucide-react';
import { CERTIFICATES } from '../data/portfolio';
import { Reveal } from './Reveal';
import { SectionHeader } from './SectionHeader';
import { SpotlightCard } from './SpotlightCard';

export function Certificates() {
  const hasCertificates = CERTIFICATES.length > 0;

  return (
    <section id="certificates" className="relative py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            index="05"
            eyebrow="Credentials"
            title="Certificates"
          />
        </Reveal>

        {hasCertificates ? (
          /* Automatic responsive grid ready as soon as certificate entries are added in src/data/portfolio.ts */
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CERTIFICATES.map((cert, idx) => (
              <Reveal key={cert.id} delay={idx * 80}>
                <SpotlightCard className="flex h-full flex-col overflow-hidden">
                  {cert.image && (
                    <div className="aspect-[16/10] w-full overflow-hidden border-b border-white/[0.07] bg-slate-900/60">
                      <img
                        src={cert.image}
                        alt={`${cert.title} — ${cert.issuer}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-lg font-semibold text-slate-100">
                        {cert.title}
                      </h3>
                      {cert.date && (
                        <span className="shrink-0 text-xs font-mono text-slate-400">
                          {cert.date}
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 text-sm text-slate-400">{cert.issuer}</p>
                    {cert.credentialUrl && (
                      <div className="mt-auto pt-5">
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-300 transition-colors hover:text-cyan-300"
                        >
                          <span>View Credential</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        ) : (
          /* Clean, intentional placeholder card until certificates are uploaded */
          <Reveal delay={80}>
            <SpotlightCard
              spotlightColor="rgba(34, 211, 238, 0.12)"
              className="border-dashed border-white/[0.14]"
            >
              <div className="flex flex-col items-center justify-center px-6 py-14 sm:py-16 text-center">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-300/25 bg-gradient-to-br from-violet-500/15 via-blue-500/10 to-[#e5f04e]/10 text-violet-200 shadow-[0_0_28px_rgba(167,139,250,0.18)]">
                  <Award className="h-6 w-6" />
                </div>

                <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-slate-100">
                  Certificates coming soon
                </h3>
                <p className="mt-2 max-w-md text-sm sm:text-base leading-relaxed text-slate-400">
                  Verified certificates, credentials, and course completions will
                  be uploaded and showcased here shortly.
                </p>
              </div>
            </SpotlightCard>
          </Reveal>
        )}
      </div>
    </section>
  );
}

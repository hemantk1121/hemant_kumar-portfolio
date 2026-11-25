import { ArrowUp, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolio';
import { GitHubBrandIcon, LinkedInBrandIcon } from './TechIcons';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-30 border-t border-white/[0.08] bg-black/90 backdrop-blur-lg">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/35 to-transparent"
      />

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 sm:flex-row sm:px-6 lg:px-8">
        <div className="text-center sm:text-left">
          <p className="font-display text-sm font-medium text-zinc-200">
            Designed &amp; Built by {PERSONAL_INFO.name}
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            &copy; {currentYear} {PERSONAL_INFO.name}. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-400 transition-all hover:-translate-y-0.5 hover:border-white/25 hover:text-white"
          >
            <GitHubBrandIcon className="h-4 w-4" />
          </a>

          <a
            href={PERSONAL_INFO.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-400 transition-all hover:-translate-y-0.5 hover:border-violet-400/40 hover:text-violet-300"
          >
            <LinkedInBrandIcon className="h-4 w-4" />
          </a>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            aria-label="Email"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-400 transition-all hover:-translate-y-0.5 hover:border-[#e5f04e]/40 hover:text-[#e5f04e]"
          >
            <Mail className="h-4 w-4" />
          </a>

          <span className="mx-1 h-4 w-px bg-white/10" aria-hidden="true" />

          <a
            href="#home"
            aria-label="Back to top"
            title="Back to top"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-400 transition-all hover:-translate-y-0.5 hover:border-white/25 hover:text-white"
          >
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

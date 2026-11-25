import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS, PERSONAL_INFO } from '../data/portfolio';
import { useActiveSection } from '../hooks/useActiveSection';

function DotMatrixIcon() {
  return (
    <svg
      viewBox="0 0 18 18"
      fill="currentColor"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <circle cx="3" cy="3" r="1.45" />
      <circle cx="9" cy="3" r="1.45" />
      <circle cx="15" cy="3" r="1.45" />
      <circle cx="3" cy="9" r="1.45" />
      <circle cx="9" cy="9" r="1.45" />
      <circle cx="15" cy="9" r="1.45" />
      <circle cx="3" cy="15" r="1.45" />
      <circle cx="9" cy="15" r="1.45" />
      <circle cx="15" cy="15" r="1.45" />
    </svg>
  );
}

function formatClock(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

export function Navbar() {
  const [clock, setClock] = useState<string>(() => formatClock(new Date()));
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeSection = useActiveSection(NAV_ITEMS.map((item) => item.id));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setClock(formatClock(new Date()));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(
        docHeight > 0 ? Math.min(100, (window.scrollY / docHeight) * 100) : 0
      );
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 pointer-events-none">
      {/* Subtle top viewport scroll hairline */}
      <div
        aria-hidden="true"
        className="h-[2px] bg-gradient-to-r from-violet-400 via-blue-400 to-[#e5f04e] transition-[width] duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="mx-auto flex max-w-6xl justify-center px-3 pt-3.5 sm:px-5 sm:pt-4">
        {/* Floating Centered Capsule Dock (inspired by Particle Self) */}
        <nav
          aria-label="Primary Navigation"
          className="pointer-events-auto flex w-full lg:w-auto items-center justify-between gap-2 sm:gap-3 rounded-2xl border border-white/[0.11] bg-[#121216]/85 p-1.5 shadow-[0_16px_48px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
        >
          {/* Left: Dot-matrix Home button + Name + Live Clock */}
          <div className="flex items-center gap-2.5 pl-0.5">
            <a
              href="#home"
              onClick={handleLinkClick}
              aria-label={`${PERSONAL_INFO.name} — Home`}
              className="group flex items-center gap-2.5 rounded-xl pr-1.5 focus-visible:outline-offset-2"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.07] text-zinc-200 transition-colors group-hover:bg-white/[0.14] group-hover:text-white">
                <DotMatrixIcon />
              </span>
              <span className="font-display text-sm font-semibold tracking-tight text-white whitespace-nowrap">
                {PERSONAL_INFO.name}
              </span>
            </a>

            {/* Live Mono Clock + Pulsing Status Dot */}
            <div className="hidden xl:flex items-center gap-2.5 border-l border-white/[0.1] pl-2.5 text-xs font-mono text-zinc-400">
              <span className="tabular-nums text-zinc-300">{clock}</span>
              <span className="inline-flex items-center gap-1.5 text-zinc-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                <span className="font-sans text-[12px] text-zinc-300">AI / ML</span>
              </span>
            </div>
          </div>

          {/* Center: Clean Single-Row Desktop Nav Links */}
          <ul className="hidden lg:flex items-center gap-0.5 border-l border-white/[0.09] pl-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`rounded-xl px-2.5 py-1.5 text-[13px] font-medium transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? 'bg-white/[0.11] text-white'
                        : 'text-zinc-400 hover:bg-white/[0.05] hover:text-zinc-100'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right: High-Contrast Acid-Yellow CTA Pill + Mobile Menu Toggle */}
          <div className="flex items-center gap-1.5">
            <a
              href="#contact"
              onClick={handleLinkClick}
              className="hidden sm:inline-flex items-center justify-center rounded-xl bg-[#e5f04e] px-3.5 py-2 text-[13px] font-semibold text-black shadow-[0_0_24px_-4px_rgba(229,240,78,0.45)] transition-all duration-200 hover:bg-[#eef76b] hover:-translate-y-0.5 whitespace-nowrap"
            >
              Let&apos;s Connect
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              aria-label={
                mobileOpen ? 'Close navigation menu' : 'Open navigation menu'
              }
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.05] text-zinc-200 transition-colors hover:bg-white/[0.1] lg:hidden"
            >
              {mobileOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Floating Mobile Drawer */}
      <div
        id="mobile-navigation"
        className={`lg:hidden mx-auto max-w-6xl px-3 sm:px-5 transition-all duration-250 ease-out ${
          mobileOpen
            ? 'pointer-events-auto mt-2 max-h-[460px] opacity-100'
            : 'pointer-events-none mt-0 max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="rounded-2xl border border-white/[0.11] bg-[#101014]/95 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
          <div className="mb-2 flex items-center justify-between border-b border-white/[0.08] px-3 pb-2.5 text-xs font-mono text-zinc-400">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Aspiring AI/ML Engineer</span>
            </span>
            <span className="tabular-nums text-zinc-300">{clock}</span>
          </div>

          <div className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-white/[0.1] text-white'
                      : 'text-zinc-400 hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#e5f04e]" />
                  )}
                </a>
              );
            })}
          </div>

          <div className="mt-3 pt-2 border-t border-white/[0.08]">
            <a
              href="#contact"
              onClick={handleLinkClick}
              className="flex w-full items-center justify-center rounded-xl bg-[#e5f04e] px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#eef76b]"
            >
              Let&apos;s Connect
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

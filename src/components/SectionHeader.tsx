interface SectionHeaderProps {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
}

export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="mb-12 md:mb-14 max-w-2xl">
      <div className="mb-3 inline-flex items-center gap-2.5 text-xs font-mono tracking-widest uppercase text-zinc-400">
        <span className="font-pixel text-[11px] text-[#e5f04e]">{index}</span>
        <span className="h-px w-6 bg-gradient-to-r from-violet-400/70 to-white/15" />
        <span className="text-violet-300/90">{eyebrow}</span>
      </div>
      <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-white">
        {title}
      </h2>
      {description && (
        <p className="mt-3.5 text-base sm:text-[17px] leading-relaxed text-zinc-400">
          {description}
        </p>
      )}
    </div>
  );
}

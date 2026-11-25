export function BackgroundCanvas() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black"
    >
      {/* Ultra-subtle fine architectural grid visible across lower sections */}
      <div
        className="absolute inset-0 bg-neural-grid opacity-55"
        style={{
          maskImage:
            'radial-gradient(ellipse 75% 55% at 50% 85%, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.18) 65%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 75% 55% at 50% 85%, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.18) 65%, transparent 100%)',
        }}
      />

      {/* Fine anti-banding film grain */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

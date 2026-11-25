import type { SkillIconKey } from '../data/portfolio';

interface IconProps {
  className?: string;
}

export function GitHubBrandIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 2C6.477 2 2 6.59 2 12.253c0 4.53 2.865 8.374 6.839 9.73.5.095.682-.222.682-.493 0-.244-.009-.888-.014-1.744-2.782.619-3.369-1.375-3.369-1.375-.455-1.182-1.11-1.497-1.11-1.497-.908-.637.069-.624.069-.624 1.003.073 1.531 1.057 1.531 1.057.892 1.565 2.341 1.113 2.91.851.091-.663.35-1.113.636-1.369-2.221-.259-4.555-1.139-4.555-5.068 0-1.119.39-2.035 1.029-2.752-.103-.26-.446-1.302.098-2.715 0 0 .84-.276 2.75 1.051A9.38 9.38 0 0 1 12 6.844a9.39 9.39 0 0 1 2.504.345c1.909-1.327 2.748-1.051 2.748-1.051.546 1.413.202 2.455.1 2.715.64.717 1.028 1.633 1.028 2.752 0 3.939-2.338 4.806-4.566 5.06.359.317.679.944.679 1.903 0 1.374-.012 2.482-.012 2.819 0 .274.18.593.688.492C19.138 20.623 22 16.78 22 12.253 22 6.59 17.523 2 12 2Z" />
    </svg>
  );
}

export function LinkedInBrandIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
    </svg>
  );
}

export function SkillIcon({
  icon,
  className = 'h-4 w-4',
}: {
  icon: SkillIconKey;
  className?: string;
}) {
  switch (icon) {
    case 'python':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
          <path
            d="M11.9 2.5C7.9 2.5 8.1 4.2 8.1 4.2v1.8h3.9v.6H6.5S4 6.3 4 10.3c0 4 2.2 3.9 2.2 3.9h1.3v-1.9s-.1-2.2 2.2-2.2h3.8s2.1 0 2.1-2V4.7s.3-2.2-3.7-2.2Zm-2.1 1.3a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4Z"
            fill="#60A5FA"
          />
          <path
            d="M12.1 21.5c4 0 3.8-1.7 3.8-1.7V18H12v-.6h5.5s2.5.3 2.5-3.7c0-4-2.2-3.9-2.2-3.9h-1.3v1.9s.1 2.2-2.2 2.2h-3.8s-2.1 0-2.1 2v3.4s-.3 2.2 3.7 2.2Zm2.1-1.3a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4Z"
            fill="#FACC15"
          />
        </svg>
      );

    case 'cpp':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
          <polygon
            points="12,2 21,7 21,17 12,22 3,17 3,7"
            stroke="#60A5FA"
            strokeWidth="1.6"
            fill="rgba(59,130,246,0.14)"
          />
          <path
            d="M12 15.2a3.2 3.2 0 1 1 2.26-5.46"
            stroke="#93C5FD"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <path
            d="M15.6 12h2.4M16.8 10.8v2.4M18.6 12h1.4"
            stroke="#22D3EE"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'javascript':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="3.5"
            fill="rgba(250,204,21,0.15)"
            stroke="#FACC15"
            strokeWidth="1.5"
          />
          <path
            d="M10.5 9.5v5.2c0 1.1-.6 1.7-1.6 1.7-.7 0-1.2-.3-1.5-.9M14 14.9c.3.7 1 1.2 2 1.2 1.1 0 1.8-.6 1.8-1.5 0-.8-.5-1.2-1.5-1.6l-.6-.2c-.9-.4-1.3-.8-1.3-1.5 0-.9.7-1.5 1.7-1.5.8 0 1.3.3 1.7.9"
            stroke="#FDE047"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'numpy':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
          <path
            d="M12 3L4 7.5v9L12 21l8-4.5v-9L12 3Z"
            stroke="#38BDF8"
            strokeWidth="1.5"
            fill="rgba(56,189,248,0.12)"
          />
          <path
            d="M12 3v9m0 0 8-4.5M12 12 4 7.5M12 12v9"
            stroke="#60A5FA"
            strokeWidth="1.3"
            strokeOpacity="0.85"
          />
        </svg>
      );

    case 'pandas':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
          <rect x="6" y="4" width="2.6" height="6.5" rx="1" fill="#A78BFA" />
          <rect x="6" y="13" width="2.6" height="6.5" rx="1" fill="#A78BFA" />
          <rect x="10.7" y="9" width="2.6" height="3.2" rx="1" fill="#F472B6" />
          <rect x="15.4" y="4.5" width="2.6" height="6.5" rx="1" fill="#60A5FA" />
          <rect x="15.4" y="13.5" width="2.6" height="6.5" rx="1" fill="#60A5FA" />
        </svg>
      );

    case 'matplotlib':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
          <circle
            cx="12"
            cy="12"
            r="8.5"
            stroke="#38BDF8"
            strokeWidth="1.5"
            fill="rgba(34,211,238,0.08)"
          />
          <circle cx="12" cy="12" r="4.5" stroke="#60A5FA" strokeWidth="1.2" strokeDasharray="2 2" />
          <path d="M12 12L17.5 7.5" stroke="#A78BFA" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M12 12L15.5 16.5" stroke="#22D3EE" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M12 12L7 10" stroke="#60A5FA" strokeWidth="1.7" strokeLinecap="round" />
          <circle cx="12" cy="12" r="1.5" fill="#F8FAFC" />
        </svg>
      );

    case 'scikitlearn':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
          <circle cx="9.5" cy="13.5" r="5.5" fill="rgba(251,146,60,0.2)" stroke="#FB923C" strokeWidth="1.5" />
          <circle cx="15" cy="9.5" r="4.2" fill="rgba(56,189,248,0.2)" stroke="#38BDF8" strokeWidth="1.5" />
          <circle cx="12.5" cy="11.5" r="1.2" fill="#F8FAFC" />
        </svg>
      );

    case 'html':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
          <path
            d="M4.5 3.5h15l-1.4 15L12 20.5l-6.1-2-1.4-15Z"
            stroke="#FB923C"
            strokeWidth="1.5"
            fill="rgba(251,146,60,0.12)"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 8h7l-.3 3h-6.4l.3 3.2 2.9.9 2.9-.9.2-1.9"
            stroke="#FDBA74"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'css':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
          <path
            d="M4.5 3.5h15l-1.4 15L12 20.5l-6.1-2-1.4-15Z"
            stroke="#38BDF8"
            strokeWidth="1.5"
            fill="rgba(56,189,248,0.12)"
            strokeLinejoin="round"
          />
          <path
            d="M8 8h8l-.5 3.2H9.2l4.8 1.5-.3 2.5-1.7.6-2-.6-.2-1.2"
            stroke="#7DD3FC"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'react':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
          <circle cx="12" cy="12" r="1.9" fill="#22D3EE" />
          <ellipse cx="12" cy="12" rx="9" ry="3.7" stroke="#22D3EE" strokeWidth="1.35" />
          <ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="3.7"
            transform="rotate(60 12 12)"
            stroke="#38BDF8"
            strokeWidth="1.35"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="3.7"
            transform="rotate(120 12 12)"
            stroke="#60A5FA"
            strokeWidth="1.35"
          />
        </svg>
      );

    case 'git':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
          <rect
            x="12"
            y="2.5"
            width="13.4"
            height="13.4"
            rx="2.4"
            transform="rotate(45 12 2.5)"
            stroke="#F97316"
            strokeWidth="1.5"
            fill="rgba(249,115,22,0.12)"
          />
          <circle cx="12" cy="9" r="1.4" fill="#FDBA74" />
          <circle cx="12" cy="15.2" r="1.4" fill="#FDBA74" />
          <circle cx="15.2" cy="12" r="1.4" fill="#FDBA74" />
          <path d="M12 10.4v3.4M13 10l1.4 1.3" stroke="#FDBA74" strokeWidth="1.4" />
        </svg>
      );

    case 'github':
      return <GitHubBrandIcon className={`${className} text-slate-200`} />;

    case 'vscode':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
          <path
            d="M16.5 3.5L20 5.3v13.4l-3.5 1.8L8.2 13.8 5 16.3l-1.5-1.1V8.8L5 7.7l3.2 2.5 8.3-6.7Z"
            stroke="#38BDF8"
            strokeWidth="1.5"
            fill="rgba(56,189,248,0.14)"
            strokeLinejoin="round"
          />
          <path d="M16.5 3.5v17" stroke="#60A5FA" strokeWidth="1.4" />
        </svg>
      );

    case 'colab':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
          <path
            d="M9.5 16.5a4.5 4.5 0 1 1 0-9c1.5 0 2.8.7 3.6 1.8"
            stroke="#FBBF24"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M14.5 7.5a4.5 4.5 0 1 1 0 9c-1.5 0-2.8-.7-3.6-1.8"
            stroke="#F59E0B"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

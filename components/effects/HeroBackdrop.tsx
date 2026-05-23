export function HeroBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-forest-950 via-forest-900 to-forest-800/30" />

      <div className="absolute inset-x-0 top-0 h-72">
        <div className="cloud cloud-a" />
        <div className="cloud cloud-b" />
        <div className="cloud cloud-c" />
      </div>

      <svg
        className="absolute inset-x-0 bottom-0 w-full"
        viewBox="0 0 1440 360"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="m1" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#1a5a46" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0b3d2e" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="m2" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#134a3a" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#061f17" />
          </linearGradient>
          <linearGradient id="m3" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#0b3d2e" />
            <stop offset="100%" stopColor="#04130d" />
          </linearGradient>
        </defs>

        <path
          d="M0,220 L120,180 L220,210 L340,160 L460,200 L580,170 L720,210 L860,150 L980,200 L1120,170 L1260,210 L1440,180 L1440,360 L0,360 Z"
          fill="url(#m1)"
        />
        <path
          d="M0,260 L100,230 L220,260 L320,220 L440,260 L560,230 L700,270 L820,230 L960,270 L1100,240 L1240,270 L1440,240 L1440,360 L0,360 Z"
          fill="url(#m2)"
        />
        <path
          d="M0,310 L80,290 L180,310 L300,280 L420,310 L540,290 L680,320 L820,290 L960,320 L1100,290 L1280,320 L1440,300 L1440,360 L0,360 Z"
          fill="url(#m3)"
        />

        <g fill="#04130d" opacity="0.92">
          <polygon points="60,360 80,300 100,360" />
          <polygon points="120,360 140,310 160,360" />
          <polygon points="240,360 260,290 280,360" />
          <polygon points="380,360 400,300 420,360" />
          <polygon points="520,360 540,295 560,360" />
          <polygon points="680,360 700,290 720,360" />
          <polygon points="820,360 840,300 860,360" />
          <polygon points="980,360 1000,290 1020,360" />
          <polygon points="1140,360 1160,300 1180,360" />
          <polygon points="1300,360 1320,295 1340,360" />
        </g>
      </svg>

      <style>{`
        .cloud {
          position: absolute;
          top: 0;
          width: 220px;
          height: 70px;
          background:
            radial-gradient(40px 30px at 30% 50%, rgba(244,233,205,0.16), transparent 70%),
            radial-gradient(60px 36px at 55% 55%, rgba(244,233,205,0.18), transparent 75%),
            radial-gradient(40px 28px at 78% 50%, rgba(244,233,205,0.14), transparent 70%);
          filter: blur(1px);
          will-change: transform;
        }
        .cloud-a { top: 30px;  animation: drift 70s linear infinite; }
        .cloud-b { top: 90px;  animation: drift 95s linear infinite -30s; opacity: 0.7; transform: scale(1.4); }
        .cloud-c { top: 160px; animation: drift 120s linear infinite -60s; opacity: 0.5; transform: scale(0.9); }
        @keyframes drift {
          0%   { transform: translateX(-25vw); }
          100% { transform: translateX(125vw); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cloud { animation: none; }
        }
      `}</style>
    </div>
  );
}

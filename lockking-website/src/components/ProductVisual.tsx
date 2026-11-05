import { useId } from 'react';
import type { ProductVisualVariant } from '../data/products';

interface ProductVisualProps {
  variant: ProductVisualVariant;
  ariaLabel: string;
  label: string;
  caption?: string;
  className?: string;
}

const variantConfig = {
  lever: { x: 374, y: 98, width: 104, height: 214, radius: 12, handle: 92 },
  commercial: { x: 362, y: 84, width: 120, height: 234, radius: 8, handle: 106 },
  slim: { x: 402, y: 72, width: 48, height: 258, radius: 22, handle: 0 },
} as const;

export default function ProductVisual({ variant, ariaLabel, label, caption, className = '' }: ProductVisualProps) {
  const config = variantConfig[variant];
  const rawId = useId().replaceAll(':', '');
  const metalId = `metal-${rawId}`;
  const edgeId = `edge-${rawId}`;
  const glowId = `glow-${rawId}`;

  return (
    <div className={`product-visual product-visual--${variant} ${className}`.trim()}>
      <div className="product-visual__grid" aria-hidden="true" />
      <span className="product-visual__label">{label}</span>
      <svg className="product-visual__art" viewBox="0 0 600 430" role="img" aria-label={ariaLabel}>
        <defs>
          <linearGradient id={metalId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#43546a" />
            <stop offset="0.42" stopColor="#141f2e" />
            <stop offset="0.72" stopColor="#263548" />
            <stop offset="1" stopColor="#090f18" />
          </linearGradient>
          <linearGradient id={edgeId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7d8fa8" stopOpacity="0.9" />
            <stop offset="1" stopColor="#1a2534" stopOpacity="0.2" />
          </linearGradient>
          <radialGradient id={glowId}>
            <stop offset="0" stopColor="#2563EB" stopOpacity="0.5" />
            <stop offset="1" stopColor="#2563EB" stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse cx="334" cy="382" rx="210" ry="26" fill="#02060b" opacity="0.62" />
        <circle cx="448" cy="188" r="178" fill={`url(#${glowId})`} />
        <rect x="307" y="18" width="254" height="388" rx="3" fill="#0b1726" stroke="#3c4f66" strokeWidth="1.2" />
        <rect x="319" y="31" width="230" height="362" rx="2" fill="#101e30" stroke="#23364d" strokeWidth="1" />
        <path d="M325 32v360" stroke="#334b66" strokeWidth="1" opacity="0.8" />
        <path d="M505 48h30v332h-30" fill="none" stroke="#1d3046" strokeWidth="1" />
        <path d="M339 358h190" stroke="#243850" strokeWidth="1" opacity="0.8" />

        <g opacity="0.28" stroke="#8fa2ba" strokeWidth="1">
          <path d="M330 93h18" />
          <path d="M330 111h10" />
          <path d="M330 129h18" />
        </g>

        <g className="product-visual__hardware">
          <rect
            x={config.x + 11}
            y={config.y + 11}
            width={config.width}
            height={config.height}
            rx={config.radius}
            fill="#02060b"
            opacity="0.55"
          />
          <rect
            x={config.x}
            y={config.y}
            width={config.width}
            height={config.height}
            rx={config.radius}
            fill={`url(#${metalId})`}
            stroke={`url(#${edgeId})`}
            strokeWidth="1.4"
          />
          <rect
            x={config.x + 7}
            y={config.y + 7}
            width={config.width - 14}
            height={config.height - 14}
            rx={Math.max(config.radius - 4, 2)}
            fill="none"
            stroke="#7890aa"
            strokeOpacity="0.24"
          />

          <circle cx={config.x + config.width / 2} cy={config.y + 32} r="12" fill="#080f18" stroke="#4c6078" />
          <circle cx={config.x + config.width / 2} cy={config.y + 32} r="5" fill="#2563EB" opacity="0.9" />

          <g fill="#8ea4bd" opacity="0.8">
            {[0, 1, 2].map((row) =>
              [0, 1, 2].map((col) => (
                <circle
                  key={`${row}-${col}`}
                  cx={config.x + config.width / 2 - 18 + col * 18}
                  cy={config.y + 66 + row * 18}
                  r="2.3"
                />
              )),
            )}
          </g>

          {variant === 'slim' ? (
            <>
              <rect x={config.x + 14} y={config.y + 142} width={config.width - 28} height="64" rx="18" fill="#0b1420" stroke="#52667e" />
              <path
                d={`M${config.x + config.width - 8} ${config.y + 158}c18 10 18 42 0 52`}
                fill="none"
                stroke="#9bafc6"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </>
          ) : (
            <>
              <path
                d={`M${config.x + 2} ${config.y + 126}h-${config.handle}`}
                fill="none"
                stroke="#a4b6ca"
                strokeWidth="9"
                strokeLinecap="round"
              />
              <circle cx={config.x - config.handle} cy={config.y + 126} r="11" fill="#101a26" stroke="#9eb1c7" strokeWidth="3" />
              <path
                d={`M${config.x + 30} ${config.y + config.height - 44}h${config.width - 60}`}
                stroke="#6e839a"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.65"
              />
            </>
          )}

          <path
            d={`M${config.x + config.width - 14} ${config.y + 18}v${config.height - 36}`}
            stroke="#c0d0df"
            strokeOpacity="0.2"
            strokeWidth="2"
          />
        </g>

        <g opacity="0.3" fill="none" stroke="#5a7189" strokeWidth="1">
          <path d="M100 48h94" />
          <path d="M100 48v12" />
          <path d="M194 48v12" />
          <path d="M100 381h168" />
          <path d="M100 375v12" />
          <path d="M268 375v12" />
        </g>
        <path d="M92 210h48M92 198v24M140 198v24" stroke="#2563EB" strokeOpacity="0.5" strokeWidth="1" />
      </svg>
      {caption ? <p className="product-visual__caption">{caption}</p> : null}
    </div>
  );
}
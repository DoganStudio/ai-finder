'use client';

import { useState, useEffect, useRef } from 'react';
import { Idea } from '@/lib/types';

interface Props {
  ideas: Idea[];
}

function useCountUp(target: number, duration = 750) {
  const [value, setValue] = useState(0);
  const prevTarget = useRef(0);

  useEffect(() => {
    if (target === prevTarget.current) return;
    prevTarget.current = target;

    const start = Date.now();
    const from = 0;

    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(from + (target - from) * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [target, duration]);

  return value;
}

export default function StatsBar({ ideas }: Props) {
  const totalIdeas = ideas.length;
  const highScore = ideas.filter((i) => i.score >= 80).length;
  const avgGermanyFit = ideas.length
    ? Math.round(ideas.reduce((sum, i) => sum + i.germany_fit, 0) / ideas.length)
    : 0;
  const lastUpdate = ideas.length
    ? new Date(
        Math.max(...ideas.map((i) => new Date(i.generated_at).getTime()))
      ).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
    : '—';

  const displayTotal = useCountUp(totalIdeas);
  const displayHigh = useCountUp(highScore);
  const displayAvg = useCountUp(avgGermanyFit);

  const stats = [
    { label: 'Toplam Fikir', value: String(displayTotal), icon: '💡', color: 'var(--accent)' },
    { label: 'Yüksek Skor (80+)', value: String(displayHigh), icon: '🏆', color: 'var(--accent-green)' },
    { label: 'Ort. Almanya Uyumu', value: `${displayAvg}%`, icon: '🇩🇪', color: 'var(--accent-orange)' },
    { label: 'Son Güncelleme', value: lastUpdate, icon: '🕐', color: 'var(--muted)' },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: '12px',
      marginBottom: '24px',
    }}>
      {stats.map(({ label, value, icon, color }, idx) => (
        <StatCard
          key={label}
          label={label}
          value={value}
          icon={icon}
          color={color}
          delay={idx * 60}
        />
      ))}
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  color,
  delay,
}: {
  label: string;
  value: string;
  icon: string;
  color: string;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="animate-fadeInUp"
      style={{
        animationDelay: `${delay}ms`,
        background: hovered
          ? 'linear-gradient(145deg, var(--surface), var(--surface2))'
          : 'var(--surface)',
        border: `1px solid ${hovered ? 'rgba(124,106,255,0.35)' : 'var(--border)'}`,
        borderRadius: '14px',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        transition: 'all 0.25s cubic-bezier(0.34,1.4,0.64,1)',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered ? '0 4px 20px rgba(124,106,255,0.1)' : 'none',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Subtle top line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(124,106,255,0.4), transparent)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s',
      }} />

      <span style={{
        fontSize: '24px',
        transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        transform: hovered ? 'scale(1.15) rotate(-5deg)' : 'scale(1) rotate(0deg)',
        display: 'inline-block',
      }}>
        {icon}
      </span>
      <div>
        <div style={{
          fontSize: '22px',
          fontWeight: 800,
          color,
          fontFamily: 'var(--font-dm-mono)',
          lineHeight: 1.2,
          transition: 'color 0.2s',
        }}>
          {value}
        </div>
        <div style={{
          fontSize: '11px',
          color: 'var(--muted)',
          marginTop: '2px',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
        }}>
          {label}
        </div>
      </div>
    </div>
  );
}

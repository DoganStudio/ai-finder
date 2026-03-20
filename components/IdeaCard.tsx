'use client';

import { useState } from 'react';
import { Idea } from '@/lib/types';

interface Props {
  idea: Idea;
  onSave: (idea: Idea) => void;
  onClick: (idea: Idea) => void;
  delay?: number;
}

function getScoreClass(score: number) {
  if (score >= 80) return 'score-high';
  if (score >= 60) return 'score-medium';
  return 'score-low';
}

function getCardBorderClass(score: number) {
  if (score >= 80) return 'card-border-high';
  if (score >= 60) return 'card-border-medium';
  return 'card-border-low';
}

function getDifficultyColor(difficulty: string) {
  if (difficulty === 'Kolay') return 'var(--accent-green)';
  if (difficulty === 'Orta') return 'var(--accent-orange)';
  return 'var(--accent-red)';
}

function getCategoryLabel(category: string) {
  if (category === 'mikro') return 'Mikro SaaS';
  if (category === 'b2b') return 'B2B';
  return 'Mimarlık';
}

function getScoreGlow(score: number) {
  if (score >= 80) return 'rgba(106,255,212,0.12)';
  if (score >= 60) return 'rgba(255,184,106,0.12)';
  return 'rgba(255,106,106,0.12)';
}

export default function IdeaCard({ idea, onSave, onClick, delay = 0 }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isSaveHovered, setIsSaveHovered] = useState(false);

  return (
    <div
      className={`animate-fadeInUp ${getCardBorderClass(idea.score)}`}
      onClick={() => onClick(idea)}
      style={{
        animationDelay: `${delay}ms`,
        background: isHovered
          ? `linear-gradient(145deg, var(--surface), ${getScoreGlow(idea.score)})`
          : 'var(--surface)',
        border: '1px solid',
        borderRadius: '16px',
        padding: '24px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        transition: 'transform 0.25s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.25s ease, background 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered ? 'var(--card-hover-shadow)' : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top glow line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: idea.score >= 80
          ? 'linear-gradient(90deg, transparent, rgba(106,255,212,0.6), transparent)'
          : idea.score >= 60
          ? 'linear-gradient(90deg, transparent, rgba(255,184,106,0.6), transparent)'
          : 'linear-gradient(90deg, transparent, rgba(255,106,106,0.6), transparent)',
        transition: 'opacity 0.3s',
        opacity: isHovered ? 1 : 0.5,
      }} />

      {/* Shine sweep on hover */}
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '-120%',
            width: '60%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.035), transparent)',
            animation: 'shine 0.55s ease forwards',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      )}

      {/* Header: Title + Score */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', position: 'relative', zIndex: 1 }}>
        <h3 style={{
          fontSize: '15px',
          fontWeight: 700,
          color: 'var(--text)',
          lineHeight: 1.3,
          fontFamily: 'var(--font-syne)',
          flex: 1,
          transition: 'color 0.2s',
        }}>
          {idea.title}
        </h3>
        <span
          className={getScoreClass(idea.score)}
          style={{
            fontSize: '13px',
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: '8px',
            whiteSpace: 'nowrap',
            fontFamily: 'var(--font-dm-mono)',
            flexShrink: 0,
            transition: 'box-shadow 0.3s',
            boxShadow: isHovered
              ? idea.score >= 80
                ? '0 0 12px rgba(106,255,212,0.3)'
                : idea.score >= 60
                ? '0 0 12px rgba(255,184,106,0.3)'
                : '0 0 12px rgba(255,106,106,0.3)'
              : 'none',
          }}
        >
          {idea.score}
        </span>
      </div>

      {/* Description */}
      <p style={{
        fontSize: '13px',
        color: 'var(--muted)',
        lineHeight: 1.6,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1,
      }}>
        {idea.description}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', position: 'relative', zIndex: 1 }}>
        <span style={{
          fontSize: '11px',
          fontWeight: 600,
          padding: '3px 10px',
          borderRadius: '20px',
          background: 'rgba(124,106,255,0.15)',
          color: 'var(--accent)',
          border: '1px solid rgba(124,106,255,0.25)',
          transition: 'background 0.2s',
        }}>
          {getCategoryLabel(idea.category)}
        </span>
        {idea.tags.slice(0, 2).map((tag) => (
          <span key={tag} style={{
            fontSize: '11px',
            padding: '3px 10px',
            borderRadius: '20px',
            background: 'var(--surface2)',
            color: 'var(--muted)',
            border: '1px solid var(--border)',
          }}>
            {tag}
          </span>
        ))}
        <span style={{
          fontSize: '11px',
          fontWeight: 600,
          padding: '3px 10px',
          borderRadius: '20px',
          background: 'rgba(106,255,212,0.08)',
          color: 'var(--accent-green)',
          border: '1px solid rgba(106,255,212,0.2)',
        }}>
          🇩🇪 {idea.germany_fit}%
        </span>
      </div>

      {/* Metrics row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '8px',
        padding: '12px',
        background: 'var(--surface2)',
        borderRadius: '10px',
        border: '1px solid var(--border)',
        position: 'relative',
        zIndex: 1,
      }}>
        {[
          { label: 'Gelir', value: idea.revenue_potential },
          { label: 'Zorluk', value: idea.difficulty, color: getDifficultyColor(idea.difficulty) },
          { label: 'MVP', value: idea.time_to_mvp },
        ].map(({ label, value, color }) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '10px', color: 'var(--muted)', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {label}
            </div>
            <div style={{
              fontSize: '12px',
              fontWeight: 600,
              color: color || 'var(--text)',
              fontFamily: 'var(--font-dm-mono)',
            }}>
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* Market size */}
      <div style={{ fontSize: '12px', color: 'var(--muted)', position: 'relative', zIndex: 1 }}>
        <span style={{ color: 'var(--text)', fontWeight: 500 }}>Pazar: </span>
        {idea.market_size}
      </div>

      {/* Archive button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onSave(idea);
        }}
        onMouseEnter={() => setIsSaveHovered(true)}
        onMouseLeave={() => setIsSaveHovered(false)}
        style={{
          marginTop: '2px',
          padding: '9px 16px',
          borderRadius: '10px',
          background: idea.isSaved
            ? 'rgba(106,255,212,0.12)'
            : isSaveHovered
            ? 'rgba(124,106,255,0.2)'
            : 'rgba(124,106,255,0.1)',
          border: idea.isSaved ? '1px solid rgba(106,255,212,0.35)' : '1px solid rgba(124,106,255,0.3)',
          color: idea.isSaved ? 'var(--accent-green)' : 'var(--accent)',
          fontSize: '13px',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          fontFamily: 'var(--font-syne)',
          width: '100%',
          position: 'relative',
          zIndex: 1,
          transform: isSaveHovered && !idea.isSaved ? 'scale(1.01)' : 'scale(1)',
        }}
      >
        {idea.isSaved ? '✅ Arşivlendi' : '🔖 Arşive Kaydet'}
      </button>
    </div>
  );
}

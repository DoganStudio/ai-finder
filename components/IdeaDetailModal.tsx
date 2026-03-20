'use client';

import { Idea } from '@/lib/types';
import { useEffect, useRef } from 'react';

interface Props {
  idea: Idea;
  onClose: () => void;
  onSave: (idea: Idea) => void;
}

function getScoreClass(score: number) {
  if (score >= 80) return 'score-high';
  if (score >= 60) return 'score-medium';
  return 'score-low';
}

function getDifficultyColor(difficulty: string) {
  if (difficulty === 'Kolay') return 'var(--accent-green)';
  if (difficulty === 'Orta') return 'var(--accent-orange)';
  return 'var(--accent-red)';
}

export default function IdeaDetailModal({ idea, onClose, onSave }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      className="animate-fadeIn"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        background: 'rgba(10,10,15,0.88)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div
        className="animate-scale-fade-in"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          padding: '32px',
          maxWidth: '680px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          position: 'relative',
          boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,106,255,0.1)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'var(--surface2)',
            border: '1px solid var(--border)',
            color: 'var(--muted)',
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.15s',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--text)')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)')}
        >
          ✕
        </button>

        {/* Title + Score */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', paddingRight: '40px' }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-syne)', lineHeight: 1.3 }}>
              {idea.title}
            </h2>
            <p style={{ marginTop: '8px', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6 }}>
              {idea.description}
            </p>
          </div>
          <span
            className={getScoreClass(idea.score)}
            style={{
              fontSize: '22px',
              fontWeight: 800,
              padding: '8px 14px',
              borderRadius: '12px',
              fontFamily: 'var(--font-dm-mono)',
              flexShrink: 0,
            }}
          >
            {idea.score}
          </span>
        </div>

        {/* Metrics grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '10px',
        }}>
          {[
            { label: '💶 Gelir Potansiyeli', value: idea.revenue_potential },
            { label: '⏱ MVP Süresi', value: idea.time_to_mvp },
            { label: '🔧 Zorluk', value: idea.difficulty, color: getDifficultyColor(idea.difficulty) },
            { label: '🇩🇪 Almanya Uyumu', value: `${idea.germany_fit}%` },
            { label: '📊 Pazar Büyüklüğü', value: idea.market_size },
          ].map(({ label, value, color }) => (
            <div key={label} style={{
              padding: '12px 16px',
              background: 'var(--surface2)',
              borderRadius: '10px',
              border: '1px solid var(--border)',
            }}>
              <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '4px' }}>{label}</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: color || 'var(--text)', fontFamily: 'var(--font-dm-mono)' }}>{value}</div>
            </div>
          ))}
        </div>

        {/* Sections */}
        {[
          { title: '🎯 Acı Modeli', content: idea.pain_model },
          { title: '💰 Para Kazanma Modeli', content: idea.monetization },
          { title: '⚔️ Rakipler & Fark', content: idea.competitors },
        ].map(({ title, content }) => (
          <Section key={title} title={title}>
            <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.7 }}>{content}</p>
          </Section>
        ))}

        {/* Tools */}
        <Section title="🛠 Gerekli Araçlar">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {idea.tools.map((tool) => (
              <span key={tool} style={{
                fontSize: '12px',
                padding: '4px 12px',
                borderRadius: '20px',
                background: 'rgba(124,106,255,0.1)',
                color: 'var(--accent)',
                border: '1px solid rgba(124,106,255,0.2)',
                fontFamily: 'var(--font-dm-mono)',
              }}>
                {tool}
              </span>
            ))}
          </div>
        </Section>

        {/* MVP Steps */}
        <Section title="🚀 MVP Adımları">
          <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {idea.steps.map((step, i) => (
              <li key={i} style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6 }}>
                {step}
              </li>
            ))}
          </ol>
        </Section>

        {/* Risks */}
        <Section title="⚠️ Riskler">
          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {idea.risks.map((risk, i) => (
              <li key={i} style={{ fontSize: '13px', color: 'var(--accent-red)', lineHeight: 1.6 }}>
                {risk}
              </li>
            ))}
          </ul>
        </Section>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px', paddingTop: '8px' }}>
          <button
            onClick={() => onSave(idea)}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '12px',
              background: idea.isSaved ? 'rgba(106,255,212,0.1)' : 'rgba(124,106,255,0.15)',
              border: idea.isSaved ? '1px solid rgba(106,255,212,0.3)' : '1px solid rgba(124,106,255,0.3)',
              color: idea.isSaved ? 'var(--accent-green)' : 'var(--accent)',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'var(--font-syne)',
              transition: 'all 0.15s',
            }}
          >
            {idea.isSaved ? '✅ Arşivlendi' : '🔖 Arşive Kaydet'}
          </button>
          <button
            onClick={onClose}
            style={{
              padding: '12px 24px',
              borderRadius: '12px',
              background: 'var(--surface2)',
              border: '1px solid var(--border)',
              color: 'var(--muted)',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'var(--font-syne)',
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--text)')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)')}
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 style={{
        fontSize: '13px',
        fontWeight: 700,
        color: 'var(--text)',
        marginBottom: '10px',
        fontFamily: 'var(--font-syne)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
      }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

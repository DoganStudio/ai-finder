'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Idea } from '@/lib/types';
import { createBrowserClient } from '@/lib/supabase/client';
import IdeaCard from '@/components/IdeaCard';
import IdeaDetailModal from '@/components/IdeaDetailModal';
import SkeletonCard from '@/components/SkeletonCard';

export default function ArsivPage() {
  const router = useRouter();
  const [savedIdeas, setSavedIdeas] = useState<Idea[]>([]);
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadSaved = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch('/api/ideas/saved');
      if (!res.ok) throw new Error('Arşiv alınamadı');
      const { saved } = await res.json();
      setSavedIdeas(
        (saved ?? [])
          .filter((s: any) => s.idea)
          .map((s: any) => ({ ...s.idea, isSaved: true }))
      );
    } catch {
      setError('Arşiv yüklenemedi. Sayfayı yenileyin.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { loadSaved(); }, [loadSaved]);

  const handleRemove = async (idea: Idea) => {
    // Optimistic update
    setSavedIdeas((prev) => prev.filter((i) => i.id !== idea.id));
    setSelectedIdea(null);

    try {
      await fetch(`/api/ideas/save/${idea.id}`, { method: 'DELETE' });
    } catch {
      // Hata durumunda geri yükle
      loadSaved();
    }
  };

  const handleLogout = async () => {
    const supabase = createBrowserClient();
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Top nav */}
      <nav style={{
        borderBottom: '1px solid var(--border)',
        background: 'rgba(17,17,24,0.8)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <button
            onClick={() => router.push('/dashboard')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: '20px' }}>⚡</span>
            <span style={{
              fontSize: '16px',
              fontWeight: 800,
              color: 'var(--text)',
              fontFamily: 'var(--font-syne)',
            }}>
              SaaS Fikir Motoru
            </span>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => router.push('/dashboard')}
              style={{
                background: 'none',
                border: '1px solid var(--border)',
                color: 'var(--muted)',
                padding: '6px 14px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 600,
                fontFamily: 'var(--font-syne)',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--text)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(124,106,255,0.4)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
              }}
            >
              ← Dashboard
            </button>
            <button
              onClick={handleLogout}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--muted)',
                cursor: 'pointer',
                fontSize: '13px',
                fontFamily: 'var(--font-syne)',
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--text)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)')}
            >
              Çıkış →
            </button>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 800,
            color: 'var(--text)',
            fontFamily: 'var(--font-syne)',
            letterSpacing: '-0.02em',
            marginBottom: '6px',
          }}>
            🔖 Arşivim
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '14px' }}>
            Kaydettiğin SaaS fikirleri —{' '}
            <span style={{ color: 'var(--accent)', fontWeight: 600 }}>
              {savedIdeas.length}
            </span>{' '}
            fikir
          </p>
        </div>

        {error && (
          <div style={{
            marginBottom: '20px',
            padding: '12px 16px',
            borderRadius: '10px',
            background: 'rgba(255,106,106,0.1)',
            border: '1px solid rgba(255,106,106,0.3)',
            color: 'var(--accent-red)',
            fontSize: '13px',
          }}>
            ⚠️ {error}
          </div>
        )}

        {isLoading ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '20px',
          }}>
            {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : savedIdeas.length === 0 ? (
          <div
            className="animate-fadeInUp"
            style={{ textAlign: 'center', padding: '100px 24px', color: 'var(--muted)' }}
          >
            <div style={{ fontSize: '56px', marginBottom: '20px' }}>📂</div>
            <h2 style={{
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--text)',
              fontFamily: 'var(--font-syne)',
              marginBottom: '10px',
            }}>
              Henüz arşive fikir kaydetmediniz
            </h2>
            <p style={{ fontSize: '14px', marginBottom: '24px' }}>
              Dashboard'da beğendiğin fikirlere 🔖 ile kaydet.
            </p>
            <button
              onClick={() => router.push('/dashboard')}
              style={{
                padding: '12px 24px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, var(--accent), var(--accent-dim))',
                border: 'none',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'var(--font-syne)',
              }}
            >
              Dashboard'a Git →
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '20px',
          }}>
            {savedIdeas.map((idea, idx) => (
              <div key={idea.id} style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  zIndex: 10,
                  background: 'rgba(106,255,212,0.15)',
                  border: '1px solid rgba(106,255,212,0.3)',
                  color: 'var(--accent-green)',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: '20px',
                }}>
                  ✅ Kaydedildi
                </div>
                <IdeaCard
                  idea={idea}
                  delay={idx * 80}
                  onSave={handleRemove}
                  onClick={setSelectedIdea}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      {selectedIdea && (
        <IdeaDetailModal
          idea={{ ...selectedIdea, isSaved: true }}
          onClose={() => setSelectedIdea(null)}
          onSave={handleRemove}
        />
      )}
    </div>
  );
}

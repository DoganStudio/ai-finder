'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Idea, FilterCategory, SortOption } from '@/lib/types';
import { createBrowserClient } from '@/lib/supabase/client';
import IdeaCard from '@/components/IdeaCard';
import IdeaDetailModal from '@/components/IdeaDetailModal';
import StatsBar from '@/components/StatsBar';
import FilterBar from '@/components/FilterBar';
import SkeletonCard from '@/components/SkeletonCard';

export default function DashboardPage() {
  const router = useRouter();
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [filter, setFilter] = useState<FilterCategory>('all');
  const [sort, setSort] = useState<SortOption>('score');
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  // Fikirleri ve arşivi yükle
  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const [ideasRes, savedRes] = await Promise.all([
        fetch('/api/ideas'),
        fetch('/api/ideas/saved'),
      ]);

      if (!ideasRes.ok || !savedRes.ok) throw new Error('Veri alınamadı');

      const { ideas: fetchedIdeas } = await ideasRes.json();
      const { saved } = await savedRes.json();

      setIdeas(fetchedIdeas ?? []);
      setSavedIds(new Set((saved ?? []).map((s: any) => s.idea?.id ?? s.idea_id)));
    } catch {
      setError('Veriler yüklenemedi. Sayfayı yenileyin.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const ideasWithSaved = useMemo(
    () => ideas.map((i) => ({ ...i, isSaved: savedIds.has(i.id) })),
    [ideas, savedIds]
  );

  const filtered = useMemo(() => {
    let result = filter === 'all' ? ideasWithSaved : ideasWithSaved.filter((i) => i.category === filter);
    return [...result].sort((a, b) => {
      if (sort === 'score') return b.score - a.score;
      if (sort === 'germany_fit') return b.germany_fit - a.germany_fit;
      if (sort === 'difficulty') {
        const order = { Kolay: 0, Orta: 1, Zor: 2 };
        return order[a.difficulty] - order[b.difficulty];
      }
      return 0;
    });
  }, [ideasWithSaved, filter, sort]);

  const handleSave = async (idea: Idea) => {
    const isSaved = savedIds.has(idea.id);

    // Optimistic update
    setSavedIds((prev) => {
      const next = new Set(prev);
      isSaved ? next.delete(idea.id) : next.add(idea.id);
      return next;
    });

    try {
      if (isSaved) {
        await fetch(`/api/ideas/save/${idea.id}`, { method: 'DELETE' });
      } else {
        await fetch('/api/ideas/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idea_id: idea.id }),
        });
      }
    } catch {
      // Hata durumunda geri al
      setSavedIds((prev) => {
        const next = new Set(prev);
        isSaved ? next.add(idea.id) : next.delete(idea.id);
        return next;
      });
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError('');
    try {
      const res = await fetch('/api/ideas/generate', { method: 'POST' });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Fikir üretilemedi');
      }
      await loadData();
    } catch (err: any) {
      setError(err.message ?? 'Fikir üretirken bir hata oluştu. Tekrar deneyin.');
    } finally {
      setIsGenerating(false);
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px' }}>⚡</span>
            <span style={{
              fontSize: '16px',
              fontWeight: 800,
              color: 'var(--text)',
              fontFamily: 'var(--font-syne)',
              letterSpacing: '-0.01em',
            }}>
              SaaS Fikir Motoru
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              id="arsiv-link"
              onClick={() => router.push('/arsiv')}
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
              🔖 Arşivim
            </button>
            <button
              id="logout-btn"
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

      {/* Main content */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 800,
            color: 'var(--text)',
            fontFamily: 'var(--font-syne)',
            letterSpacing: '-0.02em',
            marginBottom: '6px',
          }}>
            Fikir Board'u
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '14px' }}>
            Almanya B2B pazarı için AI tarafından üretilen SaaS fikirleri
          </p>
        </div>

        <StatsBar ideas={ideasWithSaved} />

        <FilterBar
          activeFilter={filter}
          activeSort={sort}
          onFilterChange={setFilter}
          onSortChange={setSort}
          onGenerate={handleGenerate}
          isLoading={isGenerating}
        />

        {/* Hata mesajı */}
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

        {/* Ideas Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '20px',
        }}>
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : filtered.length === 0
            ? (
              <div style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: '80px 24px',
                color: 'var(--muted)',
              }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔍</div>
                <p style={{ fontSize: '16px' }}>
                  {ideas.length === 0
                    ? '⚡ "Fikirleri Getir" butonuna basarak ilk fikirleri üret!'
                    : 'Bu kategoride fikir bulunamadı.'}
                </p>
              </div>
            )
            : filtered.map((idea, idx) => (
              <IdeaCard
                key={idea.id}
                idea={idea}
                delay={idx * 80}
                onSave={handleSave}
                onClick={setSelectedIdea}
              />
            ))}
        </div>
      </main>

      {/* Modal */}
      {selectedIdea && (
        <IdeaDetailModal
          idea={{ ...selectedIdea, isSaved: savedIds.has(selectedIdea.id) }}
          onClose={() => setSelectedIdea(null)}
          onSave={(idea) => handleSave(idea)}
        />
      )}
    </div>
  );
}

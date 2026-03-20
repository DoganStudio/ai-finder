'use client';

import { FilterCategory, SortOption } from '@/lib/types';

interface Props {
  activeFilter: FilterCategory;
  activeSort: SortOption;
  onFilterChange: (f: FilterCategory) => void;
  onSortChange: (s: SortOption) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const FILTERS: { key: FilterCategory; label: string }[] = [
  { key: 'all', label: 'Tümü' },
  { key: 'mikro', label: 'Mikro SaaS' },
  { key: 'b2b', label: 'B2B' },
  { key: 'mimarlik', label: 'Mimarlık' },
];

const SORTS: { key: SortOption; label: string }[] = [
  { key: 'score', label: 'Skor ↓' },
  { key: 'difficulty', label: 'En Kolay' },
  { key: 'germany_fit', label: 'Almanya Uyumu' },
];

export default function FilterBar({
  activeFilter,
  activeSort,
  onFilterChange,
  onSortChange,
  onGenerate,
  isLoading,
}: Props) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      flexWrap: 'wrap',
      marginBottom: '28px',
    }}>
      {/* Filter buttons */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', flex: 1 }}>
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'var(--font-syne)',
              transition: 'all 0.15s ease',
              background: activeFilter === key ? 'var(--accent)' : 'var(--surface)',
              color: activeFilter === key ? '#fff' : 'var(--muted)',
              border: activeFilter === key ? '1px solid var(--accent)' : '1px solid var(--border)',
            }}
            onMouseEnter={(e) => {
              if (activeFilter !== key)
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(124,106,255,0.5)';
            }}
            onMouseLeave={(e) => {
              if (activeFilter !== key)
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Sort dropdown */}
      <select
        value={activeSort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        style={{
          padding: '8px 14px',
          borderRadius: '10px',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          color: 'var(--text)',
          fontSize: '13px',
          fontFamily: 'var(--font-syne)',
          cursor: 'pointer',
          outline: 'none',
        }}
      >
        {SORTS.map(({ key, label }) => (
          <option key={key} value={key} style={{ background: 'var(--surface)' }}>
            {label}
          </option>
        ))}
      </select>

      {/* Generate button */}
      <button
        id="generate-ideas-btn"
        onClick={onGenerate}
        disabled={isLoading}
        className={isLoading ? '' : 'btn-pulse'}
        style={{
          padding: '10px 20px',
          borderRadius: '12px',
          background: isLoading
            ? 'rgba(124,106,255,0.3)'
            : 'linear-gradient(135deg, var(--accent), var(--accent-dim))',
          border: 'none',
          color: '#fff',
          fontSize: '14px',
          fontWeight: 700,
          cursor: isLoading ? 'not-allowed' : 'pointer',
          fontFamily: 'var(--font-syne)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          whiteSpace: 'nowrap',
          transition: 'opacity 0.15s',
          opacity: isLoading ? 0.7 : 1,
        }}
      >
        {isLoading ? (
          <>
            <span style={{
              width: '14px',
              height: '14px',
              border: '2px solid rgba(255,255,255,0.3)',
              borderTopColor: '#fff',
              borderRadius: '50%',
              display: 'inline-block',
              animation: 'spin-slow 0.8s linear infinite',
            }} />
            Üretiyor...
          </>
        ) : (
          '⚡ Fikirleri Getir'
        )}
      </button>
    </div>
  );
}

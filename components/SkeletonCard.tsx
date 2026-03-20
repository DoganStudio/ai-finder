'use client';

export default function SkeletonCard() {
  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div
          className="skeleton-shimmer"
          style={{ height: '20px', width: '60%', borderRadius: '6px' }}
        />
        <div
          className="skeleton-shimmer"
          style={{ height: '28px', width: '48px', borderRadius: '8px' }}
        />
      </div>

      {/* Description lines */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div className="skeleton-shimmer" style={{ height: '14px', borderRadius: '4px' }} />
        <div className="skeleton-shimmer" style={{ height: '14px', width: '80%', borderRadius: '4px' }} />
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <div className="skeleton-shimmer" style={{ height: '24px', width: '72px', borderRadius: '20px' }} />
        <div className="skeleton-shimmer" style={{ height: '24px', width: '56px', borderRadius: '20px' }} />
        <div className="skeleton-shimmer" style={{ height: '24px', width: '80px', borderRadius: '20px' }} />
      </div>

      {/* Metrics */}
      <div style={{ display: 'flex', gap: '12px' }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ flex: 1 }}>
            <div className="skeleton-shimmer" style={{ height: '12px', width: '50%', borderRadius: '4px', marginBottom: '6px' }} />
            <div className="skeleton-shimmer" style={{ height: '16px', borderRadius: '4px' }} />
          </div>
        ))}
      </div>

      {/* Button */}
      <div
        className="skeleton-shimmer"
        style={{ height: '36px', borderRadius: '8px', marginTop: '4px' }}
      />
    </div>
  );
}

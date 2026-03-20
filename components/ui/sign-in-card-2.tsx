'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@/lib/supabase/client';

export function SignInCard() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('E-posta ve şifre gereklidir.'); return; }
    if (!validateEmail(email)) { setError('Geçerli bir e-posta adresi girin.'); return; }

    setError('');
    setIsLoading(true);

    const supabase = createBrowserClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError('E-posta veya şifre hatalı.');
      setIsLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden w-full"
      style={{ background: '#0a0a0f', fontFamily: 'var(--font-syne), sans-serif' }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(124,106,255,0.25) 0%, transparent 70%)',
        }}
      />

      {/* Glass card */}
      <div
        className="relative z-10 w-full max-w-sm rounded-3xl shadow-2xl p-8 flex flex-col items-center"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(18,18,18,0.8) 100%)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center justify-center w-12 h-12 rounded-full mb-6 shadow-lg"
          style={{ background: 'rgba(124,106,255,0.2)', border: '1px solid rgba(124,106,255,0.3)' }}
        >
          <span className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-syne)' }}>SF</span>
        </div>

        {/* Title */}
        <h2
          className="text-2xl font-semibold text-white mb-6 text-center"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          SaaS Fikir Motoru
        </h2>

        {/* Form */}
        <form className="flex flex-col w-full gap-4" onSubmit={handleSignIn}>
          <div className="w-full flex flex-col gap-3">
            <input
              placeholder="E-posta"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 rounded-xl text-white text-sm outline-none transition-all"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.08)',
                fontFamily: 'var(--font-syne)',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = 'rgba(124,106,255,0.5)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
            />
            <input
              placeholder="Şifre"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 rounded-xl text-white text-sm outline-none transition-all"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.08)',
                fontFamily: 'var(--font-syne)',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = 'rgba(124,106,255,0.5)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
            />
            {error && (
              <div className="text-sm text-red-400 text-left">{error}</div>
            )}
          </div>

          <hr style={{ borderColor: 'rgba(255,255,255,0.08)' }} />

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full font-medium px-5 py-3 rounded-full text-sm text-white transition mb-3 flex items-center justify-center gap-2 disabled:opacity-60"
              style={{ background: '#7c6aff' }}
              onMouseEnter={e => !isLoading && (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              {isLoading ? (
                <span
                  className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
                  style={{ animation: 'spin 0.7s linear infinite', display: 'inline-block' }}
                />
              ) : 'Giriş Yap'}
            </button>

            <div className="w-full text-center mt-2">
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Hesabın yoksa yöneticiden erişim iste.
              </span>
            </div>
          </div>
        </form>
      </div>

      {/* Bottom text */}
      <div className="relative z-10 mt-10 flex flex-col items-center text-center px-4">
        <p className="text-sm mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Almanya B2B pazarı için{' '}
          <span className="font-medium text-white">AI destekli</span> SaaS fikir motoru.
        </p>
        <div className="flex -space-x-2">
          {[32, 44, 54, 68].map((id, i) => (
            <img
              key={i}
              src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${id}.jpg`}
              alt="user"
              className="w-8 h-8 rounded-full object-cover"
              style={{ border: '2px solid #0a0a0f' }}
            />
          ))}
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

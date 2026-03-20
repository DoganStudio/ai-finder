'use client';

import React from "react";
import Link from "next/link";
import { ArrowRight, Play, Zap, Target, Sparkles, Database, Code, Globe, Building, TrendingUp, Search } from "lucide-react";

const FEATURES = [
  { name: "Claude API", icon: Zap },
  { name: "Supabase", icon: Database },
  { name: "Next.js", icon: Code },
  { name: "Vercel", icon: Globe },
  { name: "Almanya B2B", icon: Building },
  { name: "Mikro SaaS", icon: Target },
  { name: "Trend Analizi", icon: TrendingUp },
  { name: "Pazar Araştırması", icon: Search },
];

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center justify-center transition-transform hover:-translate-y-1 cursor-default">
    <span className="text-xl font-bold text-white sm:text-2xl">{value}</span>
    <span className="text-[10px] uppercase tracking-wider font-medium sm:text-xs" style={{ color: '#6b6b80' }}>
      {label}
    </span>
  </div>
);

export default function HeroSection() {
  return (
    <div
      className="relative w-full text-white overflow-hidden"
      style={{ background: '#0a0a0f', fontFamily: 'var(--font-syne), sans-serif' }}
    >
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .hero-fade-in { animation: fadeSlideIn 0.8s ease-out forwards; opacity: 0; }
        .hero-marquee { animation: marquee 40s linear infinite; }
        .hero-delay-100 { animation-delay: 0.1s; }
        .hero-delay-200 { animation-delay: 0.2s; }
        .hero-delay-300 { animation-delay: 0.3s; }
        .hero-delay-400 { animation-delay: 0.4s; }
        .hero-delay-500 { animation-delay: 0.5s; }
      `}</style>

      {/* CSS Grid Pattern Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(124,106,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,106,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      {/* Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-b-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(124,106,255,0.12) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-24 pb-12 sm:px-6 md:pt-32 md:pb-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-start">

          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8 pt-8">

            {/* Badge */}
            <div className="hero-fade-in hero-delay-100">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 backdrop-blur-md transition-colors cursor-default"
                style={{ border: '1px solid rgba(124,106,255,0.3)', background: 'rgba(124,106,255,0.08)' }}
              >
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider" style={{ color: '#9580ff' }}>
                  Yapay Zeka Destekli ✦
                </span>
              </div>
            </div>

            {/* H1 */}
            <h1
              className="hero-fade-in hero-delay-200 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tighter leading-[0.9]"
              style={{
                maskImage: 'linear-gradient(180deg, black 0%, black 80%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(180deg, black 0%, black 80%, transparent 100%)',
              }}
            >
              Almanya&apos;da Her Gün<br />
              Yeni Bir{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(135deg, #ffffff, #ffffff, #7c6aff)' }}
              >
                SaaS
              </span>
              <br />
              Fırsatı Bul
            </h1>

            {/* Description */}
            <p className="hero-fade-in hero-delay-300 max-w-xl text-lg leading-relaxed" style={{ color: '#6b6b80' }}>
              Claude AI ile trend SaaS fikirlerini otomatik analiz et,
              Almanya pazarına uygunluğunu öğren, ekibinle birlikte
              bir sonraki projeye hızla başla.
            </p>

            {/* Buttons */}
            <div className="hero-fade-in hero-delay-400 flex flex-col sm:flex-row gap-4">
              <Link
                href="/login"
                className="group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-white transition-all hover:scale-[1.02] hover:opacity-90 active:scale-[0.98]"
                style={{ background: '#7c6aff' }}
              >
                Giriş Yap <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#nasil-calisir"
                className="group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-colors"
                style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
              >
                <Play className="w-4 h-4 fill-current" /> Nasıl Çalışır?
              </a>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 space-y-6 lg:mt-12">

            {/* Stats Card */}
            <div
              className="hero-fade-in hero-delay-500 relative overflow-hidden rounded-3xl p-8 backdrop-blur-xl shadow-2xl"
              style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)' }}
            >
              <div
                className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full pointer-events-none"
                style={{ background: 'rgba(124,106,255,0.08)', filter: 'blur(48px)' }}
              />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{ background: 'rgba(124,106,255,0.15)', border: '1px solid rgba(124,106,255,0.3)' }}
                  >
                    <Zap className="h-6 w-6" style={{ color: '#7c6aff' }} />
                  </div>
                  <div>
                    <div className="text-3xl font-bold tracking-tight text-white">150+</div>
                    <div className="text-sm" style={{ color: '#6b6b80' }}>Fikir Analiz Edildi</div>
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-3 mb-8">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: '#6b6b80' }}>Almanya Pazarı Uyumu</span>
                    <span className="text-white font-medium">%87</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
                    <div
                      className="h-full w-[87%] rounded-full"
                      style={{ background: 'linear-gradient(90deg, #7c6aff, #6affd4)' }}
                    />
                  </div>
                </div>

                <div className="h-px w-full mb-6" style={{ background: 'rgba(255,255,255,0.1)' }} />

                {/* Mini Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <StatItem value="6" label="Fikir/Gün" />
                  <div className="w-px h-full mx-auto" style={{ background: 'rgba(255,255,255,0.1)' }} />
                  <StatItem value="AI" label="Analiz" />
                  <div className="w-px h-full mx-auto" style={{ background: 'rgba(255,255,255,0.1)' }} />
                  <StatItem value="%100" label="Veri" />
                </div>

                {/* Tags */}
                <div className="mt-8 flex flex-wrap gap-2">
                  <div
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-medium tracking-wide"
                    style={{ border: '1px solid rgba(106,255,212,0.2)', background: 'rgba(106,255,212,0.06)', color: '#6affd4' }}
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#6affd4' }} />
                      <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#6affd4' }} />
                    </span>
                    AKTİF
                  </div>
                  <div
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-medium tracking-wide"
                    style={{ border: '1px solid rgba(124,106,255,0.2)', background: 'rgba(124,106,255,0.06)', color: '#9580ff' }}
                  >
                    <Sparkles className="w-3 h-3" /> BETA
                  </div>
                </div>
              </div>
            </div>

            {/* Marquee Card */}
            <div
              className="hero-fade-in hero-delay-500 relative overflow-hidden rounded-3xl py-8 backdrop-blur-xl"
              style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)' }}
            >
              <h3 className="mb-6 px-8 text-sm font-medium" style={{ color: '#6b6b80' }}>
                Desteklenen Teknolojiler
              </h3>
              <div
                className="relative flex overflow-hidden"
                style={{
                  maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
                }}
              >
                <div className="hero-marquee flex gap-12 whitespace-nowrap px-4">
                  {[...FEATURES, ...FEATURES, ...FEATURES].map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 opacity-50 transition-all hover:opacity-100 hover:scale-105 cursor-default grayscale hover:grayscale-0"
                    >
                      <feat.icon className="h-5 w-5 text-white" />
                      <span className="text-base font-bold text-white tracking-tight">{feat.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Play,
  Zap,
  Sparkles,
  Star,
  Database,
  Code,
  Globe,
  Building,
  Target,
  TrendingUp,
  Search,
} from "lucide-react";

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
    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium sm:text-xs">{label}</span>
  </div>
);

export default function HeroSection() {
  return (
    <div className="relative w-full text-white overflow-hidden font-sans" style={{ background: '#0a0a0f' }}>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .hero-animate-fade-in {
          animation: fadeSlideIn 0.8s ease-out forwards;
          opacity: 0;
        }
        .hero-animate-marquee { animation: marquee 40s linear infinite; }
        .hero-delay-100 { animation-delay: 0.1s; }
        .hero-delay-200 { animation-delay: 0.2s; }
        .hero-delay-300 { animation-delay: 0.3s; }
        .hero-delay-400 { animation-delay: 0.4s; }
        .hero-delay-500 { animation-delay: 0.5s; }
      `}</style>

      {/* Background image — orijinal */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: "url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/a72ca2f3-9dd1-4fe4-84ba-fe86468a5237_3840w.webp?w=800&q=80)",
          maskImage: "linear-gradient(180deg, transparent, black 0%, black 70%, transparent)",
          WebkitMaskImage: "linear-gradient(180deg, transparent, black 0%, black 70%, transparent)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-24 pb-12 sm:px-6 md:pt-32 md:pb-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-start">

          {/* Left */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8 pt-8">

            {/* Badge */}
            <div className="hero-animate-fade-in hero-delay-100">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md transition-colors hover:bg-white/10">
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                  YAPAY ZEKA DESTEKLİ ✦
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                </span>
              </div>
            </div>

            {/* H1 */}
            <h1
              className="hero-animate-fade-in hero-delay-200 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tighter leading-[0.9]"
              style={{
                maskImage: "linear-gradient(180deg, black 0%, black 80%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(180deg, black 0%, black 80%, transparent 100%)",
                fontFamily: 'var(--font-syne), sans-serif',
              }}
            >
              Almanya&apos;da Her Gün<br />
              <span className="bg-gradient-to-br from-white via-white to-[#7c6aff] bg-clip-text text-transparent">
                Yeni Bir SaaS
              </span><br />
              Fırsatı Bul
            </h1>

            {/* Description */}
            <p className="hero-animate-fade-in hero-delay-300 max-w-xl text-lg text-zinc-400 leading-relaxed">
              Claude AI ile trend SaaS fikirlerini otomatik analiz et,
              Almanya pazarına uygunluğunu öğren, ekibinle birlikte
              bir sonraki projeye hızla başla.
            </p>

            {/* Buttons */}
            <div className="hero-animate-fade-in hero-delay-400 flex flex-col sm:flex-row gap-4">
              <Link
                href="/login"
                className="group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-white transition-all hover:scale-[1.02] hover:opacity-90 active:scale-[0.98]"
                style={{ background: '#7c6aff' }}
              >
                Giriş Yap
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <button className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10 hover:border-white/20">
                <Play className="w-4 h-4 fill-current" />
                Nasıl Çalışır?
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-5 space-y-6 lg:mt-12">

            {/* Stats Card */}
            <div className="hero-animate-fade-in hero-delay-500 relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold tracking-tight text-white">150+</div>
                    <div className="text-sm text-zinc-400">Fikir Analiz Edildi</div>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Almanya Pazarı Uyumu</span>
                    <span className="text-white font-medium">%87</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800/50">
                    <div
                      className="h-full w-[87%] rounded-full"
                      style={{ background: 'linear-gradient(90deg, #7c6aff, #6affd4)' }}
                    />
                  </div>
                </div>

                <div className="h-px w-full bg-white/10 mb-6" />

                <div className="grid grid-cols-3 gap-4 text-center">
                  <StatItem value="6" label="Fikir/Gün" />
                  <div className="w-px h-full bg-white/10 mx-auto" />
                  <StatItem value="AI" label="Analiz" />
                  <div className="w-px h-full bg-white/10 mx-auto" />
                  <StatItem value="%100" label="Veri" />
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium tracking-wide text-zinc-300">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                    AKTİF
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium tracking-wide text-zinc-300">
                    <Sparkles className="w-3 h-3" style={{ color: '#7c6aff' }} />
                    BETA
                  </div>
                </div>
              </div>
            </div>

            {/* Marquee Card */}
            <div className="hero-animate-fade-in hero-delay-500 relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 py-8 backdrop-blur-xl">
              <h3 className="mb-6 px-8 text-sm font-medium text-zinc-400">Desteklenen Teknolojiler</h3>

              <div
                className="relative flex overflow-hidden"
                style={{
                  maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
                  WebkitMaskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
                }}
              >
                <div className="hero-animate-marquee flex gap-12 whitespace-nowrap px-4">
                  {[...FEATURES, ...FEATURES, ...FEATURES].map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 opacity-50 transition-all hover:opacity-100 hover:scale-105 cursor-default grayscale hover:grayscale-0"
                    >
                      <feat.icon className="h-6 w-6 text-white" />
                      <span className="text-lg font-bold text-white tracking-tight">{feat.name}</span>
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

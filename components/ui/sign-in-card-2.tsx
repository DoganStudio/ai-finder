'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createBrowserClient } from '@/lib/supabase/client';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full min-w-0 rounded-lg border bg-white/5 px-3 py-1 text-sm text-white shadow-xs outline-none transition-[color,box-shadow]',
        'placeholder:text-white/30 border-transparent',
        'focus-visible:border-[#7c6aff]/40 focus-visible:ring-2 focus-visible:ring-[#7c6aff]/20',
        className
      )}
      {...props}
    />
  );
}

export function SignInCard() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

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
      className="min-h-screen w-screen relative overflow-hidden flex items-center justify-center"
      style={{ background: '#0a0a0f', fontFamily: 'var(--font-syne), sans-serif' }}
    >
      {/* Background gradients */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(124,106,255,0.4) 0%, rgba(90,74,209,0.5) 30%, #0a0a0f 70%)' }}
      />
      <div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120vh] h-[60vh] rounded-b-[50%] pointer-events-none"
        style={{ background: 'rgba(149,128,255,0.2)', filter: 'blur(80px)' }}
      />
      <motion.div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[100vh] h-[60vh] rounded-b-full pointer-events-none"
        animate={{ opacity: [0.15, 0.3, 0.15], scale: [0.98, 1.02, 0.98] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror' }}
        style={{ background: 'rgba(176,160,255,0.2)', filter: 'blur(60px)' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-sm relative z-10 px-4"
        style={{ perspective: 1500 }}
      >
        <motion.div
          className="relative"
          style={{ rotateX, rotateY }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          // @ts-ignore
          whileHover={{ z: 10 }}
        >
          <div className="relative group">
            {/* Animated border */}
            <div className="absolute -inset-[1px] rounded-2xl overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-[3px] w-[50%]"
                style={{ background: 'linear-gradient(to right, transparent, rgba(124,106,255,0.8), transparent)', opacity: 0.7 }}
                animate={{ left: ['-50%', '100%'] }}
                transition={{ duration: 2.5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1 }}
              />
              <motion.div
                className="absolute top-0 right-0 h-[50%] w-[3px]"
                style={{ background: 'linear-gradient(to bottom, transparent, rgba(124,106,255,0.8), transparent)', opacity: 0.7 }}
                animate={{ top: ['-50%', '100%'] }}
                transition={{ duration: 2.5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1, delay: 0.6 }}
              />
              <motion.div
                className="absolute bottom-0 right-0 h-[3px] w-[50%]"
                style={{ background: 'linear-gradient(to right, transparent, rgba(124,106,255,0.8), transparent)', opacity: 0.7 }}
                animate={{ right: ['-50%', '100%'] }}
                transition={{ duration: 2.5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1, delay: 1.2 }}
              />
              <motion.div
                className="absolute bottom-0 left-0 h-[50%] w-[3px]"
                style={{ background: 'linear-gradient(to bottom, transparent, rgba(124,106,255,0.8), transparent)', opacity: 0.7 }}
                animate={{ bottom: ['-50%', '100%'] }}
                transition={{ duration: 2.5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1, delay: 1.8 }}
              />
            </div>

            {/* Card */}
            <div
              className="relative backdrop-blur-xl rounded-2xl p-6 overflow-hidden shadow-2xl"
              style={{
                background: 'rgba(10,10,15,0.7)',
                border: '1px solid rgba(124,106,255,0.1)',
              }}
            >
              {/* Header */}
              <div className="text-center space-y-1 mb-6">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', duration: 0.8 }}
                  className="mx-auto w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ border: '1px solid rgba(124,106,255,0.3)', background: 'rgba(124,106,255,0.1)' }}
                >
                  <span
                    className="text-sm font-bold bg-clip-text text-transparent"
                    style={{ backgroundImage: 'linear-gradient(180deg, #ffffff, rgba(255,255,255,0.7))' }}
                  >
                    SF
                  </span>
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl font-bold bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(180deg, #ffffff, rgba(255,255,255,0.8))' }}
                >
                  Tekrar Hoş Geldin
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xs"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  SaaS Fikir Motoru&apos;na giriş yap
                </motion.p>
              </div>

              {/* Form */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-3">
                  <div className="relative flex items-center overflow-hidden rounded-lg">
                    <Mail className="absolute left-3 w-4 h-4 z-10" style={{ color: 'rgba(255,255,255,0.4)' }} />
                    <Input
                      type="email"
                      placeholder="E-posta adresi"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 pr-3"
                      required
                    />
                  </div>
                  <div className="relative flex items-center overflow-hidden rounded-lg">
                    <Lock className="absolute left-3 w-4 h-4 z-10" style={{ color: 'rgba(255,255,255,0.4)' }} />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Şifre"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 z-10 cursor-pointer"
                      style={{ color: 'rgba(255,255,255,0.4)' }}
                    >
                      {showPassword
                        ? <Eye className="w-4 h-4 hover:text-white transition-colors" />
                        : <EyeOff className="w-4 h-4 hover:text-white transition-colors" />}
                    </button>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-5 relative overflow-hidden font-medium h-10 rounded-lg flex items-center justify-center text-white transition-opacity disabled:opacity-70"
                  style={{ background: '#7c6aff' }}
                >
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="w-4 h-4 border-2 border-white/70 border-t-transparent rounded-full animate-spin" />
                      </motion.div>
                    ) : (
                      <motion.span key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex items-center gap-1 text-sm font-medium">
                        Giriş Yap <ArrowRight className="w-3 h-3" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                {error && (
                  <p className="text-red-400 text-xs text-center mt-2">{error}</p>
                )}

                <p className="text-center text-xs mt-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Hesabın yoksa yöneticinden erişim iste.
                </p>
              </form>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

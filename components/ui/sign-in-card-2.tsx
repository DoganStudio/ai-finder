'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Mail, Lock, Eye, EyeClosed, ArrowRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@/lib/supabase/client';

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input type={type} data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export function SignInCard() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
  
    const supabase = createBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
  
    if (error) {
      setError('E-posta veya şifre hatalı.');
      setIsLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0f] overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#7c6aff]/40 via-[#5a4ad1]/50 to-[#0a0a0f]" />
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120vh] h-[60vh] rounded-b-[50%] bg-[#9580ff]/20 blur-[80px]" />
      
      <motion.div 
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[100vh] h-[60vh] rounded-b-full bg-[#7c6aff]/20 blur-[60px]"
        animate={{ opacity: [0.15, 0.3, 0.15], scale: [0.98, 1.02, 0.98] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div 
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[90vh] h-[90vh] rounded-t-full bg-[#7c6aff]/20 blur-[60px]"
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "mirror", delay: 1 }}
      />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        className="w-full max-w-sm relative z-10" style={{ perspective: 1500 }}>
        <motion.div className="relative" style={{ rotateX, rotateY }}
          onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} whileHover={{ z: 10 }}>
          <div className="relative group">
            <div className="absolute -inset-[1px] rounded-2xl overflow-hidden">
              <motion.div className="absolute top-0 left-0 h-[3px] w-[50%] bg-gradient-to-r from-transparent via-white to-transparent opacity-70"
                animate={{ left: ["-50%", "100%"] }} transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }} />
              <motion.div className="absolute top-0 right-0 h-[50%] w-[3px] bg-gradient-to-b from-transparent via-white to-transparent opacity-70"
                animate={{ top: ["-50%", "100%"] }} transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1, delay: 0.6 }} />
              <motion.div className="absolute bottom-0 right-0 h-[3px] w-[50%] bg-gradient-to-r from-transparent via-white to-transparent opacity-70"
                animate={{ right: ["-50%", "100%"] }} transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1, delay: 1.2 }} />
              <motion.div className="absolute bottom-0 left-0 h-[50%] w-[3px] bg-gradient-to-b from-transparent via-white to-transparent opacity-70"
                animate={{ bottom: ["-50%", "100%"] }} transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1, delay: 1.8 }} />
            </div>

            <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/[0.05] shadow-2xl overflow-hidden">
              <div className="text-center space-y-1 mb-5">
                <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", duration: 0.8 }}
                  className="mx-auto w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-[#7c6aff]/20">
                  <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-[#9580ff]">SF</span>
                </motion.div>
                <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                  className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                  Tekrar Hoş Geldin
                </motion.h1>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                  className="text-white/60 text-xs">SaaS Fikir Motoru'na giriş yap</motion.p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-3">
                  <div className="relative flex items-center overflow-hidden rounded-lg">
                    <Mail className="absolute left-3 w-4 h-4 text-white/40" />
                    <Input type="email" placeholder="E-posta adresi" value={email} onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border-transparent focus:border-[#7c6aff]/50 text-white placeholder:text-white/30 h-10 pl-10 pr-3" required />
                  </div>
                  <div className="relative flex items-center overflow-hidden rounded-lg">
                    <Lock className="absolute left-3 w-4 h-4 text-white/40" />
                    <Input type={showPassword ? "text" : "password"} placeholder="Şifre" value={password} onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/5 border-transparent focus:border-[#7c6aff]/50 text-white placeholder:text-white/30 h-10 pl-10 pr-10" required />
                    <div onClick={() => setShowPassword(!showPassword)} className="absolute right-3 cursor-pointer">
                      {showPassword ? <Eye className="w-4 h-4 text-white/40 hover:text-white" /> : <EyeClosed className="w-4 h-4 text-white/40 hover:text-white" />}
                    </div>
                  </div>
                </div>

                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isLoading}
                  className="w-full mt-5 relative overflow-hidden bg-[#7c6aff] text-white font-medium h-10 rounded-lg flex items-center justify-center hover:bg-[#5a4ad1] transition-colors">
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

                <p className="text-center text-xs text-white/60 mt-4 leading-relaxed">
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

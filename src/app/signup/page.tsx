'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, User, Mail, KeyRound, CheckCircle2, ArrowRight } from 'lucide-react';

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 12,
        y: (e.clientY / window.innerHeight - 0.5) * 12,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[linear-gradient(160deg,var(--color-background)_0%,var(--color-bg2)_55%,var(--color-bg3)_100%)] flex flex-col font-sans text-text">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(circle at 15% 20%, rgba(124,58,237,.25) 0%, transparent 35%),
          radial-gradient(circle at 85% 10%, rgba(6,182,212,.15) 0%, transparent 35%),
          radial-gradient(circle at 70% 80%, rgba(79,70,229,.15) 0%, transparent 30%)
        `
      }}></div>

      {/* Navbar */}
      <nav className="absolute top-0 left-0 right-0 h-16 flex items-center justify-between px-10 border-b border-white/10 backdrop-blur-md bg-[#060B1A]/60 z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-secondary to-primary flex items-center justify-center text-lg shadow-[0_0_16px_rgba(124,58,237,.45)]">
            💎
          </div>
          <span className="text-base font-extrabold tracking-tight">WellFinanced</span>
        </div>
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[11px] font-bold uppercase tracking-widest text-cyan-400">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
          AI Core Active
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex w-full pt-16 pb-12 z-0 relative">
        
        {/* Left Panel */}
        <div className="hidden lg:flex w-[46%] flex-col justify-center items-start px-14 py-16 relative border-r border-white/10 overflow-hidden">
          {/* Ambient Orbs */}
          <div className="absolute w-80 h-80 rounded-full blur-[80px] bg-secondary/30 -top-20 -left-20" />
          <div className="absolute w-64 h-64 rounded-full blur-[80px] bg-cyan-500/20 bottom-10 -right-16" />
          <div className="absolute w-44 h-44 rounded-full blur-[80px] bg-mint/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

          {/* Spinning Ring Visual */}
          <div 
            className="relative w-56 h-56 mb-12"
            style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
          >
            <div className="absolute inset-0 rounded-full border-[1.5px] border-secondary/50 animate-[spin-slow_9s_linear_infinite]" />
            <div className="absolute inset-5 rounded-full border-[1.5px] border-cyan-500/40 animate-[spin-slow_14s_linear_infinite_reverse]" />
            <div className="absolute inset-11 rounded-full border-[1.5px] border-mint/30 animate-[spin-slow_6s_linear_infinite]" />
            <div className="absolute inset-14 rounded-full bg-linear-to-br from-secondary/35 to-cyan-500/25 backdrop-blur flex items-center justify-center">
              <span className="text-5xl bg-clip-text text-transparent bg-linear-to-br from-mint to-cyan-400 select-none">
                🔐
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-mint/25 bg-mint/10 text-[11px] font-bold tracking-widest uppercase text-mint mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
            Enterprise Security
          </div>

          <h2 className="text-[42px] font-black leading-[1.15] tracking-tight mb-5">
            Neural Privacy<br/>
            <span className="bg-clip-text text-transparent bg-linear-to-r from-[#6D5BFF] via-[#A855F7] to-[#EC4899]">
              Architecture.
            </span>
          </h2>

          <p className="text-base text-text-sec leading-relaxed max-w-[360px] mb-12">
            Decentralized intelligence layers keep your financial identity encrypted. Autonomous AI audits protect your earnings 24/7.
          </p>

          <div className="flex gap-4 flex-wrap">
            <div className="px-6 py-3.5 rounded-2xl bg-surface border border-border backdrop-blur-xl">
              <div className="text-xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-mint to-cyan-400">99.9%</div>
              <div className="text-[11px] text-text-hint uppercase tracking-widest mt-0.5">Uptime SLA</div>
            </div>
            <div className="px-6 py-3.5 rounded-2xl bg-surface border border-border backdrop-blur-xl">
              <div className="text-xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-mint to-cyan-400">AES-256</div>
              <div className="text-[11px] text-text-hint uppercase tracking-widest mt-0.5">Encryption</div>
            </div>
            <div className="px-6 py-3.5 rounded-2xl bg-surface border border-border backdrop-blur-xl">
              <div className="text-xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-mint to-cyan-400">0ms</div>
              <div className="text-[11px] text-text-hint uppercase tracking-widest mt-0.5">Latency SLA</div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 flex items-center justify-center p-10 lg:p-14">
          <div className="w-full max-w-[480px] bg-surface border border-border rounded-card backdrop-blur-xl shadow-neo p-10 pt-10 pb-9">
            
            {/* Step Bar */}
            <div className="flex items-center gap-2 mb-8">
              <div className="flex-1 h-[3px] rounded-full bg-linear-to-r from-secondary to-cyan-400 shadow-[0_0_10px_rgba(124,58,237,.6)]" />
              <div className="flex-1 h-[3px] rounded-full bg-white/10" />
              <div className="flex-1 h-[3px] rounded-full bg-white/10" />
              <span className="text-[11px] font-bold text-text-hint uppercase tracking-widest whitespace-nowrap ml-2">Step 1 / 3</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight mb-1.5">Create Account</h1>
            <p className="text-sm text-text-sec mb-7">Join the elite network of AI-augmented freelancers.</p>

            <form className="space-y-4" onSubmit={e => e.preventDefault()}>
              
              {/* Full Name */}
              <div className="relative group">
                <User className="absolute left-[18px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-text-hint pointer-events-none group-focus-within:text-cyan-400 transition-colors" />
                <input 
                  type="text" 
                  id="fullName"
                  className="peer w-full h-[58px] bg-white/5 border border-white/10 rounded-[18px] pl-[50px] pr-4 pt-3 text-[15px] text-text outline-none focus:border-secondary/60 focus:bg-secondary/10 focus:ring-4 focus:ring-secondary/20 transition-all placeholder-transparent"
                  placeholder="Full Name"
                />
                <label htmlFor="fullName" className="absolute left-[50px] top-1/2 -translate-y-1/2 text-sm text-text-hint pointer-events-none transition-all peer-focus:top-2 peer-focus:text-[10px] peer-focus:tracking-widest peer-focus:text-cyan-400 peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:tracking-widest peer-not-placeholder-shown:text-cyan-400">
                  Full Name
                </label>
              </div>

              {/* Email */}
              <div className="relative group">
                <Mail className="absolute left-[18px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-text-hint pointer-events-none group-focus-within:text-cyan-400 transition-colors" />
                <input 
                  type="email" 
                  id="email"
                  className="peer w-full h-[58px] bg-white/5 border border-white/10 rounded-[18px] pl-[50px] pr-4 pt-3 text-[15px] text-text outline-none focus:border-secondary/60 focus:bg-secondary/10 focus:ring-4 focus:ring-secondary/20 transition-all placeholder-transparent"
                  placeholder="Email Address"
                />
                <label htmlFor="email" className="absolute left-[50px] top-1/2 -translate-y-1/2 text-sm text-text-hint pointer-events-none transition-all peer-focus:top-2 peer-focus:text-[10px] peer-focus:tracking-widest peer-focus:text-cyan-400 peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:tracking-widest peer-not-placeholder-shown:text-cyan-400">
                  Email Address
                </label>
              </div>

              {/* Password */}
              <div className="relative group mb-5!">
                <KeyRound className="absolute left-[18px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-text-hint pointer-events-none group-focus-within:text-cyan-400 transition-colors" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password"
                  className="peer w-full h-[58px] bg-white/5 border border-white/10 rounded-[18px] pl-[50px] pr-12 pt-3 text-[15px] text-text outline-none focus:border-secondary/60 focus:bg-secondary/10 focus:ring-4 focus:ring-secondary/20 transition-all placeholder-transparent"
                  placeholder="Password"
                />
                <label htmlFor="password" className="absolute left-[50px] top-1/2 -translate-y-1/2 text-sm text-text-hint pointer-events-none transition-all peer-focus:top-2 peer-focus:text-[10px] peer-focus:tracking-widest peer-focus:text-cyan-400 peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:tracking-widest peer-not-placeholder-shown:text-cyan-400">
                  Password
                </label>
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-hint hover:text-text-sec transition-colors"
                >
                  {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                </button>
              </div>

              {/* Verification Note */}
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-mint/5 border border-mint/15 mb-5">
                <div className="w-9 h-9 rounded-full bg-mint/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-mint" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-mint uppercase tracking-widest">Neural Verification Pending</div>
                  <div className="text-[11px] text-text-hint mt-0.5">Identity validated via biometrics on first login.</div>
                </div>
              </div>

              {/* Submit CTA */}
              <button className="w-full h-14 rounded-[18px] bg-[linear-gradient(90deg,#8BFF7D,#8FFFD2,#A3E635)] bg-size-[200%_auto] text-[#0A1A0A] font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02] hover:shadow-[0_0_36px_rgba(124,255,178,.55)] hover:bg-right group">
                <span>Create My Account</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-[10px] text-text-hint uppercase tracking-widest whitespace-nowrap">or continue with</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Social Auth with SVGs */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button className="h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-2.5 text-[13px] font-semibold text-text-sec transition-all hover:border-secondary/40 hover:bg-secondary/10 hover:scale-[1.02] hover:shadow-[0_0_16px_rgba(124,58,237,.2)] hover:text-text">
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button className="h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-2.5 text-[13px] font-semibold text-text-sec transition-all hover:border-secondary/40 hover:bg-secondary/10 hover:scale-[1.02] hover:shadow-[0_0_16px_rgba(124,58,237,.2)] hover:text-text">
                <svg className="w-4 h-4 fill-current text-white/80 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                GitHub
              </button>
            </div>

            <p className="text-center text-[13px] text-text-hint">
              Already have an account?{' '}
              <Link href="/login" className="font-bold bg-clip-text text-transparent bg-linear-to-r from-secondary to-cyan-400 hover:underline decoration-cyan-400 underline-offset-4">
                Sign In
              </Link>
            </p>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 h-12 flex items-center justify-between px-10 border-t border-white/10 bg-[#060B1A]/50 z-10">
        <span className="text-[11px] text-text-hint">© 2025 WellFinanced · Secured by Neural Encryption</span>
        <div className="flex gap-6">
          <Link href="/privacy" className="text-[11px] font-semibold text-text-hint uppercase tracking-widest hover:text-cyan-400 transition-colors">Privacy</Link>
          <Link href="/terms" className="text-[11px] font-semibold text-text-hint uppercase tracking-widest hover:text-cyan-400 transition-colors">Terms</Link>
          <Link href="/security" className="text-[11px] font-semibold text-text-hint uppercase tracking-widest hover:text-cyan-400 transition-colors">Security</Link>
        </div>
      </footer>
    </div>
  );
}

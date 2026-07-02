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
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-lg shadow-[0_0_16px_rgba(124,58,237,.45)]">
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
            <div className="absolute inset-14 rounded-full bg-gradient-to-br from-secondary/35 to-cyan-500/25 backdrop-blur flex items-center justify-center">
              <span className="text-5xl bg-clip-text text-transparent bg-gradient-to-br from-mint to-cyan-400 select-none">
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
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6D5BFF] via-[#A855F7] to-[#EC4899]">
              Architecture.
            </span>
          </h2>

          <p className="text-base text-text-sec leading-relaxed max-w-[360px] mb-12">
            Decentralized intelligence layers keep your financial identity encrypted. Autonomous AI audits protect your earnings 24/7.
          </p>

          <div className="flex gap-4 flex-wrap">
            <div className="px-6 py-3.5 rounded-2xl bg-surface border border-border backdrop-blur-xl">
              <div className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-mint to-cyan-400">99.9%</div>
              <div className="text-[11px] text-text-hint uppercase tracking-widest mt-0.5">Uptime SLA</div>
            </div>
            <div className="px-6 py-3.5 rounded-2xl bg-surface border border-border backdrop-blur-xl">
              <div className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-mint to-cyan-400">AES-256</div>
              <div className="text-[11px] text-text-hint uppercase tracking-widest mt-0.5">Encryption</div>
            </div>
            <div className="px-6 py-3.5 rounded-2xl bg-surface border border-border backdrop-blur-xl">
              <div className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-mint to-cyan-400">0ms</div>
              <div className="text-[11px] text-text-hint uppercase tracking-widest mt-0.5">Latency SLA</div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 flex items-center justify-center p-10 lg:p-14">
          <div className="w-full max-w-[480px] bg-surface border border-border rounded-[28px] backdrop-blur-xl shadow-neo p-10 pt-10 pb-9">
            
            {/* Step Bar */}
            <div className="flex items-center gap-2 mb-8">
              <div className="flex-1 h-[3px] rounded-full bg-gradient-to-r from-secondary to-cyan-400 shadow-[0_0_10px_rgba(124,58,237,.6)]" />
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
                <label htmlFor="fullName" className="absolute left-[50px] top-1/2 -translate-y-1/2 text-sm text-text-hint pointer-events-none transition-all peer-focus:top-2 peer-focus:text-[10px] peer-focus:tracking-widest peer-focus:text-cyan-400 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:tracking-widest peer-[:not(:placeholder-shown)]:text-cyan-400">
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
                <label htmlFor="email" className="absolute left-[50px] top-1/2 -translate-y-1/2 text-sm text-text-hint pointer-events-none transition-all peer-focus:top-2 peer-focus:text-[10px] peer-focus:tracking-widest peer-focus:text-cyan-400 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:tracking-widest peer-[:not(:placeholder-shown)]:text-cyan-400">
                  Email Address
                </label>
              </div>

              {/* Password */}
              <div className="relative group !mb-5">
                <KeyRound className="absolute left-[18px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-text-hint pointer-events-none group-focus-within:text-cyan-400 transition-colors" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password"
                  className="peer w-full h-[58px] bg-white/5 border border-white/10 rounded-[18px] pl-[50px] pr-12 pt-3 text-[15px] text-text outline-none focus:border-secondary/60 focus:bg-secondary/10 focus:ring-4 focus:ring-secondary/20 transition-all placeholder-transparent"
                  placeholder="Password"
                />
                <label htmlFor="password" className="absolute left-[50px] top-1/2 -translate-y-1/2 text-sm text-text-hint pointer-events-none transition-all peer-focus:top-2 peer-focus:text-[10px] peer-focus:tracking-widest peer-focus:text-cyan-400 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:tracking-widest peer-[:not(:placeholder-shown)]:text-cyan-400">
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
              <button className="w-full h-14 rounded-[18px] bg-[linear-gradient(90deg,#8BFF7D,#8FFFD2,#A3E635)] bg-[length:200%_auto] text-[#0A1A0A] font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02] hover:shadow-[0_0_36px_rgba(124,255,178,.55)] hover:bg-right group">
                <span>Create My Account</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-[1px] bg-white/10" />
              <span className="text-[10px] text-text-hint uppercase tracking-widest whitespace-nowrap">or continue with</span>
              <div className="flex-1 h-[1px] bg-white/10" />
            </div>

            {/* Social Auth */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button className="h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-2.5 text-[13px] font-semibold text-text-sec transition-all hover:border-secondary/40 hover:bg-secondary/10 hover:scale-[1.02] hover:shadow-[0_0_16px_rgba(124,58,237,.2)] hover:text-text">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYkdC1FbhWMdXrFHRDz5mcLhqhPrkhiD2kAabvkzCHdUKbX0Q9RBm47VlUb7zmEUxvdRVt9WvV8vkl5ICYd6xVgx4aQQS7gup5KCmZTLU91rJFQy8lSoy7j5WhlHeRoc_5CkMhAq4HLEy_M3vRsCTOTSguanaQ7byinryPO1qDAcI3-WBTQ_IGL8U2UU5_AWpDvHpsLnNlAzvYQQ0eMbO3cJRO2EtyEzmIVjKfjPxUjMBirCqWTFPut3jxVt93orX6Mj1C9nOOL6Y" className="w-[18px] h-[18px] object-contain" alt="Google" />
                Google
              </button>
              <button className="h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-2.5 text-[13px] font-semibold text-text-sec transition-all hover:border-secondary/40 hover:bg-secondary/10 hover:scale-[1.02] hover:shadow-[0_0_16px_rgba(124,58,237,.2)] hover:text-text">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDhcOLqcSfPj9BppogCnDEf_APPpyNFR9pT-hgV75x9WuZo0Utac1GJ8Es7PlWFUigYjOe3Wkob0CVvhSekJ_z3SUVjqwtq_y9-S64HsNCSCtxaBhwXP6CsHORZm1qDvTVgG_eYYwU29tBx2pfUfsKCxtRshrqzALA-x7tuLBSJUWl3aa2OvOTyCpj_E92bY9ktyBShhFlP-r2VbRK-yMiiT_rC7WJB_fAhzBIKgM-ta2aocFCSFcyKHUK6opwnn3sx9sOcB-CACk" className="w-[18px] h-[18px] object-contain invert opacity-75" alt="GitHub" />
                GitHub
              </button>
            </div>

            <p className="text-center text-[13px] text-text-hint">
              Already have an account?{' '}
              <Link href="/login" className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary to-cyan-400 hover:underline decoration-cyan-400 underline-offset-4">
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

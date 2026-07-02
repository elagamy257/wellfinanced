'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { EyeOff, ShieldAlert, CheckCircle2 } from 'lucide-react';

const registerSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').max(60, 'Name must be under 60 characters'),
  email: z.string().min(1, 'Email address is required').email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Mouse coordinate tracker for left panel ambient effects
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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onTouched',
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setSubmitError(null);
    setSubmitSuccess(false);

    // Simulate API registration delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (data.email === 'error@wellfinanced.com') {
      setSubmitError('Registration failed. Identity node already registered.');
    } else {
      setSubmitSuccess(true);
      setTimeout(() => {
        window.location.href = '/onboarding';
      }, 1000);
    }
  };

  return (
    <div className="bg-[#060B1A] text-white font-sans overflow-hidden min-h-screen flex flex-col relative">
      <style>{`
        .custom-body-bg {
          background:
            radial-gradient(circle at 15% 20%, rgba(124,58,237,.55) 0%, transparent 35%),
            radial-gradient(circle at 85% 10%, rgba(6,182,212,.40) 0%, transparent 35%),
            radial-gradient(circle at 70% 80%, rgba(79,70,229,.35) 0%, transparent 30%),
            linear-gradient(160deg, #060B1A 0%, #09152E 55%, #0F2A5E 100%);
        }

        .left-panel {
          width: 46%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 64px 56px;
          position: relative;
          overflow: hidden;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .orb-1 { width:320px; height:320px; background:rgba(124,58,237,.30); top:-80px; left:-80px; }
        .orb-2 { width:260px; height:260px; background:rgba(6,182,212,.20); bottom:40px; right:-60px; }
        .orb-3 { width:180px; height:180px; background:rgba(124,255,178,.12); top:50%; left:50%; transform:translate(-50%,-50%); }

        .ring-wrap {
          position: relative;
          width: 220px;
          height: 220px;
          margin-bottom: 48px;
          transition: transform 150ms ease-out;
        }
        .ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1.5px solid;
        }
        .ring-1 {
          border-color: rgba(124,58,237,.5);
          animation: spin 9s linear infinite;
        }
        .ring-2 {
          inset: 20px;
          border-color: rgba(6,182,212,.4);
          animation: spin 14s linear infinite reverse;
        }
        .ring-3 {
          inset: 44px;
          border-color: rgba(124,255,178,.3);
          animation: spin 6s linear infinite;
        }
        .ring-center {
          position: absolute;
          inset: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(124,58,237,.35), rgba(6,182,212,.25));
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .badge-security {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 999px;
          border: 1px solid rgba(124,255,178,.25);
          background: rgba(124,255,178,.08);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: #7CFFB2;
          margin-bottom: 24px;
        }
        .badge-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #7CFFB2;
          animation: pulse-badge 1.8s ease-in-out infinite;
        }
        @keyframes pulse-badge { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.75)} }

        .grad-text {
          background: linear-gradient(90deg, #6D5BFF, #A855F7, #EC4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stat-pill {
          padding: 14px 24px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
        }
        .stat-val {
          font-size: 20px;
          font-weight: 800;
          background: linear-gradient(90deg, #7CFFB2, #06B6D4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .right-panel {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 56px;
        }

        .card-panel {
          width: 100%;
          max-width: 480px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 28px;
          backdrop-filter: blur(20px);
          box-shadow: 0 25px 60px rgba(0,0,0,.45);
          padding: 40px 40px 36px;
        }

        .step-seg {
          flex: 1;
          height: 3px;
          border-radius: 999px;
          background: rgba(255,255,255,.12);
          transition: background 250ms ease-in-out;
        }
        .step-seg.active {
          background: linear-gradient(90deg, #7C3AED, #06B6D4);
          box-shadow: 0 0 10px rgba(124,58,237,.6);
        }

        /* Inputs & Floating Labels */
        .field { position: relative; margin-bottom: 16px; }
        .inp-wrap { position: relative; }
        
        .field-icon {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 18px;
          color: rgba(255,255,255,.40);
          pointer-events: none;
          transition: color 250ms ease-in-out;
        }
        .inp {
          width: 100%;
          height: 58px;
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.10);
          border-radius: 18px;
          padding: 18px 50px 0 50px;
          font-size: 15px;
          color: #FFFFFF;
          outline: none;
          transition: border-color 250ms ease-in-out, box-shadow 250ms ease-in-out, background 250ms ease-in-out;
        }
        .inp::placeholder { color: transparent; }
        .inp:focus {
          border-color: rgba(124,58,237,.6);
          background: rgba(124,58,237,.07);
          box-shadow: 0 0 0 3px rgba(124,58,237,.18), 0 0 20px rgba(124,58,237,.15);
        }
        
        .field-label {
          position: absolute;
          left: 50px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 14px;
          color: rgba(255,255,255,.40);
          pointer-events: none;
          transition: top 200ms ease-in-out, font-size 200ms ease-in-out, color 200ms ease-in-out, letter-spacing 200ms ease-in-out;
        }
        
        .inp:focus ~ .field-label,
        .inp:not(:placeholder-shown) ~ .field-label {
          top: 14px;
          font-size: 10px;
          letter-spacing: .08em;
          color: #06B6D4;
        }
        .inp-wrap:focus-within .field-icon { color: #06B6D4; }

        .eye-btn {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(255,255,255,.40);
          font-size: 19px;
          line-height: 1;
          transition: color 250ms ease-in-out;
          display: flex;
        }
        .eye-btn:hover { color: rgba(255,255,255,.65); }

        /* CTA */
        .btn-primary-shiny {
          width: 100%;
          height: 56px;
          border: none;
          border-radius: 18px;
          background: linear-gradient(90deg, #8BFF7D, #8FFFD2, #A3E635);
          background-size: 200% auto;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: #0A1A0A;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: transform 250ms ease-in-out, box-shadow 250ms ease-in-out, background-position 250ms ease-in-out;
          box-shadow: 0 0 24px rgba(124,255,178,.35);
          margin-bottom: 24px;
        }
        .btn-primary-shiny:hover:not(:disabled) {
          transform: scale(1.02);
          box-shadow: 0 0 36px rgba(124,255,178,.55);
          background-position: right center;
        }
        .btn-arrow { font-size: 20px; transition: transform 250ms ease-in-out; }
        .btn-primary-shiny:hover:not(:disabled) .btn-arrow { transform: translateX(4px); }

        .btn-social {
          height: 48px;
          border-radius: 14px;
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.08);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,.65);
          cursor: pointer;
          transition: border-color 250ms ease-in-out, background 250ms ease-in-out, transform 250ms ease-in-out, box-shadow 250ms ease-in-out;
        }
        .btn-social:hover:not(:disabled) {
          border-color: rgba(124,58,237,.45);
          background: rgba(124,58,237,.08);
          transform: scale(1.02);
          box-shadow: 0 0 16px rgba(124,58,237,.2);
          color: #FFFFFF;
        }
      `}</style>

      {/* Global Background */}
      <div className="absolute inset-0 custom-body-bg -z-20 pointer-events-none" />

      {/* Navbar */}
      <nav className="absolute top-0 left-0 right-0 h-16 flex items-center justify-between px-10 border-b border-white/5 backdrop-blur-md bg-[#060b1a]/60 z-20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#4f46e5] flex items-center justify-center text-base shadow-[0_0_16px_rgba(124,58,237,.45)] select-none">
            💎
          </div>
          <span className="text-base font-extrabold tracking-tight text-white select-none">WellFinanced</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#06b6d4]/8 border border-[#06b6d4]/20 text-[11px] font-bold uppercase tracking-widest text-[#06b6d4]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] animate-pulse" />
          AI Core Active
        </div>
      </nav>

      {/* Page Split Body */}
      <div className="flex-grow flex w-full pt-16 pb-12 z-10 relative">
        
        {/* LEFT PANEL */}
        <div className="hidden lg:flex left-panel">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />

          {/* Concentric Spinning Rings */}
          <div 
            className="ring-wrap"
            style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
          >
            <div className="ring ring-1" />
            <div className="ring ring-2" />
            <div className="ring ring-3" />
            <div className="ring-center">
              <span className="text-4xl select-none">🔐</span>
            </div>
          </div>

          {/* Badge */}
          <div className="badge-security">
            <span className="badge-dot" />
            Enterprise Security
          </div>

          {/* Headline */}
          <h2 className="text-[42px] font-black leading-[1.15] tracking-tight mb-5">
            Neural Privacy<br />
            <span className="grad-text">Architecture.</span>
          </h2>

          <p className="text-sm text-white/65 leading-relaxed max-w-[360px] mb-12">
            Decentralized intelligence layers keep your financial identity encrypted. Autonomous AI audits protect your earnings 24/7.
          </p>

          {/* Stats Grid */}
          <div className="flex gap-4 flex-wrap">
            <div className="stat-pill">
              <div className="stat-val">99.9%</div>
              <div className="stat-lbl text-[11px] text-white/40 uppercase tracking-widest mt-0.5">Uptime SLA</div>
            </div>
            <div className="stat-pill">
              <div className="stat-val">AES-256</div>
              <div className="stat-lbl text-[11px] text-white/40 uppercase tracking-widest mt-0.5">Encryption</div>
            </div>
            <div className="stat-pill">
              <div className="stat-val">0ms</div>
              <div className="stat-lbl text-[11px] text-white/40 uppercase tracking-widest mt-0.5">Latency SLA</div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL - FORM */}
        <div className="right-panel">
          <div className="card-panel">
            
            {/* Steps bar */}
            <div className="flex items-center gap-2 mb-8 select-none">
              <div className="step-seg active" />
              <div className="step-seg" />
              <div className="step-seg" />
              <span className="text-[11px] font-bold text-white/40 uppercase tracking-widest whitespace-nowrap ml-2">
                Step 1 / 3
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight mb-1.5">Create Account</h1>
            <p className="text-sm text-white/65 mb-7">Join the elite network of AI-augmented freelancers.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {submitError && (
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium animate-fade-in">
                  <ShieldAlert className="w-5 h-5 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              {submitSuccess && (
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-green-500/15 border border-green-500/25 text-[#7CFFB2] text-xs font-medium animate-fade-in">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Workspace registered! Loading step 2...</span>
                </div>
              )}

              {/* Full Name */}
              <div className="field">
                <div className="inp-wrap">
                  <span className="field-icon">👤</span>
                  <input
                    id="fullName"
                    type="text"
                    placeholder=" "
                    disabled={isSubmitting || submitSuccess}
                    className={`inp ${errors.fullName ? 'border-red-500/40' : ''}`}
                    {...register('fullName')}
                  />
                  <label className="field-label" htmlFor="fullName">Full Name</label>
                </div>
                {errors.fullName && (
                  <span className="text-xs text-red-400 px-1 mt-1 block">{errors.fullName.message}</span>
                )}
              </div>

              {/* Email Address */}
              <div className="field">
                <div className="inp-wrap">
                  <span className="field-icon">✉️</span>
                  <input
                    id="email"
                    type="email"
                    placeholder=" "
                    disabled={isSubmitting || submitSuccess}
                    className={`inp ${errors.email ? 'border-red-500/40' : ''}`}
                    {...register('email')}
                  />
                  <label className="field-label" htmlFor="email">Email Address</label>
                </div>
                {errors.email && (
                  <span className="text-xs text-red-400 px-1 mt-1 block">{errors.email.message}</span>
                )}
              </div>

              {/* Password */}
              <div className="field">
                <div className="inp-wrap">
                  <span className="field-icon">🔑</span>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder=" "
                    disabled={isSubmitting || submitSuccess}
                    className={`inp ${errors.password ? 'border-red-500/40' : ''}`}
                    {...register('password')}
                  />
                  <label className="field-label" htmlFor="password">Password</label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="eye-btn"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-[19px] h-[19px]" /> : <span className="select-none">👁</span>}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-xs text-red-400 px-1 mt-1 block">{errors.password.message}</span>
                )}
              </div>

              {/* Verification Note */}
              <div className="flex items-center gap-3 p-3.5 rounded-[16px] bg-[#7cffb2]/5 border border-[#7cffb2]/15 mb-5 select-none">
                <div className="w-9 h-9 rounded-full bg-[#7cffb2]/10 flex items-center justify-center text-lg flex-shrink-0">
                  ✅
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[#7CFFB2] uppercase tracking-[0.1em]">
                    Neural Verification Pending
                  </div>
                  <div className="text-[11px] text-white/40 mt-0.5">
                    Identity validated via biometrics on first login.
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting || submitSuccess}
                className="btn-primary-shiny disabled:opacity-50 disabled:pointer-events-none"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-[#0A1A0A] border-t-transparent rounded-full animate-spin" />
                    REGISTERING...
                  </span>
                ) : (
                  <>
                    <span>Create My Account</span>
                    <span className="btn-arrow">→</span>
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-[18px] my-5">
              <div className="flex-1 h-[1px] bg-white/8" />
              <span className="text-[10px] text-white/40 uppercase tracking-widest whitespace-nowrap">
                or continue with
              </span>
              <div className="flex-1 h-[1px] bg-white/8" />
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-3 mb-[22px]">
              <button
                type="button"
                disabled={isSubmitting || submitSuccess}
                className="btn-social cursor-pointer disabled:opacity-50"
              >
                <img
                  className="w-[18px] h-[18px] object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYkdC1FbhWMdXrFHRDz5mcLhqhPrkhiD2kAabvkzCHdUKbX0Q9RBm47VlUb7zmEUxvdRVt9WvV8vkl5ICYd6xVgx4aQQS7gup5KCmZTLU91rJFQy8lSoy7j5WhlHeRoc_5CkMhAq4HLEy_M3vRsCTOTSguanaQ7byinryPO1qDAcI3-WBTQ_IGL8U2UU5_AWpDvHpsLnNlAzvYQQ0eMbO3cJRO2EtyEzmIVjKfjPxUjMBirCqWTFPut3jxVt93orX6Mj1C9nOOL6Y"
                  alt="Google"
                />
                Google
              </button>
              <button
                type="button"
                disabled={isSubmitting || submitSuccess}
                className="btn-social cursor-pointer disabled:opacity-50"
              >
                <img
                  className="w-[18px] h-[18px] object-contain invert opacity-75"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDhcOLqcSfPj9BppogCnDEf_APPpyNFR9pT-hgV75x9WuZo0Utac1GJ8Es7PlWFUigYjOe3Wkob0CVvhSekJ_z3SUVjqwtq_y9-S64HsNCSCtxaBhwXP6CsHORZm1qDvTVgG_eYYwU29tBx2pfUfsKCxtRshrqzALA-x7tuLBSJUWl3aa2OvOTyCpj_E92bY9ktyBShhFlP-r2VbRK-yMiiT_rC7WJB_fAhzBIKgM-ta2aocFCSFcyKHUK6opwnn3sx9sOcB-CACk"
                  alt="GitHub"
                />
                GitHub
              </button>
            </div>

            {/* Footer link */}
            <p className="text-center text-xs text-white/40 mt-4">
              Already have an account?{' '}
              <Link 
                href="/login" 
                className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] hover:underline hover:text-[#06B6D4] underline-offset-2 ml-1"
              >
                Sign In
              </Link>
            </p>

          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="h-12 flex items-center justify-between px-10 border-t border-white/5 bg-[#060b1a]/50 text-xs">
        <span className="text-white/40">© 2025 WellFinanced · Secured by Neural Encryption</span>
        <div className="flex gap-6">
          <Link href="/privacy" className="text-white/40 uppercase tracking-widest font-semibold hover:text-[#06b6d4] transition-colors">Privacy</Link>
          <Link href="/terms" className="text-white/40 uppercase tracking-widest font-semibold hover:text-[#06b6d4] transition-colors">Terms</Link>
          <Link href="/security" className="text-white/40 uppercase tracking-widest font-semibold hover:text-[#06b6d4] transition-colors">Security</Link>
        </div>
      </footer>
    </div>
  );
}

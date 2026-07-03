'use client';

import React, { useState } from 'react';
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
    <div className="bg-[#060B1A] text-white font-sans overflow-y-auto min-h-screen w-full flex justify-center items-start relative">
      <style>{`
        .custom-body-bg {
          background:
            radial-gradient(circle at 15% 20%, rgba(124,58,237,.55) 0%, transparent 35%),
            radial-gradient(circle at 85% 10%, rgba(6,182,212,.40) 0%, transparent 35%),
            radial-gradient(circle at 70% 80%, rgba(79,70,229,.35) 0%, transparent 30%),
            linear-gradient(160deg, #060B1A 0%, #09152E 55%, #0F2A5E 100%);
        }

        .card-panel {
          width: 100%;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 28px;
          backdrop-filter: blur(20px);
          box-shadow: 0 25px 60px rgba(0,0,0,.45);
          padding: 32px 24px 28px;
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

      {/* Centered Mobile Device Viewport */}
      <div className="w-full max-w-[430px] min-h-screen bg-[#060B1A]/50 border-x border-white/5 flex flex-col relative shadow-2xl overflow-x-hidden">
        {/* Navbar */}
        <nav className="w-full h-16 flex items-center justify-between px-6 border-b border-white/5 backdrop-blur-md bg-[#060b1a]/60 z-20 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-[#7c3aed] to-[#4f46e5] flex items-center justify-center text-base shadow-[0_0_16px_rgba(124,58,237,.45)] select-none">
              💎
            </div>
            <span className="text-base font-extrabold tracking-tight text-white select-none">WellFinanced</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#06b6d4]/8 border border-[#06b6d4]/20 text-[10px] font-bold uppercase tracking-widest text-[#06b6d4]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] animate-pulse" />
            AI Active
          </div>
        </nav>

        {/* Form Body */}
        <main className="grow flex flex-col justify-center px-6 py-8 z-10 relative">
          <div className="card-panel">
            
            {/* Steps bar */}
            <div className="flex items-center gap-2 mb-6 select-none">
              <div className="step-seg active" />
              <div className="step-seg" />
              <div className="step-seg" />
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest whitespace-nowrap ml-2">
                Step 1 / 3
              </span>
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight mb-1">Create Account</h1>
            <p className="text-xs text-white/65 mb-6">Join the elite network of AI-augmented freelancers.</p>

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
              <div className="flex items-center gap-3 p-3 rounded-[16px] bg-[#7cffb2]/5 border border-[#7cffb2]/15 mb-4 select-none">
                <div className="w-8 h-8 rounded-full bg-[#7cffb2]/10 flex items-center justify-center text-base shrink-0">
                  ✅
                </div>
                <div>
                  <div className="text-[10px] font-bold text-[#7CFFB2] uppercase tracking-widest">
                    Neural Verification Pending
                  </div>
                  <div className="text-[10px] text-white/40 mt-0.5">
                    Identity validated via biometrics on first login.
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting || submitSuccess}
                className="btn-primary-shiny disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
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
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-white/8" />
              <span className="text-[9px] text-white/40 uppercase tracking-widest whitespace-nowrap">
                or continue with
              </span>
              <div className="flex-1 h-px bg-white/8" />
            </div>

            {/* Social Logins with SVGs */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                disabled={isSubmitting || submitSuccess}
                className="btn-social cursor-pointer disabled:opacity-50"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button
                type="button"
                disabled={isSubmitting || submitSuccess}
                className="btn-social cursor-pointer disabled:opacity-50"
              >
                <svg className="w-4 h-4 fill-current text-white/80 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                GitHub
              </button>
            </div>

            {/* Footer link */}
            <p className="text-center text-xs text-white/40 mt-6">
              Already have an account?{' '}
              <Link 
                href="/login" 
                className="font-bold bg-clip-text text-transparent bg-linear-to-r from-[#7C3AED] to-[#06B6D4] hover:underline hover:text-[#06B6D4] underline-offset-2 ml-1"
              >
                Sign In
              </Link>
            </p>

          </div>
        </main>

        {/* Footer */}
        <footer className="h-16 flex flex-col items-center justify-center px-6 gap-2 border-t border-white/5 bg-[#060b1a]/50 text-[10px] shrink-0 text-center">
          <span className="text-white/40">© 2025 WellFinanced · Secured by Neural Encryption</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-white/40 uppercase tracking-widest font-semibold hover:text-[#06b6d4] transition-colors">Privacy</Link>
            <Link href="/terms" className="text-white/40 uppercase tracking-widest font-semibold hover:text-[#06b6d4] transition-colors">Terms</Link>
            <Link href="/security" className="text-white/40 uppercase tracking-widest font-semibold hover:text-[#06b6d4] transition-colors">Security</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}

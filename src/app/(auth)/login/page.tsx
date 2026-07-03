'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, KeyRound, Eye, EyeOff, CheckCircle2, Zap, ShieldAlert } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().min(1, 'Identity node email is required').email('Please enter a valid node email'),
  password: z.string().min(8, 'Access key must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Background particle overlay effect
  useEffect(() => {
    const canvas = document.getElementById('neuralCanvas') as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    const particleCount = 40; // reduced count for smaller mobile container performance
    const connectionDistance = 120;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.5,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(16, 185, 129, 0.35)';
        ctx.fill();

        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.1 * (1 - dist / connectionDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onTouched',
  });

  const onSubmit = async (data: LoginFormValues) => {
    setSubmitError(null);
    setSubmitSuccess(false);

    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (data.email === 'error@wellfinanced.com') {
      setSubmitError('Authentication failed. Invalid identity node or access key.');
    } else {
      setSubmitSuccess(true);
      setTimeout(() => {
        window.location.href = '/onboarding';
      }, 1000);
    }
  };

  return (
    <div className="bg-[#020617] text-[#f1f5f9] font-sans selection:bg-[#10b981]/30 min-h-screen w-full flex justify-center items-start overflow-y-auto relative">
      <style>{`
        .ultra-glass {
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(40px) saturate(180%);
          -webkit-backdrop-filter: blur(40px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.8);
        }
        
        .input-ai-glow:focus-within {
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.15);
          border-color: rgba(16, 185, 129, 0.4);
        }

        .btn-premium {
          background: linear-gradient(135deg, #10b981 0%, #0d9488 100%);
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          position: relative;
          overflow: hidden;
        }
        
        .btn-premium:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.5);
          filter: brightness(1.1);
        }

        .btn-premium::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(transparent, rgba(255, 255, 255, 0.1), transparent);
          transform: rotate(45deg);
          transition: 0.8s;
        }

        .btn-premium:hover::after {
          left: 120%;
        }

        .mesh-bg-animated {
          background-color: #020617;
          background-image: 
            radial-gradient(at 0% 0%, rgba(16, 185, 129, 0.12) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(13, 148, 136, 0.1) 0px, transparent 50%),
            radial-gradient(at 50% 50%, rgba(2, 6, 23, 1) 0px, transparent 80%);
        }

        .scan-line {
          position: absolute;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #10b981, transparent);
          top: 0;
          left: 0;
          opacity: 0;
          pointer-events: none;
        }

        .input-ai-glow:focus-within .scan-line {
          animation: scan 2.5s linear infinite;
          opacity: 0.5;
        }

        @keyframes scan {
          0% { top: 0%; }
          100% { top: 100%; }
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background-color: #10b981;
          border-radius: 50%;
          box-shadow: 0 0 10px #10b981;
          animation: pulse-dot 2s infinite;
        }

        @keyframes pulse-dot {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      {/* Particle Overlay */}
      <canvas className="fixed inset-0 pointer-events-none -z-10 opacity-30" id="neuralCanvas" />

      {/* Centered Mobile Device Viewport */}
      <div className="w-full max-w-[430px] min-h-screen bg-[#020617]/50 border-x border-white/5 flex flex-col relative shadow-2xl overflow-x-hidden">
        {/* Header */}
        <header className="w-full h-20 flex items-center px-6 z-50">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-11 h-11 bg-[#10b981]/10 border border-[#10b981]/20 rounded-xl flex items-center justify-center">
                <span className="text-[#10b981] text-xl font-bold select-none">⚙️</span>
              </div>
              <div className="absolute -top-1 -right-1 status-dot" />
            </div>
            <span className="text-xl font-semibold tracking-tight text-[#f1f5f9] font-display">
              Cyber Freelance <span className="text-[#10b981]">AI</span>
            </span>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="grow flex items-center justify-center px-6 relative z-10 py-8">
          {/* Center Glow */}
          <div className="absolute w-[350px] h-[350px] bg-[#10b981]/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

          {/* Login Card */}
          <div className="ultra-glass w-full rounded-2xl p-6 relative overflow-hidden border border-white/5">
            {/* Subtle gradient border overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-[#10b981]/5 via-transparent to-[#0d9488]/5 pointer-events-none" />
            
            <div className="mb-8 text-center relative z-10">
              <h1 className="text-2xl font-bold tracking-tight mb-2 bg-linear-to-b from-white to-white/60 bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-[#94a3b8] text-xs font-light">Access your intelligent income dashboard.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
              {/* Global Alerts */}
              {submitError && (
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium animate-fade-in">
                  <ShieldAlert className="w-5 h-5 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              {submitSuccess && (
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#10b981]/10 border border-[#10b981]/20 text-[#10b981] text-xs font-medium animate-fade-in">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Authentication successful. Loading node...</span>
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <label className="font-semibold text-[10px] text-[#10b981]/70 tracking-[0.15em] uppercase px-1">
                  Identity Node
                </label>
                <div className={`relative input-ai-glow transition-all duration-300 rounded-xl border ${
                  errors.email ? 'border-red-500/40' : 'border-[#334155]/40'
                }`}>
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748b]/60 flex items-center justify-center">
                    <Mail className="w-4.5 h-4.5" />
                  </span>
                  <input
                    type="email"
                    placeholder="freelancer@neural.ai"
                    disabled={isSubmitting || submitSuccess}
                    className="w-full bg-[#0f172a]/50 rounded-xl py-3.5 pl-12 pr-4 text-sm text-[#f1f5f9] placeholder-[#64748b]/40 focus:outline-none transition-all focus:bg-[#0f172a]"
                    {...register('email')}
                  />
                  <div className="scan-line" />
                </div>
                {errors.email && (
                  <span className="text-xs text-red-400 px-1 block">{errors.email.message}</span>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="font-semibold text-[10px] text-[#10b981]/70 tracking-[0.15em] uppercase">
                    Access Key
                  </label>
                  <span className="text-[10px] text-[#94a3b8] hover:text-[#10b981] transition-colors font-semibold cursor-pointer">
                    LOST KEY?
                  </span>
                </div>
                <div className={`relative input-ai-glow transition-all duration-300 rounded-xl border ${
                  errors.password ? 'border-red-500/40' : 'border-[#334155]/40'
                }`}>
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748b]/60 flex items-center justify-center">
                    <KeyRound className="w-4.5 h-4.5" />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••••••"
                    disabled={isSubmitting || submitSuccess}
                    className="w-full bg-[#0f172a]/50 rounded-xl py-3.5 pl-12 pr-12 text-sm text-[#f1f5f9] placeholder-[#64748b]/40 focus:outline-none transition-all focus:bg-[#0f172a]"
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748b]/60 hover:text-[#10b981] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                  <div className="scan-line" />
                </div>
                {errors.password && (
                  <span className="text-xs text-red-400 px-1 block">{errors.password.message}</span>
                )}
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center gap-3 px-1 group cursor-pointer">
                <input
                  id="remember"
                  type="checkbox"
                  disabled={isSubmitting || submitSuccess}
                  className="w-4 h-4 rounded border-[#334155]/40 bg-[#1e293b]/50 text-[#10b981] focus:ring-[#10b981]/20 focus:ring-offset-0 cursor-pointer transition-colors"
                  {...register('rememberMe')}
                />
                <label htmlFor="remember" className="text-xs text-[#94a3b8] cursor-pointer group-hover:text-[#f1f5f9] transition-colors select-none">
                  Maintain persistent authentication (30 days)
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || submitSuccess}
                className="w-full btn-premium text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-3 text-xs tracking-[0.15em] shadow-lg disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    AUTHENTICATING...
                  </>
                ) : (
                  <>
                    <Zap className="w-4.5 h-4.5" />
                    LOGIN
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#334155]/20" />
              </div>
              <div className="relative flex justify-center text-[9px] uppercase tracking-widest">
                <span className="ultra-glass px-3.5 py-0.5 text-[#64748b]/80 rounded-full border border-[#334155]/20">
                  Gateway Options
                </span>
              </div>
            </div>

            {/* Social Logins with SVGs */}
            <div className="grid grid-cols-2 gap-3 relative z-10">
              <button
                type="button"
                disabled={isSubmitting || submitSuccess}
                className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 py-3 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 active:scale-[0.98] cursor-pointer"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
                <span className="text-xs font-semibold text-[#f1f5f9]/80">Google</span>
              </button>
              <button
                type="button"
                disabled={isSubmitting || submitSuccess}
                className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 py-3 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 active:scale-[0.98] cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current text-white/80 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                <span className="text-xs font-semibold text-[#f1f5f9]/80">GitHub</span>
              </button>
            </div>

            {/* Footer Link */}
            <div className="mt-8 text-center relative z-10">
              <p className="text-[10px] text-[#94a3b8] font-semibold">
                New to the AI economy?{' '}
                <Link href="/register" className="text-[#10b981] hover:text-[#34d399] transition-colors ml-1 font-bold underline underline-offset-4">
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full py-6 mt-auto flex flex-col items-center justify-center px-6 gap-3 bg-transparent border-t border-white/5 text-[9px] tracking-wider font-semibold text-[#94a3b8]/60 uppercase z-10 text-center">
          <span>© 2024 Cyber Freelance AI. Secured by Neural Encryption.</span>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#10b981] transition-colors cursor-pointer">Privacy Protocol</span>
            <span className="hover:text-[#10b981] transition-colors cursor-pointer">Service Terms</span>
            <span className="hover:text-[#10b981] transition-colors cursor-pointer">Neural Status</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

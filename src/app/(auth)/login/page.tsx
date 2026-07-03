'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, KeyRound, Eye, EyeOff, CheckCircle2, Zap, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col font-sans text-white bg-background">
      {/* Decorative Ambient Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan/10 blur-[120px] pointer-events-none" />

      {/* Global Header Navigation */}
      <nav className="absolute top-0 left-0 right-0 h-16 flex items-center justify-between px-6 lg:px-10 border-b border-white/5 backdrop-blur-md bg-[#060B1A]/60 z-20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-lg font-bold text-background shadow-[0_0_16px_rgba(124,58,237,0.45)]">
            W
          </div>
          <span className="text-base font-extrabold tracking-tight text-text select-none">WellFinanced</span>
        </div>
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan/10 border border-cyan/20 text-[10px] font-bold uppercase tracking-widest text-cyan select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
          AI Active
        </div>
      </nav>

      {/* Main Content Layout */}
      <main className="flex-1 flex w-full pt-16 pb-16 lg:pb-12 z-10 relative">
        {/* Left Column Panel (Visible only on desktop lg+) */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-start px-16 py-16 relative border-r border-white/5 overflow-hidden">
          {/* Internal Ambient Glows */}
          <div className="absolute w-80 h-80 rounded-full blur-[80px] bg-secondary/20 -top-20 -left-20 pointer-events-none" />
          <div className="absolute w-64 h-64 rounded-full blur-[80px] bg-cyan/15 bottom-10 -right-16 pointer-events-none" />
          <div className="absolute w-44 h-44 rounded-full blur-[80px] bg-mint/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

          {/* Interactive Spinning Graphics */}
          <motion.div
            className="relative w-56 h-56 mb-12 flex items-center justify-center select-none"
            animate={{ x: mousePos.x, y: mousePos.y }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="absolute inset-0 rounded-full border-[1.5px] border-secondary/50 animate-spin [animation-duration:9s]" />
            <div className="absolute inset-5 rounded-full border-[1.5px] border-cyan/40 animate-spin [animation-duration:14s] [animation-direction:reverse]" />
            <div className="absolute inset-11 rounded-full border-[1.5px] border-mint/30 animate-spin [animation-duration:6s]" />
            <div className="absolute inset-14 rounded-full bg-gradient-to-br from-secondary/30 to-cyan/20 backdrop-blur-md flex items-center justify-center shadow-lg">
              <span className="text-5xl">⚙️</span>
            </div>
          </motion.div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-mint/25 bg-mint/10 text-[10px] font-bold tracking-widest uppercase text-mint mb-6 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
            Active Node Status
          </div>

          <h2 className="text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-5 text-text">
            Smart Financial<br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-pink">
              Workstation.
            </span>
          </h2>

          <p className="text-sm text-muted leading-relaxed max-w-[380px] mb-12">
            Organize income streams, simulate cash flow smoothing, and allocate taxes dynamically.
          </p>

          <div className="flex gap-4 flex-wrap select-none">
            <div className="px-6 py-3.5 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-xl">
              <div className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-mint to-cyan">99.9%</div>
              <div className="text-[10px] text-muted uppercase tracking-widest mt-0.5">Uptime SLA</div>
            </div>
            <div className="px-6 py-3.5 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-xl">
              <div className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-mint to-cyan">AES-256</div>
              <div className="text-[10px] text-muted uppercase tracking-widest mt-0.5">Encryption</div>
            </div>
            <div className="px-6 py-3.5 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-xl">
              <div className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-mint to-cyan">0ms</div>
              <div className="text-[10px] text-muted uppercase tracking-widest mt-0.5">Latency SLA</div>
            </div>
          </div>
        </div>

        {/* Right Column Panel (Forms card panel - responsive layout) */}
        <div className="flex-1 lg:w-1/2 flex items-center justify-center p-6 lg:p-14">
          <div className="w-full max-w-[480px] bg-surface border border-white/5 rounded-card backdrop-blur-xl shadow-neon p-6 sm:p-10">
            
            <div className="mb-8 select-none">
              <h1 className="text-2xl font-extrabold tracking-tight mb-1 text-text">Welcome Back</h1>
              <p className="text-xs text-muted">Access your intelligent income dashboard.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {submitError && (
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-danger/10 border border-danger/20 text-danger text-xs font-medium animate-fade-in">
                  <ShieldAlert className="w-5 h-5 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              {submitSuccess && (
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-success/15 border border-success/25 text-mint text-xs font-medium animate-fade-in">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Authentication successful. Loading node...</span>
                </div>
              )}

              {/* Email (Identity Node) Field */}
              <Input
                id="email"
                type="email"
                label="Identity Node"
                placeholder="freelancer@neural.ai"
                disabled={isSubmitting || submitSuccess}
                leftIcon={<Mail className="w-4 h-4" />}
                error={errors.email?.message}
                {...register('email')}
              />

              {/* Password (Access Key) Field */}
              <div className="w-full flex flex-col gap-2">
                <div className="flex justify-between items-center px-1 select-none">
                  <label htmlFor="password" className="text-[11px] font-bold text-muted uppercase tracking-wider">
                    Access Key
                  </label>
                  <span className="text-[10px] text-muted hover:text-cyan transition-colors font-bold cursor-pointer uppercase tracking-wider">
                    Lost Key?
                  </span>
                </div>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  disabled={isSubmitting || submitSuccess}
                  leftIcon={<KeyRound className="w-4 h-4" />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-muted hover:text-text transition-colors flex items-center justify-center p-1"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                  error={errors.password?.message}
                  {...register('password')}
                />
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center gap-3 px-1 select-none">
                <input
                  id="remember"
                  type="checkbox"
                  disabled={isSubmitting || submitSuccess}
                  className="w-4 h-4 rounded border-white/10 bg-white/5 text-primary focus:ring-primary/20 focus:ring-offset-0 cursor-pointer transition-colors"
                  {...register('rememberMe')}
                />
                <label htmlFor="remember" className="text-xs text-muted cursor-pointer hover:text-text transition-colors">
                  Maintain persistent authentication (30 days)
                </label>
              </div>

              {/* Submit CTA Button */}
              <Button
                type="submit"
                variant="primary"
                fullWidth
                disabled={isSubmitting || submitSuccess}
                isLoading={isSubmitting}
                className="group font-bold text-bg-1 tracking-wider uppercase"
              >
                <Zap className="w-4.5 h-4.5 mr-1" />
                <span>Login</span>
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6 select-none">
              <div className="flex-1 h-px bg-white/5" />
              <span className="text-[9px] text-muted uppercase tracking-widest whitespace-nowrap">
                or continue with
              </span>
              <div className="flex-1 h-px bg-white/5" />
            </div>

            {/* Social Authentication Options */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="h-12 text-xs flex items-center justify-center gap-2 border border-white/5"
                disabled={isSubmitting || submitSuccess}
                onClick={() => {}}
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
                <span>Google</span>
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="h-12 text-xs flex items-center justify-center gap-2 border border-white/5"
                disabled={isSubmitting || submitSuccess}
                onClick={() => {}}
              >
                <svg className="w-4 h-4 fill-current text-white/80 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                <span>GitHub</span>
              </Button>
            </div>

            {/* Bottom Redirect Link */}
            <div className="mt-8 text-center select-none">
              <p className="text-xs text-muted">
                New to the AI economy?{' '}
                <Link href="/register" className="text-primary hover:text-secondary hover:underline transition-colors ml-1 font-bold">
                  Create Account
                </Link>
              </p>
            </div>

          </div>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="absolute bottom-0 left-0 right-0 h-12 flex items-center justify-between px-6 lg:px-10 border-t border-white/5 bg-[#060B1A]/50 z-20">
        <span className="text-[10px] text-muted">© {new Date().getFullYear()} WellFinanced · Secured by Neural Encryption</span>
        <div className="flex gap-4">
          <Link href="/privacy" className="text-[10px] font-semibold text-muted uppercase tracking-widest hover:text-cyan transition-colors">Privacy</Link>
          <Link href="/terms" className="text-[10px] font-semibold text-muted uppercase tracking-widest hover:text-cyan transition-colors">Terms</Link>
          <Link href="/security" className="text-[10px] font-semibold text-muted uppercase tracking-widest hover:text-cyan transition-colors">Security</Link>
        </div>
      </footer>
    </div>
  );
}

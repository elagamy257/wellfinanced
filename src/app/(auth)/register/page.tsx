'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { EyeOff, Eye, ShieldAlert, CheckCircle2, User as UserIcon, Shield, Fingerprint, AtSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useRegister, normalizeError } from '@/features/auth';

const registerSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').max(60, 'Name must be under 60 characters'),
  email: z.string().min(1, 'Email address is required').email('Please enter a valid email address'),
  username: z.string().min(3, 'Username must be at least 3 characters').max(30, 'Username must be under 30 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const router = useRouter();
  const registerMutation = useRegister();
  const isLoading = registerMutation.isPending;

  React.useEffect(() => {
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
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      username: '',
      password: '',
    },
    mode: 'onTouched',
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setSubmitError(null);
    setSubmitSuccess(false);

    registerMutation.mutate(
      {
        name: data.fullName,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          setSubmitSuccess(true);
          setTimeout(() => {
            router.push('/login');
          }, 1500);
        },
        onError: (err) => {
          const authError = normalizeError(err);
          setSubmitError(authError.message);
        },
      }
    );
  };

  return (
    <div className="flex-1 flex w-full relative">
      {/* Left Column Panel (Visible only on desktop lg+) */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-start px-16 py-16 relative border-r border-white/5 overflow-hidden">
        {/* Internal Ambient Glows */}
        <div className="absolute w-80 h-80 rounded-full blur-[80px] bg-secondary/15 -top-20 -left-20 pointer-events-none" />
        <div className="absolute w-64 h-64 rounded-full blur-[80px] bg-cyan/10 bottom-10 -right-16 pointer-events-none" />

        {/* Orbit / Fingerprint Visual */}
        <motion.div
          className="relative w-64 h-64 mb-12 flex items-center justify-center select-none mx-auto"
          animate={{ x: mousePos.x, y: mousePos.y }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
          {/* External ring */}
          <div className="absolute inset-0 rounded-full border border-success/20 flex items-center justify-center">
            {/* Middle ring */}
            <div className="w-[85%] h-[85%] rounded-full border border-success/10 flex items-center justify-center">
              {/* Inner ring */}
              <div className="w-[60%] h-[60%] rounded-full bg-success/5 border border-success/10 flex items-center justify-center" />
            </div>
          </div>
          {/* Floating Fingerprint Node */}
          <div className="absolute right-5 bottom-5 w-11 h-11 rounded-full bg-background border border-success/40 flex items-center justify-center shadow-glow animate-pulse">
            <Fingerprint className="w-5.5 h-5.5 text-success" />
          </div>
        </motion.div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-success/25 bg-success/10 text-[10px] font-bold tracking-widest uppercase text-success mb-6 select-none">
          <Shield className="w-3.5 h-3.5" />
          <span>Enterprise Security</span>
        </div>

        <h2 className="text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-5 text-white">
          Neural Privacy<br/>
          <span className="text-success">
            Architecture.
          </span>
        </h2>

        <p className="text-xs text-slate-400 font-light leading-relaxed max-w-sm mb-8 select-none">
          Fintova features zero-knowledge security models. Your financials are encrypted at rest with military-grade algorithms.
        </p>

        {/* Flat Stats Footer */}
        <div className="flex gap-16 select-none mt-auto">
          <div>
            <div className="text-xl font-bold text-success">99.9%</div>
            <div className="text-[10px] text-muted font-bold uppercase tracking-wider mt-1">Uptime SLA</div>
          </div>
          <div>
            <div className="text-xl font-bold text-success">AES-256</div>
            <div className="text-[10px] text-muted font-bold uppercase tracking-wider mt-1">Encryption</div>
          </div>
        </div>
      </div>

      {/* Right Column Panel (Forms flat layout) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-16 lg:p-24 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute w-[500px] h-[500px] bg-success/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

        <div className="max-w-[400px] w-full mx-auto relative z-10">
          <div className="mb-8 select-none text-center lg:text-left">
            <h1 className="text-2xl font-bold tracking-tight mb-2 text-white">
              Initialize Fintova Node
            </h1>
            <p className="text-muted text-xs font-light">Set up your secure sandbox profile.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {submitError && (
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-danger/10 border border-danger/20 text-danger text-xs font-medium animate-fade-in">
                <ShieldAlert className="w-5 h-5 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            {submitSuccess && (
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-success/15 border border-success/25 text-mint text-xs font-medium animate-fade-in">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Workspace registered! Redirecting to login...</span>
              </div>
            )}

            {/* Full Name Field (Right Icon) */}
            <Input
              id="fullName"
              type="text"
              placeholder="Full Name"
              disabled={isLoading || submitSuccess}
              rightIcon={<UserIcon className="w-4 h-4 text-muted/65" />}
              error={errors.fullName?.message}
              {...register('fullName')}
            />

            {/* Email Address Field (Right Icon) */}
            <Input
              id="email"
              type="email"
              placeholder="Email Address"
              disabled={isLoading || submitSuccess}
              rightIcon={<span className="text-sm font-semibold text-muted/65 select-none">@</span>}
              error={errors.email?.message}
              {...register('email')}
            />

            {/* Username Field (Right Icon) */}
            <Input
              id="username"
              type="text"
              placeholder="Username"
              disabled={isLoading || submitSuccess}
              rightIcon={<AtSign className="w-4 h-4 text-muted/65" />}
              error={errors.username?.message}
              {...register('username')}
            />

            {/* Password Field (Right Icon Toggle) */}
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              disabled={isLoading || submitSuccess}
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

            {/* Submit CTA Button */}
            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isLoading || submitSuccess}
              isLoading={isLoading}
              className="group font-bold text-bg-1 tracking-wider uppercase h-14 rounded-input select-none"
            >
              <span>Create Account</span>
              <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
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

          {/* Social Authentication */}
          <div className="grid grid-cols-2 gap-3 w-full">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="h-12 text-xs flex items-center justify-center gap-2 border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10"
              disabled={isLoading || submitSuccess}
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
              className="h-12 text-xs flex items-center justify-center gap-2 border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10"
              disabled={isLoading || submitSuccess}
              onClick={() => {}}
            >
              <svg className="w-4 h-4 fill-current text-white/80 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              <span>GitHub</span>
            </Button>
          </div>

          {/* Bottom Redirect Link */}
          <p className="text-center text-xs text-muted mt-8 select-none">
            Already established?{' '}
            <Link 
              href="/login" 
              className="font-bold text-success hover:underline hover:text-success/90 underline-offset-4 ml-1"
            >
              Access Core
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

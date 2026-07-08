'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, KeyRound, Eye, EyeOff, CheckCircle2, Zap, ShieldAlert } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const loginSchema = z.object({
  email: z.string().min(1, 'Email address is required').email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

    if (data.email === 'error@dananirblanco.com') {
      setSubmitError('Authentication failed. Invalid identity node or access key.');
    } else {
      setSubmitSuccess(true);
      setTimeout(() => {
        window.location.href = '/onboarding';
      }, 1000);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 lg:p-14">
      {/* Center Ambient Glow */}
      <div className="absolute w-[600px] h-[600px] bg-success/5 rounded-full blur-[150px] -z-10 pointer-events-none" />

      {/* Login Card Panel (Centered Layout matching the design image) */}
      <div className="w-full max-w-[440px] bg-[#0c142c]/40 border border-white/5 rounded-card backdrop-blur-xl shadow-neon p-8 sm:p-12 relative overflow-hidden">
        {/* Subtle gradient border overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-success/5 via-transparent to-primary/5 pointer-events-none -z-10" />

        <div className="mb-10 text-center select-none">
          <h1 className="text-2xl font-bold tracking-tight mb-2 text-white">
            Welcome Back
          </h1>
          <p className="text-muted text-xs font-light">Access your intelligent income dashboard.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

          {/* Email Address Field */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-success/80 tracking-[0.15em] uppercase px-1 select-none block">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Email Address"
              disabled={isSubmitting || submitSuccess}
              leftIcon={<Mail className="w-4.5 h-4.5 text-slate-400" />}
              error={errors.email?.message}
              {...register('email')}
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1 select-none">
              <label className="text-[10px] font-bold text-success/80 tracking-[0.15em] uppercase">
                Password
              </label>
              <span className="text-[10px] text-muted hover:text-success transition-colors font-bold tracking-wider uppercase cursor-pointer">
                Forgot Password?
              </span>
            </div>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              disabled={isSubmitting || submitSuccess}
              leftIcon={<KeyRound className="w-4.5 h-4.5 text-slate-400" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-500 hover:text-slate-350 transition-colors flex items-center justify-center p-1"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
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
              className="w-4 h-4 rounded border-white/10 bg-white/5 text-success focus:ring-success/20 focus:ring-offset-0 cursor-pointer transition-colors"
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
            className="bg-[#10b981]! text-white! hover:brightness-110! font-bold tracking-wider uppercase h-14 rounded-input select-none flex items-center justify-center gap-2"
          >
            <Zap className="w-4.5 h-4.5" />
            <span>Login</span>
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-8 select-none">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5" />
          </div>
          <div className="relative flex justify-center text-[9px] uppercase tracking-widest">
            <span className="bg-[#0b1329] border border-white/5 px-3.5 py-0.5 text-muted rounded-full">
              Gateway Options
            </span>
          </div>
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
            <Link href="/register" className="font-bold text-success hover:underline hover:text-success/90 underline-offset-4 ml-1">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

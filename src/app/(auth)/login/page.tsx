'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, KeyRound, Eye, EyeOff, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const loginSchema = z.object({
  email: z.string().min(1, 'Identity email is required').email('Please enter a valid email address'),
  password: z.string().min(8, 'Access key must be at least 8 characters'),
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

    if (data.email === 'error@wellfinanced.com') {
      setSubmitError('Access Denied. Invalid credentials or unauthorized identity.');
    } else {
      setSubmitSuccess(true);
      // Mock redirection
      setTimeout(() => {
        window.location.href = '/onboarding';
      }, 1000);
    }
  };

  return (
    <Card className="border border-white/5 relative overflow-hidden bg-bg-2/80 backdrop-blur-[40px]">
      {/* Subtle overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/5 via-transparent to-primary-cyan/5 pointer-events-none" />

      <CardHeader className="text-center relative z-10 pb-8">
        <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-text to-muted font-black text-3xl">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-sm font-light">
          Authenticate to access your intelligent dashboard.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
        <CardContent className="space-y-5">
          {/* Global Alert Banners */}
          {submitError && (
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-danger/10 border border-danger/20 text-danger text-[13px] font-medium animate-fade-in">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          {submitSuccess && (
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-success/15 border border-success/25 text-success text-[13px] font-medium animate-fade-in">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>Authentication Successful. Initializing core...</span>
            </div>
          )}

          {/* Email input */}
          <Input
            id="email"
            type="email"
            label="Identity Node"
            placeholder="freelancer@neural.ai"
            leftIcon={<Mail className="w-[18px] h-[18px]" />}
            disabled={isSubmitting || submitSuccess}
            error={errors.email?.message}
            {...register('email')}
          />

          {/* Password input */}
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            label="Access Key"
            placeholder="••••••••••••"
            leftIcon={<KeyRound className="w-[18px] h-[18px]" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted hover:text-text transition-colors duration-200 cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
              </button>
            }
            disabled={isSubmitting || submitSuccess}
            error={errors.password?.message}
            {...register('password')}
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center px-1 text-xs select-none">
            <label className="flex items-center gap-2 text-muted hover:text-text transition-colors duration-150 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-white/10 bg-white/5 text-primary-purple focus:ring-primary-purple/20 focus:ring-offset-0 cursor-pointer transition-colors"
                disabled={isSubmitting || submitSuccess}
                {...register('rememberMe')}
              />
              <span>Maintain persistent access</span>
            </label>
            <span className="text-primary-purple font-semibold hover:underline cursor-pointer">
              Lost Key?
            </span>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-5">
          <Button
            type="submit"
            variant="purple"
            fullWidth
            disabled={isSubmitting || submitSuccess}
            className="h-14 font-bold tracking-widest text-xs uppercase"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Authenticating...
              </span>
            ) : (
              <span className="flex items-center gap-2 justify-center">
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3 w-full">
            <div className="flex-1 h-[1px] bg-white/5" />
            <span className="text-[10px] text-muted uppercase tracking-widest whitespace-nowrap">
              or connect gateway
            </span>
            <div className="flex-1 h-[1px] bg-white/5" />
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-3 w-full">
            <button
              type="button"
              disabled={isSubmitting || submitSuccess}
              className="h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-2 text-[13px] font-semibold text-muted transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-text disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzb4dmZFHJdybrf5zMPonpKEELWz46KVfAnb_9ndF42pdstrwJ4K4xu76iL20xDVFW8Ugl7Ef_afjXhMQzjgjaY1HkRc2TvDRdA3KgmZgdCrTEuLUZYqnoILAwXCx9Xpay6W14NwBjzt92TMZnfjxt5W7DoxL3GOBWFvvwBCacDmHPY9EnIcS4Z0zjU1VASex1H68ehAHGM6aRO78HqVAVv-NPJwXSAoPaQ00M13_2_A6AXLWP1kBEcVXSqjJTREM8pIMWCR-7OgU"
                className="w-4 h-4 object-contain"
                alt="Google Logo"
              />
              Google
            </button>
            <button
              type="button"
              disabled={isSubmitting || submitSuccess}
              className="h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-2 text-[13px] font-semibold text-muted transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-text disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFo4Gu_ZeoF5u631741yITgPrDHUJYlvHkVBlEowHrdz159dFxdinuZPSEUiJceGMytKGnZnxpmJIUisghYcaHdN1MsGjiunx71llNtG7xkuL-WSbTs8f6nyd6CQtxDU34hVDdLGDhROF7WzewJAEx_wdCYk0NXPfW9GHKfQjcvOg83oBre-bOJq5Pa8grzs7wNYaYS6hsk3xqI_3O7GbHUBCHwKJ-2UclxOaVNVbo0i-5XS8pMt4MynxCHz_8l0uo38XRePX4FJU"
                className="w-4 h-4 object-contain invert opacity-75"
                alt="GitHub Logo"
              />
              GitHub
            </button>
          </div>

          {/* Redirection */}
          <p className="text-center text-xs text-muted w-full mt-2">
            New to the AI economy?{' '}
            <Link
              href="/register"
              className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-purple to-primary-cyan hover:underline decoration-primary-cyan underline-offset-4"
            >
              Create Account
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}

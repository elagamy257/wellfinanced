'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Coins, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Percent, 
  Check,
  Zap
} from 'lucide-react';

import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

// STEP 2: Workspace Config Schema
const workspaceSchema = z.object({
  currency: z.string().min(1, 'Currency selection is required'),
  monthlyTarget: z.string().min(1, 'Monthly revenue target is required')
    .refine(val => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Monthly target must be a positive number',
    }),
  industry: z.string().min(1, 'Please select an industry category'),
});

// STEP 3: Tax Preferences & Bank Link Schema
const preferencesSchema = z.object({
  taxRate: z.string().min(1, 'Tax rate is required')
    .refine(val => !isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 100, {
      message: 'Tax rate must be between 0% and 100%',
    }),
  reserveFrequency: z.enum(['transaction', 'monthly', 'quarterly']),
  linkProvider: z.string().min(1, 'Please select a gateway provider or manual entry'),
});

type WorkspaceFormValues = z.infer<typeof workspaceSchema>;
type PreferencesFormValues = z.infer<typeof preferencesSchema>;

export default function OnboardingPage() {
  const [step, setStep] = useState<2 | 3 | 4>(2);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form step data persistence
  const [savedWorkspace, setSavedWorkspace] = useState<WorkspaceFormValues>({
    currency: 'USD',
    monthlyTarget: '10000',
    industry: 'engineering',
  });

  // Track mouse coordinates for left panel animation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Step 2 Form Hook
  const {
    register: registerWorkspace,
    handleSubmit: handleWorkspaceSubmit,
    formState: { errors: workspaceErrors },
  } = useForm<WorkspaceFormValues>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: savedWorkspace,
    mode: 'onTouched',
  });

  // Step 3 Form Hook
  const {
    register: registerPref,
    handleSubmit: handlePrefSubmit,
    setValue: setPrefValue,
    watch: watchPref,
    formState: { errors: prefErrors },
  } = useForm<PreferencesFormValues>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      taxRate: '25',
      reserveFrequency: 'transaction',
      linkProvider: 'plaid',
    },
    mode: 'onTouched',
  });

  const selectedProvider = watchPref('linkProvider');
  const selectedFrequency = watchPref('reserveFrequency');

  const onWorkspaceNext = (data: WorkspaceFormValues) => {
    setSavedWorkspace(data);
    setStep(3);
  };

  const onPreferencesSubmit = async () => {
    setIsLoading(true);
    // Simulate activation API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setSubmitSuccess(true);
    setStep(4);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[linear-gradient(160deg,var(--color-background)_0%,var(--color-bg-2)_55%,var(--color-bg-3)_100%)] flex flex-col font-sans text-text select-none">
      
      {/* Background gradients */}
      <div 
        className="absolute inset-0 pointer-events-none transition-transform duration-300 ease-out" 
        style={{
          transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)`,
          background: `
            radial-gradient(circle at 10% 30%, rgba(124,58,237,.18) 0%, transparent 40%),
            radial-gradient(circle at 90% 70%, rgba(6,182,212,.15) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(79,70,229,.1) 0%, transparent 35%)
          `
        }}
      />

      {/* Navbar */}
      <nav className="absolute top-0 left-0 right-0 h-16 flex items-center justify-between px-6 md:px-10 border-b border-white/5 backdrop-blur-md bg-bg-1/65 z-20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-purple flex items-center justify-center text-lg shadow-glow">
            💎
          </div>
          <span className="text-base font-extrabold tracking-tight">WellFinanced</span>
        </div>
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-[10px] font-bold uppercase tracking-widest text-accent-cyan shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse"></span>
          AI Core Active
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex w-full pt-16 pb-12 z-10 relative">
        
        {/* Left Side Panel - Informative */}
        <div className="hidden lg:flex w-[44%] flex-col justify-center items-start px-14 py-16 relative border-r border-white/5 overflow-hidden">
          <div className="absolute w-80 h-80 rounded-full blur-[90px] bg-primary-purple/10 -top-20 -left-20" />
          <div className="absolute w-64 h-64 rounded-full blur-[80px] bg-primary-cyan/10 bottom-10 -right-16" />

          {/* Interactive Core */}
          <div 
            className="relative w-56 h-56 mb-12"
            style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
          >
            <div className="absolute inset-0 rounded-full border-[1.5px] border-primary-purple/30 animate-[spin-slow_12s_linear_infinite]" />
            <div className="absolute inset-5 rounded-full border-[1.5px] border-primary-cyan/30 animate-[spin-slow_18s_linear_infinite_reverse]" />
            <div className="absolute inset-10 rounded-full border-[1.5px] border-success-green/20 animate-[spin-slow_8s_linear_infinite]" />
            <div className="absolute inset-14 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-glow">
              <span className="text-5xl select-none">📊</span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary-cyan/25 bg-primary-cyan/10 text-[10px] font-bold tracking-widest uppercase text-primary-cyan mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-cyan animate-pulse" />
            Adaptive Intelligence
          </div>

          <h2 className="text-4xl font-black leading-[1.2] tracking-tight mb-5">
            Optimize Your<br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-purple via-primary-pink to-accent-yellow">
              Financial Destiny.
            </span>
          </h2>

          <p className="text-sm text-muted leading-relaxed max-w-sm">
            Configure your local workspace parameters. Our background tax-reserve algorithms adapt automatically to your transactional cycles.
          </p>
        </div>

        {/* Right Side Panel - Interactive Form Wizard */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-14">
          <Card className="w-full max-w-[500px] border border-white/5 rounded-card backdrop-blur-xl bg-bg-2/80 p-8 md:p-10 shadow-neon">
            
            {/* Steps Progress Indicator */}
            {step < 4 && (
              <div className="flex items-center gap-3 mb-8 select-none">
                <div className="flex-1 h-[3px] rounded-full bg-gradient-to-r from-primary-purple to-primary-cyan shadow-glow" />
                <div className={`flex-1 h-[3px] rounded-full transition-colors duration-300 ${
                  step >= 3 ? 'bg-gradient-to-r from-primary-cyan to-accent-cyan shadow-glow' : 'bg-white/10'
                }`} />
                <div className="flex-1 h-[3px] rounded-full bg-white/10" />
                <span className="text-[10px] font-bold text-muted uppercase tracking-widest whitespace-nowrap ml-2">
                  Step {step} / 3
                </span>
              </div>
            )}

            {/* STEP 2: Workspace Config Form */}
            {step === 2 && (
              <form onSubmit={handleWorkspaceSubmit(onWorkspaceNext)} className="space-y-6">
                <div>
                  <h1 className="text-2xl font-black tracking-tight mb-1.5 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
                    Workspace Setup
                  </h1>
                  <p className="text-xs text-muted">
                    Set up your primary active currency and revenue projections.
                  </p>
                </div>

                <div className="space-y-5">
                  {/* Currency Picker */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold text-muted uppercase tracking-wider px-1">
                      Trading Currency
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: 'USD ($)', code: 'USD' },
                        { label: 'EUR (€)', code: 'EUR' },
                        { label: 'GBP (£)', code: 'GBP' },
                      ].map((item) => (
                        <label
                          key={item.code}
                          className={`flex items-center justify-center h-14 rounded-input border transition-all duration-200 cursor-pointer ${
                            savedWorkspace.currency === item.code
                              ? 'bg-primary-cyan/10 border-primary-cyan text-text shadow-glow'
                              : 'bg-white/5 border-white/5 text-muted hover:border-white/15'
                          }`}
                        >
                          <input
                            type="radio"
                            value={item.code}
                            className="sr-only"
                            {...registerWorkspace('currency')}
                            onChange={(e) => setSavedWorkspace({ ...savedWorkspace, currency: e.target.value })}
                          />
                          <span className="text-sm font-semibold">{item.label}</span>
                        </label>
                      ))}
                    </div>
                    {workspaceErrors.currency && (
                      <span className="text-xs text-danger px-1">{workspaceErrors.currency.message}</span>
                    )}
                  </div>

                  {/* Monthly Revenue Target */}
                  <Input
                    id="monthlyTarget"
                    type="text"
                    label="Monthly Target Revenue"
                    placeholder="e.g. 10000"
                    leftIcon={<Coins className="w-[18px] h-[18px]" />}
                    error={workspaceErrors.monthlyTarget?.message}
                    {...registerWorkspace('monthlyTarget')}
                  />

                  {/* Industry Category */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="industry" className="text-[11px] font-bold text-muted uppercase tracking-wider px-1">
                      Freelance Workspace Category
                    </label>
                    <div className="relative">
                      <select
                        id="industry"
                        className="w-full h-[58px] bg-white/8 backdrop-blur-[20px] border border-white/10 rounded-input px-5 text-sm text-text outline-none focus:border-primary-cyan focus:ring-2 focus:ring-primary-cyan/30 transition-all duration-200 appearance-none cursor-pointer"
                        {...registerWorkspace('industry')}
                      >
                        <option value="engineering" className="bg-bg-2">Software Engineering / IT</option>
                        <option value="design" className="bg-bg-2">Digital Design & Creative</option>
                        <option value="marketing" className="bg-bg-2">Marketing & Copywriting</option>
                        <option value="consulting" className="bg-bg-2">business Consulting</option>
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
                        ▼
                      </div>
                    </div>
                    {workspaceErrors.industry && (
                      <span className="text-xs text-danger px-1">{workspaceErrors.industry.message}</span>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="cyan"
                    fullWidth
                    className="h-14 font-bold tracking-widest text-xs uppercase"
                  >
                    <span className="flex items-center gap-2 justify-center">
                      <span>Continue Setup</span>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Button>
                </div>
              </form>
            )}

            {/* STEP 3: Tax Preferences & Bank Link Form */}
            {step === 3 && (
              <form onSubmit={handlePrefSubmit(onPreferencesSubmit)} className="space-y-6">
                <div>
                  <h1 className="text-2xl font-black tracking-tight mb-1.5 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
                    Preferences & Assets
                  </h1>
                  <p className="text-xs text-muted">
                    Configure automated tax set-asides and link financial assets.
                  </p>
                </div>

                <div className="space-y-5">
                  {/* Tax Rate Slider Option */}
                  <Input
                    id="taxRate"
                    type="number"
                    label="Estimated Tax Rate (%)"
                    placeholder="e.g. 25"
                    leftIcon={<Percent className="w-4 h-4" />}
                    error={prefErrors.taxRate?.message}
                    {...registerPref('taxRate')}
                  />

                  {/* Reserve Frequency */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold text-muted uppercase tracking-wider px-1">
                      Set-aside Frequency
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: 'Per Transaction', value: 'transaction' },
                        { label: 'Monthly', value: 'monthly' },
                        { label: 'Quarterly', value: 'quarterly' },
                      ].map((item) => (
                        <label
                          key={item.value}
                          className={`flex flex-col items-center justify-center p-3 rounded-input border transition-all duration-200 cursor-pointer text-center ${
                            selectedFrequency === item.value
                              ? 'bg-primary-purple/10 border-primary-purple text-text shadow-glow'
                              : 'bg-white/5 border-white/5 text-muted hover:border-white/15'
                          }`}
                        >
                          <input
                            type="radio"
                            value={item.value}
                            className="sr-only"
                            {...registerPref('reserveFrequency')}
                            onChange={() => setPrefValue('reserveFrequency', item.value as 'transaction' | 'monthly' | 'quarterly')}
                          />
                          <span className="text-xs font-semibold">{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Gateway Providers */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold text-muted uppercase tracking-wider px-1">
                      Link Bank Ledger
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'plaid', label: 'Plaid Link', desc: 'Secure bank integration' },
                        { id: 'manual', label: 'Manual Entry', desc: 'Configure accounts manually' },
                      ].map((prov) => (
                        <label
                          key={prov.id}
                          className={`flex flex-col items-start p-4 rounded-input border transition-all duration-200 cursor-pointer ${
                            selectedProvider === prov.id
                              ? 'bg-primary-cyan/10 border-primary-cyan text-text shadow-glow'
                              : 'bg-white/5 border-white/5 text-muted hover:border-white/15'
                          }`}
                        >
                          <input
                            type="radio"
                            value={prov.id}
                            className="sr-only"
                            {...registerPref('linkProvider')}
                            onChange={() => setPrefValue('linkProvider', prov.id)}
                          />
                          <div className="flex items-center justify-between w-full mb-1">
                            <span className="text-xs font-extrabold uppercase tracking-wider">{prov.label}</span>
                            {selectedProvider === prov.id && (
                              <Check className="w-4 h-4 text-primary-cyan shrink-0" />
                            )}
                          </div>
                          <span className="text-[10px] text-muted text-left leading-normal">{prov.desc}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setStep(2)}
                    disabled={isLoading}
                    className="flex-1 h-14 font-semibold text-xs tracking-wider"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </span>
                  </Button>

                  <Button
                    type="submit"
                    variant="cyan"
                    disabled={isLoading}
                    className="flex-[2] h-14 font-bold tracking-widest text-xs uppercase"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2 justify-center">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Activating...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 justify-center">
                        <span>Activate Node</span>
                        <Zap className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            )}

            {/* STEP 4: Success Screen */}
            {step === 4 && submitSuccess && (
              <div className="space-y-8 text-center py-6 animate-scale-in">
                <div className="w-20 h-20 rounded-full bg-success/10 border border-success/35 flex items-center justify-center mx-auto shadow-glow">
                  <CheckCircle2 className="w-10 h-10 text-success" />
                </div>

                <div className="space-y-2">
                  <h1 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-text to-muted">
                    Activation Ready
                  </h1>
                  <p className="text-xs text-muted max-w-xs mx-auto leading-relaxed">
                    Your AI workspace parameters are configured and active.
                  </p>
                </div>

                {/* Configurations Summary Box */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/5 text-left space-y-3 max-w-sm mx-auto backdrop-blur-sm">
                  <div className="text-[10px] font-bold text-muted uppercase tracking-widest border-b border-white/5 pb-2">
                    WORKSPACE MANIFEST
                  </div>
                  <div className="grid grid-cols-2 gap-y-2 text-xs font-medium">
                    <span className="text-muted">Trading Currency:</span>
                    <span className="text-text text-right font-bold">{savedWorkspace.currency}</span>

                    <span className="text-muted">Target income:</span>
                    <span className="text-text text-right font-bold">
                      {savedWorkspace.currency === 'USD' ? '$' : savedWorkspace.currency === 'EUR' ? '€' : '£'}
                      {Number(savedWorkspace.monthlyTarget).toLocaleString()}/mo
                    </span>

                    <span className="text-muted">Estimated Tax:</span>
                    <span className="text-text text-right font-bold text-primary-pink">25%</span>

                    <span className="text-muted">Reserve Period:</span>
                    <span className="text-text text-right font-bold capitalize">Transaction</span>
                  </div>
                </div>

                <div className="pt-2 max-w-sm mx-auto">
                  <Link href="/dashboard">
                    <Button
                      variant="purple"
                      fullWidth
                      className="h-14 font-bold tracking-widest text-xs uppercase shadow-glow"
                    >
                      <span className="flex items-center gap-2 justify-center">
                        <span>Launch Workspace</span>
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
            )}

          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 h-12 flex items-center justify-between px-6 md:px-10 border-t border-white/5 bg-bg-1/40 z-20 text-[10px] text-muted">
        <span>© 2026 WellFinanced · Secured by Neural Encryption</span>
        <div className="flex gap-4">
          <Link href="/privacy" className="font-semibold uppercase tracking-wider hover:text-primary-cyan transition-colors">Privacy</Link>
          <Link href="/terms" className="font-semibold uppercase tracking-wider hover:text-primary-cyan transition-colors">Terms</Link>
          <Link href="/security" className="font-semibold uppercase tracking-wider hover:text-primary-cyan transition-colors">Security</Link>
        </div>
      </footer>
    </div>
  );
}

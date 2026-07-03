'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Percent, 
  Check,
  Zap,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';
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
  linkProvider: z.string().min(1, 'Please select a gateway provider'),
});

type WorkspaceFormValues = z.infer<typeof workspaceSchema>;
type PreferencesFormValues = z.infer<typeof preferencesSchema>;

export default function OnboardingPage() {
  const [step, setStep] = useState<2 | 3 | 4>(2);
  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form step data persistence
  const [savedWorkspace, setSavedWorkspace] = useState<WorkspaceFormValues>({
    currency: 'USD',
    monthlyTarget: '10000',
    industry: 'engineering',
  });

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

  const getCurrencySymbol = (code: string) => {
    if (code === 'EUR') return '€';
    if (code === 'GBP') return '£';
    return '$';
  };

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
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col font-sans text-white bg-background">
      {/* Decorative Ambient Background Orbs */}
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

      {/* Onboarding Wizard Form Body */}
      <main className="grow flex items-center justify-center px-6 pt-24 pb-20 z-10 relative">
        <div className="w-full max-w-[500px] bg-surface border border-white/5 rounded-card backdrop-blur-xl shadow-neon p-6 sm:p-10">
          
          {/* Steps Progress Indicator */}
          {step < 4 && (
            <div className="flex items-center gap-2 mb-6 select-none">
              <div className="step-seg flex-1 h-[3px] rounded-full bg-gradient-to-r from-secondary to-cyan shadow-[0_0_10px_rgba(124,58,237,0.6)]" />
              <div className={`step-seg flex-1 h-[3px] rounded-full transition-all duration-250 ${step >= 3 ? 'bg-gradient-to-r from-secondary to-cyan shadow-[0_0_10px_rgba(124,58,237,0.6)]' : 'bg-white/10'}`} />
              <div className="step-seg flex-1 h-[3px] rounded-full bg-white/10" />
              <span className="text-[10px] font-bold text-muted uppercase tracking-widest whitespace-nowrap ml-2">
                Step {step} / 3
              </span>
            </div>
          )}

          {/* STEP 2: Workspace Config */}
          {step === 2 && (
            <form onSubmit={handleWorkspaceSubmit(onWorkspaceNext)} className="space-y-6">
              <div className="select-none">
                <h1 className="text-2xl font-extrabold tracking-tight mb-1 text-text">Workspace Setup</h1>
                <p className="text-xs text-muted">
                  Set up your primary active currency and revenue projections.
                </p>
              </div>

              <div className="space-y-5">
                {/* Currency Picker */}
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-muted uppercase tracking-wider select-none px-1">
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
                        className={`flex items-center justify-center h-14 rounded-input border transition-all duration-200 cursor-pointer select-none ${
                          savedWorkspace.currency === item.code
                            ? 'bg-primary/10 border-primary text-text shadow-[0_0_15px_rgba(79,70,229,0.2)] font-bold'
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
                        <span className="text-xs font-semibold">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Monthly target revenue input */}
                <Input
                  id="monthlyTarget"
                  type="text"
                  label="Monthly Target Revenue"
                  placeholder="10000"
                  disabled={isLoading}
                  leftIcon={<span className="text-sm font-bold text-muted">{getCurrencySymbol(savedWorkspace.currency)}</span>}
                  error={workspaceErrors.monthlyTarget?.message}
                  {...registerWorkspace('monthlyTarget')}
                />

                {/* Category Selection Dropdown */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="industry" className="text-[11px] font-bold text-muted uppercase tracking-wider select-none px-1">
                    Workspace Category
                  </label>
                  <div className="relative">
                    <select
                      id="industry"
                      className="w-full h-[58px] bg-white/8 backdrop-blur-[20px] border border-white/10 rounded-input px-5 text-sm text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all duration-200 appearance-none cursor-pointer"
                      {...registerWorkspace('industry')}
                    >
                      <option value="engineering" className="bg-[#09152e] text-white">Software Engineering / IT</option>
                      <option value="design" className="bg-[#09152e] text-white">Digital Design & Creative</option>
                      <option value="marketing" className="bg-[#09152e] text-white">Marketing & Copywriting</option>
                      <option value="consulting" className="bg-[#09152e] text-white">Business Consulting</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
                      ▼
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  className="group font-bold text-bg-1 tracking-wider uppercase"
                >
                  <span>Continue Setup</span>
                  <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </Button>
              </div>
            </form>
          )}

          {/* STEP 3: Tax Preferences & Bank Link */}
          {step === 3 && (
            <form onSubmit={handlePrefSubmit(onPreferencesSubmit)} className="space-y-6">
              <div className="select-none">
                <h1 className="text-2xl font-extrabold tracking-tight mb-1 text-text">Preferences & Assets</h1>
                <p className="text-xs text-muted">
                  Configure automated tax set-asides and link financial assets.
                </p>
              </div>

              <div className="space-y-5">
                {/* Tax Rate Input */}
                <Input
                  id="taxRate"
                  type="text"
                  label="Estimated Tax Rate (%)"
                  placeholder="25"
                  disabled={isLoading}
                  leftIcon={<Percent className="w-4 h-4 text-muted" />}
                  error={prefErrors.taxRate?.message}
                  {...registerPref('taxRate')}
                />

                {/* Reserve Frequency */}
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-muted uppercase tracking-wider select-none px-1">
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
                        className={`flex flex-col items-center justify-center p-3 h-14 rounded-input border transition-all duration-200 cursor-pointer text-center select-none ${
                          selectedFrequency === item.value
                            ? 'bg-secondary/10 border-secondary text-text shadow-[0_0_15px_rgba(124,58,237,0.2)] font-bold'
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
                        <span className="text-xs font-semibold leading-tight">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Bank Integration Gateway Options */}
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-muted uppercase tracking-wider select-none px-1">
                    Link Bank Ledger
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'plaid', label: 'Plaid Link', desc: 'Secure integration' },
                      { id: 'manual', label: 'Manual Entry', desc: 'Configure manually' },
                    ].map((prov) => (
                      <label
                        key={prov.id}
                        className={`flex flex-col items-start p-4 rounded-input border transition-all duration-200 cursor-pointer select-none ${
                          selectedProvider === prov.id
                            ? 'bg-primary/10 border-primary text-text shadow-[0_0_15px_rgba(79,70,229,0.2)] font-bold'
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
                            <Check className="w-4 h-4 text-primary shrink-0" />
                          )}
                        </div>
                        <span className="text-[10px] text-muted text-left leading-normal">{prov.desc}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <Button
                  type="button"
                  variant="secondary"
                  className="col-span-1 h-14 border border-white/5"
                  disabled={isLoading}
                  onClick={() => setStep(2)}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  <span>Back</span>
                </Button>

                <Button
                  type="submit"
                  variant="primary"
                  className="col-span-2 h-14 font-bold text-bg-1 tracking-wider uppercase"
                  disabled={isLoading}
                  isLoading={isLoading}
                >
                  <span>Activate Node</span>
                  <Zap className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          )}

          {/* STEP 4: Success View */}
          {step === 4 && submitSuccess && (
            <div className="space-y-6 text-center py-4 animate-scale-in">
              <div className="w-16 h-16 rounded-full bg-success/10 border border-success/30 flex items-center justify-center mx-auto shadow-glow">
                <CheckCircle2 className="w-8 h-8 text-mint" />
              </div>

              <div className="space-y-1 select-none">
                <h1 className="text-2xl font-extrabold tracking-tight text-text">Activation Ready</h1>
                <p className="text-xs text-muted max-w-xs mx-auto leading-relaxed">
                  Your AI workspace parameters are configured and active.
                </p>
              </div>

              {/* Manifest Summary Box */}
              <div className="p-5 rounded-card bg-white/5 border border-white/5 text-left space-y-3 max-w-sm mx-auto backdrop-blur-md select-none">
                <div className="text-[9px] font-bold text-muted uppercase tracking-widest border-b border-white/5 pb-2">
                  WORKSPACE MANIFEST
                </div>
                <div className="grid grid-cols-2 gap-y-2 text-xs font-semibold">
                  <span className="text-muted">Trading Currency:</span>
                  <span className="text-text text-right font-bold">{savedWorkspace.currency}</span>

                  <span className="text-muted">Target Income:</span>
                  <span className="text-text text-right font-bold">
                    {getCurrencySymbol(savedWorkspace.currency)}
                    {Number(savedWorkspace.monthlyTarget).toLocaleString()}/mo
                  </span>

                  <span className="text-muted">Estimated Tax:</span>
                  <span className="text-pink text-right font-bold">25%</span>

                  <span className="text-muted">Reserve Period:</span>
                  <span className="text-text text-right font-bold capitalize">Transaction</span>
                </div>
              </div>

              <div className="pt-2 max-w-sm mx-auto">
                <Link href="/dashboard" className="w-full">
                  <Button variant="primary" fullWidth className="group font-bold text-bg-1 tracking-wider uppercase">
                    <span>Launch Workspace</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </Button>
                </Link>
              </div>
            </div>
          )}

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

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Percent, 
  Check,
  Zap,
  ArrowLeft,
  CheckCircle2,
  Rocket,
  TrendingUp,
  ShieldCheck,
  BarChart3,
  Activity,
  Brain
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
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
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
    watch: watchWorkspace,
    formState: { errors: workspaceErrors },
  } = useForm<WorkspaceFormValues>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: savedWorkspace,
    mode: 'onTouched',
  });

  const selectedCurrency = watchWorkspace('currency');

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
      <main className={`grow flex flex-col px-6 pt-24 pb-20 z-10 relative ${step > 1 ? 'items-center justify-center' : ''}`}>
        
        {/* STEP 1: Welcome / Marketing Hero */}
        {step === 1 && (
          <div className="w-full max-w-7xl mx-auto flex flex-col gap-24 animate-fade-in">
            {/* Hero Section */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col space-y-8 text-center lg:text-left">
                <div className="inline-flex items-center self-center lg:self-start gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
                  <span className="flex h-2 w-2 rounded-full bg-cyan animate-pulse"></span>
                  <span className="text-xs font-bold uppercase tracking-widest text-cyan">Intelligence v2.4 Now Live</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight text-text">
                  Welcome to your <br />
                  <span className="bg-gradient-to-r from-primary via-secondary to-pink bg-clip-text text-transparent">Financial Future</span>
                </h1>
                <p className="text-lg text-muted max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  The ultimate AI co-pilot for modern freelancers. Automate your cashflow, predict taxes, and optimize your income with precision engineering.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="font-bold tracking-wider uppercase"
                    onClick={() => setStep(2)}
                  >
                    <span>Initialize AI Partner</span>
                    <Rocket className="w-5 h-5 ml-2" />
                  </Button>
                  <Button variant="outline" size="lg" className="font-bold tracking-wider uppercase">
                    View Case Studies
                  </Button>
                </div>
                <div className="pt-8 flex flex-wrap gap-8 justify-center lg:justify-start opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                  <span className="font-mono text-sm uppercase tracking-tighter">Powered by GPT-X</span>
                  <span className="font-mono text-sm uppercase tracking-tighter">SEC Compliant</span>
                  <span className="font-mono text-sm uppercase tracking-tighter">Zero Trust Security</span>
                </div>
              </div>

              {/* AI Head Graphic / Visual */}
              <div className="relative flex justify-center items-center">
                <div className="relative w-full max-w-[500px] aspect-square flex justify-center items-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-[80px] animate-pulse"></div>
                  <div className="relative z-10 w-full h-full animate-[float_6s_ease-in-out_infinite]">
                    <div className="w-full h-full rounded-full border-2 border-white/5 p-4">
                      <div className="w-full h-full rounded-full border border-primary/20 overflow-hidden relative bg-surface backdrop-blur-xl shadow-neon group">
                        <Image 
                          className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-[2000ms]" 
                          alt="AI Core" 
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHKaV64uDFCUd39adHTGiEzuV_oU2zuSCOea4OFXzqDl4nOmT0fDm3IfK76Tb0imHwbgMYdiIE2O-AtwYC5_wd-lIfMB6O7k7sCuu4mfPKIRcA3oadWRDoNVbVQbw_WRRGHOujd5r4N-BxUgeJo384VMqNuSRQc4td3xlCwvV9IbtRarUkSCb7zFHmztGy7MTftTiwumyYuDK26t9zt08SEcxLvJ23TZnza1GQM6mW1MsBwaDn-zozrVUSrBy7Wi54TDyxCMQ9drw"
                          width={500}
                          height={500}
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#060B1A] via-transparent to-transparent opacity-60"></div>
                      </div>
                    </div>
                  </div>
                  {/* Floating Data Points */}
                  <div className="absolute top-[10%] right-[0%] bg-surface border border-white/10 p-4 rounded-2xl backdrop-blur-xl shadow-neon animate-[bounce_4s_infinite]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-mint/10 flex items-center justify-center text-mint">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] text-muted uppercase font-bold tracking-widest">Growth</div>
                        <div className="text-sm font-mono font-bold text-text">+24.5%</div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-[20%] left-[-10%] bg-surface border border-white/10 p-4 rounded-2xl backdrop-blur-xl shadow-neon animate-[bounce_5s_infinite]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-cyan/10 flex items-center justify-center text-cyan">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] text-muted uppercase font-bold tracking-widest">Confidence</div>
                        <div className="text-sm font-mono font-bold text-text">99.8%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Bento Value Props */}
            <section className="text-center pt-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-text">Master Your <span className="text-cyan">Capital Flow</span></h2>
              <p className="text-muted max-w-2xl mx-auto mb-16">Autonomous financial intelligence designed specifically for the unique volatility of freelance careers.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                {/* Predictive Income */}
                <div className="bg-surface border border-white/10 p-8 rounded-card backdrop-blur-xl shadow-[inset_0_0_20px_rgba(46,91,255,0.05)] hover:bg-white/5 transition-all duration-300 flex flex-col h-full">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <BarChart3 className="text-primary w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-text">Predictive Income</h3>
                  <p className="text-muted leading-relaxed mb-8 flex-grow">Our proprietary ML models analyze your work history to forecast next month&apos;s earnings with eerie accuracy. Never wonder what your next check looks like.</p>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-2/3 shadow-[0_0_10px_#4F46E5]"></div>
                  </div>
                </div>
                
                {/* Cashflow Smoothing */}
                <div className="bg-surface border border-white/10 p-8 rounded-card backdrop-blur-xl shadow-[inset_0_0_20px_rgba(46,91,255,0.05)] hover:bg-white/5 transition-all duration-300 flex flex-col h-full md:translate-y-8">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6">
                    <Activity className="text-secondary w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-text">Cashflow Smoothing</h3>
                  <p className="text-muted leading-relaxed mb-8 flex-grow">Eliminate the &quot;feast and famine&quot; cycle. Our AI reallocates surplus during peak months to ensure a consistent, stress-free salary all year round.</p>
                  <div className="flex gap-2">
                    <div className="flex-1 h-12 bg-white/5 rounded-lg"></div>
                    <div className="flex-1 h-12 bg-white/5 rounded-lg"></div>
                    <div className="flex-1 h-12 bg-white/5 rounded-lg"></div>
                  </div>
                </div>

                {/* AI-Powered Prioritization */}
                <div className="bg-surface border border-white/10 p-8 rounded-card backdrop-blur-xl shadow-[inset_0_0_20px_rgba(46,91,255,0.05)] hover:bg-white/5 transition-all duration-300 flex flex-col h-full">
                  <div className="w-14 h-14 rounded-2xl bg-pink/10 flex items-center justify-center mb-6">
                    <Brain className="text-pink w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-text">AI Prioritization</h3>
                  <p className="text-muted leading-relaxed mb-8 flex-grow">Automated bill pay and tax withholding that adapts in real-time. We prioritize high-interest debt and tax compliance so you don&apos;t have to.</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-2 bg-pink/40 rounded-full"></div>
                    <div className="h-2 bg-pink/20 rounded-full"></div>
                  </div>
                </div>
              </div>
            </section>

            {/* Stats Section */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center pt-16 border-t border-white/5 pb-8">
              <div>
                <div className="text-4xl md:text-5xl font-mono font-bold bg-gradient-to-r from-primary to-cyan bg-clip-text text-transparent mb-2">$24M+</div>
                <div className="text-xs font-bold text-muted uppercase tracking-widest">Managed Annually</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-mono font-bold bg-gradient-to-r from-primary to-cyan bg-clip-text text-transparent mb-2">12.4k</div>
                <div className="text-xs font-bold text-muted uppercase tracking-widest">Active Freelancers</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-mono font-bold bg-gradient-to-r from-primary to-cyan bg-clip-text text-transparent mb-2">40%</div>
                <div className="text-xs font-bold text-muted uppercase tracking-widest">Avg. Savings Increase</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-mono font-bold bg-gradient-to-r from-primary to-cyan bg-clip-text text-transparent mb-2">99.9%</div>
                <div className="text-xs font-bold text-muted uppercase tracking-widest">Uptime Precision</div>
              </div>
            </section>
          </div>
        )}

        {step > 1 && (
          <div className="w-full max-w-[500px] bg-surface border border-white/5 rounded-card backdrop-blur-xl shadow-neon p-6 sm:p-10 animate-scale-in">
          
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
                          selectedCurrency === item.code
                            ? 'bg-primary/10 border-primary text-text shadow-[0_0_15px_rgba(79,70,229,0.2)] font-bold'
                            : 'bg-white/5 border-white/5 text-muted hover:border-white/15'
                        }`}
                      >
                        <input
                          type="radio"
                          value={item.code}
                          className="sr-only"
                          {...registerWorkspace('currency')}
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
                  leftIcon={<span className="text-sm font-bold text-muted">{getCurrencySymbol(selectedCurrency)}</span>}
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
        )}
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

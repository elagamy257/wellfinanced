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
    formState: { errors: workspaceErrors, isSubmitting: isWorkspaceSubmitting },
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

        .btn-secondary-glass {
          height: 56px;
          border-radius: 18px;
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
        .btn-secondary-glass:hover:not(:disabled) {
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

        {/* Onboarding Wizard Form Body */}
        <main className="grow flex flex-col justify-center px-6 py-8 z-10 relative">
          <div className="card-panel">
            
            {/* Steps Progress Indicator */}
            {step < 4 && (
              <div className="flex items-center gap-2 mb-6 select-none">
                <div className="step-seg active" />
                <div className={`step-seg ${step >= 3 ? 'active' : ''}`} />
                <div className="step-seg" />
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest whitespace-nowrap ml-2">
                  Step {step} / 3
                </span>
              </div>
            )}

            {/* STEP 2: Workspace Config */}
            {step === 2 && (
              <form onSubmit={handleWorkspaceSubmit(onWorkspaceNext)} className="space-y-6">
                <div>
                  <h1 className="text-2xl font-extrabold tracking-tight mb-1">Workspace Setup</h1>
                  <p className="text-xs text-white/65">
                    Set up your primary active currency and revenue projections.
                  </p>
                </div>

                <div className="space-y-5">
                  {/* Currency Picker */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-[#06b6d4] uppercase tracking-wider px-1">
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
                          className={`flex items-center justify-center h-14 rounded-[18px] border transition-all duration-200 cursor-pointer ${
                            savedWorkspace.currency === item.code
                              ? 'bg-linear-to-br from-[#7c3aed]/10 to-[#06b6d4]/10 border-[#06b6d4] text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                              : 'bg-white/5 border-white/5 text-white/40 hover:border-white/15'
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

                  {/* Monthly revenue target input with floating label */}
                  <div className="field">
                    <div className="inp-wrap">
                      <span className="field-icon">🪙</span>
                      <input
                        id="monthlyTarget"
                        type="text"
                        placeholder=" "
                        disabled={isWorkspaceSubmitting || submitSuccess}
                        className={`inp ${workspaceErrors.monthlyTarget ? 'border-red-500/40' : ''}`}
                        {...registerWorkspace('monthlyTarget')}
                      />
                      <label className="field-label" htmlFor="monthlyTarget">Monthly Target Revenue</label>
                    </div>
                    {workspaceErrors.monthlyTarget && (
                      <span className="text-xs text-red-400 px-1 mt-1 block">{workspaceErrors.monthlyTarget.message}</span>
                    )}
                  </div>

                  {/* Category Selection Dropdown */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="industry" className="text-[10px] font-bold text-[#06b6d4] uppercase tracking-wider px-1">
                      Workspace Category
                    </label>
                    <div className="relative">
                      <select
                        id="industry"
                        className="w-full h-[58px] bg-white/5 border border-white/10 rounded-[18px] px-5 text-sm text-white outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 transition-all duration-200 appearance-none cursor-pointer"
                        {...registerWorkspace('industry')}
                      >
                        <option value="engineering" className="bg-[#09152e] text-white">Software Engineering / IT</option>
                        <option value="design" className="bg-[#09152e] text-white">Digital Design & Creative</option>
                        <option value="marketing" className="bg-[#09152e] text-white">Marketing & Copywriting</option>
                        <option value="consulting" className="bg-[#09152e] text-white">Business Consulting</option>
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                        ▼
                      </div>
                    </div>
                    {workspaceErrors.industry && (
                      <span className="text-xs text-red-400 px-1 mt-1 block">{workspaceErrors.industry.message}</span>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="btn-primary-shiny cursor-pointer"
                  >
                    <span>Continue Setup</span>
                    <span className="btn-arrow">→</span>
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: Tax Preferences & Bank Link */}
            {step === 3 && (
              <form onSubmit={handlePrefSubmit(onPreferencesSubmit)} className="space-y-6">
                <div>
                  <h1 className="text-2xl font-extrabold tracking-tight mb-1">Preferences & Assets</h1>
                  <p className="text-xs text-white/65">
                    Configure automated tax set-asides and link financial assets.
                  </p>
                </div>

                <div className="space-y-5">
                  {/* Tax Rate Input with Floating Label */}
                  <div className="field">
                    <div className="inp-wrap">
                      <span className="field-icon">
                        <Percent className="w-4 h-4 text-white/40 shrink-0" />
                      </span>
                      <input
                        id="taxRate"
                        type="text"
                        placeholder=" "
                        disabled={isLoading}
                        className={`inp ${prefErrors.taxRate ? 'border-red-500/40' : ''}`}
                        {...registerPref('taxRate')}
                      />
                      <label className="field-label" htmlFor="taxRate">Estimated Tax Rate (%)</label>
                    </div>
                    {prefErrors.taxRate && (
                      <span className="text-xs text-red-400 px-1 mt-1 block">{prefErrors.taxRate.message}</span>
                    )}
                  </div>

                  {/* Reserve Frequency */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-[#06b6d4] uppercase tracking-wider px-1">
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
                          className={`flex flex-col items-center justify-center p-3 rounded-[18px] border transition-all duration-200 cursor-pointer text-center ${
                            selectedFrequency === item.value
                              ? 'bg-linear-to-br from-[#7c3aed]/10 to-[#06b6d4]/10 border-[#7c3aed] text-white shadow-[0_0_15px_rgba(124,58,237,0.2)]'
                              : 'bg-white/5 border-white/5 text-white/40 hover:border-white/15'
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

                  {/* Bank Integration Gateway Options */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-[#06b6d4] uppercase tracking-wider px-1">
                      Link Bank Ledger
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'plaid', label: 'Plaid Link', desc: 'Secure integration' },
                        { id: 'manual', label: 'Manual Entry', desc: 'Configure manually' },
                      ].map((prov) => (
                        <label
                          key={prov.id}
                          className={`flex flex-col items-start p-4 rounded-[18px] border transition-all duration-200 cursor-pointer ${
                            selectedProvider === prov.id
                              ? 'bg-linear-to-br from-[#7c3aed]/10 to-[#06b6d4]/10 border-[#06b6d4] text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                              : 'bg-white/5 border-white/5 text-white/40 hover:border-white/15'
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
                              <Check className="w-4 h-4 text-[#06b6d4] shrink-0" />
                            )}
                          </div>
                          <span className="text-[10px] text-white/40 text-left leading-normal">{prov.desc}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={isLoading}
                    className="btn-secondary-glass col-span-1 disabled:opacity-50 cursor-pointer"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <ArrowLeft className="w-4 h-4 shrink-0" />
                      <span>Back</span>
                    </span>
                  </button>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary-shiny col-span-2 disabled:opacity-50 mb-0 cursor-pointer"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-[#0A1A0A] border-t-transparent rounded-full animate-spin" />
                        ACTIVATING...
                      </span>
                    ) : (
                      <>
                        <span>Activate Node</span>
                        <Zap className="w-4 h-4 shrink-0" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 4: Success View */}
            {step === 4 && submitSuccess && (
              <div className="space-y-6 text-center py-4 animate-scale-in">
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-[#7CFFB2]/30 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(124,255,178,0.2)]">
                  <CheckCircle2 className="w-8 h-8 text-[#7CFFB2]" />
                </div>

                <div className="space-y-1">
                  <h1 className="text-2xl font-extrabold tracking-tight">Activation Ready</h1>
                  <p className="text-xs text-white/40 max-w-xs mx-auto leading-relaxed">
                    Your AI workspace parameters are configured and active.
                  </p>
                </div>

                {/* Manifest Summary Box */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-left space-y-2.5 max-w-sm mx-auto backdrop-blur-sm">
                  <div className="text-[9px] font-bold text-white/40 uppercase tracking-widest border-b border-white/5 pb-1.5">
                    WORKSPACE MANIFEST
                  </div>
                  <div className="grid grid-cols-2 gap-y-2 text-xs font-semibold">
                    <span className="text-white/40">Trading Currency:</span>
                    <span className="text-white text-right font-bold">{savedWorkspace.currency}</span>

                    <span className="text-white/40">Target Income:</span>
                    <span className="text-white text-right font-bold">
                      {savedWorkspace.currency === 'USD' ? '$' : savedWorkspace.currency === 'EUR' ? '€' : '£'}
                      {Number(savedWorkspace.monthlyTarget).toLocaleString()}/mo
                    </span>

                    <span className="text-white/40">Estimated Tax:</span>
                    <span className="text-pink-400 text-right font-bold">25%</span>

                    <span className="text-white/40">Reserve Period:</span>
                    <span className="text-white text-right font-bold capitalize">Transaction</span>
                  </div>
                </div>

                <div className="pt-2 max-w-sm mx-auto">
                  <Link href="/dashboard">
                    <button className="btn-primary-shiny shadow-[0_0_20px_rgba(124,255,178,0.3)] cursor-pointer">
                      <span>Launch Workspace</span>
                      <span className="btn-arrow">→</span>
                    </button>
                  </Link>
                </div>
              </div>
            )}

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

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-between overflow-hidden relative">
      {/* Background Decorative Gradients */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-secondary/10 blur-[120px] pointer-events-none" />

      {/* Header Navbar */}
      <header className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-bold text-background text-lg">
            W
          </div>
          <span className="font-extrabold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            WellFinanced
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Log In
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="primary" size="sm">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20 flex-1 flex flex-col justify-center items-center text-center relative z-10">
        {/* Tagline */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-6 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI-Powered Financial Stability Platform</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-extrabold text-text tracking-tight max-w-4xl mb-6 leading-tight">
          Irregular Income. <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-primary via-secondary to-success bg-clip-text text-transparent">
            Regular Peace of Mind.
          </span>
        </h1>

        {/* Hero Description */}
        <p className="text-base sm:text-lg text-muted max-w-2xl mb-8 leading-relaxed">
          The smart financial workspace engineered specifically for freelancers, creators, solopreneurs, and independent builders.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md">
          <Link href="/register" className="w-full sm:w-auto">
            <Button variant="primary" size="lg" className="w-full sm:w-auto group">
              Start Your Journey
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Explore Demo Workspace
            </Button>
          </Link>
        </div>

        {/* Structural Info Pillars (SOLID placeholders, no fake data, just core values) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-24">
          <div className="p-6 rounded-xl border border-border bg-surface/50 text-left">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-text mb-2">Volatility Management</h3>
            <p className="text-xs text-muted leading-relaxed">
              Calculate baseline stability index metrics to navigate irregular income flow pipelines.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-border bg-surface/50 text-left">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-text mb-2">Predictive AI Modeling</h3>
            <p className="text-xs text-muted leading-relaxed">
              Forecast cash flow variations and automate tax allocations based on irregular payment patterns.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-border bg-surface/50 text-left">
            <div className="w-10 h-10 rounded-lg bg-success/10 text-success flex items-center justify-center mb-4">
              <div className="w-5 h-5 flex items-center justify-center font-bold">T</div>
            </div>
            <h3 className="text-base font-bold text-text mb-2">Tax Optimization</h3>
            <p className="text-xs text-muted leading-relaxed">
              Allocate and optimize estimated quarterly tax obligations dynamically.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <span>&copy; {new Date().getFullYear()} WellFinanced. All rights reserved.</span>
          <div className="flex gap-4">
            <span className="hover:text-text cursor-pointer">Security Protocol</span>
            <span className="hover:text-text cursor-pointer">Architectural Blueprint</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

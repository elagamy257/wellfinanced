'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Network, 
  Search, 
  Menu, 
  X, 
  TrendingUp, 
  Shield, 
  LineChart, 
  Layers, 
  Cpu, 
  Bot 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { value: '$24M+', label: 'Managed Annually' },
    { value: '12.4k', label: 'Active Freelancers' },
    { value: '40%', label: 'Avg. Savings Increase' },
    { value: '99.9%', label: 'Uptime Precision' },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden flex flex-col font-sans text-white bg-[#020617] bg-[radial-gradient(at_0%_0%,rgba(99,102,241,0.12)_0px,transparent_50%),radial-gradient(at_100%_100%,rgba(168,85,247,0.08)_0px,transparent_50%),radial-gradient(at_50%_50%,rgba(2,6,23,1)_0px,transparent_80%)]">
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-20 flex items-center justify-between px-6 lg:px-12 border-b border-white/5 backdrop-blur-md bg-[#020617]/70 z-50 select-none">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8.5 h-8.5 rounded-lg bg-indigo-600 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.45)]">
            <Network className="w-5 h-5 text-white" />
          </div>
          <span className="text-base font-extrabold tracking-tight text-white">
            FinAI <span className="text-slate-400 font-medium">Intelligence</span>
          </span>
        </Link>

        {/* Center Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link href="#" className="hover:text-white transition-colors">Home</Link>
          <Link href="#" className="hover:text-white transition-colors">Features</Link>
          <Link href="#" className="hover:text-white transition-colors">Enterprise</Link>
          <Link href="#" className="hover:text-white transition-colors">Resources</Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4.5">
          {/* Search Trigger */}
          <div className="relative flex items-center">
            <AnimatePresence>
              {searchOpen && (
                <motion.input
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 180, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  type="text"
                  placeholder="Search network..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-full py-1.5 pl-4 pr-8 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 mr-2"
                />
              )}
            </AnimatePresence>
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-slate-400 hover:text-white transition-colors p-1"
              aria-label="Search"
            >
              <Search className="w-4.5 h-4.5" />
            </button>
          </div>

          <Link href="/login" className="hidden sm:inline-block text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Log In
          </Link>

          <Link href="/register">
            <Button className="bg-linear-to-r from-indigo-600 to-violet-600 hover:brightness-110 text-white font-semibold h-9.5 px-5 rounded-lg flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(99,102,241,0.3)] border-0 text-xs tracking-wider">
              Get Started
            </Button>
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-400 hover:text-white transition-colors p-1"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Slide-down */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-0 right-0 bg-[#020617]/95 border-b border-white/5 backdrop-blur-lg flex flex-col p-6 gap-4 z-40 select-none md:hidden"
          >
            <Link href="#" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-slate-300 hover:text-white transition-colors py-2">Home</Link>
            <Link href="#" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-slate-300 hover:text-white transition-colors py-2">Features</Link>
            <Link href="#" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-slate-300 hover:text-white transition-colors py-2">Enterprise</Link>
            <Link href="#" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-slate-300 hover:text-white transition-colors py-2">Resources</Link>
            <hr className="border-white/5 my-2" />
            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-slate-300 hover:text-white transition-colors py-2">
              Log In
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Layout */}
      <main className="grow flex-1 w-full pt-32 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col gap-28 pb-20 relative z-10">
        
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Hero Left Content */}
          <div className="flex flex-col items-start text-left max-w-xl">
            {/* Live Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-white/5 text-[10px] font-bold tracking-widest uppercase text-slate-300 mb-6 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              INTELLIGENCE V2.4 NOW LIVE
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6.5xl font-black leading-[1.1] tracking-tight mb-6 text-white select-none">
              Welcome to your<br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 filter drop-shadow-[0_0_20px_rgba(168,85,247,0.15)]">
                Financial Future
              </span>
            </h1>

            {/* Description */}
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8 font-light">
              The ultimate AI co-pilot for modern freelancers. Automate your cashflow, predict taxes, and optimize your income with precision engineering.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 mb-10 w-full sm:w-auto">
              <Link href="/register" className="w-full sm:w-auto">
                <Button className="w-full bg-linear-to-r from-indigo-600 to-violet-600 hover:brightness-110 text-white font-bold h-12 px-7 rounded-xl flex items-center justify-center gap-2 border-0 shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all active:scale-[0.98] select-none text-xs tracking-wider">
                  Initialize AI Partner 🚀
                </Button>
              </Link>
              <Link href="#" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full text-slate-300 border-white/10 hover:bg-white/5 h-12 px-7 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] select-none text-xs tracking-wider">
                  View Case Studies
                </Button>
              </Link>
            </div>

            {/* Sub-partners */}
            <div className="flex items-center gap-6 text-[9px] font-bold text-slate-500 uppercase tracking-widest select-none">
              <span>Powered by GPT-4</span>
              <span>•</span>
              <span>SOC2 Compliant</span>
              <span>•</span>
              <span>Zero Trust Security</span>
            </div>
          </div>

          {/* Hero Right Visual Column */}
          <div className="relative w-full aspect-square max-w-[480px] mx-auto flex items-center justify-center">
            {/* Rotating background orbit circles */}
            <div className="absolute inset-0 rounded-full border border-indigo-500/10 animate-spin [animation-duration:40s]" />
            <div className="absolute inset-8 rounded-full border border-purple-500/15 animate-spin [animation-duration:25s] [animation-direction:reverse]" />
            <div className="absolute inset-16 rounded-full border border-cyan-500/5" />

            {/* Outer glowing halo */}
            <div className="absolute w-[80%] h-[80%] bg-indigo-500/10 rounded-full blur-[80px] -z-10" />

            {/* Cybernetic Head Image */}
            <div className="relative w-[85%] h-[85%] rounded-full overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(99,102,241,0.15)] bg-slate-950/20 backdrop-blur-sm select-none">
              <Image
                src="/cybernetic_head.png"
                alt="Cybernetic Intelligence Node"
                fill
                className="object-cover scale-105 opacity-90 transition-transform duration-700 hover:scale-110"
                priority
              />
            </div>

            {/* Floating Growth Card Overlay (Top Right) */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute -top-4 -right-4 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-2xl flex items-center gap-3 select-none"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Growth</div>
                <div className="text-sm font-extrabold text-emerald-400">+24.5%</div>
              </div>
            </motion.div>

            {/* Floating Connected Card Overlay (Bottom Left) */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -bottom-4 -left-4 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-2xl flex items-center gap-3 select-none"
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Security</div>
                <div className="text-xs font-extrabold text-indigo-400">CONNECTED SECURELY</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="flex flex-col items-center gap-16 select-none">
          {/* Header */}
          <div className="text-center max-w-xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-white">
              Master Your <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400">Capital Flow</span>
            </h2>
            <p className="text-slate-400 text-sm font-light leading-relaxed">
              Autonomous financial intelligence designed specifically for the unique volatility of freelance careers.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {/* Predictive Income Card */}
            <div className="bg-[#0f172a]/30 border border-white/5 rounded-2xl p-8 flex flex-col justify-between hover:bg-[#0f172a]/50 hover:border-indigo-500/20 transition-all duration-300 shadow-lg">
              <div>
                <div className="w-11 h-11 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6">
                  <LineChart className="w-5.5 h-5.5" />
                </div>
                <h3 className="text-base font-extrabold mb-3 text-white">Predictive Income</h3>
                <p className="text-slate-400 text-xs leading-relaxed font-light">
                  Our proprietary ML models analyze your work history to forecast next month&apos;s earnings with eerie accuracy. Never wonder what your next check looks like.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/5">
                <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">
                  <span>Confidence Score</span>
                  <span className="text-[#818cf8]">96.4%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-[96.4%] h-full bg-linear-to-r from-indigo-500 to-violet-500 rounded-full" />
                </div>
              </div>
            </div>

            {/* Cashflow Smoothing Card */}
            <div className="bg-[#0f172a]/30 border border-white/5 rounded-2xl p-8 flex flex-col justify-between hover:bg-[#0f172a]/50 hover:border-indigo-500/20 transition-all duration-300 shadow-lg">
              <div>
                <div className="w-11 h-11 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6">
                  <Layers className="w-5.5 h-5.5" />
                </div>
                <h3 className="text-base font-extrabold mb-3 text-white">Cashflow Smoothing</h3>
                <p className="text-slate-400 text-xs leading-relaxed font-light">
                  Eliminate the &quot;feast and famine&quot; cycle. Our AI reallocates surplus during peak months to ensure a consistent, salary-like payout all year round.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2">
                <div className="h-6 px-3 rounded-full bg-slate-800 border border-white/5 text-[9px] font-bold text-slate-400 uppercase flex items-center">Stable</div>
                <div className="h-6 px-3 rounded-full bg-slate-800 border border-white/5 text-[9px] font-bold text-slate-400 uppercase flex items-center">Buffer Active</div>
                <div className="h-6 px-3 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-bold text-indigo-400 uppercase flex items-center">Optimized</div>
              </div>
            </div>

            {/* AI-Powered Prioritization Card */}
            <div className="bg-[#0f172a]/30 border border-white/5 rounded-2xl p-8 flex flex-col justify-between hover:bg-[#0f172a]/50 hover:border-indigo-500/20 transition-all duration-300 shadow-lg">
              <div>
                <div className="w-11 h-11 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 mb-6">
                  <Cpu className="w-5.5 h-5.5" />
                </div>
                <h3 className="text-base font-extrabold mb-3 text-white">AI-Powered Prioritization</h3>
                <p className="text-slate-400 text-xs leading-relaxed font-light">
                  Automated bill pay and tax withholding that adapts in real-time. We prioritize high-interest debt and tax compliance so you don&apos;t have to.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/5 space-y-2">
                <div className="flex justify-between items-center text-[10px] text-slate-400">
                  <span className="font-bold uppercase tracking-wider">Tax Reserve</span>
                  <span className="font-semibold text-emerald-400">30% Allocated</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-[30%] h-full bg-emerald-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-y border-white/5 text-center select-none">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <span className="text-3xl font-extrabold bg-clip-text text-transparent bg-linear-to-b from-white to-slate-400">
                {stat.value}
              </span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </section>

        {/* CTA Card Section */}
        <section className="w-full">
          <div className="relative w-full rounded-3xl bg-[#0c142c]/40 backdrop-blur-xl border border-white/5 p-8 md:p-14 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            {/* Ambient glow inside */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="flex-1 text-left relative z-10 max-w-xl select-none">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
                Ready to evolve your financial strategy?
              </h2>
              <p className="text-slate-400 text-sm md:text-base font-light leading-relaxed">
                Join the next generation of freelancers using AI to build multi-generational wealth.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full md:w-auto shrink-0 select-none">
              <Link href="/register" className="w-full sm:w-auto">
                <Button className="w-full bg-linear-to-r from-indigo-500 to-violet-500 hover:brightness-110 text-white font-bold h-12 px-8 rounded-xl flex items-center justify-center gap-2 border-0">
                  Create Free Account
                </Button>
              </Link>
              <Link href="#" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full text-slate-300 border-white/10 hover:bg-white/5 h-12 px-8 rounded-xl">
                  Talk to an Advisor
                </Button>
              </Link>
            </div>

            {/* Robot Icon Graphic on the Right Background */}
            <div className="absolute right-0 bottom-0 translate-x-1/6 translate-y-1/6 opacity-[0.02] text-white pointer-events-none hidden md:block">
              <Bot className="w-96 h-96" />
            </div>
          </div>
        </section>
      </main>

      {/* Footer Navigation */}
      <footer className="w-full bg-transparent border-t border-white/5 py-12 px-6 lg:px-12 select-none mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
          
          {/* Logo & Description */}
          <div className="flex flex-col items-start gap-4 max-w-xs">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8.5 h-8.5 rounded-lg bg-indigo-600 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.45)]">
                <Network className="w-5 h-5 text-white" />
              </div>
              <span className="text-base font-extrabold tracking-tight text-white">FinAI</span>
            </Link>
            <p className="text-slate-500 text-xs leading-relaxed font-light">
              Empowering the independent workforce with high-fidelity financial intelligence and automated capital management.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-2">
              <Link href="#" className="w-7.5 h-7.5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </Link>
              <Link href="#" className="w-7.5 h-7.5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </Link>
            </div>
          </div>

          {/* Nav Links columns */}
          <div className="grid grid-cols-3 gap-8 md:gap-16">
            <div className="flex flex-col gap-3">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Product</span>
              <Link href="#" className="text-xs text-slate-500 hover:text-white transition-colors font-light">Cashflow Smoothing</Link>
              <Link href="#" className="text-xs text-slate-500 hover:text-white transition-colors font-light">Tax Engine</Link>
              <Link href="#" className="text-xs text-slate-500 hover:text-white transition-colors font-light">Income Prediction</Link>
              <Link href="#" className="text-xs text-slate-500 hover:text-white transition-colors font-light">Smart Invoicing</Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Company</span>
              <Link href="#" className="text-xs text-slate-500 hover:text-white transition-colors font-light">About Us</Link>
              <Link href="#" className="text-xs text-slate-500 hover:text-white transition-colors font-light">Ethics Policy</Link>
              <Link href="#" className="text-xs text-slate-500 hover:text-white transition-colors font-light">Careers</Link>
              <Link href="#" className="text-xs text-slate-500 hover:text-white transition-colors font-light">Press Kit</Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Security</span>
              <Link href="#" className="text-xs text-slate-500 hover:text-white transition-colors font-light">Privacy Center</Link>
              <Link href="#" className="text-xs text-slate-500 hover:text-white transition-colors font-light">Data Encryption</Link>
              <Link href="#" className="text-xs text-slate-500 hover:text-white transition-colors font-light">Compliance</Link>
              <Link href="#" className="text-xs text-slate-500 hover:text-white transition-colors font-light">Terms of Service</Link>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] font-bold text-slate-500 uppercase tracking-widest border-t border-white/5 pt-8 mt-12">
          <span>© 2024 FINAI INTELLIGENCE SYSTEMS. ALL RIGHTS RESERVED.</span>
          <div className="flex gap-6">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />System Status: Operational</span>
            <span>V4.2.0-STABLE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

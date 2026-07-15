'use client';

import React, { useRef, useEffect } from 'react';
import { Card, Badge } from '@/components/ui';
import { Bot, Check, Bookmark, RefreshCw, AlertCircle } from 'lucide-react';
import { Message } from '../types';

interface ChatWindowProps {
  messages: Message[];
  isTyping: boolean;
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  onRetry?: () => void;
}

export function ChatWindow({ 
  messages, 
  isTyping, 
  isLoading, 
  isError, 
  isEmpty,
  onRetry 
}: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isLoading]);

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center h-[450px] relative select-none">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center text-primary shadow-[0_0_20px_rgba(168,85,247,0.2)] mb-4 animate-pulse">
          <Bot className="w-6 h-6" />
        </div>
        <h3 className="text-base font-extrabold text-white tracking-tight">Fintova Co-Pilot</h3>
        <p className="text-xs text-slate-400 max-w-sm mt-1.5 leading-relaxed">
          Ask anything about your business finances. I can analyze liquidity, estimate taxes, and forecast cashflow runway.
        </p>
        
        {isError && (
          <div className="mt-6 max-w-sm p-4 rounded-xl bg-danger/10 border border-danger/15 text-slate-200">
            <div className="flex items-center gap-2 justify-center text-danger font-bold text-xs">
              <AlertCircle className="w-4 h-4" />
              <span>AI Service Unavailable</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
              We encountered a platform connection issue. Please check your credentials or retry.
            </p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="mt-3 mx-auto h-7 px-3 bg-danger/15 hover:bg-danger/20 border border-danger/25 text-[8px] font-black uppercase tracking-widest text-danger rounded-lg transition-all cursor-pointer flex items-center gap-1.5"
              >
                <RefreshCw className="w-2.5 h-2.5" />
                <span>Retry Connection</span>
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6 pr-2 max-h-[500px] overflow-y-auto min-h-[350px]">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center h-[350px]">
          <RefreshCw className="w-8 h-8 text-primary animate-spin mb-3" />
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Synchronizing ledger telemetry...</p>
        </div>
      ) : (
        <>
          {messages.map((msg) => {
            const isAI = msg.sender === 'ai';
            return (
              <div 
                key={msg.id} 
                className={`flex gap-4.5 ${isAI ? 'justify-start' : 'justify-end'}`}
              >
                {/* AI Avatar */}
                {isAI && (
                  <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center text-primary shadow-sm shrink-0 mt-0.5">
                    <Bot className="w-4.5 h-4.5" />
                  </div>
                )}

                {/* Message Box */}
                <div className={`space-y-4 max-w-[85%] md:max-w-[70%] ${!isAI && 'order-1'}`}>
                  <div className={`p-4 rounded-2xl relative ${
                    isAI 
                      ? 'bg-white/5 border border-white/5 text-slate-200' 
                      : 'bg-primary/15 border border-primary/20 text-white'
                  }`}>
                    <p className="text-xs leading-relaxed font-medium">
                      {msg.text}
                    </p>
                    <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest block text-right mt-2 select-none">
                      {msg.timestamp}
                    </span>
                  </div>

                  {/* Nested Inline Stats (CURRENT REVENUE for Intro message) */}
                  {isAI && msg.metrics?.currentRevenue && (
                    <Card className="p-4 bg-white/3 border border-white/5 grid grid-cols-2 gap-4 select-none">
                      <div>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">
                          Current Revenue
                        </span>
                        <span className="text-base font-extrabold text-white mt-1 block">
                          {msg.metrics.currentRevenue}
                        </span>
                      </div>
                      <div>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">
                          Revenue Trend (Live)
                        </span>
                        <Badge variant="mint" className="font-bold text-[8px] tracking-widest uppercase mt-1 px-1.5 py-0 h-4 inline-flex items-center">
                          {msg.metrics.revenueChange}
                        </Badge>
                      </div>
                    </Card>
                  )}

                  {/* Nested Inline Recommendation Card (runway recommendations) */}
                  {isAI && msg.metrics?.postPurchaseBuffer && (
                    <Card className="p-4.5 bg-bg-3/80 border border-primary/25 relative overflow-hidden select-none space-y-4 shadow-neon">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl pointer-events-none" />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">
                            Post-Purchase Buffer
                          </span>
                          <span className="text-sm font-black text-white mt-1 block">
                            {msg.metrics.postPurchaseBuffer}
                          </span>
                        </div>
                        <div>
                          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">
                            Pending Income
                          </span>
                          <span className="text-sm font-black text-white mt-1 block">
                            {msg.metrics.pendingIncome}
                          </span>
                        </div>
                      </div>

                      <div className="border-t border-white/5 pt-3.5 flex items-baseline justify-between">
                        <div>
                          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">
                            Projected Runway
                          </span>
                          <span className="text-xs font-black text-primary block mt-0.5">
                            {msg.metrics.projectedRunway}
                          </span>
                        </div>
                        <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">
                          Recommended: {msg.metrics.recommendedRunway}
                        </span>
                      </div>

                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block border-l-2 border-primary pl-2 leading-relaxed italic">
                        {msg.metrics.safetyBufferText}
                      </p>

                      {msg.metrics.hasActions && (
                        <div className="flex gap-2.5 pt-1.5">
                          <button className="flex-1 h-9 bg-primary/15 hover:bg-primary/20 text-primary border border-primary/25 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5">
                            <Check className="w-3.5 h-3.5" />
                            <span>Mark as Expense</span>
                          </button>
                          <button className="flex-1 h-9 bg-white/5 hover:bg-white/8 text-slate-300 border border-white/10 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5">
                            <Bookmark className="w-3.5 h-3.5" />
                            <span>Add to Wishlist</span>
                          </button>
                        </div>
                      )}
                    </Card>
                  )}
                </div>

                {/* User Avatar */}
                {!isAI && (
                  <div className="w-9 h-9 rounded-xl bg-gradient-green flex items-center justify-center text-black font-black text-xs shrink-0 shadow-sm mt-0.5 select-none">
                    US
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing State Indicator */}
          {isTyping && (
            <div className="flex gap-4.5 justify-start animate-pulse">
              <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center text-primary shadow-sm shrink-0">
                <Bot className="w-4.5 h-4.5" />
              </div>
              <div className="bg-white/5 border border-white/5 text-slate-400 px-4.5 py-3 rounded-2xl flex items-center gap-1 select-none">
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-75" />
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-150" />
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-300" />
              </div>
            </div>
          )}

          {/* Friendly inline error if AI fails */}
          {isError && (
            <div className="flex gap-4.5 justify-start">
              <div className="w-9 h-9 rounded-xl bg-danger/10 border border-danger/15 flex items-center justify-center text-danger shrink-0 mt-0.5">
                <AlertCircle className="w-4.5 h-4.5 animate-bounce" />
              </div>
              <div className="space-y-3 max-w-[85%] md:max-w-[70%]">
                <div className="p-4 rounded-2xl bg-danger/10 border border-danger/15 text-slate-200">
                  <p className="text-xs leading-relaxed font-bold text-white">
                    AI Service Temporarily Unavailable
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    We encountered an issue communicating with the intelligence service (e.g. connection timeout or platform error). Your conversation has been preserved.
                  </p>
                  {onRetry && (
                    <button
                      onClick={onRetry}
                      className="mt-3.5 h-8 px-4 bg-danger/15 hover:bg-danger/20 border border-danger/25 text-[9px] font-black uppercase tracking-widest text-danger rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Retry Last Message</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </>
      )}
    </div>
  );
}

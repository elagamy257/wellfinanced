'use client';

import React, { useState } from 'react';
import { PageContainer } from '@/components/layout';
import { SectionTitle, Card, Button } from '@/components/ui';
import { Sparkles, Trash2 } from 'lucide-react';
import { 
  initialChatMessages, 
  Message, 
  ChatWindow, 
  PromptSuggestions, 
  ChatInputBar, 
  AIStateToggler 
} from '@/features/ai';

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>(initialChatMessages);
  
  // Demo States: 'normal' | 'empty' | 'loading' | 'error'
  const [demoState, setDemoState] = useState<'normal' | 'empty' | 'loading' | 'error'>('normal');
  const [isTyping, setIsTyping] = useState(false);

  // Send message simulation handler
  const handleSendMessage = (text: string, attachedFile?: string) => {
    // Append User Message
    const userMsg: Message = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: attachedFile ? `[Attached: ${attachedFile}] ${text}` : text,
      timestamp: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate AI response after 1.5s
    setTimeout(() => {
      let aiText = "I've analyzed your cashflow pipeline and noticed you have a strong projected Q4 safety buffer. Is there any specific expense or invoice you'd like to audit?";
      
      if (text.toUpperCase().includes('SPENDING') || text.toUpperCase().includes('ANALYZE')) {
        aiText = "Your operational expenses are down 8% this month, mostly driven by reduced SaaS tooling overhead. You're saving an average of $220/month compared to Q2.";
      } else if (text.toUpperCase().includes('TAX') || text.toUpperCase().includes('DEBT')) {
        aiText = "Based on your year-to-date freelance earnings, your Q3 estimated tax debt is projected at $6,420. Setting aside 25% of current client payments will cover this debt fully.";
      } else if (text.toUpperCase().includes('REPORT') || text.toUpperCase().includes('Q3')) {
        aiText = "Q3 financial aggregate report generated successfully. Summary: Total surplus of $12,842.50 with a projected runway exceeding 90 days. Would you like to export the PDF?";
      }

      const aiMsg: Message = {
        id: `msg-ai-${Date.now()}`,
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSelectSuggestion = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    <PageContainer>
      {/* Page Title Header */}
      <SectionTitle 
        title="AI Assistant" 
        subtitle="Intelligent co-pilot mapping business cashflow dynamics and operational runways." 
        action={
          <div className="flex items-center gap-3">
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={handleClearChat}
              className="flex items-center gap-2 text-slate-400 hover:text-white"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Session</span>
            </Button>
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold uppercase tracking-widest text-primary select-none shadow-[0_0_15px_rgba(168,85,247,0.1)]">
              <Sparkles className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span>Co-pilot Online</span>
            </div>
          </div>
        }
      />

      <div className="space-y-6 md:space-y-8 pb-16">
        
        {/* State Toggler Tool (Demo controls) */}
        <AIStateToggler 
          currentState={demoState}
          setCurrentState={setDemoState}
          isTyping={isTyping}
          setIsTyping={setIsTyping}
        />

        {/* Conversation Hub Panel Container */}
        <Card variant="glass" className="relative p-6 md:p-8 flex flex-col justify-between border border-white/5 bg-[#060B1A]/40 min-h-[500px]">
          <div className="absolute top-0 left-[20%] w-[60%] h-[30%] bg-primary/2 rounded-full blur-[110px] pointer-events-none -z-10" />

          {/* Messages list scroll area */}
          <ChatWindow
            messages={messages}
            isTyping={isTyping}
            isLoading={demoState === 'loading'}
            isError={demoState === 'error'}
            isEmpty={demoState === 'empty' || messages.length === 0}
            onRetry={() => setDemoState('normal')}
          />

          {/* Quick suggestions & input bar */}
          {demoState !== 'loading' && demoState !== 'error' && (
            <div className="border-t border-white/5 pt-5 mt-6 space-y-4">
              <PromptSuggestions onSelect={handleSelectSuggestion} />
              <ChatInputBar onSend={handleSendMessage} />
            </div>
          )}
        </Card>

      </div>
    </PageContainer>
  );
}

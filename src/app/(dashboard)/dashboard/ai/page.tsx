'use client';

import React, { useState } from 'react';
import { PageContainer } from '@/components/layout';
import { SectionTitle, Card, Button } from '@/components/ui';
import { Sparkles, Trash2 } from 'lucide-react';
import { 
  Message, 
  ChatWindow, 
  PromptSuggestions, 
  ChatInputBar, 
  useAdvisorChat,
  useQuickAdvice
} from '@/features/ai';
import {
  AffordabilityCard,
  InstallmentImpactCard,
  SavingsPlanCard,
  DebtCalculatorPanel
} from '@/features/advisor';

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatError, setChatError] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'intelligence'>('chat');

  const advisorChat = useAdvisorChat();
  const quickAdvice = useQuickAdvice();

  const isPending = advisorChat.isPending || quickAdvice.isPending;
  const isError = chatError;

  // Send message handler
  const handleSendMessage = (text: string, attachedFile?: string) => {
    if (isPending) return;

    // Append User Message
    const userMsg: Message = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: attachedFile ? `[Attached: ${attachedFile}] ${text}` : text,
      timestamp: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages((prev) => [...prev, userMsg]);
    setChatError(false);

    const chatHistory = [
      ...messages.map(msg => ({
        role: msg.sender === 'ai' ? 'assistant' as const : 'user' as const,
        content: msg.text
      }))
    ];

    advisorChat.mutate({
      message: text,
      history: chatHistory
    }, {
      onSuccess: (data) => {
        const aiMsg: Message = {
          id: `msg-ai-${Date.now()}`,
          sender: 'ai',
          text: data.answer || 'No response received from assistant.',
          timestamp: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, aiMsg]);
      },
      onError: (error) => {
        if (process.env.NODE_ENV === 'development') {
          console.error('Advisor Chat Mutation Failed:', error);
        }
        setChatError(true);
      }
    });
  };

  const handleSelectSuggestion = (prompt: string) => {
    if (isPending) return;

    const userMsg: Message = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: prompt,
      timestamp: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages((prev) => [...prev, userMsg]);
    setChatError(false);
    
    quickAdvice.mutate({
      topic: prompt
    }, {
      onSuccess: (data) => {
        const aiMsg: Message = {
          id: `msg-ai-${Date.now()}`,
          sender: 'ai',
          text: data.advice || 'No advice returned for this topic.',
          timestamp: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, aiMsg]);
      },
      onError: (error) => {
        if (process.env.NODE_ENV === 'development') {
          console.error('Quick Advice Mutation Failed:', error);
        }
        setChatError(true);
      }
    });
  };

  const handleRetry = () => {
    const lastUserMsg = [...messages].reverse().find(msg => msg.sender === 'user');
    if (!lastUserMsg) return;
    
    setChatError(false);

    const DEFAULT_PROMPTS = [
      "How can I save for a new laptop?",
      "What is the best way to pay off my car loan?",
      "Analyze my spending habits this month.",
      "How much should I keep in my emergency fund?"
    ];
    const isSuggestion = DEFAULT_PROMPTS.includes(lastUserMsg.text);

    if (isSuggestion) {
      quickAdvice.mutate({
        topic: lastUserMsg.text
      }, {
        onSuccess: (data) => {
          const aiMsg: Message = {
            id: `msg-ai-${Date.now()}`,
            sender: 'ai',
            text: data.advice || 'No advice returned for this topic.',
            timestamp: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
          };
          setMessages((prev) => [...prev, aiMsg]);
        },
        onError: (error) => {
          if (process.env.NODE_ENV === 'development') {
            console.error('Quick Advice Retry Mutation Failed:', error);
          }
          setChatError(true);
        }
      });
    } else {
      const lastUserIndex = messages.findIndex(m => m.id === lastUserMsg.id);
      const priorMessages = lastUserIndex !== -1 ? messages.slice(0, lastUserIndex) : messages;
      
      const chatHistory = priorMessages.map(msg => ({
        role: msg.sender === 'ai' ? 'assistant' as const : 'user' as const,
        content: msg.text
      }));

      advisorChat.mutate({
        message: lastUserMsg.text,
        history: chatHistory
      }, {
        onSuccess: (data) => {
          const aiMsg: Message = {
            id: `msg-ai-${Date.now()}`,
            sender: 'ai',
            text: data.answer || 'No response received from assistant.',
            timestamp: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
          };
          setMessages((prev) => [...prev, aiMsg]);
        },
        onError: (error) => {
          if (process.env.NODE_ENV === 'development') {
            console.error('Advisor Chat Retry Mutation Failed:', error);
          }
          setChatError(true);
        }
      });
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setChatError(false);
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
        
        {/* Neon Tab Switcher Bar */}
        <div className="flex border-b border-white/5 mb-6">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-6 py-3 text-xs font-black uppercase tracking-widest border-b-2 transition-all cursor-pointer ${
              activeTab === 'chat'
                ? 'border-success text-success shadow-glow-sm'
                : 'border-transparent text-slate-400 hover:text-white hover:border-white/10'
            }`}
          >
            AI Chat Co-Pilot
          </button>
          <button
            onClick={() => setActiveTab('intelligence')}
            className={`px-6 py-3 text-xs font-black uppercase tracking-widest border-b-2 transition-all cursor-pointer ${
              activeTab === 'intelligence'
                ? 'border-cyan text-cyan shadow-glow-sm'
                : 'border-transparent text-slate-400 hover:text-white hover:border-white/10'
            }`}
          >
            Financial Intelligence
          </button>
        </div>

        {activeTab === 'chat' ? (
          /* Conversation Hub Panel Container */
          <Card variant="glass" className="relative p-6 md:p-8 flex flex-col justify-between border border-white/5 bg-bg-1/40 min-h-[500px]">
            <div className="absolute top-0 left-[20%] w-[60%] h-[30%] bg-primary/2 rounded-full blur-[110px] pointer-events-none -z-10" />

            {/* Messages list scroll area */}
            <ChatWindow
              messages={messages}
              isTyping={isPending}
              isLoading={false}
              isError={isError}
              isEmpty={messages.length === 0 && !isError}
              onRetry={handleRetry}
            />

            {/* Quick suggestions & input bar */}
            <div className="border-t border-white/5 pt-5 mt-6 space-y-4">
              <PromptSuggestions onSelect={handleSelectSuggestion} disabled={isPending} />
              <ChatInputBar onSend={handleSendMessage} disabled={isPending} />
            </div>
          </Card>
        ) : (
          /* Advanced AI Financial Calculators Bento Grid */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-scale-in">
            <div className="space-y-8">
              <AffordabilityCard />
              <InstallmentImpactCard />
            </div>
            <div className="space-y-8">
              <SavingsPlanCard />
              <DebtCalculatorPanel />
            </div>
          </div>
        )}

      </div>
    </PageContainer>
  );
}

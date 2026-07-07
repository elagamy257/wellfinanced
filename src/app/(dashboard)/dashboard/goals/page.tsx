'use client';

import React, { useState } from 'react';
import { PageContainer } from '@/components/layout';
import { SectionTitle, Button } from '@/components/ui';
import { Plus } from 'lucide-react';
import { 
  initialSavingsGoals, 
  SavingsGoal, 
  InsightBanner, 
  SavingsGoalCard, 
  GrowthChart, 
  GoalModal 
} from '@/features/savings';

export default function GoalsPage() {
  const [goals, setGoals] = useState<SavingsGoal[]>(initialSavingsGoals);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveGoal = (goal: Omit<SavingsGoal, 'id' | 'percentage'>) => {
    const percentageVal = Math.min(100, Math.round((goal.saved / goal.target) * 100));
    const newGoal: SavingsGoal = {
      id: `goal-${Date.now()}`,
      ...goal,
      percentage: percentageVal
    };
    setGoals([...goals, newGoal]);
    setIsModalOpen(false);
  };

  return (
    <PageContainer>
      {/* Page Title & Header Actions */}
      <SectionTitle 
        title="Savings Goals" 
        subtitle="You're on track to reach your annual target by Q4." 
        action={
          <Button 
            variant="primary" 
            size="sm" 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Goal</span>
          </Button>
        }
      />

      <div className="space-y-6 md:space-y-8 pb-16">
        
        {/* Top: AI Insight Banner */}
        <InsightBanner />

        {/* Bento Grid: Goals & Growth projection chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          
          {/* Goals List (Left 2 Columns) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest block pl-1 select-none">
              Active Progress
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {goals.map((goal) => (
                <SavingsGoalCard key={goal.id} goal={goal} />
              ))}
            </div>
          </div>

          {/* Growth Chart (Right Column) */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest block pl-1 select-none">
              Projected Growth
            </h3>
            <GrowthChart />
          </div>

        </div>

      </div>

      {/* New Goal Overlay Modal Component */}
      <GoalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveGoal}
      />
    </PageContainer>
  );
}

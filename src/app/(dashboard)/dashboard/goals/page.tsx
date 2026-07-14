'use client';

import React, { useState } from 'react';
import { PageContainer } from '@/components/layout';
import { SectionTitle, Button } from '@/components/ui';
import { Plus, HelpCircle } from 'lucide-react';
import { 
  InsightBanner, 
  SavingsGoalCard, 
  GrowthChart, 
  GoalModal,
  useSavingsList,
  useCreateSavingsGoal,
  useDeleteSavingsGoal,
  mapSavingsGoalToModel
} from '@/features/savings';
import { useExpenseStats } from '@/features/dashboard';

export default function GoalsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Queries
  const { data: savingsData, isLoading, isError } = useSavingsList();
  const { data: expenseStats } = useExpenseStats();

  // Mutations
  const createGoal = useCreateSavingsGoal();
  const deleteGoal = useDeleteSavingsGoal();

  // Computations
  const goalsList = savingsData?.items || [];
  const mappedGoals = goalsList.map(mapSavingsGoalToModel);

  const totalSaved = goalsList.reduce((sum, g) => sum + (g.saved_amount || 0), 0);
  const avgMonthlyExpenses = expenseStats?.avg || 0;
  
  // Calculate runway months dynamically based on actual monthly expenses (default to 3000 fallback if no expenses logged yet)
  const burnRate = avgMonthlyExpenses > 0 ? avgMonthlyExpenses : 3000;
  const runway = totalSaved / burnRate;

  const handleSaveGoal = (goal: { name: string; target: number; saved: number; eta: string }) => {
    createGoal.mutate({
      goal_name: goal.name,
      target_amount: goal.target,
      saved_amount: goal.saved,
      deadline: goal.eta,
    });
    setIsModalOpen(false);
  };

  const handleDeleteGoal = (id: string) => {
    if (confirm('Are you sure you want to delete this savings goal?')) {
      deleteGoal.mutate(id);
    }
  };

  return (
    <PageContainer>
      {/* Page Title & Header Actions */}
      <SectionTitle 
        title="Savings Goals" 
        subtitle={
          avgMonthlyExpenses > 0 
            ? `Total saved: $${totalSaved.toLocaleString()} — provides a ${runway.toFixed(1)} month runway based on average monthly burn rate of $${avgMonthlyExpenses.toLocaleString()}.`
            : `Total saved: $${totalSaved.toLocaleString()} — provides a ${runway.toFixed(1)} month runway (based on standard $${burnRate.toLocaleString()} monthly burn rate estimate).`
        } 
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

            {isLoading ? (
              /* Loading Skeletons State */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                  <div key={i} className="h-44 bg-white/5 border border-white/10 rounded-card animate-pulse" />
                ))}
              </div>
            ) : isError ? (
              /* Error State */
              <div className="p-6 rounded-card border border-accent-pink/20 bg-accent-pink/5 text-center space-y-2 select-none">
                <p className="text-xs font-bold text-accent-pink uppercase tracking-widest">
                  Failed to Load Savings Goals
                </p>
                <p className="text-xs text-slate-400">
                  There was an error communicating with the financial vaults service. Please try reloading the page.
                </p>
              </div>
            ) : mappedGoals.length === 0 ? (
              /* Empty State */
              <div className="p-8 rounded-card border border-white/5 bg-bg-3/50 text-center space-y-3 select-none">
                <HelpCircle className="w-10 h-10 text-slate-500 mx-auto" />
                <h4 className="text-sm font-extrabold text-white">No Savings Goals Configured</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Start tracking your target runway or emergency funds by creating your first saving vault.
                </p>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={() => setIsModalOpen(true)}
                  className="mt-2"
                >
                  Create Goal
                </Button>
              </div>
            ) : (
              /* Goals Grid List */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mappedGoals.map((goal) => (
                  <SavingsGoalCard 
                    key={goal.id} 
                    goal={goal} 
                    onDelete={handleDeleteGoal}
                  />
                ))}
              </div>
            )}
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

import { SmoothedSalaryConfig, AcceptSmoothedSalaryPayload, AcceptSmoothedSalaryResponse } from '../types';

export const settingsService = {
  async getSmoothedSalary(): Promise<SmoothedSalaryConfig> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return {
      virtual_salary: 6500,
      profile_type: "inconsistent",
      multiplier: 0.65,
      predicted_income: 10000,
      budget: {
        needs: {
          amount: 3250,
          pct: 50,
          categories: [
            { name: "Rent", actual: 450, recommended: 450 }
          ]
        },
        wants: {
          amount: 1950,
          pct: 30,
          categories: [
            { name: "Adobe", actual: 35, recommended: 35 },
            { name: "Coffee", actual: 25, recommended: 25 },
            { name: "Electricity", actual: 70, recommended: 70 },
            { name: "Food", actual: 180, recommended: 180 },
            { name: "Fuel", actual: 120, recommended: 120 },
            { name: "Internet", actual: 60, recommended: 60 },
            { name: "Netflix", actual: 15, recommended: 15 },
            { name: "Shopping", actual: 210, recommended: 210 }
          ]
        },
        savings: { amount: 1300, pct: 20 },
        debt_payments: { amount: 650, pct: 10 }
      },
      surplus_deficit: 5335,
      savings_goals: [
        {
          name: "Emergency Fund",
          target: 10000,
          saved: 2500,
          monthly_contribution: 500,
          required_monthly: 618.13,
          progress_pct: 25,
          on_track: true,
          deadline: "2027-07-15"
        },
        {
          name: "New MacBook",
          target: 5000,
          saved: 1500,
          monthly_contribution: 500,
          required_monthly: 573.77,
          progress_pct: 30,
          on_track: true,
          deadline: "2027-01-15"
        },
        {
          name: "Vacation",
          target: 3000,
          saved: 800,
          monthly_contribution: 300,
          required_monthly: 272.73,
          progress_pct: 26.7,
          on_track: true,
          deadline: "2027-03-15"
        }
      ],
      alerts: [
        "✅ Your virtual salary configuration is stabilized at $6,500 based on your billing average.",
        "📈 Tax reserve goals are automatically funded at 20% on every ledger checkout."
      ],
      expense_summary: {
        monthly_avg: 1165,
        needs_pct: 38.6,
        wants_pct: 61.4,
        top_spending: ["Rent", "Shopping", "Food"]
      },
      total_debt_payments: 650,
      ai_insights: { loss_curve: [0.5, 0.4, 0.2, 0.1, 0.05] },
      backtest_results: {
        balance_history: [
          { month: "2026-05", balance: 19350 },
          { month: "2026-07", balance: 24000 }
        ],
        reliability_score: 100,
        final_buffer: 24000
      },
      final_amount: 6500,
      status: "active"
    };
  },

  async acceptSmoothedSalary(payload: AcceptSmoothedSalaryPayload): Promise<AcceptSmoothedSalaryResponse> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      success: true,
      message: 'Payout settings accepted successfully!',
      data: payload
    };
  }
};

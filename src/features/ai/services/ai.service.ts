import { ChatRequest, ChatResponse, QuickAdviceRequest, QuickAdviceResponse } from '../types';

export const aiService = {
  async chat(data: ChatRequest): Promise<ChatResponse> {
    const prompt = (data.message || '').toLowerCase();
    let reply = "";
    
    if (prompt.includes('spend') || prompt.includes('safely')) {
      reply = "Based on your current cash reserves and stable salary payout settings, you can safely spend up to **$1,950** this month on discretionary items. This allocation leaves you with $3,250 for essential needs (like rent, utilities, food) and $1,300 for savings goals/taxes.";
    } else if (prompt.includes('analyze') || prompt.includes('spending')) {
      reply = "After analyzing your transaction logs, here are the core insights:\n\n1. **Essential Overheads**: Your rent ($450) is 38.6% of your monthly outflows, which is highly optimal.\n2. **Discretionary Spending**: Discretionary spending (shopping, coffee, Netflix) makes up 61.4% ($715) of your outflows. There is a moderate opportunity to trim shopping costs ($210) to speed up savings vaults.\n3. **Debt Drag**: You are paying $650/month in installment/minimum payments. Accelerating laptop payoffs first will free up significant monthly cashflow.";
    } else if (prompt.includes('increase') || prompt.includes('savings')) {
      reply = "To increase your monthly savings rate from 20% to 30%, consider these three high-impact adjustments:\n\n1. **Optimize Subscriptions**: Cancel unused software licenses or lower subscription plans (saving ~$50/month).\n2. **Shopping Buffers**: Limit discretionary shopping expenses to $150/month (releasing $60/month).\n3. **Manual Payout Boost**: Adjust your virtual salary multiplier to 0.70 inside Settings Page to automatically route more baseline surpluses to your Emergency Fund vault.";
    } else if (prompt.includes('afford') || prompt.includes('laptop') || prompt.includes('2500')) {
      reply = "### Purchase Feasibility Check: $2,500 Laptop\n\n**Verdict: PASS (Highly Feasible)**\n\n* **Cash Availability**: You have $9,700 total in connected bank accounts (CIB + Wallet).\n* **Emergency Fund Buffer**: Subtracting your $2,500 emergency reserve leaves you with $7,200 of active active liquidity, which easily covers the purchase price.\n* **Recommendation**: Buy the laptop outright rather than taking on a new installment plan, as this avoids adding to your existing $650/month debt obligations.";
    } else {
      reply = "Hello! I am your Fintova AI Financial Assistant. I've analyzed your transaction data. You currently have a net worth of **$23,000**, with **$9,700** in liquid assets across CIB and Wallet. Your stable salary target is set to **$6,500/month**. How can I help you manage your cashflow today?";
    }

    // Delay slightly to simulate AI response delay for realistic premium presentation experience
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      answer: reply
    };
  },

  async quickAdvice(data: QuickAdviceRequest): Promise<QuickAdviceResponse> {
    console.log('Generating AI quick advice for:', data.topic);
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      advice: "Your recurring overheads are well-optimized. Focus on paying off credit card debt to save interest."
    };
  },
};

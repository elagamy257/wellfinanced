import type {
  ForecastLatestResponse,
  ExpenseAnalysisResponse,
  ExpenseCategoryGroup,
  SalaryDeviationResponse,
  AnalyticsChartPoint,
  AnalyticsPipelineItem,
  AnalyticsSalaryWidgetModel,
} from '../types';

// ─── Icon cycle for pipeline items ────────────────────────────────────────────
const ICON_CYCLE = ['web', 'palette', 'view_in_ar'] as const;

// ─── Chart Mapper ──────────────────────────────────────────────────────────────

/**
 * Maps GET /api/forecast/latest → AnalyticsChartPoint[]
 * Handles both multi-month arrays and single predicted_value responses.
 */
export function mapForecastToChartData(
  dto: ForecastLatestResponse | null | undefined
): AnalyticsChartPoint[] {
  if (!dto) return [];

  const months = dto.months as string[] | undefined;
  const predicted = dto.predicted_values as number[] | undefined;
  const actual = dto.actual_values as number[] | undefined;

  // Multi-month response (standard LSTM output)
  if (Array.isArray(months) && months.length > 0) {
    return months.map((m, idx) => {
      let label: string;
      try {
        label = new Date(m).toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
      } catch {
        label = m.substring(0, 3).toUpperCase();
      }

      const isLast = idx === months.length - 1;

      return {
        month: label,
        actual: Array.isArray(actual) ? actual[idx] : undefined,
        projected: Array.isArray(predicted) ? predicted[idx] : undefined,
        isCurrent: isLast,
      };
    });
  }

  // Single predicted_value fallback
  if (dto.predicted_value !== undefined) {
    const now = new Date();
    const label = now.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    return [
      {
        month: label,
        projected: dto.predicted_value,
        isCurrent: true,
      },
    ];
  }

  return [];
}

// ─── Pipeline Mapper ───────────────────────────────────────────────────────────

/**
 * Maps GET /api/expenses/analysis → AnalyticsPipelineItem[]
 * Expense categories from K-Means are mapped into the RevenuePipelineList shape.
 * Needs → ACTIVE status, Wants → HIGH PROBABILITY status.
 */
export function mapExpenseAnalysisToPipeline(
  dto: ExpenseAnalysisResponse | null | undefined
): AnalyticsPipelineItem[] {
  if (!dto) return [];

  type TaggedGroup = ExpenseCategoryGroup & { _group: 'ACTIVE' | 'HIGH PROBABILITY' };

  let needs = (dto.needs as ExpenseCategoryGroup[] | undefined) ?? [];
  let wants = (dto.wants as ExpenseCategoryGroup[] | undefined) ?? [];
  const categories = (dto.categories as ExpenseCategoryGroup[] | undefined) ?? [];

  if (Array.isArray(dto.category_breakdown)) {
    needs = dto.category_breakdown.filter((item) => item.type === 'Need');
    wants = dto.category_breakdown.filter((item) => item.type === 'Want');
  }

  let tagged: TaggedGroup[];

  if (needs.length > 0 || wants.length > 0) {
    tagged = [
      ...needs.map((n) => ({ ...n, _group: 'ACTIVE' as const })),
      ...wants.map((w) => ({ ...w, _group: 'HIGH PROBABILITY' as const })),
    ];
  } else if (categories.length > 0) {
    // Fallback: alternate groups when no needs/wants split is provided
    tagged = categories.map((c, i) => ({
      ...c,
      _group: (i % 2 === 0 ? 'ACTIVE' : 'HIGH PROBABILITY') as 'ACTIVE' | 'HIGH PROBABILITY',
    }));
  } else {
    return [];
  }

  const grandTotal = tagged.reduce((sum, g) => sum + ((g.total ?? g.amount) || 0), 0);

  return tagged.slice(0, 5).map((item, idx): AnalyticsPipelineItem => {
    const value = (item.total ?? item.amount) || 0;
    const pct = grandTotal > 0 ? Math.round((value / grandTotal) * 100) : 0;
    const categoryName = item.category ?? item.name ?? `Category ${idx + 1}`;
    const clientLabel =
      item._group === 'ACTIVE' ? 'Essential Expenses' : 'Discretionary Expenses';

    return {
      id: `expense-pipeline-${idx}`,
      status: item._group,
      project: categoryName,
      client: clientLabel,
      value,
      progressText: grandTotal > 0 ? `${pct}% of total` : 'No data',
      progressPercentage: grandTotal > 0 ? pct : undefined,
      iconName: ICON_CYCLE[idx % 3],
    };
  });
}

// ─── Salary Widget Mapper ──────────────────────────────────────────────────────

/**
 * Maps GET /api/smoothed-salary/deviation → AnalyticsSalaryWidgetModel
 * Handles nullable / absent fields defensively.
 */
export function mapSalaryDeviationToWidget(
  dto: SalaryDeviationResponse | null | undefined
): AnalyticsSalaryWidgetModel {
  if (!dto) {
    return {
      smartSalaryValue: 0,
      statusText: 'Calculating',
      descriptionText:
        'Loading your personalized salary recommendation based on your financial data...',
      emergencyFundValue: 0,
      safetyMarginValue: 0,
    };
  }

  const recommended =
    (dto.recommended_salary ?? dto.smoothed_salary) || 0;

  const deviationPct =
    (dto.deviation_pct ?? dto.deviation_percentage) || 0;

  const surplus = dto.surplus_or_deficit ?? 0;

  const emergency = (dto.emergency_fund as number | undefined) || 0;

  const safetyMargin =
    typeof dto.safety_margin === 'number'
      ? dto.safety_margin
      : typeof dto.safety_margin_pct === 'number'
      ? dto.safety_margin_pct
      : Math.round(Math.abs(deviationPct));

  let statusText = 'Stable';
  if (deviationPct > 5) statusText = 'Surplus';
  else if (deviationPct < -5) statusText = 'Deficit';

  const description =
    (dto.description as string | undefined) ||
    (dto.insight as string | undefined) ||
    `Based on your income history and a ${Math.abs(deviationPct).toFixed(1)}% ${
      surplus >= 0 ? 'surplus' : 'deficit'
    }, this payout ensures a healthy financial runway.`;

  return {
    smartSalaryValue: recommended,
    statusText,
    descriptionText: description,
    emergencyFundValue: emergency,
    safetyMarginValue: Math.round(safetyMargin),
  };
}

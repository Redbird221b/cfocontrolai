export type RoiInputs = {
  monthlyRevenue: number
  totalReceivables: number
  overdueReceivables: number
  financeEmployees: number
  manualHoursPerMonth: number
  hourlyCost: number
  annualFinancingRate: number
  pilotCost: number
}

export type RoiAssumptions = {
  timeReleaseLow: number
  timeReleaseHigh: number
  receivableFocusLow: number
  receivableFocusHigh: number
  visibilityLow: number
  visibilityHigh: number
}

export type RoiResult = {
  manualProcessCost: number
  monthlyCapitalCostInOverdue: number
  timeReleaseLowHours: number
  timeReleaseHighHours: number
  timeReleaseLowValue: number
  timeReleaseHighValue: number
  receivableFocusLowValue: number
  receivableFocusHighValue: number
  cashVisibilityLowValue: number
  cashVisibilityHighValue: number
  scenarioMonthlyEffectLow: number
  scenarioMonthlyEffectHigh: number
  paybackMonthsLow: number | null
  paybackMonthsHigh: number | null
}

export const defaultRoiAssumptions: RoiAssumptions = {
  timeReleaseLow: 0.2,
  timeReleaseHigh: 0.4,
  receivableFocusLow: 0.03,
  receivableFocusHigh: 0.08,
  visibilityLow: 0.003,
  visibilityHigh: 0.008,
}

export const defaultRoiInputs: RoiInputs = {
  monthlyRevenue: 3_200_000_000,
  totalReceivables: 680_000_000,
  overdueReceivables: 126_000_000,
  financeEmployees: 3,
  manualHoursPerMonth: 120,
  hourlyCost: 80_000,
  annualFinancingRate: 0.24,
  pilotCost: 5_000_000,
}

function safe(value: number) {
  return Number.isFinite(value) && value > 0 ? value : 0
}

function payback(pilotCost: number, monthlyEffect: number) {
  if (pilotCost <= 0 || monthlyEffect <= 0) {
    return null
  }

  return pilotCost / monthlyEffect
}

export function calculateRoi(
  rawInputs: RoiInputs,
  assumptions: RoiAssumptions = defaultRoiAssumptions,
): RoiResult {
  const inputs = {
    monthlyRevenue: safe(rawInputs.monthlyRevenue),
    totalReceivables: safe(rawInputs.totalReceivables),
    overdueReceivables: safe(rawInputs.overdueReceivables),
    financeEmployees: safe(rawInputs.financeEmployees),
    manualHoursPerMonth: safe(rawInputs.manualHoursPerMonth),
    hourlyCost: safe(rawInputs.hourlyCost),
    annualFinancingRate: safe(rawInputs.annualFinancingRate),
    pilotCost: safe(rawInputs.pilotCost),
  }

  const manualProcessCost = inputs.manualHoursPerMonth * inputs.hourlyCost
  const monthlyCapitalCostInOverdue = inputs.overdueReceivables * (inputs.annualFinancingRate / 12)
  const timeReleaseLowHours = inputs.manualHoursPerMonth * assumptions.timeReleaseLow
  const timeReleaseHighHours = inputs.manualHoursPerMonth * assumptions.timeReleaseHigh
  const timeReleaseLowValue = timeReleaseLowHours * inputs.hourlyCost
  const timeReleaseHighValue = timeReleaseHighHours * inputs.hourlyCost
  const receivableFocusLowValue = inputs.overdueReceivables * assumptions.receivableFocusLow
  const receivableFocusHighValue = inputs.overdueReceivables * assumptions.receivableFocusHigh
  const cashVisibilityLowValue = inputs.monthlyRevenue * assumptions.visibilityLow
  const cashVisibilityHighValue = inputs.monthlyRevenue * assumptions.visibilityHigh
  const scenarioMonthlyEffectLow = timeReleaseLowValue + receivableFocusLowValue + cashVisibilityLowValue
  const scenarioMonthlyEffectHigh = timeReleaseHighValue + receivableFocusHighValue + cashVisibilityHighValue

  return {
    manualProcessCost,
    monthlyCapitalCostInOverdue,
    timeReleaseLowHours,
    timeReleaseHighHours,
    timeReleaseLowValue,
    timeReleaseHighValue,
    receivableFocusLowValue,
    receivableFocusHighValue,
    cashVisibilityLowValue,
    cashVisibilityHighValue,
    scenarioMonthlyEffectLow,
    scenarioMonthlyEffectHigh,
    paybackMonthsLow: payback(inputs.pilotCost, scenarioMonthlyEffectHigh),
    paybackMonthsHigh: payback(inputs.pilotCost, scenarioMonthlyEffectLow),
  }
}

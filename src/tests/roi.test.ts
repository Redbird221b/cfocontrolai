import { describe, expect, it } from 'vitest'
import { calculateRoi, defaultRoiAssumptions, type RoiInputs } from '../lib/roi'

const inputs: RoiInputs = {
  monthlyRevenue: 1_000_000_000,
  totalReceivables: 400_000_000,
  overdueReceivables: 100_000_000,
  financeEmployees: 2,
  manualHoursPerMonth: 100,
  hourlyCost: 50_000,
  annualFinancingRate: 0.24,
  pilotCost: 5_000_000,
}

describe('calculateRoi', () => {
  it('calculates manual process and capital costs', () => {
    const result = calculateRoi(inputs)

    expect(result.manualProcessCost).toBe(5_000_000)
    expect(result.monthlyCapitalCostInOverdue).toBe(2_000_000)
  })

  it('returns ranges instead of a single guaranteed effect', () => {
    const result = calculateRoi(inputs)

    expect(result.timeReleaseLowHours).toBe(20)
    expect(result.timeReleaseHighHours).toBe(40)
    expect(result.scenarioMonthlyEffectHigh).toBeGreaterThan(result.scenarioMonthlyEffectLow)
  })

  it('uses visible assumptions for receivable focus and visibility scenarios', () => {
    const result = calculateRoi(inputs)

    expect(result.receivableFocusLowValue).toBe(inputs.overdueReceivables * defaultRoiAssumptions.receivableFocusLow)
    expect(result.cashVisibilityHighValue).toBe(inputs.monthlyRevenue * defaultRoiAssumptions.visibilityHigh)
  })

  it('handles zero or invalid pilot cost without fake payback', () => {
    const result = calculateRoi({ ...inputs, pilotCost: 0 })

    expect(result.paybackMonthsLow).toBeNull()
    expect(result.paybackMonthsHigh).toBeNull()
  })
})

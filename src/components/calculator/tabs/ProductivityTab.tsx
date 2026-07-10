import React from 'react';
import { CalculationResult } from '@/lib/calculations';
import { fmt, fmtM } from '@/lib/formatters';
import { CalculatorKpiCard, CalculatorKpiRow, CalculatorSection } from '../CalculatorKpiCard';
import { calcEyebrow, calcHeading, calcPara, calcSubpara } from '../calculatorUi';

export default function ProductivityTab({ results }: { results: CalculationResult }) {
  const { inputs, years } = results;
  const yr1 = years[0];

  const minCurrent = inputs.minCurrent;
  const minCF = inputs.minCF;
  const savingsPct = ((minCurrent - minCF) / minCurrent) * 100;
  
  const totalStaff = inputs.staffCount || 1;
  const totalHoursAvailable = totalStaff * 40 * 48; // assuming 48 working weeks
  const percentCapacityUnlocked = (yr1?.hoursSaved / totalHoursAvailable) * 100;
  const fullTimeEquiv = yr1?.hoursSaved / (40 * 48);

  return (
    <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500 md:gap-6">
      
      <CalculatorSection>
        <CalculatorKpiRow cols={3}>
          <CalculatorKpiCard
            label="Hours Freed / Year"
            value={fmt(yr1?.hoursSaved)}
            tone="indigo"
            trend={`${inputs.quoteVol * 12} quotes / yr`}
          />
          <CalculatorKpiCard
            label="Capacity Unlocked"
            value={`${fullTimeEquiv.toFixed(1)} FTEs`}
            tone="green"
            trend={`${percentCapacityUnlocked.toFixed(1)}% of team`}
          />
          <CalculatorKpiCard
            label="Error & Rework Savings"
            value={fmtM(yr1?.errorSavings)}
            tone="orange"
            trend="data entry reduction"
          />
        </CalculatorKpiRow>
      </CalculatorSection>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
        {/* Time Tracking */}
        <CalculatorSection>
          <h3 className={calcHeading}>Where the Time Goes</h3>
          <p className={`mb-5 mt-1.5 ${calcPara}`}>Time spent quoting vs. CoverForce time</p>
          
          <div className="mb-6">
            <div className="mb-2 flex justify-between font-sans text-xs font-medium text-[#444444]">
              <span>Current Process</span>
              <span>{minCurrent} min / quote</span>
            </div>
            <div className="relative h-2.5 overflow-hidden rounded-full bg-[#F0F0F4]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#A78BFA] to-[#7B5CFF]"
                style={{ width: "100%" }}
              />
            </div>
          </div>
          
          <div>
            <div className="mb-2 flex justify-between font-sans text-xs font-medium text-[#444444]">
              <span>With CoverForce</span>
              <span className="text-[#5B35E0]">{minCF} min / quote</span>
            </div>
            <div className="relative flex h-2.5 overflow-hidden rounded-full bg-[#F0F0F4]">
              <div
                className="flex h-full items-center justify-center rounded-full bg-gradient-to-r from-[#5B35E0] to-[#10B981]"
                style={{ width: `${(minCF / minCurrent) * 100}%` }}
              />
              <div className={`flex flex-1 items-center justify-center px-2 ${calcSubpara}`}>
                {savingsPct.toFixed(0)}% savings
              </div>
            </div>
          </div>
        </CalculatorSection>

        {/* Reinvestment Model */}
        <CalculatorSection>
          <p className={`mb-1 ${calcEyebrow}`}>
            The Reinvestment Model
          </p>
          <h3 className={calcHeading}>Turning Time into Revenue</h3>
          <p className={`mb-5 mt-1.5 ${calcPara}`}>
            Time saved has two values: the <strong className="text-[#444444]">raw cost</strong> of the labor, and the <strong className="text-[#444444]">productivity value</strong> if those hours are redeployed to revenue-generating activities (like relationship building and proactive cross-selling).
          </p>

          <div className="mb-4 border-b border-[#535353]/10 pb-4">
            <div className="mb-1 flex items-center justify-between">
              <span className="font-sans text-sm font-medium text-[#6B6B6B]">Raw Time Value</span>
              <span className="font-heading text-sm font-medium text-[#444444]">{fmtM(yr1?.timeSavingsVal)}</span>
            </div>
            <div className={calcSubpara}>({fmt(yr1?.hoursSaved)} hrs × {fmtM(inputs.hourlyCost)}/hr)</div>
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between">
              <span className="font-sans text-sm font-medium text-[#6B6B6B]">Productivity Uplift Value</span>
              <span className="font-heading text-sm font-medium text-[#444444]">{fmtM(yr1?.productivityReinvest)}</span>
            </div>
            <div className={calcSubpara}>
              Assuming 40% of freed time is redeployed to revenue generation at a 50% premium over base hourly cost.
            </div>
          </div>
        </CalculatorSection>
      </div>

    </div>
  );
}

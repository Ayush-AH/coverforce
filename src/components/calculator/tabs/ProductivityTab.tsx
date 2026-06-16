import React from 'react';
import { CalculationResult } from '@/lib/calculations';
import { fmt, fmtM } from '@/lib/formatters';

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
    <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm text-center">
          <div className="text-3xl font-serif text-amber-600 mb-1">{fmt(yr1?.hoursSaved)}</div>
          <div className="text-sm font-bold text-gray-900 mb-1">Hours Freed Per Year</div>
          <div className="text-[10px] text-gray-500">Across {inputs.quoteVol * 12} quotes annually</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm text-center">
          <div className="text-3xl font-serif text-purple-600 mb-1">{fullTimeEquiv.toFixed(1)} FTEs</div>
          <div className="text-sm font-bold text-gray-900 mb-1">Capacity Unlocked</div>
          <div className="text-[10px] text-gray-500">{percentCapacityUnlocked.toFixed(1)}% of your {totalStaff}-person team's capacity</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm text-center">
          <div className="text-3xl font-serif text-red-600 mb-1">{fmtM(yr1?.errorSavings)}</div>
          <div className="text-sm font-bold text-gray-900 mb-1">Error & Rework Savings</div>
          <div className="text-[10px] text-gray-500">From manual data entry reduction</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Time Tracking */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-1">Where the Time Goes</h3>
          <p className="text-sm text-gray-500 mb-6">Time spent quoting vs. CoverForce time</p>
          
          <div className="mb-6">
            <div className="flex justify-between text-xs font-bold text-gray-700 mb-2">
              <span>Current Process</span>
              <span>{minCurrent} min / quote</span>
            </div>
            <div className="h-6 bg-gray-100 rounded-md overflow-hidden relative">
              <div className="h-full bg-gray-400" style={{ width: '100%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-xs font-bold text-gray-700 mb-2">
              <span>With CoverForce</span>
              <span className="text-amber-600">{minCF} min / quote</span>
            </div>
            <div className="h-6 bg-gray-100 rounded-md overflow-hidden relative flex">
              <div className="h-full bg-amber-500 flex items-center justify-center text-[10px] font-bold text-white px-2" style={{ width: `${(minCF / minCurrent) * 100}%` }}>
                {((minCF / minCurrent) * 100).toFixed(0)}%
              </div>
              <div className="flex-1 border-2 border-dashed border-gray-300 h-full flex items-center justify-center text-[10px] font-bold text-gray-400">
                {savingsPct.toFixed(0)}% Savings
              </div>
            </div>
          </div>
        </div>

        {/* Reinvestment Model */}
        <div className="bg-white border border-purple-200 ring-2 ring-purple-500/10 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            <h3 className="text-[10px] font-bold tracking-widest uppercase text-gray-500">The Reinvestment Model</h3>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Turning Time into Revenue</h3>
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            Time saved has two values: the <strong>raw cost</strong> of the labor, and the <strong>productivity value</strong> if those hours are redeployed to revenue-generating activities (like relationship building and proactive cross-selling).
          </p>

          <div className="bg-purple-50 rounded-lg p-4 border border-purple-100 mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-semibold text-gray-700">Raw Time Value</span>
              <span className="font-bold text-gray-900">{fmtM(yr1?.timeSavingsVal)}</span>
            </div>
            <div className="text-[10px] text-gray-500">({fmt(yr1?.hoursSaved)} hrs × {fmtM(inputs.hourlyCost)}/hr)</div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-purple-200 shadow-sm">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-bold text-purple-700">Productivity Uplift Value</span>
              <span className="font-bold text-purple-700">{fmtM(yr1?.productivityReinvest)}</span>
            </div>
            <div className="text-[10px] text-gray-500 leading-relaxed">
              Assuming 40% of freed time is redeployed to revenue generation at a 50% premium over base hourly cost.
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

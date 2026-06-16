import React from 'react';
import { CalculationResult } from '@/lib/calculations';
import { fmtM } from '@/lib/formatters';

export default function InactionTab({ results }: { results: CalculationResult }) {
  const { years, inputs, totalROI } = results;
  const yr1 = years[0];

  const valueForegone = yr1?.totalValue || 0;
  const delayedROI = totalROI - valueForegone;
  
  const deployNowPct = 100;
  const wait12Pct = (delayedROI / totalROI) * 100;

  return (
    <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-1">The Cost of Waiting 12 Months</h3>
        <p className="text-sm text-gray-500 mb-6">Software implementations are often delayed due to competing priorities. But in insurance, deferring digitisation doesn't just defer revenue — it permanently erases it because the renewal compounding clock starts a year late.</p>
        
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-8 text-center max-w-xl mx-auto">
          <div className="text-[10px] font-bold text-red-600 uppercase tracking-widest mb-1">Total Value Lost to a 12-Month Delay</div>
          <div className="text-4xl font-serif font-bold text-red-600">{fmtM(valueForegone)}</div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-xs font-bold text-gray-700 mb-2">
            <span>Deploy Now — Full {inputs.projYears}-Year ROI</span>
            <span className="text-emerald-600">{fmtM(totalROI)}</span>
          </div>
          <div className="h-8 bg-gray-100 rounded-md overflow-hidden relative">
            <div className="h-full bg-emerald-500 transition-all duration-1000 flex items-center justify-center text-xs font-bold text-white" style={{ width: '100%' }}>
              100% Value Captured
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between text-xs font-bold text-gray-700 mb-2">
            <span>Wait 12 Months — Adjusted ROI</span>
            <span className="text-amber-600">{fmtM(delayedROI)}</span>
          </div>
          <div className="h-8 bg-gray-100 rounded-md overflow-hidden relative flex">
            <div className="h-full bg-amber-500 transition-all duration-1000 flex items-center justify-center text-xs font-bold text-white whitespace-nowrap overflow-hidden px-2" style={{ width: `${wait12Pct}%` }}>
              {wait12Pct.toFixed(0)}% Captured
            </div>
            <div className="flex-1 border-2 border-dashed border-red-300 h-full flex items-center justify-center text-[10px] font-bold text-red-500 bg-red-50/50">
              {fmtM(valueForegone)} Lost
            </div>
          </div>
        </div>

        <h4 className="text-sm font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Where the value bleeds out:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="text-sm font-bold text-red-600 mb-1">{fmtM(yr1?.addlRevBind)}</div>
            <div className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">Lost Bind Lift</div>
            <div className="text-[10px] text-gray-500 mt-1">Quotes bound at current {inputs.bindCurrent}% instead of {inputs.bindCF}%</div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="text-sm font-bold text-red-600 mb-1">{fmtM(yr1?.productivityReinvest)}</div>
            <div className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">Lost Productivity</div>
            <div className="text-[10px] text-gray-500 mt-1">Time wasted on data entry instead of revenue-gen</div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="text-sm font-bold text-red-600 mb-1">{fmtM(yr1?.commOnIncremental)}</div>
            <div className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">Lost Compounding</div>
            <div className="text-[10px] text-gray-500 mt-1">Year 1 growth that won't renew in Year 2</div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="text-sm font-bold text-red-600 mb-1">{fmtM(yr1?.itSavings)}</div>
            <div className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">Lost IT Savings</div>
            <div className="text-[10px] text-gray-500 mt-1">12 months of continued in-house maintenance costs</div>
          </div>
        </div>
      </div>

    </div>
  );
}

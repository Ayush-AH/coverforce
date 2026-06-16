import React from 'react';
import { CalculationResult } from '@/lib/calculations';
import { fmtM, fmt } from '@/lib/formatters';

export default function FullModelTab({ results }: { results: CalculationResult }) {
  const { years, inputs, totalROI, totalCFSpend, roiMult, payback, monthlyVal, doNothing, buildTotal, itSavingsTotal, commTotal } = results;

  return (
    <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm overflow-x-auto">
        <h3 className="text-lg font-bold text-gray-900 mb-1">Full Financial Model — {inputs.projYears} Year Projection</h3>
        <p className="text-sm text-gray-500 mb-6">Detailed breakdown of value drivers, costs, and compounding effects.</p>

        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr>
              <th className="py-2 px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b-2 border-gray-200 w-[200px]">Metric</th>
              {years.map(y => (
                <th key={y.year} className="py-2 px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right border-b-2 border-gray-200">Year {y.year}</th>
              ))}
              <th className="py-2 px-3 text-[10px] font-bold text-gray-900 uppercase tracking-wider text-right border-b-2 border-gray-200 bg-gray-50">Total</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            
            {/* Revenue Growth */}
            <tr className="bg-emerald-50/50">
              <td colSpan={years.length + 2} className="py-2 px-3 text-xs font-bold text-emerald-800 uppercase tracking-widest border-t border-gray-200">1. Revenue Growth</td>
            </tr>
            <tr className="border-t border-gray-100 hover:bg-gray-50">
              <td className="py-2 px-3 text-gray-700">Net New Business Premium</td>
              {years.map(y => <td key={y.year} className="py-2 px-3 text-right text-gray-600">{fmtM(y.newBizThisYear)}</td>)}
              <td className="py-2 px-3 text-right font-semibold bg-gray-50 text-gray-900">{fmtM(years.reduce((s,y)=>s+y.newBizThisYear,0))}</td>
            </tr>
            <tr className="border-t border-gray-100 hover:bg-gray-50">
              <td className="py-2 px-3 text-gray-700">Compounding Renewals</td>
              {years.map(y => <td key={y.year} className="py-2 px-3 text-right text-emerald-600">{fmtM(y.renewalsThisYear)}</td>)}
              <td className="py-2 px-3 text-right font-semibold bg-gray-50 text-emerald-700">{fmtM(years.reduce((s,y)=>s+y.renewalsThisYear,0))}</td>
            </tr>
            <tr className="border-t border-gray-100 bg-emerald-50/30">
              <td className="py-2 px-3 font-semibold text-gray-900">Commission on New Book</td>
              {years.map(y => <td key={y.year} className="py-2 px-3 text-right font-semibold text-emerald-700">{fmtM(y.commOnIncremental)}</td>)}
              <td className="py-2 px-3 text-right font-bold bg-emerald-100/50 text-emerald-800">{fmtM(commTotal)}</td>
            </tr>

            {/* Operational Efficiency */}
            <tr className="bg-sky-50/50">
              <td colSpan={years.length + 2} className="py-2 px-3 text-xs font-bold text-sky-800 uppercase tracking-widest border-t border-gray-200">2. Operational Efficiency</td>
            </tr>
            <tr className="border-t border-gray-100 hover:bg-gray-50">
              <td className="py-2 px-3 text-gray-700">Lift from Improved Bind Rate</td>
              {years.map(y => <td key={y.year} className="py-2 px-3 text-right text-gray-600">{fmtM(y.addlRevBind)}</td>)}
              <td className="py-2 px-3 text-right font-semibold bg-gray-50 text-gray-900">{fmtM(years.reduce((s,y)=>s+y.addlRevBind,0))}</td>
            </tr>
            <tr className="border-t border-gray-100 hover:bg-gray-50">
              <td className="py-2 px-3 text-gray-700">Time Savings Value</td>
              {years.map(y => <td key={y.year} className="py-2 px-3 text-right text-gray-600">{fmtM(y.timeSavingsVal)}</td>)}
              <td className="py-2 px-3 text-right font-semibold bg-gray-50 text-gray-900">{fmtM(years.reduce((s,y)=>s+y.timeSavingsVal,0))}</td>
            </tr>
            <tr className="border-t border-gray-100 hover:bg-gray-50">
              <td className="py-2 px-3 text-gray-700">Productivity Reinvestment</td>
              {years.map(y => <td key={y.year} className="py-2 px-3 text-right text-gray-600">{fmtM(y.productivityReinvest)}</td>)}
              <td className="py-2 px-3 text-right font-semibold bg-gray-50 text-gray-900">{fmtM(years.reduce((s,y)=>s+y.productivityReinvest,0))}</td>
            </tr>
            <tr className="border-t border-gray-100 hover:bg-gray-50">
              <td className="py-2 px-3 text-gray-700">Error Reduction Savings</td>
              {years.map(y => <td key={y.year} className="py-2 px-3 text-right text-gray-600">{fmtM(y.errorSavings)}</td>)}
              <td className="py-2 px-3 text-right font-semibold bg-gray-50 text-gray-900">{fmtM(years.reduce((s,y)=>s+y.errorSavings,0))}</td>
            </tr>
            <tr className="border-t border-gray-100 hover:bg-gray-50">
              <td className="py-2 px-3 text-gray-700">IT Maintenance Saved</td>
              {years.map(y => <td key={y.year} className="py-2 px-3 text-right text-gray-600">{fmtM(y.itSavings)}</td>)}
              <td className="py-2 px-3 text-right font-semibold bg-gray-50 text-gray-900">{fmtM(itSavingsTotal)}</td>
            </tr>

            {/* Total Value */}
            <tr className="border-t-2 border-gray-300 bg-gray-100">
              <td className="py-3 px-3 font-bold text-gray-900">Total Value Created</td>
              {years.map(y => <td key={y.year} className="py-3 px-3 text-right font-bold text-gray-900">{fmtM(y.totalValue)}</td>)}
              <td className="py-3 px-3 text-right font-black text-gray-900">{fmtM(doNothing)}</td>
            </tr>

            {/* Investment */}
            <tr className="bg-red-50/50">
              <td colSpan={years.length + 2} className="py-2 px-3 text-xs font-bold text-red-800 uppercase tracking-widest border-t border-gray-200">3. Investment</td>
            </tr>
            <tr className="border-t border-gray-100 hover:bg-gray-50">
              <td className="py-2 px-3 text-gray-700">CoverForce Fee</td>
              {years.map(y => <td key={y.year} className="py-2 px-3 text-right text-red-600">-{fmtM(y.cfCost)}</td>)}
              <td className="py-2 px-3 text-right font-semibold bg-gray-50 text-red-700">-{fmtM(totalCFSpend)}</td>
            </tr>

            {/* Net ROI */}
            <tr className="border-t-2 border-gray-900 bg-gray-900 text-white">
              <td className="py-3 px-3 font-bold">Net ROI</td>
              {years.map(y => <td key={y.year} className="py-3 px-3 text-right font-bold text-emerald-400">{fmtM(y.netROI)}</td>)}
              <td className="py-3 px-3 text-right font-black text-emerald-400">{fmtM(totalROI)}</td>
            </tr>
            
          </tbody>
        </table>
      </div>

    </div>
  );
}

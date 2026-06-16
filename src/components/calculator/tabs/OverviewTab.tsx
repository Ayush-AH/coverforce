import React from 'react';
import { CalculationResult } from '@/lib/calculations';
import { fmt, fmtM } from '@/lib/formatters';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function OverviewTab({ results }: { results: CalculationResult }) {
  const { years, totalROI, roiMult, payback, totalCFSpend, inputs, commTotal } = results;
  const yr1 = years[0];

  const chartData = years.map(y => ({
    name: `Year ${y.year}`,
    commOnIncremental: y.commOnIncremental,
    addlRevBind: y.addlRevBind,
    timeSavingsVal: y.timeSavingsVal,
    errorSavings: y.errorSavings,
    productivityReinvest: y.productivityReinvest,
    totalValue: y.totalValue
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg text-sm">
          <p className="font-bold text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex justify-between gap-4 mb-1">
              <span style={{ color: entry.color }}>{entry.name}</span>
              <span className="font-semibold text-gray-900">{fmtM(entry.value)}</span>
            </div>
          ))}
          <div className="border-t border-gray-100 mt-2 pt-2 flex justify-between gap-4 font-bold text-gray-900">
            <span>Total Value</span>
            <span>{fmtM(payload[0].payload.totalValue)}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 shadow-sm">
          <div className="text-3xl font-serif font-bold text-emerald-600 mb-1">{fmtM(totalROI)}</div>
          <div className="text-sm font-bold text-gray-900">{inputs.projYears}-Year Net ROI</div>
          <div className="text-xs text-gray-600 mt-1">{roiMult.toFixed(1)}x return per $1 invested</div>
        </div>
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-5 shadow-sm">
          <div className="text-3xl font-serif font-bold text-sky-700 mb-1">{payback.toFixed(1)} mo</div>
          <div className="text-sm font-bold text-gray-900">Payback Period</div>
          <div className="text-xs text-gray-600 mt-1">Months to full recovery</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 shadow-sm">
          <div className="text-3xl font-serif font-bold text-amber-600 mb-1">{fmtM(yr1?.totalValue)}</div>
          <div className="text-sm font-bold text-gray-900">Year 1 Value Created</div>
          <div className="text-xs text-gray-600 mt-1">Before Year 2 compounding</div>
        </div>
      </div>

      {/* Secondary KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm text-center">
          <div className="text-2xl font-serif font-bold text-gray-900 mb-1">{fmt(yr1?.hoursSaved)}h</div>
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">Hours Freed / Year</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm text-center">
          <div className="text-2xl font-serif font-bold text-gray-900 mb-1">{fmtM(yr1?.errorSavings)}</div>
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">Error Cost Eliminated</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm text-center">
          <div className="text-2xl font-serif font-bold text-emerald-600 mb-1">{fmt((yr1?.addlBoundPerYear || 0) / 12, 0)}/mo</div>
          <div className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Addl Bound Policies</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm text-center">
          <div className="text-2xl font-serif font-bold text-sky-600 mb-1">{fmtM(commTotal)}</div>
          <div className="text-xs font-bold text-sky-700 uppercase tracking-wide">{inputs.projYears}-Yr Comm. Growth</div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900">Total Value by Year — All Sources</h3>
        <p className="text-sm text-gray-500 mb-6">Stacked by value driver. Compounding premium commissions dominate as the renewal stack builds.</p>
        
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
              <YAxis tickFormatter={(val) => fmtM(val)} tickLine={false} axisLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
              <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
              <Bar dataKey="commOnIncremental" name="Commission on Growth" stackId="a" fill="#00875A" radius={[0, 0, 4, 4]} />
              <Bar dataKey="addlRevBind" name="Bind Rate Lift" stackId="a" fill="#0EA5E9" />
              <Bar dataKey="timeSavingsVal" name="Time Savings" stackId="a" fill="#B45309" />
              <Bar dataKey="errorSavings" name="Error Reduction" stackId="a" fill="#DC2626" />
              <Bar dataKey="productivityReinvest" name="Productivity Reinvest" stackId="a" fill="#7C3AED" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Exec Narrative */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm text-sm text-gray-700 leading-relaxed">
        <h3 className="text-lg font-bold text-gray-900 mb-3">Executive Narrative</h3>
        <p className="mb-3">
          At a <strong>{inputs.commissionRate}% commission rate</strong> on <strong>{fmtM(inputs.annualPremium)}</strong> in current premium, 
          with <strong>{inputs.newBizRate}% annual new business growth</strong> and <strong>{inputs.renewalRate}% renewal retention</strong>, 
          deploying CoverForce creates <strong className="text-emerald-600">{fmtM(totalROI)} in net value</strong> for {inputs.companyName} over {inputs.projYears} years 
          at a total investment of <strong>{fmtM(totalCFSpend)}</strong>.
        </p>
        <p className="mb-3">
          That is a <strong className="text-sky-600">{roiMult.toFixed(1)}x return</strong> with payback in <strong>{payback.toFixed(1)} months</strong>. 
          Year 1 alone generates <strong>{fmtM(yr1?.totalValue)}</strong> — {((yr1?.totalValue / totalCFSpend) * 100).toFixed(0)}% of the total {inputs.projYears}-year investment recovered in the first year.
        </p>
        <p>
          The compounding renewal stack is the key driver: every dollar of new premium written this year renews at {inputs.renewalRate}%, 
          stacking on next year's new business to create an expanding annuity that grows automatically. Waiting 12 months to deploy means 
          <strong className="text-red-600"> {fmtM(yr1?.totalValue)}</strong> in Year 1 value is permanently foregone — not deferred.
        </p>
      </div>

    </div>
  );
}

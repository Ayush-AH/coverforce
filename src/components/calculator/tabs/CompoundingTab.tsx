import React from 'react';
import { CalculationResult } from '@/lib/calculations';
import { fmtM, pct } from '@/lib/formatters';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function CompoundingTab({ results }: { results: CalculationResult }) {
  const { years, commTotal, inputs } = results;

  const totNewBiz = years.reduce((s, y) => s + y.newBizThisYear, 0);
  const totRenew = years.reduce((s, y) => s + y.renewalsThisYear, 0);
  const totIncr = years.reduce((s, y) => s + y.incrementalPremium, 0);

  const chartData = years.map(y => ({
    name: `Year ${y.year}`,
    renewalsThisYear: y.renewalsThisYear,
    newBizThisYear: y.newBizThisYear,
  }));

  const finalYr = years[years.length - 1];
  const renewalPercentage = finalYr ? (finalYr.renewalsThisYear / (finalYr.renewalsThisYear + finalYr.newBizThisYear)) : 0;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const total = payload[0].value + payload[1].value;
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
            <span>Total Incremental</span>
            <span>{fmtM(total)}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-1">The Compounding Renewal Engine</h3>
        <p className="text-sm text-gray-500 mb-6">Every policy written this year renews next year. That renewal stacks on top of next year's new business. This is the structural value of acting now vs. waiting — the compounding clock starts on day one.</p>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr>
                <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b-2 border-gray-200 bg-gray-50 rounded-tl-lg">Year</th>
                <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right border-b-2 border-gray-200 bg-gray-50">New Business Added</th>
                <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right border-b-2 border-gray-200 bg-gray-50">Renewals from Prior</th>
                <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right border-b-2 border-gray-200 bg-gray-50">Total Incremental Premium</th>
                <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right border-b-2 border-gray-200 bg-gray-50">Commission at {inputs.commissionRate}%</th>
                <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right border-b-2 border-gray-200 bg-gray-50 rounded-tr-lg">Cumulative New Book</th>
              </tr>
            </thead>
            <tbody>
              {years.map(y => (
                <tr key={y.year} className="hover:bg-gray-50 border-b border-gray-100 transition-colors">
                  <td className="py-3 px-4 text-sm font-semibold text-gray-900">Year {y.year}</td>
                  <td className="py-3 px-4 text-sm text-gray-900 text-right">{fmtM(y.newBizThisYear)}</td>
                  <td className="py-3 px-4 text-sm font-bold text-emerald-600 text-right">{fmtM(y.renewalsThisYear)}</td>
                  <td className="py-3 px-4 text-sm font-bold text-sky-700 text-right">{fmtM(y.incrementalPremium)}</td>
                  <td className="py-3 px-4 text-sm font-bold text-emerald-600 text-right">{fmtM(y.commOnIncremental)}</td>
                  <td className="py-3 px-4 text-sm font-bold text-amber-600 text-right">{fmtM(y.cumNewPremium)}</td>
                </tr>
              ))}
              <tr className="bg-gray-50 border-t-2 border-gray-200 font-bold">
                <td className="py-3 px-4 text-sm text-gray-900 rounded-bl-lg">Total</td>
                <td className="py-3 px-4 text-sm text-gray-900 text-right">{fmtM(totNewBiz)}</td>
                <td className="py-3 px-4 text-sm text-emerald-600 text-right">{fmtM(totRenew)}</td>
                <td className="py-3 px-4 text-sm text-sky-700 text-right">{fmtM(totIncr)}</td>
                <td className="py-3 px-4 text-sm text-emerald-600 text-right">{fmtM(commTotal)}</td>
                <td className="py-3 px-4 text-sm text-amber-600 text-right rounded-br-lg">{fmtM(finalYr?.cumNewPremium)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-1">New Business vs. Renewal Stack — Growing Annuity</h3>
        <p className="text-sm text-gray-500 mb-6">The green (renewals) band expands every year, demonstrating the annuity effect of acting now.</p>
        
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
              <YAxis tickFormatter={(val) => fmtM(val)} tickLine={false} axisLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
              <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
              <Bar dataKey="renewalsThisYear" name="Renewals from Prior Years" stackId="a" fill="#10B981" radius={[0, 0, 4, 4]} />
              <Bar dataKey="newBizThisYear" name="Net New Business This Year" stackId="a" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl p-5 text-sm text-gray-800 leading-relaxed shadow-sm">
        <strong>Key Insight:</strong> By Year {inputs.projYears}, the renewal book represents <strong>{pct(renewalPercentage)}</strong> of total incremental premium — meaning growth is increasingly automatic. The total {inputs.projYears}-year commission on compounding new premium is <strong>{fmtM(commTotal)}</strong>.
      </div>

    </div>
  );
}

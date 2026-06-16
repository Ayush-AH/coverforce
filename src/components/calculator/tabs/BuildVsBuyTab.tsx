import React from 'react';
import { CalculationResult } from '@/lib/calculations';
import { fmtM } from '@/lib/formatters';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function BuildVsBuyTab({ results }: { results: CalculationResult }) {
  const { years, totalCFSpend, buildTotal, inputs, integrationBuildCost, integrationAnnualCost, integrationComplexityMultiplier } = results;

  const chartData = years.map(y => {
    // We want cumulative costs to show the expanding gap
    const prevInHouse = y.year === 1 ? 0 : years.slice(0, y.year - 1).reduce((s, prev) => s + prev.buildCost, 0);
    const prevCF = y.year === 1 ? 0 : years.slice(0, y.year - 1).reduce((s, prev) => s + prev.cfCost, 0);
    
    return {
      name: `Year ${y.year}`,
      inHouseCumulative: prevInHouse + y.buildCost,
      cfCumulative: prevCF + y.cfCost,
      inHouseAnnual: y.buildCost,
      cfAnnual: y.cfCost
    };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg text-sm">
          <p className="font-bold text-gray-900 mb-2">{label} (Cumulative Cost)</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex justify-between gap-4 mb-1">
              <span style={{ color: entry.color }}>{entry.name}</span>
              <span className="font-semibold text-gray-900">{fmtM(entry.value)}</span>
            </div>
          ))}
          <div className="border-t border-gray-100 mt-2 pt-2 flex justify-between gap-4 font-bold text-red-600">
            <span>Cost Avoided</span>
            <span>{fmtM(payload[0].value - payload[1].value)}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-gray-900">Total Cost of Ownership ({inputs.projYears} Yr)</h3>
          </div>
          <div className="flex items-end gap-4 mt-4">
            <div>
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">In-House Build</div>
              <div className="text-3xl font-serif text-red-600 font-bold">{fmtM(buildTotal)}</div>
            </div>
            <div className="text-xl font-bold text-gray-300 mb-1">vs</div>
            <div>
              <div className="text-[10px] font-bold text-sky-700 uppercase tracking-widest mb-1">CoverForce</div>
              <div className="text-3xl font-serif text-sky-700 font-bold">{fmtM(totalCFSpend)}</div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-gray-900">Cost Avoidance</h3>
          </div>
          <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest mb-1">Capital Saved by Buying</div>
          <div className="text-3xl font-serif text-emerald-600 font-bold mt-4">{fmtM(buildTotal - totalCFSpend)}</div>
          <div className="text-xs text-gray-500 mt-1">Free cash flow available for revenue-generating investments</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Carrier Integrations Logic */}
        <div className="md:col-span-1 bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            🔌 The Integration Trap
          </h3>
          <div className="text-xs text-gray-600 leading-relaxed mb-4">
            Building <strong>{inputs.carrierIntegrations} carrier integrations</strong> isn't just {inputs.carrierIntegrations}x the work. Each new API exponentially increases the maintenance burden due to differing data standards, auth methods, and constant schema changes.
          </div>
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
            <div className="flex justify-between text-[11px] mb-2">
              <span className="text-gray-500">Complexity Multiplier</span>
              <span className="font-bold text-gray-900">{integrationComplexityMultiplier.toFixed(2)}x</span>
            </div>
            <div className="flex justify-between text-[11px] mb-2">
              <span className="text-gray-500">Year 1 Integration Cost</span>
              <span className="font-bold text-red-600">{fmtM(integrationBuildCost)}</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-gray-500">Annual API Maintenance</span>
              <span className="font-bold text-red-600">{fmtM(integrationAnnualCost)}</span>
            </div>
          </div>
          <div className="mt-4 text-[10px] text-gray-400 leading-relaxed italic">
            "We thought we could build it for $100k. We spent $500k just keeping the APIs connected when the carriers updated their systems."
          </div>
        </div>

        {/* Chart */}
        <div className="md:col-span-2 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-1">Cumulative Cash Outflow</h3>
          <p className="text-sm text-gray-500 mb-6">Visualizing the capital efficiency of renting infrastructure vs. building it.</p>
          
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorInHouse" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCF" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                <YAxis tickFormatter={(val) => fmtM(val)} tickLine={false} axisLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                <Tooltip cursor={{ stroke: '#94A3B8', strokeWidth: 1, strokeDasharray: '4 4' }} content={<CustomTooltip />} />
                <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
                <Area type="monotone" dataKey="inHouseCumulative" name="In-House Build & Maintain" stroke="#EF4444" strokeWidth={3} fillOpacity={1} fill="url(#colorInHouse)" />
                <Area type="monotone" dataKey="cfCumulative" name="CoverForce Subscription" stroke="#0EA5E9" strokeWidth={3} fillOpacity={1} fill="url(#colorCF)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}

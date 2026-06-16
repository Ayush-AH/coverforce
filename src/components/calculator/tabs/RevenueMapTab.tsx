import React from 'react';
import { CalculationResult, LOB_COMMERCIAL, LOB_PERSONAL } from '@/lib/calculations';
import { fmtM, pct } from '@/lib/formatters';

const LOB_COLORS_COMM = ['#0EA5E9','#0284C7','#00875A','#0057FF','#6366F1','#8B5CF6','#EC4899','#F59E0B'];
const LOB_COLORS_PERS = ['#B45309','#D97706','#92400E','#78350F'];

export default function RevenueMapTab({ results }: { results: CalculationResult }) {
  const { inputs, lobBreakdown, totalROI } = results;
  const ap = inputs.annualPremium;

  const commMax = Math.max(...lobBreakdown.commLOBs.map(l => l.premium), 1);
  const persMax = Math.max(...lobBreakdown.persLOBs.map(l => l.premium), 1);

  const commOffPremium = lobBreakdown.commLOBs.filter(l => !l.on).reduce((s,l) => s + l.premium, 0);

  return (
    <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm text-center">
          <div className="text-3xl font-serif text-emerald-600 mb-1">{fmtM(lobBreakdown.cfReachable)}</div>
          <div className="text-xs font-semibold text-gray-500 mb-1">Premium in CoverForce Reach</div>
          <div className="text-[10px] text-gray-400">{(lobBreakdown.cfReachable / ap * 100).toFixed(0)}% of total book</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm text-center">
          <div className="text-3xl font-serif text-sky-700 mb-1">{fmtM(lobBreakdown.commTotal)}</div>
          <div className="text-xs font-semibold text-gray-500 mb-1">Total Commercial Premium</div>
          <div className="text-[10px] text-gray-400">{inputs.commPct}% of book</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm text-center">
          <div className="text-3xl font-serif text-amber-600 mb-1">{fmtM(lobBreakdown.persTotal)}</div>
          <div className="text-xs font-semibold text-gray-500 mb-1">Personal Lines (Pain Quantified)</div>
          <div className="text-[10px] text-gray-400">{100 - inputs.commPct}% of book · CoverForce not applicable</div>
        </div>
      </div>

      {/* Full Book Stacked Bar */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-bold text-gray-900 mb-1">Your Full Book — Where Every Dollar Lives</h3>
        <p className="text-xs text-gray-500 mb-4">Each segment is sized to your inputs. Green = CoverForce can help today. Amber = Personal lines. Gray = Commercial not yet selected.</p>
        
        <div className="h-12 rounded-lg flex overflow-hidden shadow-sm mb-3">
          {lobBreakdown.commLOBs.map((l, i) => {
            const w = (l.premium / ap * 100).toFixed(2);
            const col = l.on ? LOB_COLORS_COMM[i % LOB_COLORS_COMM.length] : '#CBD5E1';
            return parseFloat(w) > 0.5 ? (
              <div key={l.id} className="h-full flex items-center justify-center text-[10px] font-bold text-white overflow-hidden transition-all duration-500" style={{ width: `${w}%`, background: col }} title={`${l.label}: ${fmtM(l.premium)}`}>
                <span className="truncate px-2">{l.label}</span>
              </div>
            ) : null;
          })}
          {lobBreakdown.persLOBs.map((l, i) => {
            const w = (l.premium / ap * 100).toFixed(2);
            const col = LOB_COLORS_PERS[i % LOB_COLORS_PERS.length];
            return parseFloat(w) > 0.5 ? (
              <div key={l.id} className="h-full flex items-center justify-center text-[10px] font-bold text-white overflow-hidden transition-all duration-500" style={{ width: `${w}%`, background: col }} title={`${l.label}: ${fmtM(l.premium)}`}>
                <span className="truncate px-2">{l.label}</span>
              </div>
            ) : null;
          })}
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {lobBreakdown.commLOBs.map((l, i) => {
            const w = (l.premium / ap * 100).toFixed(2);
            const col = l.on ? LOB_COLORS_COMM[i % LOB_COLORS_COMM.length] : '#CBD5E1';
            return parseFloat(w) > 0.5 ? (
              <div key={l.id} className="flex items-center gap-1.5 text-[10px] text-gray-700">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ background: col }}></div>
                <span>{l.label} {fmtM(l.premium)}</span>
              </div>
            ) : null;
          })}
          {lobBreakdown.persLOBs.map((l, i) => {
            const w = (l.premium / ap * 100).toFixed(2);
            const col = LOB_COLORS_PERS[i % LOB_COLORS_PERS.length];
            return parseFloat(w) > 0.5 ? (
              <div key={l.id} className="flex items-center gap-1.5 text-[10px] text-gray-700">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ background: col }}></div>
                <span>{l.label} {fmtM(l.premium)}</span>
              </div>
            ) : null;
          })}
        </div>
      </div>

      {/* Spilt Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Commercial Lines */}
        <div className="bg-white border border-sky-200 ring-2 ring-sky-500/10 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-sky-500"></div>
            <h3 className="text-[10px] font-bold tracking-widest uppercase text-gray-500 flex-1">Commercial Lines</h3>
            <span className="text-[9px] font-bold bg-sky-500 text-white px-2 py-0.5 rounded-full">{inputs.commPct}%</span>
          </div>

          <div className="mb-6">
            <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Admitted vs E&amp;S</div>
            <div className="flex h-8 rounded-lg overflow-hidden mb-2">
              <div className="flex items-center justify-center text-[10px] font-bold text-white bg-emerald-500" style={{ width: `${inputs.admittedPct}%` }}>Admitted {inputs.admittedPct}%</div>
              <div className="flex items-center justify-center text-[10px] font-bold text-white bg-blue-600" style={{ width: `${100 - inputs.admittedPct}%` }}>E&amp;S {100 - inputs.admittedPct}%</div>
            </div>
            <div className="flex gap-4 text-[11px]">
              <span className="font-bold text-emerald-600">{fmtM(lobBreakdown.admTotal)} Admitted</span>
              <span className="font-bold text-blue-600">{fmtM(lobBreakdown.ensTotal)} E&amp;S</span>
            </div>
          </div>

          <hr className="border-gray-100 my-4" />
          <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">By Line of Business</div>

          <div className="flex flex-col gap-2">
            {lobBreakdown.commLOBs.map((l, i) => {
              const barW = (l.premium / commMax * 100).toFixed(1);
              const col = l.on ? LOB_COLORS_COMM[i % LOB_COLORS_COMM.length] : '#CBD5E1';
              return (
                <div key={l.id}>
                  <div className="flex justify-between items-center text-[11px] mb-1">
                    <div className="font-medium text-gray-900 flex items-center gap-1.5">
                      {l.on 
                        ? <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 tracking-wider">CF ✓</span> 
                        : <span className="text-[8px] font-bold text-gray-400 tracking-wider">OFF</span>
                      }
                      {l.label}
                    </div>
                    <div className="font-bold text-gray-900">{fmtM(l.premium)}</div>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${barW}%`, background: col }}></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Personal Lines */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
            <h3 className="text-[10px] font-bold tracking-widest uppercase text-gray-500 flex-1">Personal Lines</h3>
            <span className="text-[9px] font-bold bg-amber-500 text-white px-2 py-0.5 rounded-full">{100 - inputs.commPct}%</span>
          </div>

          <div className="bg-amber-50 border-l-2 border-amber-500 p-3 rounded-r-lg text-[11px] leading-relaxed text-gray-800 mb-6">
            <strong>Pain quantification only.</strong> CoverForce does not currently serve personal lines — but showing this premium helps executives see the full scope of the digital transformation gap.
          </div>

          <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">By Line of Business</div>
          
          <div className="flex flex-col gap-2">
            {lobBreakdown.persLOBs.map((l, i) => {
              const barW = (l.premium / persMax * 100).toFixed(1);
              return (
                <div key={l.id}>
                  <div className="flex justify-between items-center text-[11px] mb-1">
                    <div className="font-medium text-gray-900 flex items-center gap-1.5">
                      <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 tracking-wider uppercase">Pain Only</span>
                      {l.label}
                    </div>
                    <div className="font-bold text-gray-900">{fmtM(l.premium)}</div>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${barW}%`, background: LOB_COLORS_PERS[i % 4] }}></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Pain Callouts */}
      <div className="flex flex-col gap-3">
        {lobBreakdown.persTotal > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="text-sm font-bold text-gray-900 mb-1">💡 {fmtM(lobBreakdown.persTotal)} in Personal Lines — the size of the gap</div>
            <div className="text-xs text-gray-700 leading-relaxed">
              {inputs.companyName} is managing <strong>{fmtM(lobBreakdown.persTotal)}</strong> ({100 - inputs.commPct}% of book) in personal lines without a CoverForce equivalent. While CoverForce can't help here today, this premium represents the scale of the digital workflow problem you're solving in commercial — and it signals how much operational leverage is still on the table.
            </div>
          </div>
        )}
        {commOffPremium > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="text-sm font-bold text-gray-900 mb-1">🔴 {fmtM(commOffPremium)} in commercial lines not yet in scope</div>
            <div className="text-xs text-gray-700 leading-relaxed">
              You've toggled off some commercial LOBs — that's <strong>{fmtM(commOffPremium)}</strong> in commercial premium still handled manually. Turning these on expands the CoverForce opportunity to the full <strong>{fmtM(lobBreakdown.commTotal)}</strong> commercial book.
            </div>
          </div>
        )}
        {lobBreakdown.cfReachable > 0 && (
          <div className="bg-emerald-50 border border-emerald-500 rounded-xl p-4">
            <div className="text-sm font-bold text-gray-900 mb-1">✅ {fmtM(lobBreakdown.cfReachable)} in premium CoverForce can transform today</div>
            <div className="text-xs text-gray-700 leading-relaxed">
              At a {inputs.commissionRate}% commission rate, <strong>{fmtM(lobBreakdown.cfReachable)}</strong> in addressable premium represents <strong>{fmtM(lobBreakdown.cfReachable * inputs.commissionRate / 100)}</strong> in annual commission — the base that compounds with every new policy written.
            </div>
          </div>
        )}
      </div>

      {/* ROI Tie-In */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-bold text-gray-900 mb-1">What This Means for Your ROI</h3>
        <p className="text-xs text-gray-500 mb-5">The revenue model adjusts to only count premium in CoverForce's reach (commercial lines you've selected). Here's what that unlocks:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-serif text-emerald-600 mb-1">{fmtM(totalROI)}</div>
            <div className="text-[11px] font-bold text-gray-900 mb-0.5">{inputs.projYears}-Year Net ROI</div>
            <div className="text-[10px] text-gray-500">Based on {fmtM(lobBreakdown.cfReachable)} in reach</div>
          </div>
          <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-serif text-sky-700 mb-1">{fmtM(lobBreakdown.cfReachable * inputs.commissionRate / 100)}</div>
            <div className="text-[11px] font-bold text-gray-900 mb-0.5">Annual Commission at Stake</div>
            <div className="text-[10px] text-gray-500">{inputs.commPct}% of book × {inputs.commissionRate}% rate</div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-serif text-amber-600 mb-1">{fmtM(lobBreakdown.persTotal)}</div>
            <div className="text-[11px] font-bold text-gray-900 mb-0.5">Personal Lines Pain Quantified</div>
            <div className="text-[10px] text-gray-500">Full digital gap for executives</div>
          </div>
        </div>
      </div>

    </div>
  );
}

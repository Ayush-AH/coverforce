import React, { useState } from 'react';
import { CalculatorInputs, SEGMENTS, CalculationResult } from '@/lib/calculations';
import { exportToCSV, exportToPDF, copyShareText } from '@/lib/exportUtils';
import { Copy, FileSpreadsheet, FileText, Loader2 } from 'lucide-react';

interface Props {
  inputs: CalculatorInputs;
  updateInput: (key: keyof CalculatorInputs, value: any) => void;
  applySegment: (segment: keyof typeof SEGMENTS) => void;
  results: CalculationResult;
}

export default function CompanyBar({ inputs, updateInput, applySegment, results }: Props) {
  const [activeSegment, setActiveSegment] = useState<keyof typeof SEGMENTS>('mid');
  const [isExporting, setIsExporting] = useState(false);

  const handleSegmentClick = (seg: keyof typeof SEGMENTS) => {
    setActiveSegment(seg);
    applySegment(seg);
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 px-4 md:px-10 py-5 bg-white border-b border-gray-200">
      <div className="flex-1 w-full md:w-auto">
        <input 
          className="w-full text-2xl md:text-3xl font-serif text-gray-900 border-none outline-none focus:ring-0 bg-transparent placeholder-gray-300"
          placeholder="Enter prospect name…"
          value={inputs.companyName}
          onChange={(e) => updateInput('companyName', e.target.value)}
        />
      </div>
      
      <div className="flex items-center gap-3">
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Company Size</div>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          {(['startup', 'mid', 'enterprise'] as const).map(seg => (
            <button
              key={seg}
              onClick={() => handleSegmentClick(seg)}
              className={`px-3 py-1.5 text-[11.5px] font-semibold rounded-md transition-all ${
                activeSegment === seg 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {seg === 'startup' ? 'Startup' : seg === 'mid' ? 'Mid-Market' : 'Enterprise'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Projection</div>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          {[3, 5].map(years => (
            <button
              key={years}
              onClick={() => updateInput('projYears', years)}
              className={`px-3 py-1.5 text-[11.5px] font-semibold rounded-md transition-all ${
                inputs.projYears === years 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {years} Years
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 border-l border-gray-200 pl-4 md:pl-6 ml-2">
        <button 
          onClick={() => copyShareText(results, inputs.companyName)}
          className="flex items-center gap-1.5 px-3 py-2 text-[11.5px] font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors border border-gray-200"
          title="Copy Executive Summary to Clipboard"
        >
          <Copy className="w-3.5 h-3.5" /> Copy
        </button>
        <button 
          onClick={() => exportToCSV(results, inputs.companyName)}
          className="flex items-center gap-1.5 px-3 py-2 text-[11.5px] font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors border border-gray-200"
          title="Export Model to CSV"
        >
          <FileSpreadsheet className="w-3.5 h-3.5" /> CSV
        </button>
        <button 
          onClick={() => exportToPDF('calculator-main-view', inputs.companyName)}
          className="flex items-center gap-1.5 px-4 py-2 text-[11.5px] font-bold text-white bg-sky-600 hover:bg-sky-700 disabled:bg-sky-400 rounded-lg transition-colors shadow-sm print:hidden"
          title="Print or Save as PDF"
        >
          <FileText className="w-3.5 h-3.5" /> PDF
        </button>
      </div>
    </div>
  );
}

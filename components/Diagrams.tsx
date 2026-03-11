
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Activity, Dna, BarChart2, CheckCircle2, AlertCircle } from 'lucide-react';

// --- IVD DIAGNOSTIC DIAGRAM (cobas BRAF V600 Test) ---
export const SurfaceCodeDiagram: React.FC = () => {
  const [cycle, setCycle] = useState(0);
  const [isMutated, setIsMutated] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
        setCycle(c => (c >= 40 ? 0 : c + 2));
    }, 200);
    return () => clearInterval(interval);
  }, []);

  // Simulate PCR amplification curve
  const getFluorescence = (c: number, mutated: boolean) => {
      if (!mutated) return 5; // Baseline noise for wild-type
      // Sigmoidal curve for mutant amplification
      const threshold = 20;
      const max = 100;
      return 5 + max / (1 + Math.exp(-0.5 * (c - threshold)));
  };

  const currentFluorescence = getFluorescence(cycle, isMutated);

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-sm border border-stone-200 my-8">
      <h3 className="font-serif text-xl mb-4 text-stone-800">cobas® Real-Time PCR Amplification</h3>
      <p className="text-sm text-stone-500 mb-6 text-center max-w-md">
        The test uses fluorescent probes specific to the <strong>T1799A mutation</strong>. Watch the amplification curve rise as the mutant DNA is exponentially copied.
      </p>
      
      <div className="w-full max-w-sm flex justify-center gap-4 mb-6">
          <button 
            onClick={() => { setIsMutated(true); setCycle(0); }}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-colors ${isMutated ? 'bg-nobel-gold text-white' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}
          >
              BRAF V600E (Mutant)
          </button>
          <button 
            onClick={() => { setIsMutated(false); setCycle(0); }}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-colors ${!isMutated ? 'bg-stone-800 text-white' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}
          >
              BRAF Wild-Type
          </button>
      </div>

      <div className="relative w-full max-w-sm h-48 bg-[#F5F4F0] rounded-lg border border-stone-200 p-4 flex items-end overflow-hidden">
         {/* Grid Lines */}
         <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 opacity-20">
            <div className="w-full h-[1px] bg-stone-400"></div>
            <div className="w-full h-[1px] bg-stone-400"></div>
            <div className="w-full h-[1px] bg-stone-400"></div>
            <div className="w-full h-[1px] bg-stone-400"></div>
         </div>

         {/* Amplification Curve */}
         <div className="absolute bottom-4 left-4 right-4 top-4 flex items-end">
             {[...Array(20)].map((_, i) => {
                 const c = i * 2;
                 const f = getFluorescence(c, isMutated);
                 const isCurrent = c <= cycle;
                 return (
                     <div key={i} className="flex-1 flex justify-center items-end h-full">
                         <motion.div 
                            className={`w-full mx-[1px] rounded-t-sm ${isMutated ? 'bg-nobel-gold' : 'bg-stone-400'}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ 
                                height: isCurrent ? `${f}%` : '0%',
                                opacity: isCurrent ? 1 : 0.2
                            }}
                            transition={{ duration: 0.1 }}
                         />
                     </div>
                 )
             })}
         </div>
         
         {/* Threshold Line */}
         <div className="absolute left-0 right-0 bottom-12 border-b-2 border-dashed border-red-500/50 z-10">
             <span className="absolute -top-4 right-2 text-[10px] text-red-500 font-bold uppercase">Threshold</span>
         </div>
      </div>

      <div className="mt-6 flex items-center justify-between w-full max-w-sm px-4">
          <div className="text-xs font-mono text-stone-500">CYCLE: {cycle}</div>
          <div className="text-xs font-mono font-bold text-stone-800">
              SIGNAL: {currentFluorescence.toFixed(1)}
          </div>
      </div>
      
      <div className="mt-4 h-6 text-sm font-serif italic flex items-center gap-2">
        {isMutated && currentFluorescence > 25 ? (
            <span className="text-nobel-gold flex items-center gap-1"><AlertCircle size={16}/> Mutation Detected (Positive)</span>
        ) : cycle > 30 && !isMutated ? (
            <span className="text-stone-600 flex items-center gap-1"><CheckCircle2 size={16}/> Wild-Type (Negative)</span>
        ) : (
            <span className="text-stone-400">Amplifying...</span>
        )}
      </div>
    </div>
  );
};

// --- KINASE INHIBITOR DIAGRAM (Vemurafenib) ---
export const TransformerDecoderDiagram: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setStep(s => (s + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center p-8 bg-[#F5F4F0] rounded-xl border border-stone-200 my-8">
      <h3 className="font-serif text-xl mb-4 text-stone-900">Competitive Inhibition</h3>
      <p className="text-sm text-stone-600 mb-6 text-center max-w-md">
        Vemurafenib binds selectively to the ATP-binding pocket of the mutated BRAF V600E kinase, preventing downstream signaling.
      </p>

      <div className="relative w-full max-w-lg h-56 bg-white rounded-lg shadow-inner overflow-hidden mb-6 border border-stone-200 flex items-center justify-center gap-8 p-4">
        
        {/* ATP Stage */}
        <div className="flex flex-col items-center gap-2">
            <div className={`w-16 h-16 rounded-full border-2 flex flex-col items-center justify-center transition-colors duration-500 ${step === 0 ? 'border-orange-500 bg-orange-100' : 'border-stone-200 bg-stone-50'}`}>
                <span className={`font-bold ${step === 0 ? 'text-orange-600' : 'text-stone-300'}`}>ATP</span>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500">Energy Source</span>
        </div>

        {/* Arrows */}
        <motion.div animate={{ opacity: step >= 1 ? 1 : 0.3, x: step >= 1 ? 0 : -5 }}>→</motion.div>

        {/* Kinase Stage */}
        <div className="flex flex-col items-center gap-2">
             <div className={`w-28 h-24 rounded-3xl border-2 flex flex-col items-center justify-center gap-2 transition-colors duration-500 relative overflow-hidden ${step === 1 || step === 2 ? 'border-stone-800 bg-stone-900 text-white' : 'border-stone-200 bg-stone-50'}`}>
                <div className="text-xs font-bold tracking-widest text-stone-400">BRAF V600E</div>
                {/* Active Site Pocket */}
                <div className={`w-12 h-6 rounded-b-full border-t-0 border-2 absolute top-0 ${step === 1 ? 'border-orange-500 bg-orange-500/20' : step === 2 ? 'border-nobel-gold bg-nobel-gold/20' : 'border-stone-300'}`}></div>
                
                {/* Vemurafenib Molecule entering */}
                <AnimatePresence>
                    {step === 2 && (
                        <motion.div 
                            initial={{ y: -30, opacity: 0 }}
                            animate={{ y: -10, opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute top-0 w-8 h-8 bg-nobel-gold rounded-sm rotate-45 flex items-center justify-center shadow-lg"
                        >
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                        </motion.div>
                    )}
                </AnimatePresence>
             </div>
             <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500">Mutant Kinase</span>
        </div>

        {/* Arrows */}
        <motion.div animate={{ opacity: step >= 3 ? 1 : 0.3, x: step >= 3 ? 0 : -5 }}>→</motion.div>

        {/* Output Stage (MEK/ERK) */}
        <div className="flex flex-col items-center gap-2">
            <div className={`w-16 h-16 rounded-lg border-2 flex flex-col items-center justify-center transition-colors duration-500 ${step === 1 ? 'border-red-500 bg-red-50' : step === 3 ? 'border-stone-300 bg-stone-100' : 'border-stone-200 bg-stone-50'}`}>
                {step === 1 ? (
                    <span className="text-xs font-bold text-red-600 text-center leading-tight">TUMOR<br/>GROWTH</span>
                ) : step === 3 ? (
                    <span className="text-xs font-bold text-stone-400 text-center leading-tight">CELL<br/>DEATH</span>
                ) : (
                    <span className="text-2xl font-serif text-stone-300">?</span>
                )}
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500">Downstream</span>
        </div>

      </div>

      <div className="flex gap-2">
          {[0, 1, 2, 3].map(s => (
              <div key={s} className={`h-1 rounded-full transition-all duration-300 ${step === s ? 'w-8 bg-nobel-gold' : 'w-2 bg-stone-300'}`}></div>
          ))}
      </div>
      <div className="mt-4 text-xs font-mono text-stone-500 text-center h-4">
          {step === 0 && "ATP approaches the kinase domain..."}
          {step === 1 && "ATP binds, driving uncontrolled proliferation."}
          {step === 2 && "Vemurafenib competitively blocks the ATP pocket."}
          {step === 3 && "Signaling is halted, inducing apoptosis."}
      </div>
    </div>
  );
};

// --- PERFORMANCE CHART (Survival Curve) ---
export const PerformanceMetricDiagram: React.FC = () => {
    const [metric, setMetric] = useState<'PFS' | 'OS'>('OS');
    
    // Simulated Kaplan-Meier data points (Months -> Survival Probability %)
    const data = {
        PFS: {
            vemurafenib: [100, 80, 65, 53, 40, 25, 15],
            dacarbazine: [100, 45, 20, 10, 5, 2, 0]
        },
        OS: {
            vemurafenib: [100, 92, 84, 75, 60, 45, 30],
            dacarbazine: [100, 80, 60, 45, 30, 20, 10]
        }
    };

    const currentData = data[metric];
    const months = [0, 2, 4, 6, 8, 10, 12];

    return (
        <div className="flex flex-col md:flex-row gap-8 items-center p-8 bg-stone-900 text-stone-100 rounded-xl my-8 border border-stone-800 shadow-lg">
            <div className="flex-1 min-w-[240px]">
                <h3 className="font-serif text-xl mb-2 text-nobel-gold">BRIM-3 Clinical Trial</h3>
                <p className="text-stone-400 text-sm mb-4 leading-relaxed">
                    Vemurafenib demonstrated significant improvements in both Overall Survival (OS) and Progression-Free Survival (PFS) compared to standard dacarbazine.
                </p>
                <div className="flex gap-2 mt-6">
                    <button 
                        onClick={() => setMetric('OS')} 
                        className={`px-3 py-1.5 rounded text-sm font-medium transition-all duration-200 border ${metric === 'OS' ? 'bg-nobel-gold text-stone-900 border-nobel-gold' : 'bg-transparent text-stone-400 border-stone-700 hover:border-stone-500 hover:text-stone-200'}`}
                    >
                        Overall Survival
                    </button>
                    <button 
                        onClick={() => setMetric('PFS')} 
                        className={`px-3 py-1.5 rounded text-sm font-medium transition-all duration-200 border ${metric === 'PFS' ? 'bg-nobel-gold text-stone-900 border-nobel-gold' : 'bg-transparent text-stone-400 border-stone-700 hover:border-stone-500 hover:text-stone-200'}`}
                    >
                        Progression-Free
                    </button>
                </div>
                <div className="mt-6 font-mono text-xs text-stone-500 flex items-center gap-2">
                    <BarChart2 size={14} className="text-nobel-gold" /> 
                    <span>SURVIVAL PROBABILITY (%)</span>
                </div>
            </div>
            
            <div className="relative w-full max-w-xs h-64 bg-stone-800/50 rounded-xl border border-stone-700/50 p-6 flex items-end">
                {/* Background Grid Lines */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none opacity-10">
                   {[100, 75, 50, 25, 0].map(val => (
                       <div key={val} className="w-full h-[1px] bg-stone-400 relative">
                           <span className="absolute -left-6 -top-2 text-[8px]">{val}</span>
                       </div>
                   ))}
                </div>

                {/* X-Axis Labels */}
                <div className="absolute bottom-1 left-6 right-6 flex justify-between text-[8px] text-stone-500 font-mono">
                    {months.map(m => <span key={m}>{m}m</span>)}
                </div>

                {/* SVG Lines for Curves */}
                <svg className="absolute inset-0 w-full h-full p-6 overflow-visible" preserveAspectRatio="none">
                    {/* Dacarbazine Line */}
                    <motion.polyline
                        points={currentData.dacarbazine.map((val, i) => `${(i / 6) * 100}%, ${(100 - val)}%`).join(' ')}
                        fill="none"
                        stroke="#6b7280"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1 }}
                    />
                    {/* Vemurafenib Line */}
                    <motion.polyline
                        points={currentData.vemurafenib.map((val, i) => `${(i / 6) * 100}%, ${(100 - val)}%`).join(' ')}
                        fill="none"
                        stroke="#C5A059"
                        strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    />
                </svg>

                {/* Legend */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 bg-stone-900/80 p-2 rounded text-[10px] border border-stone-700">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-1 bg-nobel-gold"></div>
                        <span className="text-stone-200">Vemurafenib</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-1 bg-stone-500"></div>
                        <span className="text-stone-400">Dacarbazine</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

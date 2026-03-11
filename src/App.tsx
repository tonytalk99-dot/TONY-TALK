
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene, QuantumComputerScene } from './components/QuantumScene';
import { SurfaceCodeDiagram, TransformerDecoderDiagram, PerformanceMetricDiagram } from './components/Diagrams';
import { ArrowDown, Menu, X, BookOpen, Dna } from 'lucide-react';

const AuthorCard = ({ name, role, delay }: { name: string, role: string, delay: string }) => {
  return (
    <div className="flex flex-col group animate-fade-in-up items-center p-8 bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-xs hover:border-nobel-gold/50" style={{ animationDelay: delay }}>
      <h3 className="font-serif text-2xl text-stone-900 text-center mb-3">{name}</h3>
      <div className="w-12 h-0.5 bg-nobel-gold mb-4 opacity-60"></div>
      <p className="text-xs text-stone-500 font-bold uppercase tracking-widest text-center leading-relaxed">{role}</p>
    </div>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Account for fixed header offset
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F4] text-stone-800 selection:bg-nobel-gold selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#F9F8F4]/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-nobel-gold rounded-full flex items-center justify-center text-white shadow-sm"><Dna size={18} /></div>
            <span className={`font-serif font-bold text-lg tracking-wide transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              ROCHE <span className="font-normal text-stone-500">PHC</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-stone-600">
            <a href="#introduction" onClick={scrollToSection('introduction')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">引言</a>
            <a href="#science" onClick={scrollToSection('science')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">作用机理</a>
            <a href="#impact" onClick={scrollToSection('impact')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">临床影响</a>
            <a href="#authors" onClick={scrollToSection('authors')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">研发团队</a>
            <a 
              href="https://diagnostics.roche.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-5 py-2 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-colors shadow-sm cursor-pointer"
            >
              了解更多
            </a>
          </div>

          <button className="md:hidden text-stone-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F9F8F4] flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in">
            <a href="#introduction" onClick={scrollToSection('introduction')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">引言</a>
            <a href="#science" onClick={scrollToSection('science')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">作用机理</a>
            <a href="#impact" onClick={scrollToSection('impact')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">临床影响</a>
            <a href="#authors" onClick={scrollToSection('authors')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">研发团队</a>
            <a 
              href="https://diagnostics.roche.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => setMenuOpen(false)} 
              className="px-6 py-3 bg-stone-900 text-white rounded-full shadow-lg cursor-pointer"
            >
              了解更多
            </a>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroScene />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(249,248,244,0.92)_0%,rgba(249,248,244,0.6)_50%,rgba(249,248,244,0.3)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-block mb-4 px-3 py-1 border border-nobel-gold text-nobel-gold text-xs tracking-[0.2em] uppercase font-bold rounded-full backdrop-blur-sm bg-white/30">
            Roche Diagnostics • Personalized Healthcare
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-medium leading-tight md:leading-[0.9] mb-8 text-stone-900 drop-shadow-sm">
            Vemurafenib <br/><span className="italic font-normal text-stone-600 text-3xl md:text-5xl block mt-4">cobas® BRAF V600 IVD</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-stone-700 font-light leading-relaxed mb-12">
            A pioneering targeted therapy and companion diagnostic system designed to detect and inhibit the constitutively active BRAF kinase in melanoma.
          </p>
          
          <div className="flex justify-center">
             <a href="#introduction" onClick={scrollToSection('introduction')} className="group flex flex-col items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors cursor-pointer">
                <span>探索机理</span>
                <span className="p-2 border border-stone-300 rounded-full group-hover:border-stone-900 transition-colors bg-white/50">
                    <ArrowDown size={16} />
                </span>
             </a>
          </div>
        </div>
      </header>

      <main>
        {/* Introduction */}
        <section id="introduction" className="py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">引言</div>
              <h2 className="font-serif text-4xl mb-6 leading-tight text-stone-900">The Mutation Barrier</h2>
              <div className="w-16 h-1 bg-nobel-gold mb-6"></div>
            </div>
            <div className="md:col-span-8 text-lg text-stone-600 leading-relaxed space-y-6">
              <p>
                <span className="text-5xl float-left mr-3 mt-[-8px] font-serif text-nobel-gold">T</span>he <strong>MAPK/ERK pathway</strong> is a crucial chain of proteins in the cell that communicates a signal from a receptor on the surface of the cell to the DNA in the nucleus of the cell. When mutated, this pathway can become hyperactive, leading to uncontrolled cell proliferation.
              </p>
              <p>
                In approximately 50% of melanomas, a specific transversion mutation occurs (T1799A) in the <strong>BRAF</strong> gene. This results in a valine-to-glutamic acid substitution at amino acid 600 (<strong className="text-stone-900 font-medium">BRAF V600E</strong>). This single amino acid change mimics regulatory phosphorylation, locking the kinase in a constitutively active conformation, driving oncogenesis regardless of upstream signals.
              </p>
            </div>
          </div>
        </section>

        {/* The Science: IVD */}
        <section id="science" className="py-24 bg-white border-t border-stone-100">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-200">
                            <BookOpen size={14}/> 伴随诊断 (Companion Diagnostics)
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">cobas® BRAF V600 Test</h2>
                        <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                           Before targeted therapy can begin, we must identify the patients who will benefit. The <strong>cobas® BRAF V600 Mutation Test</strong> is an in vitro diagnostic (IVD) device that uses real-time PCR to detect the presence of the BRAF V600E mutation in DNA extracted from formalin-fixed, paraffin-embedded (FFPE) human melanoma tissue.
                        </p>
                        <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                            During amplification, a fluorescently labeled probe specifically binds to the mutant target sequence. As the DNA polymerase extends the primer, it cleaves the probe, releasing the fluorophore. The exponential rise in fluorescence confirms the presence of the mutation, guiding the clinical decision to prescribe Vemurafenib.
                        </p>
                    </div>
                    <div>
                        <SurfaceCodeDiagram />
                    </div>
                </div>
            </div>
        </section>

        {/* The Science: Vemurafenib Mechanism */}
        <section className="py-24 bg-stone-900 text-stone-100 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                {/* Decorative background pattern - Gold/Stone theme */}
                <div className="w-96 h-96 rounded-full bg-stone-600 blur-[100px] absolute top-[-100px] left-[-100px]"></div>
                <div className="w-96 h-96 rounded-full bg-nobel-gold blur-[100px] absolute bottom-[-100px] right-[-100px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                     <div className="order-2 lg:order-1">
                        <TransformerDecoderDiagram />
                     </div>
                     <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-800 text-nobel-gold text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-700">
                            靶向治疗 (Targeted Therapy)
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white">Vemurafenib (Zelboraf®)</h2>
                        <p className="text-lg text-stone-400 mb-6 leading-relaxed">
                            Vemurafenib is a low molecular weight, orally available, inhibitor of some mutated forms of the BRAF serine-threonine kinase, including BRAF V600E.
                        </p>
                        <p className="text-lg text-stone-400 leading-relaxed">
                            It acts as a <strong>competitive inhibitor</strong>. By binding specifically to the ATP-binding pocket of the mutant BRAF kinase, it prevents ATP from binding. Without ATP, the kinase cannot phosphorylate its downstream targets (MEK1 and MEK2). This effectively shuts down the hyperactive MAPK pathway, leading to cell cycle arrest and apoptosis in the melanoma cells.
                        </p>
                     </div>
                </div>
            </div>
        </section>

        {/* The Science: Results */}
        <section className="py-24 bg-[#F9F8F4]">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">Clinical Efficacy</h2>
                    <p className="text-lg text-stone-600 leading-relaxed">
                        In the BRIM-3 phase III clinical trial, Vemurafenib was compared to the standard chemotherapy (dacarbazine) in patients with previously untreated, metastatic melanoma with the BRAF V600E mutation. The results demonstrated a profound improvement in survival outcomes.
                    </p>
                </div>
                <div className="max-w-3xl mx-auto">
                    <PerformanceMetricDiagram />
                </div>
            </div>
        </section>

        {/* Impact */}
        <section id="impact" className="py-24 bg-white border-t border-stone-200">
             <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-5 relative">
                    <div className="aspect-square bg-[#F5F4F0] rounded-xl overflow-hidden relative border border-stone-200 shadow-inner">
                        <QuantumComputerScene />
                        <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-stone-400 font-serif italic">Molecular visualization of the BRAF kinase domain</div>
                    </div>
                </div>
                <div className="md:col-span-7 flex flex-col justify-center">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">临床影响 (Clinical Impact)</div>
                    <h2 className="font-serif text-4xl mb-6 text-stone-900">Personalized Healthcare</h2>
                    <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                        The co-development and simultaneous FDA approval of Vemurafenib and the cobas® BRAF V600 Mutation Test represents a landmark achievement in precision medicine.
                    </p>
                    <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                        By integrating deep biological understanding with advanced diagnostic technologies, we can move away from a "one-size-fits-all" approach. Patients are tested first, ensuring that this potent targeted therapy is given only to those whose tumors are driven by the specific mutation it was designed to inhibit.
                    </p>
                    
                    <div className="p-6 bg-[#F9F8F4] border border-stone-200 rounded-lg border-l-4 border-l-nobel-gold">
                        <p className="font-serif italic text-xl text-stone-800 mb-4">
                            "This is a paradigm shift in how we treat melanoma. We are no longer just treating a cancer based on where it originated in the body, but based on its specific genetic driver."
                        </p>
                        <span className="text-sm font-bold text-stone-500 tracking-wider uppercase">— Oncology Research Paradigm</span>
                    </div>
                </div>
             </div>
        </section>

        {/* Authors */}
        <section id="authors" className="py-24 bg-[#F5F4F0] border-t border-stone-300">
           <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">研发团队 (Research & Development)</div>
                    <h2 className="font-serif text-3xl md:text-5xl mb-4 text-stone-900">Pioneers in PHC</h2>
                    <p className="text-stone-500 max-w-2xl mx-auto">A successful collaboration between Roche Diagnostics and Genentech (a member of the Roche Group).</p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-8 justify-center items-center flex-wrap">
                    <AuthorCard 
                        name="Roche Diagnostics" 
                        role="IVD Development" 
                        delay="0s" 
                    />
                    <AuthorCard 
                        name="Genentech" 
                        role="Drug Discovery" 
                        delay="0.1s" 
                    />
                    <AuthorCard 
                        name="Plexxikon" 
                        role="Co-Discovery" 
                        delay="0.2s" 
                    />
                </div>
           </div>
        </section>

      </main>

      <footer className="bg-stone-900 text-stone-400 py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <div className="text-white font-serif font-bold text-2xl mb-2">Roche PHC</div>
                <p className="text-sm">Visualizing the mechanism of Vemurafenib & cobas® BRAF V600 Test</p>
            </div>
        </div>
        <div className="text-center mt-12 text-xs text-stone-600">
            Educational visualization. Not for diagnostic use.
        </div>
      </footer>
    </div>
  );
};

export default App;


import React, { useState, useEffect, useRef } from 'react';
import { getContent } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import MissionCard from '../components/MissionCard';
import { Course } from '../types';

const PlanetsPage: React.FC = () => {
  const { language, t } = useLanguage();
  const content = getContent(language);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load P5 and handle starfield
  useEffect(() => {
    let p5Instance: any;

    const initSketch = () => {
      if (!containerRef.current || !(window as any).p5) return;

      const sketch = (p: any) => {
        let stars: Star[] = [];
        const STAR_COUNT = 400;

        p.setup = () => {
          p.createCanvas(p.windowWidth, p.windowHeight);
          for (let i = 0; i < STAR_COUNT; i++) {
            stars.push(new Star(p));
          }
        };

        p.draw = () => {
          p.background(5, 5, 10);
          for (let star of stars) {
            star.update();
            star.display();
          }
        };

        p.windowResized = () => {
          p.resizeCanvas(p.windowWidth, p.windowHeight);
        };

        class Star {
          p: any;
          pos: any;
          origPos: any;
          size: number;
          brightness: number;

          constructor(p: any) {
            this.p = p;
            this.pos = p.createVector(p.random(p.width), p.random(p.height));
            this.origPos = this.pos.copy();
            this.size = p.random(0.5, 2.5);
            this.brightness = p.random(150, 255);
          }

          update() {
            let mouse = this.p.createVector(this.p.mouseX, this.p.mouseY);
            let dist = this.p.dist(this.pos.x, this.pos.y, mouse.x, mouse.y);
            
            if (dist < 150) {
              let force = this.p.constructor.Vector.sub(this.pos, mouse);
              force.setMag(1.2);
              this.pos.add(force);
            } else {
              this.pos.lerp(this.origPos, 0.05);
            }
          }

          display() {
            this.p.noStroke();
            this.p.fill(255, 255, 255, this.brightness);
            this.p.circle(this.pos.x, this.pos.y, this.size);
          }
        }
      };

      p5Instance = new (window as any).p5(sketch, containerRef.current);
    };

    if (!(window as any).p5) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.min.js';
      script.async = true;
      script.onload = initSketch;
      document.body.appendChild(script);
    } else {
      initSketch();
    }

    return () => {
      if (p5Instance) p5Instance.remove();
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-brand-dark">
      {/* Starfield Container */}
      <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none" />

      {/* Galaxy UI */}
      <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Holographic Title */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-top-10 duration-1000">
           <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-200 to-transparent tracking-tighter mb-4 select-none">
             AI FIRST GALAXY
           </h1>
           <div className="flex flex-col items-center gap-2">
              <p className="text-blue-400 font-mono tracking-[0.5em] text-sm uppercase">
                "Don't just Code, Orchestrate."
              </p>
              <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em] animate-pulse">
                SCANNING SECTORS...
              </p>
           </div>
        </div>

        {/* Planet System Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24 lg:gap-32 pb-24">
          {content.courses.map((course, idx) => (
            <div 
              key={course.id}
              onClick={() => setSelectedCourse(course)}
              className="group relative flex flex-col items-center cursor-pointer transition-all duration-500"
            >
              {/* Orbital Path (Visual) */}
              <div className="absolute inset-0 -m-8 border border-white/5 rounded-full scale-150 group-hover:border-blue-500/20 group-hover:scale-[1.6] transition-all duration-700 pointer-events-none" />
              
              {/* Planet Body */}
              <div className="relative w-40 h-40 md:w-56 md:h-56">
                {/* Glow layer */}
                <div className={`absolute inset-0 bg-gradient-to-br ${course.color} rounded-full blur-2xl opacity-20 group-hover:opacity-70 transition-all duration-500 scale-110`} />
                
                {/* Main Body */}
                <div 
                  className={`relative w-full h-full rounded-full bg-gradient-to-br ${course.color} shadow-inner flex items-center justify-center animate-float group-hover:scale-110 transition-transform duration-700 overflow-hidden border border-white/10`}
                  style={{ animationDelay: `${idx * 0.7}s` }}
                >
                  {/* Surface Texture Simulation */}
                  <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/30" />
                  
                  {/* Central Icon */}
                  <span className="text-6xl md:text-8xl drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] group-hover:scale-125 transition-transform duration-500">
                    {course.icon}
                  </span>
                </div>
              </div>

              {/* Planet Title Floating Label */}
              <div className="mt-8 text-center">
                 <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors tracking-widest uppercase">
                    {course.shortTitle}
                 </h3>
                 <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent transition-all duration-500 mt-1" />
                 <p className="text-[10px] font-mono text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   INITIATE MISSION
                 </p>
              </div>
            </div>
          ))}
        </div>

        {/* Global Slogan Footer */}
        <div className="mt-20 text-center pb-20">
            <p className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-white to-gray-400 font-light italic">
               "Build Your Digital Legion."
            </p>
        </div>
      </div>

      {/* Modal - Mission Card */}
      {selectedCourse && (
        <MissionCard 
          course={selectedCourse} 
          onClose={() => setSelectedCourse(null)} 
        />
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PlanetsPage;
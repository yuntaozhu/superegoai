import React, { useState, useEffect, useRef } from 'react';
import { getContent } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import MissionCard from '../components/MissionCard';
import { Course } from '../types';

const PlanetsPage: React.FC = () => {
  const { language } = useLanguage();
  const content = getContent(language);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // p5.js Interactive Starfield
  useEffect(() => {
    let p5Instance: any;
    
    const initP5 = () => {
      if (!containerRef.current || !(window as any).p5) return;
      
      const sketch = (p: any) => {
        let stars: any[] = [];
        const count = 400;

        p.setup = () => {
          p.createCanvas(p.windowWidth, p.windowHeight);
          for (let i = 0; i < count; i++) {
            stars.push(new Star(p));
          }
        };

        p.draw = () => {
          p.background(10, 15, 30);
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
          size: number;
          alpha: number;
          origPos: any;

          constructor(pInstance: any) {
            this.p = pInstance;
            this.pos = this.p.createVector(this.p.random(this.p.width), this.p.random(this.p.height));
            this.origPos = this.pos.copy();
            this.size = this.p.random(0.5, 2.5);
            this.alpha = this.p.random(100, 255);
          }

          update() {
            let mouse = this.p.createVector(this.p.mouseX, this.p.mouseY);
            let d = this.p.dist(this.pos.x, this.pos.y, mouse.x, mouse.y);
            if (d < 150) {
              let force = this.p.constructor.Vector.sub(this.pos, mouse);
              force.setMag(1.5);
              this.pos.add(force);
            } else {
              this.pos.lerp(this.origPos, 0.05);
            }
          }

          display() {
            this.p.noStroke();
            this.p.fill(255, 255, 255, this.alpha);
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
      script.onload = initP5;
      document.body.appendChild(script);
    } else {
      initP5();
    }

    return () => {
      if (p5Instance) p5Instance.remove();
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-brand-dark pt-20">
      <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none" />
      
      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center pt-20 px-4 text-center">
        <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-200 to-transparent opacity-90 tracking-tighter animate-pulse mb-4">
          AI FIRST GALAXY
        </h1>
        <p className="text-blue-400 font-mono tracking-widest uppercase text-sm mb-16">
          "Don't just Code, Orchestrate."
        </p>

        {/* Planet Grid/Orbit */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-7xl mx-auto pb-40">
          {content.courses.map((course, idx) => (
            <div 
              key={course.id}
              className="group relative flex flex-col items-center cursor-pointer"
              onClick={() => setSelectedCourse(course)}
            >
              {/* Planet Visualization */}
              <div className="relative w-40 h-40 md:w-56 md:h-56 mb-6">
                <div className={`absolute inset-0 bg-gradient-to-br ${course.color} rounded-full blur-2xl opacity-20 group-hover:opacity-60 transition-all duration-500 scale-110`} />
                
                <div className={`relative w-full h-full rounded-full bg-gradient-to-br ${course.color} shadow-inner overflow-hidden border border-white/10 group-hover:scale-110 transition-transform duration-500 flex items-center justify-center animate-float`} style={{ animationDelay: `${idx * 0.5}s` }}>
                   <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                   <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/20"></div>
                   
                   <span className="text-6xl md:text-8xl transform group-hover:scale-125 transition-transform duration-500 drop-shadow-2xl">
                     {course.icon}
                   </span>
                </div>
              </div>

              {/* Planet Label */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors uppercase tracking-wider">
                  {course.shortTitle}
                </h3>
                <p className="text-xs text-blue-500 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                  SCANNING MISSION...
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Slogan */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none">
           <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.5em] animate-pulse">
             Build Your Digital Legion
           </p>
        </div>
      </div>

      {/* Modal / Mission Card */}
      {selectedCourse && (
        <MissionCard 
          course={selectedCourse} 
          onClose={() => setSelectedCourse(null)} 
        />
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PlanetsPage;

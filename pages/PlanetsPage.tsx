
import React, { useState, useEffect, useRef } from 'react';
import { getContent } from '../constants';
import { useLanguage, Link } from '../context/LanguageContext';
import MissionCard from '../components/MissionCard';
import Planet3D from '../components/Planet3D';
import { Course } from '../types';
import { ArrowLeft } from 'lucide-react';

const PlanetsPage: React.FC = () => {
  const { language } = useLanguage();
  const content = getContent(language);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // p5.js Interactive Starfield for the background
  useEffect(() => {
    let p5Instance: any;
    
    const initP5 = () => {
      if (!containerRef.current || !(window as any).p5) return;
      
      const sketch = (p: any) => {
        let stars: any[] = [];
        const count = p.windowWidth < 640 ? 100 : 400;

        p.setup = () => {
          p.createCanvas(p.windowWidth, p.windowHeight);
          p.pixelDensity(1);
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
            if (this.p.mouseX > 0 && this.p.mouseY > 0) {
              let mouse = this.p.createVector(this.p.mouseX, this.p.mouseY);
              let d = this.p.dist(this.pos.x, this.pos.y, mouse.x, mouse.y);
              const radius = 100;
              if (d < radius) {
                let force = this.p.constructor.Vector.sub(this.pos, mouse);
                force.setMag(1.0);
                this.pos.add(force);
              } else {
                this.pos.lerp(this.origPos, 0.05);
              }
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
    <div className="relative min-h-screen overflow-hidden bg-brand-dark pt-16 md:pt-20">
      <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none" />
      
      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center pt-12 sm:pt-16 md:pt-20 px-4 text-center">
        <Link to="/" className="group inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8 font-mono text-[10px] uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/5">
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
          {language === 'en' ? 'Home' : '返回首页'}
        </Link>
        
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-200 to-transparent opacity-90 tracking-tighter animate-pulse mb-2 md:mb-4 uppercase">
          AI FIRST GALAXY
        </h1>
        <p className="text-blue-400 font-mono tracking-widest uppercase text-[9px] md:text-sm mb-12 md:mb-20 px-6 max-w-md mx-auto leading-relaxed">
          "Don't just Code, Orchestrate."
        </p>

        {/* Planet Grid/Orbit using 3D Spheres */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24 max-w-7xl mx-auto pb-40 w-full px-6">
          {content.courses.map((course, idx) => (
            <div 
              key={course.id}
              className="group relative flex flex-col items-center cursor-pointer transition-all duration-500"
              onClick={() => setSelectedCourse(course)}
              role="button"
              aria-label={`Explore ${course.title}`}
            >
              {/* Planet 3D Visualization */}
              <div className="relative mb-6 md:mb-8 transform group-hover:scale-110 transition-transform duration-500">
                {/* Orbital path indicator */}
                <div className="absolute inset-[-40px] border border-white/5 rounded-full rotate-45 pointer-events-none" />
                
                {/* 3D Sphere Component */}
                <Planet3D 
                  colorFrom={course.color.split(' ')[0]} 
                  colorTo={course.color.split(' ')[1]} 
                  icon={course.icon} 
                  size={window.innerWidth < 768 ? 160 : 240}
                />
              </div>

              {/* Planet Label */}
              <div className="text-center relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-[1px] bg-blue-500/50 group-hover:w-16 transition-all duration-500" />
                <h3 className="text-xl md:text-2xl font-black text-white mb-1 group-hover:text-blue-300 transition-colors uppercase tracking-wider">
                  {course.shortTitle}
                </h3>
                <div className="flex items-center justify-center gap-2">
                   <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
                   <p className="text-[10px] text-blue-500 font-mono tracking-[0.2em] uppercase opacity-70">
                     MISSION_SCAN
                   </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Slogan */}
        <div className="fixed bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none w-full px-4">
           <p className="text-gray-500 font-mono text-[8px] md:text-xs uppercase tracking-[0.4em] md:tracking-[0.6em] animate-pulse">
             System Status: Synchronized // Fleet Ready
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
    </div>
  );
};

export default PlanetsPage;

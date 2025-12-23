
import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLocation } from '../context/LanguageContext';

const P5Background: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<any>(null);
  const { theme } = useTheme();
  const { pathname } = useLocation();
  const themeRef = useRef(theme);

  // Performance Guard: Disable globally heavy p5 background on 3D intensive pages
  const isDisabledPage = pathname.includes('/planets') || pathname.includes('/course/');

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    // If we are on a 3D page, clean up existing p5 instance and return
    if (isDisabledPage) {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
      return;
    }

    const loadP5 = () => {
      if ((window as any).p5) {
        initSketch();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.min.js';
      script.async = true;
      script.onload = () => initSketch();
      document.body.appendChild(script);
    };

    const initSketch = () => {
      if (!containerRef.current || !(window as any).p5 || p5InstanceRef.current) return;

      const sketch = (p: any) => {
        let stars: any[] = [];
        const starsNum = p.windowWidth < 768 ? 40 : 100; // Reduce particles on mobile
        const connectionDist = 150;
        
        const darkPalette = ["#3b82f6", "#8b5cf6", "#06b6d4", "#ffffff"];
        const lightPalette = ["#60a5fa", "#a78bfa", "#94a3b8", "#334155"];

        p.setup = () => {
          p.createCanvas(p.windowWidth, p.windowHeight);
          for (let i = 0; i < starsNum; i++) {
            stars.push(new Star(p));
          }
        };

        p.draw = () => {
          p.clear();
          const isDark = themeRef.current === 'dark';
          p.blendMode(isDark ? p.ADD : p.BLEND);

          for (let i = 0; i < stars.length; i++) {
            stars[i].move();
            stars[i].display(isDark ? darkPalette : lightPalette);

            for (let j = i + 1; j < stars.length; j++) {
              let d = p.dist(stars[i].pos.x, stars[i].pos.y, stars[j].pos.x, stars[j].pos.y);
              if (d < connectionDist) {
                let alpha = p.map(d, 0, connectionDist, isDark ? 20 : 50, 0);
                p.stroke(isDark ? 255 : 100, alpha);
                p.strokeWeight(0.5);
                p.line(stars[i].pos.x, stars[i].pos.y, stars[j].pos.x, stars[j].pos.y);
              }
            }
          }
        };

        p.windowResized = () => {
          p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
      };

      p5InstanceRef.current = new (window as any).p5(sketch, containerRef.current);
    };

    loadP5();

    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, [isDisabledPage]); // Re-run when page type changes

  if (isDisabledPage) return null;

  return (
    <div 
      ref={containerRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 bg-brand-light dark:bg-brand-dark pointer-events-none"
      style={{ opacity: 0.4 }}
    />
  );
};

class Star {
  p: any;
  pos: any;
  vel: any;
  size: number;
  colorIndex: number;

  constructor(p: any) {
    this.p = p;
    this.pos = p.createVector(p.random(p.width), p.random(p.height));
    this.vel = p.createVector(p.random(-0.15, 0.15), p.random(-0.15, 0.15));
    this.size = p.random(1, 2.5);
    this.colorIndex = Math.floor(p.random(4));
  }

  move() {
    this.pos.add(this.vel);
    if (this.pos.x < 0) this.pos.x = this.p.width;
    if (this.pos.x > this.p.width) this.pos.x = 0;
    if (this.pos.y < 0) this.pos.y = this.p.height;
    if (this.pos.y > this.p.height) this.pos.y = 0;
  }

  display(palette: string[]) {
    this.p.noStroke();
    this.p.fill(this.p.color(palette[this.colorIndex]));
    this.p.circle(this.pos.x, this.pos.y, this.size);
  }
}

export default P5Background;

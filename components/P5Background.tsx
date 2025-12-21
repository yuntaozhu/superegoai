
import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const P5Background: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);
  const { theme } = useTheme();
  // We use a ref to track the theme inside the closure of the p5 sketch
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    if (scriptLoaded.current) return;

    const loadP5 = () => {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.min.js';
      script.async = true;
      script.onload = () => {
        initSketch();
      };
      document.body.appendChild(script);
      scriptLoaded.current = true;
    };

    const initSketch = () => {
      if (!containerRef.current || !(window as any).p5) return;

      const sketch = (p: any) => {
        let stars: any[] = [];
        const starsNum = 120;
        const connectionDist = 180;
        
        // Dark Mode Palette (Bright stars)
        const darkPalette = ["#3b82f6", "#8b5cf6", "#06b6d4", "#6366f1", "#ffffff"];
        // Light Mode Palette (Darker, subtler particles)
        const lightPalette = ["#60a5fa", "#a78bfa", "#94a3b8", "#cbd5e1", "#334155"];

        p.setup = () => {
          p.createCanvas(p.windowWidth, p.windowHeight);
          for (let i = 0; i < starsNum; i++) {
            stars.push(new Star(p));
          }
        };

        p.draw = () => {
          p.clear();
          
          // Determine current mode
          const isDark = themeRef.current === 'dark';
          // Use standard blend for light mode to avoid washed out colors
          p.blendMode(isDark ? p.ADD : p.BLEND);

          for (let i = 0; i < stars.length; i++) {
            stars[i].move();
            stars[i].display(isDark ? darkPalette : lightPalette);

            // Constellation connections
            for (let j = i + 1; j < stars.length; j++) {
              let d = p.dist(stars[i].pos.x, stars[i].pos.y, stars[j].pos.x, stars[j].pos.y);
              if (d < connectionDist) {
                let alpha = p.map(d, 0, connectionDist, isDark ? 15 : 40, 0);
                // Dark lines for light mode, bright lines for dark mode
                const strokeColor = isDark ? 255 : 50;
                p.stroke(strokeColor, alpha);
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

      new (window as any).p5(sketch, containerRef.current);
    };

    if ((window as any).p5) {
      initSketch();
    } else {
      loadP5();
    }

    return () => {
      const canvas = containerRef.current?.querySelector('canvas');
      if (canvas) canvas.remove();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 bg-brand-light dark:bg-brand-dark transition-colors duration-300 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};

class Star {
  p: any;
  pos: any;
  vel: any;
  size: number;
  colorIndex: number;
  nX: number;
  nY: number;

  constructor(p: any) {
    this.p = p;
    this.pos = p.createVector(p.random(p.width), p.random(p.height));
    this.vel = p.createVector(p.random(-0.2, 0.2), p.random(-0.2, 0.2));
    this.size = p.random(1, 3);
    this.colorIndex = Math.floor(p.random(5)); // Store index instead of color
    this.nX = p.random(1000);
    this.nY = p.random(1000);
  }

  move() {
    this.pos.add(this.vel);
    
    // Interactive mouse push
    let mouse = this.p.createVector(this.p.mouseX, this.p.mouseY);
    let d = this.p.dist(this.pos.x, this.pos.y, mouse.x, mouse.y);
    if (d < 150) {
      let force = this.p.constructor.Vector.sub(this.pos, mouse);
      force.setMag(0.5);
      this.pos.add(force);
    }

    if (this.pos.x < 0) this.pos.x = this.p.width;
    if (this.pos.x > this.p.width) this.pos.x = 0;
    if (this.pos.y < 0) this.pos.y = this.p.height;
    if (this.pos.y > this.p.height) this.pos.y = 0;
  }

  display(palette: string[]) {
    const p = this.p;
    p.noStroke();
    // Resolve color from current palette
    const c = p.color(palette[this.colorIndex]);
    p.fill(c);
    p.circle(this.pos.x, this.pos.y, this.size);
  }
}

export default P5Background;

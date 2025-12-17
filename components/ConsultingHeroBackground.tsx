import React, { useEffect, useRef } from 'react';

const ConsultingHeroBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<any>(null);

  useEffect(() => {
    const initSketch = () => {
      if (!containerRef.current || !(window as any).p5) return;

      const sketch = (p: any) => {
        let particles: Particle[] = [];
        // Adjust density based on screen size implicitly by canvas dimensions
        const connectionDistance = 100;
        const particleCount = Math.min(80, Math.floor((p.windowWidth * p.windowHeight) / 10000));

        p.setup = () => {
          // Create canvas matching the container size
          p.createCanvas(containerRef.current!.clientWidth, containerRef.current!.clientHeight);
          
          for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle(p));
          }
        };

        p.draw = () => {
          p.clear(); // Transparent background
          
          // Draw connections first (behind particles)
          p.strokeWeight(1);
          
          for (let i = 0; i < particles.length; i++) {
            const p1 = particles[i];
            p1.update();
            p1.checkEdges();

            // Connect to nearby particles
            // Optimization: only check a subset or just simple nested loop
            for (let j = i + 1; j < particles.length; j++) {
              const p2 = particles[j];
              const d = p.dist(p1.pos.x, p1.pos.y, p2.pos.x, p2.pos.y);
              
              if (d < connectionDistance) {
                // Opacity based on distance
                const alpha = p.map(d, 0, connectionDistance, 0.2, 0);
                p.stroke(`rgba(129, 140, 248, ${alpha})`); // Indigo-400 like color
                p.line(p1.pos.x, p1.pos.y, p2.pos.x, p2.pos.y);
              }
            }
          }

          // Draw particles
          p.noStroke();
          for (let i = 0; i < particles.length; i++) {
            particles[i].display();
          }
        };

        p.windowResized = () => {
          if (containerRef.current) {
            p.resizeCanvas(containerRef.current.clientWidth, containerRef.current.clientHeight);
          }
        };
      };

      p5InstanceRef.current = new (window as any).p5(sketch, containerRef.current);
    };

    // Check for p5 availability (it's loaded by App -> P5Background)
    const checkInterval = setInterval(() => {
      if ((window as any).p5) {
        clearInterval(checkInterval);
        initSketch();
      }
    }, 100);

    return () => {
      clearInterval(checkInterval);
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

class Particle {
  p: any;
  pos: any;
  vel: any;
  size: number;
  
  constructor(p: any) {
    this.p = p;
    this.pos = p.createVector(p.random(p.width), p.random(p.height));
    // Slow, organic movement
    this.vel = p.createVector(p.random(-0.5, 0.5), p.random(-0.5, 0.5));
    this.size = p.random(2, 4);
  }

  update() {
    this.pos.add(this.vel);
  }

  checkEdges() {
    if (this.pos.x < 0) this.pos.x = this.p.width;
    if (this.pos.x > this.p.width) this.pos.x = 0;
    if (this.pos.y < 0) this.pos.y = this.p.height;
    if (this.pos.y > this.p.height) this.pos.y = 0;
  }

  display() {
    // Indigo/Purple accent
    this.p.fill(165, 180, 252, 150); // Indigo-300 with opacity
    this.p.circle(this.pos.x, this.pos.y, this.size);
  }
}

export default ConsultingHeroBackground;

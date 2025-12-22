
import React, { useEffect, useRef } from 'react';

interface BioCosmosProps {
  activeColor?: string;
  activePos?: { x: number; y: number };
}

const BioCosmos: React.FC<BioCosmosProps> = ({ activeColor, activePos }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const p5Instance = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: any) => {
      let particles: Particle[] = [];
      const count = 120;

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent(containerRef.current);
        for (let i = 0; i < count; i++) {
          particles.push(new Particle(p));
        }
      };

      p.draw = () => {
        p.clear();
        p.background(2, 3, 8, 20); // 深邃黑
        
        // 绘制神经元连接
        p.strokeWeight(0.5);
        for (let i = 0; i < particles.length; i++) {
          particles[i].update(activePos);
          particles[i].display(activeColor);
          
          for (let j = i + 1; j < particles.length; j++) {
            let d = p.dist(particles[i].pos.x, particles[i].pos.y, particles[j].pos.x, particles[j].pos.y);
            if (d < 120) {
              let alpha = p.map(d, 0, 120, 40, 0);
              p.stroke(255, alpha);
              p.line(particles[i].pos.x, particles[i].pos.y, particles[j].pos.x, particles[j].pos.y);
            }
          }
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };
    };

    class Particle {
      p: any;
      pos: any;
      vel: any;
      acc: any;
      maxSpeed: number;
      size: number;

      constructor(p: any) {
        this.p = p;
        this.pos = p.createVector(p.random(p.width), p.random(p.height));
        this.vel = p.createVector(p.random(-0.5, 0.5), p.random(-0.5, 0.5));
        this.acc = p.createVector(0, 0);
        this.maxSpeed = 2;
        this.size = p.random(1, 3);
      }

      update(target?: { x: number; y: number }) {
        if (target) {
          let targetVec = this.p.createVector(target.x, target.y);
          let dir = this.p.constructor.Vector.sub(targetVec, this.pos);
          dir.setMag(0.05);
          this.acc.add(dir);
        }

        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);

        // 边界处理
        if (this.pos.x < 0) this.pos.x = this.p.width;
        if (this.pos.x > this.p.width) this.pos.x = 0;
        if (this.pos.y < 0) this.pos.y = this.p.height;
        if (this.pos.y > this.p.height) this.pos.y = 0;
      }

      display(colorStr?: string) {
        this.p.noStroke();
        if (colorStr) {
          this.p.fill(colorStr);
        } else {
          this.p.fill(100, 150, 255, 150);
        }
        this.p.circle(this.pos.x, this.pos.y, this.size);
      }
    }

    const loadP5 = async () => {
      if (!(window as any).p5) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.min.js';
        script.onload = () => {
          p5Instance.current = new (window as any).p5(sketch);
        };
        document.body.appendChild(script);
      } else {
        p5Instance.current = new (window as any).p5(sketch);
      }
    };

    loadP5();

    return () => {
      if (p5Instance.current) p5Instance.current.remove();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10 pointer-events-none" />;
};

export default BioCosmos;

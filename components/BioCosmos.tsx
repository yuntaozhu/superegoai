
import React, { useEffect, useRef } from 'react';

interface BioCosmosProps {
  activeColor?: string;
  activePos?: { x: number; y: number };
}

const BioCosmos: React.FC<BioCosmosProps> = ({ activeColor, activePos }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: any) => {
      let particles: Particle[] = [];
      const count = 150; // 增加粒子数量增强汇聚感

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent(containerRef.current);
        for (let i = 0; i < count; i++) {
          particles.push(new Particle(p));
        }
      };

      p.draw = () => {
        p.clear();
        p.background(2, 3, 8, 30); 
        
        for (let i = 0; i < particles.length; i++) {
          particles[i].update(activePos);
          particles[i].display(activeColor);
          
          // 悬停时增强连线亮度
          if (activePos) {
            for (let j = i + 1; j < particles.length; j++) {
              let d = p.dist(particles[i].pos.x, particles[i].pos.y, particles[j].pos.x, particles[j].pos.y);
              if (d < 100) {
                let alpha = p.map(d, 0, 100, 60, 0);
                p.stroke(activeColor ? activeColor + '40' : 'rgba(255,255,255,0.1)');
                p.strokeWeight(0.5);
                p.line(particles[i].pos.x, particles[i].pos.y, particles[j].pos.x, particles[j].pos.y);
              }
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
      noiseOffset: number;

      constructor(p: any) {
        this.p = p;
        this.pos = p.createVector(p.random(p.width), p.random(p.height));
        this.vel = p.createVector(p.random(-1, 1), p.random(-1, 1));
        this.acc = p.createVector(0, 0);
        this.maxSpeed = p.random(1, 3);
        this.size = p.random(1, 2.5);
        this.noiseOffset = p.random(1000);
      }

      update(target?: { x: number; y: number }) {
        if (target) {
          let targetVec = this.p.createVector(target.x, target.y);
          let dir = this.p.constructor.Vector.sub(targetVec, this.pos);
          let dist = dir.mag();
          
          // 越靠近目标速度越快，形成吸入感
          let strength = this.p.map(dist, 0, this.p.width, 0.5, 0.01);
          dir.setMag(strength);
          this.acc.add(dir);
          this.maxSpeed = 6; // 汇聚状态加速
        } else {
          // 游离状态：受微弱噪声驱动
          let n = this.p.noise(this.pos.x * 0.005, this.pos.y * 0.005, this.p.frameCount * 0.01 + this.noiseOffset);
          let angle = n * this.p.TWO_PI * 2;
          let noiseVec = this.p.constructor.Vector.fromAngle(angle);
          noiseVec.mult(0.1);
          this.acc.add(noiseVec);
          this.maxSpeed = 2;
        }

        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);

        if (this.pos.x < 0) this.pos.x = this.p.width;
        if (this.pos.x > this.p.width) this.pos.x = 0;
        if (this.pos.y < 0) this.pos.y = this.p.height;
        if (this.pos.y > this.p.height) this.pos.y = 0;
      }

      display(colorStr?: string) {
        this.p.noStroke();
        if (colorStr) {
          // 转换 HEX 为更加明亮的颜色用于粒子
          this.p.fill(colorStr);
          // 核心粒子增加发光感
          if (this.p.random() > 0.9) {
            this.p.fill(255, 255, 255, 200);
          }
        } else {
          this.p.fill(59, 130, 246, 120);
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

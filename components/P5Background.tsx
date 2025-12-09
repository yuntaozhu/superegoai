import React, { useEffect, useRef } from 'react';

const P5Background: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

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
        let objs: any[] = [];
        let targetObjs: any[] = [];
        const objsNum = 40;
        const targetNum = 5;
        const palette = ["#3b82f6", "#8b5cf6", "#06b6d4", "#6366f1"];

        p.setup = () => {
          p.createCanvas(p.windowWidth, p.windowHeight);
          p.colorMode(p.HSB, 360, 100, 100, 100);

          for (let i = 0; i < targetNum; i++) {
            targetObjs.push(new TargetObj(p, i, palette));
          }

          for (let i = 0; i < objsNum; i++) {
            objs.push(new MovingObj(p, targetObjs, palette));
          }
        };

        p.draw = () => {
          p.clear();
          p.blendMode(p.BLEND);
          p.blendMode(p.ADD);

          for (let i = 0; i < objs.length; i++) {
            objs[i].seek();
            objs[i].move();
            objs[i].display();
          }

          for (let j = 0; j < targetObjs.length; j++) {
            targetObjs[j].move();
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
      // Cleanup if needed, though usually fine for background
      const canvas = containerRef.current?.querySelector('canvas');
      if (canvas) canvas.remove();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 bg-brand-dark"
      style={{ opacity: 0.8 }}
    />
  );
};

// --- Helper Classes (Defined inside/outside as needed, here simplified) ---

class MovingObj {
  p: any;
  pos: any;
  vel: any;
  acc: any;
  maxspeed: number;
  maxsteer: number;
  desired: any;
  targetObjs: any[];
  targetObj: any;
  shapeScale: number;
  c: any;
  targetColor: any;
  colorLerpSpeed: number;
  maxD: number;
  d: number;
  dt: number;
  palette: string[];

  constructor(p: any, targetObjs: any[], palette: string[]) {
    this.p = p;
    this.targetObjs = targetObjs;
    this.palette = palette;
    this.pos = p.createVector(p.random(p.width), p.random(p.height));
    this.vel = p.createVector(0, 0);
    this.acc = p.createVector(0, 0);
    this.maxspeed = p.random(2, 5);
    this.maxsteer = p.random(0.05, 0.2);
    this.desired = p.createVector(0, 0);
    this.targetObj = this.findNearestTarget();
    this.shapeScale = p.random(1, 4);
    this.c = p.color(p.random(palette));
    this.targetColor = this.c;
    this.colorLerpSpeed = 0.02;
    this.maxD = p.random(20, 80);
    this.d = this.maxD;
    this.dt = p.random(p.TWO_PI);
  }

  move() {
    this.d = this.maxD * Math.abs(Math.sin(this.dt)) + 5;
    this.targetObj = this.findNearestTarget();
    this.c = this.p.lerpColor(this.c, this.targetColor, this.colorLerpSpeed);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.dt += 0.01;
  }

  seek() {
    let target = this.targetObj.pos;
    this.desired = this.p.constructor.Vector.sub(target, this.pos);
    this.desired.normalize();
    this.desired.setMag(this.maxspeed);
    let steer = this.p.constructor.Vector.sub(this.desired, this.vel);
    steer.limit(this.maxsteer);
    this.acc.add(steer);
  }

  display() {
    const p = this.p;
    p.push();
    const ctx = p.drawingContext;
    ctx.shadowColor = this.c.toString();
    ctx.shadowBlur = this.d;
    p.strokeWeight(this.d * 0.5);
    p.stroke(this.c);
    p.point(this.pos.x, this.pos.y);
    p.pop();
  }

  findNearestTarget() {
    let minDist = 100000;
    let minIndex = 0;
    for (let i = 0; i < this.targetObjs.length; i++) {
      let dist = this.targetObjs[i].pos.dist(this.pos);
      if (dist < minDist) {
        minDist = dist;
        minIndex = i;
      }
    }
    const bestTarget = this.targetObjs[minIndex];
    this.targetColor = bestTarget.c;
    return bestTarget;
  }
}

class TargetObj {
  p: any;
  pos: any;
  nX: number;
  nY: number;
  c: any;

  constructor(p: any, index: number, palette: string[]) {
    this.p = p;
    this.pos = p.createVector(0, 0);
    this.nX = p.random(1000);
    this.nY = p.random(1000);
    this.c = p.color(palette[index % palette.length]);
  }

  move() {
    const p = this.p;
    this.pos.set(
      p.map(p.noise(p.frameCount * 0.002 + this.nX), 0, 1, -p.width * 0.2, p.width * 1.2),
      p.map(p.noise(p.frameCount * 0.002 + this.nY), 0, 1, -p.height * 0.2, p.height * 1.2)
    );
  }
}

export default P5Background;
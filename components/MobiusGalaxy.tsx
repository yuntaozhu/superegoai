
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
// Import Course type for the props interface
import { Course } from '../types';

interface MobiusGalaxyProps {
  orientation: 'horizontal' | 'vertical';
  isMobile?: boolean;
  // Added courses and interactive callback props to fix type error in PlanetsPageMobile.tsx
  courses?: Course[];
  onSelectCourse?: (course: Course) => void;
  onHoverCourse?: (course: Course | null) => void;
}

const MobiusGalaxy: React.FC<MobiusGalaxyProps> = ({ orientation, isMobile = false }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rotationTargetRef = useRef(0);
  const currentRotationRef = useRef(0);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 2000);
    camera.position.z = isMobile ? 12 : 15;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const stripWidth = isMobile ? 3.0 : 5.0; 
    const radius = isMobile ? 6.0 : 10.0;
    
    // 1. 远景星丛
    const starGeo = new THREE.BufferGeometry();
    const starCoords = [];
    for (let i = 0; i < 4000; i++) {
      starCoords.push(THREE.MathUtils.randFloatSpread(1000));
      starCoords.push(THREE.MathUtils.randFloatSpread(1000));
      starCoords.push(THREE.MathUtils.randFloatSpread(1000));
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starCoords, 3));
    const starMat = new THREE.PointsMaterial({ color: 0x444444, size: 0.8, transparent: true, opacity: 0.3 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // 2. 莫比乌斯粒子丝带 (Neural Ribbon)
    const nebulaGeo = new THREE.BufferGeometry();
    const nebulaCount = isMobile ? 8000 : 25000;
    const nebulaPos = new Float32Array(nebulaCount * 3);
    const nebulaColors = new Float32Array(nebulaCount * 3);
    
    const colors = [
      new THREE.Color(0x3b82f6), // Blue
      new THREE.Color(0x8b5cf6), // Violet
      new THREE.Color(0x06b6d4), // Cyan
      new THREE.Color(0xffd700)  // Gold
    ];

    for (let i = 0; i < nebulaCount; i++) {
      const u = Math.random() * Math.PI * 2;
      const v = (Math.pow(Math.random(), 2) - 0.5) * stripWidth;
      
      // 莫比乌斯变换方程
      const x = (radius + v * Math.cos(u / 2)) * Math.cos(u);
      const y = (radius + v * Math.cos(u / 2)) * Math.sin(u);
      const z = v * Math.sin(u / 2);
      
      const idx = i * 3;
      if (orientation === 'vertical') {
        nebulaPos[idx] = z; nebulaPos[idx + 1] = y; nebulaPos[idx + 2] = x;
      } else {
        nebulaPos[idx] = x; nebulaPos[idx + 1] = z; nebulaPos[idx + 2] = y;
      }
      
      const col = colors[Math.floor(Math.random() * colors.length)];
      nebulaColors[idx] = col.r; nebulaColors[idx + 1] = col.g; nebulaColors[idx + 2] = col.b;
    }
    
    nebulaGeo.setAttribute('position', new THREE.BufferAttribute(nebulaPos, 3));
    nebulaGeo.setAttribute('color', new THREE.BufferAttribute(nebulaColors, 3));
    
    const nebulaMat = new THREE.PointsMaterial({ 
      size: 0.05, 
      vertexColors: true, 
      transparent: true, 
      opacity: 0.4, 
      blending: THREE.AdditiveBlending 
    });
    
    const nebulaPoints = new THREE.Points(nebulaGeo, nebulaMat);
    scene.add(nebulaPoints);

    const animate = () => {
      requestAnimationFrame(animate);
      const now = Date.now();
      
      currentRotationRef.current += 0.001;
      nebulaPoints.rotation.y = currentRotationRef.current;
      nebulaPoints.rotation.x = Math.sin(now * 0.0002) * 0.1;
      
      stars.rotation.y -= 0.0001;
      
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      nebulaGeo.dispose();
      nebulaMat.dispose();
    };
  }, [orientation, isMobile]);

  return <div ref={mountRef} className="w-full h-full pointer-events-none" />;
};

export default MobiusGalaxy;

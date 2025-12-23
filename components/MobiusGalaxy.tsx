
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Course } from '../types';

interface MobiusGalaxyProps {
  orientation: 'horizontal' | 'vertical';
  isMobile?: boolean;
  courses?: Course[];
  hoveredId?: string | null;
  onSelectCourse?: (course: Course) => void;
  onHoverCourse?: (course: Course | null) => void;
}

const MobiusGalaxy: React.FC<MobiusGalaxyProps> = ({ 
  orientation, 
  isMobile = false, 
  courses = [], 
  hoveredId,
  onSelectCourse, 
  onHoverCourse 
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const planetsRef = useRef<{ 
    mesh: THREE.Mesh; 
    orbitRing: THREE.Mesh;
    courseId: string; 
    u: number; 
    offset: number;
    baseScale: number;
  }[]>([]);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth || window.innerWidth;
    const height = mountRef.current.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 2000);
    camera.position.z = isMobile ? 18 : 22;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const radius = isMobile ? 8.0 : 11.0;
    const stripWidth = isMobile ? 2.5 : 4.0;
    
    // 1. Background Stars
    const starGeo = new THREE.BufferGeometry();
    const starCoords = [];
    for (let i = 0; i < 2000; i++) {
      starCoords.push(THREE.MathUtils.randFloatSpread(1000));
      starCoords.push(THREE.MathUtils.randFloatSpread(1000));
      starCoords.push(THREE.MathUtils.randFloatSpread(1000));
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starCoords, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5, transparent: true, opacity: 0.1 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // 2. Neural Cloud (Mobius Strip)
    const nebulaGeo = new THREE.BufferGeometry();
    const nebulaCount = isMobile ? 10000 : 25000;
    const nebulaPos = new Float32Array(nebulaCount * 3);
    const nebulaColors = new Float32Array(nebulaCount * 3);
    const palette = [new THREE.Color(0x3b82f6), new THREE.Color(0x8b5cf6), new THREE.Color(0x06b6d4)];

    for (let i = 0; i < nebulaCount; i++) {
      const u = Math.random() * Math.PI * 2;
      const v = (Math.pow(Math.random(), 2) - 0.5) * stripWidth;
      const x = (radius + v * Math.cos(u / 2)) * Math.cos(u);
      const y = (radius + v * Math.cos(u / 2)) * Math.sin(u);
      const z = v * Math.sin(u / 2);
      
      const idx = i * 3;
      nebulaPos[idx] = x; nebulaPos[idx + 1] = z; nebulaPos[idx + 2] = y;
      const col = palette[Math.floor(Math.random() * palette.length)];
      nebulaColors[idx] = col.r; nebulaColors[idx + 1] = col.g; nebulaColors[idx + 2] = col.b;
    }
    nebulaGeo.setAttribute('position', new THREE.BufferAttribute(nebulaPos, 3));
    nebulaGeo.setAttribute('color', new THREE.BufferAttribute(nebulaColors, 3));
    const nebulaMat = new THREE.PointsMaterial({ size: 0.03, vertexColors: true, transparent: true, opacity: 0.12, blending: THREE.AdditiveBlending });
    const nebulaPoints = new THREE.Points(nebulaGeo, nebulaMat);
    scene.add(nebulaPoints);

    // 3. Planet System
    const planetGroup = new THREE.Group();
    scene.add(planetGroup);

    const getHex = (id: string) => {
      const map: any = { data: 0xffd700, 'digital-twin': 0x00bfff, art: 0x8a2be2, sports: 0xff4500, solopreneur: 0x00ffff, quant: 0x2e8b57 };
      return map[id] || 0xffffff;
    };

    const courseIds = ['data', 'digital-twin', 'art', 'sports', 'solopreneur', 'quant'];
    
    courseIds.forEach((id, i) => {
      const hex = getHex(id);
      
      // The Core Planet Mesh
      const geometry = new THREE.SphereGeometry(0.15, 32, 32);
      const material = new THREE.MeshPhongMaterial({
        color: hex,
        emissive: hex,
        emissiveIntensity: 1.5,
        shininess: 100,
        transparent: true,
        opacity: 0.95
      });
      const mesh = new THREE.Mesh(geometry, material);
      
      // Individual Orbital Ring (visible when planet is active/hovered)
      const ringGeo = new THREE.TorusGeometry(0.4, 0.005, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({ color: hex, transparent: true, opacity: 0.1 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      mesh.add(ring);

      planetsRef.current.push({ 
        mesh, 
        orbitRing: ring,
        courseId: id, 
        u: (i / courseIds.length) * Math.PI * 2,
        offset: Math.random() * 2,
        baseScale: 1
      });
      planetGroup.add(mesh);
    });

    // 4. Neural Connectivity Line System
    const lineGroup = new THREE.Group();
    scene.add(lineGroup);
    const lineMat = new THREE.LineBasicMaterial({ 
      color: 0xffffff, 
      transparent: true, 
      opacity: 0.03, 
      blending: THREE.AdditiveBlending 
    });

    const updateLines = () => {
      lineGroup.clear();
      const count = planetsRef.current.length;
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const points = [
            planetsRef.current[i].mesh.position,
            planetsRef.current[j].mesh.position
          ];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const line = new THREE.Line(geometry, lineMat);
          lineGroup.add(line);
        }
      }
    };

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const pl = new THREE.PointLight(0xffffff, 2);
    pl.position.set(15, 15, 15);
    scene.add(pl);

    let globalRot = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      const time = Date.now() * 0.001;
      
      globalRot += 0.0008;
      nebulaPoints.rotation.y = globalRot;
      stars.rotation.y -= 0.00002;

      planetsRef.current.forEach((p) => {
        // Orbit dynamics along the Mobius strip
        p.u += 0.0015; 
        const u = p.u;
        const v = Math.sin(time * 0.5 + p.offset) * 0.15; 
        
        const x = (radius + v * Math.cos(u / 2)) * Math.cos(u);
        const y = (radius + v * Math.cos(u / 2)) * Math.sin(u);
        const z = v * Math.sin(u / 2);

        p.mesh.position.set(x, z, y);
        
        // Handle dynamic scaling based on hoveredId prop
        const isHovered = hoveredId === p.courseId || (p.courseId === 'data' && hoveredId === 'core');
        const targetScale = isHovered ? 2.5 : 1.0;
        const lerpFactor = 0.1;
        
        p.baseScale = THREE.MathUtils.lerp(p.baseScale, targetScale, lerpFactor);
        
        // Add breathing effect on top of base scale
        const breath = Math.sin(time * 2 + p.offset) * 0.05;
        p.mesh.scale.set(p.baseScale + breath, p.baseScale + breath, p.baseScale + breath);
        
        // Scale orbit ring and increase its visibility if hovered
        p.orbitRing.scale.set(1.5, 1.5, 1.5);
        // Fix: Cast material to MeshBasicMaterial to access opacity property which is not on the base Material type.
        const ringMaterial = p.orbitRing.material as THREE.MeshBasicMaterial;
        ringMaterial.opacity = THREE.MathUtils.lerp(ringMaterial.opacity, isHovered ? 0.6 : 0.1, lerpFactor);
        p.orbitRing.rotation.z += 0.01;
      });

      updateLines();
      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      nebulaGeo.dispose(); nebulaMat.dispose();
      starGeo.dispose(); starMat.dispose();
    };
  }, [isMobile, courses]);

  return <div ref={mountRef} className="w-full h-full" />;
};

export default MobiusGalaxy;

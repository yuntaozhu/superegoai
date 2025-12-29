
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
  
  // Use a ref for hoveredId so we can access the latest value in the animation loop
  // without triggering the main useEffect to re-run and re-create the WebGL context.
  const hoveredIdRef = useRef(hoveredId);
  useEffect(() => {
    hoveredIdRef.current = hoveredId;
  }, [hoveredId]);

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

    // 获取实际尺寸
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = isMobile ? 16 : 20;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: !isMobile, // 移动端关闭抗锯齿提升性能
      alpha: true,
      powerPreference: "high-performance" 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const radius = isMobile ? 6.0 : 10.0;
    const stripWidth = isMobile ? 2.0 : 3.5;
    
    // 1. 优化背景星空 - 减少点数
    const starGeo = new THREE.BufferGeometry();
    const starCoords = [];
    const starCount = isMobile ? 300 : 800;
    for (let i = 0; i < starCount; i++) {
      starCoords.push(THREE.MathUtils.randFloatSpread(800));
      starCoords.push(THREE.MathUtils.randFloatSpread(800));
      starCoords.push(THREE.MathUtils.randFloatSpread(800));
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starCoords, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.8, transparent: true, opacity: 0.2 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // 2. 优化莫比乌斯星云 - 降低粒子数量 (从 25000 降至 5000)
    const nebulaGeo = new THREE.BufferGeometry();
    const nebulaCount = isMobile ? 2000 : 5000;
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
    const nebulaMat = new THREE.PointsMaterial({ 
      size: 0.05, 
      vertexColors: true, 
      transparent: true, 
      opacity: 0.15, 
      blending: THREE.AdditiveBlending 
    });
    const nebulaPoints = new THREE.Points(nebulaGeo, nebulaMat);
    scene.add(nebulaPoints);

    // 3. 核心行星系统
    const planetGroup = new THREE.Group();
    scene.add(planetGroup);

    const getHex = (id: string) => {
      const map: any = { data: 0xffd700, 'digital-twin': 0x00bfff, art: 0x8a2be2, sports: 0xff4500, solopreneur: 0x00ffff, quant: 0x2e8b57 };
      return map[id] || 0xffffff;
    };

    const courseIds = ['data', 'digital-twin', 'art', 'sports', 'solopreneur', 'quant'];
    // Clear refs before populating to avoid duplicates on strict mode remounts
    planetsRef.current = [];
    
    courseIds.forEach((id, i) => {
      const hex = getHex(id);
      const geometry = new THREE.SphereGeometry(isMobile ? 0.12 : 0.18, 16, 16); // 降低分段数
      const material = new THREE.MeshPhongMaterial({
        color: hex,
        emissive: hex,
        emissiveIntensity: 1.0,
        shininess: 30,
        transparent: true,
        opacity: 0.9
      });
      const mesh = new THREE.Mesh(geometry, material);
      
      const ringGeo = new THREE.TorusGeometry(0.4, 0.005, 8, 50); // 降低复杂度
      const ringMat = new THREE.MeshBasicMaterial({ color: hex, transparent: true, opacity: 0.05 });
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

    // 4. 优化连线系统 - 移动端直接关闭以省电
    const lineGroup = new THREE.Group();
    if (!isMobile) {
      scene.add(lineGroup);
    }
    const lineMat = new THREE.LineBasicMaterial({ 
      color: 0xffffff, 
      transparent: true, 
      opacity: 0.02, 
      blending: THREE.AdditiveBlending 
    });

    const updateLines = () => {
      if (isMobile) return; // 移动端跳过
      lineGroup.clear();
      const count = planetsRef.current.length;
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const points = [planetsRef.current[i].mesh.position, planetsRef.current[j].mesh.position];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          lineGroup.add(new THREE.Line(geometry, lineMat));
        }
      }
    };

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const pl = new THREE.PointLight(0xffffff, 1.5);
    pl.position.set(10, 10, 10);
    scene.add(pl);

    let frame = 0;
    let requestID: number;

    const animate = () => {
      requestID = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;
      frame++;

      nebulaPoints.rotation.y += 0.0005;
      stars.rotation.y -= 0.00001;

      planetsRef.current.forEach((p) => {
        p.u += 0.001; 
        const u = p.u;
        const v = Math.sin(time * 0.4 + p.offset) * 0.1; 
        const x = (radius + v * Math.cos(u / 2)) * Math.cos(u);
        const y = (radius + v * Math.cos(u / 2)) * Math.sin(u);
        const z = v * Math.sin(u / 2);
        p.mesh.position.set(x, z, y);
        
        // Use ref to check hovered status without re-triggering effects
        const currentHoverId = hoveredIdRef.current;
        const isHovered = currentHoverId === p.courseId || (p.courseId === 'data' && currentHoverId === 'core');
        
        const targetScale = isHovered ? (isMobile ? 1.8 : 2.5) : 1.0;
        p.baseScale = THREE.MathUtils.lerp(p.baseScale, targetScale, 0.08);
        p.mesh.scale.setScalar(p.baseScale);
        
        const ringMaterial = p.orbitRing.material as THREE.MeshBasicMaterial;
        ringMaterial.opacity = THREE.MathUtils.lerp(ringMaterial.opacity, isHovered ? 0.5 : 0.05, 0.1);
        p.orbitRing.rotation.z += 0.01;
      });

      // 每 2 帧更新一次连线，降低 CPU 压力
      if (frame % 2 === 0) updateLines();
      
      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      // STOP THE LOOP
      cancelAnimationFrame(requestID);
      
      window.removeEventListener('resize', onResize);
      
      // DISPOSE RESOURCES
      renderer.dispose();
      
      nebulaGeo.dispose();
      nebulaMat.dispose();
      
      starGeo.dispose();
      starMat.dispose();
      
      lineMat.dispose();
      
      planetsRef.current.forEach(p => {
        p.mesh.geometry.dispose();
        if (p.mesh.material instanceof THREE.Material) p.mesh.material.dispose();
        
        p.orbitRing.geometry.dispose();
        if (p.orbitRing.material instanceof THREE.Material) p.orbitRing.material.dispose();
      });
      
      // Remove canvas
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [isMobile, courses]); // Removed hoveredId from dependency array

  return <div ref={mountRef} className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />;
};

export default MobiusGalaxy;

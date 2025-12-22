
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Course } from '../types';

interface MobiusGalaxyProps {
  orientation: 'horizontal' | 'vertical';
  isMobile?: boolean;
  courses?: Course[];
  onSelectCourse?: (course: Course) => void;
  onHoverCourse?: (course: Course | null) => void;
}

const MobiusGalaxy: React.FC<MobiusGalaxyProps> = ({ 
  orientation, 
  isMobile = false, 
  courses = [], 
  onSelectCourse, 
  onHoverCourse 
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const planetsRef = useRef<{ mesh: THREE.Mesh; courseId: string; u: number; offset: number }[]>([]);

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
    
    // 1. 背景微弱星辰
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

    // 2. 莫比乌斯星云带 (Neural Cloud)
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
    const nebulaMat = new THREE.PointsMaterial({ size: 0.03, vertexColors: true, transparent: true, opacity: 0.15, blending: THREE.AdditiveBlending });
    const nebulaPoints = new THREE.Points(nebulaGeo, nebulaMat);
    scene.add(nebulaPoints);

    // 3. 微缩行星系统 (The 6 Nodes)
    const planetGroup = new THREE.Group();
    scene.add(planetGroup);

    const getHex = (id: string) => {
      const map: any = { data: 0xffd700, 'digital-twin': 0x00bfff, art: 0x8a2be2, sports: 0xff4500, solopreneur: 0x00ffff, quant: 0x2e8b57 };
      return map[id] || 0xffffff;
    };

    const courseIds = ['data', 'digital-twin', 'art', 'sports', 'solopreneur', 'quant'];
    
    courseIds.forEach((id, i) => {
      const hex = getHex(id);
      const geometry = new THREE.SphereGeometry(0.12, 16, 16);
      const material = new THREE.MeshPhongMaterial({
        color: hex,
        emissive: hex,
        emissiveIntensity: 2,
        shininess: 100,
        transparent: true,
        opacity: 0.9
      });
      const mesh = new THREE.Mesh(geometry, material);
      
      // 添加内光晕
      const auraGeo = new THREE.SphereGeometry(0.2, 8, 8);
      const auraMat = new THREE.MeshBasicMaterial({ color: hex, transparent: true, opacity: 0.2 });
      const aura = new THREE.Mesh(auraGeo, auraMat);
      mesh.add(aura);

      planetsRef.current.push({ 
        mesh, 
        courseId: id, 
        u: (i / courseIds.length) * Math.PI * 2,
        offset: Math.random() * 2 
      });
      planetGroup.add(mesh);
    });

    // 4. 神经连接线 (Neural Web)
    const lineGroup = new THREE.Group();
    scene.add(lineGroup);
    const lineMat = new THREE.LineBasicMaterial({ 
      color: 0xffffff, 
      transparent: true, 
      opacity: 0.05, 
      blending: THREE.AdditiveBlending 
    });

    const updateNeuralWeb = () => {
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

    // 灯光
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const pl = new THREE.PointLight(0xffffff, 1.2);
    pl.position.set(10, 10, 10);
    scene.add(pl);

    // 动画循环
    let globalRot = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      const time = Date.now() * 0.0008;
      
      globalRot += 0.0012;
      nebulaPoints.rotation.y = globalRot;
      stars.rotation.y -= 0.00005;

      planetsRef.current.forEach((p, i) => {
        // 让行星沿着带状轨道自主运动
        p.u += 0.002; 
        const u = p.u;
        const v = Math.sin(time + p.offset) * 0.1; // 在轨道宽度内轻微漂浮
        
        const x = (radius + v * Math.cos(u / 2)) * Math.cos(u);
        const y = (radius + v * Math.cos(u / 2)) * Math.sin(u);
        const z = v * Math.sin(u / 2);

        p.mesh.position.set(x, z, y);
        
        // 呼吸脉冲效果
        const s = 1 + Math.sin(time * 3 + p.offset) * 0.15;
        p.mesh.scale.set(s, s, s);
      });

      updateNeuralWeb();
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
  }, [isMobile]);

  return <div ref={mountRef} className="w-full h-full" />;
};

export default MobiusGalaxy;

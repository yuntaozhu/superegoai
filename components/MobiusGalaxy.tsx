
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
  const mouse = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  const planetsRef = useRef<{ mesh: THREE.Mesh; course: Course; u: number; baseColor: number }[]>([]);
  const linesRef = useRef<THREE.Line[]>([]);

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
    const stripWidth = isMobile ? 3.0 : 4.5;
    
    // 1. Stellar Background
    const starGeo = new THREE.BufferGeometry();
    const starCoords = [];
    for (let i = 0; i < 3000; i++) {
      starCoords.push(THREE.MathUtils.randFloatSpread(1000));
      starCoords.push(THREE.MathUtils.randFloatSpread(1000));
      starCoords.push(THREE.MathUtils.randFloatSpread(1000));
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starCoords, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7, transparent: true, opacity: 0.15 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // 2. Neural Nebula (The Strip)
    const nebulaGeo = new THREE.BufferGeometry();
    const nebulaCount = isMobile ? 15000 : 40000;
    const nebulaPos = new Float32Array(nebulaCount * 3);
    const nebulaColors = new Float32Array(nebulaCount * 3);
    const colorPalette = [new THREE.Color(0x3b82f6), new THREE.Color(0x8b5cf6), new THREE.Color(0x06b6d4)];

    for (let i = 0; i < nebulaCount; i++) {
      const u = Math.random() * Math.PI * 2;
      const v = (Math.pow(Math.random(), 2) - 0.5) * stripWidth;
      const x = (radius + v * Math.cos(u / 2)) * Math.cos(u);
      const y = (radius + v * Math.cos(u / 2)) * Math.sin(u);
      const z = v * Math.sin(u / 2);
      
      const idx = i * 3;
      nebulaPos[idx] = x; nebulaPos[idx + 1] = z; nebulaPos[idx + 2] = y;
      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      nebulaColors[idx] = col.r; nebulaColors[idx + 1] = col.g; nebulaColors[idx + 2] = col.b;
    }
    nebulaGeo.setAttribute('position', new THREE.BufferAttribute(nebulaPos, 3));
    nebulaGeo.setAttribute('color', new THREE.BufferAttribute(nebulaColors, 3));
    const nebulaMat = new THREE.PointsMaterial({ size: 0.05, vertexColors: true, transparent: true, opacity: 0.25, blending: THREE.AdditiveBlending });
    const nebulaPoints = new THREE.Points(nebulaGeo, nebulaMat);
    scene.add(nebulaPoints);

    // 3. Miniature Planets
    const planetGroup = new THREE.Group();
    scene.add(planetGroup);

    const getHexColor = (courseId: string) => {
      const map: any = {
        data: 0xffd700,
        'digital-twin': 0x00bfff,
        art: 0x8a2be2,
        sports: 0xff4500,
        solopreneur: 0x00ffff,
        quant: 0x2e8b57
      };
      return map[courseId] || 0xffffff;
    };

    courses.forEach((course, i) => {
      const u = (i / courses.length) * Math.PI * 2;
      const hex = getHexColor(course.id);
      
      // Planet Core
      const geometry = new THREE.SphereGeometry(isMobile ? 0.35 : 0.5, 32, 32);
      const material = new THREE.MeshPhongMaterial({
        color: hex,
        emissive: hex,
        emissiveIntensity: 0.6,
        shininess: 100,
        transparent: true,
        opacity: 0.95
      });
      const mesh = new THREE.Mesh(geometry, material);
      
      // Atmosphere Ring
      const ringGeo = new THREE.TorusGeometry(isMobile ? 0.5 : 0.7, 0.02, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({ color: hex, transparent: true, opacity: 0.3 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      mesh.add(ring);

      planetsRef.current.push({ mesh, course, u, baseColor: hex });
      planetGroup.add(mesh);
    });

    // 4. Neural Web Connections (Echo Links)
    const lineGroup = new THREE.Group();
    scene.add(lineGroup);
    const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.15, blending: THREE.AdditiveBlending });

    const drawNeuralWeb = () => {
      lineGroup.clear();
      const count = planetsRef.current.length;
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const points = [planetsRef.current[i].mesh.position, planetsRef.current[j].mesh.position];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const line = new THREE.Line(geometry, lineMat);
          lineGroup.add(line);
        }
      }
    };

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const pointLight = new THREE.PointLight(0xffffff, 1.2);
    pointLight.position.set(15, 15, 15);
    scene.add(pointLight);

    // Animation
    let globalRotation = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      const time = Date.now() * 0.001;
      
      globalRotation += 0.0012;
      nebulaPoints.rotation.y = globalRotation;
      stars.rotation.y -= 0.0001;

      planetsRef.current.forEach((p, i) => {
        const u = p.u + globalRotation;
        // Float on Mobius path with slight bobbing
        const v = Math.sin(time * 1.5 + i) * 0.25;
        p.mesh.position.x = (radius + v * Math.cos(u / 2)) * Math.cos(u);
        p.mesh.position.z = (radius + v * Math.cos(u / 2)) * Math.sin(u);
        p.mesh.position.y = v * Math.sin(u / 2);
        
        p.mesh.rotation.y += 0.015;
        // Subtle pulse
        const pulse = 1 + Math.sin(time * 3 + i) * 0.05;
        p.mesh.scale.set(pulse, pulse, pulse);
      });

      drawNeuralWeb();
      renderer.render(scene, camera);
    };

    animate();

    // Interaction
    const onMouseMove = (e: MouseEvent) => {
      const rect = mountRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouse.x = ((e.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(planetGroup.children);

      if (intersects.length > 0) {
        document.body.style.cursor = 'pointer';
        const hit = planetsRef.current.find(p => p.mesh === intersects[0].object);
        if (hit) {
          onHoverCourse?.(hit.course);
          lineMat.opacity = 0.4;
        }
      } else {
        document.body.style.cursor = 'default';
        onHoverCourse?.(null);
        lineMat.opacity = 0.15;
      }
    };

    const onClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(planetGroup.children);
      if (intersects.length > 0) {
        const hit = planetsRef.current.find(p => p.mesh === intersects[0].object);
        if (hit) onSelectCourse?.(hit.course);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);

    const onResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      renderer.dispose();
      nebulaGeo.dispose(); nebulaMat.dispose();
      starGeo.dispose(); starMat.dispose();
    };
  }, [orientation, isMobile, courses]);

  return <div ref={mountRef} className="w-full h-full" />;
};

export default MobiusGalaxy;

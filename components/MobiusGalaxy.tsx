
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Course } from '../types';

interface MobiusGalaxyProps {
  courses: Course[];
  orientation: 'horizontal' | 'vertical';
  isMobile?: boolean;
  onSelectCourse: (course: Course) => void;
  onHoverCourse?: (course: Course | null) => void;
}

const MobiusGalaxy: React.FC<MobiusGalaxyProps> = ({ courses, orientation, isMobile = false, onSelectCourse, onHoverCourse }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const rotationTargetRef = useRef(0);
  const currentRotationRef = useRef(0);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020308);
    
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 2000);
    camera.position.z = isMobile ? 9 : 12;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const stripWidth = isMobile ? 2.0 : 2.8; 
    const radius = isMobile ? 3.8 : 5.8;
    
    // Starfield
    const starGeo = new THREE.BufferGeometry();
    const starCoords = [];
    for (let i = 0; i < 6000; i++) {
      starCoords.push(THREE.MathUtils.randFloatSpread(1000));
      starCoords.push(THREE.MathUtils.randFloatSpread(1000));
      starCoords.push(THREE.MathUtils.randFloatSpread(1000));
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starCoords, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7, transparent: true, opacity: 0.4 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // Nebula Ribbon
    const nebulaGeo = new THREE.BufferGeometry();
    const nebulaCount = isMobile ? 5000 : 12000;
    const nebulaPos = new Float32Array(nebulaCount * 3);
    const nebulaColors = new Float32Array(nebulaCount * 3);
    const palette = [new THREE.Color(0x3b82f6), new THREE.Color(0x8b5cf6), new THREE.Color(0x06b6d4)];

    for (let i = 0; i < nebulaCount; i++) {
      const u = Math.random() * Math.PI * 2;
      const v = (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1)) * stripWidth;
      const x = (radius + v * Math.cos(u / 2)) * Math.cos(u);
      const y = (radius + v * Math.cos(u / 2)) * Math.sin(u);
      const z = (v * Math.sin(u / 2));
      
      const idx = i * 3;
      if (orientation === 'vertical') { nebulaPos[idx] = z; nebulaPos[idx + 1] = y; nebulaPos[idx + 2] = x; }
      else { nebulaPos[idx] = x; nebulaPos[idx + 1] = z; nebulaPos[idx + 2] = y; }
      
      const col = palette[Math.floor(Math.random() * palette.length)];
      nebulaColors[idx] = col.r; nebulaColors[idx + 1] = col.g; nebulaColors[idx + 2] = col.b;
    }
    nebulaGeo.setAttribute('position', new THREE.BufferAttribute(nebulaPos, 3));
    nebulaGeo.setAttribute('color', new THREE.BufferAttribute(nebulaColors, 3));
    const nebulaMat = new THREE.PointsMaterial({ size: 0.04, vertexColors: true, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending });
    const nebulaPoints = new THREE.Points(nebulaGeo, nebulaMat);
    scene.add(nebulaPoints);

    // Planet Texture Gen
    const createPlanetTexture = (baseColor: number, text: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024; canvas.height = 512;
      const ctx = canvas.getContext('2d')!;
      const color = new THREE.Color(baseColor);
      ctx.fillStyle = `rgb(${color.r*255},${color.g*255},${color.b*255})`;
      ctx.fillRect(0, 0, 1024, 512);
      
      for (let i = 0; i < 4000; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 512;
        const size = Math.random() * 2;
        const alpha = Math.random() * 0.3;
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.beginPath(); ctx.arc(x, y, size, 0, Math.PI * 2); ctx.fill();
      }
      
      ctx.font = 'bold 100px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'white';
      ctx.fillText(text.toUpperCase(), 256, 256);
      ctx.fillText(text.toUpperCase(), 768, 256);

      const texture = new THREE.CanvasTexture(canvas);
      return texture;
    };

    const planetGroup = new THREE.Group();
    scene.add(planetGroup);
    const planetMeshes: THREE.Mesh[] = [];
    const planetScale = isMobile ? 0.35 : 0.55;

    courses.forEach((course, idx) => {
      const u = (idx / courses.length) * Math.PI * 2;
      const vOffsets = [0.8, -0.8, 0.4, -0.4, 0.9, -0.9];
      const v = vOffsets[idx % vOffsets.length] * stripWidth * 0.45;

      const x = (radius + v * Math.cos(u / 2)) * Math.cos(u);
      const y = (radius + v * Math.cos(u / 2)) * Math.sin(u);
      const z = v * Math.sin(u / 2);

      const getColor = (colorStr: string) => {
        if (colorStr.includes('#')) return parseInt(colorStr.replace('#', '0x'));
        if (colorStr.includes('FFD700')) return 0xFFD700;
        if (colorStr.includes('00BFFF')) return 0x00BFFF;
        return 0xffffff;
      };
      
      // Simple logic to extract color from "from-[#HEX]" or fallback
      const hexMatch = course.color.match(/#([0-9A-F]{6})/i);
      const baseColor = hexMatch ? parseInt(hexMatch[1], 16) : 0x3b82f6;

      const sphereGeo = new THREE.SphereGeometry(planetScale, 64, 64);
      const sphereMat = new THREE.MeshStandardMaterial({
        map: createPlanetTexture(baseColor, course.organ.split(' ')[1] || course.organ),
        roughness: 0.7,
        metalness: 0.3,
        emissive: baseColor,
        emissiveIntensity: 0.2
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      
      if (orientation === 'vertical') sphere.position.set(z, y, x);
      else sphere.position.set(x, z, y);
      
      sphere.userData = { course, originalScale: planetScale };
      planetMeshes.push(sphere);
      planetGroup.add(sphere);

      // Label
      const labelCanvas = document.createElement('canvas');
      labelCanvas.width = 512; labelCanvas.height = 100;
      const lCtx = labelCanvas.getContext('2d')!;
      lCtx.font = `bold 36px monospace`;
      lCtx.textAlign = 'center';
      lCtx.fillStyle = `rgba(255,255,255,0.9)`;
      lCtx.fillText(course.organ, 256, 50);
      const labelTexture = new THREE.CanvasTexture(labelCanvas);
      const labelSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: labelTexture, transparent: true }));
      labelSprite.scale.set(1.8, 0.35, 1);
      labelSprite.position.y = planetScale + 0.6;
      sphere.add(labelSprite);
    });

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const sunLight = new THREE.PointLight(0xffffff, 30);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    const onPointerDown = (e: any) => {
      isDraggingRef.current = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      startX = clientX; startY = clientY;
    };

    const onPointerMove = (e: any) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      if (isDraggingRef.current) {
        const delta = orientation === 'vertical' ? clientY - startY : clientX - startX;
        rotationTargetRef.current += delta * (isMobile ? 0.006 : 0.003);
        startX = clientX; startY = clientY;
      }
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / height) * 2 + 1;

      // Raycasting for hover
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(planetMeshes);
      if (intersects.length > 0) {
        onHoverCourse?.((intersects[0].object as any).userData.course);
      } else {
        onHoverCourse?.(null);
      }
    };

    const onPointerUp = () => isDraggingRef.current = false;
    const onClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(planetMeshes);
      if (intersects.length > 0) {
        onSelectCourse((intersects[0].object as any).userData.course);
      }
    };

    let startX = 0, startY = 0;
    window.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    window.addEventListener('touchstart', onPointerDown, { passive: false });
    window.addEventListener('touchmove', onPointerMove, { passive: false });
    window.addEventListener('touchend', onPointerUp);
    window.addEventListener('click', onClick);

    const animate = () => {
      requestAnimationFrame(animate);
      const now = Date.now();
      currentRotationRef.current += (rotationTargetRef.current - currentRotationRef.current) * 0.05;
      if (!isDraggingRef.current) rotationTargetRef.current += 0.0008;

      if (orientation === 'vertical') {
        nebulaPoints.rotation.x = currentRotationRef.current;
        planetGroup.rotation.x = currentRotationRef.current;
      } else {
        nebulaPoints.rotation.y = currentRotationRef.current;
        planetGroup.rotation.y = currentRotationRef.current;
      }

      stars.rotation.y += 0.0001;
      planetMeshes.forEach((mesh, i) => {
        mesh.rotation.y += 0.01;
        mesh.position.y += Math.sin(now * 0.001 + i) * 0.001;
      });

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
      window.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('click', onClick);
      renderer.dispose();
    };
  }, [courses, orientation, isMobile]);

  return <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing outline-none" />;
};

export default MobiusGalaxy;

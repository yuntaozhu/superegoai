
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Course } from '../types';

interface MobiusGalaxyProps {
  courses: Course[];
  orientation: 'horizontal' | 'vertical';
  isMobile?: boolean;
  onSelectCourse: (course: Course) => void;
}

const MobiusGalaxy: React.FC<MobiusGalaxyProps> = ({ courses, orientation, isMobile = false, onSelectCourse }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  useEffect(() => {
    if (!mountRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x02040a);
    
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    // Move camera further back on mobile to see the full spiral
    camera.position.z = isMobile ? 8.5 : 10;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Params
    const segments = 300;
    // Wider strip on mobile to allow scattered distribution
    const stripWidth = isMobile ? 1.5 : 1.2; 
    const radius = isMobile ? 3.2 : 4.5;
    const particleCount = isMobile ? 5000 : 12000;

    // 1. Nebula Stardust System (More cloud-like)
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(particleCount * 3);
    const starColors = new Float32Array(particleCount * 3);
    const starSizes = new Float32Array(particleCount);

    const colorPalette = [
      new THREE.Color(0x3b82f6), // Blue
      new THREE.Color(0x8b5cf6), // Purple
      new THREE.Color(0x06b6d4), // Cyan
      new THREE.Color(0x1e3a8a), // Deep Blue
      new THREE.Color(0xffffff), // White
    ];

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random() * Math.PI * 2;
      // Gaussian-like distribution for particles around the core path
      const v = (Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : -1)) * stripWidth;
      
      const jitter = (Math.random() - 0.5) * 0.4;
      const x = (radius + v * Math.cos(u / 2)) * Math.cos(u) + jitter;
      const y = (radius + v * Math.cos(u / 2)) * Math.sin(u) + jitter;
      const z = (v * Math.sin(u / 2)) + jitter;

      const idx = i * 3;
      if (orientation === 'vertical') {
        starPositions[idx] = z;
        starPositions[idx + 1] = y;
        starPositions[idx + 2] = x;
      } else {
        starPositions[idx] = x;
        starPositions[idx + 1] = z;
        starPositions[idx + 2] = y;
      }

      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      starColors[idx] = col.r;
      starColors[idx + 1] = col.g;
      starColors[idx + 2] = col.b;

      starSizes[i] = Math.random() * (isMobile ? 0.04 : 0.06);
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

    const starMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.03 : 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const nebula = new THREE.Points(starGeometry, starMaterial);
    scene.add(nebula);

    // 2. Planet Objects (Scattered laterally)
    const planetGroup = new THREE.Group();
    scene.add(planetGroup);

    const planetMeshes: THREE.Mesh[] = [];
    const planetScale = isMobile ? 0.22 : 0.45;

    courses.forEach((course, idx) => {
      const u = (idx / courses.length) * Math.PI * 2;
      
      // SCATTER LOGIC: Stagger planets across the ribbon's width
      // Alternate left, center-ish, right to avoid vertical alignment in vertical mode
      const scatterWidth = stripWidth * 0.6;
      const vOffsets = [scatterWidth, -scatterWidth, scatterWidth * 0.3, -scatterWidth * 0.3, 0];
      const v = vOffsets[idx % vOffsets.length];

      const x = (radius + v * Math.cos(u / 2)) * Math.cos(u);
      const y = (radius + v * Math.cos(u / 2)) * Math.sin(u);
      const z = v * Math.sin(u / 2);

      // Planet Sphere
      const sphereGeo = new THREE.SphereGeometry(planetScale, 64, 64);
      
      const getColor = (colorStr: string) => {
        if (colorStr.includes('blue')) return 0x3b82f6;
        if (colorStr.includes('purple')) return 0xa855f7;
        if (colorStr.includes('orange')) return 0xf97316;
        if (colorStr.includes('emerald')) return 0x10b981;
        if (colorStr.includes('yellow')) return 0xfacc15;
        if (colorStr.includes('indigo')) return 0x6366f1;
        return 0xffffff;
      };

      const baseColor = getColor(course.color);
      const sphereMat = new THREE.MeshPhongMaterial({
        color: baseColor,
        emissive: baseColor,
        emissiveIntensity: 0.8,
        shininess: 100
      });

      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      
      if (orientation === 'vertical') {
        sphere.position.set(z, y, x);
      } else {
        sphere.position.set(x, z, y);
      }
      
      sphere.userData = { course };
      planetMeshes.push(sphere);
      planetGroup.add(sphere);

      // Course Name Label (Optimized for mobile)
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.font = `bold ${isMobile ? '40px' : '48px'} Inter, Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'white';
        // Stroke for text legibility against nebula
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;
        
        const text = course.shortTitle || course.title.split('：')[0];
        const displayText = text.toUpperCase();
        ctx.strokeText(displayText, 256, 64);
        ctx.fillText(displayText, 256, 64);
      }
      const labelTexture = new THREE.CanvasTexture(canvas);
      const labelMat = new THREE.SpriteMaterial({ map: labelTexture, transparent: true });
      const labelSprite = new THREE.Sprite(labelMat);
      labelSprite.scale.set(isMobile ? 1.2 : 2.5, isMobile ? 0.3 : 0.625, 1);
      labelSprite.position.y = planetScale + (isMobile ? 0.35 : 0.6);
      sphere.add(labelSprite);
      
      // Floating Icon
      const iconCanvas = document.createElement('canvas');
      iconCanvas.width = 128;
      iconCanvas.height = 128;
      const iCtx = iconCanvas.getContext('2d');
      if (iCtx) {
        iCtx.font = `${isMobile ? '60px' : '80px'} Arial`;
        iCtx.textAlign = 'center';
        iCtx.textBaseline = 'middle';
        iCtx.fillText(course.icon, 64, 64);
      }
      const iconTexture = new THREE.CanvasTexture(iconCanvas);
      const iconMat = new THREE.SpriteMaterial({ map: iconTexture, transparent: true });
      const iconSprite = new THREE.Sprite(iconMat);
      iconSprite.scale.set(planetScale * 1.2, planetScale * 1.2, 1);
      iconSprite.position.y = - (planetScale + (isMobile ? 0.25 : 0.4));
      sphere.add(iconSprite);
    });

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 20);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Dynamic rotation logic
    let rotationTarget = 0;
    let currentRotation = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    const onPointerDown = (e: any) => {
      isDragging = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      startX = clientX;
      startY = clientY;
    };

    const onPointerMove = (e: any) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      
      if (isDragging) {
        const delta = orientation === 'vertical' ? clientY - startY : clientX - startX;
        rotationTarget += delta * 0.005;
        startX = clientX;
        startY = clientY;
      }
      
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / height) * 2 + 1;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(planetMeshes);
      if (intersects.length > 0) {
        onSelectCourse((intersects[0].object as any).userData.course);
      }
    };

    window.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    window.addEventListener('touchstart', onPointerDown, { passive: false });
    window.addEventListener('touchmove', onPointerMove, { passive: false });
    window.addEventListener('touchend', onPointerUp);
    window.addEventListener('click', onClick);

    const animate = () => {
      requestAnimationFrame(animate);

      currentRotation += (rotationTarget - currentRotation) * 0.05;
      rotationTarget += 0.0015; // Slow ambient drift

      if (orientation === 'vertical') {
        nebula.rotation.x = currentRotation;
        planetGroup.rotation.x = currentRotation;
      } else {
        nebula.rotation.y = currentRotation;
        planetGroup.rotation.y = currentRotation;
      }

      planetMeshes.forEach((mesh) => {
        mesh.rotation.y += 0.01;
        mesh.position.y += Math.sin(Date.now() * 0.001 + mesh.id) * 0.001;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      window.removeEventListener('click', onClick);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
    };
  }, [courses, orientation, isMobile]);

  return <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />;
};

export default MobiusGalaxy;

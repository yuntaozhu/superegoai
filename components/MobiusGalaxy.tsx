
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
    scene.background = new THREE.Color(0x050814);
    
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = isMobile ? 7 : 10;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Params
    const segments = 200;
    const stripWidth = isMobile ? 0.4 : 0.8;
    const radius = isMobile ? 3.0 : 4.5;
    const particleCount = isMobile ? 3000 : 8000;

    // 1. Nebula Stardust System
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(particleCount * 3);
    const starColors = new Float32Array(particleCount * 3);
    const starSizes = new Float32Array(particleCount);

    const colorPalette = [
      new THREE.Color(0x3b82f6), // Blue
      new THREE.Color(0x8b5cf6), // Purple
      new THREE.Color(0x06b6d4), // Cyan
      new THREE.Color(0xffffff), // White
    ];

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random() * Math.PI * 2;
      const v = (Math.random() - 0.5) * stripWidth * 1.5;
      
      // Mobius path + some jitter for nebula thickness
      const jitter = (Math.random() - 0.5) * 0.2;
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

      starSizes[i] = Math.random() * (isMobile ? 0.03 : 0.05);
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const nebula = new THREE.Points(starGeometry, starMaterial);
    scene.add(nebula);

    // 2. Core Ribbon (Faint glow following the path)
    const ribbonGeometry = new THREE.PlaneGeometry(radius * 2, stripWidth, segments, 1);
    const ribbonMaterial = new THREE.MeshBasicMaterial({
      color: 0x1e3a8a,
      transparent: true,
      opacity: 0.05,
      side: THREE.DoubleSide,
      wireframe: false
    });

    // We reuse the Mobius logic to deform a ribbon if needed, but for nebula look, the particles are better.
    // Let's add a soft glowing tube instead for more "core" feel.
    const curvePoints = [];
    for (let i = 0; i <= segments; i++) {
        const u = (i / segments) * Math.PI * 2;
        const x = radius * Math.cos(u);
        const y = radius * Math.sin(u);
        const z = 0;
        if (orientation === 'vertical') curvePoints.push(new THREE.Vector3(z, y, x));
        else curvePoints.push(new THREE.Vector3(x, z, y));
    }
    const tubeCurve = new THREE.CatmullRomCurve3(curvePoints, true);
    const tubeGeo = new THREE.TubeGeometry(tubeCurve, segments, 0.05, 8, true);
    const tubeMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.2 });
    const tube = new THREE.Mesh(tubeGeo, tubeMat);
    scene.add(tube);

    // 3. Planet Objects
    const planetGroup = new THREE.Group();
    scene.add(planetGroup);

    const planetMeshes: THREE.Mesh[] = [];
    const planetScale = isMobile ? 0.25 : 0.45;

    courses.forEach((course, idx) => {
      const u = (idx / courses.length) * Math.PI * 2;
      const v = 0;

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
        emissiveIntensity: 0.6,
        shininess: 100,
        flatShading: false
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

      // Atmosphere Glow
      const glowGeo = new THREE.SphereGeometry(planetScale * 1.25, 32, 32);
      const glowMat = new THREE.MeshBasicMaterial({
        color: baseColor,
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide
      });
      const glow = new THREE.Mesh(glowGeo, glowMat);
      sphere.add(glow);

      // Course Name Label
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'rgba(0,0,0,0)';
        ctx.fillRect(0,0,512,128);
        ctx.font = 'bold 48px Inter, Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Shadow for readability
        ctx.shadowColor = 'rgba(0,0,0,0.8)';
        ctx.shadowBlur = 10;
        ctx.fillStyle = 'white';
        
        // Split title if too long or just use shortTitle
        const text = course.shortTitle || course.title.split('：')[0];
        ctx.fillText(text.toUpperCase(), 256, 64);
      }
      const labelTexture = new THREE.CanvasTexture(canvas);
      const labelMat = new THREE.SpriteMaterial({ map: labelTexture, transparent: true });
      const labelSprite = new THREE.Sprite(labelMat);
      labelSprite.scale.set(isMobile ? 1.5 : 2.5, isMobile ? 0.375 : 0.625, 1);
      labelSprite.position.y = planetScale + (isMobile ? 0.4 : 0.6);
      sphere.add(labelSprite);
      
      // Icon above text
      const iconCanvas = document.createElement('canvas');
      iconCanvas.width = 128;
      iconCanvas.height = 128;
      const iCtx = iconCanvas.getContext('2d');
      if (iCtx) {
        iCtx.font = '80px Arial';
        iCtx.textAlign = 'center';
        iCtx.textBaseline = 'middle';
        iCtx.fillText(course.icon, 64, 64);
      }
      const iconTexture = new THREE.CanvasTexture(iconCanvas);
      const iconMat = new THREE.SpriteMaterial({ map: iconTexture, transparent: true });
      const iconSprite = new THREE.Sprite(iconMat);
      iconSprite.scale.set(planetScale * 1.2, planetScale * 1.2, 1);
      iconSprite.position.y = - (planetScale + (isMobile ? 0.3 : 0.4));
      sphere.add(iconSprite);
    });

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 15);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const blueLight = new THREE.PointLight(0x3b82f6, 10);
    blueLight.position.set(-10, -5, -10);
    scene.add(blueLight);

    // Interaction vars
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
        const clickedCourse = (intersects[0].object as any).userData.course;
        onSelectCourse(clickedCourse);
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
      rotationTarget += 0.001; // Slower constant drift

      if (orientation === 'vertical') {
        nebula.rotation.x = currentRotation;
        tube.rotation.x = currentRotation;
        planetGroup.rotation.x = currentRotation;
      } else {
        nebula.rotation.y = currentRotation;
        tube.rotation.y = currentRotation;
        planetGroup.rotation.y = currentRotation;
      }

      // Keep labels facing camera
      planetMeshes.forEach((mesh) => {
        mesh.rotation.y += 0.005;
        // Make planets "wobble" slightly for organic feel
        mesh.position.y += Math.sin(Date.now() * 0.001 + mesh.id) * 0.0005;
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
      tubeGeo.dispose();
      tubeMat.dispose();
    };
  }, [courses, orientation, isMobile]);

  return <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />;
};

export default MobiusGalaxy;


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
    scene.background = new THREE.Color(0x0a0f1e);
    
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = isMobile ? 8 : 10;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Mobius Strip Creation
    const mobiusGeometry = new THREE.BufferGeometry();
    const segments = 120;
    const stripWidth = isMobile ? 0.6 : 1.2;
    const radius = isMobile ? 3.5 : 5;

    const positions: number[] = [];
    const uvs: number[] = [];

    for (let i = 0; i <= segments; i++) {
      const u = (i / segments) * Math.PI * 2;
      for (let j = 0; j <= 1; j++) {
        const v = (j - 0.5) * stripWidth;
        
        // Mobius logic
        const x = (radius + v * Math.cos(u / 2)) * Math.cos(u);
        const y = (radius + v * Math.cos(u / 2)) * Math.sin(u);
        const z = v * Math.sin(u / 2);

        if (orientation === 'vertical') {
          positions.push(z, y, x);
        } else {
          positions.push(x, z, y);
        }
        uvs.push(i / segments, j);
      }
    }

    const indices: number[] = [];
    for (let i = 0; i < segments; i++) {
      const a = i * 2;
      const b = i * 2 + 1;
      const c = (i + 1) * 2;
      const d = (i + 1) * 2 + 1;
      indices.push(a, b, d);
      indices.push(a, d, c);
    }

    mobiusGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    mobiusGeometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    mobiusGeometry.setIndex(indices);
    mobiusGeometry.computeVertexNormals();

    const mobiusMaterial = new THREE.MeshPhongMaterial({
      color: 0x3b82f6,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.5,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.2,
      wireframe: true
    });

    const mobiusStrip = new THREE.Mesh(mobiusGeometry, mobiusMaterial);
    scene.add(mobiusStrip);

    // Planet Spheres
    const planetGroup = new THREE.Group();
    scene.add(planetGroup);

    const planetMeshes: THREE.Mesh[] = [];
    const planetScale = isMobile ? 0.4 : 0.6;

    courses.forEach((course, idx) => {
      const u = (idx / courses.length) * Math.PI * 2;
      const v = 0; // Center of the strip

      const x = (radius + v * Math.cos(u / 2)) * Math.cos(u);
      const y = (radius + v * Math.cos(u / 2)) * Math.sin(u);
      const z = v * Math.sin(u / 2);

      const sphereGeo = new THREE.SphereGeometry(planetScale, 32, 32);
      
      const getColor = (colorStr: string) => {
        if (colorStr.includes('blue')) return 0x3b82f6;
        if (colorStr.includes('purple')) return 0xa855f7;
        if (colorStr.includes('orange')) return 0xf97316;
        if (colorStr.includes('emerald')) return 0x10b981;
        if (colorStr.includes('yellow')) return 0xfacc15;
        if (colorStr.includes('indigo')) return 0x6366f1;
        return 0xffffff;
      };

      const sphereMat = new THREE.MeshPhongMaterial({
        color: getColor(course.color),
        emissive: getColor(course.color),
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

      // Icon Sprite for Planets
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.font = '70px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'white';
        ctx.fillText(course.icon, 64, 64);
      }
      const iconTexture = new THREE.CanvasTexture(canvas);
      const iconMat = new THREE.SpriteMaterial({ map: iconTexture, transparent: true });
      const sprite = new THREE.Sprite(iconMat);
      sprite.scale.set(planetScale * 2.5, planetScale * 2.5, 1);
      sprite.position.copy(sphere.position);
      sprite.position.multiplyScalar(1.1); // Slightly outside the planet
      planetGroup.add(sprite);
    });

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 20);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const backLight = new THREE.PointLight(0x3b82f6, 10);
    backLight.position.set(-5, -5, -5);
    scene.add(backLight);

    // Animation & Interaction
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
      
      // Update mouse for raycaster
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
        const clickedCourse = intersects[0].object.userData.course;
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

      // Smooth rotation
      currentRotation += (rotationTarget - currentRotation) * 0.05;
      rotationTarget += 0.002; // Constant slow drift

      if (orientation === 'vertical') {
        mobiusStrip.rotation.x = currentRotation;
        planetGroup.rotation.x = currentRotation;
      } else {
        mobiusStrip.rotation.y = currentRotation;
        planetGroup.rotation.y = currentRotation;
      }

      // Individual planet rotation and hover effect
      planetMeshes.forEach((mesh) => {
        mesh.rotation.y += 0.01;
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
      mobiusGeometry.dispose();
      mobiusMaterial.dispose();
    };
  }, [courses, orientation, isMobile]);

  return <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />;
};

export default MobiusGalaxy;


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
  const planetsRef = useRef<{ mesh: THREE.Mesh; course: Course; u: number }[]>([]);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 2000);
    camera.position.z = isMobile ? 18 : 22;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const stripWidth = isMobile ? 3.0 : 5.0; 
    const radius = isMobile ? 8.0 : 12.0;
    
    // 1. Background Stars
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

    // 2. Neural Ribbon Particles
    const nebulaGeo = new THREE.BufferGeometry();
    const nebulaCount = isMobile ? 10000 : 30000;
    const nebulaPos = new Float32Array(nebulaCount * 3);
    const nebulaColors = new Float32Array(nebulaCount * 3);
    
    const themeColors = [
      new THREE.Color(0x3b82f6), // Blue
      new THREE.Color(0x8b5cf6), // Violet
      new THREE.Color(0x06b6d4), // Cyan
      new THREE.Color(0xffd700)  // Gold
    ];

    for (let i = 0; i < nebulaCount; i++) {
      const u = Math.random() * Math.PI * 2;
      const v = (Math.pow(Math.random(), 2) - 0.5) * stripWidth;
      const x = (radius + v * Math.cos(u / 2)) * Math.cos(u);
      const y = (radius + v * Math.cos(u / 2)) * Math.sin(u);
      const z = v * Math.sin(u / 2);
      
      const idx = i * 3;
      nebulaPos[idx] = x; nebulaPos[idx + 1] = z; nebulaPos[idx + 2] = y;
      const col = themeColors[Math.floor(Math.random() * themeColors.length)];
      nebulaColors[idx] = col.r; nebulaColors[idx + 1] = col.g; nebulaColors[idx + 2] = col.b;
    }
    
    nebulaGeo.setAttribute('position', new THREE.BufferAttribute(nebulaPos, 3));
    nebulaGeo.setAttribute('color', new THREE.BufferAttribute(nebulaColors, 3));
    const nebulaMat = new THREE.PointsMaterial({ size: 0.04, vertexColors: true, transparent: true, opacity: 0.2, blending: THREE.AdditiveBlending });
    const nebulaPoints = new THREE.Points(nebulaGeo, nebulaMat);
    scene.add(nebulaPoints);

    // 3. Interactive Planets
    const planetGroup = new THREE.Group();
    scene.add(planetGroup);

    const getPlanetColor = (courseId: string) => {
      const colors: any = {
        data: 0xffd700, // Gold
        'digital-twin': 0x00bfff, // Blue
        art: 0x8a2be2, // Violet
        sports: 0xff4500, // Orange
        solopreneur: 0x00ffff, // Cyan
        quant: 0x2e8b57 // Green
      };
      return colors[courseId] || 0xffffff;
    };

    courses.forEach((course, i) => {
      const u = (i / courses.length) * Math.PI * 2;
      const x = radius * Math.cos(u);
      const y = radius * Math.sin(u);
      const z = 0; // Fixed v=0 for planet centers

      const geometry = new THREE.SphereGeometry(isMobile ? 0.4 : 0.6, 32, 32);
      const material = new THREE.MeshPhongMaterial({
        color: getPlanetColor(course.id),
        emissive: getPlanetColor(course.id),
        emissiveIntensity: 0.5,
        shininess: 100,
        transparent: true,
        opacity: 0.9
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, 0, y); // Swapped for horizontal orientation
      
      // Add a glow ring
      const ringGeo = new THREE.RingGeometry(0.8, 0.9, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color: getPlanetColor(course.id), side: THREE.DoubleSide, transparent: true, opacity: 0.2 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      mesh.add(ring);

      planetsRef.current.push({ mesh, course, u });
      planetGroup.add(mesh);
    });

    // 4. Neural Web Connections
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.1 });
    const lineGroup = new THREE.Group();
    scene.add(lineGroup);

    const updateConnections = () => {
      lineGroup.clear();
      const positions = planetsRef.current.map(p => p.mesh.position);
      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          const points = [positions[i], positions[j]];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const line = new THREE.Line(geometry, lineMaterial);
          lineGroup.add(line);
        }
      }
    };

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(20, 20, 20);
    scene.add(pointLight);

    // Animation loop
    let globalRotation = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      const time = Date.now() * 0.001;
      
      globalRotation += 0.0015;
      nebulaPoints.rotation.y = globalRotation;
      stars.rotation.y -= 0.0001;

      // Orbit Planets
      planetsRef.current.forEach((p, i) => {
        const u = p.u + globalRotation;
        // Mobius formula with micro-vibration
        const v = Math.sin(time * 2 + i) * 0.2; 
        p.mesh.position.x = (radius + v * Math.cos(u / 2)) * Math.cos(u);
        p.mesh.position.z = (radius + v * Math.cos(u / 2)) * Math.sin(u);
        p.mesh.position.y = v * Math.sin(u / 2);
        
        p.mesh.rotation.y += 0.01;
      });

      updateConnections();
      renderer.render(scene, camera);
    };

    animate();

    // Interaction Handlers
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(planetGroup.children);

      if (intersects.length > 0) {
        const hoveredPlanet = planetsRef.current.find(p => p.mesh === intersects[0].object);
        if (hoveredPlanet) {
          document.body.style.cursor = 'pointer';
          onHoverCourse?.(hoveredPlanet.course);
          // Highlight connections for this planet
          lineMaterial.opacity = 0.3;
        }
      } else {
        document.body.style.cursor = 'default';
        onHoverCourse?.(null);
        lineMaterial.opacity = 0.1;
      }
    };

    const handleClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(planetGroup.children);
      if (intersects.length > 0) {
        const selected = planetsRef.current.find(p => p.mesh === intersects[0].object);
        if (selected) onSelectCourse?.(selected.course);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      renderer.dispose();
      nebulaGeo.dispose();
      nebulaMat.dispose();
      starGeo.dispose();
      starMat.dispose();
    };
  }, [orientation, isMobile, courses]);

  return <div ref={mountRef} className="w-full h-full" />;
};

export default MobiusGalaxy;

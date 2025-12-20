
import React, { useEffect, useRef, useState } from 'react';
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
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  // Refs for animation values to avoid re-renders while maintaining smooth transitions
  const rotationTargetRef = useRef(0);
  const currentRotationRef = useRef(0);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. 初始化场景与相机
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020308);
    
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 2000);
    camera.position.z = isMobile ? 9 : 12;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // 参数配置
    const stripWidth = isMobile ? 2.0 : 2.8; 
    const radius = isMobile ? 3.8 : 5.8;
    
    // 2. 背景：远景星空 (Starfield)
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

    // 3. 莫比乌斯星云轨迹 (Nebula Ribbon)
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

    // --- Dynamic Effects Addition ---
    
    // Distant Drifting Nebulae Wisps
    const createWispTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 128; canvas.height = 128;
      const ctx = canvas.getContext('2d')!;
      const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, 'rgba(139, 92, 246, 0.15)');
      grad.addColorStop(0.5, 'rgba(59, 130, 246, 0.05)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(canvas);
    };
    
    const wispsGroup = new THREE.Group();
    scene.add(wispsGroup);
    const wispTexture = createWispTexture();
    const wisps: THREE.Sprite[] = [];
    for(let i=0; i < (isMobile ? 4 : 8); i++) {
      const wispMat = new THREE.SpriteMaterial({ map: wispTexture, transparent: true, blending: THREE.AdditiveBlending });
      const wisp = new THREE.Sprite(wispMat);
      const r = radius * (2 + Math.random() * 2);
      const a = Math.random() * Math.PI * 2;
      wisp.position.set(Math.cos(a)*r, (Math.random()-0.5)*20, Math.sin(a)*r);
      wisp.scale.set(15 + Math.random()*25, 15 + Math.random()*25, 1);
      wisp.userData = { speed: (Math.random() - 0.5) * 0.001, radius: r, angle: a };
      wisps.push(wisp);
      wispsGroup.add(wisp);
    }

    // Shooting Stars System
    const shootingStarsGroup = new THREE.Group();
    scene.add(shootingStarsGroup);
    const activeShootingStars: { mesh: THREE.Line, velocity: THREE.Vector3, life: number }[] = [];
    const shootingStarMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, blending: THREE.AdditiveBlending });

    const spawnShootingStar = () => {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, -5)
      ]);
      const line = new THREE.Line(geometry, shootingStarMat.clone());
      const angle = Math.random() * Math.PI * 2;
      const dist = radius * 4 + Math.random() * 100;
      line.position.set(Math.cos(angle) * dist, (Math.random() - 0.5) * 100, Math.sin(angle) * dist);
      
      const target = new THREE.Vector3((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20);
      const dir = target.clone().sub(line.position).normalize();
      line.lookAt(line.position.clone().add(dir));
      
      activeShootingStars.push({ mesh: line, velocity: dir.multiplyScalar(2.5 + Math.random() * 2), life: 1.0 });
      shootingStarsGroup.add(line);
    };

    // 4. 程序化星球纹理生成器
    const createPlanetTexture = (baseColor: number) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512; canvas.height = 256;
      const ctx = canvas.getContext('2d')!;
      const color = new THREE.Color(baseColor);
      
      ctx.fillStyle = `rgb(${color.r*255},${color.g*255},${color.b*255})`;
      ctx.fillRect(0, 0, 512, 256);
      
      for (let i = 0; i < 2000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 256;
        const size = Math.random() * 2;
        const alpha = Math.random() * 0.2;
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      
      for (let i = 0; i < 8; i++) {
        ctx.strokeStyle = `rgba(0,0,0,0.15)`;
        ctx.lineWidth = Math.random() * 15;
        ctx.beginPath();
        ctx.moveTo(0, Math.random() * 256);
        ctx.bezierCurveTo(170, Math.random() * 256, 340, Math.random() * 256, 512, Math.random() * 256);
        ctx.stroke();
      }
      return new THREE.CanvasTexture(canvas);
    };

    // 5. 行星系统
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
        if (colorStr.includes('blue')) return 0x3b82f6;
        if (colorStr.includes('purple')) return 0x8b5cf6;
        if (colorStr.includes('orange')) return 0xf97316;
        if (colorStr.includes('emerald')) return 0x10b981;
        if (colorStr.includes('yellow')) return 0xfacc15;
        if (colorStr.includes('indigo')) return 0x6366f1;
        return 0xffffff;
      };
      const baseColor = getColor(course.color);
      
      const sphereGeo = new THREE.SphereGeometry(planetScale, 64, 64);
      const sphereMat = new THREE.MeshStandardMaterial({
        map: createPlanetTexture(baseColor),
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

      // 大气层光晕
      const glowGeo = new THREE.SphereGeometry(planetScale * 1.3, 32, 32);
      const glowMat = new THREE.ShaderMaterial({
        uniforms: {
          glowColor: { value: new THREE.Color(baseColor) },
          viewVector: { value: camera.position }
        },
        vertexShader: `
          uniform vec3 viewVector;
          varying float intensity;
          void main() {
            vec3 vNormal = normalize(normalMatrix * normal);
            vec3 vNormel = normalize(viewVector - vec3(modelViewMatrix * vec4(position, 1.0)));
            intensity = pow(0.75 - dot(vNormal, vNormel), 4.5);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 glowColor;
          varying float intensity;
          void main() {
            gl_FragColor = vec4(glowColor, intensity);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
      });
      const glow = new THREE.Mesh(glowGeo, glowMat);
      sphere.add(glow);

      const courseName = course.title.includes('：') 
        ? course.title.split('：')[0] 
        : course.title;

      const labelCanvas = document.createElement('canvas');
      labelCanvas.width = 512; labelCanvas.height = 160;
      const lCtx = labelCanvas.getContext('2d')!;
      lCtx.shadowBlur = 15;
      lCtx.shadowColor = 'rgba(0,0,0,0.9)';
      
      lCtx.font = `bold ${isMobile ? '60px' : '68px'} Inter, "Microsoft YaHei", sans-serif`;
      lCtx.textAlign = 'center';
      lCtx.fillStyle = 'white';
      lCtx.fillText(courseName.toUpperCase(), 256, 80);
      
      lCtx.font = `bold 24px monospace`;
      lCtx.fillStyle = `rgba(255,255,255,0.7)`;
      lCtx.fillText(`MODULE_${course.id.toUpperCase()}`, 256, 120);

      const labelTexture = new THREE.CanvasTexture(labelCanvas);
      const labelMat = new THREE.SpriteMaterial({ map: labelTexture, transparent: true });
      const labelSprite = new THREE.Sprite(labelMat);
      labelSprite.scale.set(isMobile ? 1.8 : 2.5, isMobile ? 0.55 : 0.78, 1);
      labelSprite.position.y = planetScale + (isMobile ? 0.6 : 0.85);
      sphere.add(labelSprite);

      const iconCanvas = document.createElement('canvas');
      iconCanvas.width = 128; iconCanvas.height = 128;
      const iCtx = iconCanvas.getContext('2d')!;
      iCtx.font = `${isMobile ? '70px' : '90px'} Arial`;
      iCtx.textAlign = 'center';
      iCtx.textBaseline = 'middle';
      iCtx.fillText(course.icon, 64, 64);
      const iconTexture = new THREE.CanvasTexture(iconCanvas);
      const iconMat = new THREE.SpriteMaterial({ map: iconTexture, transparent: true });
      const iconSprite = new THREE.Sprite(iconMat);
      iconSprite.scale.set(planetScale * 1.3, planetScale * 1.3, 1);
      iconSprite.position.y = - (planetScale + (isMobile ? 0.35 : 0.5));
      sphere.add(iconSprite);
    });

    // 6. 光照系统
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const sunLight = new THREE.PointLight(0xffffff, 30);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);
    const rimLight = new THREE.DirectionalLight(0x3b82f6, 1.5);
    rimLight.position.set(10, 10, 10);
    scene.add(rimLight);

    // 交互逻辑
    const SENSITIVITY = isMobile ? 0.012 : 0.008;
    const INTERPOLATION = 0.1;

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
        rotationTargetRef.current += delta * SENSITIVITY;
        startX = clientX; startY = clientY;
      }
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / height) * 2 + 1;
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

    // 动画循环
    const animate = () => {
      requestAnimationFrame(animate);

      const now = Date.now();
      currentRotationRef.current += (rotationTargetRef.current - currentRotationRef.current) * INTERPOLATION;
      if (!isDraggingRef.current && focusedIndex === -1) {
        rotationTargetRef.current += 0.0012;
      }

      if (orientation === 'vertical') {
        nebulaPoints.rotation.x = currentRotationRef.current;
        planetGroup.rotation.x = currentRotationRef.current;
      } else {
        nebulaPoints.rotation.y = currentRotationRef.current;
        planetGroup.rotation.y = currentRotationRef.current;
      }

      // Background dynamic updates
      stars.rotation.y += 0.00015;
      starMat.opacity = 0.35 + Math.sin(now * 0.0008) * 0.1; // Twinkle

      // Nebula Shimmer
      nebulaMat.opacity = 0.55 + Math.sin(now * 0.001) * 0.1;

      // Drifting Wisps Update
      wisps.forEach(wisp => {
        wisp.userData.angle += wisp.userData.speed;
        wisp.position.x = Math.cos(wisp.userData.angle) * wisp.userData.radius;
        wisp.position.z = Math.sin(wisp.userData.angle) * wisp.userData.radius;
        wisp.material.opacity = 0.8 + Math.sin(now * 0.0005 + wisp.userData.angle) * 0.2;
      });

      // Shooting Stars Update
      if (Math.random() < 0.005) spawnShootingStar();
      for (let i = activeShootingStars.length - 1; i >= 0; i--) {
        const ss = activeShootingStars[i];
        ss.mesh.position.add(ss.velocity);
        ss.life -= 0.015;
        (ss.mesh.material as THREE.LineBasicMaterial).opacity = ss.life;
        if (ss.life <= 0) {
          shootingStarsGroup.remove(ss.mesh);
          activeShootingStars.splice(i, 1);
        }
      }

      planetMeshes.forEach((mesh, i) => {
        mesh.rotation.y += 0.012;
        mesh.position.y += Math.sin(now * 0.001 + i) * 0.0015;
        
        const isFocused = i === focusedIndex;
        const targetScale = isFocused ? 1.3 : 1.0;
        mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, isFocused ? 0.8 : 0.2, 0.1);
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
      starGeo.dispose();
      nebulaGeo.dispose();
      wispTexture.dispose();
      shootingStarMat.dispose();
    };
  }, [courses, orientation, isMobile, focusedIndex]);

  // Keyboard Navigation Effect
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        setFocusedIndex(prev => (prev + 1) % courses.length);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setFocusedIndex(prev => (prev - 1 + courses.length) % courses.length);
      } else if (e.key === 'Enter' && focusedIndex !== -1) {
        onSelectCourse(courses[focusedIndex]);
      } else if (e.key === 'Escape') {
        setFocusedIndex(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [courses, focusedIndex, onSelectCourse]);

  useEffect(() => {
    if (focusedIndex !== -1) {
      const u = (focusedIndex / courses.length) * Math.PI * 2;
      rotationTargetRef.current = -u;
    }
  }, [focusedIndex, courses.length]);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full cursor-grab active:cursor-grabbing outline-none" 
      tabIndex={0}
      aria-label="3D Galaxy Navigation"
    />
  );
};

export default MobiusGalaxy;

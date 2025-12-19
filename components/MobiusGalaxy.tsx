
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
    const segments = 300;
    const stripWidth = isMobile ? 1.8 : 2.5; 
    const radius = isMobile ? 3.5 : 5.5;
    
    // 2. 背景：远景星空 (Starfield)
    const starGeo = new THREE.BufferGeometry();
    const starCoords = [];
    for (let i = 0; i < 6000; i++) {
      starCoords.push(THREE.MathUtils.randFloatSpread(1000));
      starCoords.push(THREE.MathUtils.randFloatSpread(1000));
      starCoords.push(THREE.MathUtils.randFloatSpread(1000));
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starCoords, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7, transparent: true, opacity: 0.5 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // 3. 莫比乌斯星云轨迹 (Nebula Ribbon)
    const nebulaGeo = new THREE.BufferGeometry();
    const nebulaCount = isMobile ? 4000 : 10000;
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

    // 4. 程序化星球纹理生成器
    const createPlanetTexture = (baseColor: number) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512; canvas.height = 256;
      const ctx = canvas.getContext('2d')!;
      const color = new THREE.Color(baseColor);
      
      // 填充底色
      ctx.fillStyle = `rgb(${color.r*255},${color.g*255},${color.b*255})`;
      ctx.fillRect(0, 0, 512, 256);
      
      // 添加程序化噪点
      for (let i = 0; i < 1500; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 256;
        const size = Math.random() * 3;
        const alpha = Math.random() * 0.3;
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // 添加纹路
      for (let i = 0; i < 5; i++) {
        ctx.strokeStyle = `rgba(0,0,0,0.1)`;
        ctx.lineWidth = Math.random() * 20;
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
    const planetScale = isMobile ? 0.3 : 0.5;

    courses.forEach((course, idx) => {
      const u = (idx / courses.length) * Math.PI * 2;
      const v = (idx % 2 === 0 ? 0.6 : -0.6) * stripWidth * 0.4; // 螺旋交错排列

      const x = (radius + v * Math.cos(u / 2)) * Math.cos(u);
      const y = (radius + v * Math.cos(u / 2)) * Math.sin(u);
      const z = v * Math.sin(u / 2);

      // 行星本体
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
        roughness: 0.8,
        metalness: 0.2,
        emissive: baseColor,
        emissiveIntensity: 0.15
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      
      if (orientation === 'vertical') sphere.position.set(z, y, x);
      else sphere.position.set(x, z, y);
      
      sphere.userData = { course };
      planetMeshes.push(sphere);
      planetGroup.add(sphere);

      // 大气层光晕效果 (Atmosphere Glow)
      const glowGeo = new THREE.SphereGeometry(planetScale * 1.25, 32, 32);
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
            intensity = pow(0.7 - dot(vNormal, vNormel), 4.0);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 glowColor;
          varying float intensity;
          void main() {
            vec3 glow = glowColor * intensity;
            gl_FragColor = vec4(glow, intensity);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
      });
      const glow = new THREE.Mesh(glowGeo, glowMat);
      sphere.add(glow);

      // 行星光环 (针对特定行星，如量化或代码行星)
      if (course.id === 'quant' || course.id === 'solopreneur') {
        const ringGeo = new THREE.RingGeometry(planetScale * 1.4, planetScale * 2.2, 64);
        const ringMat = new THREE.MeshBasicMaterial({ color: baseColor, side: THREE.DoubleSide, transparent: true, opacity: 0.2 });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2.5;
        sphere.add(ring);
      }

      // 文字标签 (HTML Canvas)
      const labelCanvas = document.createElement('canvas');
      labelCanvas.width = 512; labelCanvas.height = 128;
      const lCtx = labelCanvas.getContext('2d')!;
      lCtx.font = `bold ${isMobile ? '38px' : '48px'} Arial`;
      lCtx.textAlign = 'center';
      lCtx.fillStyle = 'white';
      lCtx.shadowBlur = 10; lCtx.shadowColor = 'black';
      lCtx.fillText((course.shortTitle || course.title).split('：')[0].toUpperCase(), 256, 64);
      const labelTexture = new THREE.CanvasTexture(labelCanvas);
      const labelMat = new THREE.SpriteMaterial({ map: labelTexture, transparent: true });
      const labelSprite = new THREE.Sprite(labelMat);
      labelSprite.scale.set(isMobile ? 1.4 : 2, isMobile ? 0.35 : 0.5, 1);
      labelSprite.position.y = planetScale + (isMobile ? 0.5 : 0.7);
      sphere.add(labelSprite);
    });

    // 6. 光照系统 (模仿恒星光源)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const sunLight = new THREE.PointLight(0xffffff, 25);
    sunLight.position.set(0, 0, 0); // 放在莫比乌斯环中心
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x3b82f6, 1);
    rimLight.position.set(5, 5, 5);
    scene.add(rimLight);

    // 交互逻辑
    let rotationTarget = 0;
    let currentRotation = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    const onPointerDown = (e: any) => {
      isDragging = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      startX = clientX; startY = clientY;
    };

    const onPointerMove = (e: any) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      if (isDragging) {
        const delta = orientation === 'vertical' ? clientY - startY : clientX - startX;
        rotationTarget += delta * 0.005;
        startX = clientX; startY = clientY;
      }
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / height) * 2 + 1;
    };

    const onPointerUp = () => isDragging = false;

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

    // 动画循环
    const animate = () => {
      requestAnimationFrame(animate);

      currentRotation += (rotationTarget - currentRotation) * 0.05;
      rotationTarget += 0.001; // 环境自动漂移

      if (orientation === 'vertical') {
        nebulaPoints.rotation.x = currentRotation;
        planetGroup.rotation.x = currentRotation;
      } else {
        nebulaPoints.rotation.y = currentRotation;
        planetGroup.rotation.y = currentRotation;
      }

      stars.rotation.y += 0.0001; // 背景星空极慢旋转

      // 行星自转
      planetMeshes.forEach((mesh, i) => {
        mesh.rotation.y += 0.01;
        mesh.position.y += Math.sin(Date.now() * 0.001 + i) * 0.001;
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
    };
  }, [courses, orientation, isMobile]);

  return <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />;
};

export default MobiusGalaxy;

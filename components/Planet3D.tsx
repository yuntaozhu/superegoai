
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Planet3DProps {
  colorFrom: string;
  colorTo: string;
  icon: string;
  size?: number;
}

const Planet3D: React.FC<Planet3DProps> = ({ colorFrom, colorTo, icon, size = 200 }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = size;
    const height = size;

    // Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Helpers to extract colors from Tailwind names (simplified approximation)
    const getColor = (name: string) => {
      const colors: Record<string, string> = {
        'purple-500': '#a855f7',
        'pink-500': '#ec4899',
        'orange-500': '#f97316',
        'red-500': '#ef4444',
        'yellow-400': '#facc15',
        'amber-500': '#f59e0b',
        'emerald-400': '#34d399',
        'cyan-600': '#0891b2',
        'cyan-400': '#22d3ee',
        'blue-600': '#2563eb',
        'indigo-400': '#818cf8',
        'violet-600': '#7c3aed'
      };
      const key = name.replace('from-', '').replace('to-', '');
      return colors[key] || '#ffffff';
    };

    const color1 = new THREE.Color(getColor(colorFrom));
    const color2 = new THREE.Color(getColor(colorTo));

    // Planet Geometry
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    
    // Custom Shader Material for Gradient and Atmosphere
    const material = new THREE.ShaderMaterial({
      uniforms: {
        color1: { value: color1 },
        color2: { value: color2 },
        time: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        uniform float time;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          // Base gradient
          vec3 baseColor = mix(color1, color2, vUv.y + sin(vUv.x * 10.0 + time) * 0.1);
          
          // Fresnel effect for atmosphere glow
          vec3 viewDir = normalize(vViewPosition);
          float fresnel = pow(1.0 - dot(vNormal, viewDir), 2.0);
          
          vec3 finalColor = mix(baseColor, vec3(1.0), fresnel * 0.4);
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `
    });

    const planet = new THREE.Mesh(geometry, material);
    scene.add(planet);

    // Atmosphere Glow
    const atmosphereGeometry = new THREE.SphereGeometry(1.15, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.BackSide,
      uniforms: {
        color: { value: color1 }
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 4.0);
          gl_FragColor = vec4(color, intensity);
        }
      `
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Floating Icon (using Sprite)
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.font = '80px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(icon, 64, 64);
    }
    const iconTexture = new THREE.CanvasTexture(canvas);
    const iconMaterial = new THREE.SpriteMaterial({ map: iconTexture, transparent: true });
    const iconSprite = new THREE.Sprite(iconMaterial);
    iconSprite.scale.set(1.5, 1.5, 1);
    iconSprite.position.z = 1.2; // Float in front
    planet.add(iconSprite);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 2);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Animation loop
    let requestID: number;
    const clock = new THREE.Clock();

    const animate = () => {
      requestID = requestAnimationFrame(animate);
      const delta = clock.getElapsedTime();
      
      planet.rotation.y += 0.005;
      planet.rotation.x = Math.sin(delta * 0.5) * 0.1;
      
      material.uniforms.time.value = delta;
      
      // Gentle floating of the icon
      iconSprite.position.y = Math.sin(delta * 2) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / width) * 2 - 1;
      const y = -((e.clientY - rect.top) / height) * 2 + 1;
      
      planet.rotation.y = x * 0.5;
      planet.rotation.x = y * 0.5;
    };

    containerRef.current.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(requestID);
      containerRef.current?.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      iconTexture.dispose();
      iconMaterial.dispose();
    };
  }, [colorFrom, colorTo, icon, size]);

  return <div ref={containerRef} className="relative cursor-pointer" />;
};

export default Planet3D;

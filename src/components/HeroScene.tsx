"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function FlowingRibbon() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useMemo(() => {
    if (typeof window !== "undefined") {
      const handleMouse = (e: MouseEvent) => {
        mousePos.current = {
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: -(e.clientY / window.innerHeight) * 2 + 1,
        };
      };
      window.addEventListener("mousemove", handleMouse);
    }
  }, []);

  const shaderArgs = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uColor1: { value: new THREE.Color("#c8a97e") },
        uColor2: { value: new THREE.Color("#d4af37") },
        uColor3: { value: new THREE.Color("#8b6914") },
      },
      vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        varying vec2 vUv;
        varying float vDisplacement;

        void main() {
          vUv = uv;
          vec3 pos = position;

          float wave1 = sin(pos.x * 2.0 + uTime * 0.8) * 0.15;
          float wave2 = sin(pos.y * 3.0 + uTime * 0.6) * 0.1;
          float wave3 = cos(pos.z * 2.5 + uTime * 0.7) * 0.12;
          float mouseInfluence = length(uMouse) * 0.15;

          pos += normal * (wave1 + wave2 + wave3 + mouseInfluence);
          vDisplacement = wave1 + wave2 + wave3;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        varying vec2 vUv;
        varying float vDisplacement;

        void main() {
          float mixFactor1 = smoothstep(-0.3, 0.3, vDisplacement);
          float mixFactor2 = sin(vUv.x * 3.14159 + uTime * 0.3) * 0.5 + 0.5;

          vec3 color = mix(uColor3, uColor1, mixFactor1);
          color = mix(color, uColor2, mixFactor2 * 0.4);

          float fresnel = pow(1.0 - abs(dot(vec3(0.0, 0.0, 1.0), normalize(vec3(vUv - 0.5, 1.0)))), 2.0);
          color += fresnel * uColor2 * 0.3;

          float alpha = 0.55 + fresnel * 0.25;

          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
    }),
    []
  );

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;
    const t = state.clock.elapsedTime;

    meshRef.current.rotation.x = t * 0.08 + mousePos.current.y * 0.15;
    meshRef.current.rotation.y = t * 0.12 + mousePos.current.x * 0.15;
    meshRef.current.rotation.z = t * 0.05;

    materialRef.current.uniforms.uTime.value = t;
    materialRef.current.uniforms.uMouse.value.set(
      mousePos.current.x,
      mousePos.current.y
    );
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={1.6}>
        <torusKnotGeometry args={[1, 0.35, 200, 40, 2, 3]} />
        <shaderMaterial ref={materialRef} args={[shaderArgs]} side={THREE.DoubleSide} />
      </mesh>
    </Float>
  );
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 300;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return pos;
  }, []);

  const sizes = useMemo(() => {
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      s[i] = Math.random() * 0.03 + 0.005;
    }
    return s;
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    particlesRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#c8a97e"
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#c8a97e" />
        <pointLight position={[-4, -3, 3]} color="#c8a97e" intensity={0.6} />
        <pointLight position={[3, 4, -3]} color="#d4af37" intensity={0.3} />
        <FlowingRibbon />
        <FloatingParticles />
      </Canvas>
    </div>
  );
}

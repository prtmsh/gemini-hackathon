import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Float, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function RotatingCube(props: any) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.5;
    meshRef.current.rotation.y += delta * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh
        {...props}
        ref={meshRef}
        scale={active ? 1.5 : 1}
        onClick={() => setActive(!active)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <boxGeometry args={[2.5, 2.5, 2.5]} />
        <meshStandardMaterial
          color={hovered ? "#a855f7" : "#4c1d95"} // Purple transition
          roughness={0.1}
          metalness={0.8}
          emissive={hovered ? "#a855f7" : "#000000"}
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  );
}

export default function Scene3D() {
  return (
    <div className="w-full h-full min-h-[300px] rounded-xl overflow-hidden bg-black/20">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#3b82f6" />
        <RotatingCube />
        <Environment preset="city" />
        <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2.5} far={4} color="#a855f7" />
      </Canvas>
    </div>
  );
}
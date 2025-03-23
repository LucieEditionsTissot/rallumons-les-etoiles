// src/components/Canoe.tsx
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group } from "three";

export const Canoe = () => {
    const ref = useRef<Group>(null);
    const { scene } = useGLTF("./public/boat.glb");

    // Petit mouvement doux du bateau
    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        if (ref.current) {
            ref.current.position.y = -1 + Math.sin(t * 1.5) * 0.05;
            ref.current.rotation.z = Math.sin(t * 1.1) * 0.02;
        }
    });

    return (
        <primitive ref={ref} object={scene} scale={0.05} position={[0, -2, 1.6]} />
    );
};

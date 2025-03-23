// src/components/Water2Plane.tsx
import { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, PlaneGeometry, Vector2, RepeatWrapping } from "three";
import {Water2} from "three/examples/jsm/Addons";

export const WaterPlane = () => {
    const waterRef = useRef<any>(null);

    const normalMap0 = useLoader(TextureLoader, "./public/water/simple/waternormals.jpeg");
    const normalMap1 = useLoader(TextureLoader, "./public/water/simple/waternormals.jpeg");

    // Permet de faire boucler la texture
    normalMap0.wrapS = normalMap0.wrapT = RepeatWrapping;
    normalMap1.wrapS = normalMap1.wrapT = RepeatWrapping;

    const water = useMemo(() => {
        const geometry = new PlaneGeometry(100, 100);
        const water = new Water2(geometry, {
            color: "#15568a", // eau sombre légèrement turquoise
            scale: 4,
            flowDirection: new Vector2(1, 1),
            textureWidth: 1024,
            textureHeight: 1024,
            normalMap0,
            normalMap1,
            flowSpeed: 0.05,
        });

        water.rotation.x = -Math.PI / 2;
        water.position.y = -1.1;

        return water;
    }, [normalMap0, normalMap1]);

    useFrame((_, delta) => {
        if (water.material.uniforms.time) {
            water.material.uniforms.time.value += delta;
        }
    });

    return <primitive object={water} />;
};

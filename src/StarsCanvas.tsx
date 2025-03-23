import { Canvas, useLoader } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { TextureLoader } from "three";

type StarsCanvasProps = {
    count: number;
    factor: number;
    milkywayOpacity: number; // 🔥 nouvelle prop
};

const MilkyWay = ({ opacity }: { opacity: number }) => {
    const texture = useLoader(TextureLoader, "/milkyway.jpg");

    return (
        <mesh position={[0, 0, -17]} rotation={[0, 0, 0]}>
            <planeGeometry args={[50, 50]} />
            <meshBasicMaterial
                map={texture}
                transparent
                opacity={opacity}
                depthWrite={false}
            />
        </mesh>
    );
};

export const StarsCanvas = ({ count, factor, milkywayOpacity }: StarsCanvasProps) => {
    return (
        <Canvas
            camera={{ position: [0, 0, 1] }}
            style={{ width: "100%", height: "100%" }}
        >
            {/* 🌌 Image floue qui se révèle progressivement */}
            <MilkyWay opacity={milkywayOpacity} />

            <Stars
                radius={100}
                depth={50}
                count={count}
                factor={factor}
                fade
            />
        </Canvas>
    );
};

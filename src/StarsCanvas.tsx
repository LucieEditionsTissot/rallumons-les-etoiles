// src/components/StarsCanvas.tsx
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

type StarsCanvasProps = {
    count: number;
    factor: number;
};

export const StarsCanvas = ({ count, factor }: StarsCanvasProps) => (
    <Canvas
        camera={{ position: [0, 0, 1] }}
        style={{ width: "100%", height: "100%" }}
    >
        <Stars radius={100} depth={50} count={count} factor={factor} fade />
    </Canvas>
);

import { Canvas } from "@react-three/fiber";
import { Stars as DreiStars } from "@react-three/drei";
import { useEffect, useState } from "react";
import "./PolynesianScene.css";
import { Ruas } from "./Ruas";
import { Canoe } from "./Canoe";

const Water = () => (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1e3f66" opacity={0.8} transparent />
    </mesh>
);

export const PolynesianScene = () => {
    const [teLapaActive, setTeLapaActive] = useState(false);
    const [showCanoe, setShowCanoe] = useState(false);
    const [showNarration, setShowNarration] = useState(false);

    useEffect(() => {
        if (teLapaActive) {
            const timer = setTimeout(() => {
                setShowCanoe(true);
            }, 1000);

            const timer2 = setTimeout(() => {
                setShowNarration(true);
            }, 4000);

            return () => {
                clearTimeout(timer);
                clearTimeout(timer2);
            };
        }
    }, [teLapaActive]);

    const ruaLeft = 8 + (40 / 6); // Alignement avec la rua Moana
    const ruaWidth = 100 / 6;

    return (
        <div className="polynesian-container">
            {/* Interaction Rua */}
            <Ruas onRuaComplete={() => setTeLapaActive(true)} />

            {/* Te Lapa wave placée avant le Canvas pour être derrière */}
            {teLapaActive && (
                <div
                    className="te-lapa-wave"
                    style={{
                        left: `${ruaLeft}vw`,
                        width: `${ruaWidth}vw`
                    }}
                />

            )}

            {/* Ciel étoilé + océan + canoë */}
            <Canvas
                camera={{ position: [0, -0.5, 3] }}
                style={{ position: "absolute", top: 0, left: 0, zIndex: 3 }}
            >
                <ambientLight intensity={0.3} />
                <directionalLight position={[2, 5, 5]} intensity={0.5} />
                <DreiStars radius={100} depth={50} count={30000} factor={2} fade />
                <Water />
                <Canoe />
            </Canvas>

            {/* Narration finale */}
            {showNarration && (
                <div className="narration-popup">
                    <p>
                        Te Lapa t’a vu.<br />
                        Tu suis à présent la route oubliée des étoiles.
                        <br />
                        <em>Un jour, tout le ciel brillera à nouveau.</em>
                    </p>
                </div>
            )}

            {/* Titre initial */}
            {!teLapaActive && (
                <div className="polynesian-overlay">
                    <h2>Observe les étoiles et retrouve la rua cachée</h2>
                </div>
            )}
        </div>
    );
};

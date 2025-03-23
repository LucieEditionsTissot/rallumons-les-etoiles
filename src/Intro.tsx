import { useEffect, useState } from "react";
import { StarsCanvas } from "./StarsCanvas";
import "./Intro.css";
import { Lamp } from "./Lamp.tsx";
import { ShootingStars } from "./ShootingStars";

const lightCount = 5;

export const Intro = ({ onNext }: { onNext: () => void }) => {
    const [lightsOff, setLightsOff] = useState(Array(lightCount).fill(false));
    const [hasAllLightsOff, setHasAllLightsOff] = useState(false);
    const [canExitAfterDelay, setCanExitAfterDelay] = useState(false);
    const [showNextButton, setShowNextButton] = useState(false);

    const handleClick = (index: number) => {
        const newLights = [...lightsOff];
        newLights[index] = true;
        setLightsOff(newLights);
    };

    useEffect(() => {
        const allOff = lightsOff.every(Boolean);

        if (allOff && !hasAllLightsOff) {
            setHasAllLightsOff(true);

            // ⏳ Affiche le bouton 2s après le début des étoiles filantes
            setTimeout(() => {
                setShowNextButton(true);
            }, 2000);

            // ⌛ Déclenche la possibilité de sortir après 10s
            setTimeout(() => {
                setCanExitAfterDelay(true);
            }, 10000);
        }
    }, [lightsOff, hasAllLightsOff]);

    const lightsOffCount = lightsOff.filter(Boolean).length;
    const lightsOffRatio = lightsOffCount / lightCount;

// ✨ Apparition progressive de la voie lactée
    const milkywayOpacity = lightsOffRatio * 0.5; // Max 0.5


    const starCount = 1000 + lightsOffCount * 2500;
    const starFactor = 2 + lightsOffCount * 1.2;

    return (
        <div className={`intro-scene stars-density-${lightsOffCount} dim-${lightsOffCount}`}>
            {showNextButton && (
                <button className="next-button" onClick={onNext}>
                    Suivant
                </button>
            )}
            <StarsCanvas
                count={starCount}
                factor={starFactor}
                milkywayOpacity={milkywayOpacity}
            />


            <div className={`city-layer dim-${lightsOffCount}`} />

            {hasAllLightsOff && <ShootingStars />}

            <div className="overlay">
                <div className="narration">
                    <p>Autrefois, le ciel parlait. Aujourd’hui, il est muet.</p>
                </div>

                <div className="city">
                    {[...Array(lightCount)].map((_, i) => (
                        <div
                            key={i}
                            className={`lamp-wrapper ${lightsOff[i] ? "off" : "on"}`}
                            onClick={() => handleClick(i)}
                        >
                            <Lamp isOff={lightsOff[i]} />
                        </div>
                    ))}
                </div>


            </div>
        </div>
    );
};

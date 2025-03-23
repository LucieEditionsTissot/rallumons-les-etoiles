import { useMemo, useState } from "react";
import "./PolynesianScene.css";

type Star = {
    id: string;
    col: number;
    index: number;
    left: number;
    top: number;
    size: number;
    blur: number;
    isMajor: boolean;
    isCorrect: boolean;
    label?: string;
};

const ruaNames = ["Rua Hoku", "Rua Moana", "Rua Tautai", "Rua Aroha", "Rua Mahina", "Rua Ariki"];
const correctRua = 1;
const correctIndexes = [1, 5, 8];

const starLabels = [
    "Altair", "Antares", "Vega", "Sirius", "Rigel", "Canopus",
    "Betelgeuse", "Deneb", "Fomalhaut", "Spica", "Procyon", "Pollux",
    "Castor", "Bellatrix", "Hadar", "Achernar", "Shaula", "Mimosa"
];

export const Ruas = ({ onRuaComplete }: { onRuaComplete: () => void }) => {
    const [selectedStars, setSelectedStars] = useState<Set<string>>(new Set());
    const [revealedRuas, setRevealedRuas] = useState<Set<number>>(new Set());
    const [hoveredStar, setHoveredStar] = useState<Star | null>(null);

    const stars = useMemo(() => {
        const list: Star[] = [];
        const totalColumns = 6;
        const starsPerColumn = 9;
        let labelIndex = 0;

        for (let col = 0; col < totalColumns; col++) {
            const majorIndexes = [1, 5, 8]; // espacées
            for (let i = 0; i < starsPerColumn; i++) {
                const id = `rua-${col}-${i}`;
                const isCorrect = col === correctRua && correctIndexes.includes(i);
                const isMajor = majorIndexes.includes(i);
                const label = isMajor && labelIndex < starLabels.length ? starLabels[labelIndex++] : undefined;

                const size = isMajor ? 2.2 : 0.6 + Math.random() * 1;
                const blur = isMajor ? 0.2 : (1 - size / 2.5) * 3;
                const left = 8 + col * (84 / totalColumns);
                const top = 10 + i * 4.8;

                list.push({
                    id,
                    col,
                    index: i,
                    left,
                    top,
                    size,
                    blur,
                    isMajor,
                    isCorrect,
                    label
                });
            }
        }

        return list;
    }, []);

    const handleClick = (star: Star) => {
        if (!star.isCorrect || selectedStars.has(star.id)) return;

        const updated = new Set(selectedStars);
        updated.add(star.id);
        setSelectedStars(updated);
        setRevealedRuas(prev => new Set(prev).add(star.col));

        const correctIds = stars
            .filter(s => s.isCorrect)
            .map(s => s.id);

        const allCorrectClicked = correctIds.every(id => updated.has(id));

        if (allCorrectClicked) {
            onRuaComplete();
        }
    };

    const isNearby = (base: Star, target: Star) =>
        base.col === target.col && Math.abs(base.index - target.index) <= 2;

    return (
        <>
            {hoveredStar && hoveredStar.label && (
                <div
                    className="rua-label"
                    style={{
                        left: `${hoveredStar.left}vw`,
                        top: `${hoveredStar.top + 5}vh`,
                    }}
                >
                    {hoveredStar.label}
                    <br />
                    <span className="rua-name-popup">{ruaNames[hoveredStar.col]}</span>
                </div>
            )}

            <div className="ruas-overlay">
                {stars.map(star => {
                    const shouldReveal =
                        star.isMajor ||
                        revealedRuas.has(star.col) ||
                        (hoveredStar && isNearby(hoveredStar, star));

                    return (
                        <div
                            key={star.id}
                            className={`rua-star ${star.isMajor ? "major" : "minor"} ${
                                selectedStars.has(star.id) ? "selected" : ""
                            }`}
                            style={{
                                left: `${star.left}vw`,
                                top: `${star.top}vh`,
                                fontSize: `${star.size}rem`,
                                opacity: shouldReveal ? (star.isMajor ? 1 : 0.6) : 0.05,
                                filter: `blur(${star.blur}px) drop-shadow(0 0 ${star.size * 3}px white)`,
                                pointerEvents: star.isMajor ? "auto" : "none"
                            }}
                            onMouseEnter={() => setHoveredStar(star)}
                            onMouseLeave={() => setHoveredStar(null)}
                            onClick={() => handleClick(star)}
                        >
                            ✦
                        </div>
                    );
                })}
            </div>
        </>
    );
};

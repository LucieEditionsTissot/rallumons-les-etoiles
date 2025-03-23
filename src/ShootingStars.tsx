import { useEffect, useRef, useState } from "react";
import "./ShootingStars.css";

type Star = {
    id: number;
    left: number;
    top: number;
    angle: number;
    duration: number;
};

export const ShootingStars = () => {
    const [stars, setStars] = useState<Star[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const id = Date.now();
            const left = Math.random() * window.innerWidth * 0.7;
            const top = Math.random() * window.innerHeight * 0.4;
            const angle = -45;
            const duration = 800 + Math.random() * 800; // ✨ plus rapide mais fluide

            const newStar: Star = { id, left, top, angle, duration };
            setStars(prev => [...prev.filter(s => Date.now() - s.id < 3000), newStar]);
        }, 500);

        return () => clearInterval(interval);
    }, []);


    return (
        <div className="shooting-stars" ref={containerRef}>
            {stars.map(star => (
                <ShootingStar key={star.id} {...star} />
            ))}
        </div>
    );
};

const ShootingStar = ({ left, top, angle, duration }: Star) => {
    const starRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = starRef.current;
        if (!el) return;

        const start = performance.now();

        const animate = (time: number) => {
            const progress = (time - start) / duration;
            if (progress >= 1) return;

            // Courbe légère (quadratique)
            const x = progress * 600;
            const y = progress * 600 - Math.pow(progress * 600 / 2, 2) / 1000;

            const opacity =
                progress < 0.3
                    ? progress * 3
                    : progress > 0.8
                        ? 1 - (progress - 0.8) * 5
                        : 1;

            const glow = 4 + Math.sin(progress * Math.PI) * 12;

            el.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
            el.style.opacity = opacity.toString();
            el.style.filter = `drop-shadow(0 0 ${glow}px white)`;

            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }, [duration, angle]);

    return (
        <div
            ref={starRef}
            className="shooting-star"
            style={{
                left: `${left}px`,
                top: `${top}px`,
                transform: `rotate(${angle}deg)`,
                opacity: 0,
            }}
        />
    );
};

// src/components/SceneManager.tsx
import { useState } from "react";
import { Intro } from "./Intro";
import { PolynesianScene } from "./PolynesianScene.tsx";

export const SceneManager = () => {
    const [scene, setScene] = useState(0);

    const nextScene = () => setScene(scene + 1);

    switch (scene) {
        case 0:
            return <Intro onNext={nextScene} />;
            case 1: return <PolynesianScene />;
        default:
            return <div>Fin ou en développement...</div>;
    }
};

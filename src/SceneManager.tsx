// src/components/SceneManager.tsx
import { useState } from "react";
import { Intro } from "./Intro";

export const SceneManager = () => {
    const [scene, setScene] = useState(0);

    const nextScene = () => setScene(scene + 1);

    switch (scene) {
        case 0:
            return <Intro onNext={nextScene} />;
        // case 1: return <PolynesieScene />;
        default:
            return <div>Fin ou en développement...</div>;
    }
};

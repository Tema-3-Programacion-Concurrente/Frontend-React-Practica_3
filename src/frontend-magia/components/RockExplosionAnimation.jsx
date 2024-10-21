import React, { useState, useEffect } from "react";

// Constantes para la animación de la explosión de la roca y polvo
const FRAGMENTS_COUNT = 20; // Número de fragmentos
const DUST_PARTICLES_COUNT = 50; // Número de partículas de polvo
const MIN_EXPLOSION_SPEED = 10; // Velocidad mínima de dispersión
const MAX_EXPLOSION_SPEED = 20; // Velocidad máxima de dispersión
const GRAVITY = 0.2; // Gravedad simulada
const MIN_SIZE = 20; // Tamaño mínimo de los fragmentos
const MAX_SIZE = 50; // Tamaño máximo de los fragmentos
const DUST_SIZE = 5; // Tamaño de las partículas de polvo
const FLOOR_LIMIT = window.innerHeight * 0.9; // Límite inferior (90% de la pantalla)

// Función para generar fragmentos aleatorios con formas y tamaños distintos
const generateFragments = () => {
    const fragments = [];
    for (let i = 0; i < FRAGMENTS_COUNT; i++) {
        const size = MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE); // Tamaño variable dentro del rango
        const angle = Math.random() * 360; // Ángulo aleatorio en grados

        fragments.push({
            id: i,
            x: 0, // Posición inicial en el centro (relativo a la roca)
            y: 0,
            size,
            angle, // Ángulo para formar la roca
            vx: 0, // Velocidad inicial en la explosión (se actualizará luego)
            vy: 0,
            shape: generateRandomShape(), // Generar una forma aleatoria para el fragmento
            color: generateRandomColor(), // Generar color aleatorio
            active: true, // Estado para determinar si el fragmento está activo
        });
    }
    return fragments;
};

// Función para generar partículas de polvo que se expanden en todas direcciones
const generateDustParticles = () => {
    const particles = [];
    for (let i = 0; i < DUST_PARTICLES_COUNT; i++) {
        const angle = Math.random() * 360; // Ángulo aleatorio
        const speed = Math.random() * (MAX_EXPLOSION_SPEED - MIN_EXPLOSION_SPEED) + MIN_EXPLOSION_SPEED;

        particles.push({
            id: i,
            x: 0,
            y: 0,
            size: DUST_SIZE,
            angle,
            vx: Math.cos((angle * Math.PI) / 180) * speed,
            vy: Math.sin((angle * Math.PI) / 180) * speed,
            color: "rgba(139, 69, 19, 0.5)", // Color marrón translúcido para simular polvo
        });
    }
    return particles;
};

// Función para generar una forma aleatoria usando CSS clip-path
const generateRandomShape = () => {
    const random = Math.random();
    if (random < 0.33) {
        return "polygon(50% 0%, 0% 100%, 100% 100%)"; // Triangular
    } else if (random < 0.66) {
        return "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"; // Cuadrada
    } else {
        return "polygon(25% 0%, 75% 0%, 100% 50%, 50% 100%, 0% 50%)"; // Forma asimétrica
    }
};

// Función para generar un color marrón claro aleatorio con gradientes
const generateRandomColor = () => {
    const brownVariations = [
        "linear-gradient(to bottom, #d2b48c, #a58b5b)",
        "linear-gradient(to bottom, #deb887, #c19a6b)",
        "linear-gradient(to bottom, #f4a460, #8b4513)",
    ];
    return brownVariations[Math.floor(Math.random() * brownVariations.length)];
};

// Componente individual de fragmento
const Fragment = ({ x, y, size, shape, color, onDisappear }) => {
    const fragmentStyle = {
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        background: color, // Color marrón con gradientes
        border: "1px solid #2c1d12", // Bordes para simular grietas
        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)", // Sombras para más realismo
        clipPath: shape, // Aplicar la forma aleatoria
        left: `calc(50% + ${x}px)`, // Ajustar la posición con respecto al centro
        top: `calc(80% + ${y}px)`, // Se inicia la explosión al 80% de la pantalla
        transform: `rotate(${Math.random() * 360}deg)`, // Rotación aleatoria
        transition: "all 0.1s linear",
        zIndex: 9999, // Aseguramos que los fragmentos estén por encima del contenido
    };

    // Desaparecer fragmento
    useEffect(() => {
        if (y >= FLOOR_LIMIT) {
            onDisappear(); // Llamar a la función cuando el fragmento alcanza el límite inferior
        }
    }, [y, onDisappear]);

    return <div style={fragmentStyle}></div>;
};

// Componente individual de partículas de polvo
const DustParticle = ({ x, y, size, color }) => {
    const particleStyle = {
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        background: color,
        borderRadius: "50%", // Hacer que las partículas de polvo sean circulares
        left: `calc(50% + ${x}px)`,
        top: `calc(80% + ${y}px)`, // Ajuste para el 80% de la pantalla
        opacity: 0.7, // Hacer las partículas algo translúcidas
        transition: "all 0.1s linear",
        zIndex: 9998, // Las partículas están debajo de los fragmentos
    };

    return <div style={particleStyle}></div>;
};

// Componente principal
export default function RockExplosionAnimation() {
    const [fragments, setFragments] = useState(generateFragments());
    const [dustParticles, setDustParticles] = useState(generateDustParticles());
    const [isExploded, setIsExploded] = useState(false); // Estado para controlar la explosión
    const [timerActive, setTimerActive] = useState(true); // Temporizador para la explosión

    // Función para iniciar la explosión
    const triggerExplosion = () => {
        setFragments((prevFragments) =>
            prevFragments.map((fragment) => {
                const angleInRadians = (fragment.angle * Math.PI) / 180; // Convertir ángulo a radianes
                const speed = Math.random() * (MAX_EXPLOSION_SPEED - MIN_EXPLOSION_SPEED) + MIN_EXPLOSION_SPEED; // Velocidad aleatoria dentro de un rango
                return {
                    ...fragment,
                    vx: Math.cos(angleInRadians) * speed, // Velocidad en X según el ángulo
                    vy: Math.sin(angleInRadians) * speed, // Velocidad en Y según el ángulo
                };
            })
        );
        setIsExploded(true); // Marcar como explotado
    };

    // Efecto para activar la explosión después de 1 segundo
    useEffect(() => {
        if (timerActive) {
            const explosionTimeout = setTimeout(() => {
                triggerExplosion();
                setTimerActive(false); // Desactivar el temporizador
            }, 1000);

            return () => clearTimeout(explosionTimeout); // Limpiar el timeout al desmontar el componente
        }
    }, [timerActive]);

    // Efecto para simular el movimiento de los fragmentos tras la explosión
    useEffect(() => {
        if (isExploded) {
            const animationInterval = setInterval(() => {
                setFragments((prevFragments) =>
                    prevFragments.map((fragment) => {
                        const newY = fragment.y + fragment.vy + GRAVITY; // Actualizar posición Y con gravedad
                        const newX = fragment.x + fragment.vx; // Actualizar posición X
                        return {
                            ...fragment,
                            x: newX, // Actualizar posición X
                            y: newY, // Actualizar posición Y
                            vx: fragment.vx * 0.98, // Simular fricción en X
                            vy: fragment.vy + GRAVITY, // Acelerar por la gravedad
                        };
                    })
                );
                setDustParticles((prevParticles) =>
                    prevParticles.map((particle) => ({
                        ...particle,
                        x: particle.x + particle.vx, // Actualizar posición X de las partículas
                        y: particle.y + particle.vy, // Actualizar posición Y de las partículas
                    }))
                );
            }, 50); // Animación se actualiza cada 50ms

            return () => clearInterval(animationInterval); // Limpiar el intervalo cuando el componente se desmonta
        }
    }, [isExploded]);

    // Función para eliminar fragmentos cuando desaparecen
    const handleFragmentDisappear = (id) => {
        setFragments((prevFragments) =>
            prevFragments.filter((fragment) => fragment.id !== id)
        );
    };

    // Estilos para el contenedor de la roca y los fragmentos
    const rockContainerStyle = {
        position: "fixed",
        left: "50%",
        top: "80%", // Mover el contenedor al 80% de la altura de la pantalla
        width: "200px",
        height: "200px",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
    };

    return (
        <div>
            {/* Contenedor de la roca (antes de la explosión) */}
            <div style={rockContainerStyle}>
                {fragments.map((fragment) => (
                    <Fragment
                        key={fragment.id}
                        x={fragment.x}
                        y={fragment.y}
                        size={fragment.size}
                        shape={fragment.shape}
                        color={fragment.color}
                        onDisappear={() => handleFragmentDisappear(fragment.id)}
                    />
                ))}
                {dustParticles.map((particle) => (
                    <DustParticle
                        key={particle.id}
                        x={particle.x}
                        y={particle.y}
                        size={particle.size}
                        color={particle.color}
                    />
                ))}
            </div>
        </div>
    );
}

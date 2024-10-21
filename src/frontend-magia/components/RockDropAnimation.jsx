import React, { useState, useEffect } from "react";

// Constantes físicas para la animación de la caída de la roca
const GRAVITY = 4; // Gravedad simulada
const AIR_RESISTANCE = 0.005; // Resistencia del aire para la roca
const ROCK_WIDTH_BASE = 30; // Ancho base de la roca

// Configuración de la trayectoria desde la esquina superior derecha hacia el centro de la pantalla
const INITIAL_POSITION = { x: window.innerWidth + 100, y: -100 }; // Posición inicial
const TARGET_POSITION = { x: window.innerWidth / 2, y: window.innerHeight / 2 }; // Centro de la pantalla

// Función modular para calcular la nueva posición de la roca
const calculatePosition = (t, initialX, initialY, targetX, targetY) => {
    const velocityX = (targetX - initialX) * Math.exp(-AIR_RESISTANCE * t);
    const velocityY = (targetY - initialY) * Math.exp(-AIR_RESISTANCE * t) + GRAVITY * t;
    const x = initialX + velocityX * t;
    const y = initialY + velocityY * t;
    return { x, y };
};

// Función para calcular el ancho oscilante de la roca
const calculateRockWidth = (t) => {
    return ROCK_WIDTH_BASE + Math.sin(t * 2) * 10; // Oscila el ancho de la roca
};

// Función para ajustar el color y las sombras de la roca
const calculateRockColor = (t) => {
    const brownTone = Math.floor(180 + Math.sin(t) * 50); // Oscila entre tonalidades de marrón claro
    return `rgb(${brownTone}, ${brownTone - 50}, ${brownTone - 100})`;
};

// Generar minirocas con posiciones y tamaños aleatorios
const generateMiniRocks = (numRocks, centerX, centerY) => {
    const miniRocks = [];
    for (let i = 0; i < numRocks; i++) {
        const size = Math.random() * 10 + 5; // Tamaño aleatorio entre 5 y 15
        const angle = Math.random() * 2 * Math.PI; // Ángulo aleatorio
        const distance = Math.random() * 50 + 20; // Distancia aleatoria entre 20 y 70
        const x = centerX + distance * Math.cos(angle);
        const y = centerY + distance * Math.sin(angle);
        miniRocks.push({ x, y, size });
    }
    return miniRocks;
};

export default function RockDropAnimation() {
    const [rockPosition, setRockPosition] = useState(INITIAL_POSITION);
    const [rockWidth, setRockWidth] = useState(ROCK_WIDTH_BASE);
    const [rockColor, setRockColor] = useState("rgb(180, 130, 80)");
    const [isFragmenting, setIsFragmenting] = useState(false); // Estado para la fragmentación
    const [isVisible, setIsVisible] = useState(true); // Estado para mostrar u ocultar la roca
    const [miniRocks, setMiniRocks] = useState([]); // Estado para las minirocas

    useEffect(() => {
        let t = 0; // Tiempo inicial
        const animationInterval = setInterval(() => {
            t += 0.03; // Incremento de tiempo
            const { x, y } = calculatePosition(
                t,
                INITIAL_POSITION.x,
                INITIAL_POSITION.y,
                TARGET_POSITION.x,
                TARGET_POSITION.y
            );

            // Detener la animación y activar la fragmentación si llega al centro
            if (x <= TARGET_POSITION.x + 50 && y >= TARGET_POSITION.y - 50) {
                clearInterval(animationInterval);
                setIsFragmenting(true); // Activar la fragmentación
                setIsVisible(false); // Ocultar la roca

                // Generar minirocas
                const newMiniRocks = generateMiniRocks(10, TARGET_POSITION.x, TARGET_POSITION.y);
                setMiniRocks(newMiniRocks);

                // Hacer que la fragmentación dure 800ms y restablecer el estado
                setTimeout(() => {
                    setIsFragmenting(false); // Detener la fragmentación
                    setRockPosition(INITIAL_POSITION); // Restablecer la posición inicial
                    setIsVisible(true); // Mostrar la roca nuevamente
                    setMiniRocks([]); // Limpiar las minirocas
                }, 800);
                return;
            }

            // Calcular el nuevo ancho y color
            const newWidth = calculateRockWidth(t);
            const newColor = calculateRockColor(t);

            // Actualizar el estado con las nuevas propiedades
            setRockPosition({ x, y });
            setRockWidth(newWidth);
            setRockColor(newColor);
        }, 50); // Intervalo de actualización de la animación

        return () => clearInterval(animationInterval); // Limpiar el intervalo cuando el componente se desmonta
    }, []);

    // Estilos para la roca y sus efectos visuales
    const rockStyle = {
        position: "fixed",
        left: `${rockPosition.x}px`,
        top: `${rockPosition.y}px`,
        width: `${rockWidth}px`,
        height: "20px", // Altura fija para la roca
        borderRadius: "50%",
        background: `linear-gradient(to right, ${rockColor}, transparent)`,
        boxShadow: `0 0 20px rgba(180, 130, 80, 0.7), 0 0 40px rgba(130, 80, 30, 0.5)`,
        filter: "blur(2px)", // Desenfoque para simular movimiento
        transition: "left 0.03s linear, top 0.03s linear", // Movimiento más suave y rápido
    };

    // Estilos para las minirocas
    const miniRockStyle = (x, y, size) => ({
        position: "fixed",
        left: `${x}px`,
        top: `${y}px`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: "rgb(180, 130, 80)",
        boxShadow: `0 0 10px rgba(130, 80, 30, 0.7), 0 0 20px rgba(180, 130, 80, 0.5)`,
    });

    return (
        <>
            {/* Roca (se oculta si hay una fragmentación) */}
            {isVisible && !isFragmenting && (
                <svg
                    style={{
                        position: "fixed",
                        left: `${rockPosition.x}px`,
                        top: `${rockPosition.y}px`,
                        width: `${rockWidth}px`,
                        height: "auto",
                        transition: "left 0.03s linear, top 0.03s linear", // Movimiento más suave y rápido
                    }}
                    viewBox="0 0 100 100"
                >
                    <path
                        d="M10 30 Q 25 10, 40 30 T 70 30 Q 85 50, 70 70 T 40 70 Q 25 50, 10 30 Z"
                        fill={rockColor}
                        stroke="rgba(130, 80, 30, 0.7)"
                        strokeWidth="2"
                        style={{ filter: "blur(2px)" }}
                    />
                </svg>
            )}
            {/* Fragmentación al llegar al centro */}
            {isFragmenting && miniRocks.map((rock, index) => (
                <div key={index} style={miniRockStyle(rock.x, rock.y, rock.size)}></div>
            ))}
            {/* Keyframes para la fragmentación */}
            <style>
                {`
                    @keyframes expand-fragment {
                        0% {
                            transform: scale(1);
                        }
                        100% {
                            transform: scale(1.5);
                            opacity: 0;
                        }
                    }
                `}
            </style>
        </>
    );
}

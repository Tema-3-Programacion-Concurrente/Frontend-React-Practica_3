import React, { useState, useEffect } from "react";

// Constantes físicas globales para ajustar la animación
const GRAVITY = 9.8; // Gravedad simulada
const AIR_RESISTANCE = 0.01; // Resistencia del aire
const FIREBALL_SIZE_BASE = 50; // Tamaño base de la bola de fuego

// Configuración de la trayectoria hacia el centro de la pantalla
const INITIAL_POSITION = { x: -150, y: window.innerHeight / 2 }; // Posición inicial fuera de la pantalla
const TARGET_POSITION = { x: window.innerWidth / 2, y: window.innerHeight / 2 }; // Centro de la pantalla

// Función modular para calcular la nueva posición de la bola de fuego
const calculatePosition = (t, initialX, initialY, targetX, targetY) => {
    const velocityX = (targetX - initialX) * Math.exp(-AIR_RESISTANCE * t); // Efecto de la resistencia en X
    const velocityY = (targetY - initialY) * Math.exp(-AIR_RESISTANCE * t) + GRAVITY * t; // Gravedad afecta al movimiento en Y

    const x = initialX + velocityX * t;
    const y = initialY + velocityY * t;

    return { x, y };
};

// Función para calcular el tamaño oscilante de la bola de fuego
const calculateSize = (t) => {
    return FIREBALL_SIZE_BASE + Math.sin(t) * 15; // Oscila el tamaño entre 50px y 65px
};

// Función para ajustar la intensidad del brillo y la sombra
const calculateGlowIntensity = (t) => {
    return 0.8 + Math.sin(t) * 0.4; // Oscila entre 0.4 y 1.2 para el brillo
};

export default function FireballAnimation() {
    const [fireballPosition, setFireballPosition] = useState(INITIAL_POSITION);
    const [fireballSize, setFireballSize] = useState(FIREBALL_SIZE_BASE);
    const [glowIntensity, setGlowIntensity] = useState(0.8);
    const [isExploding, setIsExploding] = useState(false); // Nuevo estado para la explosión
    const [isFireballVisible, setIsFireballVisible] = useState(true); // Estado para mostrar u ocultar la bola

    useEffect(() => {
        let t = 0; // Tiempo inicial para la animación

        const animationInterval = setInterval(() => {
            t += 0.03; // Incremento de tiempo para controlar la velocidad de la animación

            const { x, y } = calculatePosition(
                t,
                INITIAL_POSITION.x,
                INITIAL_POSITION.y,
                TARGET_POSITION.x,
                TARGET_POSITION.y
            );

            // Detener la animación y activar la explosión si llega al centro
            if (x >= TARGET_POSITION.x - 50 && y >= TARGET_POSITION.y - 50) {
                clearInterval(animationInterval);
                setIsExploding(true); // Activar la explosión
                setIsFireballVisible(false); // Ocultar la bola de fuego

                // Hacer que la explosión dure 800ms y restablecer el estado
                setTimeout(() => {
                    setIsExploding(false); // Detener la explosión
                    setFireballPosition(INITIAL_POSITION); // Restablecer la posición inicial
                    setIsFireballVisible(true); // Mostrar la bola de fuego nuevamente
                }, 800);

                return;
            }

            // Calcular el nuevo tamaño y brillo
            const newSize = calculateSize(t);
            const newGlow = calculateGlowIntensity(t);

            // Actualizar el estado con las nuevas propiedades
            setFireballPosition({ x, y });
            setFireballSize(newSize);
            setGlowIntensity(newGlow);
        }, 50); // Intervalo de actualización de la animación

        return () => clearInterval(animationInterval); // Limpiar el intervalo cuando el componente se desmonta
    }, []);

    // Estilos para la bola de fuego y sus efectos visuales
    const fireballStyle = {
        position: "fixed",
        left: `${fireballPosition.x}px`,
        top: `${fireballPosition.y}px`,
        width: `${fireballSize}px`,
        height: `${fireballSize}px`,
        borderRadius: "50%",
        backgroundColor: "orange",
        boxShadow: `0 0 40px 20px rgba(255, 165, 0, ${glowIntensity}), 0 0 80px rgba(255, 69, 0, 0.7)`,
        filter: "blur(2px)", // Más desenfoque para simular calor
        transition: "left 0.03s linear, top 0.03s linear", // Movimiento más suave y rápido
    };

    const fireCoreStyle = {
        position: "absolute",
        width: `${fireballSize * 0.6}px`,
        height: `${fireballSize * 0.6}px`,
        top: `${fireballSize * 0.2}px`,
        left: `${fireballSize * 0.2}px`,
        borderRadius: "50%",
        backgroundColor: "yellow",
        boxShadow: `0 0 30px 15px rgba(255, 255, 0, ${glowIntensity + 0.3})`,
    };

    const fireTrailStyle = {
        position: "absolute",
        width: `${fireballSize * 0.4}px`,
        height: "100px",
        top: `${-fireballSize * 0.2}px`,
        left: `${-fireballSize * 0.8}px`,
        background: "linear-gradient(to right, rgba(255, 69, 0, 0.8), transparent)",
        borderRadius: "50%",
        transform: "rotate(-20deg)",
        filter: "blur(6px)", // Más desenfoque en la estela
    };

    // Estilos para la explosión
    const explosionStyle = {
        position: "fixed",
        left: `${TARGET_POSITION.x - 100}px`, // Centrar la explosión
        top: `${TARGET_POSITION.y - 100}px`,
        width: "200px",
        height: "200px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,69,0,1) 0%, rgba(255,165,0,0.7) 50%, rgba(255,69,0,0.5) 100%)",
        boxShadow: `0 0 100px rgba(255, 69, 0, 0.9), 0 0 150px rgba(255, 165, 0, 0.7)`,
        animation: "expand-explosion 0.8s ease-out forwards",
    };

    return (
        <>
            {/* Bola de fuego (se oculta si hay una explosión o cuando debe desaparecer) */}
            {isFireballVisible && !isExploding && (
                <div style={fireballStyle}>
                    <div style={fireCoreStyle}></div>
                    <div style={fireTrailStyle}></div>
                </div>
            )}

            {/* Explosión al llegar al centro */}
            {isExploding && <div style={explosionStyle}></div>}

            {/* Keyframes para la explosión */}
            <style>
                {`
                    @keyframes expand-explosion {
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

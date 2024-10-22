import React, { useState, useEffect } from "react";

// Constantes físicas para la animación del chorro de agua
const GRAVITY = 4; // Gravedad simulada, más ligera que la del fuego
const AIR_RESISTANCE = 0.005; // Resistencia del aire para el chorro de agua
const STREAM_WIDTH_BASE = 30; // Ancho base del chorro de agua

// Configuración de la trayectoria hacia el centro de la pantalla
const INITIAL_POSITION = { x: -100, y: window.innerHeight / 2 }; // Posición inicial
const TARGET_POSITION = { x: window.innerWidth / 2, y: window.innerHeight / 2 }; // Centro de la pantalla

// Función modular para calcular la nueva posición del chorro de agua
const calculatePosition = (t, initialX, initialY, targetX, targetY) => {
    const velocityX = (targetX - initialX) * Math.exp(-AIR_RESISTANCE * t);
    const velocityY = (targetY - initialY) * Math.exp(-AIR_RESISTANCE * t) + GRAVITY * t;

    const x = initialX + velocityX * t;
    const y = initialY + velocityY * t;

    return { x, y };
};

// Función para calcular el ancho oscilante del chorro de agua
const calculateStreamWidth = (t) => {
    return STREAM_WIDTH_BASE + Math.sin(t * 2) * 10; // Oscila el ancho del chorro
};

// Función para ajustar el color asimétrico y las sombras del chorro
const calculateStreamColor = (t) => {
    const blueTone = Math.floor(180 + Math.sin(t) * 50); // Oscila entre tonalidades de azul
    return `rgb(0, ${blueTone}, 255)`;
};

export default function WaterStreamAnimation() {
    const [streamPosition, setStreamPosition] = useState(INITIAL_POSITION);
    const [streamWidth, setStreamWidth] = useState(STREAM_WIDTH_BASE);
    const [streamColor, setStreamColor] = useState("rgb(0, 180, 255)");
    const [isSplashing, setIsSplashing] = useState(false); // Estado para la salpicadura
    const [isVisible, setIsVisible] = useState(true); // Estado para mostrar u ocultar el chorro

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

            // Detener la animación y activar la salpicadura si llega al centro
            if (x >= TARGET_POSITION.x - 50 && y >= TARGET_POSITION.y - 50) {
                clearInterval(animationInterval);
                setIsSplashing(true); // Activar la salpicadura
                setIsVisible(false); // Ocultar el chorro de agua

                // Hacer que la salpicadura dure 800ms y restablecer el estado
                setTimeout(() => {
                    setIsSplashing(false); // Detener la salpicadura
                    setStreamPosition(INITIAL_POSITION); // Restablecer la posición inicial
                    setIsVisible(true); // Mostrar el chorro nuevamente
                }, 800);

                return;
            }

            // Calcular el nuevo ancho y color
            const newWidth = calculateStreamWidth(t);
            const newColor = calculateStreamColor(t);

            // Actualizar el estado con las nuevas propiedades
            setStreamPosition({ x, y });
            setStreamWidth(newWidth);
            setStreamColor(newColor);
        }, 50); // Intervalo de actualización de la animación

        return () => clearInterval(animationInterval); // Limpiar el intervalo cuando el componente se desmonta
    }, []);

    // Estilos para el chorro de agua y sus efectos visuales
    const streamStyle = {
        position: "fixed",
        left: `${streamPosition.x}px`,
        top: `${streamPosition.y}px`,
        width: `${streamWidth}px`,
        height: "20px", // Altura fija para el chorro de agua
        borderRadius: "50%",
        background: `linear-gradient(to right, ${streamColor}, transparent)`,
        boxShadow: `0 0 20px rgba(0, 180, 255, 0.7), 0 0 40px rgba(0, 120, 255, 0.5)`,
        filter: "blur(2px)", // Desenfoque para simular agua en movimiento
        transition: "left 0.03s linear, top 0.03s linear", // Movimiento más suave y rápido
    };

    const TARGET_POSITION = {
        x: window.innerWidth / 2,
        y: window.innerHeight * 0.8  // 80% de la altura de la pantalla
    };

    // Estilos para la salpicadura
    const splashStyle = {
        position: "fixed",
        left: `${TARGET_POSITION.x - 50}px`, // Centrar la salpicadura
        top: `${TARGET_POSITION.y - 50}px`,
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,180,255,1) 0%, rgba(0,120,255,0.7) 50%, rgba(0,180,255,0.5) 100%)",
        boxShadow: `0 0 50px rgba(0, 120, 255, 0.8), 0 0 100px rgba(0, 180, 255, 0.5)`,
        animation: "expand-splash 0.8s ease-out forwards",
    };

    return (
        <>
            {/* Chorro de agua (se oculta si hay una salpicadura) */}
            {isVisible && !isSplashing && <div style={streamStyle}></div>}

            {/* Salpicadura al llegar al centro */}
            {isSplashing && <div style={splashStyle}></div>}

            {/* Keyframes para la salpicadura */}
            <style>
                {`
                    @keyframes expand-splash {
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

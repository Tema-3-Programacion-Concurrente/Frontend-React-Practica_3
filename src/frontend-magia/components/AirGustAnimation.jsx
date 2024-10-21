import React, { useState, useEffect } from "react";

// Constantes físicas para la animación de la ráfaga de aire
const AIR_RESISTANCE = 0.02; // Resistencia del aire para la ráfaga
const GUST_WIDTH_BASE = 100; // Ancho base de la ráfaga de aire
const GUST_HEIGHT_BASE = 20; // Altura base de la ráfaga de aire

// Configuración de la trayectoria hacia el personaje (80% de la pantalla)
const INITIAL_POSITION = { x: -150, y: window.innerHeight / 2 }; // Posición inicial
const TARGET_POSITION = { x: window.innerWidth / 2, y: window.innerHeight * 0.8 }; // Posición del personaje al 80% de la pantalla

// Función modular para calcular la nueva posición de la ráfaga de aire
const calculatePosition = (t, initialX, initialY, targetX, targetY) => {
    const velocityX = (targetX - initialX) * Math.exp(-AIR_RESISTANCE * t);
    const velocityY = (targetY - initialY) * Math.exp(-AIR_RESISTANCE * t);

    const x = initialX + velocityX * t;
    const y = initialY + velocityY * t;

    return { x, y };
};

// Función para calcular el ancho y la altura oscilante de la ráfaga de aire
const calculateGustDimensions = (t) => {
    const width = GUST_WIDTH_BASE + Math.sin(t * 3) * 30; // Oscila el ancho
    const height = GUST_HEIGHT_BASE + Math.cos(t * 3) * 10; // Oscila la altura
    return { width, height };
};

// Función para ajustar el color y la intensidad de la ráfaga
const calculateGustColor = (t) => {
    const opacity = 0.5 + Math.sin(t * 2) * 0.3; // Oscila la transparencia
    return `rgba(200, 200, 255, ${opacity})`; // Un color grisáceo-azulado con variación de transparencia
};

export default function AirGustAnimation() {
    const [gustPosition, setGustPosition] = useState(INITIAL_POSITION);
    const [gustDimensions, setGustDimensions] = useState({ width: GUST_WIDTH_BASE, height: GUST_HEIGHT_BASE });
    const [gustColor, setGustColor] = useState("rgba(200, 200, 255, 0.5)");
    const [isImpacting, setIsImpacting] = useState(false); // Estado para cuando impacta
    const [isVisible, setIsVisible] = useState(true); // Estado para mostrar u ocultar la ráfaga

    useEffect(() => {
        let t = 0; // Tiempo inicial

        const animationInterval = setInterval(() => {
            t += 0.03; // Incremento de tiempo para controlar la velocidad de la animación

            const { x, y } = calculatePosition(
                t,
                INITIAL_POSITION.x,
                INITIAL_POSITION.y,
                TARGET_POSITION.x,  // Usa la posición correcta
                TARGET_POSITION.y   // Usa la posición correcta (80% de la pantalla)
            );

            // Detener la animación y activar el impacto si llega al personaje
            if (x >= TARGET_POSITION.x - 50 && y >= TARGET_POSITION.y - 50) {
                clearInterval(animationInterval);
                setIsImpacting(true); // Activar el impacto
                setIsVisible(false); // Ocultar la ráfaga de aire

                // Hacer que el impacto dure 800ms y restablecer el estado
                setTimeout(() => {
                    setIsImpacting(false); // Detener el impacto
                    setGustPosition(INITIAL_POSITION); // Restablecer la posición inicial
                    setIsVisible(true); // Mostrar la ráfaga nuevamente
                }, 800);

                return;
            }

            // Calcular las nuevas dimensiones y el color
            const newDimensions = calculateGustDimensions(t);
            const newColor = calculateGustColor(t);

            // Actualizar el estado con las nuevas propiedades
            setGustPosition({ x, y });
            setGustDimensions(newDimensions);
            setGustColor(newColor);
        }, 50); // Intervalo de actualización de la animación

        return () => clearInterval(animationInterval); // Limpiar el intervalo cuando el componente se desmonta
    }, []);

    // Estilos para la ráfaga de aire y sus efectos visuales
    const gustStyle = {
        position: "fixed",
        left: `${gustPosition.x}px`,
        top: `${gustPosition.y}px`,
        width: `${gustDimensions.width}px`,
        height: `${gustDimensions.height}px`,
        borderRadius: "20% / 50%", // Más ovalado
        background: gustColor,
        boxShadow: `0 0 20px rgba(200, 200, 255, 0.7), 0 0 40px rgba(100, 100, 255, 0.5)`,
        filter: "blur(3px)", // Desenfoque para simular la naturaleza del aire
        transition: "left 0.03s linear, top 0.03s linear", // Movimiento suave
    };

    // Estilos para el impacto de la ráfaga
    const impactStyle = {
        position: "fixed",
        left: `${TARGET_POSITION.x - 80}px`, // Centra la explosión sobre el personaje
        top: `${TARGET_POSITION.y - 80}px`,  // Centra la explosión sobre el personaje
        width: "160px",
        height: "160px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(200,200,255,1) 0%, rgba(150,150,255,0.7) 50%, rgba(100,100,255,0.3) 100%)",
        boxShadow: `0 0 80px rgba(150, 150, 255, 0.9), 0 0 120px rgba(100, 100, 255, 0.6)`,
        animation: "expand-impact 0.8s ease-out forwards",
    };

    return (
        <>
            {/* Ráfaga de aire (se oculta si hay un impacto) */}
            {isVisible && !isImpacting && <div style={gustStyle}></div>}

            {/* Impacto de aire al llegar al personaje */}
            {isImpacting && <div style={impactStyle}></div>}

            {/* Keyframes para el impacto */}
            <style>
                {`
                    @keyframes expand-impact {
                        0% {
                            transform: scale(1);
                        }
                        100% {
                            transform: scale(2);
                            opacity: 0;
                        }
                    }
                `}
            </style>
        </>
    );
}

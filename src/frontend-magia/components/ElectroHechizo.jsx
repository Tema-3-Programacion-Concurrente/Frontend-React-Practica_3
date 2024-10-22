import React, { useState, useEffect } from "react";

// Parámetros del rayo eléctrico
const GIF_DURATION = 1800; // Duración del rayo
const EXPLOSION_DELAY = GIF_DURATION - 400; // La explosión empieza antes de que el rayo desaparezca
const DEFAULT_POSITION = { x: window.innerWidth / 2, y: window.innerHeight * 0.8 }; // Posición por defecto

export default function ElectroHechizo({ onImpact, personajePosicion = DEFAULT_POSITION }) {
    const [isElectroVisible, setIsElectroVisible] = useState(true);
    const [shakeScreen, setShakeScreen] = useState(false);  // Estado para agitar la pantalla
    const [showExplosion, setShowExplosion] = useState(false); // Estado para mostrar la explosión

    useEffect(() => {
        // Mostrar el GIF del rayo
        const timer = setTimeout(() => {
            setIsElectroVisible(false);  // Ocultar el GIF del rayo después de la duración
            if (onImpact) {
                onImpact();  // Llamar a la función de impacto cuando termina el rayo
            }
        }, GIF_DURATION);

        // Iniciar la explosión antes de que el rayo desaparezca
        const explosionTimer = setTimeout(() => {
            setShowExplosion(true);  // Mostrar la explosión
            setTimeout(() => {
                setShowExplosion(false);  // Ocultar la explosión después de 1 segundo
            }, 1000); // Duración de la explosión
        }, EXPLOSION_DELAY);

        // Sacudir la pantalla durante el impacto
        setShakeScreen(true);
        const shakeTimer = setTimeout(() => {
            setShakeScreen(false);  // Detener la sacudida después de 500ms
        }, 400);

        return () => {
            clearTimeout(timer);
            clearTimeout(shakeTimer);
            clearTimeout(explosionTimer);
        };
    }, [onImpact]);

    const gifUrl = '/electro.gif';  // Ruta al GIF en la carpeta public

    // Verificamos si la posición del personaje está disponible y usamos la predeterminada si no.
    const { x, y } = personajePosicion || DEFAULT_POSITION;

    // Posición del rayo basada en la ubicación del personaje
    const lightningStyle = {
        position: "fixed",
        left: `${x - 150}px`, // Centramos el rayo según el personaje
        top: `${y - 100}px`, // Un poco encima del personaje
        width: "300px",  // Ajuste del tamaño del rayo
        height: "300px",
        zIndex: 9999,
        opacity: isElectroVisible ? 1 : 0,
        transition: "opacity 0.8s ease-out", // Desvanecimiento suave del GIF
    };

    // CSS para la animación de sacudida en la pantalla
    const shakeStyle = `
        @keyframes shake {
            0% { transform: translate(0px, 0px); }
            15% { transform: translate(2px, -2px); }
            30% { transform: translate(-2px, 2px); }
            45% { transform: translate(2px, 2px); }
            60% { transform: translate(2px, -2px); }
            75% { transform: translate(-2px, 2px); }
            90% { transform: translate(0px, 0px); }
            100% { transform: translate(0px, 0px); }
        }

        .shake-screen {
            animation: shake 0.5s ease-in-out;  /* Duración de 0.5 segundos para la sacudida de la pantalla */
        }

        @keyframes explosion {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            70% {
                transform: scale(1.5);
                opacity: 0.8;
            }
            100% {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;

    // Posición de la explosión justo debajo del rayo
    const explosionStyle = {
        position: "fixed",
        left: `${x - 60}px`,  // Ajustar la posición para centrar el óvalo
        top: `${y + 125}px`,  // Mantener justo debajo del rayo
        width: "100px",  // Ancho ajustado para un óvalo
        height: "5px",  // Altura reducida para un óvalo más plano
        background: "radial-gradient(ellipse, rgba(255, 255, 255, 0) 30%, rgba(0, 123, 255, 0.7) 50%, rgba(0, 123, 255, 0.8) 70%)",  // Gradiente ajustado para un óvalo
        borderRadius: "50% / 20%",  // Más achatado para reducir la altura del óvalo
        opacity: showExplosion ? 1 : 0,
        transform: "scale(0)",
        animation: showExplosion ? "explosion 1s forwards, blink 1s infinite" : "none",  // Añadido el parpadeo junto con la explosión
        zIndex: 9999,
    };

    // Sacudimos la pantalla, no el rayo
    useEffect(() => {
        if (shakeScreen) {
            document.body.classList.add("shake-screen");  // Añadir la clase al body para agitar la pantalla
        } else {
            document.body.classList.remove("shake-screen");  // Quitar la clase después del impacto
        }
    }, [shakeScreen]);

    return (
        <>
            <style>{shakeStyle}</style>

            <div>
                <div style={lightningStyle}>
                    {isElectroVisible && (
                        <img src={gifUrl} alt="Electro Hechizo" style={{ width: '100%', height: '100%' }} />
                    )}
                </div>

                {/* Contenedor de la explosión */}
                <div style={explosionStyle}></div>
            </div>
        </>
    );
}

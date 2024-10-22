import React, { useState, useEffect } from "react";

// Parámetros del rayo eléctrico
const GIF_DURATION = 2000; // Duración del GIF en milisegundos (ajusta este valor según la duración real del GIF)
const TARGET_POSITION = { x: window.innerWidth / 2, y: window.innerHeight / 2 }; // Centro de la pantalla

export default function ElectroHechizo({ onImpact }) { // Añadimos onImpact como prop para disparar la animación de golpeo
    const [isElectroVisible, setIsElectroVisible] = useState(true);
    const [shakeScreen, setShakeScreen] = useState(false);  // Estado para agitar la pantalla

    useEffect(() => {
        // Mostrar el GIF por la duración total del GIF
        const timer = setTimeout(() => {
            setIsElectroVisible(false);  // Ocultar el GIF después de la duración
            if (onImpact) {
                onImpact();  // Llamar a la función de impacto cuando termina el GIF
            }
        }, GIF_DURATION);

        // Activar el efecto de sacudida al inicio del impacto
        setShakeScreen(true);
        const shakeTimer = setTimeout(() => {
            setShakeScreen(false);  // Detener la sacudida después de 500ms
        }, 500);  // La sacudida durará 500ms (puedes ajustar este valor)

        return () => {
            clearTimeout(timer);
            clearTimeout(shakeTimer);
        };
    }, [onImpact]);

    const gifUrl = '/electro.gif';  // Ruta al GIF en la carpeta public

    const lightningStyle = {
        position: "fixed",
        left: `${TARGET_POSITION.x - 260}px`, // Ajustamos la posición y tamaño para que el rayo quede fijo
        top: `${TARGET_POSITION.y - 70}px`,
        width: "450px",  // Tamaño más grande del GIF
        height: "450px",
        zIndex: 9999,
        opacity: isElectroVisible ? 1 : 0,
        transition: "opacity 0.8s ease-out", // Desvanecimiento suave del GIF
    };

    // CSS para la animación de sacudida en la pantalla
    const shakeStyle = `
        @keyframes shake {
            0% { transform: translate(0px, 0px); }
            25% { transform: translate(10px, -10px); }
            50% { transform: translate(-10px, 10px); }
            75% { transform: translate(10px, 10px); }
            100% { transform: translate(0px, 0px); }
        }

        .shake-screen {
            animation: shake 0.5s ease-in-out;  /* Duración de 0.5 segundos para la sacudida de la pantalla */
        }
    `;

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
            {/* Insertar el CSS de la sacudida en el <head> */}
            <style>{shakeStyle}</style>

            <div>
                {/* El rayo permanece fijo en su lugar */}
                <div style={lightningStyle}>
                    {isElectroVisible && (
                        <img src={gifUrl} alt="Electro Hechizo" style={{ width: '100%', height: '100%' }} />
                    )}
                </div>
            </div>
        </>
    );
}

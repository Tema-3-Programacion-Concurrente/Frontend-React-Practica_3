# Frontend-React-Practica_3

# LINKS:

FRONTEND: https://github.com/Tema-3-Programacion-Concurrente/Frontend-React-Practica_3.git

BACKEND: https://github.com/Tema-3-Programacion-Concurrente/Backend-Springboot-Aspectos.git


# PARTICIPANTES

Jaime López Díaz

Nicolás Jiménez

Marcos García Benito Bilbao


# Experiment Management Frontend

Este proyecto es el frontend de una aplicación React que visualiza e interactua activa y visualmente con multiples pantallas que plantean diferentes sistemas de hechizos, usuarios y eventos mágicos desarrollados gracias a diferentes practicas de (orientacion a Aspectos) con las que se explota la dinámica(momento de aplicación variable) y trasnversal utilizacion de los servicios necesaria planteados en el backend ganando sobretodo en la parte de optimizacion del codigo reduciendo el volumen del mismo y además cumpliendo con todas las posibles variantes de hechizos y sus despliegues idiferentemente.

La aplicación frontend se comunica con el backend para obtener el estado inicial de los datos base apatir de los cuales poder trabajar las diferentes diversiones que ofrece(puesto que se los almacena en local storege) y mostrar las diferentes mecánicas pujantes y actividades de información-gestión de las mismas por paneles que entran bien por lo ojos simepre en base a los usuario "mago" resonsables de las actividades realizadas en la app.

-Extras que se agradecen tener claro esta:

OJO: Se establece un sistema de nivelado y puntaje asignado a todo usuario (se presenta la clásica mecanica de niveles empezando desde el mas bajo 0 y siendo la principal limitacion los puntos a disposición del jugador que será vitales para poder lanzar los distintos hechizos con coste variado)

Se plantea un log-in(registro de usuario) basado en una gran variedad de campos conbenientemente diferenciado entre administrador e usuario(magucho normal) --> (diferenciandose en la libertad de uso de los hechizos en base al sistema de puntos planteado) básicamente este va dado de la mano con el sistema de puntaje y nivelado.

Para poder testear todo esto sin limitaciones existen un administrdor y un usuario convencional con "cuentas-precreadas" establecidas con el único objetivo de que el usuario pueda gozar de la experiencia inmersiva al completo (sobretodo de los hechizos puesto que la gestion de los mismos no exige tanta atencion visual).

En resumen [Panel de log-in/panel de lanzamienton y visualizacion con animaciones y fondo/panel de gestion universal]

## Tecnologías Utilizadas

- **React**: Framework de JavaScript para la construcción de interfaces de usuario.
- **Webpack**: Empaquetador de módulos que compila el código de React.
- **Babel**: Compilador de JavaScript que permite usar la sintaxis moderna de ES6+ y JSX.
- **Styled Components**: Para manejar estilos en componentes de React.
- **Axios**: Cliente HTTP para realizar solicitudes al backend (enganche AOP).
- **React Router DOM**: Para manejar el enrutamiento dentro de la aplicación React.
- **Chart.js** y **React-Chartjs-2**: Cargado en el JSON por si fuese necesario.

## Requisitos

Para ejecutar el frontend necesitas tener instalados:

- **Node.js** (versión recomendada: 14+)
- **npm** (gestor de paquetes incluido con Node.js)

## Instalación

1. Clona el repositorio del frontend en tu máquina local:

```bash
git clone https://github.com/tu-usuario/frontend-magia.git
```

2. Navega al directorio del proyecto:

```bash
cd frontend-magia
```

3. Instala las dependencias del proyecto::

```bash
npm install
```

4- Clona el repositorio del frontend en tu máquina local:

```bash
npm start
```

## Estructura del Proyecto

- **src/**: Contiene el código fuente del proyecto.
- **components/**: Componentes reutilizables de React, como la visualización de la distribución.
- **pages/**: Páginas principales de la aplicación muestra de todo atraés de ellas (animaciones chulas).
- **services/**: Funciones para interactuar con la API, como las llamadas a Axios para obtener los datos del backend + aprobechamiento de aop.
- **App.js**: Punto de entrada principal de la aplicación React.
- **index.js**: Archivo de arranque de la aplicación que renderiza el componente raíz en el DOM.

## Relación entre Frontend y Backend

### -Backend

En el backend de tu aplicación de gestión de hechizos, se utiliza Spring Boot para crear una API RESTful robusta y escalable. Spring Boot simplifica el proceso de desarrollo al proporcionar un marco integral que incluye servidores integrados, inyección de dependencias y varios proyectos de inicio. Esto te permite centrarte en escribir la lógica de negocio en lugar de código repetitivo.
La aplicación aprovecha la Programación Orientada a Aspectos (AOP) para manejar preocupaciones transversales como el registro, la seguridad y la gestión de transacciones de usuarios y hechios (tematica orincipal).

AOP permite definir estas preocupaciones por separado de la lógica de negocio principal, haciendo el código más limpio y modular. El backend también emplea una arquitectura orientada a servicios con servicios diseñados para manejar operaciones concurrentes de manera eficiente. Estos servicios se instancian utilizando el Patrón de Fábrica, que proporciona una forma de crear objetos sin especificar la clase exacta del objeto que se creará. Esto es particularmente útil para gestionar diferentes tipos de hechizos, cada uno con propiedades y comportamientos únicos.
 
El Patrón de Fábrica "Factory" asegura que se cree el tipo correcto de servicio de hechizo basado en los parámetros de entrada. Este enfoque, combinado con la gestión de la concurrencia, asegura que múltiples operaciones relacionadas con hechizos puedan procesarse simultáneamente sin degradación del rendimiento, proporcionando una experiencia fluida para los usuarios que lanzan hechizos o gestionan su inventario de hechizos.

### -Frontend

El frontend, construido con React, consume la API(tema de Rest) para obtener los datos de estado y distribución de varios hechizos, usuarios y eventos mágicos que se han creado, asignado y simulado trnasversalmente gracias un conjunto de prácticas de programacion orientada a aspectos que se infundan antes, durante y posteriormente en los diferentes servicios según convenga para la correcta generación-visualización y gestión de hechizos por pantalla (entre otras cosas). 

Proporciona una interfaz de usuario de múltiples pantallas para disfrutar de diferentes "hechizantes" funcionalidades, incluyendo el registro, lanzamiento y muestra (mediante animaciones) de  distintos hechizos, la gestión (auditoría) basada en el ID del evento, el registro de usuarios (creación de cuentas) y mucho más.

En resumen, ofrece la capacidad de crear, gestionar, eliminar y procesar hechizos y eventos magicos de diferentes tipos de diversas maneras. Destacamos la existencia de perfiles de "mago" pre-creados para que los usuarios sin sus propias cuentas puedan disfrutar de todas las posibilidades experimentales de un mago avanzado.

En resumen tremenda app !!

# Frontend-React-Practica_3

# LINKS:

FRONTEND: https://github.com/Tema-3-Programacion-Concurrente/Frontend-React-Practica_3.git

BACKEND: https://github.com/Tema-3-Programacion-Concurrente/Backend-Springboot-Aspectos.git

# PARTICIPANTES

Jaime López Díaz

Nicolás Jiménez

Marcos García Benito Bilbao

# Experiment Management Frontend

Este proyecto consiste en el desarrollo del frontend de una aplicación React que permite la visualización e interacción activa con múltiples pantallas, las cuales presentan diversos sistemas de hechizos, usuarios y eventos mágicos. Estos sistemas han sido desarrollados mediante prácticas de orientación a aspectos, explotando la dinámica y la utilización transversal de los servicios necesarios planteados en el backend. Esto ha permitido optimizar el código, reduciendo su volumen y cumpliendo con todas las posibles variantes de hechizos y sus despliegues.

La aplicación frontend se comunica con el backend para obtener el estado inicial de los datos base, a partir de los cuales se pueden trabajar las diferentes funcionalidades ofrecidas. Estos datos se almacenan en el local storage, permitiendo mostrar diversas mecánicas y actividades de gestión de información a través de paneles visualmente atractivos, siempre en función de los usuarios “mago” responsables de las actividades realizadas en la aplicación.

**Extras a tener en cuenta:**

* Se establece un sistema de nivelado y puntaje asignado a cada usuario. Este sistema presenta la clásica mecánica de niveles, comenzando desde el nivel más bajo (0). La principal limitación son los puntos disponibles para el jugador, los cuales son vitales para lanzar los distintos hechizos, cada uno con un coste variado.
* El sistema de registro de usuario (log-in) se basa en una amplia variedad de campos, diferenciando convenientemente entre administradores y usuarios (magos comunes). Esta diferenciación se refleja en la libertad de uso de los hechizos, basada en el sistema de puntos planteado, que está estrechamente ligado al sistema de puntaje y nivelado.

Para poder probar todas estas funcionalidades sin limitaciones, existen cuentas precreadas para un administrador y un usuario convencional. Estas cuentas tienen el único objetivo de permitir al usuario disfrutar de una experiencia inmersiva completa, especialmente en lo que respecta a los hechizos, ya que la gestión de los mismos no requiere tanta atención visual.

En resumen, la aplicación cuenta con un panel de log-in, un panel de lanzamiento y visualización con animaciones y fondo, y un panel de gestión universal.

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

El frontend, desarrollado con React, consume la API REST para obtener los datos de estado y distribución de varios hechizos, usuarios y eventos mágicos que se han creado, asignado y simulado transversalmente gracias a un conjunto de prácticas de programación orientada a aspectos. Estas prácticas se aplican antes, durante y después en los diferentes servicios según convenga, para la correcta generación, visualización y gestión de hechizos por pantalla, entre otras funcionalidades.

La aplicación proporciona una interfaz de usuario con múltiples pantallas para disfrutar de diversas funcionalidades, incluyendo el registro, lanzamiento y visualización (mediante animaciones) de distintos hechizos, la gestión (auditoría) basada en el ID del evento, el registro de usuarios (creación de cuentas) y mucho más.

En resumen, la aplicación ofrece la capacidad de crear, gestionar, eliminar y procesar hechizos y eventos mágicos de diferentes tipos de diversas maneras. Cabe destacar la existencia de perfiles de “mago” pre-creados, permitiendo a los usuarios sin sus propias cuentas disfrutar de todas las posibilidades experimentales de un mago avanzado.

En resumen, ¡una aplicación impresionante!

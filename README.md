# DevPaul React Portfolio

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

<p align="center">
  <img src="./public/DevPaulNoBg.png" alt="DevPaul Logo" width="200"/>
</p>

## Tabla de Contenidos

- [Acerca del Proyecto](#acerca-del-proyecto)
- [Características](#características)
- [Demo](#demo)
- [Primeros Pasos](#primeros-pasos)
  - [Requisitos Previos](#requisitos-previos)
  - [Instalación](#instalación)
- [Desarrollo Local](#desarrollo-local)
- [Construcción para Producción](#construcción-para-producción)
- [Despliegue en Firebase Hosting](#despliegue-en-firebase-hosting)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Solución de Problemas](#solución-de-problemas)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)
- [Contacto](#contacto)

## Acerca del Proyecto

¡Bienvenido a **DevPaul React Portfolio**! Este es un portafolio profesional desarrollado con React, TypeScript, Vite y Tailwind CSS. Diseñado para mostrar mis habilidades, proyectos y experiencia como desarrollador full-stack. El portafolio incluye secciones interactivas, un formulario de contacto y una lista de clientes, proporcionando una visión completa de mi trayectoria profesional.

## Características

- **Diseño Responsive:** Optimizado para todos los dispositivos (móvil, tablet y escritorio)
- **Modo Oscuro/Claro:** Interfaz adaptable a las preferencias del usuario
- **Soporte Multilenguaje:** Disponible en Español e Inglés para una audiencia global
- **Animaciones Fluidas:** Implementadas con Framer Motion para mejorar la experiencia de usuario
- **Optimizado para SEO:** Meta etiquetas y datos estructurados para mejor visibilidad en motores de búsqueda
- **Desplegado en Firebase Hosting:** Rendimiento optimizado y despliegue continuo
- **Formulario de Contacto Interactivo:** Permite a los visitantes enviar mensajes directamente
- **Sección de Clientes:** Muestra los clientes y proyectos realizados

## Demo

Visita la demo en vivo del portafolio: [https://devpaul-ed0bb.web.app](https://devpaul-ed0bb.web.app)

## Primeros Pasos

Sigue estas instrucciones para configurar y ejecutar el proyecto localmente en tu máquina.

### Requisitos Previos

- Node.js (versión 16 o superior)
- npm o yarn
- Firebase CLI (`npm install -g firebase-tools`)

### Instalación

1. **Clonar el Repositorio**

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd devpaul_react_portfolio

# Instalar dependencias
npm install

# Configurar variables de entorno
# Crea un archivo .env.local en la raíz del proyecto con las siguientes variables:
VITE_FIREBASE_API_KEY=tu-api-key
VITE_FIREBASE_AUTH_DOMAIN=tu-auth-domain
VITE_FIREBASE_PROJECT_ID=tu-project-id
VITE_FIREBASE_STORAGE_BUCKET=tu-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu-messaging-sender-id
VITE_FIREBASE_APP_ID=tu-app-id
VITE_FIREBASE_MEASUREMENT_ID=tu-measurement-id

# IMPORTANTE: En Vite, las variables de entorno deben ser accedidas usando import.meta.env
# en lugar de process.env. Además, para que funcionen en producción, es recomendable
# proporcionar valores por defecto como se muestra en src/firebase/config.ts
```

## Desarrollo Local

```bash
# Iniciar servidor de desarrollo
npm run dev
```

Esto lanzará la aplicación en modo desarrollo en [http://localhost:5173](http://localhost:5173).

## Construcción para Producción

```bash
# Generar build de producción
npm run build

# Previsualizar build
npm run preview
```

## Despliegue en Firebase Hosting

```bash
# Iniciar sesión en Firebase
npm run firebase:login

# Inicializar proyecto de Firebase (solo la primera vez)
npm run firebase:init

# Desplegar a Firebase Hosting
npm run firebase:deploy
```

## Estructura del Proyecto

```
devpaul_react_portfolio/
├── public/                # Archivos estáticos y assets
│   ├── DevPaulNoBg.png    # Logo principal
│   ├── favicon.ico        # Favicon del sitio
│   └── manifest.json      # Configuración PWA
├── src/
│   ├── components/        # Componentes reutilizables
│   │   ├── About.tsx      # Sección Sobre Mí
│   │   ├── Clients.tsx    # Sección de Clientes
│   │   ├── Contact.tsx    # Formulario de Contacto
│   │   ├── Hero.tsx       # Sección principal
│   │   └── ...            # Otros componentes
│   ├── contexts/          # Contextos de React
│   │   ├── LanguageContext.tsx  # Contexto de idioma
│   │   └── ThemeContext.tsx     # Contexto de tema
│   ├── data/              # Datos estáticos
│   ├── firebase/          # Configuración de Firebase
│   ├── hooks/             # Custom hooks
│   ├── types/             # Definiciones de TypeScript
│   ├── utils/             # Funciones de utilidad
│   ├── App.tsx            # Componente principal
│   └── main.tsx           # Punto de entrada
├── .env.local             # Variables de entorno locales
├── firebase.json          # Configuración de Firebase
├── index.html             # Plantilla HTML
├── package.json           # Dependencias y scripts
├── tailwind.config.js     # Configuración de Tailwind CSS
├── tsconfig.json          # Configuración de TypeScript
└── vite.config.ts         # Configuración de Vite
```

## Tecnologías Utilizadas

- **React 18:** Biblioteca para construir interfaces de usuario
- **TypeScript:** Superset tipado de JavaScript
- **Vite:** Herramienta de construcción rápida para desarrollo web
- **Tailwind CSS:** Framework CSS utilitario
- **Framer Motion:** Biblioteca para animaciones
- **Firebase:** Plataforma para desarrollo de aplicaciones web
  - Hosting: Para desplegar la aplicación
  - Analytics: Para análisis de uso
- **React Hook Form + Yup:** Para validación de formularios
- **Context API:** Para gestión de estado global

## Solución de Problemas

### Error: Missing App configuration value: "projectId"

Si encuentras este error después del despliegue:
```
Uncaught FirebaseError: Installations: Missing App configuration value: "projectId" (installations/missing-app-config-values).
```

Este problema ocurre porque las variables de entorno no están disponibles en el entorno de producción después del build. Para solucionarlo:

1. Asegúrate de acceder a las variables de entorno usando `import.meta.env` en lugar de `process.env`
2. Proporciona valores por defecto para cada configuración en `src/firebase/config.ts`:

```typescript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "tu-api-key-aquí",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "tu-auth-domain-aquí",
  // ... resto de configuraciones con valores por defecto
};
```

## Contribuciones

¡Las contribuciones son bienvenidas! Sigue estos pasos para contribuir:

1. **Haz un Fork del repositorio**
2. **Crea una rama para tu característica**
   ```bash
   git checkout -b feature/NuevaCaracteristica
   ```
3. **Realiza tus cambios**
4. **Haz commit de tus cambios**
   ```bash
   git commit -m "Añadir nueva característica"
   ```
5. **Envía tus cambios**
   ```bash
   git push origin feature/NuevaCaracteristica
   ```
6. **Abre un Pull Request**

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE para más detalles.

## Contacto

Desarrollado por: **Paul Realpe**

Email: co.devpaul@gmail.com

Sitio web: [https://devpaul.pro](https://devpaul.pro)

¡No dudes en contactarme para cualquier consulta o colaboración!
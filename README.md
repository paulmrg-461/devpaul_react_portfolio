# DevPaul React Portfolio

Portafolio profesional desarrollado con React, TypeScript, Vite y Tailwind CSS.

## Características

- Diseño responsive para todos los dispositivos
- Modo oscuro/claro
- Soporte multilenguaje (Español/Inglés)
- Animaciones con Framer Motion
- Optimizado para SEO
- Desplegado en Firebase Hosting

## Requisitos previos

- Node.js (versión 16 o superior)
- npm o yarn
- Firebase CLI (`npm install -g firebase-tools`)

## Instalación

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

## Desarrollo local

```bash
# Iniciar servidor de desarrollo
npm run dev
```

## Construcción para producción

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

## Estructura del proyecto

```
/src
  /components     # Componentes reutilizables
  /contexts       # Contextos de React (tema, idioma)
  /data           # Datos estáticos
  /firebase       # Configuración de Firebase
  /hooks          # Custom hooks
  /types          # Definiciones de TypeScript
  /utils          # Funciones de utilidad
```

## Tecnologías utilizadas

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Firebase
- React Hook Form + Yup

## Solución de problemas

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

## Licencia

MIT
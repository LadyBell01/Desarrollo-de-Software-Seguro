# 🍳 RecetasApp

Una aplicación móvil para descubrir, explorar y guardar recetas favoritas, construida con Ionic Angular y conectada a la API de TheMealDB.

![Ionic](https://img.shields.io/badge/Ionic-7+-3880FF?style=flat&logo=ionic)
![Angular](https://img.shields.io/badge/Angular-17+-DD0031?style=flat&logo=angular)
![Capacitor](https://img.shields.io/badge/Capacitor-7+-119EFF?style=flat&logo=capacitor)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=flat&logo=typescript)

## 📱 Características

### ✨ Funcionalidades Principales

- **🔐 Autenticación Mock**: Sistema de login y registro con validación
- **🏠 Exploración de Recetas**: Navega por recetas populares y busca por nombre
- **🔍 Búsqueda Avanzada**: Filtra recetas por categorías
- **❤️ Favoritos**: Guarda y gestiona recetas favoritas
- **📖 Detalle Completo**: Ingredientes, instrucciones paso a paso y videos
- **👤 Perfil de Usuario**: Visualiza estadísticas y favoritos
- **🎨 Diseño Premium**: Tema oscuro con animaciones suaves

### 🎯 Pantallas Implementadas

1. **Welcome/Splash** - Pantalla de bienvenida con redirección automática
2. **Login/Registro** - Autenticación con diseño moderno
3. **Home** - Recetas populares y listado completo
4. **Detalle de Receta** - Información completa con ingredientes
5. **Favoritos** - Gestión de recetas guardadas
6. **Perfil** - Información del usuario y estadísticas

## 🚀 Tecnologías

- **Framework**: Ionic 8 + Angular 17
- **Lenguaje**: TypeScript 5
- **Plataforma Nativa**: Capacitor 7
- **API**: [TheMealDB](https://www.themealdb.com/api.php)
- **Estilos**: SCSS con variables CSS personalizadas
- **Estado**: RxJS con BehaviorSubjects

## 📋 Requisitos Previos

Antes de comenzar, asegurarse de tener instalado:

- [Node.js](https://nodejs.org/) (v18 o superior)
- [npm](https://www.npmjs.com/) (v9 o superior)
- [Ionic CLI](https://ionicframework.com/docs/cli) (`npm install -g @ionic/cli`)
- [Android Studio](https://developer.android.com/studio) (para desarrollo Android)
- [Xcode](https://developer.apple.com/xcode/) (para desarrollo iOS, solo macOS)

## 🛠️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/LadyBell01/recipes-app.git
cd recipes-app
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar en desarrollo

```bash
ionic serve
```

La aplicación se abrirá en `http://localhost:8100`

## 📱 Ejecutar en Dispositivos

### Android

```bash
# Compilar la aplicación
ionic build --prod

# Agregar plataforma Android (solo la primera vez)
ionic cap add android

# Sincronizar cambios
ionic cap sync android

# Abrir en Android Studio
ionic cap open android
```

O ejecutar directamente:

```bash
ionic cap run android
```

### iOS (solo macOS)

```bash
# Compilar la aplicación
ionic build --prod

# Agregar plataforma iOS (solo la primera vez)
ionic cap add ios

# Sincronizar cambios
ionic cap sync ios

# Abrir en Xcode
ionic cap open ios
```

### 📲 Instalar Directamente en Dispositivo Android

Para instalar la app directamente en tu celular Android conectado por USB:

```bash
# 1. Verificar que el dispositivo esté conectado
adb devices

# 2. Compilar y ejecutar en el dispositivo
ionic cap run android --target <DEVICE_ID>
```

**Nota**: Reemplaza `<DEVICE_ID>` con el ID de tu dispositivo que aparece en el comando `adb devices`.

**Ejemplo**:
```bash
# Si tu dispositivo muestra: 9e8b7c6a device
ionic cap run android --target 9e8b7c6a
```

**Requisitos previos**:
- Habilitar **Depuración USB** en el dispositivo Android (Ajustes > Opciones de desarrollador)
- Tener **ADB** instalado (viene con Android Studio)
- Conectar el dispositivo por USB y aceptar la autorización de depuración

## 🔑 Credenciales de Prueba

Para probar la aplicación, se usan las siguientes credenciales:

- **Email**: `test@test.com`
- **Contraseña**: `123456`

## 📁 Estructura del Proyecto

```
recipes-app/
├── src/
│   ├── app/
│   │   ├── auth/                    # Módulo de autenticación
│   │   │   ├── pages/
│   │   │   │   └── welcome/         # Pantalla de bienvenida
│   │   │   └── auth-routing.module.ts
│   │   ├── recipes/                 # Módulo de recetas
│   │   │   ├── pages/
│   │   │   │   └── favorites/       # Pantalla de favoritos
│   │   │   └── tabs/                # Navegación por tabs
│   │   ├── pages/
│   │   │   ├── login/               # Login
│   │   │   ├── profile/             # Perfil
│   │   │   └── recipe-detail/       # Detalle de receta
│   │   ├── home/                    # Página principal
│   │   ├── services/                # Servicios
│   │   │   ├── recipe.service.ts    # API de recetas
│   │   │   ├── auth-mock.service.ts # Autenticación mock
│   │   │   └── favorites-mock.service.ts
│   │   └── interfaces/              # Interfaces TypeScript
│   ├── theme/                       # Estilos globales
│   │   └── variables.scss           # Variables CSS
│   └── environments/                # Configuración de entornos
├── android/                         # Proyecto nativo Android
├── ios/                             # Proyecto nativo iOS
└── capacitor.config.ts              # Configuración de Capacitor
```

## 🎨 Personalización

### Cambiar el App ID

Edita `capacitor.config.ts`:

```typescript
const config: CapacitorConfig = {
  appId: 'com.tuempresa.recetasapp', // Cambia esto
  appName: 'RecetasApp',
  webDir: 'www'
};
```

### Cambiar Colores del Tema

Edita `src/theme/variables.scss`:

```scss
:root {
  --ion-color-primary: #ff7043; // Color principal
  --ion-background-color: #121212; // Fondo
  --ion-text-color: #ffffff; // Texto
}
```

### Cambiar el Ícono de la App

1. Genera tus íconos usando [Ionic App Icon Generator](https://www.ionicframework.com/docs/cli/commands/capacitor-run#icon-and-splash-screen-generation)
2. Coloca los íconos en `resources/`
3. Ejecuta: `ionic capacitor copy`

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm start                    # Inicia servidor de desarrollo
ionic serve                  # Inicia servidor de desarrollo (alias)

# Build
npm run build               # Compilación de desarrollo
ionic build --prod          # Compilación de producción

# Linting
npm run lint                # Ejecutar linter

# Capacitor
ionic cap sync              # Sincronizar todas las plataformas
ionic cap sync android      # Sincronizar solo Android
ionic cap sync ios          # Sincronizar solo iOS
```

## 🌐 API

La aplicación consume la API gratuita de [TheMealDB](https://www.themealdb.com/api.php):

- **Base URL**: `https://www.themealdb.com/api/json/v1/1/`
- **Endpoints utilizados**:
  - `search.php?s=` - Buscar recetas
  - `lookup.php?i={id}` - Obtener receta por ID
  - `categories.php` - Obtener categorías

## 🐛 Solución de Problemas

### La app no compila

```bash
# Limpiar caché
rm -rf node_modules package-lock.json
npm install
```

### Error en Android

```bash
# Limpiar build de Android
cd android
./gradlew clean
cd ..
ionic cap sync android
```

### Error "Cannot GET /"

Asegurarse de que el servidor esté corriendo:

```bash
ionic serve
```

## 📝 Roadmap

- [ ] Implementar registro real con backend
- [ ] Agregar modo offline con almacenamiento local
- [ ] Implementar compartir recetas
- [ ] Agregar lista de compras
- [ ] Soporte para múltiples idiomas
- [ ] Notificaciones push
- [ ] Integración con redes sociales


**Leidy Herrera** - [@leidychef](https://github.com/LadyBell01)


# Task Manager Frontend

Frontend del proyecto integrador para la gestión de usuarios y tareas. Está
preparado para trabajar con el backend vecino `Proyecto-Integrador-Backend`.

## Integración local

Al ejecutar el frontend con `vite dev`, las llamadas a `/api` se reenvían al
backend en `http://localhost:3000` mediante el proxy de Vite.

- En desarrollo no es obligatorio crear un archivo `.env`.
- Si necesitas apuntar a otro backend, define `VITE_API_URL`.
- Para `build` o `vite preview`, se recomienda definir `VITE_API_URL` cuando la
  API no vaya a correr en `http://localhost:3000`.

Ejemplo opcional de `.env`:

```bash
VITE_API_URL=http://localhost:3000
```

## Cómo ejecutar el frontend

1. Instala dependencias:
   ```bash
   npm install
   ```
2. Inicia Vite en modo desarrollo:
   ```bash
   npm run dev
   ```
3. Abre la URL que muestre Vite, normalmente `http://localhost:5173`.

## Flujo recomendado junto al backend

1. En `Proyecto-Integrador-Backend`, instala dependencias y arranca el servidor:
   ```bash
   npm install
   node src/main.js
   ```
2. En este proyecto, ejecuta:
   ```bash
   npm install
   npm run dev
   ```
3. Inicia sesión desde el navegador.

## Credenciales de prueba

Administrador:

- `email`: `carlos.ramirez@email.com`
- `password`: `Admin12345`

Usuarios estándar cargados en semilla:

- Usa cualquier correo del backend
- `password`: `User12345`

## Scripts disponibles

- `npm run dev`: inicia el servidor de desarrollo con Vite
- `npm run build`: genera el build de producción
- `npm run preview`: sirve el build generado localmente

## Integrantes

1. Julian Andres Sanchez "Scrum Master"
2. Keiner Fabian Arismendy "Backend"
3. Yedher David Pineda "Frontend"

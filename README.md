# Vibes Mini Market

Prueba técnica para Vibes. Un mini market simple que muestra una lista de productos, permite filtrarlos y ver sus detalles.

#### Descripción
El proyecto está construido en un monorepositorio con la carpeta de `shared/`, `api/` y `web/`, usando una forma de monorepositorio en la que se pueden compartir los tipos y los esquemas. Use zod ya que estoy acostumbrado a tenerlos para asi validar los tipos en cada parte de la app como en los formularios hasta en el repositorio para minimizar los errores. También tiene una estructura un poco más separada para que así para tener más escalabilidad. 

## Funcionalidades

- Monorepositorio
- MongoDB
- Buena estructura de código para facilitar el mantenimiento y escalabilidad
- CI

## Stack Tecnológico

- Frontend:
    - Tailwind CSS
    - TanStack Query (React Query) para el manejo de estado del servidor.

- Backend:
    - MongoMemoryServer
    - @faker-js/faker

### Instalación y Ejecución

1.  Clona el repositorio:
    ```bash
    git clone https://github.com/Michael-Liendo/vibes-mini-market-test.git
    cd vibes-mini-market-test
    ```

2.  Instala las dependencias desde la raíz del proyecto:
    ```bash
    npm install
    ```

3.  Inicia tanto la API como el cliente web en modo de desarrollo (al correr el servidor se correrán los seeds de la base de datos):
    ```bash
    cd api
    # Copiar .env.example a .env
    cp .env.example .env
    # Iniciar el servidor
    npm run dev
    ```

4. Inicia la web

   ```bash
   cd web
   # Copiar .env.example a .env
   cp .env.example .env
   # Iniciar la aplicación
   npm run dev
   ```

La web abre en **http://localhost:3000** y la API se ejecuta en **http://localhost:3001**.

#### Decisiones
- Elegí usar las query de la API en lugar de la función `getTopCheapestAvailable` porque es mejor directamente que sea trabajo de la base de datos que el servidor como tal, ya que con grandes datos podría ser muy pesado y lento
- Me salí un poco de la estructura de carpeta sugerida, pero lo hice para mejorar la organización y la escalabilidad del proyecto. (Y así es que estoy acostumbrado para que haya menos errores y si los hay sean más fácil de resolverlos)
- No incluí test debido a que no puedo destinar 24h a una prueba técnica sin conocer más información al puesto de trabajo, pero en un entorno de trabajo real, las incluiría
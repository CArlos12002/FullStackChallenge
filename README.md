# Fullstack Contact Management Application

Sistema completo de gestión de contactos desarrollado con React, Node.js y PostgreSQL para el Job Sample de WePrope.

## Descripción del Proyecto

Aplicación web fullstack que permite a los usuarios enviar formularios de contacto y visualizar todos los contactos enviados en tiempo real. Incluye validación completa, diseño responsive, animaciones profesionales y una API REST robusta.

## Arquitectura del Sistema

```
Frontend (React + TypeScript)
       ↓ HTTP Requests
Backend (Node.js + Express)
       ↓ SQL Queries  
Database (PostgreSQL)
```

## Tecnologías Utilizadas

### Frontend
- **React 18** - Librería de interfaz de usuario
- **TypeScript** - Superset tipado de JavaScript
- **CSS3** - Estilos modernos con animaciones
- **Fetch API** - Comunicación con backend

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **PostgreSQL** - Base de datos relacional
- **CORS** - Políticas de origen cruzado

### Herramientas de Desarrollo
- **Create React App** - Configuración del frontend
- **npm** - Gestión de dependencias
- **Git** - Control de versiones

## Estructura del Proyecto

```
FullStackFSChallenge/
├── backend/
│   ├── server.js           # Servidor Express principal
│   ├── package.json        # Dependencias del backend
│   ├── .env               # Variables de entorno
│   └── README.md          # Documentación del backend
├── frontend/
│   ├── src/
│   │   ├── App.tsx        # Componente principal React
│   │   ├── App.css        # Estilos de la aplicación
│   │   ├── App.test.tsx   # Tests unitarios
│   │   └── index.tsx      # Punto de entrada
│   ├── public/            # Archivos estáticos
│   ├── package.json       # Dependencias del frontend
│   └── README.md          # Documentación del frontend
├── .gitignore             # Archivos ignorados por Git
└── README.md              # Esta documentación
```

## Instalación y Configuración

### Prerrequisitos

- Node.js 18 o superior
- PostgreSQL 12 o superior
- npm como gestor de paquetes
- Git para clonar el repositorio

### 1. Clonar el Repositorio

```bash
git clone https://github.com/CArlos12002/FullStackFSChallenge.git
cd FullStackFSChallenge
```

### 2. Configuración de la Base de Datos

```sql
-- Conectar a PostgreSQL como superusuario
psql -U postgres

-- Crear usuario y base de datos
CREATE USER challengeia WITH PASSWORD 'password123';
CREATE DATABASE challengeia_db OWNER challengeia;
GRANT ALL PRIVILEGES ON DATABASE challengeia_db TO challengeia;

-- Salir
\q
```

### 3. Configuración del Backend

```bash
# Navegar al directorio del backend
cd backend

# Instalar dependencias
npm install

# Crear archivo de variables de entorno
cat > .env << EOF
DB_HOST=localhost
DB_PORT=5432
DB_NAME=challengeia_db
DB_USER=challengeia
DB_PASSWORD=password123
PORT=3001
EOF

# Iniciar el servidor
node server.js
```

### 4. Configuración del Frontend

```bash
# Abrir nueva terminal y navegar al frontend
cd frontend

# Instalar dependencias
npm install

# Iniciar la aplicación
npm start
```

## Ejecución de la Aplicación

### Modo Desarrollo

1. **Iniciar Backend:**
```bash
cd backend
node server.js
# Servidor corriendo en http://localhost:3001
```

2. **Iniciar Frontend:**
```bash
cd frontend
npm start
# Aplicación corriendo en http://localhost:3000
```

### Verificación del Sistema

1. **Backend Health Check:**
   - http://localhost:3001/api/health

2. **Frontend:**
   - http://localhost:3000

3. **API Endpoints:**
   - GET http://localhost:3001/api/contacts
   - POST http://localhost:3001/api/contacts

## Funcionalidades Principales

### Formulario de Contacto
- Campos validados: nombre, email, mensaje
- Validación en tiempo real
- Estados de carga durante envío
- Feedback visual de éxito/error

### Gestión de Contactos
- Visualización de todos los contactos
- Ordenamiento por fecha de creación
- Actualización automática tras nuevo envío
- Diseño responsive tipo tarjetas

### Experiencia de Usuario
- Animaciones CSS profesionales
- Efectos hover interactivos
- Diseño responsive mobile-first
- Paleta de colores profesional en blanco y negro

## API REST Endpoints

### GET /
Información general del servidor
```json
{
  "message": "Backend del Job Sample funcionando!",
  "status": "success"
}
```

### GET /api/health
Estado del sistema y conexión a base de datos
```json
{
  "message": "Sistema funcionando correctamente",
  "database_connected": true,
  "current_time": "2025-07-16T10:30:00Z",
  "total_contacts": 5
}
```

### GET /api/contacts
Obtener todos los contactos
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Juan Pérez",
      "email": "juan@example.com", 
      "message": "Mensaje de consulta",
      "created_at": "2025-07-16T10:30:00Z"
    }
  ],
  "count": 1
}
```

### POST /api/contacts
Crear nuevo contacto
```json
// Request Body
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "message": "Mensaje de consulta"
}

// Response
{
  "success": true,
  "message": "Contacto creado exitosamente",
  "data": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "message": "Mensaje de consulta",
    "created_at": "2025-07-16T10:30:00Z"
  }
}
```

## Esquema de Base de Datos

### Tabla: contacts

| Campo | Tipo | Restricciones | Descripción |
|-------|------|---------------|-------------|
| id | SERIAL | PRIMARY KEY | Identificador único |
| name | VARCHAR(100) | NOT NULL | Nombre del contacto |
| email | VARCHAR(100) | NOT NULL | Correo electrónico |
| message | TEXT | NOT NULL | Mensaje enviado |
| created_at | TIMESTAMP | DEFAULT NOW() | Fecha de creación |

### Consultas SQL Principales

```sql
-- Crear tabla
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar contacto
INSERT INTO contacts (name, email, message) 
VALUES ($1, $2, $3) RETURNING *;

-- Obtener todos los contactos
SELECT * FROM contacts ORDER BY created_at DESC;
```

## Validaciones y Seguridad

### Frontend (Client-side)
- Campos requeridos obligatorios
- Validación de formato de email
- Sanitización de inputs
- Estados disabled durante carga

### Backend (Server-side)
- Validación de datos de entrada
- Prevención de inyección SQL con consultas parametrizadas
- Manejo robusto de errores
- Headers CORS configurados

### Respuestas de Error
```json
{
  "success": false,
  "message": "Todos los campos son obligatorios",
  "required": ["name", "email", "message"]
}
```

## Testing

### Backend
```bash
cd backend
# Health check
curl http://localhost:3001/api/health

# Crear contacto
curl -X POST http://localhost:3001/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Test message"}'
```

### Frontend
```bash
cd frontend
npm test
```

Tests incluidos:
- Renderizado del componente principal
- Presencia de campos del formulario
- Funcionalidad de la sección de contactos

## Solución de Problemas

### Error de Conexión a Base de Datos
```
❌ Error conectando a la base de datos
```
**Solución:**
- Verificar que PostgreSQL esté ejecutándose
- Confirmar credenciales en .env
- Verificar que la base de datos existe

### Error CORS
```
Access to fetch blocked by CORS policy
```
**Solución:**
- Backend configurado para aceptar localhost:3000
- Verificar que ambos servidores estén corriendo

### Puerto Ocupado
```
EADDRINUSE: address already in use
```
**Solución:**
- Cambiar puerto en variables de entorno
- Detener procesos que usen los puertos 3000/3001

## Performance y Optimización

### Backend
- Pool de conexiones PostgreSQL optimizado
- Consultas SQL indexadas
- Manejo asíncrono de operaciones
- Tiempo de respuesta promedio < 100ms

### Frontend
- Bundle optimizado con Create React App
- Componentes React eficientes
- CSS sin librerías externas
- Imágenes y assets optimizados

## Deployment

### Backend (Sugerencias)
- **Railway** - Deploy directo desde GitHub
- **Heroku** - Con PostgreSQL add-on
- **DigitalOcean** - App Platform

### Frontend (Sugerencias)  
- **Netlify** - Deploy automático
- **Vercel** - Optimizado para React
- **GitHub Pages** - Para hosting estático

### Variables de Entorno en Producción
```bash
# Backend
DATABASE_URL=postgresql://user:pass@host:port/db
PORT=3001
NODE_ENV=production

# Frontend
REACT_APP_API_URL=https://tu-backend.com
```

## Características Técnicas Destacadas

### Arquitectura
- Separación clara frontend/backend
- API RESTful bien estructurada
- Base de datos normalizada
- Código modular y escalable

### Calidad del Código
- TypeScript para type safety
- Manejo consistente de errores
- Validación en múltiples capas
- Documentación completa

### Experiencia de Usuario
- Diseño responsive mobile-first
- Animaciones CSS profesionales
- Feedback visual inmediato
- Estados de carga apropiados

## Próximas Mejoras

### Funcionalidades
- Edición de contactos existentes
- Búsqueda y filtrado avanzado
- Paginación para grandes volúmenes
- Exportación de datos a CSV
- Sistema de categorías

### Técnicas
- Autenticación de usuarios
- Rate limiting en API
- Caching con Redis
- Tests de integración completos
- Containerización con Docker
- CI/CD pipeline

## Contribuciones

Este proyecto fue desarrollado como job sample para demostrar habilidades en:
- Desarrollo fullstack moderno
- Integración frontend-backend
- Diseño de bases de datos
- APIs RESTful
- Experiencia de usuario
- Buenas prácticas de desarrollo

## Contacto

**Desarrollador:** Carlos [Apellido]  
**Email:** [tu-email]  
**GitHub:** https://github.com/CArlos12002  
**Proyecto:** Job Sample para WePrope - AI Fullstack Developer Jr

---

**Desarrollado con dedicación para WePrope**  
*Demostrando pasión por la tecnología y excelencia en desarrollo*

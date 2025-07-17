# Backend - API REST para Formulario de Contacto

API REST desarrollada en Node.js que maneja un sistema de formulario de contacto con almacenamiento en PostgreSQL.

## Descripción

Este backend proporciona endpoints para crear, leer y gestionar contactos enviados a través de un formulario web. Incluye validación de datos, manejo de errores y conexión robusta a base de datos.

## Herramientas Utilizadas

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web minimalista
- **PostgreSQL** - Sistema de base de datos relacional
- **pg** - Cliente PostgreSQL para Node.js
- **cors** - Middleware para políticas CORS
- **dotenv** - Gestión de variables de entorno

## Estructura del Proyecto

```
backend/
├── server.js            # Servidor principal y endpoints
├── package.json         # Dependencias y scripts
├── .env                # Variables de entorno
└── README.md           # Esta documentación
```

## Instalación

### Prerrequisitos

1. Node.js 18 o superior
2. PostgreSQL 12 o superior
3. npm como gestor de paquetes

### Configuración de Base de Datos

1. Conectar a PostgreSQL como superusuario:
```bash
psql -U postgres
```

2. Crear usuario y base de datos:
```sql
CREATE USER challengeia WITH PASSWORD 'password123';
CREATE DATABASE challengeia_db OWNER challengeia;
GRANT ALL PRIVILEGES ON DATABASE challengeia_db TO challengeia;
\q
```

### Configuración del Proyecto

1. Instalar dependencias:
```bash
npm install
```

2. Crear archivo de variables de entorno:
```bash
# Archivo .env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=challengeia_db
DB_USER=challengeia
DB_PASSWORD=password123
PORT=3001
```

## Ejecución

### Modo de desarrollo
```bash
node server.js
```

### Verificar funcionamiento
Al iniciar correctamente, verás estos mensajes:
```
✅ Base de datos inicializada
🚀 Servidor funcionando en http://localhost:3001
📊 Prueba: http://localhost:3001/api/health
📝 Contactos: http://localhost:3001/api/contacts
🔥 ¡Backend listo para el frontend!
```

## Endpoints de la API

### GET /
Información general del servidor
```json
{
  "message": "🚀 Backend del Job Sample funcionando!",
  "status": "success",
  "endpoints": [...]
}
```

### GET /api/health
Verificación de estado del sistema y base de datos
```json
{
  "message": "✅ Sistema funcionando correctamente",
  "database_connected": true,
  "current_time": "2025-07-16T10:30:00Z",
  "total_contacts": 5
}
```

### GET /api/contacts
Obtener todos los contactos ordenados por fecha
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Juan Pérez",
      "email": "juan@example.com",
      "message": "Mensaje de prueba",
      "created_at": "2025-07-16T10:30:00Z"
    }
  ],
  "count": 1
}
```

### POST /api/contacts
Crear nuevo contacto

**Cuerpo de la petición:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "message": "Mensaje de consulta"
}
```

**Respuesta exitosa:**
```json
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

### GET /api/contacts/:id
Obtener contacto específico por ID

**Respuesta:**
```json
{
  "success": true,
  "message": "Contacto encontrado",
  "data": { ... }
}
```

### DELETE /api/contacts/:id
Eliminar contacto por ID

**Respuesta:**
```json
{
  "success": true,
  "message": "Contacto eliminado exitosamente",
  "data": { ... }
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

## Validaciones

### Frontend y Backend
- Campos obligatorios: name, email, message
- Formato de email válido
- Longitud mínima de mensaje: 10 caracteres
- Longitud mínima de nombre: 2 caracteres

### Respuestas de Error
```json
{
  "success": false,
  "message": "Todos los campos son obligatorios",
  "required": ["name", "email", "message"]
}
```

## Configuración CORS

El servidor está configurado para aceptar peticiones desde:
- http://localhost:3000 (frontend React)
- Cualquier origen durante desarrollo

## Variables de Entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| DB_HOST | Host de PostgreSQL | localhost |
| DB_PORT | Puerto de PostgreSQL | 5432 |
| DB_NAME | Nombre de la base de datos | challengeia_db |
| DB_USER | Usuario de PostgreSQL | challengeia |
| DB_PASSWORD | Contraseña del usuario | password123 |
| PORT | Puerto del servidor | 3001 |

## Solución de Problemas

### Error de conexión a base de datos
```
❌ Error conectando a la base de datos: connection refused
```
**Solución:**
- Verificar que PostgreSQL esté ejecutándose
- Confirmar credenciales en archivo .env
- Verificar que la base de datos existe

### Puerto ocupado
```
Error: listen EADDRINUSE: address already in use :::3001
```
**Solución:**
- Cambiar puerto en .env
- Detener proceso que usa el puerto 3001

### Error de módulos
```
Cannot find module 'express'
```
**Solución:**
- Ejecutar `npm install` para instalar dependencias

## Características de Seguridad

- Validación de entrada en todos los endpoints
- Sanitización de datos antes de insertar en base de datos
- Manejo robusto de errores
- Prevención de inyección SQL usando consultas parametrizadas
- Headers CORS configurados apropiadamente

## Rendimiento

- Pool de conexiones a PostgreSQL para eficiencia
- Respuestas JSON optimizadas
- Manejo asíncrono de todas las operaciones
- Tiempo de respuesta promedio: < 100ms

## Testing

### Pruebas manuales con curl

Crear contacto:
```bash
curl -X POST http://localhost:3001/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","message":"Test message"}'
```

Obtener contactos:
```bash
curl http://localhost:3001/api/contacts
```

### Health check
```bash
curl http://localhost:3001/api/health
```

## Desarrollo Futuro

Posibles mejoras:
- Autenticación y autorización
- Rate limiting
- Logging avanzado
- Caching con Redis
- Documentación con Swagger
- Tests unitarios y de integración
- Containerización con Docker

## Notas Técnicas

El servidor utiliza un diseño monolítico para simplicidad del job sample. En producción se recomendaría separar en módulos (controladores, modelos, rutas) para mejor mantenibilidad.
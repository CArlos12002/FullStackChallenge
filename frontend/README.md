# Frontend - Aplicación de Formulario de Contacto

Interfaz web desarrollada en React con TypeScript que permite enviar y visualizar contactos mediante una API REST.

## Descripción

Esta aplicación frontend proporciona una interfaz intuitiva y moderna para gestionar contactos. Incluye un formulario de envío y una lista en tiempo real de contactos guardados, con diseño responsive y animaciones sutiles.

## Herramientas Utilizadas

- **React 18** - Librería de interfaz de usuario
- **TypeScript** - Superset tipado de JavaScript
- **CSS3** - Estilos con animaciones y efectos modernos
- **Fetch API** - Comunicación con el backend
- **Create React App** - Configuración y build del proyecto

## Estructura del Proyecto

```
frontend/
├── src/
│   ├── App.tsx          # Componente principal
│   ├── App.css          # Estilos de la aplicación
│   ├── App.test.tsx     # Tests unitarios
│   ├── index.tsx        # Punto de entrada
│   └── index.css        # Estilos globales
├── public/              # Archivos estáticos
├── package.json         # Dependencias y scripts
└── README.md           # Esta documentación
```

## Instalación

### Prerrequisitos

1. Node.js 18 o superior
2. npm como gestor de paquetes
3. Backend ejecutándose en http://localhost:3001

### Configuración

1. Instalar dependencias:
```bash
npm install
```

2. Verificar configuración del backend:
   - Asegurar que el backend esté corriendo
   - Confirmar URL en App.tsx: http://localhost:3001

## Ejecución

### Modo desarrollo
```bash
npm start
```

La aplicación se abrirá automáticamente en http://localhost:3000

### Otros comandos disponibles

```bash
# Ejecutar tests
npm test

# Crear build de producción
npm run build

# Analizar bundle
npm run eject
```

## Funcionalidades

### Formulario de Contacto
- Validación en tiempo real
- Campos obligatorios: nombre, email, mensaje
- Formato de email validado
- Estados de carga durante envío
- Mensajes de confirmación

### Lista de Contactos
- Visualización en tiempo real
- Ordenados por fecha de creación
- Información completa de cada contacto
- Diseño tipo tarjetas
- Responsive en dispositivos móviles

### Experiencia de Usuario
- Animaciones sutiles de entrada
- Efectos hover interactivos
- Feedback visual inmediato
- Estado de carga en formulario
- Mensajes de error y éxito

## Componentes

### App.tsx
Componente principal que maneja:
- Estado global de la aplicación
- Comunicación con el backend
- Renderizado de formulario y lista
- Manejo de errores

### Hooks utilizados
- `useState` - Estado de formulario y contactos
- `useEffect` - Carga inicial de datos

### Interfaces TypeScript
```typescript
interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}
```

## Estilos y Diseño

### Características del diseño
- Paleta en blanco y negro
- Efectos glassmorphism
- Animaciones CSS personalizadas
- Tipografía Inter para mejor legibilidad
- Sombras y gradientes sutiles

### Animaciones incluidas
- Entrada escalonada de elementos
- Efectos hover con transformaciones
- Transiciones suaves entre estados
- Loading spinner en botones
- Animaciones de aparición de tarjetas

### Responsive Design
- Mobile-first approach
- Breakpoints: 768px y 480px
- Grid adaptativo a una columna en móvil
- Elementos redimensionados apropiadamente

## Configuración de la API

### Endpoints utilizados

```typescript
// Obtener contactos
GET http://localhost:3001/api/contacts

// Crear contacto
POST http://localhost:3001/api/contacts
Content-Type: application/json
{
  "name": "string",
  "email": "string", 
  "message": "string"
}
```

### Manejo de errores
- Validación antes del envío
- Captura de errores de red
- Mensajes informativos al usuario
- Fallback en caso de falla del servidor

## Estados de la Aplicación

### Estados del formulario
- `formData` - Datos del formulario actual
- `loading` - Estado de envío
- `successMessage` - Mensaje de confirmación

### Estados de contactos
- `contacts` - Lista de contactos obtenidos
- Actualización automática tras envío exitoso

## Validaciones

### Cliente (Frontend)
- Campos requeridos verificados
- Formato de email validado con HTML5
- Longitud mínima implícita
- Sanitización de entrada

### Validaciones visuales
- Campos marcados como requeridos
- Estados disabled durante carga
- Feedback inmediato de errores

## Testing

### Tests incluidos
- Renderizado del componente principal
- Presencia de elementos del formulario
- Funcionamiento de la sección de contactos

### Ejecutar tests
```bash
npm test
```

### Coverage básico
- Componente App renderiza correctamente
- Formulario muestra campos necesarios
- Lista de contactos se inicializa

## Solución de Problemas

### La aplicación no carga
```
Error: Cannot connect to backend
```
**Solución:**
- Verificar que el backend esté corriendo en puerto 3001
- Confirmar conectividad de red
- Revisar configuración CORS en backend

### Error de CORS
```
Access to fetch blocked by CORS policy
```
**Solución:**
- Verificar configuración CORS en backend
- Confirmar URL correcta del backend

### Formulario no envía
```
Network error or validation failed
```
**Solución:**
- Completar todos los campos requeridos
- Verificar formato de email
- Comprobar conexión al backend

### Tests fallan
```
Test suite failed to run
```
**Solución:**
- Ejecutar `npm install` para dependencias
- Verificar archivos de test actualizados

## Performance

### Optimizaciones implementadas
- Componente único para simplicidad
- Fetch eficiente de datos
- CSS optimizado sin librerías externas
- Imágenes y assets minificados

### Métricas esperadas
- Tiempo de carga inicial: < 2 segundos
- Tiempo de respuesta formulario: < 1 segundo
- Peso del bundle: ~2MB (desarrollo)

## Configuración de Build

### Variables de entorno
Para producción, configurar:
```
REACT_APP_API_URL=https://backend.com
```

### Build de producción
```bash
npm run build
```

Genera carpeta `build/` optimizada para deploy.

## Deployment

### Opciones recomendadas
- **Netlify** - Deploy automático desde Git
- **Vercel** - Integración con React
- **GitHub Pages** - Para proyectos estáticos

### Configuración necesaria
- Actualizar URL del backend en producción
- Configurar variables de entorno
- Activar HTTPS

## Accesibilidad

### Características implementadas
- Labels asociados a inputs
- Navegación por teclado
- Contraste adecuado de colores
- Estados focus visibles
- Estructura semántica HTML

## Desarrollo Futuro

### Mejoras sugeridas
- Separación en componentes individuales
- Estado global con Context API
- Formulario con validación avanzada
- Paginación para muchos contactos
- Búsqueda y filtrado
- Modo oscuro/claro
- Internacionalización (i18n)
- PWA capabilities
- Tests de integración

### Refactoring recomendado
```
components/
├── ContactForm/
├── ContactList/
├── ContactCard/
└── common/
```

## Notas Técnicas

La aplicación utiliza un diseño de componente único para simplicidad del job sample. En desarrollo real se recomendaría separar responsabilidades en múltiples componentes para mejor mantenibilidad y reutilización.
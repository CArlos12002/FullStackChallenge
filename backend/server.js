// server.js - Servidor completo para el proyecto
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3001;

// Configurar PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Middlewares
app.use(cors());
app.use(express.json());

// Crear tabla si no existe
const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Base de datos inicializada');
  } catch (error) {
    console.error('❌ Error inicializando DB:', error.message);
  }
};

// RUTAS

// Ruta principal
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 Backend del Job Sample funcionando!',
    status: 'success',
    endpoints: [
      'GET /api/health - Verificar conexión DB',
      'GET /api/contacts - Obtener todos los contactos',
      'POST /api/contacts - Crear nuevo contacto'
    ]
  });
});

// Health check
app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW(), COUNT(*) as total_contacts FROM contacts');
    res.json({
      message: '✅ Sistema funcionando correctamente',
      database_connected: true,
      current_time: result.rows[0].now,
      total_contacts: result.rows[0].total_contacts
    });
  } catch (error) {
    res.status(500).json({
      message: '❌ Error de conexión',
      error: error.message
    });
  }
});

// Obtener todos los contactos
app.get('/api/contacts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Crear nuevo contacto
app.post('/api/contacts', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validaciones
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son obligatorios'
      });
    }

    if (!email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: 'Email inválido'
      });
    }

    // Insertar contacto
    const result = await pool.query(
      'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING *',
      [name, email, message]
    );

    res.status(201).json({
      success: true,
      message: 'Contacto creado exitosamente',
      data: result.rows[0]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Ruta para datos de ejemplo (para probar el frontend)
app.get('/api/demo', (req, res) => {
  res.json({
    success: true,
    message: 'Datos de demostración',
    sample_contact: {
      name: 'Juan Pérez',
      email: 'juan@example.com',
      message: 'Mensaje de prueba para el formulario de contacto'
    }
  });
});

// 404 para rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Ruta no encontrada',
    available_routes: ['/', '/api/health', '/api/contacts', '/api/demo']
  });
});

// Iniciar servidor
const startServer = async () => {
  try {
    await initDB();
    app.listen(PORT, () => {
      console.log(`🚀 Servidor funcionando en http://localhost:${PORT}`);
      console.log(`📊 Prueba: http://localhost:${PORT}/api/health`);
      console.log(`📝 Contactos: http://localhost:${PORT}/api/contacts`);
      console.log('🔥 ¡Backend listo para el frontend!');
    });
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

startServer();
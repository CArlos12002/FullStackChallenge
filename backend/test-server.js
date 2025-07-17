// test-server.js - Servidor mínimo para probar
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares básicos
app.use(cors());
app.use(express.json());

// Ruta simple de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 Servidor funcionando!',
    status: 'success'
  });
});

// Ruta de prueba para base de datos
app.get('/test-db', async (req, res) => {
  try {
    const { Pool } = require('pg');
    const pool = new Pool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });
    
    const result = await pool.query('SELECT NOW()');
    res.json({
      message: '✅ Base de datos conectada',
      time: result.rows[0].now
    });
  } catch (error) {
    res.status(500).json({
      message: '❌ Error de base de datos',
      error: error.message
    });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor de prueba en http://localhost:${PORT}`);
});
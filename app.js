const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Configuración de la conexión a PostgreSQL usando variables de entorno
const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'Gisela',
  password: process.env.DB_PASSWORD || 'secret',
  database: process.env.DB_NAME || 'tp5db',
  port: 5432,
});

app.get('/', async (req, res) => {
  try {
    const dbRes = await pool.query('SELECT NOW()');
    res.send(`<h1>Servidor Node.js + PostgreSQL funcionando</h1><p>Hora de la BD: ${dbRes.rows[0].now}</p>`);
  } catch (err) {
    res.status(500).send('Error al conectar con la base de datos: ' + err.message);
  }
});

app.listen(port, () => {
  console.log(`App escuchando en http://localhost:${port}`);
  // Intento de conexión inicial
  pool.query('SELECT NOW()')
    .then(() => console.log('Conectado a PostgreSQL con éxito'))
    .catch(err => console.error('Error de conexión a la base de datos:', err));
});
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// Ruta de la API
app.get('/api/', (req, res) => {
  res.json({ message: "API StrategyCom funcionando 😊" });
});

// Sirve los archivos estáticos de React desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para servir el archivo HTML principal de React
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

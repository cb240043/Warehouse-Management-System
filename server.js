require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Sambungkan route auth (sign up & login)
const authRoutes = require('./auth');
app.use('/auth', authRoutes);

// CRUD Product
const productRoutes = require('./products');
app.use('/products', productRoutes);

// RELAY Routes
const relayRoutes = require('./relay');
app.use('/relay', relayRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Warehouse API berjalan!' });
});

// Endpoint test sambungan MySQL
app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT COUNT(*) AS jumlah_produk FROM products');
    res.json({ status: 'berjaya', data: rows[0] });
  } catch (error) {
    res.status(500).json({ status: 'gagal', error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
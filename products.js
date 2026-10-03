const express = require('express');
const db = require('./db');

const router = express.Router();

// GET semua produk (dengan nama lokasi)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.id, p.sku, p.name, p.quantity, p.min_stock, l.code AS location
      FROM products p
      LEFT JOIN locations l ON p.location_id = l.id
    `);
    res.json({ status: 'berjaya', data: rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST tambah produk baru
router.post('/', async (req, res) => {
  try {
    const { sku, name, barcode, quantity, min_stock, location_id } = req.body;

    if (!sku || !name) {
      return res.status(400).json({ error: 'SKU dan nama produk diperlukan' });
    }

    await db.query(
      'INSERT INTO products (sku, name, barcode, quantity, min_stock, location_id) VALUES (?, ?, ?, ?, ?, ?)',
      [sku, name, barcode || null, quantity || 0, min_stock || 0, location_id || null]
    );

    res.json({ status: 'berjaya', message: 'Produk berjaya ditambah' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE buang produk (ikut id)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM products WHERE id = ?', [id]);
    res.json({ status: 'berjaya', message: 'Produk berjaya dibuang' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
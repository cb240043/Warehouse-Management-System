SELECT p.sku, p.name, p.quantity, l.code AS lokasi
FROM products p
JOIN locations l ON p.location_id = l.id;
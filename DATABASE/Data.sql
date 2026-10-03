INSERT INTO locations (code, zone, description) VALUES
('A-01', 'Zone A', 'Rak A bahagian 1'),
('A-02', 'Zone A', 'Rak A bahagian 2'),
('B-01', 'Zone B', 'Rak B bahagian 1');

INSERT INTO products (sku, name, barcode, quantity, min_stock, location_id) VALUES
('SKU-001', 'Kotak Kadbod Kecil', '8901234500011', 120, 30, 1),
('SKU-002', 'Pita Pelekat', '8901234500028', 45, 20, 1),
('SKU-003', 'Sarung Tangan', '8901234500035', 15, 25, 2);
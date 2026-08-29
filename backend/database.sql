CREATE DATABASE IF NOT EXISTS blend_brew
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE blend_brew;

CREATE TABLE IF NOT EXISTS categories (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  category_id INT UNSIGNED NOT NULL,
  name VARCHAR(150) NOT NULL UNIQUE,
  description TEXT NULL,
  image_url VARCHAR(1000) NULL,
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT fk_products_category
    FOREIGN KEY (category_id)
    REFERENCES categories(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS product_sizes (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  product_id INT UNSIGNED NOT NULL,
  label VARCHAR(50) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_product_sizes_product
    FOREIGN KEY (product_id)
    REFERENCES products(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

  CONSTRAINT unique_product_size UNIQUE (product_id, label)
);

INSERT INTO categories (name)
VALUES
  ('Hot Coffee'),
  ('Cold Brew'),
  ('Fresh Juices'),
  ('Smoothies'),
  ('Snacks & Pastries')
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO products (category_id, name, description, image_url)
VALUES
(
  (SELECT id FROM categories WHERE name = 'Hot Coffee'),
  'Signature Espresso',
  'Rich, bold single-origin espresso with a velvety crema.',
  'https://images.unsplash.com/photo-1502462041640-b3d7e50d0662?fm=jpg&q=80&w=800&auto=format&fit=crop'
),
(
  (SELECT id FROM categories WHERE name = 'Hot Coffee'),
  'Creamy Cappuccino',
  'Perfectly steamed microfoam atop smooth espresso.',
  'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?fm=jpg&q=80&w=800&auto=format&fit=crop'
),
(
  (SELECT id FROM categories WHERE name = 'Hot Coffee'),
  'Artisan Latte',
  'Silky espresso blended with steamed milk, latte art on top.',
  'https://images.unsplash.com/photo-1485808191679-5f86510681a2?fm=jpg&q=80&w=800&auto=format&fit=crop'
),
(
  (SELECT id FROM categories WHERE name = 'Hot Coffee'),
  'Classic Americano',
  'Espresso extended with hot water — clean and bold.',
  'https://images.unsplash.com/photo-1572286258217-40142c1c6a70?fm=jpg&q=80&w=800&auto=format&fit=crop'
),
(
  (SELECT id FROM categories WHERE name = 'Cold Brew'),
  'Iced Cold Brew',
  'Slow-steeped 18 hours for a smooth, bold flavor.',
  'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?fm=jpg&q=80&w=800&auto=format&fit=crop'
),
(
  (SELECT id FROM categories WHERE name = 'Cold Brew'),
  'Iced Vanilla Latte',
  'Espresso, cold milk, and a hint of vanilla over ice.',
  'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?fm=jpg&q=80&w=800&auto=format&fit=crop'
),
(
  (SELECT id FROM categories WHERE name = 'Fresh Juices'),
  'Orange Fresh Juice',
  'Freshly squeezed oranges, no added sugar.',
  'https://images.unsplash.com/photo-1600271886742-f049cd451bba?fm=jpg&q=80&w=800&auto=format&fit=crop'
),
(
  (SELECT id FROM categories WHERE name = 'Smoothies'),
  'Mango Smoothie',
  'Creamy mango blended with yogurt and honey.',
  'https://images.unsplash.com/photo-1553530666-ba11a7da3888?fm=jpg&q=80&w=800&auto=format&fit=crop'
),
(
  (SELECT id FROM categories WHERE name = 'Snacks & Pastries'),
  'Butter Croissant',
  'Flaky, buttery, baked fresh every morning.',
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?fm=jpg&q=80&w=800&auto=format&fit=crop'
),
(
  (SELECT id FROM categories WHERE name = 'Hot Coffee'),
  'Cinnamon Mocha',
  'Dark chocolate espresso with steamed milk and cinnamon.',
  'https://images.unsplash.com/photo-1616388761741-a5936c6f61f6?fm=jpg&q=80&w=800&auto=format&fit=crop'
)
ON DUPLICATE KEY UPDATE
  description = VALUES(description),
  image_url = VALUES(image_url);

INSERT INTO product_sizes (product_id, label, price)
VALUES
((SELECT id FROM products WHERE name = 'Signature Espresso'), 'Small', 3.00),
((SELECT id FROM products WHERE name = 'Signature Espresso'), 'Medium', 3.50),
((SELECT id FROM products WHERE name = 'Signature Espresso'), 'Large', 4.00),

((SELECT id FROM products WHERE name = 'Creamy Cappuccino'), 'Small', 4.00),
((SELECT id FROM products WHERE name = 'Creamy Cappuccino'), 'Medium', 4.50),
((SELECT id FROM products WHERE name = 'Creamy Cappuccino'), 'Large', 5.00),

((SELECT id FROM products WHERE name = 'Artisan Latte'), 'Small', 4.50),
((SELECT id FROM products WHERE name = 'Artisan Latte'), 'Medium', 5.00),
((SELECT id FROM products WHERE name = 'Artisan Latte'), 'Large', 5.50),

((SELECT id FROM products WHERE name = 'Classic Americano'), 'Small', 3.25),
((SELECT id FROM products WHERE name = 'Classic Americano'), 'Medium', 3.75),
((SELECT id FROM products WHERE name = 'Classic Americano'), 'Large', 4.25),

((SELECT id FROM products WHERE name = 'Iced Cold Brew'), 'Small', 3.75),
((SELECT id FROM products WHERE name = 'Iced Cold Brew'), 'Medium', 4.25),
((SELECT id FROM products WHERE name = 'Iced Cold Brew'), 'Large', 4.75),

((SELECT id FROM products WHERE name = 'Iced Vanilla Latte'), 'Small', 4.75),
((SELECT id FROM products WHERE name = 'Iced Vanilla Latte'), 'Medium', 5.25),
((SELECT id FROM products WHERE name = 'Iced Vanilla Latte'), 'Large', 5.75),

((SELECT id FROM products WHERE name = 'Orange Fresh Juice'), 'Small', 3.50),
((SELECT id FROM products WHERE name = 'Orange Fresh Juice'), 'Medium', 4.00),
((SELECT id FROM products WHERE name = 'Orange Fresh Juice'), 'Large', 4.50),

((SELECT id FROM products WHERE name = 'Mango Smoothie'), 'Small', 5.00),
((SELECT id FROM products WHERE name = 'Mango Smoothie'), 'Medium', 5.50),
((SELECT id FROM products WHERE name = 'Mango Smoothie'), 'Large', 6.00),

((SELECT id FROM products WHERE name = 'Butter Croissant'), 'Regular', 3.25),

((SELECT id FROM products WHERE name = 'Cinnamon Mocha'), 'Small', 4.75),
((SELECT id FROM products WHERE name = 'Cinnamon Mocha'), 'Medium', 5.25),
((SELECT id FROM products WHERE name = 'Cinnamon Mocha'), 'Large', 5.75)
ON DUPLICATE KEY UPDATE
  price = VALUES(price);

SELECT
  p.id,
  p.name,
  c.name AS category,
  ps.label AS size,
  ps.price
FROM products p
JOIN categories c ON c.id = p.category_id
JOIN product_sizes ps ON ps.product_id = p.id
ORDER BY p.id, ps.id;
USE blend_brew;

CREATE TABLE IF NOT EXISTS orders (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_number VARCHAR(40) NOT NULL UNIQUE,
  customer_name VARCHAR(120) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  order_type ENUM('PICKUP', 'DELIVERY') NOT NULL,
  delivery_address TEXT NULL,
  payment_method ENUM('CASH', 'CARD', 'JAZZCASH', 'EASYPAISA') NOT NULL,
  notes TEXT NULL,
  status ENUM(
    'PENDING',
    'CONFIRMED',
    'PREPARING',
    'READY',
    'OUT_FOR_DELIVERY',
    'COMPLETED',
    'CANCELLED'
  ) NOT NULL DEFAULT 'PENDING',
  subtotal DECIMAL(10, 2) NOT NULL,
  delivery_fee DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  total_amount DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  INDEX index_orders_status (status),
  INDEX index_orders_created_at (created_at)
);

CREATE TABLE IF NOT EXISTS order_items (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_id INT UNSIGNED NOT NULL,
  product_id INT UNSIGNED NOT NULL,
  size_id INT UNSIGNED NOT NULL,
  product_name VARCHAR(150) NOT NULL,
  size_label VARCHAR(50) NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  quantity INT UNSIGNED NOT NULL,
  line_total DECIMAL(10, 2) NOT NULL,

  CONSTRAINT fk_order_items_order
    FOREIGN KEY (order_id)
    REFERENCES orders(id)
    ON DELETE CASCADE,

  INDEX index_order_items_order_id (order_id)
);
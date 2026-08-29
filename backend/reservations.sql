USE blend_brew;

CREATE TABLE IF NOT EXISTS reservations (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  reservation_date DATE NOT NULL,
  reservation_time TIME NOT NULL,
  guests TINYINT UNSIGNED NOT NULL,
  special_request TEXT NULL,
  status ENUM('PENDING', 'CONFIRMED', 'SEATED', 'COMPLETED', 'CANCELLED')
    NOT NULL DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  INDEX index_reservation_date (reservation_date),
  INDEX index_reservation_status (status)
);
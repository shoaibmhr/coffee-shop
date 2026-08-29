import "dotenv/config";
import bcrypt from "bcryptjs";
import db from "../db.js";

const [name, email, phone, password] = process.argv.slice(2);

if (!name || !email || !phone || !password) {
  console.log(
    'Usage: node src/scripts/createAdmin.js "Admin Name" "admin@email.com" "03001234567" "YourPassword123"',
  );

  process.exit(1);
}

if (password.length < 8) {
  console.log("Admin password must be at least 8 characters.");
  process.exit(1);
}

try {
  const normalizedEmail = email.trim().toLowerCase();

  const [existingUsers] = await db.execute(
    "SELECT id FROM users WHERE email = ?",
    [normalizedEmail],
  );

  if (existingUsers.length > 0) {
    console.log("A user with this email already exists.");
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const [result] = await db.execute(
    `INSERT INTO users (name, email, phone, password_hash, role)
     VALUES (?, ?, ?, ?, 'ADMIN')`,
    [name.trim(), normalizedEmail, phone.trim(), passwordHash],
  );

  console.log("Admin created successfully.");
  console.log(`Admin ID: ${result.insertId}`);
  console.log(`Email: ${normalizedEmail}`);
} catch (error) {
  console.error("Could not create admin:", error.message);
} finally {
  await db.end();
}

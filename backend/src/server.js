import "dotenv/config";
import { createServer } from "node:http";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "./db.js";
import { handleOrderRoutes } from "./orders.js";
import { handleAdminAuthRoutes } from "./adminAuth.js";
import { handleAdminOrderRoutes } from "./adminOrders.js";
import { handleAdminReservationRoutes } from "./adminReservations.js";
import { handleAdminMessageRoutes } from "./adminMessages.js";

const port = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === "production";

function sendJson(res, statusCode, data, extraHeaders = {}) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:5173",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    ...extraHeaders,
  });

  res.end(JSON.stringify(data));
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;

      if (body.length > 1_000_000) {
        reject(new Error("Request body is too large"));
        req.destroy();
      }
    });

    req.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Invalid JSON request body"));
      }
    });

    req.on("error", reject);
  });
}

function parseCookies(req) {
  const cookies = {};
  const cookieHeader = req.headers.cookie;

  if (!cookieHeader) {
    return cookies;
  }

  for (const cookie of cookieHeader.split(";")) {
    const [name, ...valueParts] = cookie.trim().split("=");
    cookies[name] = decodeURIComponent(valueParts.join("="));
  }

  return cookies;
}

function createAuthToken(user) {
  return jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
}

function createAuthCookie(token, maxAgeSeconds) {
  const securePart = isProduction ? "; Secure" : "";

  return `auth_token=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${maxAgeSeconds}${securePart}`;
}

function isValidDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isValidTime(value) {
  return /^\d{2}:\d{2}$/.test(value);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function getLoggedInUser(req) {
  const cookies = parseCookies(req);
  const token = cookies.auth_token;

  if (!token) {
    return null;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const [users] = await db.execute(
      `SELECT id, name, email, phone, role, created_at AS createdAt
       FROM users
       WHERE id = ?`,
      [payload.userId],
    );

    return users[0] || null;
  } catch {
    return null;
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "http://localhost:5173",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    });
    

    return res.end();
  }
    if (await handleAdminAuthRoutes(req, res, url)) {
      return;
    }
  

  if (req.method === "GET" && url.pathname === "/") {
    return sendJson(res, 200, {
      message: "Coffee shop backend is running",
      healthCheck: "/api/health",
    });
  }

  if (req.method === "GET" && url.pathname === "/api/health") {
    return sendJson(res, 200, {
      message: "API is running",
    });
  }

  if (req.method === "GET" && url.pathname === "/api/database-check") {
    try {
      const [rows] = await db.query(
        "SELECT DATABASE() AS databaseName, NOW() AS serverTime",
      );

      return sendJson(res, 200, {
        message: "MySQL database connected successfully",
        database: rows[0].databaseName,
        serverTime: rows[0].serverTime,
      });
    } catch (error) {
      return sendJson(res, 500, {
        message: "Could not connect to MySQL database",
        error: error.message,
      });
    }
  }

  if (req.method === "POST" && url.pathname === "/api/auth/signup") {
    try {
      const body = await readJsonBody(req);

      const name = body.name?.trim();
      const email = body.email?.trim().toLowerCase();
      const phone = body.phone?.trim();
      const password = body.password;

      if (!name || !email || !phone || !password) {
        return sendJson(res, 400, {
          message: "Please fill all required fields",
        });
      }

      if (!isValidEmail(email)) {
        return sendJson(res, 400, {
          message: "Please provide a valid email address",
        });
      }

      if (name.length > 120 || phone.length > 30) {
        return sendJson(res, 400, {
          message: "One or more fields are too long",
        });
      }

      if (password.length < 8) {
        return sendJson(res, 400, {
          message: "Password must be at least 8 characters",
        });
      }

      const [existingUsers] = await db.execute(
        "SELECT id FROM users WHERE email = ?",
        [email],
      );

      if (existingUsers.length > 0) {
        return sendJson(res, 409, {
          message: "An account with this email already exists",
        });
      }

      const passwordHash = await bcrypt.hash(password, 12);

      const [result] = await db.execute(
        `INSERT INTO users (name, email, phone, password_hash, role)
         VALUES (?, ?, ?, ?, 'CUSTOMER')`,
        [name, email, phone, passwordHash],
      );

      const user = {
        id: result.insertId,
        name,
        email,
        phone,
        role: "CUSTOMER",
      };

      const token = createAuthToken(user);

      return sendJson(
        res,
        201,
        {
          message: "Account created successfully",
          user,
        },
        {
          "Set-Cookie": createAuthCookie(token, 60 * 60 * 24 * 7),
        },
      );
    } catch (error) {
      console.error("Signup error:", error.message);

      return sendJson(res, 500, {
        message: "Could not create account. Please try again.",
      });
    }
  }

  if (req.method === "POST" && url.pathname === "/api/auth/login") {
    try {
      const body = await readJsonBody(req);

      const email = body.email?.trim().toLowerCase();
      const password = body.password;
      const remember = Boolean(body.remember);

      if (!email || !password) {
        return sendJson(res, 400, {
          message: "Email and password are required",
        });
      }

      const [users] = await db.execute(
        `SELECT id, name, email, phone, password_hash, role
         FROM users
         WHERE email = ?`,
        [email],
      );

      const user = users[0];

      if (!user) {
        return sendJson(res, 401, {
          message: "Invalid email or password",
        });
      }

      const passwordMatches = await bcrypt.compare(
        password,
        user.password_hash,
      );

      if (!passwordMatches) {
        return sendJson(res, 401, {
          message: "Invalid email or password",
        });
      }

      const safeUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      };

      const maxAgeSeconds = remember ? 60 * 60 * 24 * 7 : 60 * 60 * 24;

      const token = createAuthToken(safeUser);

      return sendJson(
        res,
        200,
        {
          message: "Logged in successfully",
          user: safeUser,
        },
        {
          "Set-Cookie": createAuthCookie(token, maxAgeSeconds),
        },
      );
    } catch (error) {
      console.error("Login error:", error.message);

      return sendJson(res, 500, {
        message: "Could not log in. Please try again.",
      });
    }
  }

  if (req.method === "POST" && url.pathname === "/api/auth/logout") {
    const securePart = isProduction ? "; Secure" : "";

    return sendJson(
      res,
      200,
      {
        message: "Logged out successfully",
      },
      {
        "Set-Cookie": `auth_token=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0${securePart}`,
      },
    );
  }

  if (req.method === "GET" && url.pathname === "/api/auth/me") {
    const user = await getLoggedInUser(req);

    if (!user) {
      return sendJson(res, 401, {
        message: "You are not logged in",
      });
    }

    return sendJson(res, 200, {
      user,
    });
  }

  if (req.method === "GET" && url.pathname === "/api/categories") {
    try {
      const [categories] = await db.query(
        "SELECT id, name FROM categories ORDER BY name ASC",
      );

      return sendJson(res, 200, {
        message: "Categories fetched successfully",
        categories,
      });
    } catch {
      return sendJson(res, 500, {
        message: "Could not fetch categories",
      });
    }
  }

  if (req.method === "GET" && url.pathname === "/api/products") {
    try {
      const category = url.searchParams.get("category");

      let sql = `
        SELECT
          p.id AS productId,
          p.name AS productName,
          p.description,
          p.image_url AS imageUrl,
          p.is_available AS isAvailable,
          c.name AS categoryName,
          ps.id AS sizeId,
          ps.label AS sizeLabel,
          ps.price
        FROM products p
        INNER JOIN categories c ON c.id = p.category_id
        INNER JOIN product_sizes ps ON ps.product_id = p.id
        WHERE p.is_available = TRUE
      `;

      const values = [];

      if (category && category !== "All") {
        sql += " AND c.name = ?";
        values.push(category);
      }

      sql += " ORDER BY p.id ASC, ps.id ASC";

      const [rows] = await db.execute(sql, values);
      const productsMap = new Map();

      for (const row of rows) {
        if (!productsMap.has(row.productId)) {
          productsMap.set(row.productId, {
            id: row.productId,
            name: row.productName,
            category: row.categoryName,
            description: row.description,
            image: row.imageUrl,
            isAvailable: Boolean(row.isAvailable),
            sizes: [],
          });
        }

        productsMap.get(row.productId).sizes.push({
          id: row.sizeId,
          label: row.sizeLabel,
          price: Number(row.price),
        });
      }

      return sendJson(res, 200, {
        message: "Products fetched successfully",
        products: Array.from(productsMap.values()),
      });
    } catch {
      return sendJson(res, 500, {
        message: "Could not fetch products",
      });
    }
  }

  if (req.method === "POST" && url.pathname === "/api/reservations") {
    try {
      const body = await readJsonBody(req);

      const name = body.name?.trim();
      const email = body.email?.trim().toLowerCase();
      const phone = body.phone?.trim();
      const date = body.date;
      const time = body.time;
      const guests = Number(body.guests);
      const request = body.request?.trim() || null;

      if (!name || !email || !phone || !date || !time || !guests) {
        return sendJson(res, 400, {
          message: "Please fill all required reservation fields",
        });
      }

      if (!isValidEmail(email)) {
        return sendJson(res, 400, {
          message: "Please provide a valid email address",
        });
      }

      if (!isValidDate(date) || !isValidTime(time)) {
        return sendJson(res, 400, {
          message: "Please provide a valid date and time",
        });
      }

      if (!Number.isInteger(guests) || guests < 1 || guests > 12) {
        return sendJson(res, 400, {
          message: "Guests must be between 1 and 12",
        });
      }

      const [result] = await db.execute(
        `INSERT INTO reservations
          (name, email, phone, reservation_date, reservation_time, guests, special_request)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, email, phone, date, time, guests, request],
      );

      return sendJson(res, 201, {
        message: "Reservation requested successfully",
        reservation: {
          id: result.insertId,
          status: "PENDING",
        },
      });
    } catch {
      return sendJson(res, 500, {
        message: "Could not create reservation. Please try again.",
      });
    }
  }

  if (req.method === "POST" && url.pathname === "/api/contact") {
    try {
      const body = await readJsonBody(req);

      const name = body.name?.trim();
      const email = body.email?.trim().toLowerCase();
      const phone = body.phone?.trim() || null;
      const subject = body.subject?.trim();
      const message = body.message?.trim();

      if (!name || !email || !subject || !message) {
        return sendJson(res, 400, {
          message: "Please fill all required contact form fields",
        });
      }

      if (!isValidEmail(email)) {
        return sendJson(res, 400, {
          message: "Please provide a valid email address",
        });
      }

      const [result] = await db.execute(
        `INSERT INTO contact_messages (name, email, phone, subject, message)
         VALUES (?, ?, ?, ?, ?)`,
        [name, email, phone, subject, message],
      );

      return sendJson(res, 201, {
        message: "Your message has been sent successfully",
        contactMessage: {
          id: result.insertId,
        },
      });
    } catch (error) {
      console.error("Contact form error:", error.message);

      return sendJson(res, 500, {
        message: "Could not send your message. Please try again.",
      });
    }
  }
    if (await handleOrderRoutes(req, res, url)) {
      return;
    }
      if (await handleAdminOrderRoutes(req, res, url)) {
        return;
      }
        if (await handleAdminReservationRoutes(req, res, url)) {
          return;
        }
          if (await handleAdminMessageRoutes(req, res, url)) {
            return;
          }
  return sendJson(res, 404, {
    message: "Route not found",
    path: url.pathname,
  });

});

server.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});

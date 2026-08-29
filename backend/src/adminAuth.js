import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "./db.js";

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
    });

    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("Invalid JSON request body"));
      }
    });

    req.on("error", reject);
  });
}

function createAdminCookie(token, maxAgeSeconds) {
  const securePart = isProduction ? "; Secure" : "";

  return `auth_token=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${maxAgeSeconds}${securePart}`;
}

export async function handleAdminAuthRoutes(req, res, url) {
  if (req.method !== "POST" || url.pathname !== "/api/admin/auth/login") {
    return false;
  }

  try {
    const body = await readJsonBody(req);

    const email = body.email?.trim().toLowerCase();
    const password = body.password;
    const remember = Boolean(body.remember);

    if (!email || !password) {
      sendJson(res, 400, {
        message: "Email and password are required",
      });

      return true;
    }

    const [users] = await db.execute(
      `SELECT id, name, email, phone, password_hash, role
       FROM users
       WHERE email = ?`,
      [email],
    );

    const user = users[0];

    if (!user) {
      sendJson(res, 401, {
        message: "Invalid email or password",
      });

      return true;
    }

    const passwordMatches = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatches) {
      sendJson(res, 401, {
        message: "Invalid email or password",
      });

      return true;
    }

    if (user.role !== "ADMIN" && user.role !== "STAFF") {
      sendJson(res, 403, {
        message: "You do not have permission to access the admin panel",
      });

      return true;
    }

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    };

    const token = jwt.sign(
      {
        userId: safeUser.id,
        role: safeUser.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    const maxAgeSeconds = remember ? 60 * 60 * 24 * 7 : 60 * 60 * 24;

    sendJson(
      res,
      200,
      {
        message: "Admin login successful",
        user: safeUser,
      },
      {
        "Set-Cookie": createAdminCookie(token, maxAgeSeconds),
      },
    );

    return true;
  } catch (error) {
    console.error("Admin login error:", error.message);

    sendJson(res, 500, {
      message: "Could not log in. Please try again.",
    });

    return true;
  }
}

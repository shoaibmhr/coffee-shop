import jwt from "jsonwebtoken";
import db from "./db.js";

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:5173",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });

  res.end(JSON.stringify(data));
}

function parseCookies(req) {
  const cookies = {};

  for (const cookie of (req.headers.cookie || "").split(";")) {
    const [name, ...valueParts] = cookie.trim().split("=");

    if (name) {
      cookies[name] = decodeURIComponent(valueParts.join("="));
    }
  }

  return cookies;
}

async function isAdminOrStaff(req) {
  try {
    const token = parseCookies(req).auth_token;

    if (!token) return false;

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const [users] = await db.execute("SELECT role FROM users WHERE id = ?", [
      payload.userId,
    ]);

    return ["ADMIN", "STAFF"].includes(users[0]?.role);
  } catch {
    return false;
  }
}

export async function handleAdminMessageRoutes(req, res, url) {
  const listRoute =
    req.method === "GET" && url.pathname === "/api/admin/messages";

  const readRoute = url.pathname.match(/^\/api\/admin\/messages\/(\d+)\/read$/);

  const deleteRoute = url.pathname.match(/^\/api\/admin\/messages\/(\d+)$/);

  if (
    !listRoute &&
    !(req.method === "PATCH" && readRoute) &&
    !(req.method === "DELETE" && deleteRoute)
  ) {
    return false;
  }

  if (!(await isAdminOrStaff(req))) {
    sendJson(res, 403, {
      message: "Admin access is required",
    });

    return true;
  }

  try {
    if (listRoute) {
      const [messages] = await db.query(
        `SELECT
          id,
          name,
          email,
          phone,
          subject,
          message,
          is_read,
          created_at
        FROM contact_messages
        ORDER BY created_at DESC`,
      );

      sendJson(res, 200, {
        messages: messages.map((message) => ({
          id: message.id,
          name: message.name,
          email: message.email,
          phone: message.phone || "",
          subject: message.subject,
          message: message.message,
          submittedDate: new Date(message.created_at).toISOString(),
          status: message.is_read ? "Read" : "New",
        })),
      });

      return true;
    }

    if (req.method === "PATCH" && readRoute) {
      const id = Number(readRoute[1]);

      await db.execute(
        "UPDATE contact_messages SET is_read = TRUE WHERE id = ?",
        [id],
      );

      sendJson(res, 200, {
        message: "Message marked as read",
      });

      return true;
    }

    if (req.method === "DELETE" && deleteRoute) {
      const id = Number(deleteRoute[1]);

      const [result] = await db.execute(
        "DELETE FROM contact_messages WHERE id = ?",
        [id],
      );

      if (result.affectedRows === 0) {
        sendJson(res, 404, {
          message: "Message not found",
        });

        return true;
      }

      sendJson(res, 200, {
        message: "Message deleted successfully",
      });

      return true;
    }
  } catch (error) {
    console.error("Admin messages error:", error.message);

    sendJson(res, 500, {
      message: "Could not process message request",
    });

    return true;
  }

  return false;
}

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

function formatReservation(reservation) {
  const date = new Date(reservation.reservation_date);

  return {
    id: `RSV-${reservation.id}`,
    databaseId: reservation.id,
    customerName: reservation.name,
    phone: reservation.phone,
    email: reservation.email,
    date: new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "Asia/Karachi",
    }).format(date),
    dateKey: reservation.reservation_date.toISOString().slice(0, 10),
    time: new Date(
      `1970-01-01T${reservation.reservation_time}`,
    ).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "Asia/Karachi",
    }),
    partySize: reservation.guests,
    status:
      reservation.status.charAt(0) + reservation.status.slice(1).toLowerCase(),
    specialRequests: reservation.special_request || "",
  };
}

export async function handleAdminReservationRoutes(req, res, url) {
  const isListRoute =
    req.method === "GET" && url.pathname === "/api/admin/reservations";

  const statusMatch = url.pathname.match(
    /^\/api\/admin\/reservations\/(\d+)\/status$/,
  );

  const isStatusRoute = req.method === "PATCH" && statusMatch;

  if (!isListRoute && !isStatusRoute) {
    return false;
  }

  if (!(await isAdminOrStaff(req))) {
    sendJson(res, 403, {
      message: "Admin access is required",
    });

    return true;
  }

  try {
    if (isListRoute) {
      const [reservations] = await db.query(
        `SELECT
          id,
          name,
          email,
          phone,
          reservation_date,
          reservation_time,
          guests,
          special_request,
          status
        FROM reservations
        ORDER BY reservation_date ASC, reservation_time ASC`,
      );

      sendJson(res, 200, {
        message: "Reservations fetched successfully",
        reservations: reservations.map(formatReservation),
      });

      return true;
    }

    const body = await readJsonBody(req);
    const allowedStatuses = ["Pending", "Confirmed", "Cancelled"];

    if (!allowedStatuses.includes(body.status)) {
      sendJson(res, 400, {
        message: "Invalid reservation status",
      });

      return true;
    }

    const databaseId = Number(statusMatch[1]);

    const [result] = await db.execute(
      "UPDATE reservations SET status = ? WHERE id = ?",
      [body.status.toUpperCase(), databaseId],
    );

    if (result.affectedRows === 0) {
      sendJson(res, 404, {
        message: "Reservation not found",
      });

      return true;
    }

    sendJson(res, 200, {
      message: "Reservation status updated successfully",
      status: body.status,
    });

    return true;
  } catch (error) {
    console.error("Admin reservations error:", error.message);

    sendJson(res, 500, {
      message: "Could not process reservation request",
    });

    return true;
  }
}

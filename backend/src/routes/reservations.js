import db from "../db.js";
import { readJsonBody, sendJson } from "../utils/http.js";

function isValidDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isValidTime(value) {
  return /^\d{2}:\d{2}$/.test(value);
}

export async function handleReservationRoutes(req, res, url) {
  if (req.method !== "POST" || url.pathname !== "/api/reservations") {
    return false;
  }

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
      sendJson(res, 400, {
        message: "Please fill all required reservation fields",
      });

      return true;
    }

    if (!isValidDate(date) || !isValidTime(time)) {
      sendJson(res, 400, {
        message: "Please provide a valid date and time",
      });

      return true;
    }

    if (!Number.isInteger(guests) || guests < 1 || guests > 12) {
      sendJson(res, 400, {
        message: "Guests must be between 1 and 12",
      });

      return true;
    }

    const selectedDateTime = new Date(`${date}T${time}:00`);

    if (
      Number.isNaN(selectedDateTime.getTime()) ||
      selectedDateTime < new Date()
    ) {
      sendJson(res, 400, {
        message: "Reservation date and time must be in the future",
      });

      return true;
    }

    const [result] = await db.execute(
      `INSERT INTO reservations
        (name, email, phone, reservation_date, reservation_time, guests, special_request)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, email, phone, date, time, guests, request],
    );

    sendJson(res, 201, {
      message: "Reservation requested successfully",
      reservation: {
        id: result.insertId,
        status: "PENDING",
      },
    });

    return true;
  } catch (error) {
    console.error("Reservation error:", error.message);

    if (error.message === "Invalid JSON request body") {
      sendJson(res, 400, {
        message: "Invalid request data",
      });

      return true;
    }

    sendJson(res, 500, {
      message: "Could not create reservation. Please try again.",
    });

    return true;
  }
}

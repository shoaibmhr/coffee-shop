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

async function isAdminOrStaff(req) {
  try {
    const cookies = parseCookies(req);
    const token = cookies.auth_token;

    if (!token) {
      return false;
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const [users] = await db.execute("SELECT role FROM users WHERE id = ?", [
      payload.userId,
    ]);

    const user = users[0];

    return user?.role === "ADMIN" || user?.role === "STAFF";
  } catch {
    return false;
  }
}

function formatOrder(order, items) {
  const statusMap = {
    PENDING: "Pending",
    CONFIRMED: "Pending",
    PREPARING: "Preparing",
    READY: "Ready",
    OUT_FOR_DELIVERY: "Ready",
    COMPLETED: "Delivered",
    CANCELLED: "Cancelled",
  };

  const paymentMap = {
    CASH: "Cash",
    CARD: "Card",
    JAZZCASH: "JazzCash",
    EASYPAISA: "Easypaisa",
  };

  return {
    id: order.order_number,
    customer: order.customer_name,
    phone: order.phone,
    email: order.email,
    orderType: order.order_type === "DELIVERY" ? "Delivery" : "Pickup",
    address: order.delivery_address,
    items: items.map((item) => ({
      name: item.product_name,
      size: item.size_label,
      qty: item.quantity,
      price: Number(item.unit_price),
    })),
    total: Number(order.total_amount),
    status: statusMap[order.status] || "Pending",
    payment: paymentMap[order.payment_method] || order.payment_method,
    date: new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "Asia/Karachi",
    }).format(new Date(order.created_at)),
    time: new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "Asia/Karachi",
    }).format(new Date(order.created_at)),
  };
}

export async function handleAdminOrderRoutes(req, res, url) {
  if (req.method !== "GET" && req.method !== "PATCH") {
    return false;
  }

  const isOrderListRoute =
    req.method === "GET" && url.pathname === "/api/admin/orders";

  const statusRouteMatch = url.pathname.match(
    /^\/api\/admin\/orders\/([^/]+)\/status$/,
  );

  const isOrderStatusRoute = req.method === "PATCH" && statusRouteMatch;

  if (!isOrderListRoute && !isOrderStatusRoute) {
    return false;
  }

  if (!(await isAdminOrStaff(req))) {
    sendJson(res, 403, {
      message: "Admin access is required",
    });

    return true;
  }

  try {
    if (isOrderListRoute) {
      const [orders] = await db.query(
        `SELECT
          id,
          order_number,
          customer_name,
          email,
          phone,
          order_type,
          delivery_address,
          payment_method,
          status,
          total_amount,
          created_at
        FROM orders
        ORDER BY created_at DESC`,
      );

      const formattedOrders = await Promise.all(
        orders.map(async (order) => {
          const [items] = await db.execute(
            `SELECT product_name, size_label, unit_price, quantity
             FROM order_items
             WHERE order_id = ?
             ORDER BY id ASC`,
            [order.id],
          );

          return formatOrder(order, items);
        }),
      );

      sendJson(res, 200, {
        message: "Orders fetched successfully",
        orders: formattedOrders,
      });

      return true;
    }

    const orderNumber = decodeURIComponent(statusRouteMatch[1]);
    const body = await readJsonBody(req);

    const statusMap = {
      Pending: "PENDING",
      Preparing: "PREPARING",
      Ready: "READY",
      Delivered: "COMPLETED",
      Cancelled: "CANCELLED",
    };

    const databaseStatus = statusMap[body.status];

    if (!databaseStatus) {
      sendJson(res, 400, {
        message: "Invalid order status",
      });

      return true;
    }

    const [result] = await db.execute(
      "UPDATE orders SET status = ? WHERE order_number = ?",
      [databaseStatus, orderNumber],
    );

    if (result.affectedRows === 0) {
      sendJson(res, 404, {
        message: "Order not found",
      });

      return true;
    }

    sendJson(res, 200, {
      message: "Order status updated successfully",
      status: body.status,
    });

    return true;
  } catch (error) {
    console.error("Admin orders error:", error.message);

    sendJson(res, 500, {
      message: "Could not process admin order request",
    });

    return true;
  }
}

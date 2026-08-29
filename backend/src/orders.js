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

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function createOrderNumber() {
  return `BB-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;
}

export async function handleOrderRoutes(req, res, url) {
  if (req.method !== "POST" || url.pathname !== "/api/orders") {
    return false;
  }

  let connection;

  try {
    const body = await readJsonBody(req);

    const customerName = body.customerName?.trim();
    const email = body.email?.trim().toLowerCase();
    const phone = body.phone?.trim();
    const orderType = body.orderType;
    const address = body.address?.trim() || null;
    const paymentMethod = body.paymentMethod;
    const notes = body.notes?.trim() || null;
    const items = body.items;

    const allowedOrderTypes = ["pickup", "delivery"];
    const allowedPayments = ["cash", "card", "jazzcash", "easypaisa"];

    if (
      !customerName ||
      !email ||
      !phone ||
      !orderType ||
      !paymentMethod ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      sendJson(res, 400, {
        message: "Please fill all required checkout fields",
      });
      return true;
    }

    if (!isValidEmail(email)) {
      sendJson(res, 400, {
        message: "Please provide a valid email address",
      });
      return true;
    }

    if (!allowedOrderTypes.includes(orderType)) {
      sendJson(res, 400, {
        message: "Invalid order type",
      });
      return true;
    }

    if (!allowedPayments.includes(paymentMethod)) {
      sendJson(res, 400, {
        message: "Invalid payment method",
      });
      return true;
    }

    if (orderType === "delivery" && !address) {
      sendJson(res, 400, {
        message: "Delivery address is required",
      });
      return true;
    }

    if (items.length > 30) {
      sendJson(res, 400, {
        message: "Too many items in one order",
      });
      return true;
    }

    connection = await db.getConnection();
    await connection.beginTransaction();

    const verifiedItems = [];
    let subtotal = 0;

    for (const item of items) {
      const productId = Number(item.productId);
      const sizeId = Number(item.sizeId);
      const quantity = Number(item.quantity);

      if (
        !Number.isInteger(productId) ||
        !Number.isInteger(sizeId) ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 20
      ) {
        throw new Error("Invalid item in order");
      }

      const [productRows] = await connection.execute(
        `SELECT
          p.id AS productId,
          p.name AS productName,
          ps.id AS sizeId,
          ps.label AS sizeLabel,
          ps.price
        FROM products p
        INNER JOIN product_sizes ps ON ps.product_id = p.id
        WHERE p.id = ?
          AND ps.id = ?
          AND p.is_available = TRUE`,
        [productId, sizeId],
      );

      const product = productRows[0];

      if (!product) {
        throw new Error("One or more products are unavailable");
      }

      const unitPrice = Number(product.price);
      const lineTotal = unitPrice * quantity;

      subtotal += lineTotal;

      verifiedItems.push({
        productId: product.productId,
        sizeId: product.sizeId,
        productName: product.productName,
        sizeLabel: product.sizeLabel,
        unitPrice,
        quantity,
        lineTotal,
      });
    }

    const deliveryFee = orderType === "delivery" ? 2.5 : 0;
    const totalAmount = subtotal + deliveryFee;
    const orderNumber = createOrderNumber();

    const [orderResult] = await connection.execute(
      `INSERT INTO orders (
        order_number,
        customer_name,
        email,
        phone,
        order_type,
        delivery_address,
        payment_method,
        notes,
        subtotal,
        delivery_fee,
        total_amount
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        orderNumber,
        customerName,
        email,
        phone,
        orderType.toUpperCase(),
        address,
        paymentMethod.toUpperCase(),
        notes,
        subtotal,
        deliveryFee,
        totalAmount,
      ],
    );

    for (const item of verifiedItems) {
      await connection.execute(
        `INSERT INTO order_items (
          order_id,
          product_id,
          size_id,
          product_name,
          size_label,
          unit_price,
          quantity,
          line_total
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          orderResult.insertId,
          item.productId,
          item.sizeId,
          item.productName,
          item.sizeLabel,
          item.unitPrice,
          item.quantity,
          item.lineTotal,
        ],
      );
    }

    await connection.commit();

    sendJson(res, 201, {
      message: "Order created successfully",
      order: {
        id: orderResult.insertId,
        orderNumber,
        orderType,
        status: "PENDING",
        totalAmount,
      },
    });

    return true;
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }

    console.error("Order creation error:", error.message);

    sendJson(res, 400, {
      message: error.message || "Could not create order",
    });

    return true;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

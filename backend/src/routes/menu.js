import db from "../db.js";
import { sendJson } from "../utils/http.js";

export async function handleMenuRoutes(req, res, url) {
  if (req.method === "GET" && url.pathname === "/api/categories") {
    try {
      const [categories] = await db.query(
        "SELECT id, name FROM categories ORDER BY name ASC",
      );

      sendJson(res, 200, {
        message: "Categories fetched successfully",
        categories,
      });

      return true;
    } catch (error) {
      console.error("Categories error:", error.message);

      sendJson(res, 500, {
        message: "Could not fetch categories",
      });

      return true;
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
          c.id AS categoryId,
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

      sendJson(res, 200, {
        message: "Products fetched successfully",
        products: Array.from(productsMap.values()),
      });

      return true;
    } catch (error) {
      console.error("Products error:", error.message);

      sendJson(res, 500, {
        message: "Could not fetch products",
      });

      return true;
    }
  }

  return false;
}

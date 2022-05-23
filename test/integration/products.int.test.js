const request = require("supertest");
const app = require("../../server");
const newProduct = require("../data/new-product.json");

it("POST / api / products", async () => {
  const response = await request(app).post("/api/products").send(newProduct);

  expect(response.statusCode).toBe(201);
  expect(response.body.name).toBe(newProduct.name);
  expect(response.body.description).toBe(newProduct.description);
});

it("should return 500 on POST /api/products", async () => {
  const response = await request(app)
    .post("/api/products")
    .send({ name: " s" });

  expect(response.statusCode).toBe(500);

  expect(response.body).toStrictEqual({
    message:
      "Product validation failed: description: Path `description` is required.",
  });
});

let firstProduct;
it("GET /api/products", async () => {
  const response = await request(app).get("/api/products");
  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body)).toBeTruthy();
  expect(response.body[0].name).toBeDefined();
  expect(response.body[0].description).toBeDefined();
  firstProduct = response.body[0];
});

it("GET /api/product/:productId", async () => {
  const response = await request(app).get(`/api/products/${firstProduct._id}`);
  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe(firstProduct.name);
  expect(response.body.description).toBe(firstProduct.description);
});

it("GET id doesn't exist /api/product/:productId", async () => {
  const response = await request(app).get(
    `/api/products/628b5abea28f5406fe11fd33`
  );
  expect(response.statusCode).toBe(404);
});

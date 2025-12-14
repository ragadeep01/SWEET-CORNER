import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";

import User from "../models/user.js";
import Sweet from "../models/sweets.js";

let adminCookie;
let adminUser;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_TEST_URI);


  // Hash password for admin user
  const bcrypt = await import('bcryptjs');
  const salt = await bcrypt.default.genSalt(10);
  const hashedPassword = await bcrypt.default.hash("password123", salt);
  adminUser = await User.create({
    name: "Admin",
    email: "admin@test.com",
    password: hashedPassword,
    role: "Seller", // 🔴 IMPORTANT: matches isAdmin middleware
  });

  // Login admin
  const loginRes = await request(app)
    .post("/api/auth/login")
    .send({
      email: "admin@test.com",
      password: "password123",
    });

  // Ensure adminCookie is always a string for supertest
  const setCookie = loginRes.headers["set-cookie"];
  adminCookie = Array.isArray(setCookie) ? setCookie[0] : setCookie;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Sweet.deleteMany({});
});

describe("SWEET MANAGEMENT (ADMIN)", () => {

  it("should create a sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Cookie", adminCookie)
      .send({
        name: "Laddu",
        category: "Traditional",
        price: 100,
        quantity: 10,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Laddu");
    expect(res.body.sellerId).toBe(adminUser._id.toString());
  });

  it("should get admin's sweets", async () => {
    await Sweet.create({
      name: "Barfi",
      category: "Milk",
      price: 200,
      quantity: 5,
      sellerId: adminUser._id,
    });

    const res = await request(app)
      .get("/api/mysweets")
      .set("Cookie", adminCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  it("should update a sweet", async () => {
    const sweet = await Sweet.create({
      name: "Halwa",
      category: "Traditional",
      price: 150,
      quantity: 5,
      sellerId: adminUser._id,
    });

    const res = await request(app)
      .put(`/api/sweets/${sweet._id}`)
      .set("Cookie", adminCookie)
      .send({ price: 180 });

    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(180);
  });

  it("should delete a sweet", async () => {
    const sweet = await Sweet.create({
      name: "Peda",
      category: "Milk",
      price: 250,
      quantity: 5,
      sellerId: adminUser._id,
    });

    const res = await request(app)
      .delete(`/api/sweets/${sweet._id}`)
      .set("Cookie", adminCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Sweet deleted successfully");
  });

  it("should get all sweets", async () => {
    await Sweet.create({
      name: "Rasgulla",
      category: "Milk",
      price: 120,
      quantity: 10,
      sellerId: adminUser._id,
    });

    const res = await request(app)
      .get("/api/sweets")
      .set("Cookie", adminCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

});

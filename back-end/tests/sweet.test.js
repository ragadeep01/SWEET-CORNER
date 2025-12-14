import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import User from "../models/user.js";
import Sweet from "../models/sweets.js"; 

let cookie;
let sweetId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_TEST_URI);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

beforeEach(async () => {
  await User.deleteMany({});
  await Sweet.deleteMany({});

  
  await request(app).post("/api/auth/signup").send({
    name: "Admin",
    email: "admin@test.com",
    password: "password123",
    role: "admin",
  });

  const loginRes = await request(app).post("/api/auth/login").send({
    email: "admin@test.com",
    password: "password123",
  });

  cookie = loginRes.headers["set-cookie"];
});

describe("SWEET MANAGEMENT (ADMIN)", () => {


  it("should create a sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Cookie", cookie)
      .field("name", "Ladoo")
      .field("category", "Traditional")
      .field("price", 200)
      .field("quantity", 10);

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Ladoo");

    sweetId = res.body._id;
  });


  it("should get admin's sweets", async () => {
    const res = await request(app)
      .get("/api/mysweets")
      .set("Cookie", cookie);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });


  it("should update a sweet", async () => {
    const sweet = await Sweet.create({
      name: "Jalebi",
      category: "Traditional",
      price: 150,
      quantity: 5,
      sellerId: (await User.findOne())._id,
    });
    const res = await request(app)
      .put(`/api/sweets/${sweet._id}`)
      .set("Cookie", cookie)
      .send({ price: 180 });

    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(180);
  });

  // ---------- DELETE SWEET ----------
  it("should delete a sweet", async () => {
    const sweet = await Sweet.create({
      name: "Barfi",
      category: "Milk",
      price: 250,
      quantity: 5,
      sellerId: (await User.findOne())._id,
    });

    const res = await request(app)
      .delete(`/api/sweets/${sweet._id}`)
      .set("Cookie", cookie);

    expect(res.statusCode).toBe(200);
  });

  // ---------- GET ALL SWEETS ----------
  it("should get all sweets", async () => {
    const res = await request(app)
      .get("/api/sweets")
      .set("Cookie", cookie);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

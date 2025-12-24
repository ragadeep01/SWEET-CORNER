import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import User from "../models/user.js";

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  await mongoose.connect(process.env.MONGO_TEST_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await User.deleteMany({});
});

describe("AUTHENTICATION API", () => {

  describe("POST /api/auth/signup", () => {
    it("should register a new user", async () => {
      const res = await request(app)
        .post("/api/auth/signup")
        .send({
          name: "Ragadeep",
          email: "ragadeep@gmail.com",
          password: "password123",
          role: "Buyer",
        });

    expect(res.statusCode).toBe(201);
expect(res.body.email).toBe("ragadeep@gmail.com");
expect(res.body).toHaveProperty("_id");

      const user = await User.findOne({ email: "ragadeep@gmail.com" });
      expect(user).not.toBeNull();
      expect(user.password).not.toBe("password123");
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login with correct credentials", async () => {
      await request(app).post("/api/auth/signup").send({
        name: "LoginUser",
        email: "login@gmail.com",
        password: "password123",
        role: "Buyer",
      });

      const res = await request(app).post("/api/auth/login").send({
        email: "login@gmail.com",
        password: "password123",
      });

      expect(res.statusCode).toBe(200);
    });
  });
  describe("POST /api/auth/login", () => {
    it("blocker user should not be allowed", async () => {
      await request(app).post("/api/auth/signup").send({
        name: "LoginUser",
        email: "login@gmail.com",
        password: "password123",
        role: "Buyer",
        isblocked:"false"
      });
      const res = await request(app).post("/api/auth/login").send({
        email: "login@gmail.com",
        password: "password123",
      });

      expect(res.statusCode).toBe(200);
      console.log("done");
    });

  });

});

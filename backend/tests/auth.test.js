import request from "supertest";
import app from "../app.js";

describe("Auth", () => {
  test("Login", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "bibeklama123asd@gmail.com",
      password: "00000000",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("accessToken");
  });
});

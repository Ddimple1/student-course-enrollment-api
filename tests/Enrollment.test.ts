import request, { Response } from "supertest";
import app from "../src/app"; 

describe("GET /api/enrollments", () => {
  it("should return an empty list initially", async () => {
    // Act
    const response: Response = await request(app).get("/api/enrollments");

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "All enrollments fetched successfully");
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBe(0);
  });
});

describe("POST /api/enrollments", () => {
  it("should return 400 if required fields are missing", async () => {
    // Act
    const response: Response = await request(app)
      .post("/api/enrollments")
      .send({ Enrollment_date: 20251101 }); // missing Enrollment_status

    // Assert
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "All fields are required" });
  });

  it("should create a new enrollment successfully", async () => {
    // Arrange
    const payload = {
      Enrollment_date: 20251101,
      Enrollment_status: "active",
    };

    // Act
    const response: Response = await request(app).post("/api/enrollments").send(payload);

    // Assert
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Enrollment added successfully");
    expect(response.body.data).toMatchObject({
      Enrollment_date: payload.Enrollment_date,
      Enrollment_status: payload.Enrollment_status,
    });
    expect(response.body.data).toHaveProperty("Enrollment_number");
  });
});

describe("PUT /api/enrollments/:id", () => {
  it("should return 404 when enrollment not found", async () => {
    // Act
    const response: Response = await request(app)
      .put("/api/enrollments/12")
      .send({ Enrollment_status: "completed" });

    // Assert
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Enrollment not found" });
  });

  it("should update an existing enrollment successfully", async () => {
    // Arrange: create one first
    const created = await request(app).post("/api/enrollments").send({
      Enrollment_date: 20251101,
      Enrollment_status: "active",
    });
    const enrollmentId = created.body.data.Enrollment_number;

    // Act
    const response: Response = await request(app)
      .put(`/api/enrollments/${enrollmentId}`)
      .send({ Enrollment_status: "completed" });

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("enrollments updated successfully");
    expect(response.body.data.Enrollment_status).toBe("completed");
  });
});

describe("DELETE /api/enrollments/:id", () => {
  it("should return 404 when enrollment not found", async () => {
    // Act
    const response: Response = await request(app).delete("/api/enrollments/12");

    // Assert
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Enrollment not found" });
  });

  it("should delete an existing enrollment successfully", async () => {
    // Arrange: create one first
    const created = await request(app).post("/api/enrollments").send({
      Enrollment_date: 20251101,
      Enrollment_status: "active",
    });
    const enrollmentId = created.body.data.Enrollment_number;

    // Act
    const response: Response = await request(app).delete(`/api/enrollments/${enrollmentId}`);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Enrollment deleted successfully");
    expect(response.body.data.Enrollment_number).toBe(enrollmentId);

    // Confirm enrollment list is empty
    const listResponse: Response = await request(app).get("/api/enrollments");
    expect(listResponse.body.data.length).toBe(0);
  });
});
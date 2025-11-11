import request, { Response } from "supertest";
import app from "../src/app"; // adjust path if needed

describe("GET /api/students", () => {
    it("should return an empty list initially", async () => {
        const response: Response = await request(app).get("/api/students");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "All students fetched successfully");
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBe(0);
    });
});

describe("POST /api/students", () => {
    it("should return 400 if required fields are missing", async () => {
        const response: Response = await request(app)
            .post("/api/students")
            .send({ FullName: "Alice" }); // missing email and enrollment_year

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message: "All fields are required",
        });
    });

    it("should create a new student successfully", async () => {
        const payload = {
            FullName: "Bob Marley",
            email: "bob@example.com",
            enrollment_year: 2024,
            program: "Dev",
        };

        const response: Response = await request(app).post("/api/students").send(payload);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Students added successfully");
        expect(response.body.data).toMatchObject({
            FullName: "Bob Marley",
            email: "bob@example.com",
            program: "Dev",
            enrollment_year: 2024,
        });
        expect(response.body.data).toHaveProperty("id");
    });
});

describe("PUT /api/students/:id", () => {
    it("should return 404 when student not found", async () => {
        const response: Response = await request(app)
            .put("/api/students/999")
            .send({ FullName: "Updated Name" });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: "Student not found" });
    });

    it("should update an existing student successfully", async () => {
        const created = await request(app).post("/api/students").send({
            FullName: "Dana",
            email: "dana@example.com",
            enrollment_year: 2022,
            program: "CS",
        });

        const studentId = created.body.data.id;

        const response: Response = await request(app)
            .put(`/api/students/${studentId}`)
            .send({ FullName: "Dana Updated", program: "IT" });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Student updated successfully");
        expect(response.body.data.FullName).toBe("Dana Updated");
        expect(response.body.data.program).toBe("IT");
    });
});

describe("DELETE /api/students/:id", () => {
    it("should return 404 when student not found", async () => {
        const response: Response = await request(app).delete("/api/students/999");

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: "Student not found" });
    });

    it("should delete an existing student successfully", async () => {
        const created = await request(app).post("/api/students").send({
            FullName: "Eve",
            email: "eve@example.com",
            enrollment_year: 2023,
            program: "Math",
        });
        const studentId = created.body.data.id;

        const response: Response = await request(app).delete(`/api/students/${studentId}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Student deleted successfully");
        expect(response.body.data.FullName).toBe("Eve");

        // Confirm student list is empty
        const listResponse: Response = await request(app).get("/api/students");
        expect(listResponse.body.data.length).toBe(2);
    });
});

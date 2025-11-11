import request, { Response } from "supertest";
import app from "../src/app"; 

describe("GET /api/courses", () => {
    it("should return an empty list initially", async () => {
        const response: Response = await request(app).get("/api/courses");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "All courses fetched successfully");
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBe(0);
    });
});

describe("POST /api/courses", () => {
    it("should return 400 if required fields are missing", async () => {
        const response: Response = await request(app)
            .post("/api/courses")
            .send({ Course_Name: "Math" }); // missing other fields

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message: "All fields are required",
        });
    });

    it("should create a new course successfully", async () => {
        const payload = {
            Course_Name: "Computer Science",
            Course_credit: 3,
            Course_duration: "3 months",
            Course_description: "Intro to CS",
        };

        const response: Response = await request(app).post("/api/courses").send(payload);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Courses added successfully");
        expect(response.body.data).toMatchObject(payload);
        expect(response.body.data).toHaveProperty("Course_id");
    });
});

describe("PUT /api/courses/:id", () => {
    it("should return 404 when course not found", async () => {
        const response: Response = await request(app)
            .put("/api/courses/999")
            .send({ Course_Name: "Updated Name" });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: "Course not found" });
    });

    it("should update an existing course successfully", async () => {
        const created = await request(app).post("/api/courses").send({
            Course_Name: "Math",
            Course_credit: 4,
            Course_duration: "4 months",
            Course_description: "Basic Math",
        });

        const courseId = created.body.data.Course_id;

        const response: Response = await request(app)
            .put(`/api/courses/${courseId}`)
            .send({ Course_Name: "Advanced Math", Course_duration: "5 months" });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Courses updated successfully");
        expect(response.body.data.Course_Name).toBe("Advanced Math");
        expect(response.body.data.Course_duration).toBe("5 months");
    });
});

describe("DELETE /api/courses/:id", () => {
    it("should return 404 when course not found", async () => {
        const response: Response = await request(app).delete("/api/courses/999");

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: "Course not found" });
    });

    it("should delete an existing course successfully", async () => {
        const created = await request(app).post("/api/courses").send({
            Course_Name: "Physics",
            Course_credit: 3,
            Course_duration: "3 months",
            Course_description: "Physics Basics",
        });

        const courseId = created.body.data.Course_id;

        const response: Response = await request(app).delete(`/api/courses/${courseId}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Course deleted successfully");
        expect(response.body.data.Course_Name).toBe("Physics");

        // Confirm course list is empty
        const listResponse: Response = await request(app).get("/api/courses");
        expect(listResponse.body.data.length).toBe(2);
    });
});
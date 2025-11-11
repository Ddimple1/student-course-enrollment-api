import express, { Express } from "express";
import studentRoutes from "./api/v1/routes/Student_routes";
import CourseRoutes from "./api/v1/routes/Course_routes";
import EnrollmentRoutes from "./api/v1/routes/Enrollment_routes";

const app: Express = express();
app.use(express.json());

// Define a route
app.use("/api/students", studentRoutes);
app.use("/api/courses", CourseRoutes);
app.use("/api/enrollments", EnrollmentRoutes)

export default app;
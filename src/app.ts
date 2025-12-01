import express, { Express } from "express";
import rateLimit from "express-rate-limit";
import setupSwagger from "./config/swagger";
import {
    accessLogger,
    errorLogger,
    consoleLogger,
} from "./api/v1/middleware/logger";
import errorHandler from "./api/v1/middleware/errorHandler";
import studentRoutes from "./api/v1/routes/Student_routes";
import CourseRoutes from "./api/v1/routes/Course_routes";
import EnrollmentRoutes from "./api/v1/routes/Enrollment_routes";
import userRoutes from "./api/v1/routes/userRoutes"


const app: Express = express();

// Logging middleware 
if (process.env.NODE_ENV === "production") {
    // In production, log to files
    app.use(accessLogger);
    app.use(errorLogger);
} else {
    // In development, log to console for immediate feedback
    app.use(consoleLogger);
}

app.use(express.json());

// Basic rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 100,// Limit each IP to 5 requests per windowMs
  message: {
    error: 'Too many requests from this IP address',
    retryAfter: '15 minutes',
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => {
    res.status(429).json({
      error: 'Rate limit exceeded',
      message: 'Too many requests from this IP, please try again later',
      retryAfter: Math.round((req as any).rateLimit.resetTime / 1000)
    });
  }
});

// Apply rate limiting to all requests
app.use(limiter);

// Define a route
app.use("/api/students", studentRoutes);
app.use("/api/courses", CourseRoutes);
app.use("/api/enrollments", EnrollmentRoutes);
app.use("/api/users", userRoutes);

// Global error handling middleware
app.use(errorHandler);

// Setup Swagger
setupSwagger(app);

export default app;
import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Student Enrollment API Documnetation",
            version: "1.0.0",
            description:
                "This is the API documentation for the Student Enrollment API Project.",
        },
        servers: [
            {
                url: "http://localhost:3000/api/v1",
                description: "Local server",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/api/v1/routes/Course_routes.ts", "./src/api/v1/routes/Enrollment_routes.ts", "./src/api/v1/routes/Student_routes.ts", "./src/api/v1/routes/user_Routes.ts",
        "./src/api/v1/validators/CourseValidator.ts", "./src/api/v1/validators/studentValidator.ts", "./src/api/v1/validators/enrollmentValidator.ts"
     ], // Path to the API docs
};

// Generate the Swagger spec
export const generateSwaggerSpec = (): object => {
    return swaggerJsdoc(swaggerOptions);
};
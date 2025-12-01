import {Router} from "express";
import {
    getAllCourses,
    addCourse,
    UpdateCourse,
    deleteCourse,
} from "../controllers/Course_controller";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: Router = Router();

/**
 * @openapi
 * /api/courses:
 *   get:
 *     summary: Get all courses (filter & sort)
 *     tags: [Courses]
 *     parameters:
 *       - name: Course_credit
 *         in: query
 *         schema: { type: integer }
 *       - name: Course_duration
 *         in: query
 *         schema: { type: integer }
 *       - name: Course_Name
 *         in: query
 *         schema: { type: string }
 *       - name: sort
 *         in: query
 *         schema:
 *           type: string
 *           enum: [Course_Name, Course_credit]
 *     responses:
 *       '200':
 *         description: List of courses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Course'
 *     security:
 *       - bearerAuth: []
 *
 *   post:
 *     summary: Create a new course (admin)
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *           example:
 *             Course_Name: "Intro to Programming"
 *             Course_description: "Basics of programming"
 *             Course_credit: 3
 *             Course_duration: 12
 *     responses:
 *       '201': { description: "Course created" }
 *     security:
 *       - bearerAuth: []
 * 
 * /api/courses/{id}:
 *   put:
 *     summary: Update a course by ID (admin)
 *     tags: [Courses]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *           example:
 *             Course_Name: "Advanced Programming"
 *             Course_description: "Advanced topics in programming"
 *             Course_credit: 4
 *             Course_duration: 14
 *     responses:
 *       '200': { description: "Course updated successfully" }
 *       '404': { description: "Course not found" }
 *     security:
 *       - bearerAuth: []
 *
 *   delete:
 *     summary: Delete a course by ID (admin)
 *     tags: [Courses]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       '200': { description: "Course deleted successfully" }
 *       '404': { description: "Course not found" }
 *     security:
 *       - bearerAuth: []
 */
router.get("/",authenticate, isAuthorized({hasRole: ["admin", "student"]}), getAllCourses);
router.post("/",authenticate, isAuthorized({hasRole:["admin"]}), addCourse);
router.put("/:id",authenticate, isAuthorized({hasRole:["admin"], allowSameUser: true }), UpdateCourse);
router.delete("/:id",authenticate, isAuthorized({hasRole: ["admin"]}), deleteCourse);

export default router;
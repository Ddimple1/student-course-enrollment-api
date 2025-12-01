import {Router} from "express";
import {
    getAllStudents,
    addStudent,
    UpdateStudent,
    deleteStudent,
} from "../controllers/Student_controller";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: Router = Router();

/**
 * @openapi
 * /api/students:
 *   get:
 *     summary: Get list of students
 *     tags: [Students]
 *     parameters:
 *       - name: program
 *         in: query
 *         schema:
 *           type: string
 *         description: Filter by program 
 *       - name: enrollment_year
 *         in: query
 *         schema:
 *           type: integer
 *         description: Filter by enrollment year
 *       - name: sort
 *         in: query
 *         schema:
 *           type: string
 *           enum: [FullName]
 *         description: Sort by field
 *     responses:
 *       '200':
 *         description: List of students
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Student'
 *       '401':
 *         $ref: '#/components/schemas/ErrorResponse'
 *     security:
 *       - bearerAuth: []
 *
 *   post:
 *     summary: Create a new student (only admin)
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *           example:
 *             FullName: "Alice Smith"
 *             email: "alice@example.com"
 *             program: "CS"
 *             enrollment_year: 2023
 *     responses:
 *       '201':
 *         description: Student created
 *     security:
 *       - bearerAuth: []
 * 
 * /api/students/{id}:
 *   put:
 *     summary: Update a student by ID (only admin)
 *     tags: [Students]
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
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       '200': { description: "Student updated successfully" }
 *       '404': { description: "Student not found" }
 *     security:
 *       - bearerAuth: []
 *
 *   delete:
 *     summary: Delete a student by ID (only admin)
 *     tags: [Students]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       '200': { description: "Student deleted successfully" }
 *       '404': { description: "Student not found" }
 *     security:
 *       - bearerAuth: []
 */

router.get("/", authenticate, isAuthorized({hasRole: ["admin"]}), getAllStudents);
router.post("/", authenticate, isAuthorized({hasRole: ["admin"]}), addStudent);
router.put("/:id", authenticate, isAuthorized({hasRole: ["admin"], allowSameUser: true}), UpdateStudent);
router.delete("/:id",authenticate, isAuthorized({hasRole: ["admin"]}), deleteStudent);

export default router;
import {Router} from "express";
import {
    getAllEnrollments,
    addEnrollment,
    UpdateEnrollment,
    deleteEnrollment,
} from "../controllers/enrollment_controllers";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: Router = Router();

/**
 * @openapi
 * /api/enrollments:
 *   get:
 *     summary: Get all enrollments (admin only)
 *     tags: [Enrollments]
 *     parameters:
 *       - name: Enrollment_status
 *         in: query
 *         schema: { type: string }
 *       - name: sort
 *         in: query
 *         schema: { type: string, enum: [Enrollment_date] }
 *     responses:
 *       '200':
 *         description: List of enrollments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Enrollment'
 *     security:
 *       - bearerAuth: []
 *
 *   post:
 *     summary: Create an enrollment (student)
 *     tags: [Enrollments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Enrollment'
 *           example:
 *             studentId: 1
 *             courseId: 1
 *             Enrollment_date: "2025-11-12"
 *             Enrollment_status: "active"
 *     responses:
 *       '201': { description: 'Enrollment created' }
 *     security:
 *       - bearerAuth: []
 * 
 * /api/enrollments/{id}:
 *   put:
 *     summary: Update an enrollment by ID (admin only)
 *     tags: [Enrollments]
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
 *             $ref: '#/components/schemas/Enrollment'
 *     responses:
 *       '200': { description: "Enrollment updated successfully" }
 *       '404': { description: "Enrollment not found" }
 *     security:
 *       - bearerAuth: []
 *
 *   delete:
 *     summary: Delete an enrollment by ID (admin only)
 *     tags: [Enrollments]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       '200': { description: "Enrollment deleted successfully" }
 *       '404': { description: "Enrollment not found" }
 *     security:
 *       - bearerAuth: []
 */

router.get("/",authenticate, isAuthorized({hasRole: ["admin"]}), getAllEnrollments);
router.post("/",authenticate, isAuthorized({hasRole: ["student"]}), addEnrollment);
router.put("/:id",authenticate, isAuthorized({hasRole: ["admin"], allowSameUser: true}), UpdateEnrollment);
router.delete("/:id",authenticate, isAuthorized({hasRole: ["admin"]}), deleteEnrollment);

export default router;
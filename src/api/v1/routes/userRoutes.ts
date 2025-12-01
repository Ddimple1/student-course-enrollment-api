import { Router } from "express";
import { getUserById, setUserRole } from "../controllers/user_controller";
import authenticate from "../middleware/authenticate";

const router = Router();

/**
 * @openapi
 * /api/v1/users/{uid}:
 *   get:
 *     summary: Get Firebase user details by UserID 
 *     tags: [Users]
 *     parameters:
 *       - name: uid
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       '200':
 *         description: Firebase user record
 *       '404':
 *         $ref: '#/components/schemas/ErrorResponse'
 *     security:
 *       - bearerAuth: []
 *
 * /api/v1/users/{uid}/role:
 *   post:
 *     summary: Set custom role for user (admin only)
 *     tags: [Users]
 *     parameters:
 *       - name: uid
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role: { type: string, example: "admin" }
 *             required: [role]
 *     responses:
 *       '200': { description: 'Role assigned' }
 *       '403': { $ref: '#/components/schemas/ErrorResponse' }
 *     security:
 *       - bearerAuth: []
 */

// GET user details (protected)
router.get("/:uid", authenticate, getUserById);

// Admin only: Set role for a user (protected)
router.post("/:uid/role", authenticate, setUserRole);

export default router;

import { Router } from "express";
import { getUserById, setUserRole } from "../controllers/user_controller";
import authenticate from "../middleware/authenticate";

const router = Router();

// GET user details (protected)
router.get("/:uid", authenticate, getUserById);

// Admin only: Set role for a user (protected)
router.post("/:uid/role", authenticate, setUserRole);

export default router;

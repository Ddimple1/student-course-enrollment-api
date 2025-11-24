import {Router} from "express";
import {
    getAllEnrollments,
    addEnrollment,
    UpdateEnrollment,
    deleteEnrollment,
} from "../controllers/enrollment_controllers";

const router: Router = Router();

router.get("/", getAllEnrollments);
router.post("/", addEnrollment);
router.put("/:id", UpdateEnrollment);
router.delete("/:id", deleteEnrollment);

export default router;
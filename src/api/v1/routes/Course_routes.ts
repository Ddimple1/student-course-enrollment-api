import {Router} from "express";
import {
    getAllCourses,
    addCourse,
    UpdateCourse,
    deleteCourse,
} from "../controllers/Course_controller";

const router: Router = Router();

router.get("/", getAllCourses);
router.post("/", addCourse);
router.put("/:id", UpdateCourse);
router.delete("/:id", deleteCourse);

export default router;
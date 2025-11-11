import {Router} from "express";
import {
    getAllStudents,
    addStudent,
    UpdateStudent,
    deleteStudent,
} from "../controllers/Student_controller";

const router: Router = Router();

router.get("/", getAllStudents);
router.post("/", addStudent);
router.put("/:id", UpdateStudent);
router.delete("/:id", deleteStudent);

export default router;
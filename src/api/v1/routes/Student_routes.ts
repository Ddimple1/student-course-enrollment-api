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

router.get("/", authenticate, isAuthorized({hasRole: ["admin"]}), getAllStudents);
router.post("/", authenticate, isAuthorized({hasRole: ["admin"]}), addStudent);
router.put("/:id", authenticate, isAuthorized({hasRole: ["admin"], allowSameUser: true}), UpdateStudent);
router.delete("/:id",authenticate, isAuthorized({hasRole: ["admin"]}), deleteStudent);

export default router;
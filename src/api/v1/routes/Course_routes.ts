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

router.get("/",authenticate, isAuthorized({hasRole: ["admin", "student"]}), getAllCourses);
router.post("/",authenticate, isAuthorized({hasRole:["admin"]}), addCourse);
router.put("/:id",authenticate, isAuthorized({hasRole:["admin"], allowSameUser: true }), UpdateCourse);
router.delete("/:id",authenticate, isAuthorized({hasRole: ["admin"]}), deleteCourse);

export default router;
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

router.get("/",authenticate, isAuthorized({hasRole: ["admin"]}), getAllEnrollments);
router.post("/",authenticate, isAuthorized({hasRole: ["student"]}), addEnrollment);
router.put("/:id",authenticate, isAuthorized({hasRole: ["admin"], allowSameUser: true}), UpdateEnrollment);
router.delete("/:id",authenticate, isAuthorized({hasRole: ["admin"]}), deleteEnrollment);

export default router;
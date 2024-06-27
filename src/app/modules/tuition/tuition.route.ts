import { Router } from "express";
import { tuitionControllers } from "./tuition.controller";
import auth from "../../middlewares/auth";
import { ROLE } from "@prisma/client";

const router = Router();

router.post('/create', tuitionControllers.createTuition);
router.get('/', tuitionControllers.getAllTuitions);
router.post('/apply/:tuitionId', auth(ROLE.tutor), tuitionControllers.applyTuition);
router.get('/applied', auth(ROLE.tutor), tuitionControllers.getMyAppliedTuition);
router.get('/posted', auth(ROLE.student), tuitionControllers.getMyPostedTuition);
router.get('/:tuitionId', tuitionControllers.getATuitionById);
router.post('/request/:tutorId', auth(ROLE.student), tuitionControllers.requestToTutor);

export const tuitionRoutes = router
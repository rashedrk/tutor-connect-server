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
router.get('/requested', auth(ROLE.student), tuitionControllers.getMyTutorRequest);
router.get('/request', auth(ROLE.tutor), tuitionControllers.getAllTuitionRequest);
router.post('/request/:tutorId', auth(ROLE.student), tuitionControllers.requestToTutor);
router.put('/request/:tuitionId', auth(ROLE.tutor), tuitionControllers.changeTuitionRequestStatus);
router.get('/current', auth(ROLE.tutor, ROLE.student), tuitionControllers.getMyCurrentTuitions);
router.post('/select/:tutorId', auth(ROLE.student), tuitionControllers.selectTutor);
router.get('/:tuitionId', tuitionControllers.getATuitionById);
router.get('/:tuitionId/applied', tuitionControllers.getAppliedTutors);
router.put('/cancel/:tuitionRequestId', auth(ROLE.student), tuitionControllers.cancelTuitionRequest);

export const tuitionRoutes = router
import { Router } from "express";
import { tutorControllers } from "./tutor.controller";

const router = Router();

router.get('/', tutorControllers.getAllTutors);
router.get('/:tutorId', tutorControllers.getATutorById);


export const tutorRoutes = router
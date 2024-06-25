import { Router } from "express";
import { tutorControllers } from "./tutor.controller";

const router = Router();

router.get('/', tutorControllers.getAllTutors);


export const tutorRoutes = router
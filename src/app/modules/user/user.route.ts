import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { ROLE } from "@prisma/client";

const router = Router();

router.post('/tutor/create', userController.createTutor);
router.post('/student/create', userController.createStudent);


export const userRoutes = router
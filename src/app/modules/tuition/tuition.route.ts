import { Router } from "express";
import { tuitionControllers } from "./tuition.controller";
import auth from "../../middlewares/auth";
import { ROLE } from "@prisma/client";

const router = Router();

router.post('/create', tuitionControllers.createTuition);
router.get('/', tuitionControllers.getAllTuitions);
router.post('/apply/:tuitionId', auth(ROLE.tutor), tuitionControllers.applyTuition)

export const tuitionRoutes = router
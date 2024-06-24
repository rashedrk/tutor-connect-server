import { Router } from "express";
import { tuitionControllers } from "./tuition.controller";

const router = Router();

router.post('/create', tuitionControllers.createTuition);
router.get('/', tuitionControllers.getAllTuitions)

export const tuitionRoutes = router
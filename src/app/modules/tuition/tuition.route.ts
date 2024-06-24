import { Router } from "express";
import { tuitionControllers } from "./tuition.controller";

const router = Router();

router.post('/create', tuitionControllers.createTuition);

export const tuitionRoutes = router
import { Router } from "express";
import { AdminController } from "../controllers/admin.controller";

const router = Router();

router.get("/", AdminController.dashboard);

export default router;

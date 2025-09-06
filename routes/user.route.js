import { Router } from "express";
import { create_user, delete_user, fetch_user, show_user, updateUser } from "../controller/user.controller.js";

const router = Router()

router.post("/create-user",create_user)
router.put("/update-user/:id",updateUser)
router.get("/get-user",fetch_user)
router.get("/get-current-user/:id",show_user)
router.delete("/delete-user/:id",delete_user)

export default router
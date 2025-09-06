import { Router } from "express";
import {create_post,update_post,fetch_post,delete_post,show_post} from "../controller/post.controller.js";

const router = Router()

router.post("/create-post",create_post)
router.put("/update-post/:id",update_post)
router.get("/get-post",fetch_post)
router.get("/get-current-post/:id",show_post)
router.delete("/delete-post/:id",delete_post)

export default router
import { Router } from "express";
import {create_comment,fetch_comment,delete_comment,update_comment,show_comment} from "../controller/comment.controller.js";

const router = Router()

router.post("/create-comment",create_comment)
router.put("/update-comment/:id",update_comment)
router.get("/get-comment",fetch_comment)
router.get("/get-current-comment/:id",show_comment)
router.delete("/delete-comment/:id",delete_comment)

export default router
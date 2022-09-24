import express from "express";

// controller
import ctrl from "../controller/members-ctrl";

// /membersをはさむルートパス
import register from "./members/register";

const router = express.Router();

// /memberに来たリクエストの処理
router.use("/register", register);

router.route("/").get(ctrl.get).post(ctrl.post);

export default router;

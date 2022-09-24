import express from "express";

// controller
import ctrl from "../../controller/members/register-ctrl";

const router = express.Router();

// /members/registerに来たリクエストの処理
router.route("/").get(ctrl.get);

export default router;

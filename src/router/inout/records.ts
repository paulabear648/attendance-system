import express from "express";

// controller
import ctrl from "../../controller/inout/records-ctrl";

const router = express.Router();

// /inout/recordsに来たリクエストの処理
router.route("/").get(ctrl.get).post(ctrl.post);

export default router;

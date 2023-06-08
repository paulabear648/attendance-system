import express from "express";

// controller
import membersCtrl from "../controller/api/members-ctrl";
import recordCtrl from "../controller/api/records-ctrl";

const router = express.Router();

// /inoutに来たリクエストの処理
router.route("/members").post(membersCtrl.post);
router.route("/records").get(recordCtrl.get).post(recordCtrl.post);

export default router;

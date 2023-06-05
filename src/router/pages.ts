import express from "express";

// controller
import inoutCtrl from "../controller/pages/inout-ctrl";
import registerCtrl from "../controller/pages/register-ctrl";
import recordsCtrl from "../controller/pages/records-ctrl";
import membersCtrl from "../controller/pages/members-ctrl";

const router = express.Router();

// /inoutに来たリクエストの処理
router.route("/inout").get(inoutCtrl.get);
router.route("/inout/records").post(recordsCtrl.post);
router.route("/members").post(membersCtrl.post);
router.route("/members/register").get(registerCtrl.get);

export default router;

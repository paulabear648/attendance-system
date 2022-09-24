import express from "express";

// controller
import ctrl from "../controller/inout-ctrl";

// /inoutをはさむルートパス
import records from "./inout/records";

const router = express.Router();

// /inoutに来たリクエストの処理
router.use("/records", records);
router.route("/").get(ctrl.get);

export default router;

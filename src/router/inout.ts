import express from "express";
import records from "./inout/records";

const router = express.Router();

// /inoutに来たリクエストの処理
router.use("/records", records);

router.route("/").get((req: express.Request, res: express.Response) => {
  res.render("inout");
});

export default router;

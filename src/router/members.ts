import express from "express";
import register from "./members/register";

const router = express.Router();

// /memberに来たリクエストの処理
router.use("/register", register);

router.route("/").get(async (req: express.Request, res: express.Response) => {
  res.redirect("/members/register");
});

export default router;

import express from "express";

const router = express.Router();

// /members/registerに来たリクエストの処理
router.route("/").get(async (req: express.Request, res: express.Response) => {
  res.render("members/register");
});

export default router;

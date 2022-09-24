import express from "express";

import memberModel from "../db/models/member-db";
import register from "./members/register";
import sha256 from "../controller/records/modules/sha256";

const router = express.Router();

// /memberに来たリクエストの処理
router.use("/register", register);

router
  .route("/")
  .get(async (req: express.Request, res: express.Response) => {
    res.redirect("/members/register");
  })
  .post(async (req: express.Request, res: express.Response) => {
    const body = req.body;

    const grade = body.grade;
    const name = body.name;
    const pass = body.password; // body.passwordはfrontでもハッシュ化されたもの
    const hashedpass = sha256(pass);
    await memberModel.create(grade, name, hashedpass);

    res.redirect("/inout");
  });

export default router;

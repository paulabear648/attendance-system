import express from "express";
import memberModel from "../../../db/models/member-db";

const ctrl = {
  /*
  async get(req: express.Request, res: express.Response): Promise<void> {
  },
  */

  async post(req: express.Request, res: express.Response): Promise<void> {
    const body = req.body;

    // const grade: number = parseInt(body.grade, 10);
    const grade = 0; // フロント側でnumberが送信でき次第上のコードに置き換える
    const name: string = body.context;
    const pass: string = body.password; // body.passwordはfrontでもハッシュ化されたもの

    const result = await memberModel.create(grade, name, pass); // create関数内でさらにハッシュ化

    res.json({ result });
  },
};

export default ctrl;

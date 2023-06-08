import axios from "axios";
import express from "express";

const ctrl = {
  async get(req: express.Request, res: express.Response): Promise<void> {
    const successMessage = await req.consumeFlash("success");
    const success = successMessage.length === 0 ? "" : successMessage[0];
    const errorMessage = await req.consumeFlash("error");
    const error = errorMessage.length === 0 ? "" : errorMessage[0];

    // 直近5人のログを取得
    const record = await axios.get(
      "http://127.0.0.1:8080/api/records?limit=5&isDesc=true"
    );
    console.log(record);
    res.render("inout", { success, error, record: record.data });
  },
};

export default ctrl;

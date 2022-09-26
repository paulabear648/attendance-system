import express from "express";

const ctrl = {
  async get(req: express.Request, res: express.Response): Promise<void> {
    const successMessage = await req.consumeFlash("success");
    const success = successMessage.length === 0 ? "" : successMessage[0];
    const errorMessage = await req.consumeFlash("error");
    const error = errorMessage.length === 0 ? "" : errorMessage[0];
    res.render("inout", { success, error });
  },
};

export default ctrl;

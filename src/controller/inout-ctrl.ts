import express from "express";

const ctrl = {
  async get(req: express.Request, res: express.Response): Promise<void> {
    const messages = await req.consumeFlash("message");
    res.render("inout", messages);
  },
};

export default ctrl;

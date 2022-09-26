import express from "express";

const ctrl = {
  async get(req: express.Request, res: express.Response): Promise<void> {
    const messages = await req.consumeFlash("message");
    const message = messages.length === 0 ? "" : messages[0];
    res.render("inout", { message });
  },
};

export default ctrl;

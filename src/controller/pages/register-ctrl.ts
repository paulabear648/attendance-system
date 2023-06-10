import express from "express";

const ctrl = {
  async get(req: express.Request, res: express.Response): Promise<void> {
    res.render("contents/register");
  },
};

export default ctrl;

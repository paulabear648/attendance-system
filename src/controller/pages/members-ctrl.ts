import express from "express";

const ctrl = {
  async post(req: express.Request, res: express.Response): Promise<void> {
    // axiosでのやり取り

    res.redirect("/inout");
  },
};

export default ctrl;

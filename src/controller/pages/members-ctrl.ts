import express from "express";
import axios from "axios";

const ctrl = {
  async post(req: express.Request, res: express.Response): Promise<void> {
    await axios.post("http://127.0.0.1:8080/api/members", {
      context: req.body.context,
      password: req.body.password,
    });

    res.redirect("/inout");
  },
};

export default ctrl;

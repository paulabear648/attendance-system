import express from "express";
import axios from "axios";

const ctrl = {
  async get(req: express.Request, res: express.Response): Promise<void> {
    const result = await axios.get("http://127.0.0.1:8080/api/records");

    res.render("inout/records", { record: result.data });
  },
  async post(req: express.Request, res: express.Response): Promise<void> {
    // axiosでのやり取り
    const result: { data: { message: string; cert: boolean } } =
      await axios.post("http://127.0.0.1:8080/api/records", {
        context: req.body.context,
        password: req.body.password,
        state: req.body.state,
      });
    const data = result.data;

    if (data.cert) {
      await req.flash("success", data.message);
    } else {
      await req.flash("error", data.message);
    }

    res.redirect("/inout");
  },
};

export default ctrl;

import express from "express";

const ctrl = {
  async post(req: express.Request, res: express.Response): Promise<void> {
    // axiosでのやり取り
    const result: any = { message: "foo" };

    if (result != null) {
      await req.flash("success", result.message);
    } else {
      await req.flash("error", result.message);
    }

    res.redirect("/inout");
  },
};

export default ctrl;

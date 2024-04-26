import { getJsConfig } from "@/utils/wechat";
import { Request, Response } from "express";

export const jsConfig = async (req: Request, res: Response) => {
  try {
    const jsConfig = await getJsConfig(String(req.query.url || ""));
    res.json(jsConfig);
  } catch (e) {
    res.json();
  }
};

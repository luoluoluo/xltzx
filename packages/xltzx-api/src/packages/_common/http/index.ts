import { Express } from "express";
import multer from "multer";
import { downloadFile, uploadFile } from "./actions/file";
import { createWechatPayCallback } from "./actions/pay";
export const startServer = (app: Express) => {
  app.post(
    "/file",
    multer({
      dest: "/tmp/",
      fileFilter(req, file, callback) {
        // 解决中文名乱码的问题
        file.originalname = Buffer.from(file.originalname, "latin1").toString("utf8");
        callback(null, true);
      }
    }).single("file"),
    uploadFile
  );
  app.get("/file", downloadFile);

  // 微信支付回调
  app.post("/wechat-pay-callback", createWechatPayCallback);
  // // js config
  // app.get("/js-config", jsConfig);
};

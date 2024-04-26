import { getLogger } from "@/core/logger";
import prisma from "@/core/prisma";
import { genId, getStoragePath } from "@/utils";
import crypto from "crypto";
import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import sharp from "sharp";

export default (value: string, type: "text" | "file") => {
  const hash = crypto.createHash("md5");
  if (type === "file") {
    value = String(fs.readFileSync(value));
  }
  return hash.update(value, "utf8").digest("hex");
};

export const uploadFile = async (req: Request, res: Response) => {
  // 计算文件md5
  const fileHash = crypto
    .createHash("md5")
    .update(String(fs.readFileSync(req.file?.path!)), "utf8")
    .digest("hex");
  // 通过md5查询
  const file = await prisma.file.findUnique({
    where: { hash: fileHash }
  });
  if (file) {
    return res.send({
      id: file.id,
      name: file.name
    });
  }
  const fileId = genId();
  const storagePath = getStoragePath();
  const filePath = path.resolve(`${storagePath}/${fileId}-${req.file?.originalname}`);
  // db
  await prisma.file.create({
    data: {
      id: fileId,
      hash: fileHash,
      path: filePath,
      name: req.file?.originalname,
      size: req.file?.size,
      type: req.file?.mimetype
    }
  });
  // storage
  const dirPath = path.dirname(filePath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  fs.copyFile(req.file?.path!, filePath, err => {
    getLogger().error(err, "uploadFile");
  });
  getLogger().debug([req.file?.path, filePath], "uploadFile");
  res.send({
    id: fileId,
    name: req.file?.originalname
  });
};

export const downloadFile = async (req: Request, res: Response) => {
  const id = req.query.id;
  const file = await prisma.file.findFirst({ where: { id: String(id) } });
  if (!file || !file.path) {
    res.status(404).send();
    return;
  }
  if (req.query.w && req.query.h) {
    try {
      const path = `/tmp/${file.id}-${req.query.w}-${req.query.h}-${file.name}`;
      await sharp(file.path)
        .resize(Number(req.query.w), Number(req.query.h), { fit: "cover" })
        .png({
          quality: 100
        })
        .toFile(path);
      res.download(path);
      return;
    } catch (e) {
      getLogger().error(e, "downloadFile");
    }
  }
  res.download(file.path);
};

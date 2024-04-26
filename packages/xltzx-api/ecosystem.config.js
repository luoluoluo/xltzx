module.exports = {
  apps: [
    {
      name: "xltzx-api",
      script: "dist/src/index.js",
      args: "start",
      out_file: "./logs/access.log", // 日志输出路径
      error_file: "./logs/error.log" // 报错日志输出路径
    }
  ]
};

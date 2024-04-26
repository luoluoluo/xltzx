export const ignoreLoginPaths = [
  "/",
  "/product",
  new RegExp("/product/.*"),
  "/article",
  new RegExp("/article/.*"),
  new RegExp("/auth/.*")
];

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/questions",
    createProxyMiddleware({
      target: "https://d462-116-37-88-211.jp.ngrok.io",
      changeOrigin: true,
    })
  );
  // app.use(
  //   "/members",
  //   createProxyMiddleware({
  //     target: "https://d462-116-37-88-211.jp.ngrok.io",
  //     changeOrigin: true,
  //   })
  // );
};

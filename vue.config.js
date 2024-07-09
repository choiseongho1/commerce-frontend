const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});

module.exports = {
  devServer: {
    host: "0.0.0.0",
    port: 3000,
    proxy: {
      "/api": {
        target: "http://43.202.24.139:8080",
        changeOrigin: true,
        pathRewrite: { "^/api": "/api" }, // '/api' 경로를 유지
      },
    },
  },
  lintOnSave: false, // 저장 시 ESLint를 비활성화합니다.
};

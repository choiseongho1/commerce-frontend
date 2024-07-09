const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});

module.exports = {
  devServer: {
    host: "0.0.0.0",
    port: 3000,
    proxy: process.env.VUE_APP_BASE_API, // proxy: process.env.VUE_APP_BASE_API //
  },
  lintOnSave: false, // 저장 시 ESLint를 비활성화합니다.
};

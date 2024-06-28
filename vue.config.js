const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});

module.exports = {
  devServer: {
    host: '0.0.0.0'
    port: 3000, // 원하는 포트 번호로 변경
  },
  lintOnSave: false, // 저장 시 ESLint를 비활성화합니다.
};

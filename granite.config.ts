import { defineConfig } from "@apps-in-toss/web-framework/config";

export default defineConfig({
  appName: "러브리커넥트",
  brand: {
    displayName: "러브리커넥트", // 화면에 노출될 앱의 한글 이름으로 바꿔주세요.
    primaryColor: "#d5356b", // 화면에 노출될 앱의 기본 색상으로 바꿔주세요.
    icon: "/public/icon.png", // 화면에 노출될 앱의 아이콘 이미지 주소로 바꿔주세요.
  },
  web: {
    host: "localhost",
    port: 3000,
    commands: {
      dev: "next dev",
      build: "next build",
    },
  },
  permissions: [],
  outdir: "out",
});

import path from "path"

const resolvePath = (p: string) => path.resolve(__dirname, p)

module.exports = {
  // ...
  webpack: {
    alias: {
      "@components": resolvePath("./src/components"),
      "@layouts": resolvePath("./src/layouts"),
      "@pages": resolvePath("./src/pages"),
      "@store": resolvePath("./src/store"),
      "@router": resolvePath("./src/router"),
      "@assets": resolvePath("./src/assets"),
      "@config": resolvePath("./src/config.ts"),
    },
  },
  // ...
}

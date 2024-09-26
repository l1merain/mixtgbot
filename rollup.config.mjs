import { babel } from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";
import run from "@rollup/plugin-run";
import resolve from "@rollup/plugin-node-resolve";
import deletePlugin from "rollup-plugin-delete";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import packageJson from "./package.json" assert { type: "json" };

const devMode = process.env.NODE_ENV !== "production";

export default {
  input: "src/index.ts",
  output: {
    file: "./build/index.js",
    format: "cjs", // commonjs формат
  },
  plugins: [
    terser(),
    deletePlugin({ targets: "build/*" }), // Удаляем старые файлы из build
    resolve({
      extensions: [".js", ".ts", ".json"],
      preferBuiltins: true, // Использовать встроенные модули Node.js
    }),
    commonjs({
      ignoreDynamicRequires: ["node_modules/pg/lib/*.js"],
    }),
    json(),
    babel({
      presets: ["@babel/preset-typescript"],
      extensions: [".js", ".ts"],
      babelHelpers: "bundled",
    }),
    typescript({
      module: "ESNext",
    }),
    !devMode && terser(), // Минификация кода только в продакшене
    devMode &&
      run({
        execArgv: ["-r", "dotenv/config"],
      }),
  ],
  external: [
    ...Object.keys(packageJson.dependencies), // Исключаем зависимости из node_modules для облегчения сборки
  ],
  treeshake: !devMode, // Убираем неиспользуемый код в режиме продакшена
};

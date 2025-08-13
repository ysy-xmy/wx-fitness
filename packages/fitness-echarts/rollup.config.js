import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: {
    file: "dist/echarts.esm.js",
    format: "esm",
    sourcemap: true,
  },
  plugins: [
    resolve({
      // 确保解析 node_modules 里的 ECharts
      modulesOnly: true,
      browser: true,
    }),
    ,
    commonjs(),
    typescript(),
  ],
};

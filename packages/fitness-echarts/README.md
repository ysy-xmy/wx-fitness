## fitness-echarts

轻律健身小程序使用  
解决小程序无法引入按需引入 echarts 导致体积过大问题  
新包引入 echarts 后按需引入组件，再导出为 esm

## 发包方式

只需要在 index.ts 引用新组件然后 use  
再执行 npx rollup -c 打包  
发包记得更新 version 再 npm publish 发布

## 使用方式

import { echarts } from 'fitness-echarts/dist/echarts.esm'

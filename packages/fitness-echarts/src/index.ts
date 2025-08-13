//npx rollup -c
import * as echarts from "echarts/core";
import { LineChart } from "echarts/charts";
import {
  TooltipComponent,
  GridComponent,
  AxisPointerComponent,
  TitleComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

// 注册必须的组件
echarts.use([
  LineChart,
  TooltipComponent,
  GridComponent,
  AxisPointerComponent,
  TitleComponent,
  CanvasRenderer,
]);

export { echarts };

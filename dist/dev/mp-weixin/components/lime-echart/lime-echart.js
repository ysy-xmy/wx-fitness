"use strict";const e=require("../../common/vendor.js");if(!Array){const i=e.resolveComponent("van-tab"),n=e.resolveComponent("van-tabs"),s=e.resolveComponent("l-echart");(i+n+s)()}const p=()=>"../l-echart/l-echart.js";Math||p();const _={__name:"lime-echart",setup(i){const n=e.ref(!1),s=e.ref([]),l=e.ref([]),r=e.ref(null),u=e.reactive({tooltip:{trigger:"axis",formatter:t=>`${t[0].axisValue}: ${t[0].data}`},xAxis:{type:"category",data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]},yAxis:{type:"value"},series:[{data:[820,932,901,934,1290,1330,1320],type:"line",smooth:!0}]}),a=()=>{r.value.init(e.echarts,t=>{t.setOption(u),t.on("showTip",o=>{n.value=!0,l.value=[o],o.event?s.value=[o.event.offsetX||0,o.event.offsetY||0]:s.value=[0,0]}),t.on("hideTip",()=>{setTimeout(()=>{n.value=!1},300)})})},c=e.ref(0);return e.onMounted(()=>{a(),e.index.$on("changeType",t=>{console.log(t),c.value=t})}),(t,o)=>e.e({a:c.value!=1},c.value!=1?{b:e.p({title:"周"}),c:e.p({title:"月"}),d:e.p({title:"日"}),e:e.p({type:"card"})}:{f:e.p({title:"全部"}),g:e.p({title:"胸围"}),h:e.p({title:"腰围"}),i:e.p({title:"臀围"}),j:e.p({type:"card"})},{k:e.sr(r,"edc327ce-9",{k:"chart"}),l:e.o(a)})}},v=e._export_sfc(_,[["__file","J:/外包/wx-fitness/src/components/lime-echart/lime-echart.vue"]]);wx.createComponent(v);

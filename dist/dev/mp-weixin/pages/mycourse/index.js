"use strict";const e=require("../../common/vendor.js");if(!Array){(e.resolveComponent("van-circle")+e.resolveComponent("van-switch")+e.resolveComponent("van-tab")+e.resolveComponent("van-tabs"))()}Math||(o+n+s)();const o=()=>"../../components/mycourse/finishedtask.js",n=()=>"../../components/mycourse/plan.js",s=()=>"../../components/mycourse/onlinetask.js",t=e.defineComponent({__name:"index",setup(o){e.ref("");const n=e.ref(!1),s=o=>{n.value?n.value=!1:e.index.showModal({title:"授权教练打卡",content:"是否授权教练打卡？",confirmText:"确定",cancelText:"取消",success:e=>{e.confirm?(console.log("用户点击确定"),n.value=!0,console.log(n.value)):e.cancel&&(console.log("用户点击取消"),n.value=!1)},fail:e=>{console.error("showModal 调用失败",e)}})};return(o,t)=>({a:e.p({strokeWidth:"8",size:"60",layerColor:"#ebedf0",color:"#ec6853",value:"60",text:"20%"}),b:e.o(s),c:e.p({checked:n.value}),d:e.p({title:"已完成"}),e:e.p({title:"计划表"}),f:e.p({title:"线上任务"}),g:e.p({swipeable:!0,animated:!0})})}}),c=e._export_sfc(t,[["__file","D:/code/vscode project/fitness-wxclient/src/pages/mycourse/index.vue"]]);wx.createPage(c);

"use strict";const o=require("../../common/vendor.js");if(!Array){(o.resolveComponent("van-button")+o.resolveComponent("van-icon")+o.resolveComponent("van-notify"))()}const e=o.defineComponent({__name:"onlinetask",setup:e=>(e,n)=>({a:o.o((e=>(console.log("finish"),void o.index.showModal({title:"日常打卡",content:"是否进行打卡？",confirmText:"确定",cancelText:"取消",success:e=>{e.confirm?o.wx$1.showToast({title:"打卡成功",icon:"success",duration:2e3,mask:!1}):e.cancel&&o.wx$1.showToast({title:"取消打卡",icon:"none",duration:2e3,mask:!1})},fail:o=>{console.error("showModal 调用失败",o)}})))),b:o.p({round:!0,type:"warning"}),c:o.p({name:"todo-list-o",size:"25"}),d:o.p({name:"clock-o",size:"25"}),e:o.p({id:"van-notify"})})}),n=o._export_sfc(e,[["__scopeId","data-v-79775cbe"],["__file","D:/code/vscode project/fitness-wxclient/src/components/mycourse/onlinetask.vue"]]);wx.createComponent(n);

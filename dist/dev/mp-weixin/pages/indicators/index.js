"use strict";const e=require("../../common/vendor.js"),t=require("../../state/app.js");if(!Array){(e.resolveComponent("van-button")+e.resolveComponent("van-cell-group"))()}Math||n();const n=()=>"../../components/echart/try.js",o=e.defineComponent({__name:"index",setup(n){const o=e.ref(!0),r=e.ref(0),a=e.ref(""),i=t.useAppStore(),l=e.ref(i.getCurrentDate),c=e=>{l.value=e.detail.value},u=[{title:"体重",content:"Content1"},{title:"三围",content:"Content2"},{title:"体脂率",content:"Content3"},{title:"BMI",content:"Content4"},{title:"基础代谢",content:"Content5"},{title:"三视图   ",content:"Content6"}];function s(t){const n=t.currentTarget.dataset.id;r.value=parseInt(n),e.index.$emit("changeType",t.currentTarget.dataset.id)}function p(){o.value=!0}function d(){o.value=!1}return(t,n)=>({a:e.f(u,((t,n,o)=>({a:e.t(t.title),b:e.n(n==r.value?"text-_hFF5E3A_ cur":""),c:n,d:e.o(s,n),e:n}))),b:e.o(p),c:e.p({size:"large",type:"primary",round:!0,color:"linear-gradient(90deg, #FF6243 0%, #FF0072 100%)"}),d:e.o(d),e:a.value,f:e.o((e=>a.value=e.detail.value)),g:e.t(l.value),h:l.value,i:e.o(c),j:e.o(p),k:e.p({size:"large",type:"primary",round:!0,color:"linear-gradient(90deg, #FF6243 0%, #FF0072 100%)"}),l:e.p({inset:!0}),m:e.n(o.value?"show":"")})}}),r=e._export_sfc(o,[["__file","J:/外包/wx-fitness/src/pages/indicators/index.vue"]]);wx.createPage(r);

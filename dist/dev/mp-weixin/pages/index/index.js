"use strict";const e=require("../../common/vendor.js"),s=require("../../state/app.js");if(require("../../utils/request.js"),!Array){(e.resolveComponent("van-search")+e.resolveComponent("van-tab")+e.resolveComponent("van-tabs"))()}Math||(a+t)();const a=()=>"../../components/index/tab-buycourse.js",t=()=>"../../components/index/tab-mycourse.js",o=e.defineComponent({__name:"index",setup(a){e.H(),s.useAppStore(),e.ref("Tailwind CSS"),e.ref(!1);const t=e.ref(""),o=()=>{},n=()=>{};function r(){console.log(t.value,"我搜索了")}return(s,a)=>({a:e.o(o),b:e.o(n),c:e.o((e=>t.value=e)),d:e.p({placeholder:"请输入搜索关键词",modelValue:t.value}),e:e.o(r),f:e.p({title:"购买课程"}),g:e.p({title:"我的课程"}),h:e.o((e=>s.active=e)),i:e.p({navClass:"my-nav-class",tabClass:"my-tab-class",tabActiveClass:"my-tab-active-class",swipeable:!0,animated:!0,border:"false",color:"#ec6853",type:"card",active:s.active})})}}),n=e._export_sfc(o,[["__file","J:/外包/wx-fitness/src/pages/index/index.vue"]]);wx.createComponent(n);

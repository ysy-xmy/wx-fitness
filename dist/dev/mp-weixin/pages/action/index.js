"use strict";const e=require("../../common/vendor.js"),a=require("../../api/action/action.js");if(require("../../utils/request.js"),!Array){(e.resolveComponent("cu-custom")+e.resolveComponent("van-icon")+e.resolveComponent("van-empty"))()}const r=e.defineComponent({__name:"index",setup(r){function n(e){const a=(e,a)=>e.OrderNum!==a.OrderNum?a.OrderNum-e.OrderNum:a.id-e.id,r=e=>e.map((e=>({...e,children:r(e.children)}))).sort(a);return e.map((e=>({...e,children:r(e.children)}))).sort(a)}const i=e.ref([{name:"A",id:0,OrderNum:1,children:[]},{name:"B",id:1,OrderNum:2,children:[]},{name:"C",id:2,OrderNum:3,children:[]},{name:"D",id:3,OrderNum:4,children:[]}]);i.value=n(i.value);const l=e.ref([]),t=e.ref([]);e.ref([]);const d=e.ref(0),u=e.ref(0),c=e.ref(0),o=e.ref(!0);e.ref(i.value[0]),e.onMounted((()=>{e.index.showLoading({title:"加载中...",mask:!0}),a.getFirstmenulist().then((e=>{for(let r of e.data.data){let e={name:r.Name,id:r.ID,OrderNum:r.OrderNum,children:[]};l.value.push(e)}const a=n(l.value);l.value=a,v(l.value[0])})),e.nextTick$1((()=>{e.index.hideLoading()}))}));const v=r=>{var i=r.id;r.children.length>0?m(r):(e.index.showLoading({title:"加载中...",mask:!0}),a.getSecByFirst(i).then((a=>{a.data.data.length>0&&(l.value.find((e=>e.id===i)).children=a.data.data.map((e=>({id:e.ID,name:e.Name,OrderNum:e.OrderNum,children:[],active:!1})))),m(r),l.value=n(l.value),e.index.hideLoading()})).finally((()=>{e.index.hideLoading()})))},m=e=>{let a=[];e.children&&(e.children.length>0?(e.children.forEach((e=>{let r={name:e.name,id:e.id,OrderNum:e.OrderNum,children:[]};a.push(r)})),t.value=n(a)):(a=[],t.value=a))},s=async e=>{const a=e.currentTarget.dataset.id;d.value=a,u.value=a,c.value=50*(a-1),v(l.value[a])},h=a=>{if(o.value){let a=0;i.value.forEach(((r,n)=>{e.index.createSelectorQuery().select(`#main-${r.id}`).fields({size:!0},(e=>{i.value[n].top=a,a+=e.height,i.value[n].bottom=a})).exec()})),o.value=!1}const r=a.detail.scrollTop+10;i.value.forEach((e=>{if(r>e.top&&r<e.bottom)return c.value=50*(e.id-1),d.value=e.id,console.log(r),!1}))};return(a,r)=>e.e({a:e.p({isBack:!1,bgColor:"bg-shadeTop text-white"}),b:e.f(l.value,((a,r,n)=>({a:e.t(a.name),b:e.n(r==d.value?"text-_hec6853_ cur":""),c:r,d:e.o(s,r),e:r}))),c:c.value,d:t.value.length>0},t.value.length>0?{e:e.f(t.value,((a,r,n)=>e.e({a:e.t(a.name),b:l.value[u.value].children[r].active,c:"45c78b23-1-"+n,d:!l.value[u.value].children[r].active,e:"45c78b23-2-"+n,f:e.o((e=>{return a=r,l.value[u.value].children[a].active=!l.value[u.value].children[a].active,void console.log(l.value[u.value].children[a].active);var a}),r),g:l.value[u.value].children[r].active},(l.value[u.value].children[r].active,{}),{h:r,i:"main-"+r}))),f:e.p({name:"arrow-down"}),g:e.p({name:"arrow-up"})}:{h:e.p({description:"没有数据"})},{i:"main-"+u.value,j:e.o(h)})}}),n=e._export_sfc(r,[["__file","J:/外包/wx-fitness/src/pages/action/index.vue"]]);wx.createComponent(n);

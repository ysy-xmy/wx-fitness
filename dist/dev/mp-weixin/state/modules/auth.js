"use strict";const e=require("../../common/vendor.js").defineStore({id:"auth",state:()=>({token:void 0,user:{}}),getters:{isLogin(){return void 0!==this.token}},actions:{}});exports.useAuthStore=e;

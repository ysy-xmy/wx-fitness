"use strict";
const e = require("../common/vendor.js"),
  a = require("./Routeinterception.js"),
  s = e._({
    routes: [
      {
        meta: { islogin: !1 },
        path: "/pages/home/index",
        aliasPath: "/",
        name: "home",
      },
      { meta: { islogin: !0 }, path: "/pages/course/index", name: "course" },
      {
        meta: { islogin: !1 },
        path: "/subpackages/studentDetail/index",
        name: "studentDetail",
      },
      {
        meta: { islogin: !1 },
        path: "/subpackages/searchStu/index",
        name: "searchStu",
      },
      {
        meta: { islogin: !0 },
        path: "/subpackages/coursePurchase/index",
        name: "buyCourse",
      },
      {
        meta: { islogin: !1 },
        path: "/subpackages/indicators/index",
        name: "indicators",
      },
      {
        meta: { islogin: !1 },
        path: "/subpackages/orderRecord/index",
        name: "orderRecord",
      },
      {
        meta: { islogin: !0 },
        path: "/subpackages/exitinfo/index",
        name: "info",
      },
      {
        meta: { islogin: !1 },
        path: "/subpackages/mycourse/index",
        name: "mycourse",
      },
      {
        meta: { islogin: !1 },
        path: "/subpackages/coachcontact/index",
        name: "contact",
      },
      { meta: { islogin: !0 }, path: "/subpackages/wode/index", name: "wode" },
    ],
  });
a.userRouternext(s), (exports.router = s);

"use strict";
const e = require("../state/modules/auth.js"),
  o = [
    "login",
    "wode",
    "home",
    "index",
    "course",
    "contact",
    "mycourse",
    "info",
    "orderRecord",
    "indicators",
    "buyCourse",
    "coachHome",
    "studentDetail",
    "searchStu",
  ];
exports.userRouternext = function (n) {
  n.beforeEach((n, s, t) => {
    e.useAuthStore().isLogin || o.includes(n.name) ? t() : t({ name: "login" });
  }),
    n.afterEach((s) => {
      const t = e.useAuthStore();
      console.log("我先执行还是他先执行"),
        !t.isLogin && s && "login" !== s.name
          ? o.includes(s.name) ||
            n.push({ name: "login", params: { ...s.query } })
          : t.isLogin &&
            s &&
            "login" === s.name &&
            n.replaceAll({ name: "home" });
    });
};

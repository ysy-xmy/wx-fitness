"use strict";
const a = require("../../common/vendor.js"),
  e = require("../../state/app.js"),
  t = require("../../tabbar/index.js");
if (!Array) {
  (a.resolveComponent("van-tabbar-item") + a.resolveComponent("van-tabbar"))();
}
Math || (b + n + r)();
const n = () => "../../components/action/index.js",
  r = () => "../../components/mine/index.js",
  b = () => "../../components/coachHome/index.js",
  i = a.defineComponent({
    __name: "index",
    setup(n) {
      const r = e.useAppStore(),
        b = (a) => {
          r.setactive(a.detail);
        };
      return (e, n) =>
        a.e(
          {
            a: "index" === a.unref(r).active,
            b: "action" === a.unref(r).active,
            c: "mine" === a.unref(r).active,
            d: a.unref(r).active == a.unref(t.tabbardata)[0].name,
          },
          a.unref(r).active == a.unref(t.tabbardata)[0].name
            ? {
                e: a.t(a.unref(t.tabbardata)[0].title),
                f: a.unref(t.tabbardata)[0].textactivecolor,
                g: a.unref(t.tabbardata)[0].activeicon,
                h: a.p({ name: a.unref(t.tabbardata)[0].name }),
              }
            : {
                i: a.t(a.unref(t.tabbardata)[0].title),
                j: a.unref(t.tabbardata)[0].textcolor,
                k: a.unref(t.tabbardata)[0].inactiveicon,
                l: a.p({ name: a.unref(t.tabbardata)[0].name }),
              },
          { m: a.unref(r).active == a.unref(t.tabbardata)[1].name },
          a.unref(r).active == a.unref(t.tabbardata)[1].name
            ? {
                n: a.t(a.unref(t.tabbardata)[1].title),
                o: a.unref(t.tabbardata)[1].textactivecolor,
                p: a.unref(t.tabbardata)[1].activeicon,
                q: a.p({ name: a.unref(t.tabbardata)[1].name }),
              }
            : {
                r: a.t(a.unref(t.tabbardata)[1].title),
                s: a.unref(t.tabbardata)[1].textcolor,
                t: a.unref(t.tabbardata)[1].inactiveicon,
                v: a.p({ name: a.unref(t.tabbardata)[1].name }),
              },
          { w: a.unref(r).active == a.unref(t.tabbardata)[2].name },
          a.unref(r).active == a.unref(t.tabbardata)[2].name
            ? {
                x: a.t(a.unref(t.tabbardata)[2].title),
                y: a.unref(t.tabbardata)[2].textactivecolor,
                z: a.unref(t.tabbardata)[2].activeicon,
                A: a.p({ name: a.unref(t.tabbardata)[2].name }),
              }
            : {
                B: a.t(a.unref(t.tabbardata)[2].title),
                C: a.unref(t.tabbardata)[2].textcolor,
                D: a.unref(t.tabbardata)[2].inactiveicon,
                E: a.p({ name: a.unref(t.tabbardata)[2].name }),
              },
          {
            F: a.o(b),
            G: a.o((e) => (a.unref(r).getcurrentactive = e)),
            H: a.p({
              placeholder: !0,
              modelValue: a.unref(r).getcurrentactive,
            }),
          }
        );
    },
  }),
  c = a._export_sfc(i, [
    [
      "__file",
      "D:/code/vscode project/fitness-wxclient/src/pages/home/index.vue",
    ],
  ]);
wx.createPage(c);

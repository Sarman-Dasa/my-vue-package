import { ref as a, openBlock as l, createElementBlock as r, Fragment as p, createElementVNode as c, toDisplayString as i, createCommentVNode as m, nextTick as _, defineComponent as d, createBlock as k } from "vue";
const f = (t, e) => {
  const o = t.__vccOpts || t;
  for (const [n, s] of e)
    o[n] = s;
  return o;
}, h = { class: "card" }, y = {
  key: 0,
  class: "read-the-docs"
}, g = {
  __name: "HelloWorld",
  props: {
    msg: String
  },
  setup(t) {
    const e = a(!1), o = a(0);
    async function n() {
      o.value += 1, await _(), e.value = !e.value;
    }
    return (s, u) => (l(), r(p, null, [
      c("h1", null, i(t.msg), 1),
      c("div", h, [
        c("button", {
          type: "button",
          onClick: n
        }, " count is " + i(o.value), 1)
      ]),
      e.value ? (l(), r("p", y, " Toggle component ")) : m("", !0)
    ], 64));
  }
}, v = /* @__PURE__ */ f(g, [["__scopeId", "data-v-5c984370"]]), C = { class: "my-component" }, b = /* @__PURE__ */ d({
  __name: "MyComponent",
  props: {
    isShow: {
      type: Boolean,
      required: !0,
      default: !0
    }
  },
  emits: ["componentClick"],
  setup(t, { emit: e }) {
    const o = e, n = a("Hello from MyComponent!"), s = () => {
      console.log("click from package!!"), o("componentClick");
    };
    return (u, x) => (l(), r("div", C, [
      c("h2", null, i(n.value), 1),
      c("button", {
        class: "my-component-button",
        onClick: s
      }, "Click Me!"),
      t.isShow ? (l(), k(v, { key: 0 })) : m("", !0)
    ]));
  }
});
export {
  v as HelloWorld,
  b as MyComponent
};

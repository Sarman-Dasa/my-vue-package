import { defineComponent as s, ref as l, openBlock as _, createElementBlock as a, createElementVNode as r, toDisplayString as p } from "vue";
const m = { class: "my-component" }, i = /* @__PURE__ */ s({
  __name: "MyComponent",
  setup(o) {
    const t = l("Hello from MyComponent!"), e = () => {
      alert("Button Clicked!");
    };
    return (n, c) => (_(), a("div", m, [
      r("h2", null, p(t.value), 1),
      r("button", { onClick: e }, "Click Me!")
    ]));
  }
}), d = (o, t) => {
  const e = o.__vccOpts || o;
  for (const [n, c] of t)
    e[n] = c;
  return e;
}, f = /* @__PURE__ */ d(i, [["__scopeId", "data-v-49cd35de"]]);
export {
  f as MyComponent
};

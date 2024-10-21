/**
* @vue/shared v3.5.12
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function vn(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const C = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, bn = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], ne = () => {
}, Nn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), V = Object.assign, wn = Object.prototype.hasOwnProperty, v = (e, t) => wn.call(e, t), m = Array.isArray, q = (e) => He(e) === "[object Map]", Ct = (e) => He(e) === "[object Set]", N = (e) => typeof e == "function", I = (e) => typeof e == "string", X = (e) => typeof e == "symbol", O = (e) => e !== null && typeof e == "object", On = (e) => (O(e) || N(e)) && N(e.then) && N(e.catch), Tt = Object.prototype.toString, He = (e) => Tt.call(e), It = (e) => He(e).slice(8, -1), $t = (e) => He(e) === "[object Object]", ot = (e) => I(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Pt = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Mt = Pt((e) => e.charAt(0).toUpperCase() + e.slice(1)), Sn = Pt(
  (e) => e ? `on${Mt(e)}` : ""
), z = (e, t) => !Object.is(e, t), yn = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
};
let Nt;
const Fe = () => Nt || (Nt = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function it(e) {
  if (m(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = I(s) ? Rn(s) : it(s);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else if (I(e) || O(e))
    return e;
}
const xn = /;(?![^(]*\))/g, Dn = /:([^]+)/, Vn = /\/\*[^]*?\*\//g;
function Rn(e) {
  const t = {};
  return e.replace(Vn, "").split(xn).forEach((n) => {
    if (n) {
      const s = n.split(Dn);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function ct(e) {
  let t = "";
  if (I(e))
    t = e;
  else if (m(e))
    for (let n = 0; n < e.length; n++) {
      const s = ct(e[n]);
      s && (t += s + " ");
    }
  else if (O(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const At = (e) => !!(e && e.__v_isRef === !0), xe = (e) => I(e) ? e : e == null ? "" : m(e) || O(e) && (e.toString === Tt || !N(e.toString)) ? At(e) ? xe(e.value) : JSON.stringify(e, Ht, 2) : String(e), Ht = (e, t) => At(t) ? Ht(e, t.value) : q(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, r], o) => (n[Ke(s, o) + " =>"] = r, n),
    {}
  )
} : Ct(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Ke(n))
} : X(t) ? Ke(t) : O(t) && !m(t) && !$t(t) ? String(t) : t, Ke = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    X(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.12
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function B(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let g;
const Le = /* @__PURE__ */ new WeakSet();
class Cn {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0;
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Le.has(this) && (Le.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Tn(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, wt(this), jt(this);
    const t = g, n = P;
    g = this, P = !0;
    try {
      return this.fn();
    } finally {
      process.env.NODE_ENV !== "production" && g !== this && B(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), Wt(this), g = t, P = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        ut(t);
      this.deps = this.depsTail = void 0, wt(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Le.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Ge(this) && this.run();
  }
  get dirty() {
    return Ge(this);
  }
}
let Ft = 0, ae, ue;
function Tn(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = ue, ue = e;
    return;
  }
  e.next = ae, ae = e;
}
function lt() {
  Ft++;
}
function at() {
  if (--Ft > 0)
    return;
  if (ue) {
    let t = ue;
    for (ue = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; ae; ) {
    let t = ae;
    for (ae = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (s) {
          e || (e = s);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function jt(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Wt(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const r = s.prevDep;
    s.version === -1 ? (s === n && (n = r), ut(s), $n(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = r;
  }
  e.deps = t, e.depsTail = n;
}
function Ge(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (In(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function In(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === De))
    return;
  e.globalVersion = De;
  const t = e.dep;
  if (e.flags |= 2, t.version > 0 && !e.isSSR && e.deps && !Ge(e)) {
    e.flags &= -3;
    return;
  }
  const n = g, s = P;
  g = e, P = !0;
  try {
    jt(e);
    const r = e.fn(e._value);
    (t.version === 0 || z(r, e._value)) && (e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    g = n, P = s, Wt(e), e.flags &= -3;
  }
}
function ut(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: r } = e;
  if (s && (s.nextSub = r, e.prevSub = void 0), r && (r.prevSub = s, e.nextSub = void 0), process.env.NODE_ENV !== "production" && n.subsHead === e && (n.subsHead = r), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let o = n.computed.deps; o; o = o.nextDep)
      ut(o, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function $n(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let P = !0;
const Kt = [];
function _e() {
  Kt.push(P), P = !1;
}
function ge() {
  const e = Kt.pop();
  P = e === void 0 ? !0 : e;
}
function wt(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = g;
    g = void 0;
    try {
      t();
    } finally {
      g = n;
    }
  }
}
let De = 0;
class Pn {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Lt {
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, process.env.NODE_ENV !== "production" && (this.subsHead = void 0);
  }
  track(t) {
    if (!g || !P || g === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== g)
      n = this.activeLink = new Pn(g, this), g.deps ? (n.prevDep = g.depsTail, g.depsTail.nextDep = n, g.depsTail = n) : g.deps = g.depsTail = n, Ut(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = g.depsTail, n.nextDep = void 0, g.depsTail.nextDep = n, g.depsTail = n, g.deps === n && (g.deps = s);
    }
    return process.env.NODE_ENV !== "production" && g.onTrack && g.onTrack(
      V(
        {
          effect: g
        },
        t
      )
    ), n;
  }
  trigger(t) {
    this.version++, De++, this.notify(t);
  }
  notify(t) {
    lt();
    try {
      if (process.env.NODE_ENV !== "production")
        for (let n = this.subsHead; n; n = n.nextSub)
          n.sub.onTrigger && !(n.sub.flags & 8) && n.sub.onTrigger(
            V(
              {
                effect: n.sub
              },
              t
            )
          );
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      at();
    }
  }
}
function Ut(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        Ut(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), process.env.NODE_ENV !== "production" && e.dep.subsHead === void 0 && (e.dep.subsHead = e), e.dep.subs = e;
  }
}
const Qe = /* @__PURE__ */ new WeakMap(), G = Symbol(
  process.env.NODE_ENV !== "production" ? "Object iterate" : ""
), Xe = Symbol(
  process.env.NODE_ENV !== "production" ? "Map keys iterate" : ""
), pe = Symbol(
  process.env.NODE_ENV !== "production" ? "Array iterate" : ""
);
function w(e, t, n) {
  if (P && g) {
    let s = Qe.get(e);
    s || Qe.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || (s.set(n, r = new Lt()), r.map = s, r.key = n), process.env.NODE_ENV !== "production" ? r.track({
      target: e,
      type: t,
      key: n
    }) : r.track();
  }
}
function K(e, t, n, s, r, o) {
  const i = Qe.get(e);
  if (!i) {
    De++;
    return;
  }
  const c = (a) => {
    a && (process.env.NODE_ENV !== "production" ? a.trigger({
      target: e,
      type: t,
      key: n,
      newValue: s,
      oldValue: r,
      oldTarget: o
    }) : a.trigger());
  };
  if (lt(), t === "clear")
    i.forEach(c);
  else {
    const a = m(e), f = a && ot(n);
    if (a && n === "length") {
      const d = Number(s);
      i.forEach((l, u) => {
        (u === "length" || u === pe || !X(u) && u >= d) && c(l);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && c(i.get(n)), f && c(i.get(pe)), t) {
        case "add":
          a ? f && c(i.get("length")) : (c(i.get(G)), q(e) && c(i.get(Xe)));
          break;
        case "delete":
          a || (c(i.get(G)), q(e) && c(i.get(Xe)));
          break;
        case "set":
          q(e) && c(i.get(G));
          break;
      }
  }
  at();
}
function k(e) {
  const t = h(e);
  return t === e ? t : (w(t, "iterate", pe), D(e) ? t : t.map(y));
}
function ft(e) {
  return w(e = h(e), "iterate", pe), e;
}
const Mn = {
  __proto__: null,
  [Symbol.iterator]() {
    return Ue(this, Symbol.iterator, y);
  },
  concat(...e) {
    return k(this).concat(
      ...e.map((t) => m(t) ? k(t) : t)
    );
  },
  entries() {
    return Ue(this, "entries", (e) => (e[1] = y(e[1]), e));
  },
  every(e, t) {
    return A(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return A(this, "filter", e, t, (n) => n.map(y), arguments);
  },
  find(e, t) {
    return A(this, "find", e, t, y, arguments);
  },
  findIndex(e, t) {
    return A(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return A(this, "findLast", e, t, y, arguments);
  },
  findLastIndex(e, t) {
    return A(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return A(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return ze(this, "includes", e);
  },
  indexOf(...e) {
    return ze(this, "indexOf", e);
  },
  join(e) {
    return k(this).join(e);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...e) {
    return ze(this, "lastIndexOf", e);
  },
  map(e, t) {
    return A(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return ce(this, "pop");
  },
  push(...e) {
    return ce(this, "push", e);
  },
  reduce(e, ...t) {
    return Ot(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Ot(this, "reduceRight", e, t);
  },
  shift() {
    return ce(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return A(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return ce(this, "splice", e);
  },
  toReversed() {
    return k(this).toReversed();
  },
  toSorted(e) {
    return k(this).toSorted(e);
  },
  toSpliced(...e) {
    return k(this).toSpliced(...e);
  },
  unshift(...e) {
    return ce(this, "unshift", e);
  },
  values() {
    return Ue(this, "values", y);
  }
};
function Ue(e, t, n) {
  const s = ft(e), r = s[t]();
  return s !== e && !D(e) && (r._next = r.next, r.next = () => {
    const o = r._next();
    return o.value && (o.value = n(o.value)), o;
  }), r;
}
const An = Array.prototype;
function A(e, t, n, s, r, o) {
  const i = ft(e), c = i !== e && !D(e), a = i[t];
  if (a !== An[t]) {
    const l = a.apply(e, o);
    return c ? y(l) : l;
  }
  let f = n;
  i !== e && (c ? f = function(l, u) {
    return n.call(this, y(l), u, e);
  } : n.length > 2 && (f = function(l, u) {
    return n.call(this, l, u, e);
  }));
  const d = a.call(i, f, s);
  return c && r ? r(d) : d;
}
function Ot(e, t, n, s) {
  const r = ft(e);
  let o = n;
  return r !== e && (D(e) ? n.length > 3 && (o = function(i, c, a) {
    return n.call(this, i, c, a, e);
  }) : o = function(i, c, a) {
    return n.call(this, i, y(c), a, e);
  }), r[t](o, ...s);
}
function ze(e, t, n) {
  const s = h(e);
  w(s, "iterate", pe);
  const r = s[t](...n);
  return (r === -1 || r === !1) && Ve(n[0]) ? (n[0] = h(n[0]), s[t](...n)) : r;
}
function ce(e, t, n = []) {
  _e(), lt();
  const s = h(e)[t].apply(e, n);
  return at(), ge(), s;
}
const Hn = /* @__PURE__ */ vn("__proto__,__v_isRef,__isVue"), zt = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(X)
);
function Fn(e) {
  X(e) || (e = String(e));
  const t = h(this);
  return w(t, "has", e), t.hasOwnProperty(e);
}
class Bt {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, s) {
    const r = this._isReadonly, o = this._isShallow;
    if (n === "__v_isReactive")
      return !r;
    if (n === "__v_isReadonly")
      return r;
    if (n === "__v_isShallow")
      return o;
    if (n === "__v_raw")
      return s === (r ? o ? Gt : qt : o ? qn : Yt).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const i = m(t);
    if (!r) {
      let a;
      if (i && (a = Mn[n]))
        return a;
      if (n === "hasOwnProperty")
        return Fn;
    }
    const c = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      x(t) ? t : s
    );
    return (X(n) ? zt.has(n) : Hn(n)) || (r || w(t, "get", n), o) ? c : x(c) ? i && ot(n) ? c : c.value : O(c) ? r ? Xt(c) : Qt(c) : c;
  }
}
class jn extends Bt {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let o = t[n];
    if (!this._isShallow) {
      const a = j(o);
      if (!D(s) && !j(s) && (o = h(o), s = h(s)), !m(t) && x(o) && !x(s))
        return a ? !1 : (o.value = s, !0);
    }
    const i = m(t) && ot(n) ? Number(n) < t.length : v(t, n), c = Reflect.set(
      t,
      n,
      s,
      x(t) ? t : r
    );
    return t === h(r) && (i ? z(s, o) && K(t, "set", n, s, o) : K(t, "add", n, s)), c;
  }
  deleteProperty(t, n) {
    const s = v(t, n), r = t[n], o = Reflect.deleteProperty(t, n);
    return o && s && K(t, "delete", n, void 0, r), o;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!X(n) || !zt.has(n)) && w(t, "has", n), s;
  }
  ownKeys(t) {
    return w(
      t,
      "iterate",
      m(t) ? "length" : G
    ), Reflect.ownKeys(t);
  }
}
class Jt extends Bt {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return process.env.NODE_ENV !== "production" && B(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return process.env.NODE_ENV !== "production" && B(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const Wn = /* @__PURE__ */ new jn(), Kn = /* @__PURE__ */ new Jt(), Ln = /* @__PURE__ */ new Jt(!0), Ze = (e) => e, ve = (e) => Reflect.getPrototypeOf(e);
function Un(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, o = h(r), i = q(o), c = e === "entries" || e === Symbol.iterator && i, a = e === "keys" && i, f = r[e](...s), d = n ? Ze : t ? ke : y;
    return !t && w(
      o,
      "iterate",
      a ? Xe : G
    ), {
      // iterator protocol
      next() {
        const { value: l, done: u } = f.next();
        return u ? { value: l, done: u } : {
          value: c ? [d(l[0]), d(l[1])] : d(l),
          done: u
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function be(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      B(
        `${Mt(e)} operation ${n}failed: target is readonly.`,
        h(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function zn(e, t) {
  const n = {
    get(r) {
      const o = this.__v_raw, i = h(o), c = h(r);
      e || (z(r, c) && w(i, "get", r), w(i, "get", c));
      const { has: a } = ve(i), f = t ? Ze : e ? ke : y;
      if (a.call(i, r))
        return f(o.get(r));
      if (a.call(i, c))
        return f(o.get(c));
      o !== i && o.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && w(h(r), "iterate", G), Reflect.get(r, "size", r);
    },
    has(r) {
      const o = this.__v_raw, i = h(o), c = h(r);
      return e || (z(r, c) && w(i, "has", r), w(i, "has", c)), r === c ? o.has(r) : o.has(r) || o.has(c);
    },
    forEach(r, o) {
      const i = this, c = i.__v_raw, a = h(c), f = t ? Ze : e ? ke : y;
      return !e && w(a, "iterate", G), c.forEach((d, l) => r.call(o, f(d), f(l), i));
    }
  };
  return V(
    n,
    e ? {
      add: be("add"),
      set: be("set"),
      delete: be("delete"),
      clear: be("clear")
    } : {
      add(r) {
        !t && !D(r) && !j(r) && (r = h(r));
        const o = h(this);
        return ve(o).has.call(o, r) || (o.add(r), K(o, "add", r, r)), this;
      },
      set(r, o) {
        !t && !D(o) && !j(o) && (o = h(o));
        const i = h(this), { has: c, get: a } = ve(i);
        let f = c.call(i, r);
        f ? process.env.NODE_ENV !== "production" && St(i, c, r) : (r = h(r), f = c.call(i, r));
        const d = a.call(i, r);
        return i.set(r, o), f ? z(o, d) && K(i, "set", r, o, d) : K(i, "add", r, o), this;
      },
      delete(r) {
        const o = h(this), { has: i, get: c } = ve(o);
        let a = i.call(o, r);
        a ? process.env.NODE_ENV !== "production" && St(o, i, r) : (r = h(r), a = i.call(o, r));
        const f = c ? c.call(o, r) : void 0, d = o.delete(r);
        return a && K(o, "delete", r, void 0, f), d;
      },
      clear() {
        const r = h(this), o = r.size !== 0, i = process.env.NODE_ENV !== "production" ? q(r) ? new Map(r) : new Set(r) : void 0, c = r.clear();
        return o && K(
          r,
          "clear",
          void 0,
          void 0,
          i
        ), c;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((r) => {
    n[r] = Un(r, e, t);
  }), n;
}
function pt(e, t) {
  const n = zn(e, t);
  return (s, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(
    v(n, r) && r in s ? n : s,
    r,
    o
  );
}
const Bn = {
  get: /* @__PURE__ */ pt(!1, !1)
}, Jn = {
  get: /* @__PURE__ */ pt(!0, !1)
}, Yn = {
  get: /* @__PURE__ */ pt(!0, !0)
};
function St(e, t, n) {
  const s = h(n);
  if (s !== n && t.call(e, s)) {
    const r = It(e);
    B(
      `Reactive ${r} contains both the raw and reactive versions of the same object${r === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const Yt = /* @__PURE__ */ new WeakMap(), qn = /* @__PURE__ */ new WeakMap(), qt = /* @__PURE__ */ new WeakMap(), Gt = /* @__PURE__ */ new WeakMap();
function Gn(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Qn(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Gn(It(e));
}
function Qt(e) {
  return j(e) ? e : dt(
    e,
    !1,
    Wn,
    Bn,
    Yt
  );
}
function Xt(e) {
  return dt(
    e,
    !0,
    Kn,
    Jn,
    qt
  );
}
function Ne(e) {
  return dt(
    e,
    !0,
    Ln,
    Yn,
    Gt
  );
}
function dt(e, t, n, s, r) {
  if (!O(e))
    return process.env.NODE_ENV !== "production" && B(
      `value cannot be made ${t ? "readonly" : "reactive"}: ${String(
        e
      )}`
    ), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = r.get(e);
  if (o)
    return o;
  const i = Qn(e);
  if (i === 0)
    return e;
  const c = new Proxy(
    e,
    i === 2 ? s : n
  );
  return r.set(e, c), c;
}
function re(e) {
  return j(e) ? re(e.__v_raw) : !!(e && e.__v_isReactive);
}
function j(e) {
  return !!(e && e.__v_isReadonly);
}
function D(e) {
  return !!(e && e.__v_isShallow);
}
function Ve(e) {
  return e ? !!e.__v_raw : !1;
}
function h(e) {
  const t = e && e.__v_raw;
  return t ? h(t) : e;
}
function Xn(e) {
  return !v(e, "__v_skip") && Object.isExtensible(e) && yn(e, "__v_skip", !0), e;
}
const y = (e) => O(e) ? Qt(e) : e, ke = (e) => O(e) ? Xt(e) : e;
function x(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function Re(e) {
  return Zn(e, !1);
}
function Zn(e, t) {
  return x(e) ? e : new kn(e, t);
}
class kn {
  constructor(t, n) {
    this.dep = new Lt(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : h(t), this._value = n ? t : y(t), this.__v_isShallow = n;
  }
  get value() {
    return process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || D(t) || j(t);
    t = s ? t : h(t), z(t, n) && (this._rawValue = t, this._value = s ? t : y(t), process.env.NODE_ENV !== "production" ? this.dep.trigger({
      target: this,
      type: "set",
      key: "value",
      newValue: t,
      oldValue: n
    }) : this.dep.trigger());
  }
}
function er(e) {
  return x(e) ? e.value : e;
}
const tr = {
  get: (e, t, n) => t === "__v_raw" ? e : er(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return x(r) && !x(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function nr(e) {
  return re(e) ? e : new Proxy(e, tr);
}
const we = {}, Ce = /* @__PURE__ */ new WeakMap();
let Y;
function rr(e, t = !1, n = Y) {
  if (n) {
    let s = Ce.get(n);
    s || Ce.set(n, s = []), s.push(e);
  } else process.env.NODE_ENV !== "production" && !t && B(
    "onWatcherCleanup() was called when there was no active watcher to associate with."
  );
}
function sr(e, t, n = C) {
  const { immediate: s, deep: r, once: o, scheduler: i, augmentJob: c, call: a } = n, f = (_) => {
    (n.onWarn || B)(
      "Invalid watch source: ",
      _,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, d = (_) => r ? _ : D(_) || r === !1 || r === 0 ? L(_, 1) : L(_);
  let l, u, p, b, R = !1, me = !1;
  if (x(e) ? (u = () => e.value, R = D(e)) : re(e) ? (u = () => d(e), R = !0) : m(e) ? (me = !0, R = e.some((_) => re(_) || D(_)), u = () => e.map((_) => {
    if (x(_))
      return _.value;
    if (re(_))
      return d(_);
    if (N(_))
      return a ? a(_, 2) : _();
    process.env.NODE_ENV !== "production" && f(_);
  })) : N(e) ? t ? u = a ? () => a(e, 2) : e : u = () => {
    if (p) {
      _e();
      try {
        p();
      } finally {
        ge();
      }
    }
    const _ = Y;
    Y = l;
    try {
      return a ? a(e, 3, [b]) : e(b);
    } finally {
      Y = _;
    }
  } : (u = ne, process.env.NODE_ENV !== "production" && f(e)), t && r) {
    const _ = u, M = r === !0 ? 1 / 0 : r;
    u = () => L(_(), M);
  }
  const Z = () => {
    l.stop();
  };
  if (o && t) {
    const _ = t;
    t = (...M) => {
      _(...M), Z();
    };
  }
  let J = me ? new Array(e.length).fill(we) : we;
  const ie = (_) => {
    if (!(!(l.flags & 1) || !l.dirty && !_))
      if (t) {
        const M = l.run();
        if (r || R || (me ? M.some((We, Ee) => z(We, J[Ee])) : z(M, J))) {
          p && p();
          const We = Y;
          Y = l;
          try {
            const Ee = [
              M,
              // pass undefined as the old value when it's changed for the first time
              J === we ? void 0 : me && J[0] === we ? [] : J,
              b
            ];
            a ? a(t, 3, Ee) : (
              // @ts-expect-error
              t(...Ee)
            ), J = M;
          } finally {
            Y = We;
          }
        }
      } else
        l.run();
  };
  return c && c(ie), l = new Cn(u), l.scheduler = i ? () => i(ie, !1) : ie, b = (_) => rr(_, !1, l), p = l.onStop = () => {
    const _ = Ce.get(l);
    if (_) {
      if (a)
        a(_, 4);
      else
        for (const M of _) M();
      Ce.delete(l);
    }
  }, process.env.NODE_ENV !== "production" && (l.onTrack = n.onTrack, l.onTrigger = n.onTrigger), t ? s ? ie(!0) : J = l.run() : i ? i(ie.bind(null, !0), !0) : l.run(), Z.pause = l.pause.bind(l), Z.resume = l.resume.bind(l), Z.stop = Z, Z;
}
function L(e, t = 1 / 0, n) {
  if (t <= 0 || !O(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(e)))
    return e;
  if (n.add(e), t--, x(e))
    L(e.value, t, n);
  else if (m(e))
    for (let s = 0; s < e.length; s++)
      L(e[s], t, n);
  else if (Ct(e) || q(e))
    e.forEach((s) => {
      L(s, t, n);
    });
  else if ($t(e)) {
    for (const s in e)
      L(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && L(e[s], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.12
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const Q = [];
function or(e) {
  Q.push(e);
}
function ir() {
  Q.pop();
}
let Be = !1;
function E(e, ...t) {
  if (Be) return;
  Be = !0, _e();
  const n = Q.length ? Q[Q.length - 1].component : null, s = n && n.appContext.config.warnHandler, r = cr();
  if (s)
    je(
      s,
      n,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        e + t.map((o) => {
          var i, c;
          return (c = (i = o.toString) == null ? void 0 : i.call(o)) != null ? c : JSON.stringify(o);
        }).join(""),
        n && n.proxy,
        r.map(
          ({ vnode: o }) => `at <${mn(n, o.type)}>`
        ).join(`
`),
        r
      ]
    );
  else {
    const o = [`[Vue warn]: ${e}`, ...t];
    r.length && o.push(`
`, ...lr(r)), console.warn(...o);
  }
  ge(), Be = !1;
}
function cr() {
  let e = Q[Q.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const s = e.component && e.component.parent;
    e = s && s.vnode;
  }
  return t;
}
function lr(e) {
  const t = [];
  return e.forEach((n, s) => {
    t.push(...s === 0 ? [] : [`
`], ...ar(n));
  }), t;
}
function ar({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", s = e.component ? e.component.parent == null : !1, r = ` at <${mn(
    e.component,
    e.type,
    s
  )}`, o = ">" + n;
  return e.props ? [r, ...ur(e.props), o] : [r + o];
}
function ur(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((s) => {
    t.push(...Zt(s, e[s]));
  }), n.length > 3 && t.push(" ..."), t;
}
function Zt(e, t, n) {
  return I(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : x(t) ? (t = Zt(e, h(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : N(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = h(t), n ? t : [`${e}=`, t]);
}
const ht = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  0: "setup function",
  1: "render function",
  2: "watcher getter",
  3: "watcher callback",
  4: "watcher cleanup function",
  5: "native event handler",
  6: "component event handler",
  7: "vnode hook",
  8: "directive hook",
  9: "transition hook",
  10: "app errorHandler",
  11: "app warnHandler",
  12: "ref function",
  13: "async component loader",
  14: "scheduler flush",
  15: "component update",
  16: "app unmount cleanup function"
};
function je(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (r) {
    gt(r, t, n);
  }
}
function _t(e, t, n, s) {
  if (N(e)) {
    const r = je(e, t, n, s);
    return r && On(r) && r.catch((o) => {
      gt(o, t, n);
    }), r;
  }
  if (m(e)) {
    const r = [];
    for (let o = 0; o < e.length; o++)
      r.push(_t(e[o], t, n, s));
    return r;
  } else process.env.NODE_ENV !== "production" && E(
    `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof e}`
  );
}
function gt(e, t, n, s = !0) {
  const r = t ? t.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: i } = t && t.appContext.config || C;
  if (t) {
    let c = t.parent;
    const a = t.proxy, f = process.env.NODE_ENV !== "production" ? ht[n] : `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; c; ) {
      const d = c.ec;
      if (d) {
        for (let l = 0; l < d.length; l++)
          if (d[l](e, a, f) === !1)
            return;
      }
      c = c.parent;
    }
    if (o) {
      _e(), je(o, null, 10, [
        e,
        a,
        f
      ]), ge();
      return;
    }
  }
  fr(e, n, r, s, i);
}
function fr(e, t, n, s = !0, r = !1) {
  if (process.env.NODE_ENV !== "production") {
    const o = ht[t];
    if (n && or(n), E(`Unhandled error${o ? ` during execution of ${o}` : ""}`), n && ir(), s)
      throw e;
    console.error(e);
  } else {
    if (r)
      throw e;
    console.error(e);
  }
}
const T = [];
let H = -1;
const se = [];
let W = null, ee = 0;
const kt = /* @__PURE__ */ Promise.resolve();
let Te = null;
const pr = 100;
function dr(e) {
  const t = Te || kt;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function hr(e) {
  let t = H + 1, n = T.length;
  for (; t < n; ) {
    const s = t + n >>> 1, r = T[s], o = de(r);
    o < e || o === e && r.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function mt(e) {
  if (!(e.flags & 1)) {
    const t = de(e), n = T[T.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= de(n) ? T.push(e) : T.splice(hr(t), 0, e), e.flags |= 1, en();
  }
}
function en() {
  Te || (Te = kt.then(nn));
}
function tn(e) {
  m(e) ? se.push(...e) : W && e.id === -1 ? W.splice(ee + 1, 0, e) : e.flags & 1 || (se.push(e), e.flags |= 1), en();
}
function _r(e) {
  if (se.length) {
    const t = [...new Set(se)].sort(
      (n, s) => de(n) - de(s)
    );
    if (se.length = 0, W) {
      W.push(...t);
      return;
    }
    for (W = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), ee = 0; ee < W.length; ee++) {
      const n = W[ee];
      process.env.NODE_ENV !== "production" && rn(e, n) || (n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2);
    }
    W = null, ee = 0;
  }
}
const de = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function nn(e) {
  process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map());
  const t = process.env.NODE_ENV !== "production" ? (n) => rn(e, n) : ne;
  try {
    for (H = 0; H < T.length; H++) {
      const n = T[H];
      if (n && !(n.flags & 8)) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        n.flags & 4 && (n.flags &= -2), je(
          n,
          n.i,
          n.i ? 15 : 14
        ), n.flags & 4 || (n.flags &= -2);
      }
    }
  } finally {
    for (; H < T.length; H++) {
      const n = T[H];
      n && (n.flags &= -2);
    }
    H = -1, T.length = 0, _r(e), Te = null, (T.length || se.length) && nn(e);
  }
}
function rn(e, t) {
  const n = e.get(t) || 0;
  if (n > pr) {
    const s = t.i, r = s && gn(s.type);
    return gt(
      `Maximum recursive updates exceeded${r ? ` in component <${r}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
      null,
      10
    ), !0;
  }
  return e.set(t, n + 1), !1;
}
const Je = /* @__PURE__ */ new Map();
process.env.NODE_ENV !== "production" && (Fe().__VUE_HMR_RUNTIME__ = {
  createRecord: Ye(gr),
  rerender: Ye(mr),
  reload: Ye(Er)
});
const Ie = /* @__PURE__ */ new Map();
function gr(e, t) {
  return Ie.has(e) ? !1 : (Ie.set(e, {
    initialDef: $e(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function $e(e) {
  return En(e) ? e.__vccOpts : e;
}
function mr(e, t) {
  const n = Ie.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((s) => {
    t && (s.render = t, $e(s.type).render = t), s.renderCache = [], s.update();
  }));
}
function Er(e, t) {
  const n = Ie.get(e);
  if (!n) return;
  t = $e(t), yt(n.initialDef, t);
  const s = [...n.instances];
  for (let r = 0; r < s.length; r++) {
    const o = s[r], i = $e(o.type);
    let c = Je.get(i);
    c || (i !== n.initialDef && yt(i, t), Je.set(i, c = /* @__PURE__ */ new Set())), c.add(o), o.appContext.propsCache.delete(o.type), o.appContext.emitsCache.delete(o.type), o.appContext.optionsCache.delete(o.type), o.ceReload ? (c.add(o), o.ceReload(t.styles), c.delete(o)) : o.parent ? mt(() => {
      o.parent.update(), c.delete(o);
    }) : o.appContext.reload ? o.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    ), o.root.ce && o !== o.root && o.root.ce._removeChildStyle(i);
  }
  tn(() => {
    Je.clear();
  });
}
function yt(e, t) {
  V(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function Ye(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (s) {
      console.error(s), console.warn(
        "[HMR] Something went wrong during Vue component hot-reload. Full reload required."
      );
    }
  };
}
let te, Oe = [];
function sn(e, t) {
  var n, s;
  te = e, te ? (te.enabled = !0, Oe.forEach(({ event: r, args: o }) => te.emit(r, ...o)), Oe = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((s = (n = window.navigator) == null ? void 0 : n.userAgent) != null && s.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((o) => {
    sn(o, t);
  }), setTimeout(() => {
    te || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, Oe = []);
  }, 3e3)) : Oe = [];
}
let F = null, vr = null;
const br = (e) => e.__isTeleport;
function on(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, on(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Nr(e, t) {
  return N(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    V({ name: e.name }, t, { setup: e })
  ) : e;
}
Fe().requestIdleCallback;
Fe().cancelIdleCallback;
function wr(e, t, n = oe, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), o = t.__weh || (t.__weh = (...i) => {
      _e();
      const c = _n(n), a = _t(t, n, e, i);
      return c(), ge(), a;
    });
    return s ? r.unshift(o) : r.push(o), o;
  } else if (process.env.NODE_ENV !== "production") {
    const r = Sn(ht[e].replace(/ hook$/, ""));
    E(
      `${r} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const cn = (e) => (t, n = oe) => {
  (!Ae || e === "sp") && wr(e, (...s) => t(...s), n);
}, Or = cn("m"), Sr = cn("u"), yr = Symbol.for("v-ndc"), et = (e) => e ? Gr(e) ? Qr(e) : et(e.parent) : null, fe = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ V(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? Ne(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? Ne(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? Ne(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? Ne(e.refs) : e.refs,
    $parent: (e) => et(e.parent),
    $root: (e) => et(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Vr(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      mt(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = dr.bind(e.proxy)),
    $watch: (e) => jr.bind(e)
  })
), xr = (e) => e === "_" || e === "$", qe = (e, t) => e !== C && !e.__isScriptSetup && v(e, t), Dr = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: r, props: o, accessCache: i, type: c, appContext: a } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let f;
    if (t[0] !== "$") {
      const p = i[t];
      if (p !== void 0)
        switch (p) {
          case 1:
            return s[t];
          case 2:
            return r[t];
          case 4:
            return n[t];
          case 3:
            return o[t];
        }
      else {
        if (qe(s, t))
          return i[t] = 1, s[t];
        if (r !== C && v(r, t))
          return i[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (f = e.propsOptions[0]) && v(f, t)
        )
          return i[t] = 3, o[t];
        if (n !== C && v(n, t))
          return i[t] = 4, n[t];
        i[t] = 0;
      }
    }
    const d = fe[t];
    let l, u;
    if (d)
      return t === "$attrs" ? (w(e.attrs, "get", ""), process.env.NODE_ENV !== "production" && void 0) : process.env.NODE_ENV !== "production" && t === "$slots" && w(e, "get", t), d(e);
    if (
      // css module (injected by vue-loader)
      (l = c.__cssModules) && (l = l[t])
    )
      return l;
    if (n !== C && v(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      u = a.config.globalProperties, v(u, t)
    )
      return u[t];
    process.env.NODE_ENV !== "production" && F && (!I(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (r !== C && xr(t[0]) && v(r, t) ? E(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === F && E(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: o } = e;
    return qe(r, t) ? (r[t] = n, !0) : process.env.NODE_ENV !== "production" && r.__isScriptSetup && v(r, t) ? (E(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : s !== C && v(s, t) ? (s[t] = n, !0) : v(e.props, t) ? (process.env.NODE_ENV !== "production" && E(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && E(
      `Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`
    ), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(o, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: o }
  }, i) {
    let c;
    return !!n[i] || e !== C && v(e, i) || qe(t, i) || (c = o[0]) && v(c, i) || v(s, i) || v(fe, i) || v(r.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : v(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (Dr.ownKeys = (e) => (E(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function xt(e) {
  return m(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function Vr(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: r,
    optionsCache: o,
    config: { optionMergeStrategies: i }
  } = e.appContext, c = o.get(t);
  let a;
  return c ? a = c : !r.length && !n && !s ? a = t : (a = {}, r.length && r.forEach(
    (f) => Pe(a, f, i, !0)
  ), Pe(a, t, i)), O(t) && o.set(t, a), a;
}
function Pe(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  o && Pe(e, o, n, !0), r && r.forEach(
    (i) => Pe(e, i, n, !0)
  );
  for (const i in t)
    if (s && i === "expose")
      process.env.NODE_ENV !== "production" && E(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const c = Rr[i] || n && n[i];
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const Rr = {
  data: Dt,
  props: Rt,
  emits: Rt,
  // objects
  methods: le,
  computed: le,
  // lifecycle
  beforeCreate: S,
  created: S,
  beforeMount: S,
  mounted: S,
  beforeUpdate: S,
  updated: S,
  beforeDestroy: S,
  beforeUnmount: S,
  destroyed: S,
  unmounted: S,
  activated: S,
  deactivated: S,
  errorCaptured: S,
  serverPrefetch: S,
  // assets
  components: le,
  directives: le,
  // watch
  watch: Tr,
  // provide / inject
  provide: Dt,
  inject: Cr
};
function Dt(e, t) {
  return t ? e ? function() {
    return V(
      N(e) ? e.call(this, this) : e,
      N(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Cr(e, t) {
  return le(Vt(e), Vt(t));
}
function Vt(e) {
  if (m(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function S(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function le(e, t) {
  return e ? V(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Rt(e, t) {
  return e ? m(e) && m(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : V(
    /* @__PURE__ */ Object.create(null),
    xt(e),
    xt(t ?? {})
  ) : t;
}
function Tr(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = V(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = S(e[s], t[s]);
  return n;
}
let Ir = null;
function $r(e, t, n = !1) {
  const s = oe || F;
  if (s || Ir) {
    const r = s ? s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && N(t) ? t.call(s && s.proxy) : t;
    process.env.NODE_ENV !== "production" && E(`injection "${String(e)}" not found.`);
  } else process.env.NODE_ENV !== "production" && E("inject() can only be used inside setup() or functional components.");
}
const Pr = {}, ln = (e) => Object.getPrototypeOf(e) === Pr, Mr = Lr, Ar = Symbol.for("v-scx"), Hr = () => {
  {
    const e = $r(Ar);
    return e || process.env.NODE_ENV !== "production" && E(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
};
function Fr(e, t, n = C) {
  const { immediate: s, deep: r, flush: o, once: i } = n;
  process.env.NODE_ENV !== "production" && !t && (s !== void 0 && E(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), r !== void 0 && E(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ), i !== void 0 && E(
    'watch() "once" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const c = V({}, n);
  process.env.NODE_ENV !== "production" && (c.onWarn = E);
  const a = t && s || !t && o !== "post";
  let f;
  if (Ae) {
    if (o === "sync") {
      const p = Hr();
      f = p.__watcherHandles || (p.__watcherHandles = []);
    } else if (!a) {
      const p = () => {
      };
      return p.stop = ne, p.resume = ne, p.pause = ne, p;
    }
  }
  const d = oe;
  c.call = (p, b, R) => _t(p, d, b, R);
  let l = !1;
  o === "post" ? c.scheduler = (p) => {
    Mr(p, d && d.suspense);
  } : o !== "sync" && (l = !0, c.scheduler = (p, b) => {
    b ? p() : mt(p);
  }), c.augmentJob = (p) => {
    t && (p.flags |= 4), l && (p.flags |= 2, d && (p.id = d.uid, p.i = d));
  };
  const u = sr(e, t, c);
  return Ae && (f ? f.push(u) : a && u()), u;
}
function jr(e, t, n) {
  const s = this.proxy, r = I(e) ? e.includes(".") ? Wr(s, e) : () => s[e] : e.bind(s, s);
  let o;
  N(t) ? o = t : (o = t.handler, n = t);
  const i = _n(this), c = Fr(r, o.bind(s), n);
  return i(), c;
}
function Wr(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
const Kr = (e) => e.__isSuspense;
function Lr(e, t) {
  t && t.pendingBranch ? m(e) ? t.effects.push(...e) : t.effects.push(e) : tn(e);
}
const Et = Symbol.for("v-fgt"), Ur = Symbol.for("v-txt"), tt = Symbol.for("v-cmt"), Se = [];
let $ = null;
function he(e = !1) {
  Se.push($ = e ? null : []);
}
function zr() {
  Se.pop(), $ = Se[Se.length - 1] || null;
}
function an(e) {
  return e.dynamicChildren = $ || bn, zr(), $ && $.push(e), e;
}
function nt(e, t, n, s, r, o) {
  return an(
    U(
      e,
      t,
      n,
      s,
      r,
      o,
      !0
    )
  );
}
function un(e, t, n, s, r) {
  return an(
    vt(
      e,
      t,
      n,
      s,
      r,
      !0
    )
  );
}
function Br(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
const Jr = (...e) => pn(
  ...e
), fn = ({ key: e }) => e ?? null, ye = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? I(e) || x(e) || N(e) ? { i: F, r: e, k: t, f: !!n } : e : null);
function U(e, t = null, n = null, s = 0, r = null, o = e === Et ? 0 : 1, i = !1, c = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && fn(t),
    ref: t && ye(t),
    scopeId: vr,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: F
  };
  return c ? (bt(a, n), o & 128 && e.normalize(a)) : n && (a.shapeFlag |= I(n) ? 8 : 16), process.env.NODE_ENV !== "production" && a.key !== a.key && E("VNode created with invalid key (NaN). VNode type:", a.type), // avoid a block node from tracking itself
  !i && // has current parent block
  $ && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && $.push(a), a;
}
const vt = process.env.NODE_ENV !== "production" ? Jr : pn;
function pn(e, t = null, n = null, s = 0, r = null, o = !1) {
  if ((!e || e === yr) && (process.env.NODE_ENV !== "production" && !e && E(`Invalid vnode type when creating vnode: ${e}.`), e = tt), Br(e)) {
    const c = Me(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && bt(c, n), !o && $ && (c.shapeFlag & 6 ? $[$.indexOf(e)] = c : $.push(c)), c.patchFlag = -2, c;
  }
  if (En(e) && (e = e.__vccOpts), t) {
    t = Yr(t);
    let { class: c, style: a } = t;
    c && !I(c) && (t.class = ct(c)), O(a) && (Ve(a) && !m(a) && (a = V({}, a)), t.style = it(a));
  }
  const i = I(e) ? 1 : Kr(e) ? 128 : br(e) ? 64 : O(e) ? 4 : N(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && Ve(e) && (e = h(e), E(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), U(
    e,
    t,
    n,
    s,
    r,
    i,
    o,
    !0
  );
}
function Yr(e) {
  return e ? Ve(e) || ln(e) ? V({}, e) : e : null;
}
function Me(e, t, n = !1, s = !1) {
  const { props: r, ref: o, patchFlag: i, children: c, transition: a } = e, f = t ? qr(r || {}, t) : r, d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && fn(f),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && o ? m(o) ? o.concat(ye(t)) : [o, ye(t)] : ye(t)
    ) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && i === -1 && m(c) ? c.map(dn) : c,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Et ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: a,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Me(e.ssContent),
    ssFallback: e.ssFallback && Me(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return a && s && on(
    d,
    a.clone(d)
  ), d;
}
function dn(e) {
  const t = Me(e);
  return m(e.children) && (t.children = e.children.map(dn)), t;
}
function rt(e = " ", t = 0) {
  return vt(Ur, null, e, t);
}
function hn(e = "", t = !1) {
  return t ? (he(), un(tt, null, e)) : vt(tt, null, e);
}
function bt(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (m(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), bt(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !ln(t) ? t._ctx = F : r === 3 && F && (F.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else N(t) ? (t = { default: t, _ctx: F }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [rt(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function qr(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = ct([t.class, s.class]));
      else if (r === "style")
        t.style = it([t.style, s.style]);
      else if (Nn(r)) {
        const o = t[r], i = s[r];
        i && o !== i && !(m(o) && o.includes(i)) && (t[r] = o ? [].concat(o, i) : i);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
let oe = null, st;
{
  const e = Fe(), t = (n, s) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(s), (o) => {
      r.length > 1 ? r.forEach((i) => i(o)) : r[0](o);
    };
  };
  st = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => oe = n
  ), t(
    "__VUE_SSR_SETTERS__",
    (n) => Ae = n
  );
}
const _n = (e) => {
  const t = oe;
  return st(e), e.scope.on(), () => {
    e.scope.off(), st(t);
  };
};
function Gr(e) {
  return e.vnode.shapeFlag & 4;
}
let Ae = !1;
process.env.NODE_ENV;
function Qr(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(nr(Xn(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in fe)
        return fe[n](e);
    },
    has(t, n) {
      return n in t || n in fe;
    }
  })) : e.proxy;
}
const Xr = /(?:^|[-_])(\w)/g, Zr = (e) => e.replace(Xr, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function gn(e, t = !0) {
  return N(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function mn(e, t, n = !1) {
  let s = gn(t);
  if (!s && t.__file) {
    const r = t.__file.match(/([^/\\]+)\.\w+$/);
    r && (s = r[1]);
  }
  if (!s && e && e.parent) {
    const r = (o) => {
      for (const i in o)
        if (o[i] === t)
          return i;
    };
    s = r(
      e.components || e.parent.type.components
    ) || r(e.appContext.components);
  }
  return s ? Zr(s) : n ? "App" : "Anonymous";
}
function En(e) {
  return N(e) && "__vccOpts" in e;
}
function kr() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, n = { style: "color:#f5222d" }, s = { style: "color:#eb2f96" }, r = {
    __vue_custom_formatter: !0,
    header(l) {
      return O(l) ? l.__isVue ? ["div", e, "VueInstance"] : x(l) ? [
        "div",
        {},
        ["span", e, d(l)],
        "<",
        // avoid debugger accessing value affecting behavior
        c("_value" in l ? l._value : l),
        ">"
      ] : re(l) ? [
        "div",
        {},
        ["span", e, D(l) ? "ShallowReactive" : "Reactive"],
        "<",
        c(l),
        `>${j(l) ? " (readonly)" : ""}`
      ] : j(l) ? [
        "div",
        {},
        ["span", e, D(l) ? "ShallowReadonly" : "Readonly"],
        "<",
        c(l),
        ">"
      ] : null : null;
    },
    hasBody(l) {
      return l && l.__isVue;
    },
    body(l) {
      if (l && l.__isVue)
        return [
          "div",
          {},
          ...o(l.$)
        ];
    }
  };
  function o(l) {
    const u = [];
    l.type.props && l.props && u.push(i("props", h(l.props))), l.setupState !== C && u.push(i("setup", l.setupState)), l.data !== C && u.push(i("data", h(l.data)));
    const p = a(l, "computed");
    p && u.push(i("computed", p));
    const b = a(l, "inject");
    return b && u.push(i("injected", b)), u.push([
      "div",
      {},
      [
        "span",
        {
          style: s.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: l }]
    ]), u;
  }
  function i(l, u) {
    return u = V({}, u), Object.keys(u).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        l
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(u).map((p) => [
          "div",
          {},
          ["span", s, p + ": "],
          c(u[p], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function c(l, u = !0) {
    return typeof l == "number" ? ["span", t, l] : typeof l == "string" ? ["span", n, JSON.stringify(l)] : typeof l == "boolean" ? ["span", s, l] : O(l) ? ["object", { object: u ? h(l) : l }] : ["span", n, String(l)];
  }
  function a(l, u) {
    const p = l.type;
    if (N(p))
      return;
    const b = {};
    for (const R in l.ctx)
      f(p, R, u) && (b[R] = l.ctx[R]);
    return b;
  }
  function f(l, u, p) {
    const b = l[p];
    if (m(b) && b.includes(u) || O(b) && u in b || l.extends && f(l.extends, u, p) || l.mixins && l.mixins.some((R) => f(R, u, p)))
      return !0;
  }
  function d(l) {
    return D(l) ? "ShallowRef" : l.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(r) : window.devtoolsFormatters = [r];
}
process.env.NODE_ENV;
process.env.NODE_ENV;
process.env.NODE_ENV;
/**
* vue v3.5.12
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function es() {
  kr();
}
process.env.NODE_ENV !== "production" && es();
const ts = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t)
    n[s] = r;
  return n;
}, ns = { class: "card" }, rs = { key: 0 }, ss = {
  __name: "HelloWorld",
  props: {
    msg: String
  },
  setup(e) {
    const t = Re(0), n = Re(!1);
    function s() {
      console.log("increaseValue: "), n.value = !n.value, t.value += 1;
    }
    return Or(() => {
      console.log("call");
    }), Sr(() => {
      console.log("onUpdated");
    }), (r, o) => (he(), nt(Et, null, [
      U("h1", null, xe(e.msg), 1),
      U("div", ns, [
        U("button", {
          type: "button",
          onClick: s
        }, "count is " + xe(t.value), 1)
      ]),
      n.value ? (he(), nt("p", rs, o[0] || (o[0] = [
        rt(" Check out "),
        U("a", {
          href: "https://vuejs.org/guide/quick-start.html#local",
          target: "_blank"
        }, "create-vue", -1),
        rt(", the official Vue + Vite starter ")
      ]))) : hn("", !0)
    ], 64));
  }
}, os = /* @__PURE__ */ ts(ss, [["__scopeId", "data-v-43a239c5"]]), is = { class: "my-component" }, cs = /* @__PURE__ */ Nr({
  __name: "MyComponent",
  emits: ["componentClick"],
  setup(e, { emit: t }) {
    const n = t, s = Re("Hello from MyComponent!"), r = Re(!1), o = () => {
      r.value = !r.value, console.log("click from package!!"), n("componentClick");
    };
    return (i, c) => (he(), nt("div", is, [
      U("h2", null, xe(s.value), 1),
      U("button", {
        class: "my-component-button",
        onClick: o
      }, "Click Me!"),
      r.value ? (he(), un(os, { key: 0 })) : hn("", !0)
    ]));
  }
});
export {
  os as HelloWorld,
  cs as MyComponent
};

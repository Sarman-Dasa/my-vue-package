/**
* @vue/shared v3.5.12
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function fn(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const T = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, pn = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], re = () => {
}, dn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), R = Object.assign, hn = Object.prototype.hasOwnProperty, v = (e, t) => hn.call(e, t), m = Array.isArray, G = (e) => Ie(e) === "[object Map]", St = (e) => Ie(e) === "[object Set]", N = (e) => typeof e == "function", P = (e) => typeof e == "string", Z = (e) => typeof e == "symbol", O = (e) => e !== null && typeof e == "object", _n = (e) => (O(e) || N(e)) && N(e.then) && N(e.catch), yt = Object.prototype.toString, Ie = (e) => yt.call(e), xt = (e) => Ie(e).slice(8, -1), Dt = (e) => Ie(e) === "[object Object]", nt = (e) => P(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, gn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, mn = gn((e) => e.charAt(0).toUpperCase() + e.slice(1)), U = (e, t) => !Object.is(e, t), En = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
};
let _t;
const Pe = () => _t || (_t = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function rt(e) {
  if (m(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = P(s) ? wn(s) : rt(s);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else if (P(e) || O(e))
    return e;
}
const vn = /;(?![^(]*\))/g, bn = /:([^]+)/, Nn = /\/\*[^]*?\*\//g;
function wn(e) {
  const t = {};
  return e.replace(Nn, "").split(vn).forEach((n) => {
    if (n) {
      const s = n.split(bn);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function st(e) {
  let t = "";
  if (P(e))
    t = e;
  else if (m(e))
    for (let n = 0; n < e.length; n++) {
      const s = st(e[n]);
      s && (t += s + " ");
    }
  else if (O(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Vt = (e) => !!(e && e.__v_isRef === !0), Oe = (e) => P(e) ? e : e == null ? "" : m(e) || O(e) && (e.toString === yt || !N(e.toString)) ? Vt(e) ? Oe(e.value) : JSON.stringify(e, Rt, 2) : String(e), Rt = (e, t) => Vt(t) ? Rt(e, t.value) : G(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, r], o) => (n[je(s, o) + " =>"] = r, n),
    {}
  )
} : St(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => je(n))
} : Z(t) ? je(t) : O(t) && !m(t) && !Dt(t) ? String(t) : t, je = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Z(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
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
const We = /* @__PURE__ */ new WeakSet();
class On {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0;
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, We.has(this) && (We.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Sn(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, gt(this), Tt(this);
    const t = g, n = M;
    g = this, M = !0;
    try {
      return this.fn();
    } finally {
      process.env.NODE_ENV !== "production" && g !== this && B(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), It(this), g = t, M = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        ct(t);
      this.deps = this.depsTail = void 0, gt(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? We.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Ye(this) && this.run();
  }
  get dirty() {
    return Ye(this);
  }
}
let Ct = 0, ae, ue;
function Sn(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = ue, ue = e;
    return;
  }
  e.next = ae, ae = e;
}
function ot() {
  Ct++;
}
function it() {
  if (--Ct > 0)
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
function Tt(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function It(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const r = s.prevDep;
    s.version === -1 ? (s === n && (n = r), ct(s), xn(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = r;
  }
  e.deps = t, e.depsTail = n;
}
function Ye(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (yn(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function yn(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Se))
    return;
  e.globalVersion = Se;
  const t = e.dep;
  if (e.flags |= 2, t.version > 0 && !e.isSSR && e.deps && !Ye(e)) {
    e.flags &= -3;
    return;
  }
  const n = g, s = M;
  g = e, M = !0;
  try {
    Tt(e);
    const r = e.fn(e._value);
    (t.version === 0 || U(r, e._value)) && (e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    g = n, M = s, It(e), e.flags &= -3;
  }
}
function ct(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: r } = e;
  if (s && (s.nextSub = r, e.prevSub = void 0), r && (r.prevSub = s, e.nextSub = void 0), process.env.NODE_ENV !== "production" && n.subsHead === e && (n.subsHead = r), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let o = n.computed.deps; o; o = o.nextDep)
      ct(o, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function xn(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let M = !0;
const Pt = [];
function $e() {
  Pt.push(M), M = !1;
}
function Me() {
  const e = Pt.pop();
  M = e === void 0 ? !0 : e;
}
function gt(e) {
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
let Se = 0;
class Dn {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class $t {
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, process.env.NODE_ENV !== "production" && (this.subsHead = void 0);
  }
  track(t) {
    if (!g || !M || g === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== g)
      n = this.activeLink = new Dn(g, this), g.deps ? (n.prevDep = g.depsTail, g.depsTail.nextDep = n, g.depsTail = n) : g.deps = g.depsTail = n, Mt(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = g.depsTail, n.nextDep = void 0, g.depsTail.nextDep = n, g.depsTail = n, g.deps === n && (g.deps = s);
    }
    return process.env.NODE_ENV !== "production" && g.onTrack && g.onTrack(
      R(
        {
          effect: g
        },
        t
      )
    ), n;
  }
  trigger(t) {
    this.version++, Se++, this.notify(t);
  }
  notify(t) {
    ot();
    try {
      if (process.env.NODE_ENV !== "production")
        for (let n = this.subsHead; n; n = n.nextSub)
          n.sub.onTrigger && !(n.sub.flags & 8) && n.sub.onTrigger(
            R(
              {
                effect: n.sub
              },
              t
            )
          );
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      it();
    }
  }
}
function Mt(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        Mt(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), process.env.NODE_ENV !== "production" && e.dep.subsHead === void 0 && (e.dep.subsHead = e), e.dep.subs = e;
  }
}
const qe = /* @__PURE__ */ new WeakMap(), Q = Symbol(
  process.env.NODE_ENV !== "production" ? "Object iterate" : ""
), Ge = Symbol(
  process.env.NODE_ENV !== "production" ? "Map keys iterate" : ""
), pe = Symbol(
  process.env.NODE_ENV !== "production" ? "Array iterate" : ""
);
function w(e, t, n) {
  if (M && g) {
    let s = qe.get(e);
    s || qe.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || (s.set(n, r = new $t()), r.map = s, r.key = n), process.env.NODE_ENV !== "production" ? r.track({
      target: e,
      type: t,
      key: n
    }) : r.track();
  }
}
function K(e, t, n, s, r, o) {
  const i = qe.get(e);
  if (!i) {
    Se++;
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
  if (ot(), t === "clear")
    i.forEach(c);
  else {
    const a = m(e), f = a && nt(n);
    if (a && n === "length") {
      const d = Number(s);
      i.forEach((l, u) => {
        (u === "length" || u === pe || !Z(u) && u >= d) && c(l);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && c(i.get(n)), f && c(i.get(pe)), t) {
        case "add":
          a ? f && c(i.get("length")) : (c(i.get(Q)), G(e) && c(i.get(Ge)));
          break;
        case "delete":
          a || (c(i.get(Q)), G(e) && c(i.get(Ge)));
          break;
        case "set":
          G(e) && c(i.get(Q));
          break;
      }
  }
  it();
}
function ee(e) {
  const t = h(e);
  return t === e ? t : (w(t, "iterate", pe), V(e) ? t : t.map(y));
}
function lt(e) {
  return w(e = h(e), "iterate", pe), e;
}
const Vn = {
  __proto__: null,
  [Symbol.iterator]() {
    return Le(this, Symbol.iterator, y);
  },
  concat(...e) {
    return ee(this).concat(
      ...e.map((t) => m(t) ? ee(t) : t)
    );
  },
  entries() {
    return Le(this, "entries", (e) => (e[1] = y(e[1]), e));
  },
  every(e, t) {
    return H(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return H(this, "filter", e, t, (n) => n.map(y), arguments);
  },
  find(e, t) {
    return H(this, "find", e, t, y, arguments);
  },
  findIndex(e, t) {
    return H(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return H(this, "findLast", e, t, y, arguments);
  },
  findLastIndex(e, t) {
    return H(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return H(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Ke(this, "includes", e);
  },
  indexOf(...e) {
    return Ke(this, "indexOf", e);
  },
  join(e) {
    return ee(this).join(e);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...e) {
    return Ke(this, "lastIndexOf", e);
  },
  map(e, t) {
    return H(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return ce(this, "pop");
  },
  push(...e) {
    return ce(this, "push", e);
  },
  reduce(e, ...t) {
    return mt(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return mt(this, "reduceRight", e, t);
  },
  shift() {
    return ce(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return H(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return ce(this, "splice", e);
  },
  toReversed() {
    return ee(this).toReversed();
  },
  toSorted(e) {
    return ee(this).toSorted(e);
  },
  toSpliced(...e) {
    return ee(this).toSpliced(...e);
  },
  unshift(...e) {
    return ce(this, "unshift", e);
  },
  values() {
    return Le(this, "values", y);
  }
};
function Le(e, t, n) {
  const s = lt(e), r = s[t]();
  return s !== e && !V(e) && (r._next = r.next, r.next = () => {
    const o = r._next();
    return o.value && (o.value = n(o.value)), o;
  }), r;
}
const Rn = Array.prototype;
function H(e, t, n, s, r, o) {
  const i = lt(e), c = i !== e && !V(e), a = i[t];
  if (a !== Rn[t]) {
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
function mt(e, t, n, s) {
  const r = lt(e);
  let o = n;
  return r !== e && (V(e) ? n.length > 3 && (o = function(i, c, a) {
    return n.call(this, i, c, a, e);
  }) : o = function(i, c, a) {
    return n.call(this, i, y(c), a, e);
  }), r[t](o, ...s);
}
function Ke(e, t, n) {
  const s = h(e);
  w(s, "iterate", pe);
  const r = s[t](...n);
  return (r === -1 || r === !1) && ye(n[0]) ? (n[0] = h(n[0]), s[t](...n)) : r;
}
function ce(e, t, n = []) {
  $e(), ot();
  const s = h(e)[t].apply(e, n);
  return it(), Me(), s;
}
const Cn = /* @__PURE__ */ fn("__proto__,__v_isRef,__isVue"), At = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Z)
);
function Tn(e) {
  Z(e) || (e = String(e));
  const t = h(this);
  return w(t, "has", e), t.hasOwnProperty(e);
}
class Ht {
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
      return s === (r ? o ? Lt : Wt : o ? Ln : jt).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const i = m(t);
    if (!r) {
      let a;
      if (i && (a = Vn[n]))
        return a;
      if (n === "hasOwnProperty")
        return Tn;
    }
    const c = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      x(t) ? t : s
    );
    return (Z(n) ? At.has(n) : Cn(n)) || (r || w(t, "get", n), o) ? c : x(c) ? i && nt(n) ? c : c.value : O(c) ? r ? zt(c) : Kt(c) : c;
  }
}
class In extends Ht {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let o = t[n];
    if (!this._isShallow) {
      const a = W(o);
      if (!V(s) && !W(s) && (o = h(o), s = h(s)), !m(t) && x(o) && !x(s))
        return a ? !1 : (o.value = s, !0);
    }
    const i = m(t) && nt(n) ? Number(n) < t.length : v(t, n), c = Reflect.set(
      t,
      n,
      s,
      x(t) ? t : r
    );
    return t === h(r) && (i ? U(s, o) && K(t, "set", n, s, o) : K(t, "add", n, s)), c;
  }
  deleteProperty(t, n) {
    const s = v(t, n), r = t[n], o = Reflect.deleteProperty(t, n);
    return o && s && K(t, "delete", n, void 0, r), o;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!Z(n) || !At.has(n)) && w(t, "has", n), s;
  }
  ownKeys(t) {
    return w(
      t,
      "iterate",
      m(t) ? "length" : Q
    ), Reflect.ownKeys(t);
  }
}
class Ft extends Ht {
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
const Pn = /* @__PURE__ */ new In(), $n = /* @__PURE__ */ new Ft(), Mn = /* @__PURE__ */ new Ft(!0), Qe = (e) => e, ge = (e) => Reflect.getPrototypeOf(e);
function An(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, o = h(r), i = G(o), c = e === "entries" || e === Symbol.iterator && i, a = e === "keys" && i, f = r[e](...s), d = n ? Qe : t ? Xe : y;
    return !t && w(
      o,
      "iterate",
      a ? Ge : Q
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
function me(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      B(
        `${mn(e)} operation ${n}failed: target is readonly.`,
        h(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Hn(e, t) {
  const n = {
    get(r) {
      const o = this.__v_raw, i = h(o), c = h(r);
      e || (U(r, c) && w(i, "get", r), w(i, "get", c));
      const { has: a } = ge(i), f = t ? Qe : e ? Xe : y;
      if (a.call(i, r))
        return f(o.get(r));
      if (a.call(i, c))
        return f(o.get(c));
      o !== i && o.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && w(h(r), "iterate", Q), Reflect.get(r, "size", r);
    },
    has(r) {
      const o = this.__v_raw, i = h(o), c = h(r);
      return e || (U(r, c) && w(i, "has", r), w(i, "has", c)), r === c ? o.has(r) : o.has(r) || o.has(c);
    },
    forEach(r, o) {
      const i = this, c = i.__v_raw, a = h(c), f = t ? Qe : e ? Xe : y;
      return !e && w(a, "iterate", Q), c.forEach((d, l) => r.call(o, f(d), f(l), i));
    }
  };
  return R(
    n,
    e ? {
      add: me("add"),
      set: me("set"),
      delete: me("delete"),
      clear: me("clear")
    } : {
      add(r) {
        !t && !V(r) && !W(r) && (r = h(r));
        const o = h(this);
        return ge(o).has.call(o, r) || (o.add(r), K(o, "add", r, r)), this;
      },
      set(r, o) {
        !t && !V(o) && !W(o) && (o = h(o));
        const i = h(this), { has: c, get: a } = ge(i);
        let f = c.call(i, r);
        f ? process.env.NODE_ENV !== "production" && Et(i, c, r) : (r = h(r), f = c.call(i, r));
        const d = a.call(i, r);
        return i.set(r, o), f ? U(o, d) && K(i, "set", r, o, d) : K(i, "add", r, o), this;
      },
      delete(r) {
        const o = h(this), { has: i, get: c } = ge(o);
        let a = i.call(o, r);
        a ? process.env.NODE_ENV !== "production" && Et(o, i, r) : (r = h(r), a = i.call(o, r));
        const f = c ? c.call(o, r) : void 0, d = o.delete(r);
        return a && K(o, "delete", r, void 0, f), d;
      },
      clear() {
        const r = h(this), o = r.size !== 0, i = process.env.NODE_ENV !== "production" ? G(r) ? new Map(r) : new Set(r) : void 0, c = r.clear();
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
    n[r] = An(r, e, t);
  }), n;
}
function at(e, t) {
  const n = Hn(e, t);
  return (s, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(
    v(n, r) && r in s ? n : s,
    r,
    o
  );
}
const Fn = {
  get: /* @__PURE__ */ at(!1, !1)
}, jn = {
  get: /* @__PURE__ */ at(!0, !1)
}, Wn = {
  get: /* @__PURE__ */ at(!0, !0)
};
function Et(e, t, n) {
  const s = h(n);
  if (s !== n && t.call(e, s)) {
    const r = xt(e);
    B(
      `Reactive ${r} contains both the raw and reactive versions of the same object${r === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const jt = /* @__PURE__ */ new WeakMap(), Ln = /* @__PURE__ */ new WeakMap(), Wt = /* @__PURE__ */ new WeakMap(), Lt = /* @__PURE__ */ new WeakMap();
function Kn(e) {
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
function zn(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Kn(xt(e));
}
function Kt(e) {
  return W(e) ? e : ut(
    e,
    !1,
    Pn,
    Fn,
    jt
  );
}
function zt(e) {
  return ut(
    e,
    !0,
    $n,
    jn,
    Wt
  );
}
function Ee(e) {
  return ut(
    e,
    !0,
    Mn,
    Wn,
    Lt
  );
}
function ut(e, t, n, s, r) {
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
  const i = zn(e);
  if (i === 0)
    return e;
  const c = new Proxy(
    e,
    i === 2 ? s : n
  );
  return r.set(e, c), c;
}
function se(e) {
  return W(e) ? se(e.__v_raw) : !!(e && e.__v_isReactive);
}
function W(e) {
  return !!(e && e.__v_isReadonly);
}
function V(e) {
  return !!(e && e.__v_isShallow);
}
function ye(e) {
  return e ? !!e.__v_raw : !1;
}
function h(e) {
  const t = e && e.__v_raw;
  return t ? h(t) : e;
}
function Un(e) {
  return !v(e, "__v_skip") && Object.isExtensible(e) && En(e, "__v_skip", !0), e;
}
const y = (e) => O(e) ? Kt(e) : e, Xe = (e) => O(e) ? zt(e) : e;
function x(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function Ze(e) {
  return Bn(e, !1);
}
function Bn(e, t) {
  return x(e) ? e : new Jn(e, t);
}
class Jn {
  constructor(t, n) {
    this.dep = new $t(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : h(t), this._value = n ? t : y(t), this.__v_isShallow = n;
  }
  get value() {
    return process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || V(t) || W(t);
    t = s ? t : h(t), U(t, n) && (this._rawValue = t, this._value = s ? t : y(t), process.env.NODE_ENV !== "production" ? this.dep.trigger({
      target: this,
      type: "set",
      key: "value",
      newValue: t,
      oldValue: n
    }) : this.dep.trigger());
  }
}
function Yn(e) {
  return x(e) ? e.value : e;
}
const qn = {
  get: (e, t, n) => t === "__v_raw" ? e : Yn(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return x(r) && !x(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function Gn(e) {
  return se(e) ? e : new Proxy(e, qn);
}
const ve = {}, xe = /* @__PURE__ */ new WeakMap();
let Y;
function Qn(e, t = !1, n = Y) {
  if (n) {
    let s = xe.get(n);
    s || xe.set(n, s = []), s.push(e);
  } else process.env.NODE_ENV !== "production" && !t && B(
    "onWatcherCleanup() was called when there was no active watcher to associate with."
  );
}
function Xn(e, t, n = T) {
  const { immediate: s, deep: r, once: o, scheduler: i, augmentJob: c, call: a } = n, f = (_) => {
    (n.onWarn || B)(
      "Invalid watch source: ",
      _,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, d = (_) => r ? _ : V(_) || r === !1 || r === 0 ? z(_, 1) : z(_);
  let l, u, p, b, C = !1, he = !1;
  if (x(e) ? (u = () => e.value, C = V(e)) : se(e) ? (u = () => d(e), C = !0) : m(e) ? (he = !0, C = e.some((_) => se(_) || V(_)), u = () => e.map((_) => {
    if (x(_))
      return _.value;
    if (se(_))
      return d(_);
    if (N(_))
      return a ? a(_, 2) : _();
    process.env.NODE_ENV !== "production" && f(_);
  })) : N(e) ? t ? u = a ? () => a(e, 2) : e : u = () => {
    if (p) {
      $e();
      try {
        p();
      } finally {
        Me();
      }
    }
    const _ = Y;
    Y = l;
    try {
      return a ? a(e, 3, [b]) : e(b);
    } finally {
      Y = _;
    }
  } : (u = re, process.env.NODE_ENV !== "production" && f(e)), t && r) {
    const _ = u, A = r === !0 ? 1 / 0 : r;
    u = () => z(_(), A);
  }
  const k = () => {
    l.stop();
  };
  if (o && t) {
    const _ = t;
    t = (...A) => {
      _(...A), k();
    };
  }
  let J = he ? new Array(e.length).fill(ve) : ve;
  const ie = (_) => {
    if (!(!(l.flags & 1) || !l.dirty && !_))
      if (t) {
        const A = l.run();
        if (r || C || (he ? A.some((Fe, _e) => U(Fe, J[_e])) : U(A, J))) {
          p && p();
          const Fe = Y;
          Y = l;
          try {
            const _e = [
              A,
              // pass undefined as the old value when it's changed for the first time
              J === ve ? void 0 : he && J[0] === ve ? [] : J,
              b
            ];
            a ? a(t, 3, _e) : (
              // @ts-expect-error
              t(..._e)
            ), J = A;
          } finally {
            Y = Fe;
          }
        }
      } else
        l.run();
  };
  return c && c(ie), l = new On(u), l.scheduler = i ? () => i(ie, !1) : ie, b = (_) => Qn(_, !1, l), p = l.onStop = () => {
    const _ = xe.get(l);
    if (_) {
      if (a)
        a(_, 4);
      else
        for (const A of _) A();
      xe.delete(l);
    }
  }, process.env.NODE_ENV !== "production" && (l.onTrack = n.onTrack, l.onTrigger = n.onTrigger), t ? s ? ie(!0) : J = l.run() : i ? i(ie.bind(null, !0), !0) : l.run(), k.pause = l.pause.bind(l), k.resume = l.resume.bind(l), k.stop = k, k;
}
function z(e, t = 1 / 0, n) {
  if (t <= 0 || !O(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(e)))
    return e;
  if (n.add(e), t--, x(e))
    z(e.value, t, n);
  else if (m(e))
    for (let s = 0; s < e.length; s++)
      z(e[s], t, n);
  else if (St(e) || G(e))
    e.forEach((s) => {
      z(s, t, n);
    });
  else if (Dt(e)) {
    for (const s in e)
      z(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && z(e[s], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.12
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const X = [];
function Zn(e) {
  X.push(e);
}
function kn() {
  X.pop();
}
let ze = !1;
function E(e, ...t) {
  if (ze) return;
  ze = !0, $e();
  const n = X.length ? X[X.length - 1].component : null, s = n && n.appContext.config.warnHandler, r = er();
  if (s)
    Ae(
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
          ({ vnode: o }) => `at <${an(n, o.type)}>`
        ).join(`
`),
        r
      ]
    );
  else {
    const o = [`[Vue warn]: ${e}`, ...t];
    r.length && o.push(`
`, ...tr(r)), console.warn(...o);
  }
  Me(), ze = !1;
}
function er() {
  let e = X[X.length - 1];
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
function tr(e) {
  const t = [];
  return e.forEach((n, s) => {
    t.push(...s === 0 ? [] : [`
`], ...nr(n));
  }), t;
}
function nr({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", s = e.component ? e.component.parent == null : !1, r = ` at <${an(
    e.component,
    e.type,
    s
  )}`, o = ">" + n;
  return e.props ? [r, ...rr(e.props), o] : [r + o];
}
function rr(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((s) => {
    t.push(...Ut(s, e[s]));
  }), n.length > 3 && t.push(" ..."), t;
}
function Ut(e, t, n) {
  return P(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : x(t) ? (t = Ut(e, h(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : N(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = h(t), n ? t : [`${e}=`, t]);
}
const Bt = {
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
function Ae(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (r) {
    ft(r, t, n);
  }
}
function Jt(e, t, n, s) {
  if (N(e)) {
    const r = Ae(e, t, n, s);
    return r && _n(r) && r.catch((o) => {
      ft(o, t, n);
    }), r;
  }
  if (m(e)) {
    const r = [];
    for (let o = 0; o < e.length; o++)
      r.push(Jt(e[o], t, n, s));
    return r;
  } else process.env.NODE_ENV !== "production" && E(
    `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof e}`
  );
}
function ft(e, t, n, s = !0) {
  const r = t ? t.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: i } = t && t.appContext.config || T;
  if (t) {
    let c = t.parent;
    const a = t.proxy, f = process.env.NODE_ENV !== "production" ? Bt[n] : `https://vuejs.org/error-reference/#runtime-${n}`;
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
      $e(), Ae(o, null, 10, [
        e,
        a,
        f
      ]), Me();
      return;
    }
  }
  sr(e, n, r, s, i);
}
function sr(e, t, n, s = !0, r = !1) {
  if (process.env.NODE_ENV !== "production") {
    const o = Bt[t];
    if (n && Zn(n), E(`Unhandled error${o ? ` during execution of ${o}` : ""}`), n && kn(), s)
      throw e;
    console.error(e);
  } else {
    if (r)
      throw e;
    console.error(e);
  }
}
const I = [];
let F = -1;
const oe = [];
let L = null, te = 0;
const Yt = /* @__PURE__ */ Promise.resolve();
let De = null;
const or = 100;
function ir(e) {
  const t = De || Yt;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function cr(e) {
  let t = F + 1, n = I.length;
  for (; t < n; ) {
    const s = t + n >>> 1, r = I[s], o = de(r);
    o < e || o === e && r.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function pt(e) {
  if (!(e.flags & 1)) {
    const t = de(e), n = I[I.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= de(n) ? I.push(e) : I.splice(cr(t), 0, e), e.flags |= 1, qt();
  }
}
function qt() {
  De || (De = Yt.then(Qt));
}
function Gt(e) {
  m(e) ? oe.push(...e) : L && e.id === -1 ? L.splice(te + 1, 0, e) : e.flags & 1 || (oe.push(e), e.flags |= 1), qt();
}
function lr(e) {
  if (oe.length) {
    const t = [...new Set(oe)].sort(
      (n, s) => de(n) - de(s)
    );
    if (oe.length = 0, L) {
      L.push(...t);
      return;
    }
    for (L = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), te = 0; te < L.length; te++) {
      const n = L[te];
      process.env.NODE_ENV !== "production" && Xt(e, n) || (n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2);
    }
    L = null, te = 0;
  }
}
const de = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Qt(e) {
  process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map());
  const t = process.env.NODE_ENV !== "production" ? (n) => Xt(e, n) : re;
  try {
    for (F = 0; F < I.length; F++) {
      const n = I[F];
      if (n && !(n.flags & 8)) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        n.flags & 4 && (n.flags &= -2), Ae(
          n,
          n.i,
          n.i ? 15 : 14
        ), n.flags & 4 || (n.flags &= -2);
      }
    }
  } finally {
    for (; F < I.length; F++) {
      const n = I[F];
      n && (n.flags &= -2);
    }
    F = -1, I.length = 0, lr(e), De = null, (I.length || oe.length) && Qt(e);
  }
}
function Xt(e, t) {
  const n = e.get(t) || 0;
  if (n > or) {
    const s = t.i, r = s && ln(s.type);
    return ft(
      `Maximum recursive updates exceeded${r ? ` in component <${r}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
      null,
      10
    ), !0;
  }
  return e.set(t, n + 1), !1;
}
const Ue = /* @__PURE__ */ new Map();
process.env.NODE_ENV !== "production" && (Pe().__VUE_HMR_RUNTIME__ = {
  createRecord: Be(ar),
  rerender: Be(ur),
  reload: Be(fr)
});
const Ve = /* @__PURE__ */ new Map();
function ar(e, t) {
  return Ve.has(e) ? !1 : (Ve.set(e, {
    initialDef: Re(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function Re(e) {
  return un(e) ? e.__vccOpts : e;
}
function ur(e, t) {
  const n = Ve.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((s) => {
    t && (s.render = t, Re(s.type).render = t), s.renderCache = [], s.update();
  }));
}
function fr(e, t) {
  const n = Ve.get(e);
  if (!n) return;
  t = Re(t), vt(n.initialDef, t);
  const s = [...n.instances];
  for (let r = 0; r < s.length; r++) {
    const o = s[r], i = Re(o.type);
    let c = Ue.get(i);
    c || (i !== n.initialDef && vt(i, t), Ue.set(i, c = /* @__PURE__ */ new Set())), c.add(o), o.appContext.propsCache.delete(o.type), o.appContext.emitsCache.delete(o.type), o.appContext.optionsCache.delete(o.type), o.ceReload ? (c.add(o), o.ceReload(t.styles), c.delete(o)) : o.parent ? pt(() => {
      o.parent.update(), c.delete(o);
    }) : o.appContext.reload ? o.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    ), o.root.ce && o !== o.root && o.root.ce._removeChildStyle(i);
  }
  Gt(() => {
    Ue.clear();
  });
}
function vt(e, t) {
  R(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function Be(e) {
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
let ne, be = [];
function Zt(e, t) {
  var n, s;
  ne = e, ne ? (ne.enabled = !0, be.forEach(({ event: r, args: o }) => ne.emit(r, ...o)), be = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((s = (n = window.navigator) == null ? void 0 : n.userAgent) != null && s.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((o) => {
    Zt(o, t);
  }), setTimeout(() => {
    ne || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, be = []);
  }, 3e3)) : be = [];
}
let j = null, pr = null;
const dr = (e) => e.__isTeleport;
function kt(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, kt(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function hr(e, t) {
  return N(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    R({ name: e.name }, t, { setup: e })
  ) : e;
}
Pe().requestIdleCallback;
Pe().cancelIdleCallback;
const _r = Symbol.for("v-ndc"), ke = (e) => e ? Kr(e) ? zr(e) : ke(e.parent) : null, fe = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ R(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? Ee(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? Ee(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? Ee(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? Ee(e.refs) : e.refs,
    $parent: (e) => ke(e.parent),
    $root: (e) => ke(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Er(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      pt(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = ir.bind(e.proxy)),
    $watch: (e) => Rr.bind(e)
  })
), gr = (e) => e === "_" || e === "$", Je = (e, t) => e !== T && !e.__isScriptSetup && v(e, t), mr = {
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
        if (Je(s, t))
          return i[t] = 1, s[t];
        if (r !== T && v(r, t))
          return i[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (f = e.propsOptions[0]) && v(f, t)
        )
          return i[t] = 3, o[t];
        if (n !== T && v(n, t))
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
    if (n !== T && v(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      u = a.config.globalProperties, v(u, t)
    )
      return u[t];
    process.env.NODE_ENV !== "production" && j && (!P(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (r !== T && gr(t[0]) && v(r, t) ? E(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === j && E(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: o } = e;
    return Je(r, t) ? (r[t] = n, !0) : process.env.NODE_ENV !== "production" && r.__isScriptSetup && v(r, t) ? (E(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : s !== T && v(s, t) ? (s[t] = n, !0) : v(e.props, t) ? (process.env.NODE_ENV !== "production" && E(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && E(
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
    return !!n[i] || e !== T && v(e, i) || Je(t, i) || (c = o[0]) && v(c, i) || v(s, i) || v(fe, i) || v(r.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : v(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (mr.ownKeys = (e) => (E(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function bt(e) {
  return m(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function Er(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: r,
    optionsCache: o,
    config: { optionMergeStrategies: i }
  } = e.appContext, c = o.get(t);
  let a;
  return c ? a = c : !r.length && !n && !s ? a = t : (a = {}, r.length && r.forEach(
    (f) => Ce(a, f, i, !0)
  ), Ce(a, t, i)), O(t) && o.set(t, a), a;
}
function Ce(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  o && Ce(e, o, n, !0), r && r.forEach(
    (i) => Ce(e, i, n, !0)
  );
  for (const i in t)
    if (s && i === "expose")
      process.env.NODE_ENV !== "production" && E(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const c = vr[i] || n && n[i];
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const vr = {
  data: Nt,
  props: Ot,
  emits: Ot,
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
  watch: Nr,
  // provide / inject
  provide: Nt,
  inject: br
};
function Nt(e, t) {
  return t ? e ? function() {
    return R(
      N(e) ? e.call(this, this) : e,
      N(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function br(e, t) {
  return le(wt(e), wt(t));
}
function wt(e) {
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
  return e ? R(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Ot(e, t) {
  return e ? m(e) && m(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : R(
    /* @__PURE__ */ Object.create(null),
    bt(e),
    bt(t ?? {})
  ) : t;
}
function Nr(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = R(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = S(e[s], t[s]);
  return n;
}
let wr = null;
function Or(e, t, n = !1) {
  const s = He || j;
  if (s || wr) {
    const r = s ? s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && N(t) ? t.call(s && s.proxy) : t;
    process.env.NODE_ENV !== "production" && E(`injection "${String(e)}" not found.`);
  } else process.env.NODE_ENV !== "production" && E("inject() can only be used inside setup() or functional components.");
}
const Sr = {}, en = (e) => Object.getPrototypeOf(e) === Sr, yr = Ir, xr = Symbol.for("v-scx"), Dr = () => {
  {
    const e = Or(xr);
    return e || process.env.NODE_ENV !== "production" && E(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
};
function Vr(e, t, n = T) {
  const { immediate: s, deep: r, flush: o, once: i } = n;
  process.env.NODE_ENV !== "production" && !t && (s !== void 0 && E(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), r !== void 0 && E(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ), i !== void 0 && E(
    'watch() "once" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const c = R({}, n);
  process.env.NODE_ENV !== "production" && (c.onWarn = E);
  const a = t && s || !t && o !== "post";
  let f;
  if (tt) {
    if (o === "sync") {
      const p = Dr();
      f = p.__watcherHandles || (p.__watcherHandles = []);
    } else if (!a) {
      const p = () => {
      };
      return p.stop = re, p.resume = re, p.pause = re, p;
    }
  }
  const d = He;
  c.call = (p, b, C) => Jt(p, d, b, C);
  let l = !1;
  o === "post" ? c.scheduler = (p) => {
    yr(p, d && d.suspense);
  } : o !== "sync" && (l = !0, c.scheduler = (p, b) => {
    b ? p() : pt(p);
  }), c.augmentJob = (p) => {
    t && (p.flags |= 4), l && (p.flags |= 2, d && (p.id = d.uid, p.i = d));
  };
  const u = Xn(e, t, c);
  return tt && (f ? f.push(u) : a && u()), u;
}
function Rr(e, t, n) {
  const s = this.proxy, r = P(e) ? e.includes(".") ? Cr(s, e) : () => s[e] : e.bind(s, s);
  let o;
  N(t) ? o = t : (o = t.handler, n = t);
  const i = Lr(this), c = Vr(r, o.bind(s), n);
  return i(), c;
}
function Cr(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
const Tr = (e) => e.__isSuspense;
function Ir(e, t) {
  t && t.pendingBranch ? m(e) ? t.effects.push(...e) : t.effects.push(e) : Gt(e);
}
const dt = Symbol.for("v-fgt"), Pr = Symbol.for("v-txt"), $r = Symbol.for("v-cmt"), Ne = [];
let $ = null;
function tn(e = !1) {
  Ne.push($ = e ? null : []);
}
function Mr() {
  Ne.pop(), $ = Ne[Ne.length - 1] || null;
}
function Ar(e) {
  return e.dynamicChildren = $ || pn, Mr(), $ && $.push(e), e;
}
function nn(e, t, n, s, r, o) {
  return Ar(
    D(
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
function Hr(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
const Fr = (...e) => on(
  ...e
), rn = ({ key: e }) => e ?? null, we = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? P(e) || x(e) || N(e) ? { i: j, r: e, k: t, f: !!n } : e : null);
function D(e, t = null, n = null, s = 0, r = null, o = e === dt ? 0 : 1, i = !1, c = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && rn(t),
    ref: t && we(t),
    scopeId: pr,
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
    ctx: j
  };
  return c ? (ht(a, n), o & 128 && e.normalize(a)) : n && (a.shapeFlag |= P(n) ? 8 : 16), process.env.NODE_ENV !== "production" && a.key !== a.key && E("VNode created with invalid key (NaN). VNode type:", a.type), // avoid a block node from tracking itself
  !i && // has current parent block
  $ && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && $.push(a), a;
}
const sn = process.env.NODE_ENV !== "production" ? Fr : on;
function on(e, t = null, n = null, s = 0, r = null, o = !1) {
  if ((!e || e === _r) && (process.env.NODE_ENV !== "production" && !e && E(`Invalid vnode type when creating vnode: ${e}.`), e = $r), Hr(e)) {
    const c = Te(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && ht(c, n), !o && $ && (c.shapeFlag & 6 ? $[$.indexOf(e)] = c : $.push(c)), c.patchFlag = -2, c;
  }
  if (un(e) && (e = e.__vccOpts), t) {
    t = jr(t);
    let { class: c, style: a } = t;
    c && !P(c) && (t.class = st(c)), O(a) && (ye(a) && !m(a) && (a = R({}, a)), t.style = rt(a));
  }
  const i = P(e) ? 1 : Tr(e) ? 128 : dr(e) ? 64 : O(e) ? 4 : N(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && ye(e) && (e = h(e), E(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), D(
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
function jr(e) {
  return e ? ye(e) || en(e) ? R({}, e) : e : null;
}
function Te(e, t, n = !1, s = !1) {
  const { props: r, ref: o, patchFlag: i, children: c, transition: a } = e, f = t ? Wr(r || {}, t) : r, d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && rn(f),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && o ? m(o) ? o.concat(we(t)) : [o, we(t)] : we(t)
    ) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && i === -1 && m(c) ? c.map(cn) : c,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== dt ? i === -1 ? 16 : i | 16 : i,
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
    ssContent: e.ssContent && Te(e.ssContent),
    ssFallback: e.ssFallback && Te(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return a && s && kt(
    d,
    a.clone(d)
  ), d;
}
function cn(e) {
  const t = Te(e);
  return m(e.children) && (t.children = e.children.map(cn)), t;
}
function q(e = " ", t = 0) {
  return sn(Pr, null, e, t);
}
function ht(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (m(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), ht(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !en(t) ? t._ctx = j : r === 3 && j && (j.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else N(t) ? (t = { default: t, _ctx: j }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [q(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Wr(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = st([t.class, s.class]));
      else if (r === "style")
        t.style = rt([t.style, s.style]);
      else if (dn(r)) {
        const o = t[r], i = s[r];
        i && o !== i && !(m(o) && o.includes(i)) && (t[r] = o ? [].concat(o, i) : i);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
let He = null, et;
{
  const e = Pe(), t = (n, s) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(s), (o) => {
      r.length > 1 ? r.forEach((i) => i(o)) : r[0](o);
    };
  };
  et = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => He = n
  ), t(
    "__VUE_SSR_SETTERS__",
    (n) => tt = n
  );
}
const Lr = (e) => {
  const t = He;
  return et(e), e.scope.on(), () => {
    e.scope.off(), et(t);
  };
};
function Kr(e) {
  return e.vnode.shapeFlag & 4;
}
let tt = !1;
process.env.NODE_ENV;
function zr(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Gn(Un(e.exposed)), {
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
const Ur = /(?:^|[-_])(\w)/g, Br = (e) => e.replace(Ur, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function ln(e, t = !0) {
  return N(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function an(e, t, n = !1) {
  let s = ln(t);
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
  return s ? Br(s) : n ? "App" : "Anonymous";
}
function un(e) {
  return N(e) && "__vccOpts" in e;
}
function Jr() {
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
      ] : se(l) ? [
        "div",
        {},
        ["span", e, V(l) ? "ShallowReactive" : "Reactive"],
        "<",
        c(l),
        `>${W(l) ? " (readonly)" : ""}`
      ] : W(l) ? [
        "div",
        {},
        ["span", e, V(l) ? "ShallowReadonly" : "Readonly"],
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
    l.type.props && l.props && u.push(i("props", h(l.props))), l.setupState !== T && u.push(i("setup", l.setupState)), l.data !== T && u.push(i("data", h(l.data)));
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
    return u = R({}, u), Object.keys(u).length ? [
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
    for (const C in l.ctx)
      f(p, C, u) && (b[C] = l.ctx[C]);
    return b;
  }
  function f(l, u, p) {
    const b = l[p];
    if (m(b) && b.includes(u) || O(b) && u in b || l.extends && f(l.extends, u, p) || l.mixins && l.mixins.some((C) => f(C, u, p)))
      return !0;
  }
  function d(l) {
    return V(l) ? "ShallowRef" : l.effect ? "ComputedRef" : "Ref";
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
function Yr() {
  Jr();
}
process.env.NODE_ENV !== "production" && Yr();
const qr = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t)
    n[s] = r;
  return n;
}, Gr = { class: "card" }, Qr = {
  __name: "HelloWorld",
  props: {
    msg: String
  },
  setup(e) {
    const t = Ze(0);
    return (n, s) => (tn(), nn(dt, null, [
      D("h1", null, Oe(e.msg), 1),
      D("div", Gr, [
        D("button", {
          type: "button",
          onClick: s[0] || (s[0] = (r) => t.value++)
        }, "count is " + Oe(t.value), 1),
        s[1] || (s[1] = D("p", null, [
          q(" Edit "),
          D("code", null, "components/HelloWorld.vue"),
          q(" to test HMR ")
        ], -1))
      ]),
      s[2] || (s[2] = D("p", null, [
        q(" Check out "),
        D("a", {
          href: "https://vuejs.org/guide/quick-start.html#local",
          target: "_blank"
        }, "create-vue"),
        q(", the official Vue + Vite starter ")
      ], -1)),
      s[3] || (s[3] = D("p", null, [
        q(" Learn more about IDE Support for Vue in the "),
        D("a", {
          href: "https://vuejs.org/guide/scaling-up/tooling.html#ide-support",
          target: "_blank"
        }, "Vue Docs Scaling up Guide"),
        q(". ")
      ], -1)),
      s[4] || (s[4] = D("p", { class: "read-the-docs" }, "Click on the Vite and Vue logos to learn more", -1))
    ], 64));
  }
}, Xr = /* @__PURE__ */ qr(Qr, [["__scopeId", "data-v-830e400e"]]), Zr = { class: "my-component" }, kr = /* @__PURE__ */ hr({
  __name: "MyComponent",
  emits: ["componentClick"],
  setup(e, { emit: t }) {
    const n = t, s = Ze("Hello from MyComponent!"), r = Ze(!1), o = () => {
      r.value = !r.value, n("componentClick"), alert("Button Clicked!");
    };
    return (i, c) => (tn(), nn("div", Zr, [
      D("h2", null, Oe(s.value), 1),
      D("button", {
        class: "my-component-button",
        onClick: o
      }, "Click Me!"),
      sn(Xr)
    ]));
  }
});
export {
  Xr as HelloWorld,
  kr as MyComponent
};

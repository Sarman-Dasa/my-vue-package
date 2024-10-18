/**
* @vue/shared v3.5.12
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function on(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const C = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, cn = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], te = () => {
}, ln = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), V = Object.assign, an = Object.prototype.hasOwnProperty, b = (e, t) => an.call(e, t), m = Array.isArray, Y = (e) => Ce(e) === "[object Map]", vt = (e) => Ce(e) === "[object Set]", N = (e) => typeof e == "function", I = (e) => typeof e == "string", Q = (e) => typeof e == "symbol", O = (e) => e !== null && typeof e == "object", un = (e) => (O(e) || N(e)) && N(e.then) && N(e.catch), Nt = Object.prototype.toString, Ce = (e) => Nt.call(e), wt = (e) => Ce(e).slice(8, -1), Ot = (e) => Ce(e) === "[object Object]", ke = (e) => I(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, fn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, pn = fn((e) => e.charAt(0).toUpperCase() + e.slice(1)), z = (e, t) => !Object.is(e, t), dn = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
};
let ft;
const Te = () => ft || (ft = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function et(e) {
  if (m(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = I(s) ? mn(s) : et(s);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else if (I(e) || O(e))
    return e;
}
const hn = /;(?![^(]*\))/g, _n = /:([^]+)/, gn = /\/\*[^]*?\*\//g;
function mn(e) {
  const t = {};
  return e.replace(gn, "").split(hn).forEach((n) => {
    if (n) {
      const s = n.split(_n);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function tt(e) {
  let t = "";
  if (I(e))
    t = e;
  else if (m(e))
    for (let n = 0; n < e.length; n++) {
      const s = tt(e[n]);
      s && (t += s + " ");
    }
  else if (O(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const St = (e) => !!(e && e.__v_isRef === !0), yt = (e) => I(e) ? e : e == null ? "" : m(e) || O(e) && (e.toString === Nt || !N(e.toString)) ? St(e) ? yt(e.value) : JSON.stringify(e, xt, 2) : String(e), xt = (e, t) => St(t) ? xt(e, t.value) : Y(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, r], o) => (n[Fe(s, o) + " =>"] = r, n),
    {}
  )
} : vt(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Fe(n))
} : Q(t) ? Fe(t) : O(t) && !m(t) && !Ot(t) ? String(t) : t, Fe = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Q(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.12
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function U(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let g;
const He = /* @__PURE__ */ new WeakSet();
class En {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0;
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, He.has(this) && (He.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || bn(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, pt(this), Vt(this);
    const t = g, n = $;
    g = this, $ = !0;
    try {
      return this.fn();
    } finally {
      process.env.NODE_ENV !== "production" && g !== this && U(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), Rt(this), g = t, $ = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        st(t);
      this.deps = this.depsTail = void 0, pt(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? He.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Be(this) && this.run();
  }
  get dirty() {
    return Be(this);
  }
}
let Dt = 0, ce, le;
function bn(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = le, le = e;
    return;
  }
  e.next = ce, ce = e;
}
function nt() {
  Dt++;
}
function rt() {
  if (--Dt > 0)
    return;
  if (le) {
    let t = le;
    for (le = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; ce; ) {
    let t = ce;
    for (ce = void 0; t; ) {
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
function Vt(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Rt(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const r = s.prevDep;
    s.version === -1 ? (s === n && (n = r), st(s), Nn(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = r;
  }
  e.deps = t, e.depsTail = n;
}
function Be(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (vn(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function vn(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Ne))
    return;
  e.globalVersion = Ne;
  const t = e.dep;
  if (e.flags |= 2, t.version > 0 && !e.isSSR && e.deps && !Be(e)) {
    e.flags &= -3;
    return;
  }
  const n = g, s = $;
  g = e, $ = !0;
  try {
    Vt(e);
    const r = e.fn(e._value);
    (t.version === 0 || z(r, e._value)) && (e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    g = n, $ = s, Rt(e), e.flags &= -3;
  }
}
function st(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: r } = e;
  if (s && (s.nextSub = r, e.prevSub = void 0), r && (r.prevSub = s, e.nextSub = void 0), process.env.NODE_ENV !== "production" && n.subsHead === e && (n.subsHead = r), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let o = n.computed.deps; o; o = o.nextDep)
      st(o, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Nn(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let $ = !0;
const Ct = [];
function Ie() {
  Ct.push($), $ = !1;
}
function Pe() {
  const e = Ct.pop();
  $ = e === void 0 ? !0 : e;
}
function pt(e) {
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
let Ne = 0;
class wn {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Tt {
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, process.env.NODE_ENV !== "production" && (this.subsHead = void 0);
  }
  track(t) {
    if (!g || !$ || g === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== g)
      n = this.activeLink = new wn(g, this), g.deps ? (n.prevDep = g.depsTail, g.depsTail.nextDep = n, g.depsTail = n) : g.deps = g.depsTail = n, It(n);
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
    this.version++, Ne++, this.notify(t);
  }
  notify(t) {
    nt();
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
      rt();
    }
  }
}
function It(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        It(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), process.env.NODE_ENV !== "production" && e.dep.subsHead === void 0 && (e.dep.subsHead = e), e.dep.subs = e;
  }
}
const Je = /* @__PURE__ */ new WeakMap(), q = Symbol(
  process.env.NODE_ENV !== "production" ? "Object iterate" : ""
), Ye = Symbol(
  process.env.NODE_ENV !== "production" ? "Map keys iterate" : ""
), ue = Symbol(
  process.env.NODE_ENV !== "production" ? "Array iterate" : ""
);
function w(e, t, n) {
  if ($ && g) {
    let s = Je.get(e);
    s || Je.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || (s.set(n, r = new Tt()), r.map = s, r.key = n), process.env.NODE_ENV !== "production" ? r.track({
      target: e,
      type: t,
      key: n
    }) : r.track();
  }
}
function K(e, t, n, s, r, o) {
  const i = Je.get(e);
  if (!i) {
    Ne++;
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
  if (nt(), t === "clear")
    i.forEach(c);
  else {
    const a = m(e), f = a && ke(n);
    if (a && n === "length") {
      const d = Number(s);
      i.forEach((l, u) => {
        (u === "length" || u === ue || !Q(u) && u >= d) && c(l);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && c(i.get(n)), f && c(i.get(ue)), t) {
        case "add":
          a ? f && c(i.get("length")) : (c(i.get(q)), Y(e) && c(i.get(Ye)));
          break;
        case "delete":
          a || (c(i.get(q)), Y(e) && c(i.get(Ye)));
          break;
        case "set":
          Y(e) && c(i.get(q));
          break;
      }
  }
  rt();
}
function Z(e) {
  const t = h(e);
  return t === e ? t : (w(t, "iterate", ue), D(e) ? t : t.map(y));
}
function ot(e) {
  return w(e = h(e), "iterate", ue), e;
}
const On = {
  __proto__: null,
  [Symbol.iterator]() {
    return je(this, Symbol.iterator, y);
  },
  concat(...e) {
    return Z(this).concat(
      ...e.map((t) => m(t) ? Z(t) : t)
    );
  },
  entries() {
    return je(this, "entries", (e) => (e[1] = y(e[1]), e));
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
    return We(this, "includes", e);
  },
  indexOf(...e) {
    return We(this, "indexOf", e);
  },
  join(e) {
    return Z(this).join(e);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...e) {
    return We(this, "lastIndexOf", e);
  },
  map(e, t) {
    return A(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return oe(this, "pop");
  },
  push(...e) {
    return oe(this, "push", e);
  },
  reduce(e, ...t) {
    return dt(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return dt(this, "reduceRight", e, t);
  },
  shift() {
    return oe(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return A(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return oe(this, "splice", e);
  },
  toReversed() {
    return Z(this).toReversed();
  },
  toSorted(e) {
    return Z(this).toSorted(e);
  },
  toSpliced(...e) {
    return Z(this).toSpliced(...e);
  },
  unshift(...e) {
    return oe(this, "unshift", e);
  },
  values() {
    return je(this, "values", y);
  }
};
function je(e, t, n) {
  const s = ot(e), r = s[t]();
  return s !== e && !D(e) && (r._next = r.next, r.next = () => {
    const o = r._next();
    return o.value && (o.value = n(o.value)), o;
  }), r;
}
const Sn = Array.prototype;
function A(e, t, n, s, r, o) {
  const i = ot(e), c = i !== e && !D(e), a = i[t];
  if (a !== Sn[t]) {
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
function dt(e, t, n, s) {
  const r = ot(e);
  let o = n;
  return r !== e && (D(e) ? n.length > 3 && (o = function(i, c, a) {
    return n.call(this, i, c, a, e);
  }) : o = function(i, c, a) {
    return n.call(this, i, y(c), a, e);
  }), r[t](o, ...s);
}
function We(e, t, n) {
  const s = h(e);
  w(s, "iterate", ue);
  const r = s[t](...n);
  return (r === -1 || r === !1) && we(n[0]) ? (n[0] = h(n[0]), s[t](...n)) : r;
}
function oe(e, t, n = []) {
  Ie(), nt();
  const s = h(e)[t].apply(e, n);
  return rt(), Pe(), s;
}
const yn = /* @__PURE__ */ on("__proto__,__v_isRef,__isVue"), Pt = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Q)
);
function xn(e) {
  Q(e) || (e = String(e));
  const t = h(this);
  return w(t, "has", e), t.hasOwnProperty(e);
}
class $t {
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
      return s === (r ? o ? Ht : Ft : o ? An : At).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const i = m(t);
    if (!r) {
      let a;
      if (i && (a = On[n]))
        return a;
      if (n === "hasOwnProperty")
        return xn;
    }
    const c = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      x(t) ? t : s
    );
    return (Q(n) ? Pt.has(n) : yn(n)) || (r || w(t, "get", n), o) ? c : x(c) ? i && ke(n) ? c : c.value : O(c) ? r ? Wt(c) : jt(c) : c;
  }
}
class Dn extends $t {
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
    const i = m(t) && ke(n) ? Number(n) < t.length : b(t, n), c = Reflect.set(
      t,
      n,
      s,
      x(t) ? t : r
    );
    return t === h(r) && (i ? z(s, o) && K(t, "set", n, s, o) : K(t, "add", n, s)), c;
  }
  deleteProperty(t, n) {
    const s = b(t, n), r = t[n], o = Reflect.deleteProperty(t, n);
    return o && s && K(t, "delete", n, void 0, r), o;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!Q(n) || !Pt.has(n)) && w(t, "has", n), s;
  }
  ownKeys(t) {
    return w(
      t,
      "iterate",
      m(t) ? "length" : q
    ), Reflect.ownKeys(t);
  }
}
class Mt extends $t {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return process.env.NODE_ENV !== "production" && U(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return process.env.NODE_ENV !== "production" && U(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const Vn = /* @__PURE__ */ new Dn(), Rn = /* @__PURE__ */ new Mt(), Cn = /* @__PURE__ */ new Mt(!0), qe = (e) => e, he = (e) => Reflect.getPrototypeOf(e);
function Tn(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, o = h(r), i = Y(o), c = e === "entries" || e === Symbol.iterator && i, a = e === "keys" && i, f = r[e](...s), d = n ? qe : t ? Ge : y;
    return !t && w(
      o,
      "iterate",
      a ? Ye : q
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
function _e(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      U(
        `${pn(e)} operation ${n}failed: target is readonly.`,
        h(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function In(e, t) {
  const n = {
    get(r) {
      const o = this.__v_raw, i = h(o), c = h(r);
      e || (z(r, c) && w(i, "get", r), w(i, "get", c));
      const { has: a } = he(i), f = t ? qe : e ? Ge : y;
      if (a.call(i, r))
        return f(o.get(r));
      if (a.call(i, c))
        return f(o.get(c));
      o !== i && o.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && w(h(r), "iterate", q), Reflect.get(r, "size", r);
    },
    has(r) {
      const o = this.__v_raw, i = h(o), c = h(r);
      return e || (z(r, c) && w(i, "has", r), w(i, "has", c)), r === c ? o.has(r) : o.has(r) || o.has(c);
    },
    forEach(r, o) {
      const i = this, c = i.__v_raw, a = h(c), f = t ? qe : e ? Ge : y;
      return !e && w(a, "iterate", q), c.forEach((d, l) => r.call(o, f(d), f(l), i));
    }
  };
  return V(
    n,
    e ? {
      add: _e("add"),
      set: _e("set"),
      delete: _e("delete"),
      clear: _e("clear")
    } : {
      add(r) {
        !t && !D(r) && !j(r) && (r = h(r));
        const o = h(this);
        return he(o).has.call(o, r) || (o.add(r), K(o, "add", r, r)), this;
      },
      set(r, o) {
        !t && !D(o) && !j(o) && (o = h(o));
        const i = h(this), { has: c, get: a } = he(i);
        let f = c.call(i, r);
        f ? process.env.NODE_ENV !== "production" && ht(i, c, r) : (r = h(r), f = c.call(i, r));
        const d = a.call(i, r);
        return i.set(r, o), f ? z(o, d) && K(i, "set", r, o, d) : K(i, "add", r, o), this;
      },
      delete(r) {
        const o = h(this), { has: i, get: c } = he(o);
        let a = i.call(o, r);
        a ? process.env.NODE_ENV !== "production" && ht(o, i, r) : (r = h(r), a = i.call(o, r));
        const f = c ? c.call(o, r) : void 0, d = o.delete(r);
        return a && K(o, "delete", r, void 0, f), d;
      },
      clear() {
        const r = h(this), o = r.size !== 0, i = process.env.NODE_ENV !== "production" ? Y(r) ? new Map(r) : new Set(r) : void 0, c = r.clear();
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
    n[r] = Tn(r, e, t);
  }), n;
}
function it(e, t) {
  const n = In(e, t);
  return (s, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(
    b(n, r) && r in s ? n : s,
    r,
    o
  );
}
const Pn = {
  get: /* @__PURE__ */ it(!1, !1)
}, $n = {
  get: /* @__PURE__ */ it(!0, !1)
}, Mn = {
  get: /* @__PURE__ */ it(!0, !0)
};
function ht(e, t, n) {
  const s = h(n);
  if (s !== n && t.call(e, s)) {
    const r = wt(e);
    U(
      `Reactive ${r} contains both the raw and reactive versions of the same object${r === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const At = /* @__PURE__ */ new WeakMap(), An = /* @__PURE__ */ new WeakMap(), Ft = /* @__PURE__ */ new WeakMap(), Ht = /* @__PURE__ */ new WeakMap();
function Fn(e) {
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
function Hn(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Fn(wt(e));
}
function jt(e) {
  return j(e) ? e : ct(
    e,
    !1,
    Vn,
    Pn,
    At
  );
}
function Wt(e) {
  return ct(
    e,
    !0,
    Rn,
    $n,
    Ft
  );
}
function ge(e) {
  return ct(
    e,
    !0,
    Cn,
    Mn,
    Ht
  );
}
function ct(e, t, n, s, r) {
  if (!O(e))
    return process.env.NODE_ENV !== "production" && U(
      `value cannot be made ${t ? "readonly" : "reactive"}: ${String(
        e
      )}`
    ), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = r.get(e);
  if (o)
    return o;
  const i = Hn(e);
  if (i === 0)
    return e;
  const c = new Proxy(
    e,
    i === 2 ? s : n
  );
  return r.set(e, c), c;
}
function ne(e) {
  return j(e) ? ne(e.__v_raw) : !!(e && e.__v_isReactive);
}
function j(e) {
  return !!(e && e.__v_isReadonly);
}
function D(e) {
  return !!(e && e.__v_isShallow);
}
function we(e) {
  return e ? !!e.__v_raw : !1;
}
function h(e) {
  const t = e && e.__v_raw;
  return t ? h(t) : e;
}
function jn(e) {
  return !b(e, "__v_skip") && Object.isExtensible(e) && dn(e, "__v_skip", !0), e;
}
const y = (e) => O(e) ? jt(e) : e, Ge = (e) => O(e) ? Wt(e) : e;
function x(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function Wn(e) {
  return Kn(e, !1);
}
function Kn(e, t) {
  return x(e) ? e : new Ln(e, t);
}
class Ln {
  constructor(t, n) {
    this.dep = new Tt(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : h(t), this._value = n ? t : y(t), this.__v_isShallow = n;
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
function zn(e) {
  return x(e) ? e.value : e;
}
const Un = {
  get: (e, t, n) => t === "__v_raw" ? e : zn(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return x(r) && !x(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function Bn(e) {
  return ne(e) ? e : new Proxy(e, Un);
}
const me = {}, Oe = /* @__PURE__ */ new WeakMap();
let J;
function Jn(e, t = !1, n = J) {
  if (n) {
    let s = Oe.get(n);
    s || Oe.set(n, s = []), s.push(e);
  } else process.env.NODE_ENV !== "production" && !t && U(
    "onWatcherCleanup() was called when there was no active watcher to associate with."
  );
}
function Yn(e, t, n = C) {
  const { immediate: s, deep: r, once: o, scheduler: i, augmentJob: c, call: a } = n, f = (_) => {
    (n.onWarn || U)(
      "Invalid watch source: ",
      _,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, d = (_) => r ? _ : D(_) || r === !1 || r === 0 ? L(_, 1) : L(_);
  let l, u, p, v, R = !1, pe = !1;
  if (x(e) ? (u = () => e.value, R = D(e)) : ne(e) ? (u = () => d(e), R = !0) : m(e) ? (pe = !0, R = e.some((_) => ne(_) || D(_)), u = () => e.map((_) => {
    if (x(_))
      return _.value;
    if (ne(_))
      return d(_);
    if (N(_))
      return a ? a(_, 2) : _();
    process.env.NODE_ENV !== "production" && f(_);
  })) : N(e) ? t ? u = a ? () => a(e, 2) : e : u = () => {
    if (p) {
      Ie();
      try {
        p();
      } finally {
        Pe();
      }
    }
    const _ = J;
    J = l;
    try {
      return a ? a(e, 3, [v]) : e(v);
    } finally {
      J = _;
    }
  } : (u = te, process.env.NODE_ENV !== "production" && f(e)), t && r) {
    const _ = u, M = r === !0 ? 1 / 0 : r;
    u = () => L(_(), M);
  }
  const X = () => {
    l.stop();
  };
  if (o && t) {
    const _ = t;
    t = (...M) => {
      _(...M), X();
    };
  }
  let B = pe ? new Array(e.length).fill(me) : me;
  const se = (_) => {
    if (!(!(l.flags & 1) || !l.dirty && !_))
      if (t) {
        const M = l.run();
        if (r || R || (pe ? M.some((Ae, de) => z(Ae, B[de])) : z(M, B))) {
          p && p();
          const Ae = J;
          J = l;
          try {
            const de = [
              M,
              // pass undefined as the old value when it's changed for the first time
              B === me ? void 0 : pe && B[0] === me ? [] : B,
              v
            ];
            a ? a(t, 3, de) : (
              // @ts-expect-error
              t(...de)
            ), B = M;
          } finally {
            J = Ae;
          }
        }
      } else
        l.run();
  };
  return c && c(se), l = new En(u), l.scheduler = i ? () => i(se, !1) : se, v = (_) => Jn(_, !1, l), p = l.onStop = () => {
    const _ = Oe.get(l);
    if (_) {
      if (a)
        a(_, 4);
      else
        for (const M of _) M();
      Oe.delete(l);
    }
  }, process.env.NODE_ENV !== "production" && (l.onTrack = n.onTrack, l.onTrigger = n.onTrigger), t ? s ? se(!0) : B = l.run() : i ? i(se.bind(null, !0), !0) : l.run(), X.pause = l.pause.bind(l), X.resume = l.resume.bind(l), X.stop = X, X;
}
function L(e, t = 1 / 0, n) {
  if (t <= 0 || !O(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(e)))
    return e;
  if (n.add(e), t--, x(e))
    L(e.value, t, n);
  else if (m(e))
    for (let s = 0; s < e.length; s++)
      L(e[s], t, n);
  else if (vt(e) || Y(e))
    e.forEach((s) => {
      L(s, t, n);
    });
  else if (Ot(e)) {
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
const G = [];
function qn(e) {
  G.push(e);
}
function Gn() {
  G.pop();
}
let Ke = !1;
function E(e, ...t) {
  if (Ke) return;
  Ke = !0, Ie();
  const n = G.length ? G[G.length - 1].component : null, s = n && n.appContext.config.warnHandler, r = Qn();
  if (s)
    $e(
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
          ({ vnode: o }) => `at <${rn(n, o.type)}>`
        ).join(`
`),
        r
      ]
    );
  else {
    const o = [`[Vue warn]: ${e}`, ...t];
    r.length && o.push(`
`, ...Xn(r)), console.warn(...o);
  }
  Pe(), Ke = !1;
}
function Qn() {
  let e = G[G.length - 1];
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
function Xn(e) {
  const t = [];
  return e.forEach((n, s) => {
    t.push(...s === 0 ? [] : [`
`], ...Zn(n));
  }), t;
}
function Zn({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", s = e.component ? e.component.parent == null : !1, r = ` at <${rn(
    e.component,
    e.type,
    s
  )}`, o = ">" + n;
  return e.props ? [r, ...kn(e.props), o] : [r + o];
}
function kn(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((s) => {
    t.push(...Kt(s, e[s]));
  }), n.length > 3 && t.push(" ..."), t;
}
function Kt(e, t, n) {
  return I(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : x(t) ? (t = Kt(e, h(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : N(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = h(t), n ? t : [`${e}=`, t]);
}
const Lt = {
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
function $e(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (r) {
    lt(r, t, n);
  }
}
function zt(e, t, n, s) {
  if (N(e)) {
    const r = $e(e, t, n, s);
    return r && un(r) && r.catch((o) => {
      lt(o, t, n);
    }), r;
  }
  if (m(e)) {
    const r = [];
    for (let o = 0; o < e.length; o++)
      r.push(zt(e[o], t, n, s));
    return r;
  } else process.env.NODE_ENV !== "production" && E(
    `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof e}`
  );
}
function lt(e, t, n, s = !0) {
  const r = t ? t.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: i } = t && t.appContext.config || C;
  if (t) {
    let c = t.parent;
    const a = t.proxy, f = process.env.NODE_ENV !== "production" ? Lt[n] : `https://vuejs.org/error-reference/#runtime-${n}`;
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
      Ie(), $e(o, null, 10, [
        e,
        a,
        f
      ]), Pe();
      return;
    }
  }
  er(e, n, r, s, i);
}
function er(e, t, n, s = !0, r = !1) {
  if (process.env.NODE_ENV !== "production") {
    const o = Lt[t];
    if (n && qn(n), E(`Unhandled error${o ? ` during execution of ${o}` : ""}`), n && Gn(), s)
      throw e;
    console.error(e);
  } else {
    if (r)
      throw e;
    console.error(e);
  }
}
const T = [];
let F = -1;
const re = [];
let W = null, k = 0;
const Ut = /* @__PURE__ */ Promise.resolve();
let Se = null;
const tr = 100;
function nr(e) {
  const t = Se || Ut;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function rr(e) {
  let t = F + 1, n = T.length;
  for (; t < n; ) {
    const s = t + n >>> 1, r = T[s], o = fe(r);
    o < e || o === e && r.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function at(e) {
  if (!(e.flags & 1)) {
    const t = fe(e), n = T[T.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= fe(n) ? T.push(e) : T.splice(rr(t), 0, e), e.flags |= 1, Bt();
  }
}
function Bt() {
  Se || (Se = Ut.then(Yt));
}
function Jt(e) {
  m(e) ? re.push(...e) : W && e.id === -1 ? W.splice(k + 1, 0, e) : e.flags & 1 || (re.push(e), e.flags |= 1), Bt();
}
function sr(e) {
  if (re.length) {
    const t = [...new Set(re)].sort(
      (n, s) => fe(n) - fe(s)
    );
    if (re.length = 0, W) {
      W.push(...t);
      return;
    }
    for (W = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), k = 0; k < W.length; k++) {
      const n = W[k];
      process.env.NODE_ENV !== "production" && qt(e, n) || (n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2);
    }
    W = null, k = 0;
  }
}
const fe = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Yt(e) {
  process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map());
  const t = process.env.NODE_ENV !== "production" ? (n) => qt(e, n) : te;
  try {
    for (F = 0; F < T.length; F++) {
      const n = T[F];
      if (n && !(n.flags & 8)) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        n.flags & 4 && (n.flags &= -2), $e(
          n,
          n.i,
          n.i ? 15 : 14
        ), n.flags & 4 || (n.flags &= -2);
      }
    }
  } finally {
    for (; F < T.length; F++) {
      const n = T[F];
      n && (n.flags &= -2);
    }
    F = -1, T.length = 0, sr(e), Se = null, (T.length || re.length) && Yt(e);
  }
}
function qt(e, t) {
  const n = e.get(t) || 0;
  if (n > tr) {
    const s = t.i, r = s && nn(s.type);
    return lt(
      `Maximum recursive updates exceeded${r ? ` in component <${r}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
      null,
      10
    ), !0;
  }
  return e.set(t, n + 1), !1;
}
const Le = /* @__PURE__ */ new Map();
process.env.NODE_ENV !== "production" && (Te().__VUE_HMR_RUNTIME__ = {
  createRecord: ze(or),
  rerender: ze(ir),
  reload: ze(cr)
});
const ye = /* @__PURE__ */ new Map();
function or(e, t) {
  return ye.has(e) ? !1 : (ye.set(e, {
    initialDef: xe(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function xe(e) {
  return sn(e) ? e.__vccOpts : e;
}
function ir(e, t) {
  const n = ye.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((s) => {
    t && (s.render = t, xe(s.type).render = t), s.renderCache = [], s.update();
  }));
}
function cr(e, t) {
  const n = ye.get(e);
  if (!n) return;
  t = xe(t), _t(n.initialDef, t);
  const s = [...n.instances];
  for (let r = 0; r < s.length; r++) {
    const o = s[r], i = xe(o.type);
    let c = Le.get(i);
    c || (i !== n.initialDef && _t(i, t), Le.set(i, c = /* @__PURE__ */ new Set())), c.add(o), o.appContext.propsCache.delete(o.type), o.appContext.emitsCache.delete(o.type), o.appContext.optionsCache.delete(o.type), o.ceReload ? (c.add(o), o.ceReload(t.styles), c.delete(o)) : o.parent ? at(() => {
      o.parent.update(), c.delete(o);
    }) : o.appContext.reload ? o.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    ), o.root.ce && o !== o.root && o.root.ce._removeChildStyle(i);
  }
  Jt(() => {
    Le.clear();
  });
}
function _t(e, t) {
  V(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function ze(e) {
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
let ee, Ee = [];
function Gt(e, t) {
  var n, s;
  ee = e, ee ? (ee.enabled = !0, Ee.forEach(({ event: r, args: o }) => ee.emit(r, ...o)), Ee = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((s = (n = window.navigator) == null ? void 0 : n.userAgent) != null && s.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((o) => {
    Gt(o, t);
  }), setTimeout(() => {
    ee || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, Ee = []);
  }, 3e3)) : Ee = [];
}
let H = null, lr = null;
const ar = (e) => e.__isTeleport;
function Qt(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Qt(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function ur(e, t) {
  return N(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    V({ name: e.name }, t, { setup: e })
  ) : e;
}
Te().requestIdleCallback;
Te().cancelIdleCallback;
const fr = Symbol.for("v-ndc"), Qe = (e) => e ? Lr(e) ? zr(e) : Qe(e.parent) : null, ae = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ V(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? ge(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? ge(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? ge(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? ge(e.refs) : e.refs,
    $parent: (e) => Qe(e.parent),
    $root: (e) => Qe(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => hr(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      at(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = nr.bind(e.proxy)),
    $watch: (e) => yr.bind(e)
  })
), pr = (e) => e === "_" || e === "$", Ue = (e, t) => e !== C && !e.__isScriptSetup && b(e, t), dr = {
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
        if (Ue(s, t))
          return i[t] = 1, s[t];
        if (r !== C && b(r, t))
          return i[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (f = e.propsOptions[0]) && b(f, t)
        )
          return i[t] = 3, o[t];
        if (n !== C && b(n, t))
          return i[t] = 4, n[t];
        i[t] = 0;
      }
    }
    const d = ae[t];
    let l, u;
    if (d)
      return t === "$attrs" ? (w(e.attrs, "get", ""), process.env.NODE_ENV !== "production" && void 0) : process.env.NODE_ENV !== "production" && t === "$slots" && w(e, "get", t), d(e);
    if (
      // css module (injected by vue-loader)
      (l = c.__cssModules) && (l = l[t])
    )
      return l;
    if (n !== C && b(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      u = a.config.globalProperties, b(u, t)
    )
      return u[t];
    process.env.NODE_ENV !== "production" && H && (!I(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (r !== C && pr(t[0]) && b(r, t) ? E(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === H && E(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: o } = e;
    return Ue(r, t) ? (r[t] = n, !0) : process.env.NODE_ENV !== "production" && r.__isScriptSetup && b(r, t) ? (E(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : s !== C && b(s, t) ? (s[t] = n, !0) : b(e.props, t) ? (process.env.NODE_ENV !== "production" && E(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && E(
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
    return !!n[i] || e !== C && b(e, i) || Ue(t, i) || (c = o[0]) && b(c, i) || b(s, i) || b(ae, i) || b(r.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : b(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (dr.ownKeys = (e) => (E(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function gt(e) {
  return m(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function hr(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: r,
    optionsCache: o,
    config: { optionMergeStrategies: i }
  } = e.appContext, c = o.get(t);
  let a;
  return c ? a = c : !r.length && !n && !s ? a = t : (a = {}, r.length && r.forEach(
    (f) => De(a, f, i, !0)
  ), De(a, t, i)), O(t) && o.set(t, a), a;
}
function De(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  o && De(e, o, n, !0), r && r.forEach(
    (i) => De(e, i, n, !0)
  );
  for (const i in t)
    if (s && i === "expose")
      process.env.NODE_ENV !== "production" && E(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const c = _r[i] || n && n[i];
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const _r = {
  data: mt,
  props: bt,
  emits: bt,
  // objects
  methods: ie,
  computed: ie,
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
  components: ie,
  directives: ie,
  // watch
  watch: mr,
  // provide / inject
  provide: mt,
  inject: gr
};
function mt(e, t) {
  return t ? e ? function() {
    return V(
      N(e) ? e.call(this, this) : e,
      N(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function gr(e, t) {
  return ie(Et(e), Et(t));
}
function Et(e) {
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
function ie(e, t) {
  return e ? V(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function bt(e, t) {
  return e ? m(e) && m(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : V(
    /* @__PURE__ */ Object.create(null),
    gt(e),
    gt(t ?? {})
  ) : t;
}
function mr(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = V(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = S(e[s], t[s]);
  return n;
}
let Er = null;
function br(e, t, n = !1) {
  const s = Me || H;
  if (s || Er) {
    const r = s ? s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && N(t) ? t.call(s && s.proxy) : t;
    process.env.NODE_ENV !== "production" && E(`injection "${String(e)}" not found.`);
  } else process.env.NODE_ENV !== "production" && E("inject() can only be used inside setup() or functional components.");
}
const vr = {}, Xt = (e) => Object.getPrototypeOf(e) === vr, Nr = Vr, wr = Symbol.for("v-scx"), Or = () => {
  {
    const e = br(wr);
    return e || process.env.NODE_ENV !== "production" && E(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
};
function Sr(e, t, n = C) {
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
  if (Ze) {
    if (o === "sync") {
      const p = Or();
      f = p.__watcherHandles || (p.__watcherHandles = []);
    } else if (!a) {
      const p = () => {
      };
      return p.stop = te, p.resume = te, p.pause = te, p;
    }
  }
  const d = Me;
  c.call = (p, v, R) => zt(p, d, v, R);
  let l = !1;
  o === "post" ? c.scheduler = (p) => {
    Nr(p, d && d.suspense);
  } : o !== "sync" && (l = !0, c.scheduler = (p, v) => {
    v ? p() : at(p);
  }), c.augmentJob = (p) => {
    t && (p.flags |= 4), l && (p.flags |= 2, d && (p.id = d.uid, p.i = d));
  };
  const u = Yn(e, t, c);
  return Ze && (f ? f.push(u) : a && u()), u;
}
function yr(e, t, n) {
  const s = this.proxy, r = I(e) ? e.includes(".") ? xr(s, e) : () => s[e] : e.bind(s, s);
  let o;
  N(t) ? o = t : (o = t.handler, n = t);
  const i = Kr(this), c = Sr(r, o.bind(s), n);
  return i(), c;
}
function xr(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
const Dr = (e) => e.__isSuspense;
function Vr(e, t) {
  t && t.pendingBranch ? m(e) ? t.effects.push(...e) : t.effects.push(e) : Jt(e);
}
const Zt = Symbol.for("v-fgt"), Rr = Symbol.for("v-txt"), Cr = Symbol.for("v-cmt"), be = [];
let P = null;
function Tr(e = !1) {
  be.push(P = e ? null : []);
}
function Ir() {
  be.pop(), P = be[be.length - 1] || null;
}
function Pr(e) {
  return e.dynamicChildren = P || cn, Ir(), P && P.push(e), e;
}
function $r(e, t, n, s, r, o) {
  return Pr(
    Ve(
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
function Mr(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
const Ar = (...e) => en(
  ...e
), kt = ({ key: e }) => e ?? null, ve = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? I(e) || x(e) || N(e) ? { i: H, r: e, k: t, f: !!n } : e : null);
function Ve(e, t = null, n = null, s = 0, r = null, o = e === Zt ? 0 : 1, i = !1, c = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && kt(t),
    ref: t && ve(t),
    scopeId: lr,
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
    ctx: H
  };
  return c ? (ut(a, n), o & 128 && e.normalize(a)) : n && (a.shapeFlag |= I(n) ? 8 : 16), process.env.NODE_ENV !== "production" && a.key !== a.key && E("VNode created with invalid key (NaN). VNode type:", a.type), // avoid a block node from tracking itself
  !i && // has current parent block
  P && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && P.push(a), a;
}
const Fr = process.env.NODE_ENV !== "production" ? Ar : en;
function en(e, t = null, n = null, s = 0, r = null, o = !1) {
  if ((!e || e === fr) && (process.env.NODE_ENV !== "production" && !e && E(`Invalid vnode type when creating vnode: ${e}.`), e = Cr), Mr(e)) {
    const c = Re(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && ut(c, n), !o && P && (c.shapeFlag & 6 ? P[P.indexOf(e)] = c : P.push(c)), c.patchFlag = -2, c;
  }
  if (sn(e) && (e = e.__vccOpts), t) {
    t = Hr(t);
    let { class: c, style: a } = t;
    c && !I(c) && (t.class = tt(c)), O(a) && (we(a) && !m(a) && (a = V({}, a)), t.style = et(a));
  }
  const i = I(e) ? 1 : Dr(e) ? 128 : ar(e) ? 64 : O(e) ? 4 : N(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && we(e) && (e = h(e), E(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), Ve(
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
function Hr(e) {
  return e ? we(e) || Xt(e) ? V({}, e) : e : null;
}
function Re(e, t, n = !1, s = !1) {
  const { props: r, ref: o, patchFlag: i, children: c, transition: a } = e, f = t ? Wr(r || {}, t) : r, d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && kt(f),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && o ? m(o) ? o.concat(ve(t)) : [o, ve(t)] : ve(t)
    ) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && i === -1 && m(c) ? c.map(tn) : c,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Zt ? i === -1 ? 16 : i | 16 : i,
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
    ssContent: e.ssContent && Re(e.ssContent),
    ssFallback: e.ssFallback && Re(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return a && s && Qt(
    d,
    a.clone(d)
  ), d;
}
function tn(e) {
  const t = Re(e);
  return m(e.children) && (t.children = e.children.map(tn)), t;
}
function jr(e = " ", t = 0) {
  return Fr(Rr, null, e, t);
}
function ut(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (m(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), ut(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !Xt(t) ? t._ctx = H : r === 3 && H && (H.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else N(t) ? (t = { default: t, _ctx: H }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [jr(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Wr(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = tt([t.class, s.class]));
      else if (r === "style")
        t.style = et([t.style, s.style]);
      else if (ln(r)) {
        const o = t[r], i = s[r];
        i && o !== i && !(m(o) && o.includes(i)) && (t[r] = o ? [].concat(o, i) : i);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
let Me = null, Xe;
{
  const e = Te(), t = (n, s) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(s), (o) => {
      r.length > 1 ? r.forEach((i) => i(o)) : r[0](o);
    };
  };
  Xe = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Me = n
  ), t(
    "__VUE_SSR_SETTERS__",
    (n) => Ze = n
  );
}
const Kr = (e) => {
  const t = Me;
  return Xe(e), e.scope.on(), () => {
    e.scope.off(), Xe(t);
  };
};
function Lr(e) {
  return e.vnode.shapeFlag & 4;
}
let Ze = !1;
process.env.NODE_ENV;
function zr(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Bn(jn(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in ae)
        return ae[n](e);
    },
    has(t, n) {
      return n in t || n in ae;
    }
  })) : e.proxy;
}
const Ur = /(?:^|[-_])(\w)/g, Br = (e) => e.replace(Ur, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function nn(e, t = !0) {
  return N(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function rn(e, t, n = !1) {
  let s = nn(t);
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
function sn(e) {
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
      ] : ne(l) ? [
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
    const v = a(l, "inject");
    return v && u.push(i("injected", v)), u.push([
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
    const v = {};
    for (const R in l.ctx)
      f(p, R, u) && (v[R] = l.ctx[R]);
    return v;
  }
  function f(l, u, p) {
    const v = l[p];
    if (m(v) && v.includes(u) || O(v) && u in v || l.extends && f(l.extends, u, p) || l.mixins && l.mixins.some((R) => f(R, u, p)))
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
function Yr() {
  Jr();
}
process.env.NODE_ENV !== "production" && Yr();
const qr = { class: "my-component" }, Gr = /* @__PURE__ */ ur({
  __name: "MyComponent",
  setup(e) {
    const t = Wn("Hello from MyComponent!"), n = () => {
      alert("Button Clicked!");
    };
    return (s, r) => (Tr(), $r("div", qr, [
      Ve("h2", null, yt(t.value), 1),
      Ve("button", { onClick: n }, "Click Me!")
    ]));
  }
});
export {
  Gr as MyComponent
};

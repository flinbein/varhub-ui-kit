var Ki = Object.defineProperty;
var Bn = (e) => {
  throw TypeError(e);
};
var Zi = (e, t, r) => t in e ? Ki(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var _t = (e, t, r) => Zi(e, typeof t != "symbol" ? t + "" : t, r), rn = (e, t, r) => t.has(e) || Bn("Cannot " + r);
var y = (e, t, r) => (rn(e, t, "read from private field"), r ? r.call(e) : t.get(e)), se = (e, t, r) => t.has(e) ? Bn("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), oe = (e, t, r, i) => (rn(e, t, "write to private field"), i ? i.call(e, r) : t.set(e, r), r), Et = (e, t, r) => (rn(e, t, "access private method"), r);
class Xi {
  constructor(t) {
    _t(this, "index", 0);
    _t(this, "dataView");
    this.dataView = t instanceof DataView ? t : t instanceof ArrayBuffer ? new DataView(t) : new DataView(t.buffer, t.byteOffset, t.byteLength);
  }
  assertSize(t) {
    if (this.dataView.byteLength < this.index + t)
      throw new Error("wrong binary state-data format");
  }
  getNextUint8() {
    return this.dataView.getUint8(this.index++);
  }
  getNextUint16() {
    const t = this.dataView.getUint16(this.index, !0);
    return this.index += 2, t;
  }
  getNextUint32() {
    const t = this.dataView.getUint32(this.index, !0);
    return this.index += 4, t;
  }
  getNextFloat64() {
    const t = this.dataView.getFloat64(this.index, !0);
    return this.index += 8, t;
  }
  skipBytes(t) {
    this.assertSize(t), this.index += t;
  }
  getNextUint8Array(t) {
    return new Uint8Array(this.getArrayBuffer(t));
  }
  getArrayBuffer(t) {
    this.assertSize(t);
    const r = this.dataView.buffer.slice(this.dataView.byteOffset + this.index, this.dataView.byteOffset + this.index + t);
    return this.index += t, r;
  }
  hasBytes() {
    return this.index < this.dataView.byteLength;
  }
}
const an = new TextEncoder(), Yn = new TextDecoder();
function fn(...e) {
  const t = e.flatMap((o) => _e(o)), r = t.reduce((o, v) => o + (typeof v == "number" ? 1 : v.byteLength), 0), i = new Uint8Array(r);
  let s = 0;
  for (let o of t)
    if (typeof o == "number")
      i[s++] = o;
    else {
      const v = new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
      i.set(v, s), s += o.byteLength;
    }
  return i;
}
function _e(e, t) {
  if (t?.has(e))
    throw new Error("wrong xj format: recursive");
  if (e === null)
    return [0];
  if (e === void 0)
    return [21];
  if (typeof e == "boolean")
    return [e ? 2 : 1];
  if (typeof e == "number") {
    if (Number.isInteger(e) && jr(e) && e <= 15)
      return [240 | e];
    if (Number.isSafeInteger(e)) {
      const r = e > 0 ? e : -e;
      if (r <= 255)
        return [jr(e) ? 22 : 24, r];
      if (r <= 65535)
        return [jr(e) ? 25 : 26, Uint16Array.of(r)];
      if (r <= 4294967295)
        return [jr(e) ? 27 : 28, Uint32Array.of(r)];
    }
    return [3, Float64Array.of(e)];
  }
  if (typeof e == "bigint") {
    const r = e < 0n ? -e : e, i = Qi(r);
    return [
      e < 0n ? 23 : 4,
      ..._e(i.length),
      ...i
    ];
  }
  if (typeof e == "string") {
    an.encode(e);
    const r = an.encode(e);
    return r.length <= 15 ? [
      r.length | 224,
      r
    ] : [
      5,
      ...fn(r.length),
      r
    ];
  }
  if (e instanceof ArrayBuffer)
    return [6, ..._e(e.byteLength), new Uint8Array(e)];
  if (e instanceof Int8Array)
    return [7, ..._e(e.length), e];
  if (e instanceof Int16Array)
    return [8, ..._e(e.length), e];
  if (e instanceof Int32Array)
    return [9, ..._e(e.length), e];
  if (e instanceof Uint8Array)
    return [10, ..._e(e.length), e];
  if (e instanceof Uint16Array)
    return [11, ..._e(e.length), e];
  if (e instanceof Uint32Array)
    return [12, ..._e(e.length), e];
  if (e instanceof Uint8ClampedArray)
    return [13, ..._e(e.length), e];
  if (e instanceof Float32Array)
    return [14, ..._e(e.length), e];
  if (e instanceof Float64Array)
    return [15, ..._e(e.length), e];
  if (e instanceof BigInt64Array)
    return [16, ..._e(e.length), e];
  if (e instanceof BigUint64Array)
    return [17, ..._e(e.length), e];
  if (Array.isArray(e))
    return [
      18,
      ..._e(e.length),
      ...e.flatMap((r) => _e(r, new Set(t).add(e)))
    ];
  if (e instanceof Error) {
    let r = [0];
    if (e.cause !== void 0)
      try {
        r = [1, ..._e(e.cause)];
      } catch {
      }
    return [
      20,
      ..._e(String(e.name)),
      ..._e(String(e.message)),
      ..._e(String(e.stack)),
      ...r
    ];
  }
  if (typeof e == "object") {
    const r = Object.getOwnPropertyNames(e).sort(), i = e;
    return [
      19,
      ..._e(r.length),
      ...r.flatMap((s) => [..._e(s), ..._e(i[s], new Set(t).add(e))])
    ];
  }
  throw new Error("wrong xj format: wrong type");
}
function oi(e, t = 1 / 0) {
  typeof e == "string" && (e = an.encode(e));
  const r = [], i = new Xi(e);
  for (; t-- > 0 && i.hasBytes(); )
    r.push(ve(i));
  return r;
}
function ve(e) {
  const t = e.getNextUint8();
  if (t === 0)
    return null;
  if (t === 1)
    return !1;
  if (t === 2)
    return !0;
  if (t === 3)
    return e.getNextFloat64();
  if (t === 4 || t === 23) {
    const r = ve(e), i = e.getNextUint8Array(r), s = es(i);
    return t === 4 ? s : -s;
  }
  if (t === 5) {
    const r = ve(e);
    return Yn.decode(e.getNextUint8Array(r));
  }
  if (t === 6)
    return e.getArrayBuffer(ve(e));
  if (t === 7)
    return new Int8Array(e.getArrayBuffer(ve(e)));
  if (t === 8)
    return new Int16Array(e.getArrayBuffer(ve(e) * 2));
  if (t === 9)
    return new Int32Array(e.getArrayBuffer(ve(e) * 4));
  if (t === 10)
    return new Uint8Array(e.getArrayBuffer(ve(e)));
  if (t === 11)
    return new Uint16Array(e.getArrayBuffer(ve(e) * 2));
  if (t === 12)
    return new Uint32Array(e.getArrayBuffer(ve(e) * 4));
  if (t === 13)
    return new Uint8ClampedArray(e.getArrayBuffer(ve(e)));
  if (t === 14)
    return new Float32Array(e.getArrayBuffer(ve(e) * 4));
  if (t === 15)
    return new Float64Array(e.getArrayBuffer(ve(e) * 8));
  if (t === 16)
    return new BigInt64Array(e.getArrayBuffer(ve(e) * 8));
  if (t === 17)
    return new BigUint64Array(e.getArrayBuffer(ve(e) * 8));
  if (t === 18)
    return Array.from({ length: ve(e) }).map(() => ve(e));
  if (t === 19) {
    const r = /* @__PURE__ */ Object.create(null);
    let i = ve(e);
    for (; i-- > 0; )
      Object.defineProperty(r, ve(e), {
        value: ve(e),
        enumerable: !0,
        writable: !0
      });
    return r;
  }
  if (t === 20) {
    const r = ve(e), i = ve(e), s = ve(e), o = e.getNextUint8();
    let v;
    if (!o)
      v = new Error(i);
    else {
      const _ = ve(e);
      v = new Error(i, { cause: _ });
    }
    return v.name = r, v.stack = s, v;
  }
  if (t !== 21) {
    if (t === 22)
      return e.getNextUint8();
    if (t === 24)
      return -e.getNextUint8();
    if (t === 25)
      return e.getNextUint16();
    if (t === 26)
      return -e.getNextUint16();
    if (t === 27)
      return e.getNextUint32();
    if (t === 28)
      return -e.getNextUint32();
    if (t >= 224 && t <= 239)
      return Yn.decode(e.getNextUint8Array(t & 15));
    if (t >= 240 && t <= 255)
      return t - 240;
    throw new Error("wrong binary state-data format");
  }
}
function Qi(e) {
  if (e === 0n)
    return new Uint8Array(0);
  let t = BigInt(e).toString(16);
  t.length % 2 && (t = "0" + t);
  const r = t.length / 2, i = new Uint8Array(r);
  let s = 0, o = 0;
  for (; s < r; )
    i[s] = parseInt(t.slice(o, o + 2), 16), s += 1, o += 2;
  return i;
}
function es(e) {
  if (e.length === 0)
    return 0n;
  const t = [];
  return Uint8Array.from(e).forEach(function(i) {
    var s = i.toString(16);
    s.length % 2 && (s = "0" + s), t.push(s);
  }), BigInt("0x" + t.join(""));
}
function jr(e) {
  return 1 / 0 / e > 0;
}
var Ze;
class Tr {
  constructor() {
    se(this, Ze, {});
    const t = this;
    Object.assign(this, {
      on(r, i) {
        let s = y(t, Ze)[r];
        return s || (s = y(t, Ze)[r] = []), s.push({ listener: i, context: this }), this;
      },
      once(r, i) {
        let s = y(t, Ze)[r];
        return s || (s = y(t, Ze)[r] = []), s.push({ listener: i, context: this, once: !0 }), this;
      },
      off(r, i) {
        if (!i)
          return delete y(t, Ze)[r], this;
        let s = y(t, Ze)[r];
        if (!s)
          return this;
        const o = s.findIndex((v) => v.listener === i);
        return o !== -1 && s.splice(o, 1), this;
      }
    });
  }
  emit(t, ...r) {
    let i = y(this, Ze)[t]?.slice(0);
    if (!i || i.length === 0)
      return !1;
    for (const { listener: s, once: o, context: v } of i)
      o && this.off(t, s), s.apply(v, r);
    return !0;
  }
  emitWithTry(t, ...r) {
    let i = y(this, Ze)[t]?.slice(0);
    if (!i || i.length === 0)
      return !1;
    for (const { listener: s, once: o, context: v } of i)
      try {
        o && this.off(t, s), s.apply(v, r);
      } catch {
      }
    return !0;
  }
}
Ze = new WeakMap();
const ts = async () => {
};
var Xe, st, wt, mt, At;
class rs {
  constructor(t, r = ts) {
    se(this, Xe);
    se(this, st, new Tr());
    se(this, wt, Promise.withResolvers());
    se(this, mt, !1);
    se(this, At, !1);
    if (oe(this, Xe, t), y(this, wt).promise.catch(() => {
    }), t.binaryType = "arraybuffer", t.readyState === WebSocket.CLOSING || t.readyState === WebSocket.CLOSED)
      throw new Error("websocket is closed");
    t.readyState === WebSocket.CONNECTING ? t.addEventListener("open", () => {
      oe(this, mt, !0), oe(this, At, !1), y(this, st).emitWithTry("open"), y(this, wt).resolve(this);
    }) : (oe(this, mt, !0), y(this, wt).resolve(this)), t.addEventListener("message", (i) => {
      y(this, st).emitWithTry("message", ...oi(i.data));
    }), t.addEventListener("close", (i) => {
      const s = y(this, mt);
      oe(this, mt, !1), oe(this, At, !0), y(this, st).emitWithTry("close", i.reason, s);
    }), t.addEventListener("error", () => {
      oe(this, mt, !1), oe(this, At, !0);
      const i = r ? r() : Promise.resolve(void 0);
      y(this, st).emitWithTry("error", i), y(this, wt).reject(new Error("websocket closed", { cause: i }));
    });
  }
  get promise() {
    return y(this, wt).promise;
  }
  get ready() {
    return y(this, mt);
  }
  get closed() {
    return y(this, At);
  }
  send(...t) {
    const r = fn(...t);
    return y(this, Xe).send(r), this;
  }
  on(t, r) {
    return y(this, st).on.call(this, t, r), this;
  }
  once(t, r) {
    return y(this, st).once.call(this, t, r), this;
  }
  off(t, r) {
    return y(this, st).off.call(this, t, r), this;
  }
  close(t) {
    y(this, Xe).readyState === WebSocket.CLOSED || y(this, Xe).readyState === WebSocket.CLOSING || y(this, Xe).close(4e3, t ?? void 0);
  }
  [Symbol.dispose]() {
    this.close("disposed");
  }
  [Symbol.asyncDispose]() {
    return y(this, Xe).readyState === WebSocket.CLOSED ? Promise.resolve() : new Promise((t) => {
      y(this, Xe).close(4e3, "disposed"), y(this, Xe).addEventListener("close", () => t());
    });
  }
}
Xe = new WeakMap(), st = new WeakMap(), wt = new WeakMap(), mt = new WeakMap(), At = new WeakMap();
var Me, cr, lr, vt, ot, Vt, Tt, Ot, Jt, $e, Kt, Zt, Ft;
class ns {
  constructor(t, r) {
    se(this, Me);
    se(this, cr, null);
    se(this, lr, null);
    se(this, vt, new Tr());
    se(this, ot, new Tr());
    se(this, Vt, null);
    se(this, Tt, Promise.withResolvers());
    se(this, Ot, !1);
    se(this, Jt, !1);
    se(this, $e);
    se(this, Kt);
    se(this, Zt);
    se(this, Ft, (t, ...r) => {
      y(this, Me).send(fn(t, ...r));
    });
    oe(this, Me, t), y(this, Tt).promise.catch(() => {
    }), t.binaryType = "arraybuffer", oe(this, $e, new is(y(this, ot), y(this, Ft))), t.addEventListener("message", (i) => {
      const [s, ...o] = oi(i.data);
      y(this, vt).emitWithTry(s, ...o);
    }), t.addEventListener("close", (i) => {
      oe(this, Jt, !0), oe(this, Ot, !1), y(this, ot).emitWithTry("close");
    }), t.addEventListener("error", () => {
      oe(this, Jt, !0), oe(this, Ot, !1);
      const i = r ? r() : Promise.resolve(void 0);
      y(this, ot).emitWithTry("error", i), y(this, Tt).reject(new Error("websocket closed", { cause: i }));
    }), y(this, vt).on(3, (i, ...s) => {
      if (!y(this, Zt))
        return y(this, $e).onEnter(i, ...s);
      try {
        const o = y(this, Zt).call(this, s);
        if (!o)
          return y(this, $e).roomAction(1, i, "invalid parameters");
        y(this, $e).onEnter(i, ...Array.isArray(o) ? o : s);
      } catch {
        y(this, $e).roomAction(1, i, "invalid parameters");
      }
    }), y(this, vt).on(2, (i) => {
      y(this, $e).onJoin(i);
    }), y(this, vt).on(5, (i, s, o) => {
      y(this, $e).onClose(i, s, o);
    }), y(this, vt).on(4, (i, ...s) => {
      if (!y(this, Kt))
        return y(this, $e).onMessage(i, ...s);
      try {
        const o = y(this, Kt).call(this, s);
        if (!o)
          return y(this, $e).close(i, "invalid message");
        y(this, $e).onMessage(i, ...Array.isArray(o) ? o : s);
      } catch {
        y(this, $e).close(i, "invalid message");
      }
    }), y(this, vt).on(0, (i, s, o) => {
      oe(this, cr, i), oe(this, Vt, s ?? null), oe(this, lr, o ?? null), y(this, Tt).resolve(this), oe(this, Ot, !0), y(this, ot).emitWithTry("ready");
    });
  }
  withType() {
    return this;
  }
  validate({ clientMessage: t, parameters: r }) {
    return oe(this, Kt, t), oe(this, Zt, r), this;
  }
  get promise() {
    return y(this, Tt).promise;
  }
  getConnections(t) {
    return y(this, $e).getConnections(t);
  }
  get ready() {
    return y(this, Ot);
  }
  get closed() {
    return y(this, Jt);
  }
  get message() {
    return y(this, Vt);
  }
  set message(t) {
    if (y(this, Me).readyState !== WebSocket.OPEN)
      throw new Error("websocket is not ready");
    y(this, Vt) !== t && (oe(this, Vt, t), y(this, Ft).call(this, 2, t));
  }
  get id() {
    return y(this, cr);
  }
  get integrity() {
    return y(this, lr);
  }
  broadcast(...t) {
    if (y(this, Me).readyState !== WebSocket.OPEN)
      throw new Error("websocket is not ready");
    return y(this, Ft).call(this, 5, ...t), this;
  }
  destroy() {
    if (y(this, Me).readyState !== WebSocket.OPEN)
      throw new Error("websocket is not ready");
    y(this, Ft).call(this, 3), y(this, Me).close();
  }
  on(t, r) {
    return y(this, ot).on.call(this, t, r), this;
  }
  once(t, r) {
    return y(this, ot).once.call(this, t, r), this;
  }
  off(t, r) {
    return y(this, ot).off.call(this, t, r), this;
  }
  [Symbol.dispose]() {
    y(this, Me).readyState !== WebSocket.CLOSED && y(this, Me).close();
  }
  [Symbol.asyncDispose]() {
    return y(this, Me).readyState === WebSocket.CLOSED ? Promise.resolve() : new Promise((t) => {
      y(this, Me).addEventListener("close", () => t()), y(this, Me).addEventListener("error", () => t()), y(this, Me).close();
    });
  }
}
Me = new WeakMap(), cr = new WeakMap(), lr = new WeakMap(), vt = new WeakMap(), ot = new WeakMap(), Vt = new WeakMap(), Tt = new WeakMap(), Ot = new WeakMap(), Jt = new WeakMap(), $e = new WeakMap(), Kt = new WeakMap(), Zt = new WeakMap(), Ft = new WeakMap();
class is {
  constructor(t, r) {
    _t(this, "roomEmitter");
    _t(this, "roomAction");
    _t(this, "connections", /* @__PURE__ */ new Map());
    _t(this, "readyConnections", /* @__PURE__ */ new Set());
    _t(this, "connectionEmitters", /* @__PURE__ */ new WeakMap());
    this.roomEmitter = t, this.roomAction = r;
  }
  onEnter(t, ...r) {
    const i = new ss(t, r, this);
    return this.connections.set(t, i), this.roomEmitter.emitWithTry("connection", i, ...r), i.deferred || i.open(), i;
  }
  onJoin(t) {
    const r = this.connections.get(t);
    r && (this.readyConnections.has(r) || (this.readyConnections.add(r), this.getConnectionEmitter(r).emitWithTry("open"), this.roomEmitter.emitWithTry("connectionOpen", r)));
  }
  onClose(t, r, i) {
    const s = this.connections.get(t);
    s && (this.connections.delete(t), this.readyConnections.delete(s), this.getConnectionEmitter(s).emitWithTry("close", i, r), this.roomEmitter.emitWithTry("connectionClose", s, i, r));
  }
  onMessage(t, ...r) {
    const i = this.connections.get(t);
    i && (this.getConnectionEmitter(i).emitWithTry("message", ...r), this.roomEmitter.emitWithTry("connectionMessage", i, ...r));
  }
  getConnections(t) {
    const r = [...this.connections.values()];
    return new Set(r.filter((i) => {
      if (t) {
        for (let s of Object.keys(t))
          if (i[s] !== t[s])
            return !1;
      }
      return !0;
    }));
  }
  isReady(t) {
    const r = this.connections.get(t);
    return r ? this.readyConnections.has(r) : !1;
  }
  join(t) {
    this.roomAction(0, t), this.onJoin(t);
  }
  isClosed(t) {
    return !this.connections.has(t);
  }
  send(t, ...r) {
    this.roomAction(4, t, ...r);
  }
  close(t, r) {
    const i = this.connections.get(t), s = i && this.readyConnections.has(i);
    this.roomAction(1, t, r ?? null), this.onClose(t, !!s, r ?? null);
  }
  getConnectionEmitter(t) {
    let r = this.connectionEmitters.get(t);
    return r || (r = new Tr(), this.connectionEmitters.set(t, r)), r;
  }
}
var Qe, fr, at, It, Ut, dr;
class ss {
  constructor(t, r, i) {
    se(this, Qe);
    se(this, fr);
    se(this, at);
    se(this, It);
    se(this, Ut, Promise.withResolvers());
    se(this, dr, !1);
    oe(this, Qe, t), oe(this, at, i), oe(this, fr, r);
    const s = oe(this, It, y(this, at).getConnectionEmitter(this));
    s.on("open", () => y(this, Ut).resolve(this)), s.on("close", (o) => y(this, Ut).reject(o)), y(this, Ut).promise.catch(() => {
    });
  }
  get promise() {
    return y(this, Ut).promise;
  }
  get parameters() {
    return y(this, fr);
  }
  get deferred() {
    return y(this, dr) && !this.ready && !this.closed;
  }
  defer(t, ...r) {
    oe(this, dr, !0);
    try {
      const i = t.call(this, this, ...r);
      return i && typeof i == "object" && "then" in i && typeof i.then == "function" ? i.then((s) => (this.deferred && this.open(), s), (s) => {
        throw this.deferred && this.close(s == null ? s : String(s)), s;
      }) : i;
    } catch (i) {
      throw this.close(i == null ? null : String(i)), i;
    }
  }
  get ready() {
    return y(this, at).isReady(y(this, Qe));
  }
  get closed() {
    return y(this, at).isClosed(y(this, Qe));
  }
  open() {
    return y(this, at).join(y(this, Qe)), this;
  }
  send(...t) {
    return y(this, at).send(y(this, Qe), ...t), this;
  }
  on(t, r) {
    return y(this, It).on(t, r), this;
  }
  once(t, r) {
    return y(this, It).once(t, r), this;
  }
  off(t, r) {
    return y(this, It).off(t, r), this;
  }
  close(t) {
    y(this, at).close(y(this, Qe), t);
  }
  toString() {
    return "Connection(" + y(this, Qe) + ")";
  }
  valueOf() {
    return y(this, Qe);
  }
}
Qe = new WeakMap(), fr = new WeakMap(), at = new WeakMap(), It = new WeakMap(), Ut = new WeakMap(), dr = new WeakMap();
var xt, rt, or, Dr;
class os {
  constructor(t) {
    se(this, rt);
    se(this, xt);
    oe(this, xt, t instanceof URL ? t : new URL(t));
  }
  get url() {
    return y(this, xt).href;
  }
  async createRoom(t, r) {
    return Et(this, rt, or).call(this, "POST", `room/${encodeURIComponent(t)}`, JSON.stringify(r));
  }
  createRoomSocket(t = {}) {
    const [r, i] = Et(this, rt, Dr).call(this, "room/ws", t);
    return new ns(r, i);
  }
  async findRooms(t) {
    return Et(this, rt, or).call(this, "GET", `rooms/${encodeURIComponent(t)}`);
  }
  async getRoomMessage(t, r) {
    return Et(this, rt, or).call(this, "GET", `room/${encodeURIComponent(t)}`);
  }
  join(t, r) {
    const [i, s] = Et(this, rt, Dr).call(this, `room/${encodeURIComponent(t)}`, r, ["params"]);
    return new rs(i, s);
  }
  createLogger(t) {
    return Et(this, rt, Dr).call(this, `log/${encodeURIComponent(String(t))}`)[0];
  }
}
xt = new WeakMap(), rt = new WeakSet(), or = async function(t, r, i) {
  const s = new URL(r, y(this, xt)), o = await fetch(s, {
    method: t,
    headers: { "Content-Type": "application/json" },
    body: i
  });
  if (!o.ok)
    throw new Error(await o.text());
  return o.json();
}, Dr = function(t, r, i) {
  const s = new URL(y(this, xt));
  s.protocol = y(this, xt).protocol.replace("http", "ws");
  const o = new URL(t, s);
  if (r)
    for (let [O, P] of Object.entries(r))
      P !== void 0 && (i?.includes(O) && (P = JSON.stringify(P)), o.searchParams.set(O, P));
  const v = Array(5).fill(0).map(() => Math.random().toString(36).substring(2)).join(""), _ = () => Et(this, rt, or).call(this, "GET", `/log/${encodeURIComponent(v)}`);
  o.searchParams.set("errorLog", v);
  const D = new WebSocket(o);
  return D.binaryType = "arraybuffer", [D, _];
};
async function as(e) {
  const {
    serverUrl: t,
    playerName: r,
    settings: i = {},
    importRoomModule: s,
    roomIntegrity: o,
    engine: v = "ivm",
    roomPublicMessage: _
  } = e;
  let D = e.roomId;
  const O = new os(t);
  if (!D) {
    const { integrity: R, module: ie } = await s();
    D = (await O.createRoom(v, { module: ie, integrity: R, config: i, message: _ })).id;
  }
  const P = O.join(D, { params: [r], integrity: o });
  return { roomId: D, client: P, playerName: r };
}
const us = (e) => {
  const t = new URLSearchParams(location.search), r = JSON.parse(history?.state?.varhubEnterState || "{}"), i = t.get("serverUrl") ?? r.serverUrl ?? e.serverUrl ?? void 0, s = t.get("roomId") ?? r.roomId ?? void 0, o = r.playerName ?? void 0, v = r.settings ?? e.settings ?? {}, _ = r.autoJoin ?? !1;
  return {
    serverUrl: i,
    roomId: s,
    playerName: o,
    autoJoin: _,
    settings: v
  };
}, cs = (e) => {
  const t = new URL(location.href), r = { varhubEnterState: JSON.stringify(e || {}) };
  t.search = "", history.replaceState(r, "", t);
};
var Ct = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ai(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var un = { exports: {} }, q = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zn;
function ls() {
  if (zn) return q;
  zn = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), o = Symbol.for("react.provider"), v = Symbol.for("react.context"), _ = Symbol.for("react.forward_ref"), D = Symbol.for("react.suspense"), O = Symbol.for("react.memo"), P = Symbol.for("react.lazy"), R = Symbol.iterator;
  function ie(l) {
    return l === null || typeof l != "object" ? null : (l = R && l[R] || l["@@iterator"], typeof l == "function" ? l : null);
  }
  var ae = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, W = Object.assign, Be = {};
  function ye(l, b, B) {
    this.props = l, this.context = b, this.refs = Be, this.updater = B || ae;
  }
  ye.prototype.isReactComponent = {}, ye.prototype.setState = function(l, b) {
    if (typeof l != "object" && typeof l != "function" && l != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, l, b, "setState");
  }, ye.prototype.forceUpdate = function(l) {
    this.updater.enqueueForceUpdate(this, l, "forceUpdate");
  };
  function fe() {
  }
  fe.prototype = ye.prototype;
  function A(l, b, B) {
    this.props = l, this.context = b, this.refs = Be, this.updater = B || ae;
  }
  var Ae = A.prototype = new fe();
  Ae.constructor = A, W(Ae, ye.prototype), Ae.isPureReactComponent = !0;
  var Re = Array.isArray, $ = Object.prototype.hasOwnProperty, Ee = { current: null }, Ue = { key: !0, ref: !0, __self: !0, __source: !0 };
  function Ve(l, b, B) {
    var Y, Z = {}, re = null, ne = null;
    if (b != null) for (Y in b.ref !== void 0 && (ne = b.ref), b.key !== void 0 && (re = "" + b.key), b) $.call(b, Y) && !Ue.hasOwnProperty(Y) && (Z[Y] = b[Y]);
    var ee = arguments.length - 2;
    if (ee === 1) Z.children = B;
    else if (1 < ee) {
      for (var te = Array(ee), we = 0; we < ee; we++) te[we] = arguments[we + 2];
      Z.children = te;
    }
    if (l && l.defaultProps) for (Y in ee = l.defaultProps, ee) Z[Y] === void 0 && (Z[Y] = ee[Y]);
    return { $$typeof: e, type: l, key: re, ref: ne, props: Z, _owner: Ee.current };
  }
  function Ye(l, b) {
    return { $$typeof: e, type: l.type, key: b, ref: l.ref, props: l.props, _owner: l._owner };
  }
  function Pe(l) {
    return typeof l == "object" && l !== null && l.$$typeof === e;
  }
  function nt(l) {
    var b = { "=": "=0", ":": "=2" };
    return "$" + l.replace(/[=:]/g, function(B) {
      return b[B];
    });
  }
  var U = /\/+/g;
  function F(l, b) {
    return typeof l == "object" && l !== null && l.key != null ? nt("" + l.key) : b.toString(36);
  }
  function J(l, b, B, Y, Z) {
    var re = typeof l;
    (re === "undefined" || re === "boolean") && (l = null);
    var ne = !1;
    if (l === null) ne = !0;
    else switch (re) {
      case "string":
      case "number":
        ne = !0;
        break;
      case "object":
        switch (l.$$typeof) {
          case e:
          case t:
            ne = !0;
        }
    }
    if (ne) return ne = l, Z = Z(ne), l = Y === "" ? "." + F(ne, 0) : Y, Re(Z) ? (B = "", l != null && (B = l.replace(U, "$&/") + "/"), J(Z, b, B, "", function(we) {
      return we;
    })) : Z != null && (Pe(Z) && (Z = Ye(Z, B + (!Z.key || ne && ne.key === Z.key ? "" : ("" + Z.key).replace(U, "$&/") + "/") + l)), b.push(Z)), 1;
    if (ne = 0, Y = Y === "" ? "." : Y + ":", Re(l)) for (var ee = 0; ee < l.length; ee++) {
      re = l[ee];
      var te = Y + F(re, ee);
      ne += J(re, b, B, te, Z);
    }
    else if (te = ie(l), typeof te == "function") for (l = te.call(l), ee = 0; !(re = l.next()).done; ) re = re.value, te = Y + F(re, ee++), ne += J(re, b, B, te, Z);
    else if (re === "object") throw b = String(l), Error("Objects are not valid as a React child (found: " + (b === "[object Object]" ? "object with keys {" + Object.keys(l).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
    return ne;
  }
  function K(l, b, B) {
    if (l == null) return l;
    var Y = [], Z = 0;
    return J(l, Y, "", "", function(re) {
      return b.call(B, re, Z++);
    }), Y;
  }
  function pe(l) {
    if (l._status === -1) {
      var b = l._result;
      b = b(), b.then(function(B) {
        (l._status === 0 || l._status === -1) && (l._status = 1, l._result = B);
      }, function(B) {
        (l._status === 0 || l._status === -1) && (l._status = 2, l._result = B);
      }), l._status === -1 && (l._status = 0, l._result = b);
    }
    if (l._status === 1) return l._result.default;
    throw l._result;
  }
  var j = { current: null }, Fe = { transition: null }, Ge = { ReactCurrentDispatcher: j, ReactCurrentBatchConfig: Fe, ReactCurrentOwner: Ee };
  function Le() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return q.Children = { map: K, forEach: function(l, b, B) {
    K(l, function() {
      b.apply(this, arguments);
    }, B);
  }, count: function(l) {
    var b = 0;
    return K(l, function() {
      b++;
    }), b;
  }, toArray: function(l) {
    return K(l, function(b) {
      return b;
    }) || [];
  }, only: function(l) {
    if (!Pe(l)) throw Error("React.Children.only expected to receive a single React element child.");
    return l;
  } }, q.Component = ye, q.Fragment = r, q.Profiler = s, q.PureComponent = A, q.StrictMode = i, q.Suspense = D, q.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ge, q.act = Le, q.cloneElement = function(l, b, B) {
    if (l == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + l + ".");
    var Y = W({}, l.props), Z = l.key, re = l.ref, ne = l._owner;
    if (b != null) {
      if (b.ref !== void 0 && (re = b.ref, ne = Ee.current), b.key !== void 0 && (Z = "" + b.key), l.type && l.type.defaultProps) var ee = l.type.defaultProps;
      for (te in b) $.call(b, te) && !Ue.hasOwnProperty(te) && (Y[te] = b[te] === void 0 && ee !== void 0 ? ee[te] : b[te]);
    }
    var te = arguments.length - 2;
    if (te === 1) Y.children = B;
    else if (1 < te) {
      ee = Array(te);
      for (var we = 0; we < te; we++) ee[we] = arguments[we + 2];
      Y.children = ee;
    }
    return { $$typeof: e, type: l.type, key: Z, ref: re, props: Y, _owner: ne };
  }, q.createContext = function(l) {
    return l = { $$typeof: v, _currentValue: l, _currentValue2: l, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, l.Provider = { $$typeof: o, _context: l }, l.Consumer = l;
  }, q.createElement = Ve, q.createFactory = function(l) {
    var b = Ve.bind(null, l);
    return b.type = l, b;
  }, q.createRef = function() {
    return { current: null };
  }, q.forwardRef = function(l) {
    return { $$typeof: _, render: l };
  }, q.isValidElement = Pe, q.lazy = function(l) {
    return { $$typeof: P, _payload: { _status: -1, _result: l }, _init: pe };
  }, q.memo = function(l, b) {
    return { $$typeof: O, type: l, compare: b === void 0 ? null : b };
  }, q.startTransition = function(l) {
    var b = Fe.transition;
    Fe.transition = {};
    try {
      l();
    } finally {
      Fe.transition = b;
    }
  }, q.unstable_act = Le, q.useCallback = function(l, b) {
    return j.current.useCallback(l, b);
  }, q.useContext = function(l) {
    return j.current.useContext(l);
  }, q.useDebugValue = function() {
  }, q.useDeferredValue = function(l) {
    return j.current.useDeferredValue(l);
  }, q.useEffect = function(l, b) {
    return j.current.useEffect(l, b);
  }, q.useId = function() {
    return j.current.useId();
  }, q.useImperativeHandle = function(l, b, B) {
    return j.current.useImperativeHandle(l, b, B);
  }, q.useInsertionEffect = function(l, b) {
    return j.current.useInsertionEffect(l, b);
  }, q.useLayoutEffect = function(l, b) {
    return j.current.useLayoutEffect(l, b);
  }, q.useMemo = function(l, b) {
    return j.current.useMemo(l, b);
  }, q.useReducer = function(l, b, B) {
    return j.current.useReducer(l, b, B);
  }, q.useRef = function(l) {
    return j.current.useRef(l);
  }, q.useState = function(l) {
    return j.current.useState(l);
  }, q.useSyncExternalStore = function(l, b, B) {
    return j.current.useSyncExternalStore(l, b, B);
  }, q.useTransition = function() {
    return j.current.useTransition();
  }, q.version = "18.3.1", q;
}
var ar = { exports: {} };
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
ar.exports;
var qn;
function fs() {
  return qn || (qn = 1, function(e, t) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var r = "18.3.1", i = Symbol.for("react.element"), s = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), v = Symbol.for("react.strict_mode"), _ = Symbol.for("react.profiler"), D = Symbol.for("react.provider"), O = Symbol.for("react.context"), P = Symbol.for("react.forward_ref"), R = Symbol.for("react.suspense"), ie = Symbol.for("react.suspense_list"), ae = Symbol.for("react.memo"), W = Symbol.for("react.lazy"), Be = Symbol.for("react.offscreen"), ye = Symbol.iterator, fe = "@@iterator";
      function A(n) {
        if (n === null || typeof n != "object")
          return null;
        var a = ye && n[ye] || n[fe];
        return typeof a == "function" ? a : null;
      }
      var Ae = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, Re = {
        transition: null
      }, $ = {
        current: null,
        // Used to reproduce behavior of `batchedUpdates` in legacy mode.
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1
      }, Ee = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, Ue = {}, Ve = null;
      function Ye(n) {
        Ve = n;
      }
      Ue.setExtraStackFrame = function(n) {
        Ve = n;
      }, Ue.getCurrentStack = null, Ue.getStackAddendum = function() {
        var n = "";
        Ve && (n += Ve);
        var a = Ue.getCurrentStack;
        return a && (n += a() || ""), n;
      };
      var Pe = !1, nt = !1, U = !1, F = !1, J = !1, K = {
        ReactCurrentDispatcher: Ae,
        ReactCurrentBatchConfig: Re,
        ReactCurrentOwner: Ee
      };
      K.ReactDebugCurrentFrame = Ue, K.ReactCurrentActQueue = $;
      function pe(n) {
        {
          for (var a = arguments.length, d = new Array(a > 1 ? a - 1 : 0), m = 1; m < a; m++)
            d[m - 1] = arguments[m];
          Fe("warn", n, d);
        }
      }
      function j(n) {
        {
          for (var a = arguments.length, d = new Array(a > 1 ? a - 1 : 0), m = 1; m < a; m++)
            d[m - 1] = arguments[m];
          Fe("error", n, d);
        }
      }
      function Fe(n, a, d) {
        {
          var m = K.ReactDebugCurrentFrame, E = m.getStackAddendum();
          E !== "" && (a += "%s", d = d.concat([E]));
          var T = d.map(function(k) {
            return String(k);
          });
          T.unshift("Warning: " + a), Function.prototype.apply.call(console[n], console, T);
        }
      }
      var Ge = {};
      function Le(n, a) {
        {
          var d = n.constructor, m = d && (d.displayName || d.name) || "ReactClass", E = m + "." + a;
          if (Ge[E])
            return;
          j("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", a, m), Ge[E] = !0;
        }
      }
      var l = {
        /**
         * Checks whether or not this composite component is mounted.
         * @param {ReactClass} publicInstance The instance we want to test.
         * @return {boolean} True if mounted, false otherwise.
         * @protected
         * @final
         */
        isMounted: function(n) {
          return !1;
        },
        /**
         * Forces an update. This should only be invoked when it is known with
         * certainty that we are **not** in a DOM transaction.
         *
         * You may want to call this when you know that some deeper aspect of the
         * component's state has changed but `setState` was not called.
         *
         * This will not invoke `shouldComponentUpdate`, but it will invoke
         * `componentWillUpdate` and `componentDidUpdate`.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueForceUpdate: function(n, a, d) {
          Le(n, "forceUpdate");
        },
        /**
         * Replaces all of the state. Always use this or `setState` to mutate state.
         * You should treat `this.state` as immutable.
         *
         * There is no guarantee that `this.state` will be immediately updated, so
         * accessing `this.state` after calling this method may return the old value.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} completeState Next state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueReplaceState: function(n, a, d, m) {
          Le(n, "replaceState");
        },
        /**
         * Sets a subset of the state. This only exists because _pendingState is
         * internal. This provides a merging strategy that is not available to deep
         * properties which is confusing. TODO: Expose pendingState or don't use it
         * during the merge.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} partialState Next partial state to be merged with state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} Name of the calling function in the public API.
         * @internal
         */
        enqueueSetState: function(n, a, d, m) {
          Le(n, "setState");
        }
      }, b = Object.assign, B = {};
      Object.freeze(B);
      function Y(n, a, d) {
        this.props = n, this.context = a, this.refs = B, this.updater = d || l;
      }
      Y.prototype.isReactComponent = {}, Y.prototype.setState = function(n, a) {
        if (typeof n != "object" && typeof n != "function" && n != null)
          throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, n, a, "setState");
      }, Y.prototype.forceUpdate = function(n) {
        this.updater.enqueueForceUpdate(this, n, "forceUpdate");
      };
      {
        var Z = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, re = function(n, a) {
          Object.defineProperty(Y.prototype, n, {
            get: function() {
              pe("%s(...) is deprecated in plain JavaScript React classes. %s", a[0], a[1]);
            }
          });
        };
        for (var ne in Z)
          Z.hasOwnProperty(ne) && re(ne, Z[ne]);
      }
      function ee() {
      }
      ee.prototype = Y.prototype;
      function te(n, a, d) {
        this.props = n, this.context = a, this.refs = B, this.updater = d || l;
      }
      var we = te.prototype = new ee();
      we.constructor = te, b(we, Y.prototype), we.isPureReactComponent = !0;
      function Lt() {
        var n = {
          current: null
        };
        return Object.seal(n), n;
      }
      var Mt = Array.isArray;
      function ct(n) {
        return Mt(n);
      }
      function $t(n) {
        {
          var a = typeof Symbol == "function" && Symbol.toStringTag, d = a && n[Symbol.toStringTag] || n.constructor.name || "Object";
          return d;
        }
      }
      function jt(n) {
        try {
          return lt(n), !1;
        } catch {
          return !0;
        }
      }
      function lt(n) {
        return "" + n;
      }
      function yt(n) {
        if (jt(n))
          return j("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", $t(n)), lt(n);
      }
      function c(n, a, d) {
        var m = n.displayName;
        if (m)
          return m;
        var E = a.displayName || a.name || "";
        return E !== "" ? d + "(" + E + ")" : d;
      }
      function f(n) {
        return n.displayName || "Context";
      }
      function h(n) {
        if (n == null)
          return null;
        if (typeof n.tag == "number" && j("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof n == "function")
          return n.displayName || n.name || null;
        if (typeof n == "string")
          return n;
        switch (n) {
          case o:
            return "Fragment";
          case s:
            return "Portal";
          case _:
            return "Profiler";
          case v:
            return "StrictMode";
          case R:
            return "Suspense";
          case ie:
            return "SuspenseList";
        }
        if (typeof n == "object")
          switch (n.$$typeof) {
            case O:
              var a = n;
              return f(a) + ".Consumer";
            case D:
              var d = n;
              return f(d._context) + ".Provider";
            case P:
              return c(n, n.render, "ForwardRef");
            case ae:
              var m = n.displayName || null;
              return m !== null ? m : h(n.type) || "Memo";
            case W: {
              var E = n, T = E._payload, k = E._init;
              try {
                return h(k(T));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var x = Object.prototype.hasOwnProperty, w = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, g, N, G;
      G = {};
      function de(n) {
        if (x.call(n, "ref")) {
          var a = Object.getOwnPropertyDescriptor(n, "ref").get;
          if (a && a.isReactWarning)
            return !1;
        }
        return n.ref !== void 0;
      }
      function xe(n) {
        if (x.call(n, "key")) {
          var a = Object.getOwnPropertyDescriptor(n, "key").get;
          if (a && a.isReactWarning)
            return !1;
        }
        return n.key !== void 0;
      }
      function it(n, a) {
        var d = function() {
          g || (g = !0, j("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", a));
        };
        d.isReactWarning = !0, Object.defineProperty(n, "key", {
          get: d,
          configurable: !0
        });
      }
      function Wt(n, a) {
        var d = function() {
          N || (N = !0, j("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", a));
        };
        d.isReactWarning = !0, Object.defineProperty(n, "ref", {
          get: d,
          configurable: !0
        });
      }
      function pt(n) {
        if (typeof n.ref == "string" && Ee.current && n.__self && Ee.current.stateNode !== n.__self) {
          var a = h(Ee.current.type);
          G[a] || (j('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', a, n.ref), G[a] = !0);
        }
      }
      var Je = function(n, a, d, m, E, T, k) {
        var L = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: i,
          // Built-in properties that belong on the element
          type: n,
          key: a,
          ref: d,
          props: k,
          // Record the component responsible for creating this element.
          _owner: T
        };
        return L._store = {}, Object.defineProperty(L._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(L, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: m
        }), Object.defineProperty(L, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: E
        }), Object.freeze && (Object.freeze(L.props), Object.freeze(L)), L;
      };
      function Qt(n, a, d) {
        var m, E = {}, T = null, k = null, L = null, X = null;
        if (a != null) {
          de(a) && (k = a.ref, pt(a)), xe(a) && (yt(a.key), T = "" + a.key), L = a.__self === void 0 ? null : a.__self, X = a.__source === void 0 ? null : a.__source;
          for (m in a)
            x.call(a, m) && !w.hasOwnProperty(m) && (E[m] = a[m]);
        }
        var ue = arguments.length - 2;
        if (ue === 1)
          E.children = d;
        else if (ue > 1) {
          for (var he = Array(ue), me = 0; me < ue; me++)
            he[me] = arguments[me + 2];
          Object.freeze && Object.freeze(he), E.children = he;
        }
        if (n && n.defaultProps) {
          var ge = n.defaultProps;
          for (m in ge)
            E[m] === void 0 && (E[m] = ge[m]);
        }
        if (T || k) {
          var ke = typeof n == "function" ? n.displayName || n.name || "Unknown" : n;
          T && it(E, ke), k && Wt(E, ke);
        }
        return Je(n, T, k, L, X, Ee.current, E);
      }
      function Bt(n, a) {
        var d = Je(n.type, a, n.ref, n._self, n._source, n._owner, n.props);
        return d;
      }
      function er(n, a, d) {
        if (n == null)
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + n + ".");
        var m, E = b({}, n.props), T = n.key, k = n.ref, L = n._self, X = n._source, ue = n._owner;
        if (a != null) {
          de(a) && (k = a.ref, ue = Ee.current), xe(a) && (yt(a.key), T = "" + a.key);
          var he;
          n.type && n.type.defaultProps && (he = n.type.defaultProps);
          for (m in a)
            x.call(a, m) && !w.hasOwnProperty(m) && (a[m] === void 0 && he !== void 0 ? E[m] = he[m] : E[m] = a[m]);
        }
        var me = arguments.length - 2;
        if (me === 1)
          E.children = d;
        else if (me > 1) {
          for (var ge = Array(me), ke = 0; ke < me; ke++)
            ge[ke] = arguments[ke + 2];
          E.children = ge;
        }
        return Je(n.type, T, k, L, X, ue, E);
      }
      function Ke(n) {
        return typeof n == "object" && n !== null && n.$$typeof === i;
      }
      var vr = ".", Mr = ":";
      function $r(n) {
        var a = /[=:]/g, d = {
          "=": "=0",
          ":": "=2"
        }, m = n.replace(a, function(E) {
          return d[E];
        });
        return "$" + m;
      }
      var Yt = !1, yr = /\/+/g;
      function ft(n) {
        return n.replace(yr, "$&/");
      }
      function Pt(n, a) {
        return typeof n == "object" && n !== null && n.key != null ? (yt(n.key), $r("" + n.key)) : a.toString(36);
      }
      function bt(n, a, d, m, E) {
        var T = typeof n;
        (T === "undefined" || T === "boolean") && (n = null);
        var k = !1;
        if (n === null)
          k = !0;
        else
          switch (T) {
            case "string":
            case "number":
              k = !0;
              break;
            case "object":
              switch (n.$$typeof) {
                case i:
                case s:
                  k = !0;
              }
          }
        if (k) {
          var L = n, X = E(L), ue = m === "" ? vr + Pt(L, 0) : m;
          if (ct(X)) {
            var he = "";
            ue != null && (he = ft(ue) + "/"), bt(X, a, he, "", function(Ji) {
              return Ji;
            });
          } else X != null && (Ke(X) && (X.key && (!L || L.key !== X.key) && yt(X.key), X = Bt(
            X,
            // Keep both the (mapped) and old keys if they differ, just as
            // traverseAllChildren used to do for objects as children
            d + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
            (X.key && (!L || L.key !== X.key) ? (
              // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
              // eslint-disable-next-line react-internal/safe-string-coercion
              ft("" + X.key) + "/"
            ) : "") + ue
          )), a.push(X));
          return 1;
        }
        var me, ge, ke = 0, Oe = m === "" ? vr : m + Mr;
        if (ct(n))
          for (var Rr = 0; Rr < n.length; Rr++)
            me = n[Rr], ge = Oe + Pt(me, Rr), ke += bt(me, a, d, ge, E);
        else {
          var tn = A(n);
          if (typeof tn == "function") {
            var Mn = n;
            tn === Mn.entries && (Yt || pe("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Yt = !0);
            for (var Gi = tn.call(Mn), $n, Hi = 0; !($n = Gi.next()).done; )
              me = $n.value, ge = Oe + Pt(me, Hi++), ke += bt(me, a, d, ge, E);
          } else if (T === "object") {
            var Wn = String(n);
            throw new Error("Objects are not valid as a React child (found: " + (Wn === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : Wn) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return ke;
      }
      function kt(n, a, d) {
        if (n == null)
          return n;
        var m = [], E = 0;
        return bt(n, m, "", "", function(T) {
          return a.call(d, T, E++);
        }), m;
      }
      function Wr(n) {
        var a = 0;
        return kt(n, function() {
          a++;
        }), a;
      }
      function pr(n, a, d) {
        kt(n, function() {
          a.apply(this, arguments);
        }, d);
      }
      function Br(n) {
        return kt(n, function(a) {
          return a;
        }) || [];
      }
      function br(n) {
        if (!Ke(n))
          throw new Error("React.Children.only expected to receive a single React element child.");
        return n;
      }
      function gr(n) {
        var a = {
          $$typeof: O,
          // As a workaround to support multiple concurrent renderers, we categorize
          // some renderers as primary and others as secondary. We only expect
          // there to be two concurrent renderers at most: React Native (primary) and
          // Fabric (secondary); React DOM (primary) and React ART (secondary).
          // Secondary renderers store their context values on separate fields.
          _currentValue: n,
          _currentValue2: n,
          // Used to track how many concurrent renderers this context currently
          // supports within in a single renderer. Such as parallel server rendering.
          _threadCount: 0,
          // These are circular
          Provider: null,
          Consumer: null,
          // Add these to use same hidden class in VM as ServerContext
          _defaultValue: null,
          _globalName: null
        };
        a.Provider = {
          $$typeof: D,
          _context: a
        };
        var d = !1, m = !1, E = !1;
        {
          var T = {
            $$typeof: O,
            _context: a
          };
          Object.defineProperties(T, {
            Provider: {
              get: function() {
                return m || (m = !0, j("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), a.Provider;
              },
              set: function(k) {
                a.Provider = k;
              }
            },
            _currentValue: {
              get: function() {
                return a._currentValue;
              },
              set: function(k) {
                a._currentValue = k;
              }
            },
            _currentValue2: {
              get: function() {
                return a._currentValue2;
              },
              set: function(k) {
                a._currentValue2 = k;
              }
            },
            _threadCount: {
              get: function() {
                return a._threadCount;
              },
              set: function(k) {
                a._threadCount = k;
              }
            },
            Consumer: {
              get: function() {
                return d || (d = !0, j("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), a.Consumer;
              }
            },
            displayName: {
              get: function() {
                return a.displayName;
              },
              set: function(k) {
                E || (pe("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", k), E = !0);
              }
            }
          }), a.Consumer = T;
        }
        return a._currentRenderer = null, a._currentRenderer2 = null, a;
      }
      var Nt = -1, tr = 0, rr = 1, Yr = 2;
      function zr(n) {
        if (n._status === Nt) {
          var a = n._result, d = a();
          if (d.then(function(T) {
            if (n._status === tr || n._status === Nt) {
              var k = n;
              k._status = rr, k._result = T;
            }
          }, function(T) {
            if (n._status === tr || n._status === Nt) {
              var k = n;
              k._status = Yr, k._result = T;
            }
          }), n._status === Nt) {
            var m = n;
            m._status = tr, m._result = d;
          }
        }
        if (n._status === rr) {
          var E = n._result;
          return E === void 0 && j(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, E), "default" in E || j(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, E), E.default;
        } else
          throw n._result;
      }
      function u(n) {
        var a = {
          // We use these fields to store the result.
          _status: Nt,
          _result: n
        }, d = {
          $$typeof: W,
          _payload: a,
          _init: zr
        };
        {
          var m, E;
          Object.defineProperties(d, {
            defaultProps: {
              configurable: !0,
              get: function() {
                return m;
              },
              set: function(T) {
                j("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), m = T, Object.defineProperty(d, "defaultProps", {
                  enumerable: !0
                });
              }
            },
            propTypes: {
              configurable: !0,
              get: function() {
                return E;
              },
              set: function(T) {
                j("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), E = T, Object.defineProperty(d, "propTypes", {
                  enumerable: !0
                });
              }
            }
          });
        }
        return d;
      }
      function p(n) {
        n != null && n.$$typeof === ae ? j("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof n != "function" ? j("forwardRef requires a render function but was given %s.", n === null ? "null" : typeof n) : n.length !== 0 && n.length !== 2 && j("forwardRef render functions accept exactly two parameters: props and ref. %s", n.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), n != null && (n.defaultProps != null || n.propTypes != null) && j("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var a = {
          $$typeof: P,
          render: n
        };
        {
          var d;
          Object.defineProperty(a, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return d;
            },
            set: function(m) {
              d = m, !n.name && !n.displayName && (n.displayName = m);
            }
          });
        }
        return a;
      }
      var C;
      C = Symbol.for("react.module.reference");
      function V(n) {
        return !!(typeof n == "string" || typeof n == "function" || n === o || n === _ || J || n === v || n === R || n === ie || F || n === Be || Pe || nt || U || typeof n == "object" && n !== null && (n.$$typeof === W || n.$$typeof === ae || n.$$typeof === D || n.$$typeof === O || n.$$typeof === P || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        n.$$typeof === C || n.getModuleId !== void 0));
      }
      function Q(n, a) {
        V(n) || j("memo: The first argument must be a component. Instead received: %s", n === null ? "null" : typeof n);
        var d = {
          $$typeof: ae,
          type: n,
          compare: a === void 0 ? null : a
        };
        {
          var m;
          Object.defineProperty(d, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return m;
            },
            set: function(E) {
              m = E, !n.name && !n.displayName && (n.displayName = E);
            }
          });
        }
        return d;
      }
      function M() {
        var n = Ae.current;
        return n === null && j(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), n;
      }
      function H(n) {
        var a = M();
        if (n._context !== void 0) {
          var d = n._context;
          d.Consumer === n ? j("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : d.Provider === n && j("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return a.useContext(n);
      }
      function z(n) {
        var a = M();
        return a.useState(n);
      }
      function Te(n, a, d) {
        var m = M();
        return m.useReducer(n, a, d);
      }
      function be(n) {
        var a = M();
        return a.useRef(n);
      }
      function Se(n, a) {
        var d = M();
        return d.useEffect(n, a);
      }
      function ze(n, a) {
        var d = M();
        return d.useInsertionEffect(n, a);
      }
      function gt(n, a) {
        var d = M();
        return d.useLayoutEffect(n, a);
      }
      function dt(n, a) {
        var d = M();
        return d.useCallback(n, a);
      }
      function Ie(n, a) {
        var d = M();
        return d.useMemo(n, a);
      }
      function nr(n, a, d) {
        var m = M();
        return m.useImperativeHandle(n, a, d);
      }
      function qr(n, a) {
        {
          var d = M();
          return d.useDebugValue(n, a);
        }
      }
      function Gr() {
        var n = M();
        return n.useTransition();
      }
      function Ri(n) {
        var a = M();
        return a.useDeferredValue(n);
      }
      function ji() {
        var n = M();
        return n.useId();
      }
      function Pi(n, a, d) {
        var m = M();
        return m.useSyncExternalStore(n, a, d);
      }
      var ir = 0, gn, _n, En, wn, xn, Sn, Cn;
      function Rn() {
      }
      Rn.__reactDisabledLog = !0;
      function ki() {
        {
          if (ir === 0) {
            gn = console.log, _n = console.info, En = console.warn, wn = console.error, xn = console.group, Sn = console.groupCollapsed, Cn = console.groupEnd;
            var n = {
              configurable: !0,
              enumerable: !0,
              value: Rn,
              writable: !0
            };
            Object.defineProperties(console, {
              info: n,
              log: n,
              warn: n,
              error: n,
              group: n,
              groupCollapsed: n,
              groupEnd: n
            });
          }
          ir++;
        }
      }
      function Ni() {
        {
          if (ir--, ir === 0) {
            var n = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: b({}, n, {
                value: gn
              }),
              info: b({}, n, {
                value: _n
              }),
              warn: b({}, n, {
                value: En
              }),
              error: b({}, n, {
                value: wn
              }),
              group: b({}, n, {
                value: xn
              }),
              groupCollapsed: b({}, n, {
                value: Sn
              }),
              groupEnd: b({}, n, {
                value: Cn
              })
            });
          }
          ir < 0 && j("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var Hr = K.ReactCurrentDispatcher, Jr;
      function _r(n, a, d) {
        {
          if (Jr === void 0)
            try {
              throw Error();
            } catch (E) {
              var m = E.stack.trim().match(/\n( *(at )?)/);
              Jr = m && m[1] || "";
            }
          return `
` + Jr + n;
        }
      }
      var Kr = !1, Er;
      {
        var Di = typeof WeakMap == "function" ? WeakMap : Map;
        Er = new Di();
      }
      function jn(n, a) {
        if (!n || Kr)
          return "";
        {
          var d = Er.get(n);
          if (d !== void 0)
            return d;
        }
        var m;
        Kr = !0;
        var E = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var T;
        T = Hr.current, Hr.current = null, ki();
        try {
          if (a) {
            var k = function() {
              throw Error();
            };
            if (Object.defineProperty(k.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(k, []);
              } catch (Oe) {
                m = Oe;
              }
              Reflect.construct(n, [], k);
            } else {
              try {
                k.call();
              } catch (Oe) {
                m = Oe;
              }
              n.call(k.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (Oe) {
              m = Oe;
            }
            n();
          }
        } catch (Oe) {
          if (Oe && m && typeof Oe.stack == "string") {
            for (var L = Oe.stack.split(`
`), X = m.stack.split(`
`), ue = L.length - 1, he = X.length - 1; ue >= 1 && he >= 0 && L[ue] !== X[he]; )
              he--;
            for (; ue >= 1 && he >= 0; ue--, he--)
              if (L[ue] !== X[he]) {
                if (ue !== 1 || he !== 1)
                  do
                    if (ue--, he--, he < 0 || L[ue] !== X[he]) {
                      var me = `
` + L[ue].replace(" at new ", " at ");
                      return n.displayName && me.includes("<anonymous>") && (me = me.replace("<anonymous>", n.displayName)), typeof n == "function" && Er.set(n, me), me;
                    }
                  while (ue >= 1 && he >= 0);
                break;
              }
          }
        } finally {
          Kr = !1, Hr.current = T, Ni(), Error.prepareStackTrace = E;
        }
        var ge = n ? n.displayName || n.name : "", ke = ge ? _r(ge) : "";
        return typeof n == "function" && Er.set(n, ke), ke;
      }
      function Ai(n, a, d) {
        return jn(n, !1);
      }
      function Vi(n) {
        var a = n.prototype;
        return !!(a && a.isReactComponent);
      }
      function wr(n, a, d) {
        if (n == null)
          return "";
        if (typeof n == "function")
          return jn(n, Vi(n));
        if (typeof n == "string")
          return _r(n);
        switch (n) {
          case R:
            return _r("Suspense");
          case ie:
            return _r("SuspenseList");
        }
        if (typeof n == "object")
          switch (n.$$typeof) {
            case P:
              return Ai(n.render);
            case ae:
              return wr(n.type, a, d);
            case W: {
              var m = n, E = m._payload, T = m._init;
              try {
                return wr(T(E), a, d);
              } catch {
              }
            }
          }
        return "";
      }
      var Pn = {}, kn = K.ReactDebugCurrentFrame;
      function xr(n) {
        if (n) {
          var a = n._owner, d = wr(n.type, n._source, a ? a.type : null);
          kn.setExtraStackFrame(d);
        } else
          kn.setExtraStackFrame(null);
      }
      function Ti(n, a, d, m, E) {
        {
          var T = Function.call.bind(x);
          for (var k in n)
            if (T(n, k)) {
              var L = void 0;
              try {
                if (typeof n[k] != "function") {
                  var X = Error((m || "React class") + ": " + d + " type `" + k + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof n[k] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw X.name = "Invariant Violation", X;
                }
                L = n[k](a, k, m, d, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (ue) {
                L = ue;
              }
              L && !(L instanceof Error) && (xr(E), j("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", m || "React class", d, k, typeof L), xr(null)), L instanceof Error && !(L.message in Pn) && (Pn[L.message] = !0, xr(E), j("Failed %s type: %s", d, L.message), xr(null));
            }
        }
      }
      function zt(n) {
        if (n) {
          var a = n._owner, d = wr(n.type, n._source, a ? a.type : null);
          Ye(d);
        } else
          Ye(null);
      }
      var Zr;
      Zr = !1;
      function Nn() {
        if (Ee.current) {
          var n = h(Ee.current.type);
          if (n)
            return `

Check the render method of \`` + n + "`.";
        }
        return "";
      }
      function Oi(n) {
        if (n !== void 0) {
          var a = n.fileName.replace(/^.*[\\\/]/, ""), d = n.lineNumber;
          return `

Check your code at ` + a + ":" + d + ".";
        }
        return "";
      }
      function Fi(n) {
        return n != null ? Oi(n.__source) : "";
      }
      var Dn = {};
      function Ii(n) {
        var a = Nn();
        if (!a) {
          var d = typeof n == "string" ? n : n.displayName || n.name;
          d && (a = `

Check the top-level render call using <` + d + ">.");
        }
        return a;
      }
      function An(n, a) {
        if (!(!n._store || n._store.validated || n.key != null)) {
          n._store.validated = !0;
          var d = Ii(a);
          if (!Dn[d]) {
            Dn[d] = !0;
            var m = "";
            n && n._owner && n._owner !== Ee.current && (m = " It was passed a child from " + h(n._owner.type) + "."), zt(n), j('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', d, m), zt(null);
          }
        }
      }
      function Vn(n, a) {
        if (typeof n == "object") {
          if (ct(n))
            for (var d = 0; d < n.length; d++) {
              var m = n[d];
              Ke(m) && An(m, a);
            }
          else if (Ke(n))
            n._store && (n._store.validated = !0);
          else if (n) {
            var E = A(n);
            if (typeof E == "function" && E !== n.entries)
              for (var T = E.call(n), k; !(k = T.next()).done; )
                Ke(k.value) && An(k.value, a);
          }
        }
      }
      function Tn(n) {
        {
          var a = n.type;
          if (a == null || typeof a == "string")
            return;
          var d;
          if (typeof a == "function")
            d = a.propTypes;
          else if (typeof a == "object" && (a.$$typeof === P || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          a.$$typeof === ae))
            d = a.propTypes;
          else
            return;
          if (d) {
            var m = h(a);
            Ti(d, n.props, "prop", m, n);
          } else if (a.PropTypes !== void 0 && !Zr) {
            Zr = !0;
            var E = h(a);
            j("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", E || "Unknown");
          }
          typeof a.getDefaultProps == "function" && !a.getDefaultProps.isReactClassApproved && j("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function Ui(n) {
        {
          for (var a = Object.keys(n.props), d = 0; d < a.length; d++) {
            var m = a[d];
            if (m !== "children" && m !== "key") {
              zt(n), j("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", m), zt(null);
              break;
            }
          }
          n.ref !== null && (zt(n), j("Invalid attribute `ref` supplied to `React.Fragment`."), zt(null));
        }
      }
      function On(n, a, d) {
        var m = V(n);
        if (!m) {
          var E = "";
          (n === void 0 || typeof n == "object" && n !== null && Object.keys(n).length === 0) && (E += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var T = Fi(a);
          T ? E += T : E += Nn();
          var k;
          n === null ? k = "null" : ct(n) ? k = "array" : n !== void 0 && n.$$typeof === i ? (k = "<" + (h(n.type) || "Unknown") + " />", E = " Did you accidentally export a JSX literal instead of a component?") : k = typeof n, j("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", k, E);
        }
        var L = Qt.apply(this, arguments);
        if (L == null)
          return L;
        if (m)
          for (var X = 2; X < arguments.length; X++)
            Vn(arguments[X], n);
        return n === o ? Ui(L) : Tn(L), L;
      }
      var Fn = !1;
      function Li(n) {
        var a = On.bind(null, n);
        return a.type = n, Fn || (Fn = !0, pe("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(a, "type", {
          enumerable: !1,
          get: function() {
            return pe("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: n
            }), n;
          }
        }), a;
      }
      function Mi(n, a, d) {
        for (var m = er.apply(this, arguments), E = 2; E < arguments.length; E++)
          Vn(arguments[E], m.type);
        return Tn(m), m;
      }
      function $i(n, a) {
        var d = Re.transition;
        Re.transition = {};
        var m = Re.transition;
        Re.transition._updatedFibers = /* @__PURE__ */ new Set();
        try {
          n();
        } finally {
          if (Re.transition = d, d === null && m._updatedFibers) {
            var E = m._updatedFibers.size;
            E > 10 && pe("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), m._updatedFibers.clear();
          }
        }
      }
      var In = !1, Sr = null;
      function Wi(n) {
        if (Sr === null)
          try {
            var a = ("require" + Math.random()).slice(0, 7), d = e && e[a];
            Sr = d.call(e, "timers").setImmediate;
          } catch {
            Sr = function(E) {
              In === !1 && (In = !0, typeof MessageChannel > "u" && j("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
              var T = new MessageChannel();
              T.port1.onmessage = E, T.port2.postMessage(void 0);
            };
          }
        return Sr(n);
      }
      var qt = 0, Un = !1;
      function Ln(n) {
        {
          var a = qt;
          qt++, $.current === null && ($.current = []);
          var d = $.isBatchingLegacy, m;
          try {
            if ($.isBatchingLegacy = !0, m = n(), !d && $.didScheduleLegacyUpdate) {
              var E = $.current;
              E !== null && ($.didScheduleLegacyUpdate = !1, en(E));
            }
          } catch (ge) {
            throw Cr(a), ge;
          } finally {
            $.isBatchingLegacy = d;
          }
          if (m !== null && typeof m == "object" && typeof m.then == "function") {
            var T = m, k = !1, L = {
              then: function(ge, ke) {
                k = !0, T.then(function(Oe) {
                  Cr(a), qt === 0 ? Xr(Oe, ge, ke) : ge(Oe);
                }, function(Oe) {
                  Cr(a), ke(Oe);
                });
              }
            };
            return !Un && typeof Promise < "u" && Promise.resolve().then(function() {
            }).then(function() {
              k || (Un = !0, j("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            }), L;
          } else {
            var X = m;
            if (Cr(a), qt === 0) {
              var ue = $.current;
              ue !== null && (en(ue), $.current = null);
              var he = {
                then: function(ge, ke) {
                  $.current === null ? ($.current = [], Xr(X, ge, ke)) : ge(X);
                }
              };
              return he;
            } else {
              var me = {
                then: function(ge, ke) {
                  ge(X);
                }
              };
              return me;
            }
          }
        }
      }
      function Cr(n) {
        n !== qt - 1 && j("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), qt = n;
      }
      function Xr(n, a, d) {
        {
          var m = $.current;
          if (m !== null)
            try {
              en(m), Wi(function() {
                m.length === 0 ? ($.current = null, a(n)) : Xr(n, a, d);
              });
            } catch (E) {
              d(E);
            }
          else
            a(n);
        }
      }
      var Qr = !1;
      function en(n) {
        if (!Qr) {
          Qr = !0;
          var a = 0;
          try {
            for (; a < n.length; a++) {
              var d = n[a];
              do
                d = d(!0);
              while (d !== null);
            }
            n.length = 0;
          } catch (m) {
            throw n = n.slice(a + 1), m;
          } finally {
            Qr = !1;
          }
        }
      }
      var Bi = On, Yi = Mi, zi = Li, qi = {
        map: kt,
        forEach: pr,
        count: Wr,
        toArray: Br,
        only: br
      };
      t.Children = qi, t.Component = Y, t.Fragment = o, t.Profiler = _, t.PureComponent = te, t.StrictMode = v, t.Suspense = R, t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = K, t.act = Ln, t.cloneElement = Yi, t.createContext = gr, t.createElement = Bi, t.createFactory = zi, t.createRef = Lt, t.forwardRef = p, t.isValidElement = Ke, t.lazy = u, t.memo = Q, t.startTransition = $i, t.unstable_act = Ln, t.useCallback = dt, t.useContext = H, t.useDebugValue = qr, t.useDeferredValue = Ri, t.useEffect = Se, t.useId = ji, t.useImperativeHandle = nr, t.useInsertionEffect = ze, t.useLayoutEffect = gt, t.useMemo = Ie, t.useReducer = Te, t.useRef = be, t.useState = z, t.useSyncExternalStore = Pi, t.useTransition = Gr, t.version = r, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(ar, ar.exports)), ar.exports;
}
process.env.NODE_ENV === "production" ? un.exports = ls() : un.exports = fs();
var je = un.exports;
const le = /* @__PURE__ */ ai(je), ds = (e) => je.useRef(us(e)).current;
var cn = { exports: {} }, Pr = {};
/**
 * @license React
 * react-jsx-dev-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Gn;
function hs() {
  if (Gn) return Pr;
  Gn = 1;
  var e = Symbol.for("react.fragment");
  return Pr.Fragment = e, Pr.jsxDEV = void 0, Pr;
}
var kr = {};
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Hn;
function ms() {
  return Hn || (Hn = 1, process.env.NODE_ENV !== "production" && function() {
    var e = je, t = Symbol.for("react.element"), r = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), v = Symbol.for("react.provider"), _ = Symbol.for("react.context"), D = Symbol.for("react.forward_ref"), O = Symbol.for("react.suspense"), P = Symbol.for("react.suspense_list"), R = Symbol.for("react.memo"), ie = Symbol.for("react.lazy"), ae = Symbol.for("react.offscreen"), W = Symbol.iterator, Be = "@@iterator";
    function ye(u) {
      if (u === null || typeof u != "object")
        return null;
      var p = W && u[W] || u[Be];
      return typeof p == "function" ? p : null;
    }
    var fe = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function A(u) {
      {
        for (var p = arguments.length, C = new Array(p > 1 ? p - 1 : 0), V = 1; V < p; V++)
          C[V - 1] = arguments[V];
        Ae("error", u, C);
      }
    }
    function Ae(u, p, C) {
      {
        var V = fe.ReactDebugCurrentFrame, Q = V.getStackAddendum();
        Q !== "" && (p += "%s", C = C.concat([Q]));
        var M = C.map(function(H) {
          return String(H);
        });
        M.unshift("Warning: " + p), Function.prototype.apply.call(console[u], console, M);
      }
    }
    var Re = !1, $ = !1, Ee = !1, Ue = !1, Ve = !1, Ye;
    Ye = Symbol.for("react.module.reference");
    function Pe(u) {
      return !!(typeof u == "string" || typeof u == "function" || u === i || u === o || Ve || u === s || u === O || u === P || Ue || u === ae || Re || $ || Ee || typeof u == "object" && u !== null && (u.$$typeof === ie || u.$$typeof === R || u.$$typeof === v || u.$$typeof === _ || u.$$typeof === D || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      u.$$typeof === Ye || u.getModuleId !== void 0));
    }
    function nt(u, p, C) {
      var V = u.displayName;
      if (V)
        return V;
      var Q = p.displayName || p.name || "";
      return Q !== "" ? C + "(" + Q + ")" : C;
    }
    function U(u) {
      return u.displayName || "Context";
    }
    function F(u) {
      if (u == null)
        return null;
      if (typeof u.tag == "number" && A("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof u == "function")
        return u.displayName || u.name || null;
      if (typeof u == "string")
        return u;
      switch (u) {
        case i:
          return "Fragment";
        case r:
          return "Portal";
        case o:
          return "Profiler";
        case s:
          return "StrictMode";
        case O:
          return "Suspense";
        case P:
          return "SuspenseList";
      }
      if (typeof u == "object")
        switch (u.$$typeof) {
          case _:
            var p = u;
            return U(p) + ".Consumer";
          case v:
            var C = u;
            return U(C._context) + ".Provider";
          case D:
            return nt(u, u.render, "ForwardRef");
          case R:
            var V = u.displayName || null;
            return V !== null ? V : F(u.type) || "Memo";
          case ie: {
            var Q = u, M = Q._payload, H = Q._init;
            try {
              return F(H(M));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var J = Object.assign, K = 0, pe, j, Fe, Ge, Le, l, b;
    function B() {
    }
    B.__reactDisabledLog = !0;
    function Y() {
      {
        if (K === 0) {
          pe = console.log, j = console.info, Fe = console.warn, Ge = console.error, Le = console.group, l = console.groupCollapsed, b = console.groupEnd;
          var u = {
            configurable: !0,
            enumerable: !0,
            value: B,
            writable: !0
          };
          Object.defineProperties(console, {
            info: u,
            log: u,
            warn: u,
            error: u,
            group: u,
            groupCollapsed: u,
            groupEnd: u
          });
        }
        K++;
      }
    }
    function Z() {
      {
        if (K--, K === 0) {
          var u = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: J({}, u, {
              value: pe
            }),
            info: J({}, u, {
              value: j
            }),
            warn: J({}, u, {
              value: Fe
            }),
            error: J({}, u, {
              value: Ge
            }),
            group: J({}, u, {
              value: Le
            }),
            groupCollapsed: J({}, u, {
              value: l
            }),
            groupEnd: J({}, u, {
              value: b
            })
          });
        }
        K < 0 && A("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var re = fe.ReactCurrentDispatcher, ne;
    function ee(u, p, C) {
      {
        if (ne === void 0)
          try {
            throw Error();
          } catch (Q) {
            var V = Q.stack.trim().match(/\n( *(at )?)/);
            ne = V && V[1] || "";
          }
        return `
` + ne + u;
      }
    }
    var te = !1, we;
    {
      var Lt = typeof WeakMap == "function" ? WeakMap : Map;
      we = new Lt();
    }
    function Mt(u, p) {
      if (!u || te)
        return "";
      {
        var C = we.get(u);
        if (C !== void 0)
          return C;
      }
      var V;
      te = !0;
      var Q = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var M;
      M = re.current, re.current = null, Y();
      try {
        if (p) {
          var H = function() {
            throw Error();
          };
          if (Object.defineProperty(H.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(H, []);
            } catch (Ie) {
              V = Ie;
            }
            Reflect.construct(u, [], H);
          } else {
            try {
              H.call();
            } catch (Ie) {
              V = Ie;
            }
            u.call(H.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Ie) {
            V = Ie;
          }
          u();
        }
      } catch (Ie) {
        if (Ie && V && typeof Ie.stack == "string") {
          for (var z = Ie.stack.split(`
`), Te = V.stack.split(`
`), be = z.length - 1, Se = Te.length - 1; be >= 1 && Se >= 0 && z[be] !== Te[Se]; )
            Se--;
          for (; be >= 1 && Se >= 0; be--, Se--)
            if (z[be] !== Te[Se]) {
              if (be !== 1 || Se !== 1)
                do
                  if (be--, Se--, Se < 0 || z[be] !== Te[Se]) {
                    var ze = `
` + z[be].replace(" at new ", " at ");
                    return u.displayName && ze.includes("<anonymous>") && (ze = ze.replace("<anonymous>", u.displayName)), typeof u == "function" && we.set(u, ze), ze;
                  }
                while (be >= 1 && Se >= 0);
              break;
            }
        }
      } finally {
        te = !1, re.current = M, Z(), Error.prepareStackTrace = Q;
      }
      var gt = u ? u.displayName || u.name : "", dt = gt ? ee(gt) : "";
      return typeof u == "function" && we.set(u, dt), dt;
    }
    function ct(u, p, C) {
      return Mt(u, !1);
    }
    function $t(u) {
      var p = u.prototype;
      return !!(p && p.isReactComponent);
    }
    function jt(u, p, C) {
      if (u == null)
        return "";
      if (typeof u == "function")
        return Mt(u, $t(u));
      if (typeof u == "string")
        return ee(u);
      switch (u) {
        case O:
          return ee("Suspense");
        case P:
          return ee("SuspenseList");
      }
      if (typeof u == "object")
        switch (u.$$typeof) {
          case D:
            return ct(u.render);
          case R:
            return jt(u.type, p, C);
          case ie: {
            var V = u, Q = V._payload, M = V._init;
            try {
              return jt(M(Q), p, C);
            } catch {
            }
          }
        }
      return "";
    }
    var lt = Object.prototype.hasOwnProperty, yt = {}, c = fe.ReactDebugCurrentFrame;
    function f(u) {
      if (u) {
        var p = u._owner, C = jt(u.type, u._source, p ? p.type : null);
        c.setExtraStackFrame(C);
      } else
        c.setExtraStackFrame(null);
    }
    function h(u, p, C, V, Q) {
      {
        var M = Function.call.bind(lt);
        for (var H in u)
          if (M(u, H)) {
            var z = void 0;
            try {
              if (typeof u[H] != "function") {
                var Te = Error((V || "React class") + ": " + C + " type `" + H + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof u[H] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Te.name = "Invariant Violation", Te;
              }
              z = u[H](p, H, V, C, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (be) {
              z = be;
            }
            z && !(z instanceof Error) && (f(Q), A("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", V || "React class", C, H, typeof z), f(null)), z instanceof Error && !(z.message in yt) && (yt[z.message] = !0, f(Q), A("Failed %s type: %s", C, z.message), f(null));
          }
      }
    }
    var x = Array.isArray;
    function w(u) {
      return x(u);
    }
    function g(u) {
      {
        var p = typeof Symbol == "function" && Symbol.toStringTag, C = p && u[Symbol.toStringTag] || u.constructor.name || "Object";
        return C;
      }
    }
    function N(u) {
      try {
        return G(u), !1;
      } catch {
        return !0;
      }
    }
    function G(u) {
      return "" + u;
    }
    function de(u) {
      if (N(u))
        return A("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", g(u)), G(u);
    }
    var xe = fe.ReactCurrentOwner, it = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Wt, pt, Je;
    Je = {};
    function Qt(u) {
      if (lt.call(u, "ref")) {
        var p = Object.getOwnPropertyDescriptor(u, "ref").get;
        if (p && p.isReactWarning)
          return !1;
      }
      return u.ref !== void 0;
    }
    function Bt(u) {
      if (lt.call(u, "key")) {
        var p = Object.getOwnPropertyDescriptor(u, "key").get;
        if (p && p.isReactWarning)
          return !1;
      }
      return u.key !== void 0;
    }
    function er(u, p) {
      if (typeof u.ref == "string" && xe.current && p && xe.current.stateNode !== p) {
        var C = F(xe.current.type);
        Je[C] || (A('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', F(xe.current.type), u.ref), Je[C] = !0);
      }
    }
    function Ke(u, p) {
      {
        var C = function() {
          Wt || (Wt = !0, A("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", p));
        };
        C.isReactWarning = !0, Object.defineProperty(u, "key", {
          get: C,
          configurable: !0
        });
      }
    }
    function vr(u, p) {
      {
        var C = function() {
          pt || (pt = !0, A("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", p));
        };
        C.isReactWarning = !0, Object.defineProperty(u, "ref", {
          get: C,
          configurable: !0
        });
      }
    }
    var Mr = function(u, p, C, V, Q, M, H) {
      var z = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: u,
        key: p,
        ref: C,
        props: H,
        // Record the component responsible for creating this element.
        _owner: M
      };
      return z._store = {}, Object.defineProperty(z._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(z, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: V
      }), Object.defineProperty(z, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: Q
      }), Object.freeze && (Object.freeze(z.props), Object.freeze(z)), z;
    };
    function $r(u, p, C, V, Q) {
      {
        var M, H = {}, z = null, Te = null;
        C !== void 0 && (de(C), z = "" + C), Bt(p) && (de(p.key), z = "" + p.key), Qt(p) && (Te = p.ref, er(p, Q));
        for (M in p)
          lt.call(p, M) && !it.hasOwnProperty(M) && (H[M] = p[M]);
        if (u && u.defaultProps) {
          var be = u.defaultProps;
          for (M in be)
            H[M] === void 0 && (H[M] = be[M]);
        }
        if (z || Te) {
          var Se = typeof u == "function" ? u.displayName || u.name || "Unknown" : u;
          z && Ke(H, Se), Te && vr(H, Se);
        }
        return Mr(u, z, Te, Q, V, xe.current, H);
      }
    }
    var Yt = fe.ReactCurrentOwner, yr = fe.ReactDebugCurrentFrame;
    function ft(u) {
      if (u) {
        var p = u._owner, C = jt(u.type, u._source, p ? p.type : null);
        yr.setExtraStackFrame(C);
      } else
        yr.setExtraStackFrame(null);
    }
    var Pt;
    Pt = !1;
    function bt(u) {
      return typeof u == "object" && u !== null && u.$$typeof === t;
    }
    function kt() {
      {
        if (Yt.current) {
          var u = F(Yt.current.type);
          if (u)
            return `

Check the render method of \`` + u + "`.";
        }
        return "";
      }
    }
    function Wr(u) {
      {
        if (u !== void 0) {
          var p = u.fileName.replace(/^.*[\\\/]/, ""), C = u.lineNumber;
          return `

Check your code at ` + p + ":" + C + ".";
        }
        return "";
      }
    }
    var pr = {};
    function Br(u) {
      {
        var p = kt();
        if (!p) {
          var C = typeof u == "string" ? u : u.displayName || u.name;
          C && (p = `

Check the top-level render call using <` + C + ">.");
        }
        return p;
      }
    }
    function br(u, p) {
      {
        if (!u._store || u._store.validated || u.key != null)
          return;
        u._store.validated = !0;
        var C = Br(p);
        if (pr[C])
          return;
        pr[C] = !0;
        var V = "";
        u && u._owner && u._owner !== Yt.current && (V = " It was passed a child from " + F(u._owner.type) + "."), ft(u), A('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', C, V), ft(null);
      }
    }
    function gr(u, p) {
      {
        if (typeof u != "object")
          return;
        if (w(u))
          for (var C = 0; C < u.length; C++) {
            var V = u[C];
            bt(V) && br(V, p);
          }
        else if (bt(u))
          u._store && (u._store.validated = !0);
        else if (u) {
          var Q = ye(u);
          if (typeof Q == "function" && Q !== u.entries)
            for (var M = Q.call(u), H; !(H = M.next()).done; )
              bt(H.value) && br(H.value, p);
        }
      }
    }
    function Nt(u) {
      {
        var p = u.type;
        if (p == null || typeof p == "string")
          return;
        var C;
        if (typeof p == "function")
          C = p.propTypes;
        else if (typeof p == "object" && (p.$$typeof === D || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        p.$$typeof === R))
          C = p.propTypes;
        else
          return;
        if (C) {
          var V = F(p);
          h(C, u.props, "prop", V, u);
        } else if (p.PropTypes !== void 0 && !Pt) {
          Pt = !0;
          var Q = F(p);
          A("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Q || "Unknown");
        }
        typeof p.getDefaultProps == "function" && !p.getDefaultProps.isReactClassApproved && A("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function tr(u) {
      {
        for (var p = Object.keys(u.props), C = 0; C < p.length; C++) {
          var V = p[C];
          if (V !== "children" && V !== "key") {
            ft(u), A("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", V), ft(null);
            break;
          }
        }
        u.ref !== null && (ft(u), A("Invalid attribute `ref` supplied to `React.Fragment`."), ft(null));
      }
    }
    var rr = {};
    function Yr(u, p, C, V, Q, M) {
      {
        var H = Pe(u);
        if (!H) {
          var z = "";
          (u === void 0 || typeof u == "object" && u !== null && Object.keys(u).length === 0) && (z += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Te = Wr(Q);
          Te ? z += Te : z += kt();
          var be;
          u === null ? be = "null" : w(u) ? be = "array" : u !== void 0 && u.$$typeof === t ? (be = "<" + (F(u.type) || "Unknown") + " />", z = " Did you accidentally export a JSX literal instead of a component?") : be = typeof u, A("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", be, z);
        }
        var Se = $r(u, p, C, Q, M);
        if (Se == null)
          return Se;
        if (H) {
          var ze = p.children;
          if (ze !== void 0)
            if (V)
              if (w(ze)) {
                for (var gt = 0; gt < ze.length; gt++)
                  gr(ze[gt], u);
                Object.freeze && Object.freeze(ze);
              } else
                A("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              gr(ze, u);
        }
        if (lt.call(p, "key")) {
          var dt = F(u), Ie = Object.keys(p).filter(function(Gr) {
            return Gr !== "key";
          }), nr = Ie.length > 0 ? "{key: someKey, " + Ie.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!rr[dt + nr]) {
            var qr = Ie.length > 0 ? "{" + Ie.join(": ..., ") + ": ...}" : "{}";
            A(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, nr, dt, qr, dt), rr[dt + nr] = !0;
          }
        }
        return u === i ? tr(Se) : Nt(Se), Se;
      }
    }
    var zr = Yr;
    kr.Fragment = i, kr.jsxDEV = zr;
  }()), kr;
}
process.env.NODE_ENV === "production" ? cn.exports = hs() : cn.exports = ms();
var I = cn.exports, ui = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
(function(e) {
  (function() {
    var t = {}.hasOwnProperty;
    function r() {
      for (var o = "", v = 0; v < arguments.length; v++) {
        var _ = arguments[v];
        _ && (o = s(o, i(_)));
      }
      return o;
    }
    function i(o) {
      if (typeof o == "string" || typeof o == "number")
        return o;
      if (typeof o != "object")
        return "";
      if (Array.isArray(o))
        return r.apply(null, o);
      if (o.toString !== Object.prototype.toString && !o.toString.toString().includes("[native code]"))
        return o.toString();
      var v = "";
      for (var _ in o)
        t.call(o, _) && o[_] && (v = s(v, _));
      return v;
    }
    function s(o, v) {
      return v ? o ? o + " " + v : o + v : o;
    }
    e.exports ? (r.default = r, e.exports = r) : window.classNames = r;
  })();
})(ui);
var vs = ui.exports;
const Rt = /* @__PURE__ */ ai(vs), ys = ({ size: e }) => /* @__PURE__ */ I.jsxDEV("span", { className: "vh-loader", style: { height: e, width: e } }, void 0, !1, {
  fileName: "D:/Projects/js/varhub-ui-kit/src/components/Loader/Loader.tsx",
  lineNumber: 10,
  columnNumber: 9
}, void 0), ps = (e) => {
  const { children: t, title: r, actions: i, loading: s, error: o } = e;
  return /* @__PURE__ */ I.jsxDEV("div", { className: Rt("varhub-card"), children: [
    /* @__PURE__ */ I.jsxDEV("div", { className: "varhub-card__content varhub-card__header", children: [
      /* @__PURE__ */ I.jsxDEV("h2", { className: "varhub-card__header__text", children: r }, void 0, !1, {
        fileName: "D:/Projects/js/varhub-ui-kit/src/components/Card/Card.tsx",
        lineNumber: 20,
        columnNumber: 17
      }, void 0),
      s && /* @__PURE__ */ I.jsxDEV(ys, { size: 24 }, void 0, !1, {
        fileName: "D:/Projects/js/varhub-ui-kit/src/components/Card/Card.tsx",
        lineNumber: 21,
        columnNumber: 29
      }, void 0)
    ] }, void 0, !0, {
      fileName: "D:/Projects/js/varhub-ui-kit/src/components/Card/Card.tsx",
      lineNumber: 19,
      columnNumber: 13
    }, void 0),
    /* @__PURE__ */ I.jsxDEV("div", { className: "varhub-card__content varhub-card__body", children: t }, void 0, !1, {
      fileName: "D:/Projects/js/varhub-ui-kit/src/components/Card/Card.tsx",
      lineNumber: 23,
      columnNumber: 13
    }, void 0),
    i && /* @__PURE__ */ I.jsxDEV("div", { className: "varhub-card__content varhub-card__actions varhub-card__divider--top", children: i }, void 0, !1, {
      fileName: "D:/Projects/js/varhub-ui-kit/src/components/Card/Card.tsx",
      lineNumber: 28,
      columnNumber: 17
    }, void 0),
    o && /* @__PURE__ */ I.jsxDEV("div", { className: "varhub-card__error varhub-card__content varhub-card__divider--top", children: o }, void 0, !1, {
      fileName: "D:/Projects/js/varhub-ui-kit/src/components/Card/Card.tsx",
      lineNumber: 34,
      columnNumber: 17
    }, void 0),
    /* @__PURE__ */ I.jsxDEV("div", { className: "varhub-card__powered-by varhub-card__content varhub-card__divider--top", children: [
      "Powered by ",
      /* @__PURE__ */ I.jsxDEV("a", { className: "varhub-card__link", href: "https://github.com/flinbein/varhub-web-server", children: "VarHub" }, void 0, !1, {
        fileName: "D:/Projects/js/varhub-ui-kit/src/components/Card/Card.tsx",
        lineNumber: 40,
        columnNumber: 28
      }, void 0)
    ] }, void 0, !0, {
      fileName: "D:/Projects/js/varhub-ui-kit/src/components/Card/Card.tsx",
      lineNumber: 39,
      columnNumber: 13
    }, void 0)
  ] }, void 0, !0, {
    fileName: "D:/Projects/js/varhub-ui-kit/src/components/Card/Card.tsx",
    lineNumber: 18,
    columnNumber: 9
  }, void 0);
};
var hr = (e) => e.type === "checkbox", Ht = (e) => e instanceof Date, We = (e) => e == null;
const ci = (e) => typeof e == "object";
var De = (e) => !We(e) && !Array.isArray(e) && ci(e) && !Ht(e), li = (e) => De(e) && e.target ? hr(e.target) ? e.target.checked : e.target.value : e, bs = (e) => e.substring(0, e.search(/\.\d+(\.|$)/)) || e, fi = (e, t) => e.has(bs(t)), gs = (e) => {
  const t = e.constructor && e.constructor.prototype;
  return De(t) && t.hasOwnProperty("isPrototypeOf");
}, dn = typeof window < "u" && typeof window.HTMLElement < "u" && typeof document < "u";
function qe(e) {
  let t;
  const r = Array.isArray(e);
  if (e instanceof Date)
    t = new Date(e);
  else if (e instanceof Set)
    t = new Set(e);
  else if (!(dn && (e instanceof Blob || e instanceof FileList)) && (r || De(e)))
    if (t = r ? [] : {}, !r && !gs(e))
      t = e;
    else
      for (const i in e)
        e.hasOwnProperty(i) && (t[i] = qe(e[i]));
  else
    return e;
  return t;
}
var mr = (e) => Array.isArray(e) ? e.filter(Boolean) : [], Ce = (e) => e === void 0, S = (e, t, r) => {
  if (!t || !De(e))
    return r;
  const i = mr(t.split(/[,[\].]+?/)).reduce((s, o) => We(s) ? s : s[o], e);
  return Ce(i) || i === e ? Ce(e[t]) ? r : e[t] : i;
}, et = (e) => typeof e == "boolean";
const Or = {
  BLUR: "blur",
  FOCUS_OUT: "focusout",
  CHANGE: "change"
}, tt = {
  onBlur: "onBlur",
  onChange: "onChange",
  onSubmit: "onSubmit",
  onTouched: "onTouched",
  all: "all"
}, ht = {
  max: "max",
  min: "min",
  maxLength: "maxLength",
  minLength: "minLength",
  pattern: "pattern",
  required: "required",
  validate: "validate"
}, di = le.createContext(null), Xt = () => le.useContext(di), _s = (e) => {
  const { children: t, ...r } = e;
  return le.createElement(di.Provider, { value: r }, t);
};
var hi = (e, t, r, i = !0) => {
  const s = {
    defaultValues: t._defaultValues
  };
  for (const o in e)
    Object.defineProperty(s, o, {
      get: () => {
        const v = o;
        return t._proxyFormState[v] !== tt.all && (t._proxyFormState[v] = !i || tt.all), r && (r[v] = !0), e[v];
      }
    });
  return s;
}, He = (e) => De(e) && !Object.keys(e).length, mi = (e, t, r, i) => {
  r(e);
  const { name: s, ...o } = e;
  return He(o) || Object.keys(o).length >= Object.keys(t).length || Object.keys(o).find((v) => t[v] === (!i || tt.all));
}, Ar = (e) => Array.isArray(e) ? e : [e], vi = (e, t, r) => !e || !t || e === t || Ar(e).some((i) => i && (r ? i === t : i.startsWith(t) || t.startsWith(i)));
function hn(e) {
  const t = le.useRef(e);
  t.current = e, le.useEffect(() => {
    const r = !e.disabled && t.current.subject && t.current.subject.subscribe({
      next: t.current.next
    });
    return () => {
      r && r.unsubscribe();
    };
  }, [e.disabled]);
}
function Es(e) {
  const t = Xt(), { control: r = t.control, disabled: i, name: s, exact: o } = e || {}, [v, _] = le.useState(r._formState), D = le.useRef(!0), O = le.useRef({
    isDirty: !1,
    isLoading: !1,
    dirtyFields: !1,
    touchedFields: !1,
    validatingFields: !1,
    isValidating: !1,
    isValid: !1,
    errors: !1
  }), P = le.useRef(s);
  return P.current = s, hn({
    disabled: i,
    next: (R) => D.current && vi(P.current, R.name, o) && mi(R, O.current, r._updateFormState) && _({
      ...r._formState,
      ...R
    }),
    subject: r._subjects.state
  }), le.useEffect(() => (D.current = !0, O.current.isValid && r._updateValid(!0), () => {
    D.current = !1;
  }), [r]), hi(v, r, O.current, !1);
}
var ut = (e) => typeof e == "string", yi = (e, t, r, i, s) => ut(e) ? (i && t.watch.add(e), S(r, e, s)) : Array.isArray(e) ? e.map((o) => (i && t.watch.add(o), S(r, o))) : (i && (t.watchAll = !0), r);
function ws(e) {
  const t = Xt(), { control: r = t.control, name: i, defaultValue: s, disabled: o, exact: v } = e || {}, _ = le.useRef(i);
  _.current = i, hn({
    disabled: o,
    subject: r._subjects.values,
    next: (P) => {
      vi(_.current, P.name, v) && O(qe(yi(_.current, r._names, P.values || r._formValues, !1, s)));
    }
  });
  const [D, O] = le.useState(r._getWatch(i, s));
  return le.useEffect(() => r._removeUnmounted()), D;
}
var mn = (e) => /^\w*$/.test(e), pi = (e) => mr(e.replace(/["|']|\]/g, "").split(/\.|\[/)), ce = (e, t, r) => {
  let i = -1;
  const s = mn(t) ? [t] : pi(t), o = s.length, v = o - 1;
  for (; ++i < o; ) {
    const _ = s[i];
    let D = r;
    if (i !== v) {
      const O = e[_];
      D = De(O) || Array.isArray(O) ? O : isNaN(+s[i + 1]) ? {} : [];
    }
    e[_] = D, e = e[_];
  }
  return e;
};
function xs(e) {
  const t = Xt(), { name: r, disabled: i, control: s = t.control, shouldUnregister: o } = e, v = fi(s._names.array, r), _ = ws({
    control: s,
    name: r,
    defaultValue: S(s._formValues, r, S(s._defaultValues, r, e.defaultValue)),
    exact: !0
  }), D = Es({
    control: s,
    name: r
  }), O = le.useRef(s.register(r, {
    ...e.rules,
    value: _,
    ...et(e.disabled) ? { disabled: e.disabled } : {}
  }));
  return le.useEffect(() => {
    const P = s._options.shouldUnregister || o, R = (ie, ae) => {
      const W = S(s._fields, ie);
      W && (W._f.mount = ae);
    };
    if (R(r, !0), P) {
      const ie = qe(S(s._options.defaultValues, r));
      ce(s._defaultValues, r, ie), Ce(S(s._formValues, r)) && ce(s._formValues, r, ie);
    }
    return () => {
      (v ? P && !s._state.action : P) ? s.unregister(r) : R(r, !1);
    };
  }, [r, s, v, o]), le.useEffect(() => {
    S(s._fields, r) && s._updateDisabledField({
      disabled: i,
      fields: s._fields,
      name: r,
      value: S(s._fields, r)._f.value
    });
  }, [i, r, s]), {
    field: {
      name: r,
      value: _,
      ...et(i) || D.disabled ? { disabled: D.disabled || i } : {},
      onChange: le.useCallback((P) => O.current.onChange({
        target: {
          value: li(P),
          name: r
        },
        type: Or.CHANGE
      }), [r]),
      onBlur: le.useCallback(() => O.current.onBlur({
        target: {
          value: S(s._formValues, r),
          name: r
        },
        type: Or.BLUR
      }), [r, s]),
      ref: (P) => {
        const R = S(s._fields, r);
        R && P && (R._f.ref = {
          focus: () => P.focus(),
          select: () => P.select(),
          setCustomValidity: (ie) => P.setCustomValidity(ie),
          reportValidity: () => P.reportValidity()
        });
      }
    },
    formState: D,
    fieldState: Object.defineProperties({}, {
      invalid: {
        enumerable: !0,
        get: () => !!S(D.errors, r)
      },
      isDirty: {
        enumerable: !0,
        get: () => !!S(D.dirtyFields, r)
      },
      isTouched: {
        enumerable: !0,
        get: () => !!S(D.touchedFields, r)
      },
      isValidating: {
        enumerable: !0,
        get: () => !!S(D.validatingFields, r)
      },
      error: {
        enumerable: !0,
        get: () => S(D.errors, r)
      }
    })
  };
}
const Ss = (e) => e.render(xs(e));
var Cs = (e, t, r, i, s) => t ? {
  ...r[e],
  types: {
    ...r[e] && r[e].types ? r[e].types : {},
    [i]: s || !0
  }
} : {}, Jn = (e) => ({
  isOnSubmit: !e || e === tt.onSubmit,
  isOnBlur: e === tt.onBlur,
  isOnChange: e === tt.onChange,
  isOnAll: e === tt.all,
  isOnTouch: e === tt.onTouched
}), Kn = (e, t, r) => !r && (t.watchAll || t.watch.has(e) || [...t.watch].some((i) => e.startsWith(i) && /^\.\w+/.test(e.slice(i.length))));
const ur = (e, t, r, i) => {
  for (const s of r || Object.keys(e)) {
    const o = S(e, s);
    if (o) {
      const { _f: v, ..._ } = o;
      if (v) {
        if (v.refs && v.refs[0] && t(v.refs[0], s) && !i)
          break;
        if (v.ref && t(v.ref, v.name) && !i)
          break;
        ur(_, t);
      } else De(_) && ur(_, t);
    }
  }
};
var Rs = (e, t, r) => {
  const i = mr(S(e, r));
  return ce(i, "root", t[r]), ce(e, r, i), e;
}, vn = (e) => e.type === "file", St = (e) => typeof e == "function", Fr = (e) => {
  if (!dn)
    return !1;
  const t = e ? e.ownerDocument : 0;
  return e instanceof (t && t.defaultView ? t.defaultView.HTMLElement : HTMLElement);
}, Vr = (e) => ut(e), yn = (e) => e.type === "radio", Ir = (e) => e instanceof RegExp;
const Zn = {
  value: !1,
  isValid: !1
}, Xn = { value: !0, isValid: !0 };
var bi = (e) => {
  if (Array.isArray(e)) {
    if (e.length > 1) {
      const t = e.filter((r) => r && r.checked && !r.disabled).map((r) => r.value);
      return { value: t, isValid: !!t.length };
    }
    return e[0].checked && !e[0].disabled ? (
      // @ts-expect-error expected to work in the browser
      e[0].attributes && !Ce(e[0].attributes.value) ? Ce(e[0].value) || e[0].value === "" ? Xn : { value: e[0].value, isValid: !0 } : Xn
    ) : Zn;
  }
  return Zn;
};
const Qn = {
  isValid: !1,
  value: null
};
var gi = (e) => Array.isArray(e) ? e.reduce((t, r) => r && r.checked && !r.disabled ? {
  isValid: !0,
  value: r.value
} : t, Qn) : Qn;
function ei(e, t, r = "validate") {
  if (Vr(e) || Array.isArray(e) && e.every(Vr) || et(e) && !e)
    return {
      type: r,
      message: Vr(e) ? e : "",
      ref: t
    };
}
var Gt = (e) => De(e) && !Ir(e) ? e : {
  value: e,
  message: ""
}, ti = async (e, t, r, i, s) => {
  const { ref: o, refs: v, required: _, maxLength: D, minLength: O, min: P, max: R, pattern: ie, validate: ae, name: W, valueAsNumber: Be, mount: ye, disabled: fe } = e._f, A = S(t, W);
  if (!ye || fe)
    return {};
  const Ae = v ? v[0] : o, Re = (U) => {
    i && Ae.reportValidity && (Ae.setCustomValidity(et(U) ? "" : U || ""), Ae.reportValidity());
  }, $ = {}, Ee = yn(o), Ue = hr(o), Ve = Ee || Ue, Ye = (Be || vn(o)) && Ce(o.value) && Ce(A) || Fr(o) && o.value === "" || A === "" || Array.isArray(A) && !A.length, Pe = Cs.bind(null, W, r, $), nt = (U, F, J, K = ht.maxLength, pe = ht.minLength) => {
    const j = U ? F : J;
    $[W] = {
      type: U ? K : pe,
      message: j,
      ref: o,
      ...Pe(U ? K : pe, j)
    };
  };
  if (s ? !Array.isArray(A) || !A.length : _ && (!Ve && (Ye || We(A)) || et(A) && !A || Ue && !bi(v).isValid || Ee && !gi(v).isValid)) {
    const { value: U, message: F } = Vr(_) ? { value: !!_, message: _ } : Gt(_);
    if (U && ($[W] = {
      type: ht.required,
      message: F,
      ref: Ae,
      ...Pe(ht.required, F)
    }, !r))
      return Re(F), $;
  }
  if (!Ye && (!We(P) || !We(R))) {
    let U, F;
    const J = Gt(R), K = Gt(P);
    if (!We(A) && !isNaN(A)) {
      const pe = o.valueAsNumber || A && +A;
      We(J.value) || (U = pe > J.value), We(K.value) || (F = pe < K.value);
    } else {
      const pe = o.valueAsDate || new Date(A), j = (Le) => /* @__PURE__ */ new Date((/* @__PURE__ */ new Date()).toDateString() + " " + Le), Fe = o.type == "time", Ge = o.type == "week";
      ut(J.value) && A && (U = Fe ? j(A) > j(J.value) : Ge ? A > J.value : pe > new Date(J.value)), ut(K.value) && A && (F = Fe ? j(A) < j(K.value) : Ge ? A < K.value : pe < new Date(K.value));
    }
    if ((U || F) && (nt(!!U, J.message, K.message, ht.max, ht.min), !r))
      return Re($[W].message), $;
  }
  if ((D || O) && !Ye && (ut(A) || s && Array.isArray(A))) {
    const U = Gt(D), F = Gt(O), J = !We(U.value) && A.length > +U.value, K = !We(F.value) && A.length < +F.value;
    if ((J || K) && (nt(J, U.message, F.message), !r))
      return Re($[W].message), $;
  }
  if (ie && !Ye && ut(A)) {
    const { value: U, message: F } = Gt(ie);
    if (Ir(U) && !A.match(U) && ($[W] = {
      type: ht.pattern,
      message: F,
      ref: o,
      ...Pe(ht.pattern, F)
    }, !r))
      return Re(F), $;
  }
  if (ae) {
    if (St(ae)) {
      const U = await ae(A, t), F = ei(U, Ae);
      if (F && ($[W] = {
        ...F,
        ...Pe(ht.validate, F.message)
      }, !r))
        return Re(F.message), $;
    } else if (De(ae)) {
      let U = {};
      for (const F in ae) {
        if (!He(U) && !r)
          break;
        const J = ei(await ae[F](A, t), Ae, F);
        J && (U = {
          ...J,
          ...Pe(F, J.message)
        }, Re(J.message), r && ($[W] = U));
      }
      if (!He(U) && ($[W] = {
        ref: Ae,
        ...U
      }, !r))
        return $;
    }
  }
  return Re(!0), $;
};
function js(e, t) {
  const r = t.slice(0, -1).length;
  let i = 0;
  for (; i < r; )
    e = Ce(e) ? i++ : e[t[i++]];
  return e;
}
function Ps(e) {
  for (const t in e)
    if (e.hasOwnProperty(t) && !Ce(e[t]))
      return !1;
  return !0;
}
function Ne(e, t) {
  const r = Array.isArray(t) ? t : mn(t) ? [t] : pi(t), i = r.length === 1 ? e : js(e, r), s = r.length - 1, o = r[s];
  return i && delete i[o], s !== 0 && (De(i) && He(i) || Array.isArray(i) && Ps(i)) && Ne(e, r.slice(0, -1)), e;
}
var nn = () => {
  let e = [];
  return {
    get observers() {
      return e;
    },
    next: (s) => {
      for (const o of e)
        o.next && o.next(s);
    },
    subscribe: (s) => (e.push(s), {
      unsubscribe: () => {
        e = e.filter((o) => o !== s);
      }
    }),
    unsubscribe: () => {
      e = [];
    }
  };
}, Ur = (e) => We(e) || !ci(e);
function Dt(e, t) {
  if (Ur(e) || Ur(t))
    return e === t;
  if (Ht(e) && Ht(t))
    return e.getTime() === t.getTime();
  const r = Object.keys(e), i = Object.keys(t);
  if (r.length !== i.length)
    return !1;
  for (const s of r) {
    const o = e[s];
    if (!i.includes(s))
      return !1;
    if (s !== "ref") {
      const v = t[s];
      if (Ht(o) && Ht(v) || De(o) && De(v) || Array.isArray(o) && Array.isArray(v) ? !Dt(o, v) : o !== v)
        return !1;
    }
  }
  return !0;
}
var _i = (e) => e.type === "select-multiple", ks = (e) => yn(e) || hr(e), sn = (e) => Fr(e) && e.isConnected, Ei = (e) => {
  for (const t in e)
    if (St(e[t]))
      return !0;
  return !1;
};
function Lr(e, t = {}) {
  const r = Array.isArray(e);
  if (De(e) || r)
    for (const i in e)
      Array.isArray(e[i]) || De(e[i]) && !Ei(e[i]) ? (t[i] = Array.isArray(e[i]) ? [] : {}, Lr(e[i], t[i])) : We(e[i]) || (t[i] = !0);
  return t;
}
function wi(e, t, r) {
  const i = Array.isArray(e);
  if (De(e) || i)
    for (const s in e)
      Array.isArray(e[s]) || De(e[s]) && !Ei(e[s]) ? Ce(t) || Ur(r[s]) ? r[s] = Array.isArray(e[s]) ? Lr(e[s], []) : { ...Lr(e[s]) } : wi(e[s], We(t) ? {} : t[s], r[s]) : r[s] = !Dt(e[s], t[s]);
  return r;
}
var Nr = (e, t) => wi(e, t, Lr(t)), xi = (e, { valueAsNumber: t, valueAsDate: r, setValueAs: i }) => Ce(e) ? e : t ? e === "" ? NaN : e && +e : r && ut(e) ? new Date(e) : i ? i(e) : e;
function on(e) {
  const t = e.ref;
  if (!(e.refs ? e.refs.every((r) => r.disabled) : t.disabled))
    return vn(t) ? t.files : yn(t) ? gi(e.refs).value : _i(t) ? [...t.selectedOptions].map(({ value: r }) => r) : hr(t) ? bi(e.refs).value : xi(Ce(t.value) ? e.ref.value : t.value, e);
}
var Ns = (e, t, r, i) => {
  const s = {};
  for (const o of e) {
    const v = S(t, o);
    v && ce(s, o, v._f);
  }
  return {
    criteriaMode: r,
    names: [...e],
    fields: s,
    shouldUseNativeValidation: i
  };
}, sr = (e) => Ce(e) ? e : Ir(e) ? e.source : De(e) ? Ir(e.value) ? e.value.source : e.value : e, Ds = (e) => e.mount && (e.required || e.min || e.max || e.maxLength || e.minLength || e.pattern || e.validate);
function ri(e, t, r) {
  const i = S(e, r);
  if (i || mn(r))
    return {
      error: i,
      name: r
    };
  const s = r.split(".");
  for (; s.length; ) {
    const o = s.join("."), v = S(t, o), _ = S(e, o);
    if (v && !Array.isArray(v) && r !== o)
      return { name: r };
    if (_ && _.type)
      return {
        name: o,
        error: _
      };
    s.pop();
  }
  return {
    name: r
  };
}
var As = (e, t, r, i, s) => s.isOnAll ? !1 : !r && s.isOnTouch ? !(t || e) : (r ? i.isOnBlur : s.isOnBlur) ? !e : (r ? i.isOnChange : s.isOnChange) ? e : !0, Vs = (e, t) => !mr(S(e, t)).length && Ne(e, t);
const Ts = {
  mode: tt.onSubmit,
  reValidateMode: tt.onChange,
  shouldFocusError: !0
};
function Os(e = {}) {
  let t = {
    ...Ts,
    ...e
  }, r = {
    submitCount: 0,
    isDirty: !1,
    isLoading: St(t.defaultValues),
    isValidating: !1,
    isSubmitted: !1,
    isSubmitting: !1,
    isSubmitSuccessful: !1,
    isValid: !1,
    touchedFields: {},
    dirtyFields: {},
    validatingFields: {},
    errors: t.errors || {},
    disabled: t.disabled || !1
  }, i = {}, s = De(t.defaultValues) || De(t.values) ? qe(t.defaultValues || t.values) || {} : {}, o = t.shouldUnregister ? {} : qe(s), v = {
    action: !1,
    mount: !1,
    watch: !1
  }, _ = {
    mount: /* @__PURE__ */ new Set(),
    unMount: /* @__PURE__ */ new Set(),
    array: /* @__PURE__ */ new Set(),
    watch: /* @__PURE__ */ new Set()
  }, D, O = 0;
  const P = {
    isDirty: !1,
    dirtyFields: !1,
    validatingFields: !1,
    touchedFields: !1,
    isValidating: !1,
    isValid: !1,
    errors: !1
  }, R = {
    values: nn(),
    array: nn(),
    state: nn()
  }, ie = Jn(t.mode), ae = Jn(t.reValidateMode), W = t.criteriaMode === tt.all, Be = (c) => (f) => {
    clearTimeout(O), O = setTimeout(c, f);
  }, ye = async (c) => {
    if (P.isValid || c) {
      const f = t.resolver ? He((await Ve()).errors) : await Pe(i, !0);
      f !== r.isValid && R.state.next({
        isValid: f
      });
    }
  }, fe = (c, f) => {
    (P.isValidating || P.validatingFields) && ((c || Array.from(_.mount)).forEach((h) => {
      h && (f ? ce(r.validatingFields, h, f) : Ne(r.validatingFields, h));
    }), R.state.next({
      validatingFields: r.validatingFields,
      isValidating: !He(r.validatingFields)
    }));
  }, A = (c, f = [], h, x, w = !0, g = !0) => {
    if (x && h) {
      if (v.action = !0, g && Array.isArray(S(i, c))) {
        const N = h(S(i, c), x.argA, x.argB);
        w && ce(i, c, N);
      }
      if (g && Array.isArray(S(r.errors, c))) {
        const N = h(S(r.errors, c), x.argA, x.argB);
        w && ce(r.errors, c, N), Vs(r.errors, c);
      }
      if (P.touchedFields && g && Array.isArray(S(r.touchedFields, c))) {
        const N = h(S(r.touchedFields, c), x.argA, x.argB);
        w && ce(r.touchedFields, c, N);
      }
      P.dirtyFields && (r.dirtyFields = Nr(s, o)), R.state.next({
        name: c,
        isDirty: U(c, f),
        dirtyFields: r.dirtyFields,
        errors: r.errors,
        isValid: r.isValid
      });
    } else
      ce(o, c, f);
  }, Ae = (c, f) => {
    ce(r.errors, c, f), R.state.next({
      errors: r.errors
    });
  }, Re = (c) => {
    r.errors = c, R.state.next({
      errors: r.errors,
      isValid: !1
    });
  }, $ = (c, f, h, x) => {
    const w = S(i, c);
    if (w) {
      const g = S(o, c, Ce(h) ? S(s, c) : h);
      Ce(g) || x && x.defaultChecked || f ? ce(o, c, f ? g : on(w._f)) : K(c, g), v.mount && ye();
    }
  }, Ee = (c, f, h, x, w) => {
    let g = !1, N = !1;
    const G = {
      name: c
    }, de = !!(S(i, c) && S(i, c)._f.disabled);
    if (!h || x) {
      P.isDirty && (N = r.isDirty, r.isDirty = G.isDirty = U(), g = N !== G.isDirty);
      const xe = de || Dt(S(s, c), f);
      N = !!(!de && S(r.dirtyFields, c)), xe || de ? Ne(r.dirtyFields, c) : ce(r.dirtyFields, c, !0), G.dirtyFields = r.dirtyFields, g = g || P.dirtyFields && N !== !xe;
    }
    if (h) {
      const xe = S(r.touchedFields, c);
      xe || (ce(r.touchedFields, c, h), G.touchedFields = r.touchedFields, g = g || P.touchedFields && xe !== h);
    }
    return g && w && R.state.next(G), g ? G : {};
  }, Ue = (c, f, h, x) => {
    const w = S(r.errors, c), g = P.isValid && et(f) && r.isValid !== f;
    if (e.delayError && h ? (D = Be(() => Ae(c, h)), D(e.delayError)) : (clearTimeout(O), D = null, h ? ce(r.errors, c, h) : Ne(r.errors, c)), (h ? !Dt(w, h) : w) || !He(x) || g) {
      const N = {
        ...x,
        ...g && et(f) ? { isValid: f } : {},
        errors: r.errors,
        name: c
      };
      r = {
        ...r,
        ...N
      }, R.state.next(N);
    }
  }, Ve = async (c) => {
    fe(c, !0);
    const f = await t.resolver(o, t.context, Ns(c || _.mount, i, t.criteriaMode, t.shouldUseNativeValidation));
    return fe(c), f;
  }, Ye = async (c) => {
    const { errors: f } = await Ve(c);
    if (c)
      for (const h of c) {
        const x = S(f, h);
        x ? ce(r.errors, h, x) : Ne(r.errors, h);
      }
    else
      r.errors = f;
    return f;
  }, Pe = async (c, f, h = {
    valid: !0
  }) => {
    for (const x in c) {
      const w = c[x];
      if (w) {
        const { _f: g, ...N } = w;
        if (g) {
          const G = _.array.has(g.name);
          fe([x], !0);
          const de = await ti(w, o, W, t.shouldUseNativeValidation && !f, G);
          if (fe([x]), de[g.name] && (h.valid = !1, f))
            break;
          !f && (S(de, g.name) ? G ? Rs(r.errors, de, g.name) : ce(r.errors, g.name, de[g.name]) : Ne(r.errors, g.name));
        }
        N && await Pe(N, f, h);
      }
    }
    return h.valid;
  }, nt = () => {
    for (const c of _.unMount) {
      const f = S(i, c);
      f && (f._f.refs ? f._f.refs.every((h) => !sn(h)) : !sn(f._f.ref)) && re(c);
    }
    _.unMount = /* @__PURE__ */ new Set();
  }, U = (c, f) => (c && f && ce(o, c, f), !Dt(l(), s)), F = (c, f, h) => yi(c, _, {
    ...v.mount ? o : Ce(f) ? s : ut(c) ? { [c]: f } : f
  }, h, f), J = (c) => mr(S(v.mount ? o : s, c, e.shouldUnregister ? S(s, c, []) : [])), K = (c, f, h = {}) => {
    const x = S(i, c);
    let w = f;
    if (x) {
      const g = x._f;
      g && (!g.disabled && ce(o, c, xi(f, g)), w = Fr(g.ref) && We(f) ? "" : f, _i(g.ref) ? [...g.ref.options].forEach((N) => N.selected = w.includes(N.value)) : g.refs ? hr(g.ref) ? g.refs.length > 1 ? g.refs.forEach((N) => (!N.defaultChecked || !N.disabled) && (N.checked = Array.isArray(w) ? !!w.find((G) => G === N.value) : w === N.value)) : g.refs[0] && (g.refs[0].checked = !!w) : g.refs.forEach((N) => N.checked = N.value === w) : vn(g.ref) ? g.ref.value = "" : (g.ref.value = w, g.ref.type || R.values.next({
        name: c,
        values: { ...o }
      })));
    }
    (h.shouldDirty || h.shouldTouch) && Ee(c, w, h.shouldTouch, h.shouldDirty, !0), h.shouldValidate && Le(c);
  }, pe = (c, f, h) => {
    for (const x in f) {
      const w = f[x], g = `${c}.${x}`, N = S(i, g);
      (_.array.has(c) || !Ur(w) || N && !N._f) && !Ht(w) ? pe(g, w, h) : K(g, w, h);
    }
  }, j = (c, f, h = {}) => {
    const x = S(i, c), w = _.array.has(c), g = qe(f);
    ce(o, c, g), w ? (R.array.next({
      name: c,
      values: { ...o }
    }), (P.isDirty || P.dirtyFields) && h.shouldDirty && R.state.next({
      name: c,
      dirtyFields: Nr(s, o),
      isDirty: U(c, g)
    })) : x && !x._f && !We(g) ? pe(c, g, h) : K(c, g, h), Kn(c, _) && R.state.next({ ...r }), R.values.next({
      name: v.mount ? c : void 0,
      values: { ...o }
    });
  }, Fe = async (c) => {
    v.mount = !0;
    const f = c.target;
    let h = f.name, x = !0;
    const w = S(i, h), g = () => f.type ? on(w._f) : li(c), N = (G) => {
      x = Number.isNaN(G) || G === S(o, h, G);
    };
    if (w) {
      let G, de;
      const xe = g(), it = c.type === Or.BLUR || c.type === Or.FOCUS_OUT, Wt = !Ds(w._f) && !t.resolver && !S(r.errors, h) && !w._f.deps || As(it, S(r.touchedFields, h), r.isSubmitted, ae, ie), pt = Kn(h, _, it);
      ce(o, h, xe), it ? (w._f.onBlur && w._f.onBlur(c), D && D(0)) : w._f.onChange && w._f.onChange(c);
      const Je = Ee(h, xe, it, !1), Qt = !He(Je) || pt;
      if (!it && R.values.next({
        name: h,
        type: c.type,
        values: { ...o }
      }), Wt)
        return P.isValid && ye(), Qt && R.state.next({ name: h, ...pt ? {} : Je });
      if (!it && pt && R.state.next({ ...r }), t.resolver) {
        const { errors: Bt } = await Ve([h]);
        if (N(xe), x) {
          const er = ri(r.errors, i, h), Ke = ri(Bt, i, er.name || h);
          G = Ke.error, h = Ke.name, de = He(Bt);
        }
      } else
        fe([h], !0), G = (await ti(w, o, W, t.shouldUseNativeValidation))[h], fe([h]), N(xe), x && (G ? de = !1 : P.isValid && (de = await Pe(i, !0)));
      x && (w._f.deps && Le(w._f.deps), Ue(h, de, G, Je));
    }
  }, Ge = (c, f) => {
    if (S(r.errors, f) && c.focus)
      return c.focus(), 1;
  }, Le = async (c, f = {}) => {
    let h, x;
    const w = Ar(c);
    if (t.resolver) {
      const g = await Ye(Ce(c) ? c : w);
      h = He(g), x = c ? !w.some((N) => S(g, N)) : h;
    } else c ? (x = (await Promise.all(w.map(async (g) => {
      const N = S(i, g);
      return await Pe(N && N._f ? { [g]: N } : N);
    }))).every(Boolean), !(!x && !r.isValid) && ye()) : x = h = await Pe(i);
    return R.state.next({
      ...!ut(c) || P.isValid && h !== r.isValid ? {} : { name: c },
      ...t.resolver || !c ? { isValid: h } : {},
      errors: r.errors
    }), f.shouldFocus && !x && ur(i, Ge, c ? w : _.mount), x;
  }, l = (c) => {
    const f = {
      ...s,
      ...v.mount ? o : {}
    };
    return Ce(c) ? f : ut(c) ? S(f, c) : c.map((h) => S(f, h));
  }, b = (c, f) => ({
    invalid: !!S((f || r).errors, c),
    isDirty: !!S((f || r).dirtyFields, c),
    isTouched: !!S((f || r).touchedFields, c),
    isValidating: !!S((f || r).validatingFields, c),
    error: S((f || r).errors, c)
  }), B = (c) => {
    c && Ar(c).forEach((f) => Ne(r.errors, f)), R.state.next({
      errors: c ? r.errors : {}
    });
  }, Y = (c, f, h) => {
    const x = (S(i, c, { _f: {} })._f || {}).ref;
    ce(r.errors, c, {
      ...f,
      ref: x
    }), R.state.next({
      name: c,
      errors: r.errors,
      isValid: !1
    }), h && h.shouldFocus && x && x.focus && x.focus();
  }, Z = (c, f) => St(c) ? R.values.subscribe({
    next: (h) => c(F(void 0, f), h)
  }) : F(c, f, !0), re = (c, f = {}) => {
    for (const h of c ? Ar(c) : _.mount)
      _.mount.delete(h), _.array.delete(h), f.keepValue || (Ne(i, h), Ne(o, h)), !f.keepError && Ne(r.errors, h), !f.keepDirty && Ne(r.dirtyFields, h), !f.keepTouched && Ne(r.touchedFields, h), !f.keepIsValidating && Ne(r.validatingFields, h), !t.shouldUnregister && !f.keepDefaultValue && Ne(s, h);
    R.values.next({
      values: { ...o }
    }), R.state.next({
      ...r,
      ...f.keepDirty ? { isDirty: U() } : {}
    }), !f.keepIsValid && ye();
  }, ne = ({ disabled: c, name: f, field: h, fields: x, value: w }) => {
    if (et(c)) {
      const g = c ? void 0 : Ce(w) ? on(h ? h._f : S(x, f)._f) : w;
      ce(o, f, g), Ee(f, g, !1, !1, !0);
    }
  }, ee = (c, f = {}) => {
    let h = S(i, c);
    const x = et(f.disabled);
    return ce(i, c, {
      ...h || {},
      _f: {
        ...h && h._f ? h._f : { ref: { name: c } },
        name: c,
        mount: !0,
        ...f
      }
    }), _.mount.add(c), h ? ne({
      field: h,
      disabled: f.disabled,
      name: c,
      value: f.value
    }) : $(c, !0, f.value), {
      ...x ? { disabled: f.disabled } : {},
      ...t.progressive ? {
        required: !!f.required,
        min: sr(f.min),
        max: sr(f.max),
        minLength: sr(f.minLength),
        maxLength: sr(f.maxLength),
        pattern: sr(f.pattern)
      } : {},
      name: c,
      onChange: Fe,
      onBlur: Fe,
      ref: (w) => {
        if (w) {
          ee(c, f), h = S(i, c);
          const g = Ce(w.value) && w.querySelectorAll && w.querySelectorAll("input,select,textarea")[0] || w, N = ks(g), G = h._f.refs || [];
          if (N ? G.find((de) => de === g) : g === h._f.ref)
            return;
          ce(i, c, {
            _f: {
              ...h._f,
              ...N ? {
                refs: [
                  ...G.filter(sn),
                  g,
                  ...Array.isArray(S(s, c)) ? [{}] : []
                ],
                ref: { type: g.type, name: c }
              } : { ref: g }
            }
          }), $(c, !1, void 0, g);
        } else
          h = S(i, c, {}), h._f && (h._f.mount = !1), (t.shouldUnregister || f.shouldUnregister) && !(fi(_.array, c) && v.action) && _.unMount.add(c);
      }
    };
  }, te = () => t.shouldFocusError && ur(i, Ge, _.mount), we = (c) => {
    et(c) && (R.state.next({ disabled: c }), ur(i, (f, h) => {
      let x = c;
      const w = S(i, h);
      w && et(w._f.disabled) && (x || (x = w._f.disabled)), f.disabled = x;
    }, 0, !1));
  }, Lt = (c, f) => async (h) => {
    let x;
    h && (h.preventDefault && h.preventDefault(), h.persist && h.persist());
    let w = qe(o);
    if (R.state.next({
      isSubmitting: !0
    }), t.resolver) {
      const { errors: g, values: N } = await Ve();
      r.errors = g, w = N;
    } else
      await Pe(i);
    if (Ne(r.errors, "root"), He(r.errors)) {
      R.state.next({
        errors: {}
      });
      try {
        await c(w, h);
      } catch (g) {
        x = g;
      }
    } else
      f && await f({ ...r.errors }, h), te(), setTimeout(te);
    if (R.state.next({
      isSubmitted: !0,
      isSubmitting: !1,
      isSubmitSuccessful: He(r.errors) && !x,
      submitCount: r.submitCount + 1,
      errors: r.errors
    }), x)
      throw x;
  }, Mt = (c, f = {}) => {
    S(i, c) && (Ce(f.defaultValue) ? j(c, qe(S(s, c))) : (j(c, f.defaultValue), ce(s, c, qe(f.defaultValue))), f.keepTouched || Ne(r.touchedFields, c), f.keepDirty || (Ne(r.dirtyFields, c), r.isDirty = f.defaultValue ? U(c, qe(S(s, c))) : U()), f.keepError || (Ne(r.errors, c), P.isValid && ye()), R.state.next({ ...r }));
  }, ct = (c, f = {}) => {
    const h = c ? qe(c) : s, x = qe(h), w = He(c), g = w ? s : x;
    if (f.keepDefaultValues || (s = h), !f.keepValues) {
      if (f.keepDirtyValues)
        for (const N of _.mount)
          S(r.dirtyFields, N) ? ce(g, N, S(o, N)) : j(N, S(g, N));
      else {
        if (dn && Ce(c))
          for (const N of _.mount) {
            const G = S(i, N);
            if (G && G._f) {
              const de = Array.isArray(G._f.refs) ? G._f.refs[0] : G._f.ref;
              if (Fr(de)) {
                const xe = de.closest("form");
                if (xe) {
                  xe.reset();
                  break;
                }
              }
            }
          }
        i = {};
      }
      o = e.shouldUnregister ? f.keepDefaultValues ? qe(s) : {} : qe(g), R.array.next({
        values: { ...g }
      }), R.values.next({
        values: { ...g }
      });
    }
    _ = {
      mount: f.keepDirtyValues ? _.mount : /* @__PURE__ */ new Set(),
      unMount: /* @__PURE__ */ new Set(),
      array: /* @__PURE__ */ new Set(),
      watch: /* @__PURE__ */ new Set(),
      watchAll: !1,
      focus: ""
    }, v.mount = !P.isValid || !!f.keepIsValid || !!f.keepDirtyValues, v.watch = !!e.shouldUnregister, R.state.next({
      submitCount: f.keepSubmitCount ? r.submitCount : 0,
      isDirty: w ? !1 : f.keepDirty ? r.isDirty : !!(f.keepDefaultValues && !Dt(c, s)),
      isSubmitted: f.keepIsSubmitted ? r.isSubmitted : !1,
      dirtyFields: w ? [] : f.keepDirtyValues ? f.keepDefaultValues && o ? Nr(s, o) : r.dirtyFields : f.keepDefaultValues && c ? Nr(s, c) : {},
      touchedFields: f.keepTouched ? r.touchedFields : {},
      errors: f.keepErrors ? r.errors : {},
      isSubmitSuccessful: f.keepIsSubmitSuccessful ? r.isSubmitSuccessful : !1,
      isSubmitting: !1
    });
  }, $t = (c, f) => ct(St(c) ? c(o) : c, f);
  return {
    control: {
      register: ee,
      unregister: re,
      getFieldState: b,
      handleSubmit: Lt,
      setError: Y,
      _executeSchema: Ve,
      _getWatch: F,
      _getDirty: U,
      _updateValid: ye,
      _removeUnmounted: nt,
      _updateFieldArray: A,
      _updateDisabledField: ne,
      _getFieldArray: J,
      _reset: ct,
      _resetDefaultValues: () => St(t.defaultValues) && t.defaultValues().then((c) => {
        $t(c, t.resetOptions), R.state.next({
          isLoading: !1
        });
      }),
      _updateFormState: (c) => {
        r = {
          ...r,
          ...c
        };
      },
      _disableForm: we,
      _subjects: R,
      _proxyFormState: P,
      _setErrors: Re,
      get _fields() {
        return i;
      },
      get _formValues() {
        return o;
      },
      get _state() {
        return v;
      },
      set _state(c) {
        v = c;
      },
      get _defaultValues() {
        return s;
      },
      get _names() {
        return _;
      },
      set _names(c) {
        _ = c;
      },
      get _formState() {
        return r;
      },
      set _formState(c) {
        r = c;
      },
      get _options() {
        return t;
      },
      set _options(c) {
        t = {
          ...t,
          ...c
        };
      }
    },
    trigger: Le,
    register: ee,
    handleSubmit: Lt,
    watch: Z,
    setValue: j,
    getValues: l,
    reset: $t,
    resetField: Mt,
    clearErrors: B,
    unregister: re,
    setError: Y,
    setFocus: (c, f = {}) => {
      const h = S(i, c), x = h && h._f;
      if (x) {
        const w = x.refs ? x.refs[0] : x.ref;
        w.focus && (w.focus(), f.shouldSelect && w.select());
      }
    },
    getFieldState: b
  };
}
function Fs(e = {}) {
  const t = le.useRef(), r = le.useRef(), [i, s] = le.useState({
    isDirty: !1,
    isValidating: !1,
    isLoading: St(e.defaultValues),
    isSubmitted: !1,
    isSubmitting: !1,
    isSubmitSuccessful: !1,
    isValid: !1,
    submitCount: 0,
    dirtyFields: {},
    touchedFields: {},
    validatingFields: {},
    errors: e.errors || {},
    disabled: e.disabled || !1,
    defaultValues: St(e.defaultValues) ? void 0 : e.defaultValues
  });
  t.current || (t.current = {
    ...Os(e),
    formState: i
  });
  const o = t.current.control;
  return o._options = e, hn({
    subject: o._subjects.state,
    next: (v) => {
      mi(v, o._proxyFormState, o._updateFormState, !0) && s({ ...o._formState });
    }
  }), le.useEffect(() => o._disableForm(e.disabled), [o, e.disabled]), le.useEffect(() => {
    if (o._proxyFormState.isDirty) {
      const v = o._getDirty();
      v !== i.isDirty && o._subjects.state.next({
        isDirty: v
      });
    }
  }, [o, i.isDirty]), le.useEffect(() => {
    e.values && !Dt(e.values, r.current) ? (o._reset(e.values, o._options.resetOptions), r.current = e.values, s((v) => ({ ...v }))) : o._resetDefaultValues();
  }, [e.values, o]), le.useEffect(() => {
    e.errors && o._setErrors(e.errors);
  }, [e.errors, o]), le.useEffect(() => {
    o._state.mount || (o._updateValid(), o._state.mount = !0), o._state.watch && (o._state.watch = !1, o._subjects.state.next({ ...o._formState })), o._removeUnmounted();
  }), le.useEffect(() => {
    e.shouldUnregister && o._subjects.values.next({
      values: o._getWatch()
    });
  }, [e.shouldUnregister, o]), t.current.formState = hi(i, o), t.current;
}
const ln = (e) => {
  const {
    name: t,
    placeholder: r,
    label: i = e.name,
    className: s = "vh-mt-3",
    required: o = !1,
    pattern: v,
    patternMessage: _
  } = e, { register: D } = Xt(), O = je.useMemo(() => {
    if (v)
      return { value: v, message: _ || "Invalid pattern" };
  }, [v, _]);
  return /* @__PURE__ */ I.jsxDEV("div", { className: Rt("varhub-parameter-input", s), children: [
    /* @__PURE__ */ I.jsxDEV("input", { placeholder: r, type: "text", required: o, ...D(t, { shouldUnregister: !0, required: o, pattern: O }) }, void 0, !1, {
      fileName: "D:/Projects/js/varhub-ui-kit/src/components/parameter/VarhubInputParameter.tsx",
      lineNumber: 36,
      columnNumber: 13
    }, void 0),
    /* @__PURE__ */ I.jsxDEV("label", { children: i }, void 0, !1, {
      fileName: "D:/Projects/js/varhub-ui-kit/src/components/parameter/VarhubInputParameter.tsx",
      lineNumber: 37,
      columnNumber: 13
    }, void 0)
  ] }, void 0, !0, {
    fileName: "D:/Projects/js/varhub-ui-kit/src/components/parameter/VarhubInputParameter.tsx",
    lineNumber: 35,
    columnNumber: 9
  }, void 0);
}, Is = ({ direction: e }) => /* @__PURE__ */ I.jsxDEV("i", { className: Rt("vh-arrow", e) }, void 0, !1, {
  fileName: "D:/Projects/js/varhub-ui-kit/src/components/icon/ArrowIcon.tsx",
  lineNumber: 13,
  columnNumber: 9
}, void 0), Us = ({ children: e }) => {
  const [t, r] = je.useState(!1), i = je.useCallback(() => {
    r((s) => !s);
  }, [r]);
  return /* @__PURE__ */ I.jsxDEV("div", { className: "vh-settings-section varhub-card__divider--top", children: [
    /* @__PURE__ */ I.jsxDEV("h5", { className: "vh-settings-section__title", children: [
      "Settings",
      /* @__PURE__ */ I.jsxDEV(
        "a",
        {
          className: Rt("vh-settings-section__title__button", { reversed: t }),
          onClick: i,
          type: "button",
          children: /* @__PURE__ */ I.jsxDEV(Is, { direction: "down" }, void 0, !1, {
            fileName: "D:/Projects/js/varhub-ui-kit/src/components/settings/SettingsSection.tsx",
            lineNumber: 24,
            columnNumber: 21
          }, void 0)
        },
        void 0,
        !1,
        {
          fileName: "D:/Projects/js/varhub-ui-kit/src/components/settings/SettingsSection.tsx",
          lineNumber: 19,
          columnNumber: 17
        },
        void 0
      )
    ] }, void 0, !0, {
      fileName: "D:/Projects/js/varhub-ui-kit/src/components/settings/SettingsSection.tsx",
      lineNumber: 17,
      columnNumber: 13
    }, void 0),
    /* @__PURE__ */ I.jsxDEV("div", { className: `vh-settings-section__body ${t ? "shown" : "hidden"}`, children: e }, void 0, !1, {
      fileName: "D:/Projects/js/varhub-ui-kit/src/components/settings/SettingsSection.tsx",
      lineNumber: 27,
      columnNumber: 13
    }, void 0)
  ] }, void 0, !0, {
    fileName: "D:/Projects/js/varhub-ui-kit/src/components/settings/SettingsSection.tsx",
    lineNumber: 16,
    columnNumber: 9
  }, void 0);
}, ni = (e) => {
  const {
    children: t,
    htmlType: r,
    type: i = "primary",
    className: s,
    onClick: o,
    disabled: v,
    ..._
  } = e, D = (O) => {
    v || o?.(O);
  };
  return /* @__PURE__ */ I.jsxDEV(
    "button",
    {
      type: r,
      ..._,
      onClick: D,
      disabled: v,
      className: Rt("varhub-button", s, { [`type-${i}`]: i }),
      children: t
    },
    void 0,
    !1,
    {
      fileName: "D:/Projects/js/varhub-ui-kit/src/components/Button/VarhubButton.tsx",
      lineNumber: 34,
      columnNumber: 9
    },
    void 0
  );
}, Si = (e) => {
  const {
    name: t,
    placeholder: r,
    label: i = e.name,
    className: s = "vh-mt-3",
    min: o,
    max: v,
    required: _ = !1
  } = e, { register: D } = Xt(), O = je.useCallback((P) => {
    const R = parseInt(P);
    if (!isNaN(R))
      return R;
  }, []);
  return /* @__PURE__ */ I.jsxDEV("div", { className: Rt("varhub-parameter-input", s), children: [
    /* @__PURE__ */ I.jsxDEV(
      "input",
      {
        placeholder: r,
        type: "number",
        min: o,
        max: v,
        ...D(t, { min: o, max: v, shouldUnregister: !0, required: _, setValueAs: O })
      },
      void 0,
      !1,
      {
        fileName: "D:/Projects/js/varhub-ui-kit/src/components/parameter/VarhubNumberParameter.tsx",
        lineNumber: 38,
        columnNumber: 13
      },
      void 0
    ),
    /* @__PURE__ */ I.jsxDEV("label", { children: i }, void 0, !1, {
      fileName: "D:/Projects/js/varhub-ui-kit/src/components/parameter/VarhubNumberParameter.tsx",
      lineNumber: 45,
      columnNumber: 13
    }, void 0)
  ] }, void 0, !0, {
    fileName: "D:/Projects/js/varhub-ui-kit/src/components/parameter/VarhubNumberParameter.tsx",
    lineNumber: 37,
    columnNumber: 9
  }, void 0);
};
var Ci = {}, pn = {};
Object.defineProperty(pn, "__esModule", { value: !0 });
var ii = je, Ls = typeof document < "u" ? ii.useLayoutEffect : ii.useEffect;
pn.default = Ls;
var Ms = Ct && Ct.__createBinding || (Object.create ? function(e, t, r, i) {
  i === void 0 && (i = r);
  var s = Object.getOwnPropertyDescriptor(t, r);
  (!s || ("get" in s ? !t.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
    return t[r];
  } }), Object.defineProperty(e, i, s);
} : function(e, t, r, i) {
  i === void 0 && (i = r), e[i] = t[r];
}), $s = Ct && Ct.__setModuleDefault || (Object.create ? function(e, t) {
  Object.defineProperty(e, "default", { enumerable: !0, value: t });
} : function(e, t) {
  e.default = t;
}), Ws = Ct && Ct.__importStar || function(e) {
  if (e && e.__esModule) return e;
  var t = {};
  if (e != null) for (var r in e) r !== "default" && Object.prototype.hasOwnProperty.call(e, r) && Ms(t, e, r);
  return $s(t, e), t;
}, Bs = Ct && Ct.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Ci, "__esModule", { value: !0 });
var si = Ws(je), Ys = Bs(pn);
function zs(e) {
  var t = si.useRef(e), r = si.useRef(function() {
    for (var s = [], o = 0; o < arguments.length; o++)
      s[o] = arguments[o];
    return t.current.apply(this, s);
  }).current;
  return (0, Ys.default)(function() {
    t.current = e;
  }), r;
}
var qs = Ci.default = zs;
const Gs = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g, Hs = (e) => {
  const { children: t, initialParams: r, className: i, error: s, darkMode: o, onEnter: v, abortController: _ } = e, [D, O] = je.useState(r?.roomId !== void 0), P = je.useCallback(() => O((W) => !W), [O]), R = Fs({
    defaultValues: r,
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    shouldUseNativeValidation: !0,
    delayError: 500,
    shouldFocusError: !1
  }), ie = qs(async (W) => {
    console.log("$$$", "ON SUBMIT"), await v?.({
      joinMode: W.roomId !== void 0,
      serverUrl: W.serverUrl,
      roomId: W.roomId,
      playerName: W.playerName,
      settings: W.settings
    });
  });
  je.useEffect(() => {
    r?.autoJoin && (console.log("AUTO JOIN"), ie(R.getValues()));
  }, [r?.autoJoin]);
  const ae = /* @__PURE__ */ I.jsxDEV(I.Fragment, { children: [
    /* @__PURE__ */ I.jsxDEV(ni, { htmlType: "submit", disabled: _ != null, children: D ? "Join room" : "Create room" }, void 0, !1, {
      fileName: "D:/Projects/js/varhub-ui-kit/src/components/VarhubEnterPage.tsx",
      lineNumber: 69,
      columnNumber: 13
    }, void 0),
    /* @__PURE__ */ I.jsxDEV(
      ni,
      {
        type: "secondary",
        htmlType: "button",
        onClick: P,
        className: "vh-ml-2",
        disabled: _ != null,
        children: D ? "Or create new room" : "Or join existing room"
      },
      void 0,
      !1,
      {
        fileName: "D:/Projects/js/varhub-ui-kit/src/components/VarhubEnterPage.tsx",
        lineNumber: 72,
        columnNumber: 13
      },
      void 0
    )
  ] }, void 0, !0, {
    fileName: "D:/Projects/js/varhub-ui-kit/src/components/VarhubEnterPage.tsx",
    lineNumber: 68,
    columnNumber: 9
  }, void 0);
  return /* @__PURE__ */ I.jsxDEV("div", { className: Rt("varhub-page", i, { "dark-mode": o }), children: /* @__PURE__ */ I.jsxDEV(
    "form",
    {
      className: "varhub-form",
      onSubmit: R.handleSubmit(ie),
      children: /* @__PURE__ */ I.jsxDEV(ps, { title: "SpyFall", actions: ae, loading: _ != null, error: s, children: /* @__PURE__ */ I.jsxDEV(_s, { ...R, children: [
        /* @__PURE__ */ I.jsxDEV(
          ln,
          {
            required: !0,
            className: "vh-mt-2",
            name: "serverUrl",
            label: "Varhub server URL",
            pattern: Gs,
            patternMessage: "Invalid url"
          },
          void 0,
          !1,
          {
            fileName: "D:/Projects/js/varhub-ui-kit/src/components/VarhubEnterPage.tsx",
            lineNumber: 92,
            columnNumber: 25
          },
          void 0
        ),
        /* @__PURE__ */ I.jsxDEV(ln, { required: !0, className: "vh-mt-3", name: "playerName", label: "Player name" }, void 0, !1, {
          fileName: "D:/Projects/js/varhub-ui-kit/src/components/VarhubEnterPage.tsx",
          lineNumber: 100,
          columnNumber: 25
        }, void 0),
        D && /* @__PURE__ */ I.jsxDEV(Si, { required: !0, min: 0, className: "vh-mt-3", name: "roomId", label: "Room ID" }, void 0, !1, {
          fileName: "D:/Projects/js/varhub-ui-kit/src/components/VarhubEnterPage.tsx",
          lineNumber: 101,
          columnNumber: 38
        }, void 0),
        t && !D && /* @__PURE__ */ I.jsxDEV(Us, { children: t }, void 0, !1, {
          fileName: "D:/Projects/js/varhub-ui-kit/src/components/VarhubEnterPage.tsx",
          lineNumber: 103,
          columnNumber: 29
        }, void 0)
      ] }, void 0, !0, {
        fileName: "D:/Projects/js/varhub-ui-kit/src/components/VarhubEnterPage.tsx",
        lineNumber: 91,
        columnNumber: 21
      }, void 0) }, void 0, !1, {
        fileName: "D:/Projects/js/varhub-ui-kit/src/components/VarhubEnterPage.tsx",
        lineNumber: 90,
        columnNumber: 17
      }, void 0)
    },
    void 0,
    !1,
    {
      fileName: "D:/Projects/js/varhub-ui-kit/src/components/VarhubEnterPage.tsx",
      lineNumber: 86,
      columnNumber: 13
    },
    void 0
  ) }, void 0, !1, {
    fileName: "D:/Projects/js/varhub-ui-kit/src/components/VarhubEnterPage.tsx",
    lineNumber: 85,
    columnNumber: 9
  }, void 0);
}, bn = je.createContext(null), Xs = ({ children: e }) => {
  const [t, r] = je.useState(null), i = je.useMemo(() => ({ client: t, setClient: r }), [t, r]);
  return /* @__PURE__ */ I.jsxDEV(bn.Provider, { value: i, children: e }, void 0, !1, {
    fileName: "D:/Projects/js/varhub-ui-kit/src/context/VarhubGameClientContext.tsx",
    lineNumber: 17,
    columnNumber: 9
  }, void 0);
}, Qs = () => je.useContext(bn).client, eo = (e) => {
  const { roomIntegrity: t, importRoomModule: r, onEnter: i, children: s, darkMode: o, initialParams: v } = e, _ = ds(v), [D, O] = je.useState(null), P = je.useContext(bn), [R, ie] = je.useState(null), ae = je.useCallback(async (W) => {
    O(null);
    let Be = null, ye;
    try {
      console.log("$$$", "CREATE CLIENT");
      const fe = await as({
        ...W,
        roomIntegrity: t,
        importRoomModule: r
      });
      Be = fe.client, ye = fe.roomId, i?.(Be), P.setClient(Be), cs({
        ...W,
        roomId: ye,
        autoJoin: !0
      });
    } catch (fe) {
      const A = W.joinMode ? "connect to" : "create";
      O(`Error while trying to ${A} room`), console.error(fe);
    } finally {
      ie(null);
    }
  }, [i]);
  return /* @__PURE__ */ I.jsxDEV(
    Hs,
    {
      darkMode: o,
      initialParams: _,
      onEnter: ae,
      abortController: R,
      error: D,
      children: s
    },
    void 0,
    !1,
    {
      fileName: "D:/Projects/js/varhub-ui-kit/src/components/VarhubSelfControlEnterPage.tsx",
      lineNumber: 55,
      columnNumber: 9
    },
    void 0
  );
}, to = (e) => /* @__PURE__ */ I.jsxDEV(ln, { ...e, name: "settings." + e.name }, void 0, !1, {
  fileName: "D:/Projects/js/varhub-ui-kit/src/components/settings/SettingsInputParameter.tsx",
  lineNumber: 8,
  columnNumber: 9
}, void 0), ro = (e) => /* @__PURE__ */ I.jsxDEV(Si, { ...e, name: "settings." + e.name }, void 0, !1, {
  fileName: "D:/Projects/js/varhub-ui-kit/src/components/settings/SettingsNumberParameter.tsx",
  lineNumber: 8,
  columnNumber: 9
}, void 0), Js = (e) => {
  const { value: t, onChange: r, className: i, children: s } = e, o = je.useCallback((v) => {
    r?.(v.target.checked);
  }, [r]);
  return /* @__PURE__ */ I.jsxDEV("label", { className: Rt("vh-toggle", i), children: [
    /* @__PURE__ */ I.jsxDEV("span", { className: "vh-toggle-label", children: s }, void 0, !1, {
      fileName: "D:/Projects/js/varhub-ui-kit/src/components/Switch/Switch.tsx",
      lineNumber: 21,
      columnNumber: 13
    }, void 0),
    /* @__PURE__ */ I.jsxDEV("input", { className: "vh-toggle-checkbox", checked: t, onChange: o, type: "checkbox" }, void 0, !1, {
      fileName: "D:/Projects/js/varhub-ui-kit/src/components/Switch/Switch.tsx",
      lineNumber: 22,
      columnNumber: 13
    }, void 0),
    /* @__PURE__ */ I.jsxDEV("div", { className: "vh-toggle-switch" }, void 0, !1, {
      fileName: "D:/Projects/js/varhub-ui-kit/src/components/Switch/Switch.tsx",
      lineNumber: 23,
      columnNumber: 13
    }, void 0)
  ] }, void 0, !0, {
    fileName: "D:/Projects/js/varhub-ui-kit/src/components/Switch/Switch.tsx",
    lineNumber: 20,
    columnNumber: 9
  }, void 0);
}, Ks = (e) => {
  const {
    name: t,
    label: r = e.name,
    className: i = "vh-mt-3"
  } = e, { control: s, getValues: o } = Xt();
  return /* @__PURE__ */ I.jsxDEV(
    Ss,
    {
      render: ({ field: v }) => /* @__PURE__ */ I.jsxDEV(Js, { className: i, onChange: v.onChange, value: v.value, children: r }, void 0, !1, {
        fileName: "D:/Projects/js/varhub-ui-kit/src/components/parameter/VarhubSwitchParameter.tsx",
        lineNumber: 23,
        columnNumber: 34
      }, void 0),
      name: t,
      defaultValue: o(t) || !1,
      shouldUnregister: !0,
      control: s
    },
    void 0,
    !1,
    {
      fileName: "D:/Projects/js/varhub-ui-kit/src/components/parameter/VarhubSwitchParameter.tsx",
      lineNumber: 22,
      columnNumber: 9
    },
    void 0
  );
}, no = (e) => /* @__PURE__ */ I.jsxDEV(Ks, { ...e, name: "settings." + e.name }, void 0, !1, {
  fileName: "D:/Projects/js/varhub-ui-kit/src/components/settings/SettingsSwitchParameter.tsx",
  lineNumber: 8,
  columnNumber: 9
}, void 0);
export {
  to as SettingsInputParameter,
  ro as SettingsNumberParameter,
  no as SettingsSwitchParameter,
  Hs as VarhubEnterPage,
  bn as VarhubGameClientContext,
  Xs as VarhubGameClientProvider,
  eo as VarhubSelfControlEnterPage,
  as as createVarhubRoomAndClient,
  us as getVarhubEnterParams,
  cs as saveVarhubEnterParams,
  Qs as useVarhubGameClient,
  ds as useVarhubInitialParams
};

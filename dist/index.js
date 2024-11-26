var Hi = Object.defineProperty;
var $n = (e) => {
  throw TypeError(e);
};
var Ji = (e, t, r) => t in e ? Hi(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var _t = (e, t, r) => Ji(e, typeof t != "symbol" ? t + "" : t, r), en = (e, t, r) => t.has(e) || $n("Cannot " + r);
var y = (e, t, r) => (en(e, t, "read from private field"), r ? r.call(e) : t.get(e)), ce = (e, t, r) => t.has(e) ? $n("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), le = (e, t, r, i) => (en(e, t, "write to private field"), i ? i.call(e, r) : t.set(e, r), r), Et = (e, t, r) => (en(e, t, "access private method"), r);
class Ki {
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
const sn = new TextEncoder(), Wn = new TextDecoder();
function cn(...e) {
  const t = e.flatMap((a) => _e(a)), r = t.reduce((a, v) => a + (typeof v == "number" ? 1 : v.byteLength), 0), i = new Uint8Array(r);
  let s = 0;
  for (let a of t)
    if (typeof a == "number")
      i[s++] = a;
    else {
      const v = new Uint8Array(a.buffer, a.byteOffset, a.byteLength);
      i.set(v, s), s += a.byteLength;
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
    if (Number.isInteger(e) && Cr(e) && e <= 15)
      return [240 | e];
    if (Number.isSafeInteger(e)) {
      const r = e > 0 ? e : -e;
      if (r <= 255)
        return [Cr(e) ? 22 : 24, r];
      if (r <= 65535)
        return [Cr(e) ? 25 : 26, Uint16Array.of(r)];
      if (r <= 4294967295)
        return [Cr(e) ? 27 : 28, Uint32Array.of(r)];
    }
    return [3, Float64Array.of(e)];
  }
  if (typeof e == "bigint") {
    const r = e < 0n ? -e : e, i = Zi(r);
    return [
      e < 0n ? 23 : 4,
      ..._e(i.length),
      ...i
    ];
  }
  if (typeof e == "string") {
    sn.encode(e);
    const r = sn.encode(e);
    return r.length <= 15 ? [
      r.length | 224,
      r
    ] : [
      5,
      ...cn(r.length),
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
function ii(e, t = 1 / 0) {
  typeof e == "string" && (e = sn.encode(e));
  const r = [], i = new Ki(e);
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
    const r = ve(e), i = e.getNextUint8Array(r), s = Xi(i);
    return t === 4 ? s : -s;
  }
  if (t === 5) {
    const r = ve(e);
    return Wn.decode(e.getNextUint8Array(r));
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
    const r = ve(e), i = ve(e), s = ve(e), a = e.getNextUint8();
    let v;
    if (!a)
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
      return Wn.decode(e.getNextUint8Array(t & 15));
    if (t >= 240 && t <= 255)
      return t - 240;
    throw new Error("wrong binary state-data format");
  }
}
function Zi(e) {
  if (e === 0n)
    return new Uint8Array(0);
  let t = BigInt(e).toString(16);
  t.length % 2 && (t = "0" + t);
  const r = t.length / 2, i = new Uint8Array(r);
  let s = 0, a = 0;
  for (; s < r; )
    i[s] = parseInt(t.slice(a, a + 2), 16), s += 1, a += 2;
  return i;
}
function Xi(e) {
  if (e.length === 0)
    return 0n;
  const t = [];
  return Uint8Array.from(e).forEach(function(i) {
    var s = i.toString(16);
    s.length % 2 && (s = "0" + s), t.push(s);
  }), BigInt("0x" + t.join(""));
}
function Cr(e) {
  return 1 / 0 / e > 0;
}
var Ke;
class Ar {
  constructor() {
    ce(this, Ke, {});
    const t = this;
    Object.assign(this, {
      on(r, i) {
        let s = y(t, Ke)[r];
        return s || (s = y(t, Ke)[r] = []), s.push({ listener: i, context: this }), this;
      },
      once(r, i) {
        let s = y(t, Ke)[r];
        return s || (s = y(t, Ke)[r] = []), s.push({ listener: i, context: this, once: !0 }), this;
      },
      off(r, i) {
        if (!i)
          return delete y(t, Ke)[r], this;
        let s = y(t, Ke)[r];
        if (!s)
          return this;
        const a = s.findIndex((v) => v.listener === i);
        return a !== -1 && s.splice(a, 1), this;
      }
    });
  }
  emit(t, ...r) {
    let i = y(this, Ke)[t]?.slice(0);
    if (!i || i.length === 0)
      return !1;
    for (const { listener: s, once: a, context: v } of i)
      a && this.off(t, s), s.apply(v, r);
    return !0;
  }
  emitWithTry(t, ...r) {
    let i = y(this, Ke)[t]?.slice(0);
    if (!i || i.length === 0)
      return !1;
    for (const { listener: s, once: a, context: v } of i)
      try {
        a && this.off(t, s), s.apply(v, r);
      } catch {
      }
    return !0;
  }
}
Ke = new WeakMap();
const Qi = async () => {
};
var Ze, it, wt, ht, At;
class es {
  constructor(t, r = Qi) {
    ce(this, Ze);
    ce(this, it, new Ar());
    ce(this, wt, Promise.withResolvers());
    ce(this, ht, !1);
    ce(this, At, !1);
    if (le(this, Ze, t), y(this, wt).promise.catch(() => {
    }), t.binaryType = "arraybuffer", t.readyState === WebSocket.CLOSING || t.readyState === WebSocket.CLOSED)
      throw new Error("websocket is closed");
    t.readyState === WebSocket.CONNECTING ? t.addEventListener("open", () => {
      le(this, ht, !0), le(this, At, !1), y(this, it).emitWithTry("open"), y(this, wt).resolve(this);
    }) : (le(this, ht, !0), y(this, wt).resolve(this)), t.addEventListener("message", (i) => {
      y(this, it).emitWithTry("message", ...ii(i.data));
    }), t.addEventListener("close", (i) => {
      const s = y(this, ht);
      le(this, ht, !1), le(this, At, !0), y(this, it).emitWithTry("close", i.reason, s);
    }), t.addEventListener("error", () => {
      le(this, ht, !1), le(this, At, !0);
      const i = r ? r() : Promise.resolve(void 0);
      y(this, it).emitWithTry("error", i), y(this, wt).reject(new Error("websocket closed", { cause: i }));
    });
  }
  get promise() {
    return y(this, wt).promise;
  }
  get ready() {
    return y(this, ht);
  }
  get closed() {
    return y(this, At);
  }
  send(...t) {
    const r = cn(...t);
    return y(this, Ze).send(r), this;
  }
  on(t, r) {
    return y(this, it).on.call(this, t, r), this;
  }
  once(t, r) {
    return y(this, it).once.call(this, t, r), this;
  }
  off(t, r) {
    return y(this, it).off.call(this, t, r), this;
  }
  close(t) {
    y(this, Ze).readyState === WebSocket.CLOSED || y(this, Ze).readyState === WebSocket.CLOSING || y(this, Ze).close(4e3, t ?? void 0);
  }
  [Symbol.dispose]() {
    this.close("disposed");
  }
  [Symbol.asyncDispose]() {
    return y(this, Ze).readyState === WebSocket.CLOSED ? Promise.resolve() : new Promise((t) => {
      y(this, Ze).close(4e3, "disposed"), y(this, Ze).addEventListener("close", () => t());
    });
  }
}
Ze = new WeakMap(), it = new WeakMap(), wt = new WeakMap(), ht = new WeakMap(), At = new WeakMap();
var Me, ar, ur, mt, st, Vt, Ot, Tt, Jt, vt, Ft;
class ts {
  constructor(t, r) {
    ce(this, Me);
    ce(this, ar, null);
    ce(this, ur, null);
    ce(this, mt, new Ar());
    ce(this, st, new Ar());
    ce(this, Vt, null);
    ce(this, Ot, Promise.withResolvers());
    ce(this, Tt, !1);
    ce(this, Jt, !1);
    ce(this, vt);
    ce(this, Ft, (t, ...r) => {
      y(this, Me).send(cn(t, ...r));
    });
    le(this, Me, t), y(this, Ot).promise.catch(() => {
    }), t.binaryType = "arraybuffer", le(this, vt, new rs(y(this, st), y(this, Ft))), t.addEventListener("message", (i) => {
      const [s, ...a] = ii(i.data);
      y(this, mt).emitWithTry(s, ...a);
    }), t.addEventListener("close", (i) => {
      le(this, Jt, !0), le(this, Tt, !1), y(this, st).emitWithTry("close");
    }), t.addEventListener("error", () => {
      le(this, Jt, !0), le(this, Tt, !1);
      const i = r ? r() : Promise.resolve(void 0);
      y(this, st).emitWithTry("error", i), y(this, Ot).reject(new Error("websocket closed", { cause: i }));
    }), y(this, mt).on(3, (i, ...s) => {
      y(this, vt).onEnter(i, ...s);
    }), y(this, mt).on(2, (i) => {
      y(this, vt).onJoin(i);
    }), y(this, mt).on(5, (i, s, a) => {
      y(this, vt).onClose(i, s, a);
    }), y(this, mt).on(4, (i, ...s) => {
      y(this, vt).onMessage(i, ...s);
    }), y(this, mt).on(0, (i, s, a) => {
      le(this, ar, i), le(this, Vt, s ?? null), le(this, ur, a ?? null), y(this, Ot).resolve(this), le(this, Tt, !0), y(this, st).emitWithTry("ready");
    });
  }
  get promise() {
    return y(this, Ot).promise;
  }
  getConnections(t) {
    return y(this, vt).getConnections(t);
  }
  get ready() {
    return y(this, Tt);
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
    y(this, Vt) !== t && (le(this, Vt, t), y(this, Ft).call(this, 2, t));
  }
  get id() {
    return y(this, ar);
  }
  get integrity() {
    return y(this, ur);
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
    return y(this, st).on.call(this, t, r), this;
  }
  once(t, r) {
    return y(this, st).once.call(this, t, r), this;
  }
  off(t, r) {
    return y(this, st).off.call(this, t, r), this;
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
Me = new WeakMap(), ar = new WeakMap(), ur = new WeakMap(), mt = new WeakMap(), st = new WeakMap(), Vt = new WeakMap(), Ot = new WeakMap(), Tt = new WeakMap(), Jt = new WeakMap(), vt = new WeakMap(), Ft = new WeakMap();
class rs {
  constructor(t, r) {
    _t(this, "roomEmitter");
    _t(this, "roomAction");
    _t(this, "connections", /* @__PURE__ */ new Map());
    _t(this, "readyConnections", /* @__PURE__ */ new Set());
    _t(this, "connectionEmitters", /* @__PURE__ */ new WeakMap());
    this.roomEmitter = t, this.roomAction = r;
  }
  onEnter(t, ...r) {
    const i = new ns(t, r, this);
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
    return r || (r = new Ar(), this.connectionEmitters.set(t, r)), r;
  }
}
var Xe, cr, ot, It, Ut, lr;
class ns {
  constructor(t, r, i) {
    ce(this, Xe);
    ce(this, cr);
    ce(this, ot);
    ce(this, It);
    ce(this, Ut, Promise.withResolvers());
    ce(this, lr, !1);
    le(this, Xe, t), le(this, ot, i), le(this, cr, r);
    const s = le(this, It, y(this, ot).getConnectionEmitter(this));
    s.on("open", () => y(this, Ut).resolve(this)), s.on("close", (a) => y(this, Ut).reject(a)), y(this, Ut).promise.catch(() => {
    });
  }
  get promise() {
    return y(this, Ut).promise;
  }
  get parameters() {
    return y(this, cr);
  }
  get deferred() {
    return y(this, lr) && !this.ready && !this.closed;
  }
  defer(t, ...r) {
    le(this, lr, !0);
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
    return y(this, ot).isReady(y(this, Xe));
  }
  get closed() {
    return y(this, ot).isClosed(y(this, Xe));
  }
  open() {
    return y(this, ot).join(y(this, Xe)), this;
  }
  send(...t) {
    return y(this, ot).send(y(this, Xe), ...t), this;
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
    y(this, ot).close(y(this, Xe), t);
  }
  toString() {
    return "Connection(" + y(this, Xe) + ")";
  }
  valueOf() {
    return y(this, Xe);
  }
}
Xe = new WeakMap(), cr = new WeakMap(), ot = new WeakMap(), It = new WeakMap(), Ut = new WeakMap(), lr = new WeakMap();
var xt, tt, ir, kr;
class is {
  constructor(t) {
    ce(this, tt);
    ce(this, xt);
    le(this, xt, t instanceof URL ? t : new URL(t));
  }
  get url() {
    return y(this, xt).href;
  }
  async createRoom(t, r) {
    return Et(this, tt, ir).call(this, "POST", `room/${encodeURIComponent(t)}`, JSON.stringify(r));
  }
  createRoomSocket(t = {}) {
    const [r, i] = Et(this, tt, kr).call(this, "room/ws", t);
    return new ts(r, i);
  }
  async findRooms(t) {
    return Et(this, tt, ir).call(this, "GET", `rooms/${encodeURIComponent(t)}`);
  }
  async getRoomMessage(t, r) {
    return Et(this, tt, ir).call(this, "GET", `room/${encodeURIComponent(t)}`);
  }
  join(t, r = {}) {
    const [i, s] = Et(this, tt, kr).call(this, `room/${encodeURIComponent(t)}`, r, ["params"]);
    return new es(i, s);
  }
  createLogger(t) {
    return Et(this, tt, kr).call(this, `log/${encodeURIComponent(String(t))}`)[0];
  }
}
xt = new WeakMap(), tt = new WeakSet(), ir = async function(t, r, i) {
  const s = new URL(r, y(this, xt)), a = await fetch(s, {
    method: t,
    headers: { "Content-Type": "application/json" },
    body: i
  });
  if (!a.ok)
    throw new Error(await a.text());
  return a.json();
}, kr = function(t, r, i) {
  const s = new URL(y(this, xt));
  s.protocol = y(this, xt).protocol.replace("http", "ws");
  const a = new URL(t, s);
  if (r)
    for (let [T, P] of Object.entries(r))
      P !== void 0 && (i?.includes(T) && (P = JSON.stringify(P)), a.searchParams.set(T, P));
  const v = Array(5).fill(0).map(() => Math.random().toString(36).substring(2)).join(""), _ = () => Et(this, tt, ir).call(this, "GET", `/log/${encodeURIComponent(v)}`);
  a.searchParams.set("errorLog", v);
  const D = new WebSocket(a);
  return D.binaryType = "arraybuffer", [D, _];
};
async function ss(e) {
  const {
    serverUrl: t,
    playerName: r,
    settings: i = {},
    importRoomModule: s,
    roomIntegrity: a,
    engine: v = "ivm",
    roomPublicMessage: _
  } = e;
  let D = e.roomId;
  const T = new is(t);
  if (!D) {
    const { integrity: R, module: ie } = await s();
    D = (await T.createRoom(v, { module: ie, integrity: R, config: i, message: _ })).id;
  }
  const P = T.join(D, { params: [r], integrity: a });
  return { roomId: D, client: P, playerName: r };
}
const os = (e) => {
  const t = new URLSearchParams(location.search), r = JSON.parse(history?.state?.varhubEnterState || "{}"), i = t.get("serverUrl") ?? r.serverUrl ?? e.serverUrl ?? void 0, s = t.get("roomId") ?? r.roomId ?? void 0, a = r.playerName ?? void 0, v = r.settings ?? e.settings ?? {}, _ = r.autoJoin ?? !1;
  return {
    serverUrl: i,
    roomId: s,
    playerName: a,
    autoJoin: _,
    settings: v
  };
}, as = (e) => {
  const t = new URL(location.href), r = { varhubEnterState: JSON.stringify(e || {}) };
  t.search = "", history.replaceState(r, "", t);
};
var Ct = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function si(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var on = { exports: {} }, q = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Bn;
function us() {
  if (Bn) return q;
  Bn = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), v = Symbol.for("react.context"), _ = Symbol.for("react.forward_ref"), D = Symbol.for("react.suspense"), T = Symbol.for("react.memo"), P = Symbol.for("react.lazy"), R = Symbol.iterator;
  function ie(l) {
    return l === null || typeof l != "object" ? null : (l = R && l[R] || l["@@iterator"], typeof l == "function" ? l : null);
  }
  var se = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, W = Object.assign, We = {};
  function ye(l, b, B) {
    this.props = l, this.context = b, this.refs = We, this.updater = B || se;
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
    this.props = l, this.context = b, this.refs = We, this.updater = B || se;
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
  function Be(l, b) {
    return { $$typeof: e, type: l.type, key: b, ref: l.ref, props: l.props, _owner: l._owner };
  }
  function Pe(l) {
    return typeof l == "object" && l !== null && l.$$typeof === e;
  }
  function rt(l) {
    var b = { "=": "=0", ":": "=2" };
    return "$" + l.replace(/[=:]/g, function(B) {
      return b[B];
    });
  }
  var U = /\/+/g;
  function F(l, b) {
    return typeof l == "object" && l !== null && l.key != null ? rt("" + l.key) : b.toString(36);
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
    })) : Z != null && (Pe(Z) && (Z = Be(Z, B + (!Z.key || ne && ne.key === Z.key ? "" : ("" + Z.key).replace(U, "$&/") + "/") + l)), b.push(Z)), 1;
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
  var j = { current: null }, Fe = { transition: null }, qe = { ReactCurrentDispatcher: j, ReactCurrentBatchConfig: Fe, ReactCurrentOwner: Ee };
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
  } }, q.Component = ye, q.Fragment = r, q.Profiler = s, q.PureComponent = A, q.StrictMode = i, q.Suspense = D, q.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = qe, q.act = Le, q.cloneElement = function(l, b, B) {
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
    return l = { $$typeof: v, _currentValue: l, _currentValue2: l, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, l.Provider = { $$typeof: a, _context: l }, l.Consumer = l;
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
    return { $$typeof: T, type: l, compare: b === void 0 ? null : b };
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
var sr = { exports: {} };
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
sr.exports;
var Yn;
function cs() {
  return Yn || (Yn = 1, function(e, t) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var r = "18.3.1", i = Symbol.for("react.element"), s = Symbol.for("react.portal"), a = Symbol.for("react.fragment"), v = Symbol.for("react.strict_mode"), _ = Symbol.for("react.profiler"), D = Symbol.for("react.provider"), T = Symbol.for("react.context"), P = Symbol.for("react.forward_ref"), R = Symbol.for("react.suspense"), ie = Symbol.for("react.suspense_list"), se = Symbol.for("react.memo"), W = Symbol.for("react.lazy"), We = Symbol.for("react.offscreen"), ye = Symbol.iterator, fe = "@@iterator";
      function A(n) {
        if (n === null || typeof n != "object")
          return null;
        var o = ye && n[ye] || n[fe];
        return typeof o == "function" ? o : null;
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
      function Be(n) {
        Ve = n;
      }
      Ue.setExtraStackFrame = function(n) {
        Ve = n;
      }, Ue.getCurrentStack = null, Ue.getStackAddendum = function() {
        var n = "";
        Ve && (n += Ve);
        var o = Ue.getCurrentStack;
        return o && (n += o() || ""), n;
      };
      var Pe = !1, rt = !1, U = !1, F = !1, J = !1, K = {
        ReactCurrentDispatcher: Ae,
        ReactCurrentBatchConfig: Re,
        ReactCurrentOwner: Ee
      };
      K.ReactDebugCurrentFrame = Ue, K.ReactCurrentActQueue = $;
      function pe(n) {
        {
          for (var o = arguments.length, d = new Array(o > 1 ? o - 1 : 0), m = 1; m < o; m++)
            d[m - 1] = arguments[m];
          Fe("warn", n, d);
        }
      }
      function j(n) {
        {
          for (var o = arguments.length, d = new Array(o > 1 ? o - 1 : 0), m = 1; m < o; m++)
            d[m - 1] = arguments[m];
          Fe("error", n, d);
        }
      }
      function Fe(n, o, d) {
        {
          var m = K.ReactDebugCurrentFrame, E = m.getStackAddendum();
          E !== "" && (o += "%s", d = d.concat([E]));
          var O = d.map(function(k) {
            return String(k);
          });
          O.unshift("Warning: " + o), Function.prototype.apply.call(console[n], console, O);
        }
      }
      var qe = {};
      function Le(n, o) {
        {
          var d = n.constructor, m = d && (d.displayName || d.name) || "ReactClass", E = m + "." + o;
          if (qe[E])
            return;
          j("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", o, m), qe[E] = !0;
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
        enqueueForceUpdate: function(n, o, d) {
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
        enqueueReplaceState: function(n, o, d, m) {
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
        enqueueSetState: function(n, o, d, m) {
          Le(n, "setState");
        }
      }, b = Object.assign, B = {};
      Object.freeze(B);
      function Y(n, o, d) {
        this.props = n, this.context = o, this.refs = B, this.updater = d || l;
      }
      Y.prototype.isReactComponent = {}, Y.prototype.setState = function(n, o) {
        if (typeof n != "object" && typeof n != "function" && n != null)
          throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, n, o, "setState");
      }, Y.prototype.forceUpdate = function(n) {
        this.updater.enqueueForceUpdate(this, n, "forceUpdate");
      };
      {
        var Z = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, re = function(n, o) {
          Object.defineProperty(Y.prototype, n, {
            get: function() {
              pe("%s(...) is deprecated in plain JavaScript React classes. %s", o[0], o[1]);
            }
          });
        };
        for (var ne in Z)
          Z.hasOwnProperty(ne) && re(ne, Z[ne]);
      }
      function ee() {
      }
      ee.prototype = Y.prototype;
      function te(n, o, d) {
        this.props = n, this.context = o, this.refs = B, this.updater = d || l;
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
      function ut(n) {
        return Mt(n);
      }
      function $t(n) {
        {
          var o = typeof Symbol == "function" && Symbol.toStringTag, d = o && n[Symbol.toStringTag] || n.constructor.name || "Object";
          return d;
        }
      }
      function jt(n) {
        try {
          return ct(n), !1;
        } catch {
          return !0;
        }
      }
      function ct(n) {
        return "" + n;
      }
      function yt(n) {
        if (jt(n))
          return j("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", $t(n)), ct(n);
      }
      function c(n, o, d) {
        var m = n.displayName;
        if (m)
          return m;
        var E = o.displayName || o.name || "";
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
          case a:
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
            case T:
              var o = n;
              return f(o) + ".Consumer";
            case D:
              var d = n;
              return f(d._context) + ".Provider";
            case P:
              return c(n, n.render, "ForwardRef");
            case se:
              var m = n.displayName || null;
              return m !== null ? m : h(n.type) || "Memo";
            case W: {
              var E = n, O = E._payload, k = E._init;
              try {
                return h(k(O));
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
          var o = Object.getOwnPropertyDescriptor(n, "ref").get;
          if (o && o.isReactWarning)
            return !1;
        }
        return n.ref !== void 0;
      }
      function xe(n) {
        if (x.call(n, "key")) {
          var o = Object.getOwnPropertyDescriptor(n, "key").get;
          if (o && o.isReactWarning)
            return !1;
        }
        return n.key !== void 0;
      }
      function nt(n, o) {
        var d = function() {
          g || (g = !0, j("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", o));
        };
        d.isReactWarning = !0, Object.defineProperty(n, "key", {
          get: d,
          configurable: !0
        });
      }
      function Wt(n, o) {
        var d = function() {
          N || (N = !0, j("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", o));
        };
        d.isReactWarning = !0, Object.defineProperty(n, "ref", {
          get: d,
          configurable: !0
        });
      }
      function pt(n) {
        if (typeof n.ref == "string" && Ee.current && n.__self && Ee.current.stateNode !== n.__self) {
          var o = h(Ee.current.type);
          G[o] || (j('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', o, n.ref), G[o] = !0);
        }
      }
      var He = function(n, o, d, m, E, O, k) {
        var L = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: i,
          // Built-in properties that belong on the element
          type: n,
          key: o,
          ref: d,
          props: k,
          // Record the component responsible for creating this element.
          _owner: O
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
      function Zt(n, o, d) {
        var m, E = {}, O = null, k = null, L = null, X = null;
        if (o != null) {
          de(o) && (k = o.ref, pt(o)), xe(o) && (yt(o.key), O = "" + o.key), L = o.__self === void 0 ? null : o.__self, X = o.__source === void 0 ? null : o.__source;
          for (m in o)
            x.call(o, m) && !w.hasOwnProperty(m) && (E[m] = o[m]);
        }
        var oe = arguments.length - 2;
        if (oe === 1)
          E.children = d;
        else if (oe > 1) {
          for (var he = Array(oe), me = 0; me < oe; me++)
            he[me] = arguments[me + 2];
          Object.freeze && Object.freeze(he), E.children = he;
        }
        if (n && n.defaultProps) {
          var ge = n.defaultProps;
          for (m in ge)
            E[m] === void 0 && (E[m] = ge[m]);
        }
        if (O || k) {
          var ke = typeof n == "function" ? n.displayName || n.name || "Unknown" : n;
          O && nt(E, ke), k && Wt(E, ke);
        }
        return He(n, O, k, L, X, Ee.current, E);
      }
      function Bt(n, o) {
        var d = He(n.type, o, n.ref, n._self, n._source, n._owner, n.props);
        return d;
      }
      function Xt(n, o, d) {
        if (n == null)
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + n + ".");
        var m, E = b({}, n.props), O = n.key, k = n.ref, L = n._self, X = n._source, oe = n._owner;
        if (o != null) {
          de(o) && (k = o.ref, oe = Ee.current), xe(o) && (yt(o.key), O = "" + o.key);
          var he;
          n.type && n.type.defaultProps && (he = n.type.defaultProps);
          for (m in o)
            x.call(o, m) && !w.hasOwnProperty(m) && (o[m] === void 0 && he !== void 0 ? E[m] = he[m] : E[m] = o[m]);
        }
        var me = arguments.length - 2;
        if (me === 1)
          E.children = d;
        else if (me > 1) {
          for (var ge = Array(me), ke = 0; ke < me; ke++)
            ge[ke] = arguments[ke + 2];
          E.children = ge;
        }
        return He(n.type, O, k, L, X, oe, E);
      }
      function Je(n) {
        return typeof n == "object" && n !== null && n.$$typeof === i;
      }
      var hr = ".", Ur = ":";
      function Lr(n) {
        var o = /[=:]/g, d = {
          "=": "=0",
          ":": "=2"
        }, m = n.replace(o, function(E) {
          return d[E];
        });
        return "$" + m;
      }
      var Yt = !1, mr = /\/+/g;
      function lt(n) {
        return n.replace(mr, "$&/");
      }
      function Pt(n, o) {
        return typeof n == "object" && n !== null && n.key != null ? (yt(n.key), Lr("" + n.key)) : o.toString(36);
      }
      function bt(n, o, d, m, E) {
        var O = typeof n;
        (O === "undefined" || O === "boolean") && (n = null);
        var k = !1;
        if (n === null)
          k = !0;
        else
          switch (O) {
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
          var L = n, X = E(L), oe = m === "" ? hr + Pt(L, 0) : m;
          if (ut(X)) {
            var he = "";
            oe != null && (he = lt(oe) + "/"), bt(X, o, he, "", function(Gi) {
              return Gi;
            });
          } else X != null && (Je(X) && (X.key && (!L || L.key !== X.key) && yt(X.key), X = Bt(
            X,
            // Keep both the (mapped) and old keys if they differ, just as
            // traverseAllChildren used to do for objects as children
            d + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
            (X.key && (!L || L.key !== X.key) ? (
              // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
              // eslint-disable-next-line react-internal/safe-string-coercion
              lt("" + X.key) + "/"
            ) : "") + oe
          )), o.push(X));
          return 1;
        }
        var me, ge, ke = 0, Te = m === "" ? hr : m + Ur;
        if (ut(n))
          for (var Sr = 0; Sr < n.length; Sr++)
            me = n[Sr], ge = Te + Pt(me, Sr), ke += bt(me, o, d, ge, E);
        else {
          var Qr = A(n);
          if (typeof Qr == "function") {
            var Un = n;
            Qr === Un.entries && (Yt || pe("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Yt = !0);
            for (var zi = Qr.call(Un), Ln, qi = 0; !(Ln = zi.next()).done; )
              me = Ln.value, ge = Te + Pt(me, qi++), ke += bt(me, o, d, ge, E);
          } else if (O === "object") {
            var Mn = String(n);
            throw new Error("Objects are not valid as a React child (found: " + (Mn === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : Mn) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return ke;
      }
      function kt(n, o, d) {
        if (n == null)
          return n;
        var m = [], E = 0;
        return bt(n, m, "", "", function(O) {
          return o.call(d, O, E++);
        }), m;
      }
      function Mr(n) {
        var o = 0;
        return kt(n, function() {
          o++;
        }), o;
      }
      function vr(n, o, d) {
        kt(n, function() {
          o.apply(this, arguments);
        }, d);
      }
      function $r(n) {
        return kt(n, function(o) {
          return o;
        }) || [];
      }
      function yr(n) {
        if (!Je(n))
          throw new Error("React.Children.only expected to receive a single React element child.");
        return n;
      }
      function pr(n) {
        var o = {
          $$typeof: T,
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
        o.Provider = {
          $$typeof: D,
          _context: o
        };
        var d = !1, m = !1, E = !1;
        {
          var O = {
            $$typeof: T,
            _context: o
          };
          Object.defineProperties(O, {
            Provider: {
              get: function() {
                return m || (m = !0, j("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), o.Provider;
              },
              set: function(k) {
                o.Provider = k;
              }
            },
            _currentValue: {
              get: function() {
                return o._currentValue;
              },
              set: function(k) {
                o._currentValue = k;
              }
            },
            _currentValue2: {
              get: function() {
                return o._currentValue2;
              },
              set: function(k) {
                o._currentValue2 = k;
              }
            },
            _threadCount: {
              get: function() {
                return o._threadCount;
              },
              set: function(k) {
                o._threadCount = k;
              }
            },
            Consumer: {
              get: function() {
                return d || (d = !0, j("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), o.Consumer;
              }
            },
            displayName: {
              get: function() {
                return o.displayName;
              },
              set: function(k) {
                E || (pe("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", k), E = !0);
              }
            }
          }), o.Consumer = O;
        }
        return o._currentRenderer = null, o._currentRenderer2 = null, o;
      }
      var Nt = -1, Qt = 0, er = 1, Wr = 2;
      function Br(n) {
        if (n._status === Nt) {
          var o = n._result, d = o();
          if (d.then(function(O) {
            if (n._status === Qt || n._status === Nt) {
              var k = n;
              k._status = er, k._result = O;
            }
          }, function(O) {
            if (n._status === Qt || n._status === Nt) {
              var k = n;
              k._status = Wr, k._result = O;
            }
          }), n._status === Nt) {
            var m = n;
            m._status = Qt, m._result = d;
          }
        }
        if (n._status === er) {
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
        var o = {
          // We use these fields to store the result.
          _status: Nt,
          _result: n
        }, d = {
          $$typeof: W,
          _payload: o,
          _init: Br
        };
        {
          var m, E;
          Object.defineProperties(d, {
            defaultProps: {
              configurable: !0,
              get: function() {
                return m;
              },
              set: function(O) {
                j("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), m = O, Object.defineProperty(d, "defaultProps", {
                  enumerable: !0
                });
              }
            },
            propTypes: {
              configurable: !0,
              get: function() {
                return E;
              },
              set: function(O) {
                j("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), E = O, Object.defineProperty(d, "propTypes", {
                  enumerable: !0
                });
              }
            }
          });
        }
        return d;
      }
      function p(n) {
        n != null && n.$$typeof === se ? j("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof n != "function" ? j("forwardRef requires a render function but was given %s.", n === null ? "null" : typeof n) : n.length !== 0 && n.length !== 2 && j("forwardRef render functions accept exactly two parameters: props and ref. %s", n.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), n != null && (n.defaultProps != null || n.propTypes != null) && j("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var o = {
          $$typeof: P,
          render: n
        };
        {
          var d;
          Object.defineProperty(o, "displayName", {
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
        return o;
      }
      var C;
      C = Symbol.for("react.module.reference");
      function V(n) {
        return !!(typeof n == "string" || typeof n == "function" || n === a || n === _ || J || n === v || n === R || n === ie || F || n === We || Pe || rt || U || typeof n == "object" && n !== null && (n.$$typeof === W || n.$$typeof === se || n.$$typeof === D || n.$$typeof === T || n.$$typeof === P || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        n.$$typeof === C || n.getModuleId !== void 0));
      }
      function Q(n, o) {
        V(n) || j("memo: The first argument must be a component. Instead received: %s", n === null ? "null" : typeof n);
        var d = {
          $$typeof: se,
          type: n,
          compare: o === void 0 ? null : o
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
        var o = M();
        if (n._context !== void 0) {
          var d = n._context;
          d.Consumer === n ? j("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : d.Provider === n && j("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return o.useContext(n);
      }
      function z(n) {
        var o = M();
        return o.useState(n);
      }
      function Oe(n, o, d) {
        var m = M();
        return m.useReducer(n, o, d);
      }
      function be(n) {
        var o = M();
        return o.useRef(n);
      }
      function Se(n, o) {
        var d = M();
        return d.useEffect(n, o);
      }
      function Ye(n, o) {
        var d = M();
        return d.useInsertionEffect(n, o);
      }
      function gt(n, o) {
        var d = M();
        return d.useLayoutEffect(n, o);
      }
      function ft(n, o) {
        var d = M();
        return d.useCallback(n, o);
      }
      function Ie(n, o) {
        var d = M();
        return d.useMemo(n, o);
      }
      function tr(n, o, d) {
        var m = M();
        return m.useImperativeHandle(n, o, d);
      }
      function Yr(n, o) {
        {
          var d = M();
          return d.useDebugValue(n, o);
        }
      }
      function zr() {
        var n = M();
        return n.useTransition();
      }
      function Si(n) {
        var o = M();
        return o.useDeferredValue(n);
      }
      function Ci() {
        var n = M();
        return n.useId();
      }
      function Ri(n, o, d) {
        var m = M();
        return m.useSyncExternalStore(n, o, d);
      }
      var rr = 0, pn, bn, gn, _n, En, wn, xn;
      function Sn() {
      }
      Sn.__reactDisabledLog = !0;
      function ji() {
        {
          if (rr === 0) {
            pn = console.log, bn = console.info, gn = console.warn, _n = console.error, En = console.group, wn = console.groupCollapsed, xn = console.groupEnd;
            var n = {
              configurable: !0,
              enumerable: !0,
              value: Sn,
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
          rr++;
        }
      }
      function Pi() {
        {
          if (rr--, rr === 0) {
            var n = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: b({}, n, {
                value: pn
              }),
              info: b({}, n, {
                value: bn
              }),
              warn: b({}, n, {
                value: gn
              }),
              error: b({}, n, {
                value: _n
              }),
              group: b({}, n, {
                value: En
              }),
              groupCollapsed: b({}, n, {
                value: wn
              }),
              groupEnd: b({}, n, {
                value: xn
              })
            });
          }
          rr < 0 && j("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var qr = K.ReactCurrentDispatcher, Gr;
      function br(n, o, d) {
        {
          if (Gr === void 0)
            try {
              throw Error();
            } catch (E) {
              var m = E.stack.trim().match(/\n( *(at )?)/);
              Gr = m && m[1] || "";
            }
          return `
` + Gr + n;
        }
      }
      var Hr = !1, gr;
      {
        var ki = typeof WeakMap == "function" ? WeakMap : Map;
        gr = new ki();
      }
      function Cn(n, o) {
        if (!n || Hr)
          return "";
        {
          var d = gr.get(n);
          if (d !== void 0)
            return d;
        }
        var m;
        Hr = !0;
        var E = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var O;
        O = qr.current, qr.current = null, ji();
        try {
          if (o) {
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
              } catch (Te) {
                m = Te;
              }
              Reflect.construct(n, [], k);
            } else {
              try {
                k.call();
              } catch (Te) {
                m = Te;
              }
              n.call(k.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (Te) {
              m = Te;
            }
            n();
          }
        } catch (Te) {
          if (Te && m && typeof Te.stack == "string") {
            for (var L = Te.stack.split(`
`), X = m.stack.split(`
`), oe = L.length - 1, he = X.length - 1; oe >= 1 && he >= 0 && L[oe] !== X[he]; )
              he--;
            for (; oe >= 1 && he >= 0; oe--, he--)
              if (L[oe] !== X[he]) {
                if (oe !== 1 || he !== 1)
                  do
                    if (oe--, he--, he < 0 || L[oe] !== X[he]) {
                      var me = `
` + L[oe].replace(" at new ", " at ");
                      return n.displayName && me.includes("<anonymous>") && (me = me.replace("<anonymous>", n.displayName)), typeof n == "function" && gr.set(n, me), me;
                    }
                  while (oe >= 1 && he >= 0);
                break;
              }
          }
        } finally {
          Hr = !1, qr.current = O, Pi(), Error.prepareStackTrace = E;
        }
        var ge = n ? n.displayName || n.name : "", ke = ge ? br(ge) : "";
        return typeof n == "function" && gr.set(n, ke), ke;
      }
      function Ni(n, o, d) {
        return Cn(n, !1);
      }
      function Di(n) {
        var o = n.prototype;
        return !!(o && o.isReactComponent);
      }
      function _r(n, o, d) {
        if (n == null)
          return "";
        if (typeof n == "function")
          return Cn(n, Di(n));
        if (typeof n == "string")
          return br(n);
        switch (n) {
          case R:
            return br("Suspense");
          case ie:
            return br("SuspenseList");
        }
        if (typeof n == "object")
          switch (n.$$typeof) {
            case P:
              return Ni(n.render);
            case se:
              return _r(n.type, o, d);
            case W: {
              var m = n, E = m._payload, O = m._init;
              try {
                return _r(O(E), o, d);
              } catch {
              }
            }
          }
        return "";
      }
      var Rn = {}, jn = K.ReactDebugCurrentFrame;
      function Er(n) {
        if (n) {
          var o = n._owner, d = _r(n.type, n._source, o ? o.type : null);
          jn.setExtraStackFrame(d);
        } else
          jn.setExtraStackFrame(null);
      }
      function Ai(n, o, d, m, E) {
        {
          var O = Function.call.bind(x);
          for (var k in n)
            if (O(n, k)) {
              var L = void 0;
              try {
                if (typeof n[k] != "function") {
                  var X = Error((m || "React class") + ": " + d + " type `" + k + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof n[k] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw X.name = "Invariant Violation", X;
                }
                L = n[k](o, k, m, d, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (oe) {
                L = oe;
              }
              L && !(L instanceof Error) && (Er(E), j("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", m || "React class", d, k, typeof L), Er(null)), L instanceof Error && !(L.message in Rn) && (Rn[L.message] = !0, Er(E), j("Failed %s type: %s", d, L.message), Er(null));
            }
        }
      }
      function zt(n) {
        if (n) {
          var o = n._owner, d = _r(n.type, n._source, o ? o.type : null);
          Be(d);
        } else
          Be(null);
      }
      var Jr;
      Jr = !1;
      function Pn() {
        if (Ee.current) {
          var n = h(Ee.current.type);
          if (n)
            return `

Check the render method of \`` + n + "`.";
        }
        return "";
      }
      function Vi(n) {
        if (n !== void 0) {
          var o = n.fileName.replace(/^.*[\\\/]/, ""), d = n.lineNumber;
          return `

Check your code at ` + o + ":" + d + ".";
        }
        return "";
      }
      function Oi(n) {
        return n != null ? Vi(n.__source) : "";
      }
      var kn = {};
      function Ti(n) {
        var o = Pn();
        if (!o) {
          var d = typeof n == "string" ? n : n.displayName || n.name;
          d && (o = `

Check the top-level render call using <` + d + ">.");
        }
        return o;
      }
      function Nn(n, o) {
        if (!(!n._store || n._store.validated || n.key != null)) {
          n._store.validated = !0;
          var d = Ti(o);
          if (!kn[d]) {
            kn[d] = !0;
            var m = "";
            n && n._owner && n._owner !== Ee.current && (m = " It was passed a child from " + h(n._owner.type) + "."), zt(n), j('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', d, m), zt(null);
          }
        }
      }
      function Dn(n, o) {
        if (typeof n == "object") {
          if (ut(n))
            for (var d = 0; d < n.length; d++) {
              var m = n[d];
              Je(m) && Nn(m, o);
            }
          else if (Je(n))
            n._store && (n._store.validated = !0);
          else if (n) {
            var E = A(n);
            if (typeof E == "function" && E !== n.entries)
              for (var O = E.call(n), k; !(k = O.next()).done; )
                Je(k.value) && Nn(k.value, o);
          }
        }
      }
      function An(n) {
        {
          var o = n.type;
          if (o == null || typeof o == "string")
            return;
          var d;
          if (typeof o == "function")
            d = o.propTypes;
          else if (typeof o == "object" && (o.$$typeof === P || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          o.$$typeof === se))
            d = o.propTypes;
          else
            return;
          if (d) {
            var m = h(o);
            Ai(d, n.props, "prop", m, n);
          } else if (o.PropTypes !== void 0 && !Jr) {
            Jr = !0;
            var E = h(o);
            j("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", E || "Unknown");
          }
          typeof o.getDefaultProps == "function" && !o.getDefaultProps.isReactClassApproved && j("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function Fi(n) {
        {
          for (var o = Object.keys(n.props), d = 0; d < o.length; d++) {
            var m = o[d];
            if (m !== "children" && m !== "key") {
              zt(n), j("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", m), zt(null);
              break;
            }
          }
          n.ref !== null && (zt(n), j("Invalid attribute `ref` supplied to `React.Fragment`."), zt(null));
        }
      }
      function Vn(n, o, d) {
        var m = V(n);
        if (!m) {
          var E = "";
          (n === void 0 || typeof n == "object" && n !== null && Object.keys(n).length === 0) && (E += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var O = Oi(o);
          O ? E += O : E += Pn();
          var k;
          n === null ? k = "null" : ut(n) ? k = "array" : n !== void 0 && n.$$typeof === i ? (k = "<" + (h(n.type) || "Unknown") + " />", E = " Did you accidentally export a JSX literal instead of a component?") : k = typeof n, j("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", k, E);
        }
        var L = Zt.apply(this, arguments);
        if (L == null)
          return L;
        if (m)
          for (var X = 2; X < arguments.length; X++)
            Dn(arguments[X], n);
        return n === a ? Fi(L) : An(L), L;
      }
      var On = !1;
      function Ii(n) {
        var o = Vn.bind(null, n);
        return o.type = n, On || (On = !0, pe("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(o, "type", {
          enumerable: !1,
          get: function() {
            return pe("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: n
            }), n;
          }
        }), o;
      }
      function Ui(n, o, d) {
        for (var m = Xt.apply(this, arguments), E = 2; E < arguments.length; E++)
          Dn(arguments[E], m.type);
        return An(m), m;
      }
      function Li(n, o) {
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
      var Tn = !1, wr = null;
      function Mi(n) {
        if (wr === null)
          try {
            var o = ("require" + Math.random()).slice(0, 7), d = e && e[o];
            wr = d.call(e, "timers").setImmediate;
          } catch {
            wr = function(E) {
              Tn === !1 && (Tn = !0, typeof MessageChannel > "u" && j("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
              var O = new MessageChannel();
              O.port1.onmessage = E, O.port2.postMessage(void 0);
            };
          }
        return wr(n);
      }
      var qt = 0, Fn = !1;
      function In(n) {
        {
          var o = qt;
          qt++, $.current === null && ($.current = []);
          var d = $.isBatchingLegacy, m;
          try {
            if ($.isBatchingLegacy = !0, m = n(), !d && $.didScheduleLegacyUpdate) {
              var E = $.current;
              E !== null && ($.didScheduleLegacyUpdate = !1, Xr(E));
            }
          } catch (ge) {
            throw xr(o), ge;
          } finally {
            $.isBatchingLegacy = d;
          }
          if (m !== null && typeof m == "object" && typeof m.then == "function") {
            var O = m, k = !1, L = {
              then: function(ge, ke) {
                k = !0, O.then(function(Te) {
                  xr(o), qt === 0 ? Kr(Te, ge, ke) : ge(Te);
                }, function(Te) {
                  xr(o), ke(Te);
                });
              }
            };
            return !Fn && typeof Promise < "u" && Promise.resolve().then(function() {
            }).then(function() {
              k || (Fn = !0, j("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            }), L;
          } else {
            var X = m;
            if (xr(o), qt === 0) {
              var oe = $.current;
              oe !== null && (Xr(oe), $.current = null);
              var he = {
                then: function(ge, ke) {
                  $.current === null ? ($.current = [], Kr(X, ge, ke)) : ge(X);
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
      function xr(n) {
        n !== qt - 1 && j("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), qt = n;
      }
      function Kr(n, o, d) {
        {
          var m = $.current;
          if (m !== null)
            try {
              Xr(m), Mi(function() {
                m.length === 0 ? ($.current = null, o(n)) : Kr(n, o, d);
              });
            } catch (E) {
              d(E);
            }
          else
            o(n);
        }
      }
      var Zr = !1;
      function Xr(n) {
        if (!Zr) {
          Zr = !0;
          var o = 0;
          try {
            for (; o < n.length; o++) {
              var d = n[o];
              do
                d = d(!0);
              while (d !== null);
            }
            n.length = 0;
          } catch (m) {
            throw n = n.slice(o + 1), m;
          } finally {
            Zr = !1;
          }
        }
      }
      var $i = Vn, Wi = Ui, Bi = Ii, Yi = {
        map: kt,
        forEach: vr,
        count: Mr,
        toArray: $r,
        only: yr
      };
      t.Children = Yi, t.Component = Y, t.Fragment = a, t.Profiler = _, t.PureComponent = te, t.StrictMode = v, t.Suspense = R, t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = K, t.act = In, t.cloneElement = Wi, t.createContext = pr, t.createElement = $i, t.createFactory = Bi, t.createRef = Lt, t.forwardRef = p, t.isValidElement = Je, t.lazy = u, t.memo = Q, t.startTransition = Li, t.unstable_act = In, t.useCallback = ft, t.useContext = H, t.useDebugValue = Yr, t.useDeferredValue = Si, t.useEffect = Se, t.useId = Ci, t.useImperativeHandle = tr, t.useInsertionEffect = Ye, t.useLayoutEffect = gt, t.useMemo = Ie, t.useReducer = Oe, t.useRef = be, t.useState = z, t.useSyncExternalStore = Ri, t.useTransition = zr, t.version = r, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(sr, sr.exports)), sr.exports;
}
process.env.NODE_ENV === "production" ? on.exports = us() : on.exports = cs();
var je = on.exports;
const ue = /* @__PURE__ */ si(je), ls = (e) => je.useRef(os(e)).current;
var an = { exports: {} }, Rr = {};
/**
 * @license React
 * react-jsx-dev-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zn;
function fs() {
  if (zn) return Rr;
  zn = 1;
  var e = Symbol.for("react.fragment");
  return Rr.Fragment = e, Rr.jsxDEV = void 0, Rr;
}
var jr = {};
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qn;
function ds() {
  return qn || (qn = 1, process.env.NODE_ENV !== "production" && function() {
    var e = je, t = Symbol.for("react.element"), r = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), v = Symbol.for("react.provider"), _ = Symbol.for("react.context"), D = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), P = Symbol.for("react.suspense_list"), R = Symbol.for("react.memo"), ie = Symbol.for("react.lazy"), se = Symbol.for("react.offscreen"), W = Symbol.iterator, We = "@@iterator";
    function ye(u) {
      if (u === null || typeof u != "object")
        return null;
      var p = W && u[W] || u[We];
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
    var Re = !1, $ = !1, Ee = !1, Ue = !1, Ve = !1, Be;
    Be = Symbol.for("react.module.reference");
    function Pe(u) {
      return !!(typeof u == "string" || typeof u == "function" || u === i || u === a || Ve || u === s || u === T || u === P || Ue || u === se || Re || $ || Ee || typeof u == "object" && u !== null && (u.$$typeof === ie || u.$$typeof === R || u.$$typeof === v || u.$$typeof === _ || u.$$typeof === D || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      u.$$typeof === Be || u.getModuleId !== void 0));
    }
    function rt(u, p, C) {
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
        case a:
          return "Profiler";
        case s:
          return "StrictMode";
        case T:
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
            return rt(u, u.render, "ForwardRef");
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
    var J = Object.assign, K = 0, pe, j, Fe, qe, Le, l, b;
    function B() {
    }
    B.__reactDisabledLog = !0;
    function Y() {
      {
        if (K === 0) {
          pe = console.log, j = console.info, Fe = console.warn, qe = console.error, Le = console.group, l = console.groupCollapsed, b = console.groupEnd;
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
              value: qe
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
`), Oe = V.stack.split(`
`), be = z.length - 1, Se = Oe.length - 1; be >= 1 && Se >= 0 && z[be] !== Oe[Se]; )
            Se--;
          for (; be >= 1 && Se >= 0; be--, Se--)
            if (z[be] !== Oe[Se]) {
              if (be !== 1 || Se !== 1)
                do
                  if (be--, Se--, Se < 0 || z[be] !== Oe[Se]) {
                    var Ye = `
` + z[be].replace(" at new ", " at ");
                    return u.displayName && Ye.includes("<anonymous>") && (Ye = Ye.replace("<anonymous>", u.displayName)), typeof u == "function" && we.set(u, Ye), Ye;
                  }
                while (be >= 1 && Se >= 0);
              break;
            }
        }
      } finally {
        te = !1, re.current = M, Z(), Error.prepareStackTrace = Q;
      }
      var gt = u ? u.displayName || u.name : "", ft = gt ? ee(gt) : "";
      return typeof u == "function" && we.set(u, ft), ft;
    }
    function ut(u, p, C) {
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
        case T:
          return ee("Suspense");
        case P:
          return ee("SuspenseList");
      }
      if (typeof u == "object")
        switch (u.$$typeof) {
          case D:
            return ut(u.render);
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
    var ct = Object.prototype.hasOwnProperty, yt = {}, c = fe.ReactDebugCurrentFrame;
    function f(u) {
      if (u) {
        var p = u._owner, C = jt(u.type, u._source, p ? p.type : null);
        c.setExtraStackFrame(C);
      } else
        c.setExtraStackFrame(null);
    }
    function h(u, p, C, V, Q) {
      {
        var M = Function.call.bind(ct);
        for (var H in u)
          if (M(u, H)) {
            var z = void 0;
            try {
              if (typeof u[H] != "function") {
                var Oe = Error((V || "React class") + ": " + C + " type `" + H + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof u[H] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Oe.name = "Invariant Violation", Oe;
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
    var xe = fe.ReactCurrentOwner, nt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Wt, pt, He;
    He = {};
    function Zt(u) {
      if (ct.call(u, "ref")) {
        var p = Object.getOwnPropertyDescriptor(u, "ref").get;
        if (p && p.isReactWarning)
          return !1;
      }
      return u.ref !== void 0;
    }
    function Bt(u) {
      if (ct.call(u, "key")) {
        var p = Object.getOwnPropertyDescriptor(u, "key").get;
        if (p && p.isReactWarning)
          return !1;
      }
      return u.key !== void 0;
    }
    function Xt(u, p) {
      if (typeof u.ref == "string" && xe.current && p && xe.current.stateNode !== p) {
        var C = F(xe.current.type);
        He[C] || (A('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', F(xe.current.type), u.ref), He[C] = !0);
      }
    }
    function Je(u, p) {
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
    function hr(u, p) {
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
    var Ur = function(u, p, C, V, Q, M, H) {
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
    function Lr(u, p, C, V, Q) {
      {
        var M, H = {}, z = null, Oe = null;
        C !== void 0 && (de(C), z = "" + C), Bt(p) && (de(p.key), z = "" + p.key), Zt(p) && (Oe = p.ref, Xt(p, Q));
        for (M in p)
          ct.call(p, M) && !nt.hasOwnProperty(M) && (H[M] = p[M]);
        if (u && u.defaultProps) {
          var be = u.defaultProps;
          for (M in be)
            H[M] === void 0 && (H[M] = be[M]);
        }
        if (z || Oe) {
          var Se = typeof u == "function" ? u.displayName || u.name || "Unknown" : u;
          z && Je(H, Se), Oe && hr(H, Se);
        }
        return Ur(u, z, Oe, Q, V, xe.current, H);
      }
    }
    var Yt = fe.ReactCurrentOwner, mr = fe.ReactDebugCurrentFrame;
    function lt(u) {
      if (u) {
        var p = u._owner, C = jt(u.type, u._source, p ? p.type : null);
        mr.setExtraStackFrame(C);
      } else
        mr.setExtraStackFrame(null);
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
    function Mr(u) {
      {
        if (u !== void 0) {
          var p = u.fileName.replace(/^.*[\\\/]/, ""), C = u.lineNumber;
          return `

Check your code at ` + p + ":" + C + ".";
        }
        return "";
      }
    }
    var vr = {};
    function $r(u) {
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
    function yr(u, p) {
      {
        if (!u._store || u._store.validated || u.key != null)
          return;
        u._store.validated = !0;
        var C = $r(p);
        if (vr[C])
          return;
        vr[C] = !0;
        var V = "";
        u && u._owner && u._owner !== Yt.current && (V = " It was passed a child from " + F(u._owner.type) + "."), lt(u), A('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', C, V), lt(null);
      }
    }
    function pr(u, p) {
      {
        if (typeof u != "object")
          return;
        if (w(u))
          for (var C = 0; C < u.length; C++) {
            var V = u[C];
            bt(V) && yr(V, p);
          }
        else if (bt(u))
          u._store && (u._store.validated = !0);
        else if (u) {
          var Q = ye(u);
          if (typeof Q == "function" && Q !== u.entries)
            for (var M = Q.call(u), H; !(H = M.next()).done; )
              bt(H.value) && yr(H.value, p);
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
    function Qt(u) {
      {
        for (var p = Object.keys(u.props), C = 0; C < p.length; C++) {
          var V = p[C];
          if (V !== "children" && V !== "key") {
            lt(u), A("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", V), lt(null);
            break;
          }
        }
        u.ref !== null && (lt(u), A("Invalid attribute `ref` supplied to `React.Fragment`."), lt(null));
      }
    }
    var er = {};
    function Wr(u, p, C, V, Q, M) {
      {
        var H = Pe(u);
        if (!H) {
          var z = "";
          (u === void 0 || typeof u == "object" && u !== null && Object.keys(u).length === 0) && (z += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Oe = Mr(Q);
          Oe ? z += Oe : z += kt();
          var be;
          u === null ? be = "null" : w(u) ? be = "array" : u !== void 0 && u.$$typeof === t ? (be = "<" + (F(u.type) || "Unknown") + " />", z = " Did you accidentally export a JSX literal instead of a component?") : be = typeof u, A("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", be, z);
        }
        var Se = Lr(u, p, C, Q, M);
        if (Se == null)
          return Se;
        if (H) {
          var Ye = p.children;
          if (Ye !== void 0)
            if (V)
              if (w(Ye)) {
                for (var gt = 0; gt < Ye.length; gt++)
                  pr(Ye[gt], u);
                Object.freeze && Object.freeze(Ye);
              } else
                A("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              pr(Ye, u);
        }
        if (ct.call(p, "key")) {
          var ft = F(u), Ie = Object.keys(p).filter(function(zr) {
            return zr !== "key";
          }), tr = Ie.length > 0 ? "{key: someKey, " + Ie.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!er[ft + tr]) {
            var Yr = Ie.length > 0 ? "{" + Ie.join(": ..., ") + ": ...}" : "{}";
            A(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, tr, ft, Yr, ft), er[ft + tr] = !0;
          }
        }
        return u === i ? Qt(Se) : Nt(Se), Se;
      }
    }
    var Br = Wr;
    jr.Fragment = i, jr.jsxDEV = Br;
  }()), jr;
}
process.env.NODE_ENV === "production" ? an.exports = fs() : an.exports = ds();
var I = an.exports, oi = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
(function(e) {
  (function() {
    var t = {}.hasOwnProperty;
    function r() {
      for (var a = "", v = 0; v < arguments.length; v++) {
        var _ = arguments[v];
        _ && (a = s(a, i(_)));
      }
      return a;
    }
    function i(a) {
      if (typeof a == "string" || typeof a == "number")
        return a;
      if (typeof a != "object")
        return "";
      if (Array.isArray(a))
        return r.apply(null, a);
      if (a.toString !== Object.prototype.toString && !a.toString.toString().includes("[native code]"))
        return a.toString();
      var v = "";
      for (var _ in a)
        t.call(a, _) && a[_] && (v = s(v, _));
      return v;
    }
    function s(a, v) {
      return v ? a ? a + " " + v : a + v : a;
    }
    e.exports ? (r.default = r, e.exports = r) : window.classNames = r;
  })();
})(oi);
var hs = oi.exports;
const Rt = /* @__PURE__ */ si(hs), ms = ({ size: e }) => /* @__PURE__ */ I.jsxDEV("span", { className: "vh-loader", style: { height: e, width: e } }, void 0, !1, {
  fileName: "D:/Projects/js/varhub-ui-kit/src/components/Loader/Loader.tsx",
  lineNumber: 10,
  columnNumber: 9
}, void 0), vs = (e) => {
  const { children: t, title: r, actions: i, loading: s, error: a } = e;
  return /* @__PURE__ */ I.jsxDEV("div", { className: Rt("varhub-card"), children: [
    /* @__PURE__ */ I.jsxDEV("div", { className: "varhub-card__content varhub-card__header", children: [
      /* @__PURE__ */ I.jsxDEV("h2", { className: "varhub-card__header__text", children: r }, void 0, !1, {
        fileName: "D:/Projects/js/varhub-ui-kit/src/components/Card/Card.tsx",
        lineNumber: 20,
        columnNumber: 17
      }, void 0),
      s && /* @__PURE__ */ I.jsxDEV(ms, { size: 24 }, void 0, !1, {
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
    a && /* @__PURE__ */ I.jsxDEV("div", { className: "varhub-card__error varhub-card__content varhub-card__divider--top", children: a }, void 0, !1, {
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
var fr = (e) => e.type === "checkbox", Ht = (e) => e instanceof Date, $e = (e) => e == null;
const ai = (e) => typeof e == "object";
var De = (e) => !$e(e) && !Array.isArray(e) && ai(e) && !Ht(e), ui = (e) => De(e) && e.target ? fr(e.target) ? e.target.checked : e.target.value : e, ys = (e) => e.substring(0, e.search(/\.\d+(\.|$)/)) || e, ci = (e, t) => e.has(ys(t)), ps = (e) => {
  const t = e.constructor && e.constructor.prototype;
  return De(t) && t.hasOwnProperty("isPrototypeOf");
}, ln = typeof window < "u" && typeof window.HTMLElement < "u" && typeof document < "u";
function ze(e) {
  let t;
  const r = Array.isArray(e);
  if (e instanceof Date)
    t = new Date(e);
  else if (e instanceof Set)
    t = new Set(e);
  else if (!(ln && (e instanceof Blob || e instanceof FileList)) && (r || De(e)))
    if (t = r ? [] : {}, !r && !ps(e))
      t = e;
    else
      for (const i in e)
        e.hasOwnProperty(i) && (t[i] = ze(e[i]));
  else
    return e;
  return t;
}
var dr = (e) => Array.isArray(e) ? e.filter(Boolean) : [], Ce = (e) => e === void 0, S = (e, t, r) => {
  if (!t || !De(e))
    return r;
  const i = dr(t.split(/[,[\].]+?/)).reduce((s, a) => $e(s) ? s : s[a], e);
  return Ce(i) || i === e ? Ce(e[t]) ? r : e[t] : i;
}, Qe = (e) => typeof e == "boolean";
const Vr = {
  BLUR: "blur",
  FOCUS_OUT: "focusout",
  CHANGE: "change"
}, et = {
  onBlur: "onBlur",
  onChange: "onChange",
  onSubmit: "onSubmit",
  onTouched: "onTouched",
  all: "all"
}, dt = {
  max: "max",
  min: "min",
  maxLength: "maxLength",
  minLength: "minLength",
  pattern: "pattern",
  required: "required",
  validate: "validate"
}, li = ue.createContext(null), Kt = () => ue.useContext(li), bs = (e) => {
  const { children: t, ...r } = e;
  return ue.createElement(li.Provider, { value: r }, t);
};
var fi = (e, t, r, i = !0) => {
  const s = {
    defaultValues: t._defaultValues
  };
  for (const a in e)
    Object.defineProperty(s, a, {
      get: () => {
        const v = a;
        return t._proxyFormState[v] !== et.all && (t._proxyFormState[v] = !i || et.all), r && (r[v] = !0), e[v];
      }
    });
  return s;
}, Ge = (e) => De(e) && !Object.keys(e).length, di = (e, t, r, i) => {
  r(e);
  const { name: s, ...a } = e;
  return Ge(a) || Object.keys(a).length >= Object.keys(t).length || Object.keys(a).find((v) => t[v] === (!i || et.all));
}, Nr = (e) => Array.isArray(e) ? e : [e], hi = (e, t, r) => !e || !t || e === t || Nr(e).some((i) => i && (r ? i === t : i.startsWith(t) || t.startsWith(i)));
function fn(e) {
  const t = ue.useRef(e);
  t.current = e, ue.useEffect(() => {
    const r = !e.disabled && t.current.subject && t.current.subject.subscribe({
      next: t.current.next
    });
    return () => {
      r && r.unsubscribe();
    };
  }, [e.disabled]);
}
function gs(e) {
  const t = Kt(), { control: r = t.control, disabled: i, name: s, exact: a } = e || {}, [v, _] = ue.useState(r._formState), D = ue.useRef(!0), T = ue.useRef({
    isDirty: !1,
    isLoading: !1,
    dirtyFields: !1,
    touchedFields: !1,
    validatingFields: !1,
    isValidating: !1,
    isValid: !1,
    errors: !1
  }), P = ue.useRef(s);
  return P.current = s, fn({
    disabled: i,
    next: (R) => D.current && hi(P.current, R.name, a) && di(R, T.current, r._updateFormState) && _({
      ...r._formState,
      ...R
    }),
    subject: r._subjects.state
  }), ue.useEffect(() => (D.current = !0, T.current.isValid && r._updateValid(!0), () => {
    D.current = !1;
  }), [r]), fi(v, r, T.current, !1);
}
var at = (e) => typeof e == "string", mi = (e, t, r, i, s) => at(e) ? (i && t.watch.add(e), S(r, e, s)) : Array.isArray(e) ? e.map((a) => (i && t.watch.add(a), S(r, a))) : (i && (t.watchAll = !0), r);
function _s(e) {
  const t = Kt(), { control: r = t.control, name: i, defaultValue: s, disabled: a, exact: v } = e || {}, _ = ue.useRef(i);
  _.current = i, fn({
    disabled: a,
    subject: r._subjects.values,
    next: (P) => {
      hi(_.current, P.name, v) && T(ze(mi(_.current, r._names, P.values || r._formValues, !1, s)));
    }
  });
  const [D, T] = ue.useState(r._getWatch(i, s));
  return ue.useEffect(() => r._removeUnmounted()), D;
}
var dn = (e) => /^\w*$/.test(e), vi = (e) => dr(e.replace(/["|']|\]/g, "").split(/\.|\[/)), ae = (e, t, r) => {
  let i = -1;
  const s = dn(t) ? [t] : vi(t), a = s.length, v = a - 1;
  for (; ++i < a; ) {
    const _ = s[i];
    let D = r;
    if (i !== v) {
      const T = e[_];
      D = De(T) || Array.isArray(T) ? T : isNaN(+s[i + 1]) ? {} : [];
    }
    e[_] = D, e = e[_];
  }
  return e;
};
function Es(e) {
  const t = Kt(), { name: r, disabled: i, control: s = t.control, shouldUnregister: a } = e, v = ci(s._names.array, r), _ = _s({
    control: s,
    name: r,
    defaultValue: S(s._formValues, r, S(s._defaultValues, r, e.defaultValue)),
    exact: !0
  }), D = gs({
    control: s,
    name: r
  }), T = ue.useRef(s.register(r, {
    ...e.rules,
    value: _,
    ...Qe(e.disabled) ? { disabled: e.disabled } : {}
  }));
  return ue.useEffect(() => {
    const P = s._options.shouldUnregister || a, R = (ie, se) => {
      const W = S(s._fields, ie);
      W && (W._f.mount = se);
    };
    if (R(r, !0), P) {
      const ie = ze(S(s._options.defaultValues, r));
      ae(s._defaultValues, r, ie), Ce(S(s._formValues, r)) && ae(s._formValues, r, ie);
    }
    return () => {
      (v ? P && !s._state.action : P) ? s.unregister(r) : R(r, !1);
    };
  }, [r, s, v, a]), ue.useEffect(() => {
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
      ...Qe(i) || D.disabled ? { disabled: D.disabled || i } : {},
      onChange: ue.useCallback((P) => T.current.onChange({
        target: {
          value: ui(P),
          name: r
        },
        type: Vr.CHANGE
      }), [r]),
      onBlur: ue.useCallback(() => T.current.onBlur({
        target: {
          value: S(s._formValues, r),
          name: r
        },
        type: Vr.BLUR
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
const ws = (e) => e.render(Es(e));
var xs = (e, t, r, i, s) => t ? {
  ...r[e],
  types: {
    ...r[e] && r[e].types ? r[e].types : {},
    [i]: s || !0
  }
} : {}, Gn = (e) => ({
  isOnSubmit: !e || e === et.onSubmit,
  isOnBlur: e === et.onBlur,
  isOnChange: e === et.onChange,
  isOnAll: e === et.all,
  isOnTouch: e === et.onTouched
}), Hn = (e, t, r) => !r && (t.watchAll || t.watch.has(e) || [...t.watch].some((i) => e.startsWith(i) && /^\.\w+/.test(e.slice(i.length))));
const or = (e, t, r, i) => {
  for (const s of r || Object.keys(e)) {
    const a = S(e, s);
    if (a) {
      const { _f: v, ..._ } = a;
      if (v) {
        if (v.refs && v.refs[0] && t(v.refs[0], s) && !i)
          break;
        if (v.ref && t(v.ref, v.name) && !i)
          break;
        or(_, t);
      } else De(_) && or(_, t);
    }
  }
};
var Ss = (e, t, r) => {
  const i = dr(S(e, r));
  return ae(i, "root", t[r]), ae(e, r, i), e;
}, hn = (e) => e.type === "file", St = (e) => typeof e == "function", Or = (e) => {
  if (!ln)
    return !1;
  const t = e ? e.ownerDocument : 0;
  return e instanceof (t && t.defaultView ? t.defaultView.HTMLElement : HTMLElement);
}, Dr = (e) => at(e), mn = (e) => e.type === "radio", Tr = (e) => e instanceof RegExp;
const Jn = {
  value: !1,
  isValid: !1
}, Kn = { value: !0, isValid: !0 };
var yi = (e) => {
  if (Array.isArray(e)) {
    if (e.length > 1) {
      const t = e.filter((r) => r && r.checked && !r.disabled).map((r) => r.value);
      return { value: t, isValid: !!t.length };
    }
    return e[0].checked && !e[0].disabled ? (
      // @ts-expect-error expected to work in the browser
      e[0].attributes && !Ce(e[0].attributes.value) ? Ce(e[0].value) || e[0].value === "" ? Kn : { value: e[0].value, isValid: !0 } : Kn
    ) : Jn;
  }
  return Jn;
};
const Zn = {
  isValid: !1,
  value: null
};
var pi = (e) => Array.isArray(e) ? e.reduce((t, r) => r && r.checked && !r.disabled ? {
  isValid: !0,
  value: r.value
} : t, Zn) : Zn;
function Xn(e, t, r = "validate") {
  if (Dr(e) || Array.isArray(e) && e.every(Dr) || Qe(e) && !e)
    return {
      type: r,
      message: Dr(e) ? e : "",
      ref: t
    };
}
var Gt = (e) => De(e) && !Tr(e) ? e : {
  value: e,
  message: ""
}, Qn = async (e, t, r, i, s) => {
  const { ref: a, refs: v, required: _, maxLength: D, minLength: T, min: P, max: R, pattern: ie, validate: se, name: W, valueAsNumber: We, mount: ye, disabled: fe } = e._f, A = S(t, W);
  if (!ye || fe)
    return {};
  const Ae = v ? v[0] : a, Re = (U) => {
    i && Ae.reportValidity && (Ae.setCustomValidity(Qe(U) ? "" : U || ""), Ae.reportValidity());
  }, $ = {}, Ee = mn(a), Ue = fr(a), Ve = Ee || Ue, Be = (We || hn(a)) && Ce(a.value) && Ce(A) || Or(a) && a.value === "" || A === "" || Array.isArray(A) && !A.length, Pe = xs.bind(null, W, r, $), rt = (U, F, J, K = dt.maxLength, pe = dt.minLength) => {
    const j = U ? F : J;
    $[W] = {
      type: U ? K : pe,
      message: j,
      ref: a,
      ...Pe(U ? K : pe, j)
    };
  };
  if (s ? !Array.isArray(A) || !A.length : _ && (!Ve && (Be || $e(A)) || Qe(A) && !A || Ue && !yi(v).isValid || Ee && !pi(v).isValid)) {
    const { value: U, message: F } = Dr(_) ? { value: !!_, message: _ } : Gt(_);
    if (U && ($[W] = {
      type: dt.required,
      message: F,
      ref: Ae,
      ...Pe(dt.required, F)
    }, !r))
      return Re(F), $;
  }
  if (!Be && (!$e(P) || !$e(R))) {
    let U, F;
    const J = Gt(R), K = Gt(P);
    if (!$e(A) && !isNaN(A)) {
      const pe = a.valueAsNumber || A && +A;
      $e(J.value) || (U = pe > J.value), $e(K.value) || (F = pe < K.value);
    } else {
      const pe = a.valueAsDate || new Date(A), j = (Le) => /* @__PURE__ */ new Date((/* @__PURE__ */ new Date()).toDateString() + " " + Le), Fe = a.type == "time", qe = a.type == "week";
      at(J.value) && A && (U = Fe ? j(A) > j(J.value) : qe ? A > J.value : pe > new Date(J.value)), at(K.value) && A && (F = Fe ? j(A) < j(K.value) : qe ? A < K.value : pe < new Date(K.value));
    }
    if ((U || F) && (rt(!!U, J.message, K.message, dt.max, dt.min), !r))
      return Re($[W].message), $;
  }
  if ((D || T) && !Be && (at(A) || s && Array.isArray(A))) {
    const U = Gt(D), F = Gt(T), J = !$e(U.value) && A.length > +U.value, K = !$e(F.value) && A.length < +F.value;
    if ((J || K) && (rt(J, U.message, F.message), !r))
      return Re($[W].message), $;
  }
  if (ie && !Be && at(A)) {
    const { value: U, message: F } = Gt(ie);
    if (Tr(U) && !A.match(U) && ($[W] = {
      type: dt.pattern,
      message: F,
      ref: a,
      ...Pe(dt.pattern, F)
    }, !r))
      return Re(F), $;
  }
  if (se) {
    if (St(se)) {
      const U = await se(A, t), F = Xn(U, Ae);
      if (F && ($[W] = {
        ...F,
        ...Pe(dt.validate, F.message)
      }, !r))
        return Re(F.message), $;
    } else if (De(se)) {
      let U = {};
      for (const F in se) {
        if (!Ge(U) && !r)
          break;
        const J = Xn(await se[F](A, t), Ae, F);
        J && (U = {
          ...J,
          ...Pe(F, J.message)
        }, Re(J.message), r && ($[W] = U));
      }
      if (!Ge(U) && ($[W] = {
        ref: Ae,
        ...U
      }, !r))
        return $;
    }
  }
  return Re(!0), $;
};
function Cs(e, t) {
  const r = t.slice(0, -1).length;
  let i = 0;
  for (; i < r; )
    e = Ce(e) ? i++ : e[t[i++]];
  return e;
}
function Rs(e) {
  for (const t in e)
    if (e.hasOwnProperty(t) && !Ce(e[t]))
      return !1;
  return !0;
}
function Ne(e, t) {
  const r = Array.isArray(t) ? t : dn(t) ? [t] : vi(t), i = r.length === 1 ? e : Cs(e, r), s = r.length - 1, a = r[s];
  return i && delete i[a], s !== 0 && (De(i) && Ge(i) || Array.isArray(i) && Rs(i)) && Ne(e, r.slice(0, -1)), e;
}
var tn = () => {
  let e = [];
  return {
    get observers() {
      return e;
    },
    next: (s) => {
      for (const a of e)
        a.next && a.next(s);
    },
    subscribe: (s) => (e.push(s), {
      unsubscribe: () => {
        e = e.filter((a) => a !== s);
      }
    }),
    unsubscribe: () => {
      e = [];
    }
  };
}, Fr = (e) => $e(e) || !ai(e);
function Dt(e, t) {
  if (Fr(e) || Fr(t))
    return e === t;
  if (Ht(e) && Ht(t))
    return e.getTime() === t.getTime();
  const r = Object.keys(e), i = Object.keys(t);
  if (r.length !== i.length)
    return !1;
  for (const s of r) {
    const a = e[s];
    if (!i.includes(s))
      return !1;
    if (s !== "ref") {
      const v = t[s];
      if (Ht(a) && Ht(v) || De(a) && De(v) || Array.isArray(a) && Array.isArray(v) ? !Dt(a, v) : a !== v)
        return !1;
    }
  }
  return !0;
}
var bi = (e) => e.type === "select-multiple", js = (e) => mn(e) || fr(e), rn = (e) => Or(e) && e.isConnected, gi = (e) => {
  for (const t in e)
    if (St(e[t]))
      return !0;
  return !1;
};
function Ir(e, t = {}) {
  const r = Array.isArray(e);
  if (De(e) || r)
    for (const i in e)
      Array.isArray(e[i]) || De(e[i]) && !gi(e[i]) ? (t[i] = Array.isArray(e[i]) ? [] : {}, Ir(e[i], t[i])) : $e(e[i]) || (t[i] = !0);
  return t;
}
function _i(e, t, r) {
  const i = Array.isArray(e);
  if (De(e) || i)
    for (const s in e)
      Array.isArray(e[s]) || De(e[s]) && !gi(e[s]) ? Ce(t) || Fr(r[s]) ? r[s] = Array.isArray(e[s]) ? Ir(e[s], []) : { ...Ir(e[s]) } : _i(e[s], $e(t) ? {} : t[s], r[s]) : r[s] = !Dt(e[s], t[s]);
  return r;
}
var Pr = (e, t) => _i(e, t, Ir(t)), Ei = (e, { valueAsNumber: t, valueAsDate: r, setValueAs: i }) => Ce(e) ? e : t ? e === "" ? NaN : e && +e : r && at(e) ? new Date(e) : i ? i(e) : e;
function nn(e) {
  const t = e.ref;
  if (!(e.refs ? e.refs.every((r) => r.disabled) : t.disabled))
    return hn(t) ? t.files : mn(t) ? pi(e.refs).value : bi(t) ? [...t.selectedOptions].map(({ value: r }) => r) : fr(t) ? yi(e.refs).value : Ei(Ce(t.value) ? e.ref.value : t.value, e);
}
var Ps = (e, t, r, i) => {
  const s = {};
  for (const a of e) {
    const v = S(t, a);
    v && ae(s, a, v._f);
  }
  return {
    criteriaMode: r,
    names: [...e],
    fields: s,
    shouldUseNativeValidation: i
  };
}, nr = (e) => Ce(e) ? e : Tr(e) ? e.source : De(e) ? Tr(e.value) ? e.value.source : e.value : e, ks = (e) => e.mount && (e.required || e.min || e.max || e.maxLength || e.minLength || e.pattern || e.validate);
function ei(e, t, r) {
  const i = S(e, r);
  if (i || dn(r))
    return {
      error: i,
      name: r
    };
  const s = r.split(".");
  for (; s.length; ) {
    const a = s.join("."), v = S(t, a), _ = S(e, a);
    if (v && !Array.isArray(v) && r !== a)
      return { name: r };
    if (_ && _.type)
      return {
        name: a,
        error: _
      };
    s.pop();
  }
  return {
    name: r
  };
}
var Ns = (e, t, r, i, s) => s.isOnAll ? !1 : !r && s.isOnTouch ? !(t || e) : (r ? i.isOnBlur : s.isOnBlur) ? !e : (r ? i.isOnChange : s.isOnChange) ? e : !0, Ds = (e, t) => !dr(S(e, t)).length && Ne(e, t);
const As = {
  mode: et.onSubmit,
  reValidateMode: et.onChange,
  shouldFocusError: !0
};
function Vs(e = {}) {
  let t = {
    ...As,
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
  }, i = {}, s = De(t.defaultValues) || De(t.values) ? ze(t.defaultValues || t.values) || {} : {}, a = t.shouldUnregister ? {} : ze(s), v = {
    action: !1,
    mount: !1,
    watch: !1
  }, _ = {
    mount: /* @__PURE__ */ new Set(),
    unMount: /* @__PURE__ */ new Set(),
    array: /* @__PURE__ */ new Set(),
    watch: /* @__PURE__ */ new Set()
  }, D, T = 0;
  const P = {
    isDirty: !1,
    dirtyFields: !1,
    validatingFields: !1,
    touchedFields: !1,
    isValidating: !1,
    isValid: !1,
    errors: !1
  }, R = {
    values: tn(),
    array: tn(),
    state: tn()
  }, ie = Gn(t.mode), se = Gn(t.reValidateMode), W = t.criteriaMode === et.all, We = (c) => (f) => {
    clearTimeout(T), T = setTimeout(c, f);
  }, ye = async (c) => {
    if (P.isValid || c) {
      const f = t.resolver ? Ge((await Ve()).errors) : await Pe(i, !0);
      f !== r.isValid && R.state.next({
        isValid: f
      });
    }
  }, fe = (c, f) => {
    (P.isValidating || P.validatingFields) && ((c || Array.from(_.mount)).forEach((h) => {
      h && (f ? ae(r.validatingFields, h, f) : Ne(r.validatingFields, h));
    }), R.state.next({
      validatingFields: r.validatingFields,
      isValidating: !Ge(r.validatingFields)
    }));
  }, A = (c, f = [], h, x, w = !0, g = !0) => {
    if (x && h) {
      if (v.action = !0, g && Array.isArray(S(i, c))) {
        const N = h(S(i, c), x.argA, x.argB);
        w && ae(i, c, N);
      }
      if (g && Array.isArray(S(r.errors, c))) {
        const N = h(S(r.errors, c), x.argA, x.argB);
        w && ae(r.errors, c, N), Ds(r.errors, c);
      }
      if (P.touchedFields && g && Array.isArray(S(r.touchedFields, c))) {
        const N = h(S(r.touchedFields, c), x.argA, x.argB);
        w && ae(r.touchedFields, c, N);
      }
      P.dirtyFields && (r.dirtyFields = Pr(s, a)), R.state.next({
        name: c,
        isDirty: U(c, f),
        dirtyFields: r.dirtyFields,
        errors: r.errors,
        isValid: r.isValid
      });
    } else
      ae(a, c, f);
  }, Ae = (c, f) => {
    ae(r.errors, c, f), R.state.next({
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
      const g = S(a, c, Ce(h) ? S(s, c) : h);
      Ce(g) || x && x.defaultChecked || f ? ae(a, c, f ? g : nn(w._f)) : K(c, g), v.mount && ye();
    }
  }, Ee = (c, f, h, x, w) => {
    let g = !1, N = !1;
    const G = {
      name: c
    }, de = !!(S(i, c) && S(i, c)._f.disabled);
    if (!h || x) {
      P.isDirty && (N = r.isDirty, r.isDirty = G.isDirty = U(), g = N !== G.isDirty);
      const xe = de || Dt(S(s, c), f);
      N = !!(!de && S(r.dirtyFields, c)), xe || de ? Ne(r.dirtyFields, c) : ae(r.dirtyFields, c, !0), G.dirtyFields = r.dirtyFields, g = g || P.dirtyFields && N !== !xe;
    }
    if (h) {
      const xe = S(r.touchedFields, c);
      xe || (ae(r.touchedFields, c, h), G.touchedFields = r.touchedFields, g = g || P.touchedFields && xe !== h);
    }
    return g && w && R.state.next(G), g ? G : {};
  }, Ue = (c, f, h, x) => {
    const w = S(r.errors, c), g = P.isValid && Qe(f) && r.isValid !== f;
    if (e.delayError && h ? (D = We(() => Ae(c, h)), D(e.delayError)) : (clearTimeout(T), D = null, h ? ae(r.errors, c, h) : Ne(r.errors, c)), (h ? !Dt(w, h) : w) || !Ge(x) || g) {
      const N = {
        ...x,
        ...g && Qe(f) ? { isValid: f } : {},
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
    const f = await t.resolver(a, t.context, Ps(c || _.mount, i, t.criteriaMode, t.shouldUseNativeValidation));
    return fe(c), f;
  }, Be = async (c) => {
    const { errors: f } = await Ve(c);
    if (c)
      for (const h of c) {
        const x = S(f, h);
        x ? ae(r.errors, h, x) : Ne(r.errors, h);
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
          const de = await Qn(w, a, W, t.shouldUseNativeValidation && !f, G);
          if (fe([x]), de[g.name] && (h.valid = !1, f))
            break;
          !f && (S(de, g.name) ? G ? Ss(r.errors, de, g.name) : ae(r.errors, g.name, de[g.name]) : Ne(r.errors, g.name));
        }
        N && await Pe(N, f, h);
      }
    }
    return h.valid;
  }, rt = () => {
    for (const c of _.unMount) {
      const f = S(i, c);
      f && (f._f.refs ? f._f.refs.every((h) => !rn(h)) : !rn(f._f.ref)) && re(c);
    }
    _.unMount = /* @__PURE__ */ new Set();
  }, U = (c, f) => (c && f && ae(a, c, f), !Dt(l(), s)), F = (c, f, h) => mi(c, _, {
    ...v.mount ? a : Ce(f) ? s : at(c) ? { [c]: f } : f
  }, h, f), J = (c) => dr(S(v.mount ? a : s, c, e.shouldUnregister ? S(s, c, []) : [])), K = (c, f, h = {}) => {
    const x = S(i, c);
    let w = f;
    if (x) {
      const g = x._f;
      g && (!g.disabled && ae(a, c, Ei(f, g)), w = Or(g.ref) && $e(f) ? "" : f, bi(g.ref) ? [...g.ref.options].forEach((N) => N.selected = w.includes(N.value)) : g.refs ? fr(g.ref) ? g.refs.length > 1 ? g.refs.forEach((N) => (!N.defaultChecked || !N.disabled) && (N.checked = Array.isArray(w) ? !!w.find((G) => G === N.value) : w === N.value)) : g.refs[0] && (g.refs[0].checked = !!w) : g.refs.forEach((N) => N.checked = N.value === w) : hn(g.ref) ? g.ref.value = "" : (g.ref.value = w, g.ref.type || R.values.next({
        name: c,
        values: { ...a }
      })));
    }
    (h.shouldDirty || h.shouldTouch) && Ee(c, w, h.shouldTouch, h.shouldDirty, !0), h.shouldValidate && Le(c);
  }, pe = (c, f, h) => {
    for (const x in f) {
      const w = f[x], g = `${c}.${x}`, N = S(i, g);
      (_.array.has(c) || !Fr(w) || N && !N._f) && !Ht(w) ? pe(g, w, h) : K(g, w, h);
    }
  }, j = (c, f, h = {}) => {
    const x = S(i, c), w = _.array.has(c), g = ze(f);
    ae(a, c, g), w ? (R.array.next({
      name: c,
      values: { ...a }
    }), (P.isDirty || P.dirtyFields) && h.shouldDirty && R.state.next({
      name: c,
      dirtyFields: Pr(s, a),
      isDirty: U(c, g)
    })) : x && !x._f && !$e(g) ? pe(c, g, h) : K(c, g, h), Hn(c, _) && R.state.next({ ...r }), R.values.next({
      name: v.mount ? c : void 0,
      values: { ...a }
    });
  }, Fe = async (c) => {
    v.mount = !0;
    const f = c.target;
    let h = f.name, x = !0;
    const w = S(i, h), g = () => f.type ? nn(w._f) : ui(c), N = (G) => {
      x = Number.isNaN(G) || G === S(a, h, G);
    };
    if (w) {
      let G, de;
      const xe = g(), nt = c.type === Vr.BLUR || c.type === Vr.FOCUS_OUT, Wt = !ks(w._f) && !t.resolver && !S(r.errors, h) && !w._f.deps || Ns(nt, S(r.touchedFields, h), r.isSubmitted, se, ie), pt = Hn(h, _, nt);
      ae(a, h, xe), nt ? (w._f.onBlur && w._f.onBlur(c), D && D(0)) : w._f.onChange && w._f.onChange(c);
      const He = Ee(h, xe, nt, !1), Zt = !Ge(He) || pt;
      if (!nt && R.values.next({
        name: h,
        type: c.type,
        values: { ...a }
      }), Wt)
        return P.isValid && ye(), Zt && R.state.next({ name: h, ...pt ? {} : He });
      if (!nt && pt && R.state.next({ ...r }), t.resolver) {
        const { errors: Bt } = await Ve([h]);
        if (N(xe), x) {
          const Xt = ei(r.errors, i, h), Je = ei(Bt, i, Xt.name || h);
          G = Je.error, h = Je.name, de = Ge(Bt);
        }
      } else
        fe([h], !0), G = (await Qn(w, a, W, t.shouldUseNativeValidation))[h], fe([h]), N(xe), x && (G ? de = !1 : P.isValid && (de = await Pe(i, !0)));
      x && (w._f.deps && Le(w._f.deps), Ue(h, de, G, He));
    }
  }, qe = (c, f) => {
    if (S(r.errors, f) && c.focus)
      return c.focus(), 1;
  }, Le = async (c, f = {}) => {
    let h, x;
    const w = Nr(c);
    if (t.resolver) {
      const g = await Be(Ce(c) ? c : w);
      h = Ge(g), x = c ? !w.some((N) => S(g, N)) : h;
    } else c ? (x = (await Promise.all(w.map(async (g) => {
      const N = S(i, g);
      return await Pe(N && N._f ? { [g]: N } : N);
    }))).every(Boolean), !(!x && !r.isValid) && ye()) : x = h = await Pe(i);
    return R.state.next({
      ...!at(c) || P.isValid && h !== r.isValid ? {} : { name: c },
      ...t.resolver || !c ? { isValid: h } : {},
      errors: r.errors
    }), f.shouldFocus && !x && or(i, qe, c ? w : _.mount), x;
  }, l = (c) => {
    const f = {
      ...s,
      ...v.mount ? a : {}
    };
    return Ce(c) ? f : at(c) ? S(f, c) : c.map((h) => S(f, h));
  }, b = (c, f) => ({
    invalid: !!S((f || r).errors, c),
    isDirty: !!S((f || r).dirtyFields, c),
    isTouched: !!S((f || r).touchedFields, c),
    isValidating: !!S((f || r).validatingFields, c),
    error: S((f || r).errors, c)
  }), B = (c) => {
    c && Nr(c).forEach((f) => Ne(r.errors, f)), R.state.next({
      errors: c ? r.errors : {}
    });
  }, Y = (c, f, h) => {
    const x = (S(i, c, { _f: {} })._f || {}).ref;
    ae(r.errors, c, {
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
    for (const h of c ? Nr(c) : _.mount)
      _.mount.delete(h), _.array.delete(h), f.keepValue || (Ne(i, h), Ne(a, h)), !f.keepError && Ne(r.errors, h), !f.keepDirty && Ne(r.dirtyFields, h), !f.keepTouched && Ne(r.touchedFields, h), !f.keepIsValidating && Ne(r.validatingFields, h), !t.shouldUnregister && !f.keepDefaultValue && Ne(s, h);
    R.values.next({
      values: { ...a }
    }), R.state.next({
      ...r,
      ...f.keepDirty ? { isDirty: U() } : {}
    }), !f.keepIsValid && ye();
  }, ne = ({ disabled: c, name: f, field: h, fields: x, value: w }) => {
    if (Qe(c)) {
      const g = c ? void 0 : Ce(w) ? nn(h ? h._f : S(x, f)._f) : w;
      ae(a, f, g), Ee(f, g, !1, !1, !0);
    }
  }, ee = (c, f = {}) => {
    let h = S(i, c);
    const x = Qe(f.disabled);
    return ae(i, c, {
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
        min: nr(f.min),
        max: nr(f.max),
        minLength: nr(f.minLength),
        maxLength: nr(f.maxLength),
        pattern: nr(f.pattern)
      } : {},
      name: c,
      onChange: Fe,
      onBlur: Fe,
      ref: (w) => {
        if (w) {
          ee(c, f), h = S(i, c);
          const g = Ce(w.value) && w.querySelectorAll && w.querySelectorAll("input,select,textarea")[0] || w, N = js(g), G = h._f.refs || [];
          if (N ? G.find((de) => de === g) : g === h._f.ref)
            return;
          ae(i, c, {
            _f: {
              ...h._f,
              ...N ? {
                refs: [
                  ...G.filter(rn),
                  g,
                  ...Array.isArray(S(s, c)) ? [{}] : []
                ],
                ref: { type: g.type, name: c }
              } : { ref: g }
            }
          }), $(c, !1, void 0, g);
        } else
          h = S(i, c, {}), h._f && (h._f.mount = !1), (t.shouldUnregister || f.shouldUnregister) && !(ci(_.array, c) && v.action) && _.unMount.add(c);
      }
    };
  }, te = () => t.shouldFocusError && or(i, qe, _.mount), we = (c) => {
    Qe(c) && (R.state.next({ disabled: c }), or(i, (f, h) => {
      let x = c;
      const w = S(i, h);
      w && Qe(w._f.disabled) && (x || (x = w._f.disabled)), f.disabled = x;
    }, 0, !1));
  }, Lt = (c, f) => async (h) => {
    let x;
    h && (h.preventDefault && h.preventDefault(), h.persist && h.persist());
    let w = ze(a);
    if (R.state.next({
      isSubmitting: !0
    }), t.resolver) {
      const { errors: g, values: N } = await Ve();
      r.errors = g, w = N;
    } else
      await Pe(i);
    if (Ne(r.errors, "root"), Ge(r.errors)) {
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
      isSubmitSuccessful: Ge(r.errors) && !x,
      submitCount: r.submitCount + 1,
      errors: r.errors
    }), x)
      throw x;
  }, Mt = (c, f = {}) => {
    S(i, c) && (Ce(f.defaultValue) ? j(c, ze(S(s, c))) : (j(c, f.defaultValue), ae(s, c, ze(f.defaultValue))), f.keepTouched || Ne(r.touchedFields, c), f.keepDirty || (Ne(r.dirtyFields, c), r.isDirty = f.defaultValue ? U(c, ze(S(s, c))) : U()), f.keepError || (Ne(r.errors, c), P.isValid && ye()), R.state.next({ ...r }));
  }, ut = (c, f = {}) => {
    const h = c ? ze(c) : s, x = ze(h), w = Ge(c), g = w ? s : x;
    if (f.keepDefaultValues || (s = h), !f.keepValues) {
      if (f.keepDirtyValues)
        for (const N of _.mount)
          S(r.dirtyFields, N) ? ae(g, N, S(a, N)) : j(N, S(g, N));
      else {
        if (ln && Ce(c))
          for (const N of _.mount) {
            const G = S(i, N);
            if (G && G._f) {
              const de = Array.isArray(G._f.refs) ? G._f.refs[0] : G._f.ref;
              if (Or(de)) {
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
      a = e.shouldUnregister ? f.keepDefaultValues ? ze(s) : {} : ze(g), R.array.next({
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
      dirtyFields: w ? [] : f.keepDirtyValues ? f.keepDefaultValues && a ? Pr(s, a) : r.dirtyFields : f.keepDefaultValues && c ? Pr(s, c) : {},
      touchedFields: f.keepTouched ? r.touchedFields : {},
      errors: f.keepErrors ? r.errors : {},
      isSubmitSuccessful: f.keepIsSubmitSuccessful ? r.isSubmitSuccessful : !1,
      isSubmitting: !1
    });
  }, $t = (c, f) => ut(St(c) ? c(a) : c, f);
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
      _removeUnmounted: rt,
      _updateFieldArray: A,
      _updateDisabledField: ne,
      _getFieldArray: J,
      _reset: ut,
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
        return a;
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
function Os(e = {}) {
  const t = ue.useRef(), r = ue.useRef(), [i, s] = ue.useState({
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
    ...Vs(e),
    formState: i
  });
  const a = t.current.control;
  return a._options = e, fn({
    subject: a._subjects.state,
    next: (v) => {
      di(v, a._proxyFormState, a._updateFormState, !0) && s({ ...a._formState });
    }
  }), ue.useEffect(() => a._disableForm(e.disabled), [a, e.disabled]), ue.useEffect(() => {
    if (a._proxyFormState.isDirty) {
      const v = a._getDirty();
      v !== i.isDirty && a._subjects.state.next({
        isDirty: v
      });
    }
  }, [a, i.isDirty]), ue.useEffect(() => {
    e.values && !Dt(e.values, r.current) ? (a._reset(e.values, a._options.resetOptions), r.current = e.values, s((v) => ({ ...v }))) : a._resetDefaultValues();
  }, [e.values, a]), ue.useEffect(() => {
    e.errors && a._setErrors(e.errors);
  }, [e.errors, a]), ue.useEffect(() => {
    a._state.mount || (a._updateValid(), a._state.mount = !0), a._state.watch && (a._state.watch = !1, a._subjects.state.next({ ...a._formState })), a._removeUnmounted();
  }), ue.useEffect(() => {
    e.shouldUnregister && a._subjects.values.next({
      values: a._getWatch()
    });
  }, [e.shouldUnregister, a]), t.current.formState = fi(i, a), t.current;
}
const un = (e) => {
  const {
    name: t,
    placeholder: r,
    label: i = e.name,
    className: s = "vh-mt-3",
    required: a = !1,
    pattern: v,
    patternMessage: _
  } = e, { register: D } = Kt(), T = je.useMemo(() => {
    if (v)
      return { value: v, message: _ || "Invalid pattern" };
  }, [v, _]);
  return /* @__PURE__ */ I.jsxDEV("div", { className: Rt("varhub-parameter-input", s), children: [
    /* @__PURE__ */ I.jsxDEV("input", { placeholder: r, type: "text", required: a, ...D(t, { shouldUnregister: !0, required: a, pattern: T }) }, void 0, !1, {
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
}, Ts = ({ direction: e }) => /* @__PURE__ */ I.jsxDEV("i", { className: Rt("vh-arrow", e) }, void 0, !1, {
  fileName: "D:/Projects/js/varhub-ui-kit/src/components/icon/ArrowIcon.tsx",
  lineNumber: 13,
  columnNumber: 9
}, void 0), Fs = ({ children: e }) => {
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
          children: /* @__PURE__ */ I.jsxDEV(Ts, { direction: "down" }, void 0, !1, {
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
}, ti = (e) => {
  const {
    children: t,
    htmlType: r,
    type: i = "primary",
    className: s,
    onClick: a,
    disabled: v,
    ..._
  } = e, D = (T) => {
    v || a?.(T);
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
}, wi = (e) => {
  const {
    name: t,
    placeholder: r,
    label: i = e.name,
    className: s = "vh-mt-3",
    min: a,
    max: v,
    required: _ = !1
  } = e, { register: D } = Kt(), T = je.useCallback((P) => {
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
        min: a,
        max: v,
        ...D(t, { min: a, max: v, shouldUnregister: !0, required: _, setValueAs: T })
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
var xi = {}, vn = {};
Object.defineProperty(vn, "__esModule", { value: !0 });
var ri = je, Is = typeof document < "u" ? ri.useLayoutEffect : ri.useEffect;
vn.default = Is;
var Us = Ct && Ct.__createBinding || (Object.create ? function(e, t, r, i) {
  i === void 0 && (i = r);
  var s = Object.getOwnPropertyDescriptor(t, r);
  (!s || ("get" in s ? !t.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
    return t[r];
  } }), Object.defineProperty(e, i, s);
} : function(e, t, r, i) {
  i === void 0 && (i = r), e[i] = t[r];
}), Ls = Ct && Ct.__setModuleDefault || (Object.create ? function(e, t) {
  Object.defineProperty(e, "default", { enumerable: !0, value: t });
} : function(e, t) {
  e.default = t;
}), Ms = Ct && Ct.__importStar || function(e) {
  if (e && e.__esModule) return e;
  var t = {};
  if (e != null) for (var r in e) r !== "default" && Object.prototype.hasOwnProperty.call(e, r) && Us(t, e, r);
  return Ls(t, e), t;
}, $s = Ct && Ct.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(xi, "__esModule", { value: !0 });
var ni = Ms(je), Ws = $s(vn);
function Bs(e) {
  var t = ni.useRef(e), r = ni.useRef(function() {
    for (var s = [], a = 0; a < arguments.length; a++)
      s[a] = arguments[a];
    return t.current.apply(this, s);
  }).current;
  return (0, Ws.default)(function() {
    t.current = e;
  }), r;
}
var Ys = xi.default = Bs;
const zs = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g, qs = (e) => {
  const { children: t, initialParams: r, className: i, error: s, darkMode: a, onEnter: v, abortController: _ } = e, [D, T] = je.useState(r?.roomId !== void 0), P = je.useCallback(() => T((W) => !W), [T]), R = Os({
    defaultValues: r,
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    shouldUseNativeValidation: !0,
    delayError: 500,
    shouldFocusError: !1
  }), ie = Ys(async (W) => {
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
  const se = /* @__PURE__ */ I.jsxDEV(I.Fragment, { children: [
    /* @__PURE__ */ I.jsxDEV(ti, { htmlType: "submit", disabled: _ != null, children: D ? "Join room" : "Create room" }, void 0, !1, {
      fileName: "D:/Projects/js/varhub-ui-kit/src/components/VarhubEnterPage.tsx",
      lineNumber: 69,
      columnNumber: 13
    }, void 0),
    /* @__PURE__ */ I.jsxDEV(
      ti,
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
  return /* @__PURE__ */ I.jsxDEV("div", { className: Rt("varhub-page", i, { "dark-mode": a }), children: /* @__PURE__ */ I.jsxDEV(
    "form",
    {
      className: "varhub-form",
      onSubmit: R.handleSubmit(ie),
      children: /* @__PURE__ */ I.jsxDEV(vs, { title: "SpyFall", actions: se, loading: _ != null, error: s, children: /* @__PURE__ */ I.jsxDEV(bs, { ...R, children: [
        /* @__PURE__ */ I.jsxDEV(
          un,
          {
            required: !0,
            className: "vh-mt-2",
            name: "serverUrl",
            label: "Varhub server URL",
            pattern: zs,
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
        /* @__PURE__ */ I.jsxDEV(un, { required: !0, className: "vh-mt-3", name: "playerName", label: "Player name" }, void 0, !1, {
          fileName: "D:/Projects/js/varhub-ui-kit/src/components/VarhubEnterPage.tsx",
          lineNumber: 100,
          columnNumber: 25
        }, void 0),
        D && /* @__PURE__ */ I.jsxDEV(wi, { required: !0, min: 0, className: "vh-mt-3", name: "roomId", label: "Room ID" }, void 0, !1, {
          fileName: "D:/Projects/js/varhub-ui-kit/src/components/VarhubEnterPage.tsx",
          lineNumber: 101,
          columnNumber: 38
        }, void 0),
        t && !D && /* @__PURE__ */ I.jsxDEV(Fs, { children: t }, void 0, !1, {
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
}, yn = je.createContext(null), Ks = ({ children: e }) => {
  const [t, r] = je.useState(null), i = je.useMemo(() => ({ client: t, setClient: r }), [t, r]);
  return /* @__PURE__ */ I.jsxDEV(yn.Provider, { value: i, children: e }, void 0, !1, {
    fileName: "D:/Projects/js/varhub-ui-kit/src/context/VarhubGameClientContext.tsx",
    lineNumber: 17,
    columnNumber: 9
  }, void 0);
}, Zs = () => je.useContext(yn).client, Xs = (e) => {
  const { roomIntegrity: t, importRoomModule: r, onEnter: i, children: s, darkMode: a, initialParams: v } = e, _ = ls(v), [D, T] = je.useState(null), P = je.useContext(yn), [R, ie] = je.useState(null), se = je.useCallback(async (W) => {
    T(null);
    let We = null, ye;
    try {
      console.log("$$$", "CREATE CLIENT");
      const fe = await ss({
        ...W,
        roomIntegrity: t,
        importRoomModule: r
      });
      We = fe.client, ye = fe.roomId, i?.(We), P.setClient(We), as({
        ...W,
        roomId: ye,
        autoJoin: !0
      });
    } catch (fe) {
      const A = W.joinMode ? "connect to" : "create";
      T(`Error while trying to ${A} room`), console.error(fe);
    } finally {
      ie(null);
    }
  }, [i]);
  return /* @__PURE__ */ I.jsxDEV(
    qs,
    {
      darkMode: a,
      initialParams: _,
      onEnter: se,
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
}, Qs = (e) => /* @__PURE__ */ I.jsxDEV(un, { ...e, name: "settings." + e.name }, void 0, !1, {
  fileName: "D:/Projects/js/varhub-ui-kit/src/components/settings/SettingsInputParameter.tsx",
  lineNumber: 8,
  columnNumber: 9
}, void 0), eo = (e) => /* @__PURE__ */ I.jsxDEV(wi, { ...e, name: "settings." + e.name }, void 0, !1, {
  fileName: "D:/Projects/js/varhub-ui-kit/src/components/settings/SettingsNumberParameter.tsx",
  lineNumber: 8,
  columnNumber: 9
}, void 0), Gs = (e) => {
  const { value: t, onChange: r, className: i, children: s } = e, a = je.useCallback((v) => {
    r?.(v.target.checked);
  }, [r]);
  return /* @__PURE__ */ I.jsxDEV("label", { className: Rt("vh-toggle", i), children: [
    /* @__PURE__ */ I.jsxDEV("span", { className: "vh-toggle-label", children: s }, void 0, !1, {
      fileName: "D:/Projects/js/varhub-ui-kit/src/components/Switch/Switch.tsx",
      lineNumber: 21,
      columnNumber: 13
    }, void 0),
    /* @__PURE__ */ I.jsxDEV("input", { className: "vh-toggle-checkbox", checked: t, onChange: a, type: "checkbox" }, void 0, !1, {
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
}, Hs = (e) => {
  const {
    name: t,
    label: r = e.name,
    className: i = "vh-mt-3"
  } = e, { control: s, getValues: a } = Kt();
  return /* @__PURE__ */ I.jsxDEV(
    ws,
    {
      render: ({ field: v }) => /* @__PURE__ */ I.jsxDEV(Gs, { className: i, onChange: v.onChange, value: v.value, children: r }, void 0, !1, {
        fileName: "D:/Projects/js/varhub-ui-kit/src/components/parameter/VarhubSwitchParameter.tsx",
        lineNumber: 23,
        columnNumber: 34
      }, void 0),
      name: t,
      defaultValue: a(t) || !1,
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
}, to = (e) => /* @__PURE__ */ I.jsxDEV(Hs, { ...e, name: "settings." + e.name }, void 0, !1, {
  fileName: "D:/Projects/js/varhub-ui-kit/src/components/settings/SettingsSwitchParameter.tsx",
  lineNumber: 8,
  columnNumber: 9
}, void 0);
export {
  Qs as SettingsInputParameter,
  eo as SettingsNumberParameter,
  to as SettingsSwitchParameter,
  qs as VarhubEnterPage,
  yn as VarhubGameClientContext,
  Ks as VarhubGameClientProvider,
  Xs as VarhubSelfControlEnterPage,
  ss as createVarhubRoomAndClient,
  os as getVarhubEnterParams,
  as as saveVarhubEnterParams,
  Zs as useVarhubGameClient,
  ls as useVarhubInitialParams
};

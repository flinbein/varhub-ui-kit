import { Varhub as E } from "@flinbein/varhub-web-client";
import { useRef as I, useMemo as S, useState as v, useCallback as p, useEffect as A, createContext as U, useContext as V } from "react";
import { jsxDEV as n, Fragment as M } from "react/jsx-dev-runtime";
import h from "classnames";
import { useFormContext as k, useForm as z, FormProvider as Z, Controller as J } from "react-hook-form";
import R from "use-latest-callback";
async function L(e) {
  const {
    serverUrl: t,
    playerName: r,
    settings: a = {},
    importRoomModule: u,
    roomIntegrity: s,
    engine: i = "ivm",
    roomPublicMessage: l
  } = e;
  let o = e.roomId;
  const c = new E(t);
  if (!o) {
    const { integrity: b, module: f } = await u();
    o = (await c.createRoom(i, { module: f, integrity: b, config: a, message: l })).id;
  }
  const d = c.join(o, { params: [r], integrity: s });
  return { roomId: o, client: d, playerName: r };
}
const O = (e) => {
  const t = new URLSearchParams(location.search), r = JSON.parse(history?.state?.varhubEnterState || "{}"), a = t.get("serverUrl") ?? r.serverUrl ?? e.serverUrl ?? void 0, u = t.get("roomId") ?? r.roomId ?? void 0, s = r.playerName ?? void 0, i = r.settings ?? e.settings ?? {}, l = r.autoJoin ?? !1;
  return {
    serverUrl: a,
    roomId: u,
    playerName: s,
    autoJoin: l,
    settings: i
  };
}, T = (e) => {
  const t = new URL(location.href), r = { varhubEnterState: JSON.stringify(e || {}) };
  t.search = "", history.replaceState(r, "", t);
}, $ = (e) => I(O(e)).current, q = ({ size: e }) => /* @__PURE__ */ n("span", { className: "vh-loader", style: { height: e, width: e } }, void 0, !1, {
  fileName: "D:/Projects/js/varhub-ui-kit/src/components/Loader/Loader.tsx",
  lineNumber: 10,
  columnNumber: 9
}, void 0), F = (e) => {
  const { children: t, title: r, actions: a, loading: u, error: s } = e;
  return /* @__PURE__ */ n("div", { className: h("varhub-card"), children: [
    /* @__PURE__ */ n("div", { className: "varhub-card__content varhub-card__header", children: [
      /* @__PURE__ */ n("h2", { className: "varhub-card__header__text", children: r }, void 0, !1, {
        fileName: "D:/Projects/js/varhub-ui-kit/src/components/Card/Card.tsx",
        lineNumber: 20,
        columnNumber: 17
      }, void 0),
      u && /* @__PURE__ */ n(q, { size: 24 }, void 0, !1, {
        fileName: "D:/Projects/js/varhub-ui-kit/src/components/Card/Card.tsx",
        lineNumber: 21,
        columnNumber: 29
      }, void 0)
    ] }, void 0, !0, {
      fileName: "D:/Projects/js/varhub-ui-kit/src/components/Card/Card.tsx",
      lineNumber: 19,
      columnNumber: 13
    }, void 0),
    /* @__PURE__ */ n("div", { className: "varhub-card__content varhub-card__body", children: t }, void 0, !1, {
      fileName: "D:/Projects/js/varhub-ui-kit/src/components/Card/Card.tsx",
      lineNumber: 23,
      columnNumber: 13
    }, void 0),
    a && /* @__PURE__ */ n("div", { className: "varhub-card__content varhub-card__actions varhub-card__divider--top", children: a }, void 0, !1, {
      fileName: "D:/Projects/js/varhub-ui-kit/src/components/Card/Card.tsx",
      lineNumber: 28,
      columnNumber: 17
    }, void 0),
    s && /* @__PURE__ */ n("div", { className: "varhub-card__error varhub-card__content varhub-card__divider--top", children: s }, void 0, !1, {
      fileName: "D:/Projects/js/varhub-ui-kit/src/components/Card/Card.tsx",
      lineNumber: 34,
      columnNumber: 17
    }, void 0),
    /* @__PURE__ */ n("div", { className: "varhub-card__powered-by varhub-card__content varhub-card__divider--top", children: [
      "Powered by ",
      /* @__PURE__ */ n("a", { className: "varhub-card__link", href: "https://github.com/flinbein/varhub-web-server", children: "VarHub" }, void 0, !1, {
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
}, x = (e) => {
  const {
    name: t,
    placeholder: r,
    label: a = e.name,
    className: u = "vh-mt-3",
    required: s = !1,
    pattern: i,
    patternMessage: l
  } = e, { register: o } = k(), c = S(() => {
    if (i)
      return { value: i, message: l || "Invalid pattern" };
  }, [i, l]);
  return /* @__PURE__ */ n("div", { className: h("varhub-parameter-input", u), children: [
    /* @__PURE__ */ n("input", { placeholder: r, type: "text", required: s, ...o(t, { shouldUnregister: !0, required: s, pattern: c }) }, void 0, !1, {
      fileName: "D:/Projects/js/varhub-ui-kit/src/components/parameter/VarhubInputParameter.tsx",
      lineNumber: 36,
      columnNumber: 13
    }, void 0),
    /* @__PURE__ */ n("label", { children: a }, void 0, !1, {
      fileName: "D:/Projects/js/varhub-ui-kit/src/components/parameter/VarhubInputParameter.tsx",
      lineNumber: 37,
      columnNumber: 13
    }, void 0)
  ] }, void 0, !0, {
    fileName: "D:/Projects/js/varhub-ui-kit/src/components/parameter/VarhubInputParameter.tsx",
    lineNumber: 35,
    columnNumber: 9
  }, void 0);
}, G = ({ direction: e }) => /* @__PURE__ */ n("i", { className: h("vh-arrow", e) }, void 0, !1, {
  fileName: "D:/Projects/js/varhub-ui-kit/src/components/icon/ArrowIcon.tsx",
  lineNumber: 13,
  columnNumber: 9
}, void 0), B = ({ children: e }) => {
  const [t, r] = v(!1), a = p(() => {
    r((u) => !u);
  }, [r]);
  return /* @__PURE__ */ n("div", { className: "vh-settings-section varhub-card__divider--top", children: [
    /* @__PURE__ */ n("h5", { className: "vh-settings-section__title", children: [
      "Settings",
      /* @__PURE__ */ n(
        "a",
        {
          className: h("vh-settings-section__title__button", { reversed: t }),
          onClick: a,
          type: "button",
          children: /* @__PURE__ */ n(G, { direction: "down" }, void 0, !1, {
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
    /* @__PURE__ */ n("div", { className: `vh-settings-section__body ${t ? "shown" : "hidden"}`, children: e }, void 0, !1, {
      fileName: "D:/Projects/js/varhub-ui-kit/src/components/settings/SettingsSection.tsx",
      lineNumber: 27,
      columnNumber: 13
    }, void 0)
  ] }, void 0, !0, {
    fileName: "D:/Projects/js/varhub-ui-kit/src/components/settings/SettingsSection.tsx",
    lineNumber: 16,
    columnNumber: 9
  }, void 0);
}, D = (e) => {
  const {
    children: t,
    htmlType: r,
    type: a = "primary",
    className: u,
    onClick: s,
    disabled: i,
    ...l
  } = e;
  return /* @__PURE__ */ n(
    "button",
    {
      type: r,
      ...l,
      onClick: (c) => {
        i || s?.(c);
      },
      disabled: i,
      className: h("varhub-button", u, { [`type-${a}`]: a }),
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
}, _ = (e) => {
  const {
    name: t,
    placeholder: r,
    label: a = e.name,
    className: u = "vh-mt-3",
    min: s,
    max: i,
    required: l = !1
  } = e, { register: o } = k(), c = p((d) => {
    const b = parseInt(d);
    if (!isNaN(b))
      return b;
  }, []);
  return /* @__PURE__ */ n("div", { className: h("varhub-parameter-input", u), children: [
    /* @__PURE__ */ n(
      "input",
      {
        placeholder: r,
        type: "number",
        min: s,
        max: i,
        ...o(t, { min: s, max: i, shouldUnregister: !0, required: l, setValueAs: c })
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
    /* @__PURE__ */ n("label", { children: a }, void 0, !1, {
      fileName: "D:/Projects/js/varhub-ui-kit/src/components/parameter/VarhubNumberParameter.tsx",
      lineNumber: 45,
      columnNumber: 13
    }, void 0)
  ] }, void 0, !0, {
    fileName: "D:/Projects/js/varhub-ui-kit/src/components/parameter/VarhubNumberParameter.tsx",
    lineNumber: 37,
    columnNumber: 9
  }, void 0);
}, H = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g, K = (e) => {
  const { children: t, title: r, initialParams: a, className: u, error: s, darkMode: i, onEnter: l, abortController: o } = e, [c, d] = v(a?.roomId !== void 0), b = p(() => d((m) => !m), [d]), f = z({
    defaultValues: a,
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    shouldUseNativeValidation: !0,
    delayError: 500,
    shouldFocusError: !1
  }), N = R(async (m) => {
    await l?.({
      joinMode: m.roomId !== void 0,
      serverUrl: m.serverUrl,
      roomId: m.roomId,
      playerName: m.playerName,
      settings: m.settings
    });
  });
  A(() => {
    a?.autoJoin && N(f.getValues());
  }, [a?.autoJoin]);
  const j = /* @__PURE__ */ n(M, { children: [
    /* @__PURE__ */ n(D, { htmlType: "submit", disabled: o != null, children: c ? "Join room" : "Create room" }, void 0, !1, {
      fileName: "D:/Projects/js/varhub-ui-kit/src/components/VarhubEnterPage.tsx",
      lineNumber: 67,
      columnNumber: 13
    }, void 0),
    /* @__PURE__ */ n(
      D,
      {
        type: "secondary",
        htmlType: "button",
        onClick: b,
        className: "vh-ml-2",
        disabled: o != null,
        children: c ? "Or create new room" : "Or join existing room"
      },
      void 0,
      !1,
      {
        fileName: "D:/Projects/js/varhub-ui-kit/src/components/VarhubEnterPage.tsx",
        lineNumber: 70,
        columnNumber: 13
      },
      void 0
    )
  ] }, void 0, !0, {
    fileName: "D:/Projects/js/varhub-ui-kit/src/components/VarhubEnterPage.tsx",
    lineNumber: 66,
    columnNumber: 9
  }, void 0);
  return /* @__PURE__ */ n("div", { className: h("varhub-page", u, { "dark-mode": i }), children: /* @__PURE__ */ n(
    "form",
    {
      className: "varhub-form",
      onSubmit: f.handleSubmit(N),
      children: /* @__PURE__ */ n(F, { title: r, actions: j, loading: o != null, error: s, children: /* @__PURE__ */ n(Z, { ...f, children: [
        /* @__PURE__ */ n(
          x,
          {
            required: !0,
            className: "vh-mt-2",
            name: "serverUrl",
            label: "Varhub server URL",
            pattern: H,
            patternMessage: "Invalid url"
          },
          void 0,
          !1,
          {
            fileName: "D:/Projects/js/varhub-ui-kit/src/components/VarhubEnterPage.tsx",
            lineNumber: 90,
            columnNumber: 25
          },
          void 0
        ),
        /* @__PURE__ */ n(x, { required: !0, className: "vh-mt-3", name: "playerName", label: "Player name" }, void 0, !1, {
          fileName: "D:/Projects/js/varhub-ui-kit/src/components/VarhubEnterPage.tsx",
          lineNumber: 98,
          columnNumber: 25
        }, void 0),
        c && /* @__PURE__ */ n(_, { required: !0, min: 0, className: "vh-mt-3", name: "roomId", label: "Room ID" }, void 0, !1, {
          fileName: "D:/Projects/js/varhub-ui-kit/src/components/VarhubEnterPage.tsx",
          lineNumber: 99,
          columnNumber: 38
        }, void 0),
        t && !c && /* @__PURE__ */ n(B, { children: t }, void 0, !1, {
          fileName: "D:/Projects/js/varhub-ui-kit/src/components/VarhubEnterPage.tsx",
          lineNumber: 101,
          columnNumber: 29
        }, void 0)
      ] }, void 0, !0, {
        fileName: "D:/Projects/js/varhub-ui-kit/src/components/VarhubEnterPage.tsx",
        lineNumber: 89,
        columnNumber: 21
      }, void 0) }, void 0, !1, {
        fileName: "D:/Projects/js/varhub-ui-kit/src/components/VarhubEnterPage.tsx",
        lineNumber: 88,
        columnNumber: 17
      }, void 0)
    },
    void 0,
    !1,
    {
      fileName: "D:/Projects/js/varhub-ui-kit/src/components/VarhubEnterPage.tsx",
      lineNumber: 84,
      columnNumber: 13
    },
    void 0
  ) }, void 0, !1, {
    fileName: "D:/Projects/js/varhub-ui-kit/src/components/VarhubEnterPage.tsx",
    lineNumber: 83,
    columnNumber: 9
  }, void 0);
}, w = U(null), ae = ({ children: e }) => {
  const [t, r] = v(null), a = S(() => ({ client: t, setClient: r }), [t, r]);
  return /* @__PURE__ */ n(w.Provider, { value: a, children: e }, void 0, !1, {
    fileName: "D:/Projects/js/varhub-ui-kit/src/context/VarhubGameClientContext.tsx",
    lineNumber: 17,
    columnNumber: 9
  }, void 0);
}, se = () => V(w).client, ie = (e) => {
  const {
    roomIntegrity: t,
    importRoomModule: r,
    onEnter: a,
    title: u,
    children: s,
    darkMode: i,
    initialParams: l
  } = e, o = $(l), [c, d] = v(null), b = V(w), [f, N] = v(null), j = p(async (m) => {
    d(null);
    let P = null, C;
    try {
      console.log("$$$", "CREATE CLIENT");
      const g = await L({
        ...m,
        roomIntegrity: t,
        importRoomModule: r
      });
      P = await g.client, C = g.roomId, a?.(P), b.setClient(P), T({
        ...m,
        roomId: C,
        autoJoin: !0
      });
    } catch (g) {
      const y = m.joinMode ? "connect to" : "create";
      d(`Error while trying to ${y} room`), console.error(g);
    } finally {
      N(null);
    }
  }, [a]);
  return /* @__PURE__ */ n(
    K,
    {
      darkMode: i,
      initialParams: o,
      onEnter: j,
      title: u,
      abortController: f,
      error: c,
      children: s
    },
    void 0,
    !1,
    {
      fileName: "D:/Projects/js/varhub-ui-kit/src/components/VarhubSelfControlEnterPage.tsx",
      lineNumber: 64,
      columnNumber: 9
    },
    void 0
  );
}, ue = (e) => /* @__PURE__ */ n(x, { ...e, name: "settings." + e.name }, void 0, !1, {
  fileName: "D:/Projects/js/varhub-ui-kit/src/components/settings/SettingsInputParameter.tsx",
  lineNumber: 8,
  columnNumber: 9
}, void 0), oe = (e) => /* @__PURE__ */ n(_, { ...e, name: "settings." + e.name }, void 0, !1, {
  fileName: "D:/Projects/js/varhub-ui-kit/src/components/settings/SettingsNumberParameter.tsx",
  lineNumber: 8,
  columnNumber: 9
}, void 0), Q = (e) => {
  const { value: t, onChange: r, className: a, children: u } = e, s = p((i) => {
    r?.(i.target.checked);
  }, [r]);
  return /* @__PURE__ */ n("label", { className: h("vh-toggle", a), children: [
    /* @__PURE__ */ n("span", { className: "vh-toggle-label", children: u }, void 0, !1, {
      fileName: "D:/Projects/js/varhub-ui-kit/src/components/Switch/Switch.tsx",
      lineNumber: 21,
      columnNumber: 13
    }, void 0),
    /* @__PURE__ */ n("input", { className: "vh-toggle-checkbox", checked: t, onChange: s, type: "checkbox" }, void 0, !1, {
      fileName: "D:/Projects/js/varhub-ui-kit/src/components/Switch/Switch.tsx",
      lineNumber: 22,
      columnNumber: 13
    }, void 0),
    /* @__PURE__ */ n("div", { className: "vh-toggle-switch" }, void 0, !1, {
      fileName: "D:/Projects/js/varhub-ui-kit/src/components/Switch/Switch.tsx",
      lineNumber: 23,
      columnNumber: 13
    }, void 0)
  ] }, void 0, !0, {
    fileName: "D:/Projects/js/varhub-ui-kit/src/components/Switch/Switch.tsx",
    lineNumber: 20,
    columnNumber: 9
  }, void 0);
}, W = (e) => {
  const {
    name: t,
    label: r = e.name,
    className: a = "vh-mt-3"
  } = e, { control: u, getValues: s } = k();
  return /* @__PURE__ */ n(
    J,
    {
      render: ({ field: i }) => /* @__PURE__ */ n(Q, { className: a, onChange: i.onChange, value: i.value, children: r }, void 0, !1, {
        fileName: "D:/Projects/js/varhub-ui-kit/src/components/parameter/VarhubSwitchParameter.tsx",
        lineNumber: 23,
        columnNumber: 34
      }, void 0),
      name: t,
      defaultValue: s(t) || !1,
      shouldUnregister: !0,
      control: u
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
}, ce = (e) => /* @__PURE__ */ n(W, { ...e, name: "settings." + e.name }, void 0, !1, {
  fileName: "D:/Projects/js/varhub-ui-kit/src/components/settings/SettingsSwitchParameter.tsx",
  lineNumber: 8,
  columnNumber: 9
}, void 0);
export {
  ue as SettingsInputParameter,
  oe as SettingsNumberParameter,
  ce as SettingsSwitchParameter,
  K as VarhubEnterPage,
  w as VarhubGameClientContext,
  ae as VarhubGameClientProvider,
  ie as VarhubSelfControlEnterPage,
  L as createVarhubRoomAndClient,
  O as getVarhubEnterParams,
  T as saveVarhubEnterParams,
  se as useVarhubGameClient,
  $ as useVarhubInitialParams
};

import { Varhub as y } from "@flinbein/varhub-web-client";
import { useRef as E, useMemo as S, useState as N, useCallback as v, useEffect as I, createContext as A, useContext as D } from "react";
import { jsxDEV as n, Fragment as U } from "react/jsx-dev-runtime";
import b from "classnames";
import { useFormContext as x, useForm as M, FormProvider as z, Controller as J } from "react-hook-form";
import Z from "use-latest-callback";
async function R(e) {
  const {
    serverUrl: t,
    playerName: r,
    settings: a = {},
    importRoomModule: u,
    roomIntegrity: s,
    engine: i = "ivm",
    roomPublicMessage: o
  } = e;
  let c = e.roomId;
  const l = new y(t);
  if (!c) {
    const { integrity: d, module: f } = await u();
    c = (await l.createRoom(i, { module: f, integrity: d, config: a, message: o })).id;
  }
  const h = l.join(c, { params: [r], integrity: s });
  return { roomId: c, client: h, playerName: r };
}
const O = (e) => {
  const t = new URLSearchParams(location.search), r = JSON.parse(history?.state?.varhubEnterState || "{}"), a = t.get("serverUrl") ?? r.serverUrl ?? e.serverUrl ?? void 0, u = t.get("roomId") ?? r.roomId ?? void 0, s = r.playerName ?? void 0, i = r.settings ?? e.settings ?? {}, o = r.autoJoin ?? !1;
  return {
    serverUrl: a,
    roomId: u,
    playerName: s,
    autoJoin: o,
    settings: i
  };
}, $ = (e) => {
  const t = new URL(location.href), r = { varhubEnterState: JSON.stringify(e || {}) };
  t.search = "", history.replaceState(r, "", t);
}, L = (e) => E(O(e)).current, T = ({ size: e }) => /* @__PURE__ */ n("span", { className: "vh-loader", style: { height: e, width: e } }, void 0, !1, {
  fileName: "D:/Projects/js/varhub-ui-kit/src/components/Loader/Loader.tsx",
  lineNumber: 10,
  columnNumber: 9
}, void 0), F = (e) => {
  const { children: t, title: r, actions: a, loading: u, error: s } = e;
  return /* @__PURE__ */ n("div", { className: b("varhub-card"), children: [
    /* @__PURE__ */ n("div", { className: "varhub-card__content varhub-card__header", children: [
      /* @__PURE__ */ n("h2", { className: "varhub-card__header__text", children: r }, void 0, !1, {
        fileName: "D:/Projects/js/varhub-ui-kit/src/components/Card/Card.tsx",
        lineNumber: 20,
        columnNumber: 17
      }, void 0),
      u && /* @__PURE__ */ n(T, { size: 24 }, void 0, !1, {
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
}, P = (e) => {
  const {
    name: t,
    placeholder: r,
    label: a = e.name,
    className: u = "vh-mt-3",
    required: s = !1,
    pattern: i,
    patternMessage: o
  } = e, { register: c } = x(), l = S(() => {
    if (i)
      return { value: i, message: o || "Invalid pattern" };
  }, [i, o]);
  return /* @__PURE__ */ n("div", { className: b("varhub-parameter-input", u), children: [
    /* @__PURE__ */ n("input", { placeholder: r, type: "text", required: s, ...c(t, { shouldUnregister: !0, required: s, pattern: l }) }, void 0, !1, {
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
}, q = ({ direction: e }) => /* @__PURE__ */ n("i", { className: b("vh-arrow", e) }, void 0, !1, {
  fileName: "D:/Projects/js/varhub-ui-kit/src/components/icon/ArrowIcon.tsx",
  lineNumber: 13,
  columnNumber: 9
}, void 0), B = ({ children: e }) => {
  const [t, r] = N(!1), a = v(() => {
    r((u) => !u);
  }, [r]);
  return /* @__PURE__ */ n("div", { className: "vh-settings-section varhub-card__divider--top", children: [
    /* @__PURE__ */ n("h5", { className: "vh-settings-section__title", children: [
      "Settings",
      /* @__PURE__ */ n(
        "a",
        {
          className: b("vh-settings-section__title__button", { reversed: t }),
          onClick: a,
          type: "button",
          children: /* @__PURE__ */ n(q, { direction: "down" }, void 0, !1, {
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
}, w = (e) => {
  const {
    children: t,
    htmlType: r,
    type: a = "primary",
    className: u,
    onClick: s,
    disabled: i,
    ...o
  } = e;
  return /* @__PURE__ */ n(
    "button",
    {
      type: r,
      ...o,
      onClick: (l) => {
        i || s?.(l);
      },
      disabled: i,
      className: b("varhub-button", u, { [`type-${a}`]: a }),
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
}, V = (e) => {
  const {
    name: t,
    placeholder: r,
    label: a = e.name,
    className: u = "vh-mt-3",
    min: s,
    max: i,
    required: o = !1
  } = e, { register: c } = x(), l = v((h) => {
    const d = parseInt(h);
    if (!isNaN(d))
      return d;
  }, []);
  return /* @__PURE__ */ n("div", { className: b("varhub-parameter-input", u), children: [
    /* @__PURE__ */ n(
      "input",
      {
        placeholder: r,
        type: "number",
        min: s,
        max: i,
        ...c(t, { min: s, max: i, shouldUnregister: !0, required: o, setValueAs: l })
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
}, G = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g, H = (e) => {
  const { children: t, initialParams: r, className: a, error: u, darkMode: s, onEnter: i, abortController: o } = e, [c, l] = N(r?.roomId !== void 0), h = v(() => l((m) => !m), [l]), d = M({
    defaultValues: r,
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    shouldUseNativeValidation: !0,
    delayError: 500,
    shouldFocusError: !1
  }), f = Z(async (m) => {
    console.log("$$$", "ON SUBMIT"), await i?.({
      joinMode: m.roomId !== void 0,
      serverUrl: m.serverUrl,
      roomId: m.roomId,
      playerName: m.playerName,
      settings: m.settings
    });
  });
  I(() => {
    r?.autoJoin && (console.log("AUTO JOIN"), f(d.getValues()));
  }, [r?.autoJoin]);
  const p = /* @__PURE__ */ n(U, { children: [
    /* @__PURE__ */ n(w, { htmlType: "submit", disabled: o != null, children: c ? "Join room" : "Create room" }, void 0, !1, {
      fileName: "D:/Projects/js/varhub-ui-kit/src/components/VarhubEnterPage.tsx",
      lineNumber: 69,
      columnNumber: 13
    }, void 0),
    /* @__PURE__ */ n(
      w,
      {
        type: "secondary",
        htmlType: "button",
        onClick: h,
        className: "vh-ml-2",
        disabled: o != null,
        children: c ? "Or create new room" : "Or join existing room"
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
  return /* @__PURE__ */ n("div", { className: b("varhub-page", a, { "dark-mode": s }), children: /* @__PURE__ */ n(
    "form",
    {
      className: "varhub-form",
      onSubmit: d.handleSubmit(f),
      children: /* @__PURE__ */ n(F, { title: "SpyFall", actions: p, loading: o != null, error: u, children: /* @__PURE__ */ n(z, { ...d, children: [
        /* @__PURE__ */ n(
          P,
          {
            required: !0,
            className: "vh-mt-2",
            name: "serverUrl",
            label: "Varhub server URL",
            pattern: G,
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
        /* @__PURE__ */ n(P, { required: !0, className: "vh-mt-3", name: "playerName", label: "Player name" }, void 0, !1, {
          fileName: "D:/Projects/js/varhub-ui-kit/src/components/VarhubEnterPage.tsx",
          lineNumber: 100,
          columnNumber: 25
        }, void 0),
        c && /* @__PURE__ */ n(V, { required: !0, min: 0, className: "vh-mt-3", name: "roomId", label: "Room ID" }, void 0, !1, {
          fileName: "D:/Projects/js/varhub-ui-kit/src/components/VarhubEnterPage.tsx",
          lineNumber: 101,
          columnNumber: 38
        }, void 0),
        t && !c && /* @__PURE__ */ n(B, { children: t }, void 0, !1, {
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
}, k = A(null), te = ({ children: e }) => {
  const [t, r] = N(null), a = S(() => ({ client: t, setClient: r }), [t, r]);
  return /* @__PURE__ */ n(k.Provider, { value: a, children: e }, void 0, !1, {
    fileName: "D:/Projects/js/varhub-ui-kit/src/context/VarhubGameClientContext.tsx",
    lineNumber: 17,
    columnNumber: 9
  }, void 0);
}, ae = () => D(k).client, se = (e) => {
  const { roomIntegrity: t, importRoomModule: r, onEnter: a, children: u, darkMode: s, initialParams: i } = e, o = L(i), [c, l] = N(null), h = D(k), [d, f] = N(null), p = v(async (m) => {
    l(null);
    let j = null, C;
    try {
      console.log("$$$", "CREATE CLIENT");
      const g = await R({
        ...m,
        roomIntegrity: t,
        importRoomModule: r
      });
      j = g.client, C = g.roomId, a?.(j), h.setClient(j), $({
        ...m,
        roomId: C,
        autoJoin: !0
      });
    } catch (g) {
      const _ = m.joinMode ? "connect to" : "create";
      l(`Error while trying to ${_} room`), console.error(g);
    } finally {
      f(null);
    }
  }, [a]);
  return /* @__PURE__ */ n(
    H,
    {
      darkMode: s,
      initialParams: o,
      onEnter: p,
      abortController: d,
      error: c,
      children: u
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
}, ie = (e) => /* @__PURE__ */ n(P, { ...e, name: "settings." + e.name }, void 0, !1, {
  fileName: "D:/Projects/js/varhub-ui-kit/src/components/settings/SettingsInputParameter.tsx",
  lineNumber: 8,
  columnNumber: 9
}, void 0), ue = (e) => /* @__PURE__ */ n(V, { ...e, name: "settings." + e.name }, void 0, !1, {
  fileName: "D:/Projects/js/varhub-ui-kit/src/components/settings/SettingsNumberParameter.tsx",
  lineNumber: 8,
  columnNumber: 9
}, void 0), K = (e) => {
  const { value: t, onChange: r, className: a, children: u } = e, s = v((i) => {
    r?.(i.target.checked);
  }, [r]);
  return /* @__PURE__ */ n("label", { className: b("vh-toggle", a), children: [
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
}, Q = (e) => {
  const {
    name: t,
    label: r = e.name,
    className: a = "vh-mt-3"
  } = e, { control: u, getValues: s } = x();
  return /* @__PURE__ */ n(
    J,
    {
      render: ({ field: i }) => /* @__PURE__ */ n(K, { className: a, onChange: i.onChange, value: i.value, children: r }, void 0, !1, {
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
}, oe = (e) => /* @__PURE__ */ n(Q, { ...e, name: "settings." + e.name }, void 0, !1, {
  fileName: "D:/Projects/js/varhub-ui-kit/src/components/settings/SettingsSwitchParameter.tsx",
  lineNumber: 8,
  columnNumber: 9
}, void 0);
export {
  ie as SettingsInputParameter,
  ue as SettingsNumberParameter,
  oe as SettingsSwitchParameter,
  H as VarhubEnterPage,
  k as VarhubGameClientContext,
  te as VarhubGameClientProvider,
  se as VarhubSelfControlEnterPage,
  R as createVarhubRoomAndClient,
  O as getVarhubEnterParams,
  $ as saveVarhubEnterParams,
  ae as useVarhubGameClient,
  L as useVarhubInitialParams
};

import "./index.css";
import {Varhub as $7RevM$Varhub} from "@flinbein/varhub-web-client";
import {useRef as $7RevM$useRef, useState as $7RevM$useState, useCallback as $7RevM$useCallback, useEffect as $7RevM$useEffect, useMemo as $7RevM$useMemo, useContext as $7RevM$useContext, createContext as $7RevM$createContext} from "react";
import {jsxs as $7RevM$jsxs, Fragment as $7RevM$Fragment, jsx as $7RevM$jsx} from "react/jsx-runtime";
import {useForm as $7RevM$useForm, FormProvider as $7RevM$FormProvider, useFormContext as $7RevM$useFormContext, Controller as $7RevM$Controller} from "react-hook-form";
import $7RevM$uselatestcallback from "use-latest-callback";
import $7RevM$classnames from "classnames";


function $parcel$exportWildcard(dest, source) {
  Object.keys(source).forEach(function(key) {
    if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function get() {
        return source[key];
      }
    });
  });

  return dest;
}

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $79a74da3b5f51f5d$exports = {};
var $ad6a7c3143400999$exports = {};

$parcel$export($ad6a7c3143400999$exports, "createVarhubRoomAndClient", () => $ad6a7c3143400999$export$1178a94447621ed4);

async function $ad6a7c3143400999$export$1178a94447621ed4(opts) {
    const { serverUrl: serverUrl, playerName: playerName, abortController: abortController, settings: settings = {}, importRoomModule: importRoomModule, roomIntegrity: roomIntegrity } = opts;
    let roomId = opts.roomId;
    const hub = new (0, $7RevM$Varhub)(serverUrl);
    if (!roomId) {
        const { roomModule: roomModule, roomIntegrity: roomIntegrity } = await importRoomModule();
        const roomData = await hub.createRoom(roomModule, {
            integrity: roomIntegrity,
            config: settings
        });
        roomId = roomData.id;
    }
    return await hub.join(roomId, playerName, {
        integrity: roomIntegrity,
        timeout: abortController?.signal
    });
}


var $dc6bedf7d60b80ba$exports = {};

$parcel$export($dc6bedf7d60b80ba$exports, "getVarhubEnterParams", () => $dc6bedf7d60b80ba$export$57b65ef575b8a96b);
$parcel$export($dc6bedf7d60b80ba$exports, "saveVarhubEnterParams", () => $dc6bedf7d60b80ba$export$43dc93b37e1cef48);
const $dc6bedf7d60b80ba$export$57b65ef575b8a96b = ()=>{
    const searchParams = new URLSearchParams(location.search);
    const varhubEnterState = JSON.parse(history?.state?.varhubEnterState || "{}");
    const serverUrl = searchParams.get("serverUrl") ?? varhubEnterState.serverUrl ?? undefined;
    const roomId = searchParams.get("roomId") ?? varhubEnterState.roomId ?? undefined;
    const playerName = varhubEnterState.playerName ?? undefined;
    const settings = varhubEnterState.settings ?? {};
    const autoJoin = varhubEnterState.autoJoin ?? false;
    return {
        serverUrl: serverUrl,
        roomId: roomId,
        playerName: playerName,
        autoJoin: autoJoin,
        settings: settings
    };
};
const $dc6bedf7d60b80ba$export$43dc93b37e1cef48 = (params)=>{
    const currentUrl = new URL(location.href);
    const state = {
        varhubEnterState: JSON.stringify(params || {})
    };
    currentUrl.search = "";
    history.replaceState(state, "", currentUrl);
};


$parcel$exportWildcard($79a74da3b5f51f5d$exports, $ad6a7c3143400999$exports);
$parcel$exportWildcard($79a74da3b5f51f5d$exports, $dc6bedf7d60b80ba$exports);


var $47df7ef1038b5b8e$exports = {};
var $0cac772cc8ad0209$exports = {};

$parcel$export($0cac772cc8ad0209$exports, "useVarhubInitialParams", () => $0cac772cc8ad0209$export$281b4cc462f4fca);


const $0cac772cc8ad0209$export$281b4cc462f4fca = ()=>{
    return (0, $7RevM$useRef)((0, $dc6bedf7d60b80ba$export$57b65ef575b8a96b)()).current;
};


$parcel$exportWildcard($47df7ef1038b5b8e$exports, $0cac772cc8ad0209$exports);


var $8b87bb17e3db19b5$exports = {};
var $b4cc80a948e954f2$exports = {};

$parcel$export($b4cc80a948e954f2$exports, "VarhubEnterPage", () => $b4cc80a948e954f2$export$9b0e97c74cb15914);






const $f2afd96a63ac238e$export$3b0d6d7590275603 = ({ size: size })=>{
    return /*#__PURE__*/ (0, $7RevM$jsx)("span", {
        className: "vh-loader",
        style: {
            height: size,
            width: size
        }
    });
};



const $cad624abfe712d33$export$60332b2344f7fe41 = (props)=>{
    const { children: children, title: title, actions: actions, loading: loading } = props;
    return /*#__PURE__*/ (0, $7RevM$jsxs)("div", {
        className: (0, $7RevM$classnames)("varhub-card"),
        children: [
            /*#__PURE__*/ (0, $7RevM$jsxs)("div", {
                className: "varhub-card__content varhub-card__header",
                children: [
                    /*#__PURE__*/ (0, $7RevM$jsx)("h2", {
                        className: "varhub-card__header__text",
                        children: title
                    }),
                    loading && /*#__PURE__*/ (0, $7RevM$jsx)((0, $f2afd96a63ac238e$export$3b0d6d7590275603), {
                        size: 24
                    })
                ]
            }),
            /*#__PURE__*/ (0, $7RevM$jsx)("div", {
                className: "varhub-card__content varhub-card__body",
                children: children
            }),
            actions && /*#__PURE__*/ (0, $7RevM$jsx)("div", {
                className: "varhub-card__content varhub-card__actions varhub-card__divider--top",
                children: actions
            }),
            /*#__PURE__*/ (0, $7RevM$jsxs)("div", {
                className: "varhub-card__powered-by varhub-card__content varhub-card__divider--top",
                children: [
                    "Powered by ",
                    /*#__PURE__*/ (0, $7RevM$jsx)("a", {
                        className: "varhub-card__link",
                        href: "https://github.com/flinbein/varhub-web-server",
                        children: "VarHub"
                    })
                ]
            })
        ]
    });
};








const $17d7724e7f3adc7d$export$c70e91bd96ab803a = (props)=>{
    const { name: name, placeholder: placeholder, label: label = props.name, className: className = "vh-mt-3", required: required = false, pattern: pattern, patternMessage: patternMessage } = props;
    const { register: register } = (0, $7RevM$useFormContext)() // retrieve all hook methods
    ;
    const patternValidation = (0, $7RevM$useMemo)(()=>{
        if (!pattern) return undefined;
        return {
            value: pattern,
            message: patternMessage || "Invalid pattern"
        };
    }, [
        pattern,
        patternMessage
    ]);
    return /*#__PURE__*/ (0, $7RevM$jsxs)("div", {
        className: (0, $7RevM$classnames)("varhub-parameter-input", className),
        children: [
            /*#__PURE__*/ (0, $7RevM$jsx)("input", {
                placeholder: placeholder,
                type: "text",
                required: required,
                ...register(name, {
                    shouldUnregister: true,
                    required: required,
                    pattern: patternValidation
                })
            }),
            /*#__PURE__*/ (0, $7RevM$jsx)("label", {
                children: label
            })
        ]
    });
};








const $caa6126159cc4176$export$26b09f677ead9482 = ({ direction: direction })=>{
    return /*#__PURE__*/ (0, $7RevM$jsx)("i", {
        className: (0, $7RevM$classnames)("vh-arrow", direction)
    });
};



const $983fc543a8afe73a$export$d239b03507a9e5cc = ({ children: children })=>{
    const [expanded, setExpanded] = (0, $7RevM$useState)(false);
    const onSwitchExpand = (0, $7RevM$useCallback)(()=>{
        setExpanded((v)=>!v);
    }, [
        setExpanded
    ]);
    return /*#__PURE__*/ (0, $7RevM$jsxs)("div", {
        className: "vh-settings-section varhub-card__divider--top",
        children: [
            /*#__PURE__*/ (0, $7RevM$jsxs)("h5", {
                className: "vh-settings-section__title",
                children: [
                    "Settings",
                    /*#__PURE__*/ (0, $7RevM$jsx)("a", {
                        className: (0, $7RevM$classnames)("vh-settings-section__title__button", {
                            reversed: expanded
                        }),
                        onClick: onSwitchExpand,
                        type: "button",
                        children: /*#__PURE__*/ (0, $7RevM$jsx)((0, $caa6126159cc4176$export$26b09f677ead9482), {
                            direction: "down"
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0, $7RevM$jsx)("div", {
                className: `vh-settings-section__body ${expanded ? "shown" : "hidden"}`,
                children: children
            })
        ]
    });
};





const $b361173af01d4534$export$2c313f739c31196b = (props)=>{
    const { children: children, htmlType: htmlType, type: type = "primary", className: className, onClick: onClick, disabled: disabled, ...rest } = props;
    const handledOnChange = (e)=>{
        if (disabled) return;
        onClick?.(e);
    };
    return /*#__PURE__*/ (0, $7RevM$jsx)("button", {
        type: htmlType,
        ...rest,
        onClick: handledOnChange,
        disabled: disabled,
        className: (0, $7RevM$classnames)("varhub-button", className, {
            [`type-${type}`]: type
        }),
        children: children
    });
};







const $939b2a0a89587ff0$export$83e3640adca2e7dd = (props)=>{
    const { name: name, placeholder: placeholder, label: label = props.name, className: className = "vh-mt-3", min: min, max: max, required: required = false } = props;
    const { register: register } = (0, $7RevM$useFormContext)() // retrieve all hook methods
    ;
    const setValueAs = (0, $7RevM$useCallback)((v)=>{
        const intValue = parseInt(v);
        if (isNaN(intValue)) return undefined;
        return intValue;
    }, []);
    return /*#__PURE__*/ (0, $7RevM$jsxs)("div", {
        className: (0, $7RevM$classnames)("varhub-parameter-input", className),
        children: [
            /*#__PURE__*/ (0, $7RevM$jsx)("input", {
                placeholder: placeholder,
                type: "number",
                min: min,
                max: max,
                ...register(name, {
                    min: min,
                    max: max,
                    shouldUnregister: true,
                    required: required,
                    setValueAs: setValueAs
                })
            }),
            /*#__PURE__*/ (0, $7RevM$jsx)("label", {
                children: label
            })
        ]
    });
};




const $b4cc80a948e954f2$var$urlPattern = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
const $b4cc80a948e954f2$export$9b0e97c74cb15914 = (props)=>{
    const { children: children, initialParams: initialParams, className: className, darkMode: darkMode, onEnter: onEnter, abortController: abortController } = props;
    const [joinMode, setJoinMode] = (0, $7RevM$useState)(initialParams?.roomId !== undefined);
    const switchJoinMode = (0, $7RevM$useCallback)(()=>setJoinMode((v)=>!v), [
        setJoinMode
    ]);
    const formMethods = (0, $7RevM$useForm)({
        defaultValues: initialParams,
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        shouldUseNativeValidation: true,
        delayError: 500,
        shouldFocusError: false
    });
    const onSubmit = (0, $7RevM$uselatestcallback)((data)=>{
        onEnter?.({
            joinMode: data.roomId === undefined,
            serverUrl: data.serverUrl,
            roomId: data.roomId,
            playerName: data.playerName,
            settings: data.settings
        });
    });
    (0, $7RevM$useEffect)(()=>{
        if (!initialParams?.autoJoin) return;
        onSubmit(formMethods.getValues());
    }, [
        initialParams?.autoJoin
    ]);
    const actions = /*#__PURE__*/ (0, $7RevM$jsxs)((0, $7RevM$Fragment), {
        children: [
            /*#__PURE__*/ (0, $7RevM$jsx)((0, $b361173af01d4534$export$2c313f739c31196b), {
                htmlType: "submit",
                disabled: abortController != null,
                children: joinMode ? "Join room" : "Create room"
            }),
            /*#__PURE__*/ (0, $7RevM$jsx)((0, $b361173af01d4534$export$2c313f739c31196b), {
                type: "secondary",
                htmlType: "button",
                onClick: switchJoinMode,
                className: "vh-ml-2",
                disabled: abortController != null,
                children: joinMode ? "Or create new room" : "Or join existing room"
            })
        ]
    });
    return /*#__PURE__*/ (0, $7RevM$jsx)("div", {
        className: (0, $7RevM$classnames)("varhub-page", className, {
            "dark-mode": darkMode
        }),
        children: /*#__PURE__*/ (0, $7RevM$jsx)("form", {
            className: "varhub-form",
            onSubmit: formMethods.handleSubmit(onSubmit),
            children: /*#__PURE__*/ (0, $7RevM$jsx)((0, $cad624abfe712d33$export$60332b2344f7fe41), {
                title: "SpyFall",
                actions: actions,
                loading: abortController != null,
                children: /*#__PURE__*/ (0, $7RevM$jsxs)((0, $7RevM$FormProvider), {
                    ...formMethods,
                    children: [
                        /*#__PURE__*/ (0, $7RevM$jsx)((0, $17d7724e7f3adc7d$export$c70e91bd96ab803a), {
                            required: true,
                            className: "vh-mt-2",
                            name: "serverUrl",
                            label: "Varhub server URL",
                            pattern: $b4cc80a948e954f2$var$urlPattern,
                            patternMessage: "Invalid url"
                        }),
                        /*#__PURE__*/ (0, $7RevM$jsx)((0, $17d7724e7f3adc7d$export$c70e91bd96ab803a), {
                            required: true,
                            className: "vh-mt-3",
                            name: "playerName",
                            label: "Player name"
                        }),
                        joinMode && /*#__PURE__*/ (0, $7RevM$jsx)((0, $939b2a0a89587ff0$export$83e3640adca2e7dd), {
                            required: true,
                            min: 0,
                            className: "vh-mt-3",
                            name: "roomId",
                            label: "Room ID"
                        }),
                        children && !joinMode && /*#__PURE__*/ (0, $7RevM$jsx)((0, $983fc543a8afe73a$export$d239b03507a9e5cc), {
                            children: children
                        })
                    ]
                })
            })
        })
    });
};


var $db98186b3469ed55$exports = {};

$parcel$export($db98186b3469ed55$exports, "VarhubSelfControlEnterPage", () => $db98186b3469ed55$export$70faa2a42c1db4b3);






var $c7b499d0c8fbfc3a$exports = {};

$parcel$export($c7b499d0c8fbfc3a$exports, "VarhubGameClientContext", () => $c7b499d0c8fbfc3a$export$b6a89eec864391f);
$parcel$export($c7b499d0c8fbfc3a$exports, "VarhubGameClientProvider", () => $c7b499d0c8fbfc3a$export$fbf4fb5e7a74afa5);
$parcel$export($c7b499d0c8fbfc3a$exports, "useVarhubGameClient", () => $c7b499d0c8fbfc3a$export$d54a465aa59a4edc);


const $c7b499d0c8fbfc3a$export$b6a89eec864391f = /*#__PURE__*/ (0, $7RevM$createContext)(null);
const $c7b499d0c8fbfc3a$export$fbf4fb5e7a74afa5 = ({ children: children })=>{
    const [client, setClient] = (0, $7RevM$useState)(null);
    const ctxValue = (0, $7RevM$useMemo)(()=>({
            client: client,
            setClient: setClient
        }), [
        client,
        setClient
    ]);
    return /*#__PURE__*/ (0, $7RevM$jsx)($c7b499d0c8fbfc3a$export$b6a89eec864391f.Provider, {
        value: ctxValue,
        children: children
    });
};
const $c7b499d0c8fbfc3a$export$d54a465aa59a4edc = ()=>{
    return (0, $7RevM$useContext)($c7b499d0c8fbfc3a$export$b6a89eec864391f).client;
};


const $db98186b3469ed55$export$70faa2a42c1db4b3 = (props)=>{
    const { roomIntegrity: roomIntegrity, importRoomModule: importRoomModule, onEnter: onEnter, children: children, darkMode: darkMode } = props;
    const params = (0, $0cac772cc8ad0209$export$281b4cc462f4fca)();
    const ctx = (0, $7RevM$useContext)((0, $c7b499d0c8fbfc3a$export$b6a89eec864391f));
    const [abortController, setAbortController] = (0, $7RevM$useState)(null);
    const onEnterPage = (0, $7RevM$useCallback)(async (params)=>{
        const abortController = new AbortController();
        setAbortController(abortController);
        const client = await (0, $ad6a7c3143400999$export$1178a94447621ed4)({
            ...params,
            roomIntegrity: roomIntegrity,
            importRoomModule: importRoomModule,
            abortController: abortController
        });
        setAbortController(null);
        onEnter(client);
        ctx.setClient(client);
        (0, $dc6bedf7d60b80ba$export$43dc93b37e1cef48)({
            ...params,
            roomId: client.roomId,
            autoJoin: true
        });
    }, [
        onEnter
    ]);
    return /*#__PURE__*/ (0, $7RevM$jsx)((0, $b4cc80a948e954f2$export$9b0e97c74cb15914), {
        darkMode: darkMode,
        initialParams: params,
        onEnter: onEnterPage,
        abortController: abortController,
        children: children
    });
};


var $f11cadc56915c353$exports = {};

$parcel$export($f11cadc56915c353$exports, "SettingsInputParameter", () => $f11cadc56915c353$export$daabdb6a931ceba3);


const $f11cadc56915c353$export$daabdb6a931ceba3 = (props)=>{
    return /*#__PURE__*/ (0, $7RevM$jsx)((0, $17d7724e7f3adc7d$export$c70e91bd96ab803a), {
        ...props,
        name: "settings." + props.name
    });
};


var $293e92f0e95e9550$exports = {};

$parcel$export($293e92f0e95e9550$exports, "SettingsNumberParameter", () => $293e92f0e95e9550$export$9e54f45334aa4be5);


const $293e92f0e95e9550$export$9e54f45334aa4be5 = (props)=>{
    return /*#__PURE__*/ (0, $7RevM$jsx)((0, $939b2a0a89587ff0$export$83e3640adca2e7dd), {
        ...props,
        name: "settings." + props.name
    });
};


var $816b32be081e2831$exports = {};

$parcel$export($816b32be081e2831$exports, "SettingsSwitchParameter", () => $816b32be081e2831$export$3065aa8c56548529);








const $b2d02bb79b9f923b$export$b5d5cf8927ab7262 = (props)=>{
    const { value: value, onChange: onChange, className: className, children: children } = props;
    const onChangeCheckbox = (0, $7RevM$useCallback)((event)=>{
        onChange?.(event.target.checked);
    }, [
        onChange
    ]);
    return /*#__PURE__*/ (0, $7RevM$jsxs)("label", {
        className: (0, $7RevM$classnames)("vh-toggle", className),
        children: [
            /*#__PURE__*/ (0, $7RevM$jsx)("span", {
                className: "vh-toggle-label",
                children: children
            }),
            /*#__PURE__*/ (0, $7RevM$jsx)("input", {
                className: "vh-toggle-checkbox",
                checked: value,
                onChange: onChangeCheckbox,
                type: "checkbox"
            }),
            /*#__PURE__*/ (0, $7RevM$jsx)("div", {
                className: "vh-toggle-switch"
            })
        ]
    });
};


const $9c17a374e8453403$export$8f36d349d8670328 = (props)=>{
    const { name: name, label: label = props.name, className: className = "vh-mt-3" } = props;
    const { control: control, getValues: getValues } = (0, $7RevM$useFormContext)() // retrieve all hook methods
    ;
    return /*#__PURE__*/ (0, $7RevM$jsx)((0, $7RevM$Controller), {
        render: ({ field: field })=>/*#__PURE__*/ (0, $7RevM$jsx)((0, $b2d02bb79b9f923b$export$b5d5cf8927ab7262), {
                className: className,
                onChange: field.onChange,
                value: field.value,
                children: label
            }),
        name: name,
        defaultValue: getValues(name) || false,
        shouldUnregister: true,
        control: control
    });
};


const $816b32be081e2831$export$3065aa8c56548529 = (props)=>{
    return /*#__PURE__*/ (0, $7RevM$jsx)((0, $9c17a374e8453403$export$8f36d349d8670328), {
        ...props,
        name: "settings." + props.name
    });
};


$parcel$exportWildcard($8b87bb17e3db19b5$exports, $b4cc80a948e954f2$exports);
$parcel$exportWildcard($8b87bb17e3db19b5$exports, $db98186b3469ed55$exports);
$parcel$exportWildcard($8b87bb17e3db19b5$exports, $f11cadc56915c353$exports);
$parcel$exportWildcard($8b87bb17e3db19b5$exports, $293e92f0e95e9550$exports);
$parcel$exportWildcard($8b87bb17e3db19b5$exports, $816b32be081e2831$exports);


var $0ef7f1eb9b79c543$exports = {};

$parcel$exportWildcard($0ef7f1eb9b79c543$exports, $c7b499d0c8fbfc3a$exports);




export {$ad6a7c3143400999$export$1178a94447621ed4 as createVarhubRoomAndClient, $dc6bedf7d60b80ba$export$57b65ef575b8a96b as getVarhubEnterParams, $dc6bedf7d60b80ba$export$43dc93b37e1cef48 as saveVarhubEnterParams, $0cac772cc8ad0209$export$281b4cc462f4fca as useVarhubInitialParams, $b4cc80a948e954f2$export$9b0e97c74cb15914 as VarhubEnterPage, $db98186b3469ed55$export$70faa2a42c1db4b3 as VarhubSelfControlEnterPage, $f11cadc56915c353$export$daabdb6a931ceba3 as SettingsInputParameter, $293e92f0e95e9550$export$9e54f45334aa4be5 as SettingsNumberParameter, $816b32be081e2831$export$3065aa8c56548529 as SettingsSwitchParameter, $c7b499d0c8fbfc3a$export$b6a89eec864391f as VarhubGameClientContext, $c7b499d0c8fbfc3a$export$fbf4fb5e7a74afa5 as VarhubGameClientProvider, $c7b499d0c8fbfc3a$export$d54a465aa59a4edc as useVarhubGameClient};
//# sourceMappingURL=index.mjs.map

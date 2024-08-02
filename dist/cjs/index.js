import "./index.css";
import {Varhub as $6FeVr$Varhub} from "@flinbein/varhub-web-client";
import {useRef as $6FeVr$useRef, useState as $6FeVr$useState, useCallback as $6FeVr$useCallback, useEffect as $6FeVr$useEffect, useMemo as $6FeVr$useMemo, useContext as $6FeVr$useContext, createContext as $6FeVr$createContext} from "react";
import {jsxs as $6FeVr$jsxs, Fragment as $6FeVr$Fragment, jsx as $6FeVr$jsx} from "react/jsx-runtime";
import {useForm as $6FeVr$useForm, FormProvider as $6FeVr$FormProvider, useFormContext as $6FeVr$useFormContext, Controller as $6FeVr$Controller} from "react-hook-form";
import $6FeVr$uselatestcallback from "use-latest-callback";
import $6FeVr$classnames from "classnames";


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
var $7a01227ec68604c5$exports = {};
var $6284b252915b3f38$exports = {};

$parcel$export($6284b252915b3f38$exports, "createVarhubRoomAndClient", () => $6284b252915b3f38$export$1178a94447621ed4);

async function $6284b252915b3f38$export$1178a94447621ed4(opts) {
    const { serverUrl: serverUrl, playerName: playerName, abortController: abortController, settings: settings = {}, importRoomModule: importRoomModule, roomIntegrity: roomIntegrity } = opts;
    let roomId = opts.roomId;
    const hub = new (0, $6FeVr$Varhub)(serverUrl);
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


var $3d95dcde1e828b40$exports = {};

$parcel$export($3d95dcde1e828b40$exports, "getVarhubEnterParams", () => $3d95dcde1e828b40$export$57b65ef575b8a96b);
$parcel$export($3d95dcde1e828b40$exports, "saveVarhubEnterParams", () => $3d95dcde1e828b40$export$43dc93b37e1cef48);
const $3d95dcde1e828b40$export$57b65ef575b8a96b = ()=>{
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
const $3d95dcde1e828b40$export$43dc93b37e1cef48 = (params)=>{
    const currentUrl = new URL(location.href);
    const state = {
        varhubEnterState: JSON.stringify(params || {})
    };
    currentUrl.search = "";
    history.replaceState(state, "", currentUrl);
};


$parcel$exportWildcard($7a01227ec68604c5$exports, $6284b252915b3f38$exports);
$parcel$exportWildcard($7a01227ec68604c5$exports, $3d95dcde1e828b40$exports);


var $c9af9da87eca7c70$exports = {};
var $25f0b79c685d9c85$exports = {};

$parcel$export($25f0b79c685d9c85$exports, "useVarhubInitialParams", () => $25f0b79c685d9c85$export$281b4cc462f4fca);


const $25f0b79c685d9c85$export$281b4cc462f4fca = ()=>{
    return (0, $6FeVr$useRef)((0, $3d95dcde1e828b40$export$57b65ef575b8a96b)()).current;
};


$parcel$exportWildcard($c9af9da87eca7c70$exports, $25f0b79c685d9c85$exports);


var $a69491ea5a126553$exports = {};
var $1bbfea496ecfa0e7$exports = {};

$parcel$export($1bbfea496ecfa0e7$exports, "VarhubEnterPage", () => $1bbfea496ecfa0e7$export$9b0e97c74cb15914);






const $e5740e6abd700f52$export$3b0d6d7590275603 = ({ size: size })=>{
    return /*#__PURE__*/ (0, $6FeVr$jsx)("span", {
        className: "vh-loader",
        style: {
            height: size,
            width: size
        }
    });
};



const $1ca5605b0c4bb855$export$60332b2344f7fe41 = (props)=>{
    const { children: children, title: title, actions: actions, loading: loading } = props;
    return /*#__PURE__*/ (0, $6FeVr$jsxs)("div", {
        className: (0, $6FeVr$classnames)("varhub-card"),
        children: [
            /*#__PURE__*/ (0, $6FeVr$jsxs)("div", {
                className: "varhub-card__content varhub-card__header",
                children: [
                    /*#__PURE__*/ (0, $6FeVr$jsx)("h2", {
                        className: "varhub-card__header__text",
                        children: title
                    }),
                    loading && /*#__PURE__*/ (0, $6FeVr$jsx)((0, $e5740e6abd700f52$export$3b0d6d7590275603), {
                        size: 24
                    })
                ]
            }),
            /*#__PURE__*/ (0, $6FeVr$jsx)("div", {
                className: "varhub-card__content varhub-card__body",
                children: children
            }),
            actions && /*#__PURE__*/ (0, $6FeVr$jsx)("div", {
                className: "varhub-card__content varhub-card__actions varhub-card__divider--top",
                children: actions
            }),
            /*#__PURE__*/ (0, $6FeVr$jsxs)("div", {
                className: "varhub-card__powered-by varhub-card__content varhub-card__divider--top",
                children: [
                    "Powered by ",
                    /*#__PURE__*/ (0, $6FeVr$jsx)("a", {
                        className: "varhub-card__link",
                        href: "https://github.com/flinbein/varhub-web-server",
                        children: "VarHub"
                    })
                ]
            })
        ]
    });
};








const $ac812a1e5ce0c2f1$export$c70e91bd96ab803a = (props)=>{
    const { name: name, placeholder: placeholder, label: label = props.name, className: className = "vh-mt-3", required: required = false, pattern: pattern, patternMessage: patternMessage } = props;
    const { register: register } = (0, $6FeVr$useFormContext)() // retrieve all hook methods
    ;
    const patternValidation = (0, $6FeVr$useMemo)(()=>{
        if (!pattern) return undefined;
        return {
            value: pattern,
            message: patternMessage || "Invalid pattern"
        };
    }, [
        pattern,
        patternMessage
    ]);
    return /*#__PURE__*/ (0, $6FeVr$jsxs)("div", {
        className: (0, $6FeVr$classnames)("varhub-parameter-input", className),
        children: [
            /*#__PURE__*/ (0, $6FeVr$jsx)("input", {
                placeholder: placeholder,
                type: "text",
                required: required,
                ...register(name, {
                    shouldUnregister: true,
                    required: required,
                    pattern: patternValidation
                })
            }),
            /*#__PURE__*/ (0, $6FeVr$jsx)("label", {
                children: label
            })
        ]
    });
};








const $81d537f484d35c5f$export$26b09f677ead9482 = ({ direction: direction })=>{
    return /*#__PURE__*/ (0, $6FeVr$jsx)("i", {
        className: (0, $6FeVr$classnames)("vh-arrow", direction)
    });
};



const $0e7f79ff83dadb38$export$d239b03507a9e5cc = ({ children: children })=>{
    const [expanded, setExpanded] = (0, $6FeVr$useState)(false);
    const onSwitchExpand = (0, $6FeVr$useCallback)(()=>{
        setExpanded((v)=>!v);
    }, [
        setExpanded
    ]);
    return /*#__PURE__*/ (0, $6FeVr$jsxs)("div", {
        className: "vh-settings-section varhub-card__divider--top",
        children: [
            /*#__PURE__*/ (0, $6FeVr$jsxs)("h5", {
                className: "vh-settings-section__title",
                children: [
                    "Settings",
                    /*#__PURE__*/ (0, $6FeVr$jsx)("a", {
                        className: (0, $6FeVr$classnames)("vh-settings-section__title__button", {
                            reversed: expanded
                        }),
                        onClick: onSwitchExpand,
                        type: "button",
                        children: /*#__PURE__*/ (0, $6FeVr$jsx)((0, $81d537f484d35c5f$export$26b09f677ead9482), {
                            direction: "down"
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0, $6FeVr$jsx)("div", {
                className: `vh-settings-section__body ${expanded ? "shown" : "hidden"}`,
                children: children
            })
        ]
    });
};





const $091a7791f97818e1$export$2c313f739c31196b = (props)=>{
    const { children: children, htmlType: htmlType, type: type = "primary", className: className, onClick: onClick, disabled: disabled, ...rest } = props;
    const handledOnChange = (e)=>{
        if (disabled) return;
        onClick?.(e);
    };
    return /*#__PURE__*/ (0, $6FeVr$jsx)("button", {
        type: htmlType,
        ...rest,
        onClick: handledOnChange,
        disabled: disabled,
        className: (0, $6FeVr$classnames)("varhub-button", className, {
            [`type-${type}`]: type
        }),
        children: children
    });
};







const $f1ce9053c23f07d7$export$83e3640adca2e7dd = (props)=>{
    const { name: name, placeholder: placeholder, label: label = props.name, className: className = "vh-mt-3", min: min, max: max, required: required = false } = props;
    const { register: register } = (0, $6FeVr$useFormContext)() // retrieve all hook methods
    ;
    const setValueAs = (0, $6FeVr$useCallback)((v)=>{
        const intValue = parseInt(v);
        if (isNaN(intValue)) return undefined;
        return intValue;
    }, []);
    return /*#__PURE__*/ (0, $6FeVr$jsxs)("div", {
        className: (0, $6FeVr$classnames)("varhub-parameter-input", className),
        children: [
            /*#__PURE__*/ (0, $6FeVr$jsx)("input", {
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
            /*#__PURE__*/ (0, $6FeVr$jsx)("label", {
                children: label
            })
        ]
    });
};




const $1bbfea496ecfa0e7$var$urlPattern = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
const $1bbfea496ecfa0e7$export$9b0e97c74cb15914 = (props)=>{
    const { children: children, initialParams: initialParams, className: className, darkMode: darkMode, onEnter: onEnter, abortController: abortController } = props;
    const [joinMode, setJoinMode] = (0, $6FeVr$useState)(initialParams?.roomId !== undefined);
    const switchJoinMode = (0, $6FeVr$useCallback)(()=>setJoinMode((v)=>!v), [
        setJoinMode
    ]);
    const formMethods = (0, $6FeVr$useForm)({
        defaultValues: initialParams,
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        shouldUseNativeValidation: true,
        delayError: 500,
        shouldFocusError: false
    });
    const onSubmit = (0, $6FeVr$uselatestcallback)((data)=>{
        onEnter?.({
            joinMode: data.roomId === undefined,
            serverUrl: data.serverUrl,
            roomId: data.roomId,
            playerName: data.playerName,
            settings: data.settings
        });
    });
    (0, $6FeVr$useEffect)(()=>{
        if (!initialParams?.autoJoin) return;
        onSubmit(formMethods.getValues());
    }, [
        initialParams?.autoJoin
    ]);
    const actions = /*#__PURE__*/ (0, $6FeVr$jsxs)((0, $6FeVr$Fragment), {
        children: [
            /*#__PURE__*/ (0, $6FeVr$jsx)((0, $091a7791f97818e1$export$2c313f739c31196b), {
                htmlType: "submit",
                disabled: abortController != null,
                children: joinMode ? "Join room" : "Create room"
            }),
            /*#__PURE__*/ (0, $6FeVr$jsx)((0, $091a7791f97818e1$export$2c313f739c31196b), {
                type: "secondary",
                htmlType: "button",
                onClick: switchJoinMode,
                className: "vh-ml-2",
                disabled: abortController != null,
                children: joinMode ? "Or create new room" : "Or join existing room"
            })
        ]
    });
    return /*#__PURE__*/ (0, $6FeVr$jsx)("div", {
        className: (0, $6FeVr$classnames)("varhub-page", className, {
            "dark-mode": darkMode
        }),
        children: /*#__PURE__*/ (0, $6FeVr$jsx)("form", {
            className: "varhub-form",
            onSubmit: formMethods.handleSubmit(onSubmit),
            children: /*#__PURE__*/ (0, $6FeVr$jsx)((0, $1ca5605b0c4bb855$export$60332b2344f7fe41), {
                title: "SpyFall",
                actions: actions,
                loading: abortController != null,
                children: /*#__PURE__*/ (0, $6FeVr$jsxs)((0, $6FeVr$FormProvider), {
                    ...formMethods,
                    children: [
                        /*#__PURE__*/ (0, $6FeVr$jsx)((0, $ac812a1e5ce0c2f1$export$c70e91bd96ab803a), {
                            required: true,
                            className: "vh-mt-2",
                            name: "serverUrl",
                            label: "Varhub server URL",
                            pattern: $1bbfea496ecfa0e7$var$urlPattern,
                            patternMessage: "Invalid url"
                        }),
                        /*#__PURE__*/ (0, $6FeVr$jsx)((0, $ac812a1e5ce0c2f1$export$c70e91bd96ab803a), {
                            required: true,
                            className: "vh-mt-3",
                            name: "playerName",
                            label: "Player name"
                        }),
                        joinMode && /*#__PURE__*/ (0, $6FeVr$jsx)((0, $f1ce9053c23f07d7$export$83e3640adca2e7dd), {
                            required: true,
                            min: 0,
                            className: "vh-mt-3",
                            name: "roomId",
                            label: "Room ID"
                        }),
                        children && !joinMode && /*#__PURE__*/ (0, $6FeVr$jsx)((0, $0e7f79ff83dadb38$export$d239b03507a9e5cc), {
                            children: children
                        })
                    ]
                })
            })
        })
    });
};


var $93cd45a1d9c70777$exports = {};

$parcel$export($93cd45a1d9c70777$exports, "VarhubSelfControlEnterPage", () => $93cd45a1d9c70777$export$70faa2a42c1db4b3);






var $98a95cc68aba17ed$exports = {};

$parcel$export($98a95cc68aba17ed$exports, "VarhubGameClientContext", () => $98a95cc68aba17ed$export$b6a89eec864391f);
$parcel$export($98a95cc68aba17ed$exports, "VarhubGameClientProvider", () => $98a95cc68aba17ed$export$fbf4fb5e7a74afa5);
$parcel$export($98a95cc68aba17ed$exports, "useVarhubGameClient", () => $98a95cc68aba17ed$export$d54a465aa59a4edc);


const $98a95cc68aba17ed$export$b6a89eec864391f = /*#__PURE__*/ (0, $6FeVr$createContext)(null);
const $98a95cc68aba17ed$export$fbf4fb5e7a74afa5 = ({ children: children })=>{
    const [client, setClient] = (0, $6FeVr$useState)(null);
    const ctxValue = (0, $6FeVr$useMemo)(()=>({
            client: client,
            setClient: setClient
        }), [
        client,
        setClient
    ]);
    return /*#__PURE__*/ (0, $6FeVr$jsx)($98a95cc68aba17ed$export$b6a89eec864391f.Provider, {
        value: ctxValue,
        children: children
    });
};
const $98a95cc68aba17ed$export$d54a465aa59a4edc = ()=>{
    return (0, $6FeVr$useContext)($98a95cc68aba17ed$export$b6a89eec864391f).client;
};


const $93cd45a1d9c70777$export$70faa2a42c1db4b3 = (props)=>{
    const { roomIntegrity: roomIntegrity, importRoomModule: importRoomModule, onEnter: onEnter, children: children, darkMode: darkMode } = props;
    const params = (0, $25f0b79c685d9c85$export$281b4cc462f4fca)();
    const ctx = (0, $6FeVr$useContext)((0, $98a95cc68aba17ed$export$b6a89eec864391f));
    const [abortController, setAbortController] = (0, $6FeVr$useState)(null);
    const onEnterPage = (0, $6FeVr$useCallback)(async (params)=>{
        const abortController = new AbortController();
        setAbortController(abortController);
        const client = await (0, $6284b252915b3f38$export$1178a94447621ed4)({
            ...params,
            roomIntegrity: roomIntegrity,
            importRoomModule: importRoomModule,
            abortController: abortController
        });
        setAbortController(null);
        onEnter(client);
        ctx.setClient(client);
        (0, $3d95dcde1e828b40$export$43dc93b37e1cef48)({
            ...params,
            roomId: client.roomId,
            autoJoin: true
        });
    }, [
        onEnter
    ]);
    return /*#__PURE__*/ (0, $6FeVr$jsx)((0, $1bbfea496ecfa0e7$export$9b0e97c74cb15914), {
        darkMode: darkMode,
        initialParams: params,
        onEnter: onEnterPage,
        abortController: abortController,
        children: children
    });
};


var $6049d54a1d81cbd3$exports = {};

$parcel$export($6049d54a1d81cbd3$exports, "SettingsInputParameter", () => $6049d54a1d81cbd3$export$daabdb6a931ceba3);


const $6049d54a1d81cbd3$export$daabdb6a931ceba3 = (props)=>{
    return /*#__PURE__*/ (0, $6FeVr$jsx)((0, $ac812a1e5ce0c2f1$export$c70e91bd96ab803a), {
        ...props,
        name: "settings." + props.name
    });
};


var $cca83cce3721b5e9$exports = {};

$parcel$export($cca83cce3721b5e9$exports, "SettingsNumberParameter", () => $cca83cce3721b5e9$export$9e54f45334aa4be5);


const $cca83cce3721b5e9$export$9e54f45334aa4be5 = (props)=>{
    return /*#__PURE__*/ (0, $6FeVr$jsx)((0, $f1ce9053c23f07d7$export$83e3640adca2e7dd), {
        ...props,
        name: "settings." + props.name
    });
};


var $c4d3ec0ae05874d6$exports = {};

$parcel$export($c4d3ec0ae05874d6$exports, "SettingsSwitchParameter", () => $c4d3ec0ae05874d6$export$3065aa8c56548529);








const $4bc3e749f98da928$export$b5d5cf8927ab7262 = (props)=>{
    const { value: value, onChange: onChange, className: className, children: children } = props;
    const onChangeCheckbox = (0, $6FeVr$useCallback)((event)=>{
        onChange?.(event.target.checked);
    }, [
        onChange
    ]);
    return /*#__PURE__*/ (0, $6FeVr$jsxs)("label", {
        className: (0, $6FeVr$classnames)("vh-toggle", className),
        children: [
            /*#__PURE__*/ (0, $6FeVr$jsx)("span", {
                className: "vh-toggle-label",
                children: children
            }),
            /*#__PURE__*/ (0, $6FeVr$jsx)("input", {
                className: "vh-toggle-checkbox",
                checked: value,
                onChange: onChangeCheckbox,
                type: "checkbox"
            }),
            /*#__PURE__*/ (0, $6FeVr$jsx)("div", {
                className: "vh-toggle-switch"
            })
        ]
    });
};


const $6398460098e0c024$export$8f36d349d8670328 = (props)=>{
    const { name: name, label: label = props.name, className: className = "vh-mt-3" } = props;
    const { control: control, getValues: getValues } = (0, $6FeVr$useFormContext)() // retrieve all hook methods
    ;
    return /*#__PURE__*/ (0, $6FeVr$jsx)((0, $6FeVr$Controller), {
        render: ({ field: field })=>/*#__PURE__*/ (0, $6FeVr$jsx)((0, $4bc3e749f98da928$export$b5d5cf8927ab7262), {
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


const $c4d3ec0ae05874d6$export$3065aa8c56548529 = (props)=>{
    return /*#__PURE__*/ (0, $6FeVr$jsx)((0, $6398460098e0c024$export$8f36d349d8670328), {
        ...props,
        name: "settings." + props.name
    });
};


$parcel$exportWildcard($a69491ea5a126553$exports, $1bbfea496ecfa0e7$exports);
$parcel$exportWildcard($a69491ea5a126553$exports, $93cd45a1d9c70777$exports);
$parcel$exportWildcard($a69491ea5a126553$exports, $6049d54a1d81cbd3$exports);
$parcel$exportWildcard($a69491ea5a126553$exports, $cca83cce3721b5e9$exports);
$parcel$exportWildcard($a69491ea5a126553$exports, $c4d3ec0ae05874d6$exports);


var $b996795923f57ee4$exports = {};

$parcel$exportWildcard($b996795923f57ee4$exports, $98a95cc68aba17ed$exports);




export {$6284b252915b3f38$export$1178a94447621ed4 as createVarhubRoomAndClient, $3d95dcde1e828b40$export$57b65ef575b8a96b as getVarhubEnterParams, $3d95dcde1e828b40$export$43dc93b37e1cef48 as saveVarhubEnterParams, $25f0b79c685d9c85$export$281b4cc462f4fca as useVarhubInitialParams, $1bbfea496ecfa0e7$export$9b0e97c74cb15914 as VarhubEnterPage, $93cd45a1d9c70777$export$70faa2a42c1db4b3 as VarhubSelfControlEnterPage, $6049d54a1d81cbd3$export$daabdb6a931ceba3 as SettingsInputParameter, $cca83cce3721b5e9$export$9e54f45334aa4be5 as SettingsNumberParameter, $c4d3ec0ae05874d6$export$3065aa8c56548529 as SettingsSwitchParameter, $98a95cc68aba17ed$export$b6a89eec864391f as VarhubGameClientContext, $98a95cc68aba17ed$export$fbf4fb5e7a74afa5 as VarhubGameClientProvider, $98a95cc68aba17ed$export$d54a465aa59a4edc as useVarhubGameClient};
//# sourceMappingURL=index.js.map

import {FC, PropsWithChildren, ReactNode, useCallback, useEffect, useMemo, useState} from "react";
import {Card} from "./Card/Card";
import {FormProvider, useForm} from "react-hook-form";
import {VarhubInputParameter} from "./parameter/VarhubInputParameter";

import {SettingsSection} from "./settings/SettingsSection";
import {VarhubButton} from "./Button/VarhubButton";
import {VarhubNumberParameter} from "./parameter/VarhubNumberParameter";
import useLatestCallback from "use-latest-callback";
import cn from "classnames";
import {VarhubEnterParams} from "../util/varhubParams";

const urlPattern =
    /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;


export interface OnEnterRoomOpts {
    joinMode: boolean;
    serverUrl: string;
    roomId: string;
    playerName: string;
    settings?: any;
}

interface VarhubEnterPageProps {
    initialParams?: VarhubEnterParams

    className?: string;
    darkMode?: boolean;
    onEnter?: (opts: OnEnterRoomOpts) => Promise<void>;
    error?: ReactNode|null
    abortController?: AbortController|null;
}

export const VarhubEnterPage: FC<PropsWithChildren<VarhubEnterPageProps>> = (props) => {
    const {children, initialParams, className, error, darkMode, onEnter, abortController} = props;

    const [joinMode, setJoinMode] = useState(initialParams?.roomId !== undefined);
    const switchJoinMode = useCallback(() => setJoinMode(v => !v), [setJoinMode])

    const formMethods = useForm({
        defaultValues: initialParams,
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        shouldUseNativeValidation: true,
        delayError: 500,
        shouldFocusError: false
    });

    const onSubmit = useLatestCallback(async (data) => {
        console.log("JOIn",data.roomId === undefined);
        await onEnter?.({
            joinMode: data.roomId !== undefined,
            serverUrl: data.serverUrl,
            roomId: data.roomId,
            playerName: data.playerName,
            settings: data.settings
        })
    })

    useEffect(() => {
        if (!initialParams?.autoJoin) return;
        onSubmit(formMethods.getValues())
    }, [initialParams?.autoJoin])

    const actions = (
        <>
            <VarhubButton htmlType="submit" disabled={abortController != null}>
                {joinMode ? "Join room" : "Create room"}
            </VarhubButton>
            <VarhubButton
                type="secondary"
                htmlType="button"
                onClick={switchJoinMode}
                className="vh-ml-2"
                disabled={abortController != null}
            >
                {joinMode ? "Or create new room" : "Or join existing room"}
            </VarhubButton>
        </>
    )

    return (
        <div className={cn("varhub-page", className, {"dark-mode": darkMode})}>
            <form
                className="varhub-form"
                onSubmit={formMethods.handleSubmit(onSubmit)}
            >
                <Card title={"SpyFall"} actions={actions} loading={abortController != null} error={error}>
                    <FormProvider {...formMethods}>
                        <VarhubInputParameter
                            required
                            className="vh-mt-2"
                            name="serverUrl"
                            label="Varhub server URL"
                            pattern={urlPattern}
                            patternMessage="Invalid url"
                        />
                        <VarhubInputParameter required className="vh-mt-3" name="playerName" label="Player name"/>
                        {joinMode && <VarhubNumberParameter required min={0} className="vh-mt-3" name="roomId" label="Room ID"/>}
                        {children && !joinMode && (
                            <SettingsSection>
                                {children}
                            </SettingsSection>
                        )}
                    </FormProvider>
                </Card>
            </form>
    </div>
    )
}
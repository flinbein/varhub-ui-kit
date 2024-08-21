import {FC, PropsWithChildren, useCallback, useContext, useState} from "react";
import {OnEnterRoomOpts, VarhubEnterPage} from "./VarhubEnterPage";
import {useVarhubInitialParams} from "../hook/useVarhubInitialParams";
import {CreateRoomAndClientOpts, createVarhubRoomAndClient} from "../util/roomUtils";
import type {VarhubClient} from "@flinbein/varhub-web-client";
import {saveVarhubEnterParams, VarhubEnterParams, VarhubInitialEnterParams} from "../util/varhubParams";
import {VarhubGameClientContext} from "../context/VarhubGameClientContext";

interface VarhubSelfControlEnterPageProps {
    initialParams?: VarhubInitialEnterParams
    darkMode?: boolean;
    roomIntegrity: string;
    importRoomModule: CreateRoomAndClientOpts["importRoomModule"]
    onEnter?: (client: VarhubClient) => void;
}

export const VarhubSelfControlEnterPage: FC<PropsWithChildren<VarhubSelfControlEnterPageProps>> = (props) => {
    const {roomIntegrity, importRoomModule, onEnter, children, darkMode, initialParams} = props;

    const params = useVarhubInitialParams(initialParams);
    const [error, setError] = useState(null)
    const ctx = useContext(VarhubGameClientContext);
    const [abortController, setAbortController] = useState<AbortController|null>(null);

    const onEnterPage = useCallback(async (params: OnEnterRoomOpts) => {
        setError(null);
        const abortController = new AbortController();
        setAbortController(abortController);
        let client: VarhubClient|null = null;
        try {
            client = await createVarhubRoomAndClient({
                ...params,
                roomIntegrity,
                importRoomModule,
                abortController
            });
            onEnter?.(client);
            ctx.setClient(client)
            saveVarhubEnterParams({
                ...params,
                roomId: client.roomId,
                autoJoin: true
            })
        } catch (err) {
            const actionText = params.joinMode ? "connect to" : "create"
            setError(`Error while trying to ${actionText} room`);
            console.error(err);
        } finally {
            setAbortController(null);
        }
    }, [onEnter])

    return (
        <VarhubEnterPage
            darkMode={darkMode}
            initialParams={params}
            onEnter={onEnterPage}
            abortController={abortController}
            error={error}
        >
            {children}
        </VarhubEnterPage>
    )
}
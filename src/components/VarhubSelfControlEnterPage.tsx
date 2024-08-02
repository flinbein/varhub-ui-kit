import {FC, PropsWithChildren, useCallback, useContext, useState} from "react";
import {OnEnterRoomOpts, VarhubEnterPage} from "./VarhubEnterPage";
import {useVarhubInitialParams} from "../hook/useVarhubInitialParams";
import {CreateRoomAndClientOpts, createVarhubRoomAndClient} from "../util/roomUtils";
import type {VarhubClient} from "@flinbein/varhub-web-client";
import {saveVarhubEnterParams} from "../util/varhubParams";
import {VarhubGameClientContext} from "../context/VarhubGameClientContext";

interface VarhubSelfControlEnterPageProps {
    darkMode?: boolean;
    roomIntegrity: string;
    importRoomModule: CreateRoomAndClientOpts["importRoomModule"]
    onEnter?: (client: VarhubClient) => void;
}

export const VarhubSelfControlEnterPage: FC<PropsWithChildren<VarhubSelfControlEnterPageProps>> = (props) => {
    const {roomIntegrity, importRoomModule, onEnter, children, darkMode} = props;

    const params = useVarhubInitialParams();
    const ctx = useContext(VarhubGameClientContext);
    const [abortController, setAbortController] = useState<AbortController|null>(null);

    const onEnterPage = useCallback(async (params: OnEnterRoomOpts) => {
        const abortController = new AbortController();
        setAbortController(abortController);
        const client = await createVarhubRoomAndClient({
            ...params,
            roomIntegrity,
            importRoomModule,
            abortController
        });
        setAbortController(null);
        onEnter?.(client);
        ctx.setClient(client)
        saveVarhubEnterParams({
            ...params,
            roomId: client.roomId,
            autoJoin: true
        })
    }, [onEnter])

    return (
        <VarhubEnterPage
            darkMode={darkMode}
            initialParams={params}
            onEnter={onEnterPage}
            abortController={abortController}
        >
            {children}
        </VarhubEnterPage>
    )
}
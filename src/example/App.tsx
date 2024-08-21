import {FC, useCallback} from "react";
import {VarhubGameClientProvider} from "../context";
import {SettingsInputParameter, SettingsNumberParameter, SettingsSwitchParameter, VarhubSelfControlEnterPage} from "../components";


import roomIntegrity from "varhub-modules-integrity:./game:index.ts";

export const App: FC = () => {
    const onEnter = useCallback((client) => {
        console.log("LOGGED IN WITH CLIENT", client);
    }, [])

    return (
        <VarhubGameClientProvider>
            <VarhubSelfControlEnterPage
                darkMode
                onEnter={onEnter}
                roomIntegrity={roomIntegrity}
                importRoomModule={() => import("varhub-modules:./game:index.ts")}
                initialParams={{serverUrl: "https://varhub.flinbein.ru"}}
            >
                <SettingsNumberParameter name={"maxScore"} min={3} label="Max score"/>
                <SettingsInputParameter name={"chatGPTUrl"} label="ChatGPT Url"/>
                <SettingsSwitchParameter name={"infiniteGame"} label="Infinite game"/>
            </VarhubSelfControlEnterPage>
        </VarhubGameClientProvider>
    )
}
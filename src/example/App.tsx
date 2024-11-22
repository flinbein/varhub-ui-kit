import {FC, useCallback} from "react";
import {VarhubGameClientProvider} from "../context";
import {SettingsInputParameter, SettingsNumberParameter, SettingsSwitchParameter, VarhubSelfControlEnterPage} from "../components";


import roomIntegrity from "./game?varhub-bundle:integrity";

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
                importRoomModule={() => import("./game/index.ts?varhub-bundle")}
                initialParams={{serverUrl: "https://varhub.flinbein.ru"}}
            >
                <SettingsNumberParameter name={"maxScore"} min={3} label="Max score"/>
                <SettingsInputParameter name={"chatGPTUrl"} label="ChatGPT Url"/>
                <SettingsSwitchParameter name={"infiniteGame"} label="Infinite game"/>
            </VarhubSelfControlEnterPage>
        </VarhubGameClientProvider>
    )
}
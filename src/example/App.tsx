import {FC, useCallback} from "react";
import {VarhubGameClientProvider} from "../context/VarhubGameClientContext";
import {SettingsInputParameter} from "../components/settings/SettingsInputParameter";
import {SettingsNumberParameter} from "../components/settings/SettingsNumberParameter";
import {SettingsSwitchParameter} from "../components/settings/SettingsSwitchParameter";


import roomIntegrity from "varhub-modules-integrity:./game:index.ts";
import {VarhubSelfControlEnterPage} from "../components/VarhubSelfControlEnterPage";

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
            >
                <SettingsNumberParameter name={"maxScore"} min={3} label="Max score"/>
                <SettingsInputParameter name={"chatGPTUrl"} label="ChatGPT Url"/>
                <SettingsSwitchParameter name={"infiniteGame"} label="Infinite game"/>
            </VarhubSelfControlEnterPage>
        </VarhubGameClientProvider>
    )
}
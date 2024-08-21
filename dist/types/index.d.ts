import { VarhubClient } from "@flinbein/varhub-web-client";
import { FC, PropsWithChildren, ReactNode } from "react";
export interface CreateRoomAndClientOpts {
    serverUrl: string;
    playerName: string;
    roomId?: string;
    abortController: AbortController;
    settings?: any;
    importRoomModule: () => Promise<{
        roomIntegrity: string;
        roomModule: {
            main: string;
            source: Record<string, string>;
        };
    }>;
    roomIntegrity: string;
}
export function createVarhubRoomAndClient(opts: CreateRoomAndClientOpts): Promise<VarhubClient<any, any>>;
export interface VarhubInitialEnterParams {
    serverUrl?: string;
    settings?: any;
}
export interface VarhubEnterParams extends VarhubInitialEnterParams {
    roomId?: string;
    playerName?: string;
    autoJoin?: boolean;
}
export const getVarhubEnterParams: (initialParams: VarhubInitialEnterParams) => VarhubEnterParams;
export const saveVarhubEnterParams: (params: VarhubEnterParams) => void;
export const useVarhubInitialParams: (initialParams: VarhubInitialEnterParams) => import("util/varhubParams").VarhubEnterParams;
interface VarhubInputParameterProps {
    name: string;
    placeholder?: string;
    label?: string;
    className?: string;
    required?: boolean;
    pattern?: RegExp;
    patternMessage?: string;
}
interface VarhubNumberParameterProps {
    name: string;
    placeholder?: string;
    label?: string;
    className?: string;
    required?: boolean;
    min?: number;
    max?: number;
}
export interface OnEnterRoomOpts {
    joinMode: boolean;
    serverUrl: string;
    roomId: string;
    playerName: string;
    settings?: any;
}
interface VarhubEnterPageProps {
    initialParams?: VarhubEnterParams;
    className?: string;
    darkMode?: boolean;
    onEnter?: (opts: OnEnterRoomOpts) => Promise<void>;
    error?: ReactNode | null;
    abortController?: AbortController | null;
}
export const VarhubEnterPage: FC<PropsWithChildren<VarhubEnterPageProps>>;
interface IVarhubGameClientContext {
    client: VarhubClient<any, any> | null;
    setClient: (client: VarhubClient<any, any>) => void;
}
export const VarhubGameClientContext: import("react").Context<IVarhubGameClientContext>;
export const VarhubGameClientProvider: FC<PropsWithChildren>;
export const useVarhubGameClient: <CLIENT>() => CLIENT | null;
interface VarhubSelfControlEnterPageProps {
    initialParams?: VarhubInitialEnterParams;
    darkMode?: boolean;
    roomIntegrity: string;
    importRoomModule: CreateRoomAndClientOpts["importRoomModule"];
    onEnter?: (client: VarhubClient) => void;
}
export const VarhubSelfControlEnterPage: FC<PropsWithChildren<VarhubSelfControlEnterPageProps>>;
export const SettingsInputParameter: FC<VarhubInputParameterProps>;
export const SettingsNumberParameter: FC<VarhubNumberParameterProps>;
interface VarhubSwitchParameterProps {
    name: string;
    label?: string;
    className?: string;
}
export const SettingsSwitchParameter: FC<VarhubSwitchParameterProps>;

//# sourceMappingURL=index.d.ts.map

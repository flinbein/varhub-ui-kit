import { Context } from 'react';
import { FC } from 'react';
import { PropsWithChildren } from 'react';
import { ReactNode } from 'react';
import { Varhub } from '@flinbein/varhub-web-client';
import { VarhubClient } from '@flinbein/varhub-web-client';
import type * as VHRoomBundle from '*?varhub-bundle';

export declare interface CreateRoomAndClientOpts {
    engine?: Engine;
    roomPublicMessage?: string;
    serverUrl: string;
    playerName: string;
    roomId?: string;
    settings?: any;
    importRoomModule: () => Promise<typeof VHRoomBundle>;
    roomIntegrity: string;
}

export declare function createVarhubRoomAndClient(opts: CreateRoomAndClientOpts): Promise<{
    roomId: string;
    client: any;
    playerName: string;
}>;

export declare type Engine = Parameters<Varhub["createRoom"]>[0];

export declare const getVarhubEnterParams: (initialParams: VarhubInitialEnterParams) => VarhubEnterParams;

declare interface IVarhubGameClientContext {
    client: VarhubClient | null;
    setClient: (client: VarhubClient) => void;
}

export declare interface OnEnterRoomOpts {
    joinMode: boolean;
    serverUrl: string;
    roomId: string;
    playerName: string;
    settings?: any;
}

export declare const saveVarhubEnterParams: (params: VarhubEnterParams) => void;

export declare const SettingsInputParameter: FC<VarhubInputParameterProps>;

export declare const SettingsNumberParameter: FC<VarhubNumberParameterProps>;

export declare const SettingsSwitchParameter: FC<VarhubSwitchParameterProps>;

export declare const useVarhubGameClient: <CLIENT>() => CLIENT | null;

export declare const useVarhubInitialParams: (initialParams: VarhubInitialEnterParams) => VarhubEnterParams;

export declare const VarhubEnterPage: FC<PropsWithChildren<VarhubEnterPageProps>>;

declare interface VarhubEnterPageProps {
    initialParams?: VarhubEnterParams;
    title?: ReactNode;
    className?: string;
    darkMode?: boolean;
    onEnter?: (opts: OnEnterRoomOpts) => Promise<void>;
    error?: ReactNode | null;
    abortController?: AbortController | null;
}

export declare interface VarhubEnterParams extends VarhubInitialEnterParams {
    roomId?: string;
    playerName?: string;
    autoJoin?: boolean;
}

export declare const VarhubGameClientContext: Context<IVarhubGameClientContext>;

export declare const VarhubGameClientProvider: FC<PropsWithChildren>;

export declare interface VarhubInitialEnterParams {
    serverUrl?: string;
    settings?: any;
}

declare interface VarhubInputParameterProps {
    name: string;
    placeholder?: string;
    label?: string;
    className?: string;
    required?: boolean;
    pattern?: RegExp;
    patternMessage?: string;
}

declare interface VarhubNumberParameterProps {
    name: string;
    placeholder?: string;
    label?: string;
    className?: string;
    required?: boolean;
    min?: number;
    max?: number;
}

export declare const VarhubSelfControlEnterPage: FC<PropsWithChildren<VarhubSelfControlEnterPageProps>>;

declare interface VarhubSelfControlEnterPageProps {
    initialParams?: VarhubInitialEnterParams;
    darkMode?: boolean;
    roomIntegrity: string;
    title?: ReactNode;
    importRoomModule: CreateRoomAndClientOpts["importRoomModule"];
    onEnter?: (client: VarhubClient) => void;
}

declare interface VarhubSwitchParameterProps {
    name: string;
    label?: string;
    className?: string;
}

export { }

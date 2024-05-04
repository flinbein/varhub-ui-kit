export interface VarhubEnterParams {
    serverUrl?: string;
    roomId?: string;
    playerName?: string;
    autoJoin?: boolean;
    settings?: any;
}

export const getVarhubEnterParams = ():VarhubEnterParams  => {
    const searchParams = new URLSearchParams(location.search);

    const varhubEnterState = JSON.parse(history?.state?.varhubEnterState || "{}") as VarhubEnterParams
    const serverUrl = searchParams.get("serverUrl") ?? varhubEnterState.serverUrl ?? undefined;
    const roomId = searchParams.get("roomId") ?? varhubEnterState.roomId ?? undefined;

    const playerName = varhubEnterState.playerName ?? undefined;
    const settings = varhubEnterState.settings ?? {};
    const autoJoin = varhubEnterState.autoJoin ?? false;

    return {
        serverUrl, roomId, playerName, autoJoin, settings
    }
}

export const saveVarhubEnterParams = (params: VarhubEnterParams) => {
    const currentUrl = new URL(location.href);
    const state = {varhubEnterState: JSON.stringify(params || {})}
    currentUrl.search = "";
    history.replaceState(state, "", currentUrl);
}
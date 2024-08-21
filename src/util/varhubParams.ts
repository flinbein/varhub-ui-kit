export interface VarhubInitialEnterParams {
    serverUrl?: string;
    settings?: any;
}

export interface VarhubEnterParams  extends  VarhubInitialEnterParams{
    roomId?: string;
    playerName?: string;
    autoJoin?: boolean;
}



export const getVarhubEnterParams = (initialParams: VarhubInitialEnterParams):VarhubEnterParams  => {
    const searchParams = new URLSearchParams(location.search);

    const varhubEnterState = JSON.parse(history?.state?.varhubEnterState || "{}") as VarhubEnterParams
    const serverUrl = searchParams.get("serverUrl") ?? varhubEnterState.serverUrl ?? initialParams.serverUrl ?? undefined;
    const roomId = searchParams.get("roomId") ?? varhubEnterState.roomId ?? undefined;

    const playerName = varhubEnterState.playerName ?? undefined;
    const settings = varhubEnterState.settings ?? initialParams.settings ?? {};
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
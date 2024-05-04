import {Varhub, VarhubClient} from "@flinbein/varhub-web-client";

export interface CreateRoomAndClientOpts {
    serverUrl: string;
    roomId?: string;
    playerName: string;

    abortController: AbortController;
    settings?: any;

    importRoomModule: () => Promise<{roomIntegrity: string; roomModule: { main: string, source: Record<string, string>}}>
    roomIntegrity: string;
}

export async function createVarhubRoomAndClient(opts: CreateRoomAndClientOpts){
    const {serverUrl, playerName, abortController, settings = {}, importRoomModule, roomIntegrity} = opts;

    let roomId = opts.roomId;

    const hub = new Varhub(serverUrl);

    if (!roomId) {
        const { roomModule, roomIntegrity} = await importRoomModule();
        const roomData = await hub.createRoom(roomModule, {integrity: roomIntegrity, config: settings});
        roomId = roomData.id;
        console.log("ROOM CREATED", roomData);
    }
    console.log("JOIN ROOM", roomId, playerName, roomIntegrity);
    return await hub.join(roomId, playerName, {integrity: roomIntegrity, timeout: abortController?.signal}) as any as VarhubClient<any, any>;
}


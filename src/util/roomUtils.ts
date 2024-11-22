import {Varhub, VarhubClient} from "@flinbein/varhub-web-client";
import type * as VHRoomBundle from "*?varhub-bundle";

export type Engine = Parameters<Varhub["createRoom"]>[0];

export interface CreateRoomAndClientOpts {
    engine?: Engine
    roomPublicMessage?: string;
    serverUrl: string;
    playerName: string;
    roomId?: string;

    settings?: any;

    importRoomModule: () => Promise<typeof VHRoomBundle>;
    roomIntegrity: string;
}

export async function createVarhubRoomAndClient(opts: CreateRoomAndClientOpts){
    const {
        serverUrl,
        playerName,
        settings = {},
        importRoomModule,
        roomIntegrity,
        engine = "ivm",
        roomPublicMessage
    } = opts;

    let roomId = opts.roomId;

    const hub = new Varhub(serverUrl);

    if (!roomId) {
        const {integrity, module} = await importRoomModule();
        const roomData = await hub.createRoom(engine, {module, integrity, config: settings, message: roomPublicMessage});
        roomId = roomData.id;
    }
    const client = hub.join(roomId, {params: [playerName], integrity: roomIntegrity})
    return {roomId, client, playerName};
}


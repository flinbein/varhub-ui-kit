import {createContext, FC, PropsWithChildren, useContext, useMemo, useState} from "react";
import type {VarhubClient} from "@flinbein/varhub-web-client";

interface IVarhubGameClientContext {
    client: VarhubClient<any, any>|null;
    setClient: (client: VarhubClient<any, any>) => void;
}

export const VarhubGameClientContext = createContext<IVarhubGameClientContext>(null as any);

export const VarhubGameClientProvider: FC<PropsWithChildren> = ({children}) => {
    const [client, setClient] = useState< VarhubClient<any, any> | null >(null);

    const ctxValue = useMemo(() => ({client, setClient}), [client, setClient])

    return (
        <VarhubGameClientContext.Provider value={ctxValue}>
            {children}
        </VarhubGameClientContext.Provider>
    )
}

export const useVarhubGameClient = <CLIENT,>(): CLIENT|null => {
    return useContext(VarhubGameClientContext).client as CLIENT|null;
}
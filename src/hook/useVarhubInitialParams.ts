import {useRef} from "react";
import {getVarhubEnterParams, VarhubInitialEnterParams} from "../util/varhubParams";

export const useVarhubInitialParams = (initialParams: VarhubInitialEnterParams) => {
    return useRef(getVarhubEnterParams(initialParams)).current
}
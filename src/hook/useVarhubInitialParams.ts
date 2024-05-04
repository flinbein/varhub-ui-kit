import {useRef} from "react";
import {getVarhubEnterParams} from "../util/varhubParams";

export const useVarhubInitialParams = () => {
    return useRef(getVarhubEnterParams()).current
}
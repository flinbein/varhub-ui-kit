import {FC} from "react";
import {VarhubNumberParameter, VarhubNumberParameterProps} from "../parameter/VarhubNumberParameter";


export const SettingsNumberParameter: FC<VarhubNumberParameterProps> = (props) => {

    return (
        <VarhubNumberParameter {...props} name={"settings."+props.name}/>
    )
}
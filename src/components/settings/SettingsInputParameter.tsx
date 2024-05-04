import {FC} from "react";
import {VarhubInputParameter, VarhubInputParameterProps} from "../parameter/VarhubInputParameter";


export const SettingsInputParameter: FC<VarhubInputParameterProps> = (props) => {

    return (
        <VarhubInputParameter {...props} name={"settings."+props.name}/>
    )
}
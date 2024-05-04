import {FC} from "react";
import {VarhubSwitchParameter, VarhubSwitchParameterProps} from "../parameter/VarhubSwitchParameter";


export const SettingsSwitchParameter: FC<VarhubSwitchParameterProps> = (props) => {

    return (
        <VarhubSwitchParameter {...props} name={"settings."+props.name}/>
    )
}
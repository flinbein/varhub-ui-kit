import {Controller, useFormContext} from "react-hook-form";
import {FC, useEffect} from "react";
import cn from "classnames"

import "./VarhubParameter.css"
import {useRandomId} from "../../util/useRandomId";
import {Switch} from "../Switch/Switch";

export interface VarhubSwitchParameterProps {
    name: string;
    label?: string;
    className?: string;
}

export const VarhubSwitchParameter: FC<VarhubSwitchParameterProps> = (props) => {
    const {
        name,
        label = props.name,
        className = "vh-mt-3"
    } = props;
    const {control, getValues} = useFormContext() // retrieve all hook methods

    return (
        <Controller
            render={({field}) => <Switch className={className} onChange={field.onChange} value={field.value}>{label}</Switch>}
            name={name}
            defaultValue={getValues(name)||false}
            shouldUnregister={true}
            control={control}
        />
    )
}
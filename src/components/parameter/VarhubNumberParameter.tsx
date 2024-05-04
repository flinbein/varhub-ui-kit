import {useFormContext} from "react-hook-form";
import {FC, useCallback} from "react";
import cn from "classnames"

import "./VarhubParameter.css"

export interface VarhubNumberParameterProps {
    name: string;
    placeholder?: string;
    label?: string;
    className?: string;

    required?: boolean;
    min?: number;
    max?: number;
}

export const VarhubNumberParameter: FC<VarhubNumberParameterProps> = (props) => {
    const {
        name,
        placeholder,
        label = props.name,
        className = "vh-mt-3",
        min,
        max,
        required = false,
    } = props;
    const { register} = useFormContext() // retrieve all hook methods

    const setValueAs = useCallback((v) => {
        const intValue = parseInt(v);
        if (isNaN(intValue)) return undefined;
        return intValue;
    }, [])

    return (
        <div className={cn("varhub-parameter-input", className)}>
            <input
                placeholder={placeholder}
                type="number"
                min={min}
                max={max}
                {...register(name, {min, max, shouldUnregister: true, required, setValueAs})}
            />
            <label>{label}</label>
        </div>
    )
}
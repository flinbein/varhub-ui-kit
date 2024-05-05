import {useFormContext} from "react-hook-form";
import {FC, useMemo} from "react";
import cn from "classnames"

import "./VarhubParameter.css"

export interface VarhubInputParameterProps {
    name: string;
    placeholder?: string;
    label?: string;
    className?: string;
    required?: boolean;
    pattern?: RegExp
    patternMessage?: string;
}

export const VarhubInputParameter: FC<VarhubInputParameterProps> = (props) => {
    const {
        name,
        placeholder,
        label = props.name,
        className = "vh-mt-3",
        required= false,
        pattern,
        patternMessage
    } = props;
    const { register} = useFormContext() // retrieve all hook methods

    const patternValidation = useMemo(() => {
        if (!pattern) return undefined;
        return {value: pattern, message: patternMessage || "Invalid pattern"}
    }, [pattern, patternMessage])

    return (
        <div className={cn("varhub-parameter-input", className)}>
            <input placeholder={placeholder} type="text" required={required} {...register(name, {shouldUnregister: true, required, pattern: patternValidation })}/>
            <label>{label}</label>
        </div>
    )
}
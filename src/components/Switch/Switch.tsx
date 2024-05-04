import {FC, PropsWithChildren, useCallback} from "react";

import "./Switch.css"
import cn from "classnames";

interface SwitchProps {
    value?: boolean;
    onChange?: (value: boolean) => void;
    className?: string;
}

export const Switch: FC<PropsWithChildren<SwitchProps>> = (props) => {
    const {value, onChange, className, children} = props;

    const onChangeCheckbox = useCallback((event) => {
        onChange?.(event.target.checked);
    }, [onChange])

    return (
        <label className={cn("vh-toggle", className)}>
            <span className="vh-toggle-label">{children}</span>
            <input className="vh-toggle-checkbox" checked={value} onChange={onChangeCheckbox} type="checkbox"/>
            <div className="vh-toggle-switch"></div>
        </label>
    )
}
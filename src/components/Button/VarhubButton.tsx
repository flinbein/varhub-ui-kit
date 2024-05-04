import {ButtonHTMLAttributes, FC, PropsWithChildren} from "react";
import cn from "classnames";

import "./VarhubButton.css"

interface VarhubButtonProps {
    className?: string;
    role?: ButtonHTMLAttributes<any>["role"];
    htmlType?: ButtonHTMLAttributes<any>["type"];
    onClick?: ButtonHTMLAttributes<any>["onClick"];
    type?: string
    disabled?: boolean;
}

export const VarhubButton: FC<PropsWithChildren<VarhubButtonProps>> = (props) => {
    const {
        children,
        htmlType,
        type = "primary",
        className,
        onClick,
        disabled,
        ...rest
    } = props;

    const handledOnChange = (e) => {
        if (disabled) {
            return;
        }
        onClick?.(e);
    }

    return (
        <button
            type={htmlType}
            {...rest}
            onClick={handledOnChange}
            disabled={disabled}
            className={cn("varhub-button", className, {[`type-${type}`]: type})}
        >
            {children}
        </button>
    )
}


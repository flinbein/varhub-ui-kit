import {FC} from "react";

import "./ArrowIcon.css"
import cn from "classnames";

interface ArrowIconProps {
    direction: "left" | "right" | "up" | "down";
}

export const ArrowIcon: FC<ArrowIconProps> = ({direction}) => {

    return (
        <i className={cn("vh-arrow", direction)}></i>
    )
}
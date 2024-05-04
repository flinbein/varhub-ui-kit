import {FC} from "react";
import "./Loader.css"

interface LoaderProps {
    size: number;
}

export const Loader: FC<LoaderProps> = ({size}) => {
    return (
        <span className="vh-loader" style={{height: size, width: size}}></span>
    )
}
import {FC, PropsWithChildren, ReactNode} from "react";
import cn from "classnames";
import {Switch} from "../Switch/Switch";
import {Loader} from "../Loader/Loader";

// @ts-ignore
import("./Card.css")

interface CardProps {
    title: string;
    actions?: ReactNode
    loading?: boolean;
}

export const Card: FC<PropsWithChildren<CardProps>> = (props) => {
    const {children, title, actions, loading} = props;

    return (
        <div className={cn("varhub-card")}>
            <div className="varhub-card__content varhub-card__header">
                <h2 className="varhub-card__header__text">{title}</h2>
                {loading && <Loader size={24}/>}
            </div>
            <div className="varhub-card__content varhub-card__body">
                {children}
            </div>

            {actions && (
                <div className="varhub-card__content varhub-card__actions varhub-card__divider--top">
                    {actions}
                </div>
            )}

            <div className="varhub-card__powered-by varhub-card__content varhub-card__divider--top">
                Powered by <a className="varhub-card__link" href="https://github.com/flinbein/varhub-web-server">VarHub</a>
            </div>
        </div>
    )
}
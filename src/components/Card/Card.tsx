import {FC, PropsWithChildren, ReactNode} from "react";
import cn from "classnames";
import {Loader} from "../Loader/Loader";

import "./Card.css";

interface CardProps {
    title: string;
    actions?: ReactNode
    loading?: boolean;
    error?: ReactNode|null
}

export const Card: FC<PropsWithChildren<CardProps>> = (props) => {
    const {children, title, actions, loading, error} = props;

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

            {error && (
                <div className="varhub-card__error varhub-card__content varhub-card__divider--top">
                    {error}
                </div>
            )}

            <div className="varhub-card__powered-by varhub-card__content varhub-card__divider--top">
                Powered by <a className="varhub-card__link" href="https://github.com/flinbein/varhub-web-server">VarHub</a>
            </div>
        </div>
    )
}
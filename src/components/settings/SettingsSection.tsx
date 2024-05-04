import {FC, PropsWithChildren, useCallback, useState} from "react";

import "./Settings.css";
import {ArrowIcon} from "../icon/ArrowIcon";
import cn from "classnames";

export const SettingsSection: FC<PropsWithChildren> = ({children}) => {

    const [expanded, setExpanded] = useState(false);

    const onSwitchExpand = useCallback(() => {
        setExpanded(v => !v);
    }, [setExpanded])

    return (
        <div className="vh-settings-section varhub-card__divider--top">
            <h5 className="vh-settings-section__title">
                Settings
                <a
                    className={cn("vh-settings-section__title__button", {reversed: expanded})}
                    onClick={onSwitchExpand}
                    type="button"
                >
                    <ArrowIcon direction="down"/>
                </a>
            </h5>
            <div className={`vh-settings-section__body ${expanded ? "shown" : "hidden"}`}>
                {children}
            </div>
        </div>
    )
}
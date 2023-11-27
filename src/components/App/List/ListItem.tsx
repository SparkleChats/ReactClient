import React, {MutableRefObject, ReactNode, useContext, useId, useRef} from 'react';
import styles from "./List.module.scss"
import IListElement from "./IListElement";
import csx from "classnames";
import {ContextOption} from "../ContextMenu/ContextOption";
import {useContextMenu} from "../ContextMenu/ContextMenuProvider";
import {AppContext} from "../../../Contexts";
import UserListElement from "./UserListElement";
import appStyles from "../App.module.scss"
import PrivateChatLookUp, {PersonalChatLookUp} from "../../../models/PrivateChatLookUp";
import {UserStatus} from "../../../models/UserDetails";

type Props = {
    element: IListElement;
    isChannel?: boolean;
    addContent?: (element: IListElement, ref: MutableRefObject<HTMLLIElement | undefined>) => ReactNode
    setContextAction?: (element: IListElement) => (ContextOption | null)[] | null
}
const ListItem = ({element, isChannel = false, addContent, setContextAction}: Props) => {
    const {media} = useContext(AppContext);

    const id = useId();
    if (setContextAction) {
        const options = setContextAction(element);
        if (options) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useContextMenu({
                id,
                options
            })
        }
    }

    const ref = useRef<HTMLLIElement>();
    return (
        <li className={csx(styles.component, {[styles.channel]: isChannel, [styles.selected]: element.isSelected})}
            onClick={() => element.clickAction != null && element.clickAction()}
            ref={ref as any}
            id={id}>
            {
                isChannel ?
                    <div className={styles.svgIconContainer}>
                        <img className={styles.svgIconContainer} src={"icons/channel.svg"} alt={"channel icon"}/>
                    </div>
                    :
                    <div className={styles.statusIconContainer}>
                        <div className={styles.iconContainer}>
                            <img src={media[element.image] as string | undefined | null ?? undefined}
                                 alt={"chatImage"}/>
                        </div>
                        {"privateChat" in element && "userStatus" in (element.privateChat as PrivateChatLookUp) &&
                            <div className={csx(appStyles.statusIcon, {[appStyles.online]: (element.privateChat as PersonalChatLookUp).userStatus === UserStatus.Online})}/>
                        }
                        {"profiles" in element &&
							<div className={csx(appStyles.statusIcon, {[appStyles.online]: (element as UserListElement).user.status === UserStatus.Online})}/>
                        }
                    </div>
            }
            <div className={csx(styles.content, {[styles.channelText]: isChannel})}>
                <strong
                    style={{color: "profiles" in element ? (element as UserListElement).color as string | undefined : undefined}}>
                    {element.title}
                </strong>
                {isChannel ||
					<div>
						<span>{element.subtitle}</span>
					</div>
                }
            </div>
            {addContent && addContent(element, ref)}
        </li>
    );
};

export default ListItem;

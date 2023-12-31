import React, {useContext, useEffect, useRef, useState} from 'react';
import styles from "./ChatsListColumn.module.scss"
import {AppContext} from "../../../Contexts";
import ListItem from "../List/ListItem";
import IListElement from "../List/IListElement";
import UserListElement from "../List/UserListElement";
import UserInfo from "../UserInfo/UserInfo";
import Modal from "../Modal/Modal";
import UserSettingsModal from "./UserSettingsModal/UserSettingsModal";
import {ActionType} from "../reducer";

const UserSection = () => {
    const {user, users, dispatch} = useContext(AppContext)
    const [isUserInfo, setUserInfo] = useState(false);
    const infoRef = useRef<HTMLDivElement>();
    const [isOpen, setOpen] = useState(false);
    useEffect(() => {
        if (user.serverProfile) {
            dispatch({type: ActionType.UpdateSelf, value: {...user, serverProfile: undefined}})
        }
    }, [user.serverProfile])

    useEffect(() => {
        function onClick(event: any) {
            if (isUserInfo && infoRef.current && !infoRef.current.contains(event.target)) {
                setUserInfo(false);
            }
        }

        window.addEventListener("click", onClick)
        return () => {
            window.removeEventListener("click", onClick)
        }
    }, [isUserInfo])

    function getListElement(): IListElement {
        const listElement = new UserListElement(user.id, users);
        listElement.clickAction = () => setUserInfo(!isUserInfo);
        return listElement;
    }

    return (
        <div className={styles.userSection} ref={infoRef as any}>
            {isUserInfo ?
                <div className={styles.userInfoContainer}>
                    <UserInfo userDetails={user}>
                        <input placeholder={"Message @" + (user.username)}/>
                    </UserInfo>
                </div>
                : null}
            <ListItem element={getListElement()} isChannel={false}/>
            <div className={styles.iconColumn}>
                <div className={styles.iconContainer} onClick={() => setOpen(true)}>
                    <img src={"icons/profileSettings.svg"} alt={"profile settings"}/>
                </div>
                <Modal isOpen={isOpen} setOpen={setOpen}>
                    <UserSettingsModal/>
                </Modal>
            </div>
        </div>
    );
};

export default UserSection;
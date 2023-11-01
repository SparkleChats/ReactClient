import React, {useContext, useEffect, useState} from 'react';
import {AppContext, SelectedServerContext} from "../../../Contexts";
import {ServerProfileLookup} from "../../../models/ServerProfileLookup";
import ServerLookUp from "../../../models/ServerLookUp";
import {ActionType} from "../reducer";
import List from "../List/List";
import UserInfoFromList from "./UserInfoFromList";
import UserListElement from "../List/UserListElement";
import ServerDetailsDto from "../../../models/ServerDetailsDto";

const ServerInfoColumn = () => {
    const {getData, servers, profiles, dispatch} = useContext(AppContext);
    const {selectedServerId} = useContext(SelectedServerContext);
    if(!selectedServerId) throw new Error("selectedServerId is can't be undefined at this point");
    const server = servers[selectedServerId] as unknown as ServerLookUp;
    const [profilesToShow, setProfiles] = useState<ServerProfileLookup[]>();
    const [selectedUser, selectUser] = useState<string>();

    useEffect(() => {
        if(!selectedServerId || !server) return;
        if(!("serverProfiles" in server)) return;
        if(!profiles[(server as unknown as ServerDetailsDto).serverProfiles[0]]) {
            console.log("save profiles")
            getData.serverProfiles
                .getServerProfiles(selectedServerId)
                .then(ps =>
                    dispatch({
                        type: ActionType.ServerProfilesSaved,
                        value: ps
                    })
                )
        }
        else {
            setProfiles((prev) => {
                const newProfiles = (server as unknown as ServerDetailsDto).serverProfiles.map(id => profiles[id]);
                newProfiles.sort((a, b) => {
                    if (a.name < b.name)
                        return -1;
                    if (a.name > b.name)
                        return 1;
                    return 0;
                })
                return newProfiles;
            })
        }
    }, [dispatch, getData.serverProfiles, profiles, selectedServerId, server])

    function getListElement(profile: ServerProfileLookup): UserListElement {
        const le = new UserListElement({
            id: profile.userId,
            displayName: profile.name,
            avatar: profile.avatarUrl,
            textStatus: profile.textStatus,
            status: profile.status
        }, profile.id)
        le.clickAction = () => {
            selectUser(profile.userId);
        }
        return le;
    }

    console.log(profilesToShow)
    return (
        <>
            {profilesToShow &&
				<List elements={profilesToShow.map(p => getListElement(p))}>
                    {
                        (e, ref) => {
                            return (
                                <UserInfoFromList
                                    listElement={e as UserListElement}
                                    serverId={undefined}
                                    selectedUser={selectedUser}
                                    selectUser={selectUser}
                                    containerRef={ref}
                                />
                            )
                        }
                    }
				</List>
            }
        </>
    );
};

export default ServerInfoColumn;
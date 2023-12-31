import {UserLookUp} from "./UserLookUp";

export interface UserDetails extends UserLookUp{
    /** Unique user identifier. */
    id: string;
    /** Non-unique display name shown to other users. */
    displayName: string;
    /** Unique username for the user. */
    username: string;
    /** Avatar URL of the user. */
    avatar: string | undefined;
    status?: UserStatus;
    /** User's current text status message. */
    textStatus?: string | undefined;
    aboutMe: string | undefined;
    serverProfile?: ServerProfileDto;
}

export interface RoleDto {
    /** The unique identifier for the role. */
    id: string;
    /** The name of the role. */
    name: string;
    /** The color associated with the role in hexadecimal format (e.g., "#FF0000" for red). */
    color: string;
    priority: number
}

export interface ServerProfileDto {
    id: string;
    /** User's username displayed on this server. */
    name?: string | undefined;
    /** List of user's roles on this server. */
    roles?: RoleDto[];
}
export enum UserStatus {
    Online = 0,
    Idle = 1,
    DoNotDisturb = 2,
    Offline = 3,
}
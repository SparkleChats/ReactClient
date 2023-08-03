import IGetData from "./IGetData";
import Chat from "../models/Chat";
import Message from "../models/Message";
import {EventP} from "../Events";
import PrivateChat from "../models/PrivateChat";
import Server from "../models/Server";
import User, {UserStatus} from "../models/User";

const message: Message = {
    id: 1,
    sendTime: new Date(2023, 6, 28, 22, 51),
    user: {
        id: 1,
        displayName: "DisplayName",
        avatarPath:"https://archive.org/download/discordprofilepictures/discordred.png",
        status: UserStatus.online,
        textStatus: null,
        username: "UserName"
    },
    serverProfile: undefined,
    text: "hello, this is message number ",
    attachments: [],
    reactions: []
}

class GetHardCodeData implements IGetData {
    private readonly _pageSize = 25;
    private _messages: Message[] = [];
    constructor() {
        for (let i = 0; i < 200; i++) {
            const text = message.text + i;
            const date = new Date(Number(new Date()) - 3600000 * i);
            this._messages.push({...message, id:i, text:text, sendTime: date});
        }
    }

    getMessages(chat: Chat, messagesCount: number): Message[] {
        return this._messages.slice(messagesCount, messagesCount + this._pageSize);
    }

    private readonly _onMessageReceived: EventP<{ chat: Chat, message: Message }> = new EventP<{ chat: Chat, message: Message }>();
    get onMessageReceived(): EventP<{ chat: Chat, message: Message }> {
        return this._onMessageReceived;
    }

    get privateChats(): PrivateChat[] {
        return [
            {
                id: 1,
                image: undefined,
                title: undefined,
                messages: [],
                users: [
                    {
                        id: 2,
                        displayName: "user",
                        username: "user",
                        avatarPath: "https://archive.org/download/discordprofilepictures/discordblue.png",
                        status: UserStatus.idle,
                        textStatus: "text status"
                    },
                    this.user
                ]
            },
            {
                id: 2,
                image: "https://www.seekpng.com/png/detail/967-9676420_group-icon-org2x-group-icon-orange.png",
                title: undefined,
                messages: [],
                users: [
                    {
                        id: 1,
                        displayName: "user1",
                        username: "user",
                        avatarPath: "https://archive.org/download/discordprofilepictures/discordred.png",
                        status: UserStatus.idle,
                        textStatus: null
                    },
                    {
                        id: 2,
                        displayName: "user2",
                        username: "user",
                        avatarPath: "https://archive.org/download/discordprofilepictures/discordred.png",
                        status: UserStatus.offline,
                        textStatus: "I'm Good"
                    },
                    {
                        id: 3,
                        displayName: "user3",
                        username: "user",
                        avatarPath: "https://archive.org/download/discordprofilepictures/discordred.png",
                        status: UserStatus.online,
                        textStatus: "Talk to me pls"
                    }
                ]
            }
        ];
    }

    sendMessage(chat: Chat, message: Message): void {
        this._onMessageReceived.invoke({chat, message})
    }

    get servers(): Server[] {
        return [
            {
                id: 1,
                title: "test 1",
                image: "https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-instagram-new-square2-512.png",
                channels: [],
                roles: [],
                serverProfiles: []
            },
            {
                id: 2,
                title: "test 2",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/YouTube_social_red_square_%282017%29.svg/1024px-YouTube_social_red_square_%282017%29.svg.png",
                channels: [],
                roles: [],
                serverProfiles: []
            }, {
                id: 3,
                title: "test 3",
                image: "https://cdn4.iconfinder.com/data/icons/miu-square-flat-social/60/whatsapp-square-social-media-512.png",
                channels: [],
                roles: [],
                serverProfiles: []
            }, {
                id: 4,
                title: "test 4",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuBDIoeoNCvS8p16czXQThmrIF1a-nPzgSZg&usqp=CAU",
                channels: [],
                roles: [],
                serverProfiles: []
            }, {
                id: 5,
                title: "test 5",
                image: "https://archive.org/download/discordprofilepictures/discordred.png",
                channels: [],
                roles: [],
                serverProfiles: []
            },
        ];
    }

    get user(): User {
        return {
            id: 1,
            displayName: "user",
            username: "user",
            avatarPath: "https://archive.org/download/discordprofilepictures/discordgreen.png",
            status: UserStatus.idle,
            textStatus: "text status"
        };
    }

}

export default GetHardCodeData;
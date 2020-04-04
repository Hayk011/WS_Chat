import React from "react";
import queryString from "querystring";
import {v4 as uuidv4} from 'uuid';
import "./Chat.css";

interface IMessages {
    id?: any;
    user: string;
    message: string;
    room?: string
}

let socket: WebSocket | any;
const Chat = ({location}: any) => {
    const [user, setUser] = React.useState<any>("");
    const [room, setRoom] = React.useState<any>("");
    const [id, setId] = React.useState<any>("");
    const [messages, setMessages] = React.useState<IMessages[]>([]);
    const [message, setMessage] = React.useState<string>("");
    const entrypoint: string = "ws://localhost:5000";

    React.useEffect(() => {
        const path: string = location.search;
        const userDetal = path.slice(1);
        const {user, room} = queryString.parse(userDetal);
        const uid = uuidv4();
        setUser(user);
        setRoom(room);
        setId(uid);
        socket = new WebSocket(entrypoint);
        socket.onopen = () => {
            console.log("connection");
            socket.send(JSON.stringify({id: uid, user, room, join: "true"}));
        };
        return () => {
            socket.onclose = () => {
                socket.close();
                console.log("disconnect");
            }
        }
    }, [entrypoint, location.search]);

    React.useEffect(() => {
        socket.onmessage = (msg: MessageEvent) => {
            const messa = JSON.parse(msg.data);
            console.log(messa)
            setMessages([...messages, messa])

        };
        console.log(messages)
    }, [messages]);
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value)
    };
    const sendHandler = () => {
        socket.send(JSON.stringify({id, message, room, user}));
        setMessage("")
    };
    return (
        <div>
            <h1>Hello</h1>
            <div>
                <ul>
                    {messages.map((msg: IMessages, index: number) => (
                        <li key={index}>{ msg.user}: {msg.message}</li>
                    ))}
                </ul>
            </div>
            <input
                type="text"
                placeholder="message"
                value={message}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => changeHandler(event)}
            />
            <button onClick={sendHandler}>SEND</button>
        </div>
    )
};
export default Chat
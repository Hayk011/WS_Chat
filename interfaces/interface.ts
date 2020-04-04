import WebSocket from "ws";

interface Iform {
    name: string;
    room: string;
};

interface Isocket extends WebSocket {
    room?: string[]
};

export { Isocket, Iform }
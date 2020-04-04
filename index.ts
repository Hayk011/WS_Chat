const express = require("express");
import http, {IncomingMessage} from "http";
import WebSocket from "ws";
import {addUser, remuveUser, getUser, getRoom} from "./helper";
import {Isocket} from "./interfaces/interface"
import myWS from "./classes/class"

const cors = require('cors');
const router = require("./routes/router");

const app = express();
app.use(cors());
app.use(express.json({extended: true}));
const server = http.createServer(app);
const ws = new WebSocket.Server({server});
const PORT: number | string = process.env.PORT || 5000;


ws.on("connection", (wss: WebSocket) => {
    const socket = new myWS(wss);
    socket.wss.send(JSON.stringify({user: "Admin", message: "welcome"}));
    socket.wss.room = [];
    
    socket.wss.on("message", (message: any) => {
        const msg = JSON.parse(message)
        if (msg.join) {
            socket.wss.room.push(msg.room);
            const {user} = addUser(msg.id, msg.user, msg.room);
            return
        }

        ws.clients.forEach((client: Isocket) => {
            if (client.readyState === WebSocket.OPEN && client.room[0] === msg.room) {
                client.send(message);
            }
            client.on("close", () => {
                console.log("client is leaft");
                remuveUser(msg.id)
            });
        });

        ws.on("error", (err: Error) => {
            console.log(err)
        })
    });
});

app.use("/", router);

server.listen(PORT, () => {
    console.log(`server has been startet in port ${PORT}`)
});
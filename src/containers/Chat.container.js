import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";

const ChatContainer = () => {
    const location = useLocation();

    const [name, setName] = useState("");
    const [roomName, setRoomName] = useState("");
    const [socket, setSocket] = useState();

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        setName(name);
        setRoomName(room);

        const socketInit = io("localhost:5050");
        console.log(socketInit);
        setSocket(socketInit);

        socketInit.emit(
            "join",
            {
                name,
                room,
            },
            ({ error }) => {
                console.log(error);
            }
        );
    }, [location]);

    return (
        <div>
            <h1>Chat</h1>
        </div>
    );
};

export default ChatContainer;

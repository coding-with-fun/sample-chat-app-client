import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { Link, useLocation } from "react-router-dom";

const ChatContainer = () => {
    const location = useLocation();

    const [name, setName] = useState("");
    const [roomName, setRoomName] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState();

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        setName(name);
        setRoomName(room);

        const initSocket = io("localhost:5050");
        setSocket(initSocket);

        initSocket.emit(
            "join",
            {
                name,
                room,
            },
            (error) => {
                console.log(error);
            }
        );

        return () => {
            console.log("Disconnecting");
            initSocket.disconnect();
            initSocket.off();
        };
    }, [location]);

    useEffect(() => {
        if (socket) {
            socket.on("message", (message) => {
                console.log(message);

                setMessages((prevMessages) => {
                    return [...prevMessages, message];
                });
            });
        }

        return () => {};
    }, [socket]);

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit("sendMessage", message, () => {
                setMessage("");
            });
        }
    };

    return (
        <div>
            <h1>Chat</h1>

            {messages.map((message, index) => {
                return (
                    <div key={index}>
                        <div>Message is {message.text}</div>

                        <div>From {message.user}</div>
                    </div>
                );
            })}

            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
            />

            <Link to="/">Home</Link>
        </div>
    );
};

export default ChatContainer;

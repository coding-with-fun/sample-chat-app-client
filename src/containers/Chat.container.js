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

        /**
         * It is used to connect to the SERVER URL mentioned.
         */
        const initSocket = io("localhost:5050");

        setSocket(initSocket);

        /**
         * JOIN is an event called from the Front-end.
         * NAME & ROOM are passed as object from the Front-end.
         * It is used to join a new user to the room.
         */
        initSocket.emit(
            "join",
            {
                name,
                room,
            },
            (error) => {
                if (error) console.log(error);
            }
        );

        return () => {
            initSocket.disconnect();
            initSocket.off();
        };
    }, [location]);

    useEffect(() => {
        if (socket) {
            /**
             * MESSAGE is an event called from the Back-end.
             * It is used to send the messages to the Front-end.
             */
            socket.on("message", (message) => {
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
            /**
             * SEND MESSAGE is an event called from the Front-end.
             * MESSAGE is passed a parameter from the Front-end.
             * It is used to send a message.
             */
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
                        <div>
                            {message.user} - {message.message}
                        </div>
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

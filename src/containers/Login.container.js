import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginContainer = () => {
    const [name, setName] = useState("");
    const [roomName, setRoomName] = useState("");

    return (
        <div>
            <h1>Login</h1>

            <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                onChange={(e) => {
                    setName(e.target.value);
                }}
            />
            <input
                type="text"
                name="room"
                id="room"
                placeholder="Room"
                onChange={(e) => {
                    setRoomName(e.target.value);
                }}
            />

            {name && roomName ? (
                <Link to={`/chat?name=${name}&room=${roomName}`}>
                    <button type="submit">Sign In</button>
                </Link>
            ) : null}
        </div>
    );
};

export default LoginContainer;

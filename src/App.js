import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatContainer from "./containers/Chat.container";
import LoginContainer from "./containers/Login.container";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginContainer />} />
                <Route path="/chat" element={<ChatContainer />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import UserInfoContext from "../context/UserInfoContext";
import GlobalStyle from "../theme/GlobalStyle";
import StartScreen from "./StartScreen";
import SignUpScreen from "./SignUpScreen";
import SignInScreen from "./SignInScreen";
import MyLinksScreen from "./MyLinksScreen";

export default function App() {
  const [token, setToken] = useState({});
  return (
    <>
      <GlobalStyle />
      <UserInfoContext.Provider value={{ token, setToken }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StartScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />
            <Route path="/signin" element={<SignInScreen />} />
            <Route path="/mylinks" element={<MyLinksScreen />} />
          </Routes>
        </BrowserRouter>
      </UserInfoContext.Provider>
    </>
  );
}

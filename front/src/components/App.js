import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserInfoContext from "../context/UserInfoContext";
import GlobalStyle from "../theme/GlobalStyle";
import StartScreen from "./StartScreen";
import SignUpScreen from "./SignUpScreen";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <UserInfoContext.Provider value={{}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StartScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />
          </Routes>
        </BrowserRouter>
      </UserInfoContext.Provider>
    </>
  );
}

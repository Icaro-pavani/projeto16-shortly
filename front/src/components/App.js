import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserInfoContext from "../context/UserInfoContext";
import GlobalStyle from "../theme/GlobalStyle";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <UserInfoContext.Provider value={{}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<h1>Tese</h1>} />
          </Routes>
        </BrowserRouter>
      </UserInfoContext.Provider>
    </>
  );
}

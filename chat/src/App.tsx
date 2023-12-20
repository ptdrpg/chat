import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Home from "./page/Home";
import Chat from "./page/Chat";
import socket from "./utils/socket";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
      <Routes>
        <Route path="/" element={<Home socket={socket} />} />
        <Route path="/chat" element={<Chat socket={socket} />} />
        </Routes>
       </RecoilRoot> 
    </BrowserRouter>
  )
}

export default App

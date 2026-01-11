import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import ResponseV1 from "./components/ResponseV1";
import SignUp from "./components/SignUp";
import Login2 from "./components/Login2";
import SignUp2 from "./components/SignUp2";
import Login1 from "./components/Login1";

function App() {
  return (
    <div className="justify-content-center">
      <Routes>
        {/* <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login2 />} />
        <Route path="/signup" element={<SignUp2 />} /> */}
        <Route path="/customers" element={<ResponseV1 />} />
      </Routes>
    </div>
  );
}

export default App;

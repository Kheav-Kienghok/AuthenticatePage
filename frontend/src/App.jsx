import { BrowserRouter, Route, Routes } from "react-router-dom"
import ProtectedPage from "./components/Protected";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import VerifyEmail from "./components/VerifyEmail";
import "./css/global.css";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/verify" element={<VerifyEmail />}/>
        <Route path="/protected" element={<ProtectedPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

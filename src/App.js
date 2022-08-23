import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./main components/homepage/home";
import AuthPage from "./main components/authpage/auth";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />{" "}
          <Route path="/auth" element={<AuthPage />} />{" "}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

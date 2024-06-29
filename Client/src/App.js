import "./App.css";
import { Routes, Route } from "react-router-dom";
import Todo from "./Components/Todo";
import Navbar from "./Components/Navbar";
import Signin from "./Components/Signin";
import Login from "./Components/Login";
import MultiUser from "./Components/Multiuser";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route index path="/" element={[<Navbar />, <Login />]} />
        <Route exact path="/Signin" element={[<Navbar />, <Signin />]} />
        <Route exact path="/Todo" element={[<Navbar />, <Todo />]} />
        <Route exact path="/multiuser" element={[<Navbar />, <MultiUser />]} />
      </Routes>
    </div>
  );
}

export default App;

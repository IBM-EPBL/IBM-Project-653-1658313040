import './App.css';
import { Routes, Route } from "react-router-dom";
import Signup from './signup';
import SignIn from './signin';
import Home from './home';

function App() {

  return (

    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
    </Routes>

  );
}

export default App;

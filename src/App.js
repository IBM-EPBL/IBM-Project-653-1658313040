import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './home';
import Signup from './signup';
import SignIn from './sign-in';

function App() {

  return (

    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/home" element={<Home />} />
    </Routes>

  );
}

export default App;

import Alert from "./componenets/alert";
import Login from "./componenets/login";
import Signup from "./componenets/signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import State from "./contexts/State";
import Homepage from "./componenets/homepage";
function App() {
  return (
    <State>
      <Router>
        <Alert />
        <Routes>
        <Route path="/" element={<Homepage/>} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </State>


  );
}

export default App;

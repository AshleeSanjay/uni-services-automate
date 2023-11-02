import "./App.css";
import Home from "./components/home";
import About from "./components/about";
import Contact from "./components/contact.js";
import Services from "./components/services";
import VehicleBooking from "./components/vehiclebooking.js";
import CounsellorBooking from "./components/counsellorbooking";
import RoomBooking from "./components/roombooking";
import Login from "./components/login";
import Signout from "./components/signout";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
} from "react-router-dom";
import Navigationbar from "./components/navigationbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigationbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/vehiclebooking" element={<VehicleBooking />} />
          <Route path="/counsellorbooking" element={<CounsellorBooking />} />
          <Route path="/roombooking" element={<RoomBooking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signout" element={<Signout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

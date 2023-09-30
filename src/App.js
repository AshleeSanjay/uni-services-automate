import "./App.css";
import Home from "./components/home";
import About from "./components/about";
import Contact from "./components/contact.js";
import Services from "./components/services";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigationbar from "./components/navigationbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigationbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/services" component={Services} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

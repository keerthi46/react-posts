
import "./App.css";
import Login from "./pages/Login";
import { HashRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div>
      <HashRouter>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Dashboard} />
      </HashRouter>
    </div>
  );
}

export default App;

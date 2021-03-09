import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./App.css";
import Home from "./pages/home";
import Inventory from "./pages/inventory";
import { AuthConsumer } from "./context/index";
import DragSortingTable from "./pages/DragSortingTable/index";

const history = createBrowserHistory();
function App() {
  return (
    <Router history={history}>
      <AuthConsumer>
        {() => {
          return (
            <Switch>
              <Route path="/test" component={DragSortingTable} />
              <Route path="/inventory" component={Inventory} />
              <Route path="/" component={Home} />
            </Switch>
          );
        }}
      </AuthConsumer>
    </Router>
  );
}

export default App;

import AnalysisPage from "./pages/AnalysisPage";
import AboutPage from "./pages/AboutPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={AnalysisPage} />
        <Route exact path="/about" component={AboutPage} />
      </Switch>
    </Router>
  );
}

export default App;

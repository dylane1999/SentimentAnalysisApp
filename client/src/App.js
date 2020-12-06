import AnalysisPage from "./pages/AnalysisPage";
import AboutPage from "./pages/AboutPage";
import Header from "./components/Header"
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { GlobalStyle } from './styles/GlobalStyles';



const Root = styled.div`
  background-color: #6B6B6B;
  height: 100vh;
  width: 100vw;
  margin: 0px;
`;

function App() {
  return (
    <Router>
    <GlobalStyle />
      <Switch>
        <Route exact path="/" component={AnalysisPage} />
        <Route exact path="/about" component={AboutPage} />
      </Switch>
    </Router>
  );
}

export default App;

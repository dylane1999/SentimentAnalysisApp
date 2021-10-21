import AnalysisPage from "./pages/AnalysisPage";
import AboutPage from "./pages/AboutPage";
import Header from "./components/Header";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { GlobalStyle } from "./styles/GlobalStyles";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import appReducer from "./reducers";
import reduxThunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";


const store = createStore(
	appReducer,
	composeWithDevTools(applyMiddleware(reduxThunk, logger))
);

const Root = styled.div`
  background-color: #6b6b6b;
  height: 100vh;
  width: 100vw;
  margin: 0px;
`;

function App() {
  return (
    <Provider store={store}>
      <Router>
        <GlobalStyle />
        <Switch>
          <Route exact path="/" component={AnalysisPage} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;


//https://twitter.com/joshcamp05/status/1338623755912761344
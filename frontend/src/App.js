import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';

import Home from './home/Home';

function App() {
  return (
    <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
        </Switch>
    </Router>
  );
}

export default App;

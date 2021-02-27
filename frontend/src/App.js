import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';

import Home from './Home/Home';
import SignUp from './SignUp/SignUp';

function App() {
  return (
    <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/signup" component={SignUp}/>
        </Switch>
    </Router>
  );
}

export default App;

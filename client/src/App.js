import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import dogs from './components/dogs';
import inicio from './components/inicio';

function App() {
  return (
    <div className="App">
      <h1>Henry Dogs</h1>
      <Router>
        <Route exact path="/dogs" component={dogs}/>
        <Route exact path="/inicio" component={inicio}/>
        
      </Router>
    </div>
  );
}

export default App;

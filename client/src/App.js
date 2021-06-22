import './App.css';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import React from 'react'
import Dogs from './components/Dogs';
import Inicio from './components/Inicio';
import Principal from './components/Principal'
import AddDog from './components/AddDog';


function App() {
  return (
    <div className="App">
      
      <Router>
        <React.Fragment>
          
          <Route exact path="/" component={Inicio} />
          <Route exact path="/dogs" component={Principal}/>
          <Route exact path="/dogs/:id" component={Dogs} />
          <Route exact path="/dog" component={AddDog} />
          {/* <Route path="/**" component={}/> */}
        </React.Fragment>
      </Router>
    </div>
  );
}

export default App;

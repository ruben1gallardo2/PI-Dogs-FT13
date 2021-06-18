import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dogs from './components/Dogs';
import Inicio from './components/Inicio';
import Principal from './components/Principal'

function App() {
  return (
    <div className="App">
      <h1>Henry Dogs</h1>
      <Principal></Principal>
    </div>
  );
}

export default App;

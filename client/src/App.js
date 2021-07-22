import React from 'react';
import { BrowserRouter,Route } from 'react-router-dom';
import Landing from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import Detail from "./components/Detail/Detail"
import Activity from "./components/Activity/Activity"
import FilterActs from './components/FilterActs/FilterActs';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Route exact path="/" component={Landing}/>
      <Route path="/home/:id" component={Detail}/>
      <Route  exact path="/home" component={Home}/>
      <Route path="/activity" component={Activity}/>
      <Route path="/filter" component={FilterActs}/>
    </div>
    </BrowserRouter>
  );
}

export default App;

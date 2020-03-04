import React from 'react';
import { Route,Switch } from 'react-router-dom';
import About from "./about";
import Login from "./RegisterLogin";
import Register from "./RegisterLogin/register";
import Main from "./main";
import Index from "./Index/index";
function App() {

  return (
    <div className="App">
      <Switch>
       <Route path="/about" component={About}/>
       <Route path="/login" component={Login}/>
       <Route path="/register" component={Register}/>
       <Route path="/main" component={Main}/>
       <Route path="/" component={Index}/>
      </Switch>
    </div>
  );
}



export default App;

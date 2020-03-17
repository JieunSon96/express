import React from 'react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { Route,Switch } from 'react-router-dom';


function App(props) {

  return (
    <div className="App">
      <Header/>
      {props.children}
      <Footer/>
    </div>
  );
}



export default App;

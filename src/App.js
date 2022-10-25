import './App.css';
import React from 'react';
import { useState } from 'react';
import List from './componentes/List/List';
//import { Router, Switch, Route, Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Product from './componentes/Product/Product';
import Nav from './componentes/Nav/Nav';




function App() {
    return (
    <div className="App">
      <Nav />
      

      <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/products"  element={<List />}>
            
          </Route>
          <Route path="/products/:id"  element={<Product />}>
            
          </Route>

    
        </Routes>
      </div>
    </Router>


    </div>
  );
}

export default App;

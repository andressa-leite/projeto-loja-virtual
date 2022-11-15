import './App.css';
import React from 'react';
import { useState } from 'react';
import List from './componentes/List/List';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from './componentes/Product/Product';
import PersistentDrawerLeft from './componentes/Nav/Nav';
import Login from "./pages/Login";

function App() {
    return (
    <div className="App">

      <Router>
      
        <PersistentDrawerLeft />

        <Routes>
          <Route path="/products"  element={<List />}>  
          </Route>
          <Route path="/products/:id"  element={<Product />}>
          </Route>
          <Route path="/login" element={<Login />}>  
          </Route>
        </Routes>
    
    </Router>


    </div>
  );
}

export default App;

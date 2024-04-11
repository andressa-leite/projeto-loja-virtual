import "./App.css";
import React, { useEffect } from "react";
import { useState } from "react";
import ListProducts from "./componentes/ListProducts/ListProducts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Product from "./componentes/Product/Product";
import PersistentDrawerLeft from "./componentes/Nav/Nav";
import Login from "./pages/Login";
import CreateUser from "./pages/CreateUser/CreateUser";
import Account from "./pages/Account/Account";
import { AppContext } from "./utils/AplicationContext";
import { blue } from "@mui/material/colors";
import { createMuiTheme, ThemeProvider } from "@mui/material/styles";

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: blue[50],
    },
    primary: blue,
    info: {
      main: blue[900],
    },
  },
});

function App() {
  const [context, setContext] = useState({ user: null, shoppingCart: [] });
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    setContext({ user: data?.user, shoppingCart: [] });
  }, []);

  return (
    //AppContext related to products and shoppingCart
    //ThemeProvider related to mui
    <AppContext.Provider value={{ context, setContext }}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <PersistentDrawerLeft />

            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/products" element={<ListProducts />}></Route>
              <Route path="/products/:id" element={<Product />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/users/create" element={<CreateUser />}></Route>
              <Route path="/users/account" element={<Account />}></Route>
            </Routes>
          </Router>
        </div>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;

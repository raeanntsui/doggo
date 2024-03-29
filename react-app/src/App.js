import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import ShowAllProducts from "./components/Product/ShowAllProducts/ShowAllProducts";
import ShowOneProduct from "./components/Product/OneProduct/ShowOneProduct";
import CreateNewProduct from "./components/Product/CreateProduct/CreateProduct";
import UpdateProduct from "./components/Product/UpdateProduct/UpdateProduct";
import HomePage from "./components/Homepage/Homepage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/products">
            <ShowAllProducts />
          </Route>
          <Route path="/products/:productId/update">
            <UpdateProduct />
          </Route>
          <Route path="/products/new">
            <CreateNewProduct />
          </Route>
          <Route path="/products/:productId">
            <ShowOneProduct />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route>Page not found</Route>
        </Switch>
      )}
    </>
  );
}

export default App;

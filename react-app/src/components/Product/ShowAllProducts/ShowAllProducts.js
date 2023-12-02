import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllProductsThunk } from "../../../store/products";
import "./ShowAllProducts.css";

function ShowAllProducts() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.allProducts);
  console.log("🚀🚀🚀🚀🚀🚀 ~ products:", products);

  const productsObject = Object.values(products);
  console.log("🚀🚀🚀🚀🚀🚀 ~ productsObject:", productsObject);

  const currentUser = useSelector((state) => state.session.user);
  console.log("🚀🚀🚀🚀🚀🚀 ~ currentUser:", currentUser);

  useEffect(() => {
    dispatch(getAllProductsThunk());
  }, [dispatch]);

  return (
    <>
      <h1>Hello ShowAllProducts</h1>
      {/* <div>
        {productsObject.map(product => (
            <NavLink to={`/products/${product.id}`}>

        ))}
      </div> */}
    </>
  );
}

export default ShowAllProducts;

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllProductsThunk } from "../../../store/products";
import "./ShowAllProducts.css";
import ReviewForm from "../../Reviews/CreateReview/ReviewForm";

function ShowAllProducts() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.allProducts);
  console.log("🚀🚀🚀🚀🚀🚀 ~ products:", products);

  const allProductsObject = Object.values(products);
  console.log("🚀🚀🚀🚀🚀🚀 ~ productsObject:", allProductsObject);

  const currentUser = useSelector((state) => state.session.user);
  console.log("🚀🚀🚀🚀🚀🚀 ~ currentUser:", currentUser);

  useEffect(() => {
    dispatch(getAllProductsThunk());
  }, [dispatch]);

  if (!products) return null;
  return (
    <>
      <div>
        {allProductsObject.length > 0 ? (
          allProductsObject.map((product) => (
            <NavLink key={product.id} to={`/products/${product.id}`}>
              <img src={product.product_image} />
              <h1>Product ID: {product.id}</h1>
              <h2>Owner ID: {product.product_owner_id}</h2>
              <h2>{product.product_name}</h2>
              <h2>{product.product_description}</h2>
            </NavLink>
          ))
        ) : (
          <h1>Loading or no product information available?</h1>
        )}
      </div>
      <div>{/* <ReviewForm /> */}</div>
    </>
  );
}

export default ShowAllProducts;

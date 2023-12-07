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

  const allReviewsObject = useSelector((state) => state.reviews.allReviews);
  const reviewArr = Object.values(allReviewsObject);

  useEffect(() => {
    dispatch(getAllProductsThunk());
  }, [dispatch]);

  if (!products) return null;

  return (
    <>
      <div id="all-products">
        {allProductsObject.length > 0 ? (
          allProductsObject.map((product) => (
            <div id="one-product">
              <NavLink key={product.id} to={`/products/${product.id}`}>
                <img id="all-products-image" src={product.product_image} />
                {/* <h2>Owner ID: {product.product_owner_id}</h2> */}
                <h3>{product.product_name}</h3>
                {/* <p>{product.product_description}</p> */}
                <p style={{ fontWeight: "bold" }}>${product.product_price}</p>
              </NavLink>
            </div>
          ))
        ) : (
          <h1>Loading</h1>
        )}
      </div>
    </>
  );
}

export default ShowAllProducts;

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllProductsThunk } from "../../../store/products";
import "./ShowAllProducts.css";
import ReviewForm from "../../Reviews/CreateReview/ReviewForm";

function ShowAllProducts() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.allProducts);
  const allProductsObject = Object.values(products);
  const currentUser = useSelector((state) => state.session.user);
  const allReviewsObject = useSelector((state) => state.reviews.allReviews);
  const reviewArr = Object.values(allReviewsObject);

  useEffect(() => {
    dispatch(getAllProductsThunk());
  }, [dispatch]);

  if (!products) return null;

  const renderStars = (rating) => {
    const starElements = [];
    const filledStars = Math.floor(rating);

    for (let i = 0; i < filledStars; i++) {
      starElements.push(
        <i key={i} className="fa-solid fa-star filled-stars"></i>
      );
    }

    const emptyStars = 5 - filledStars;
    for (let i = 0; i < emptyStars; i++) {
      starElements.push(
        <i key={`empty-${i}`} className="fa-regular fa-star filled-stars"></i>
      );
    }

    return starElements;
  };

  const calculateAverageRating = () => {
    if (reviewArr.length === 0) {
      return 0;
    }

    const totalRating = allReviewsObject.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    return totalRating / allReviewsObject.length;
  };

  const averageRating = calculateAverageRating();

  return (
    <>
      <div id="all-products">
        {allProductsObject.length > 0 ? (
          allProductsObject.map((product) => (
            <div id="one-product">
              <NavLink key={product.id} to={`/products/${product.id}`}>
                <img id="all-products-image" src={product.product_image} />
                <h3>{product.product_name}</h3>
                <div id="showallproducts-price-corner">
                  <p style={{ fontWeight: "bold" }}>${product.product_price}</p>
                </div>
                <div style={{ fontWeight: "bold", padding: "10px 0px" }}>
                  {renderStars(averageRating)}
                </div>
                <p style={{ fontWeight: "500", color: "gray" }}>
                  Sold by: {product.user.first_name}
                </p>
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

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOneProductThunk } from "../../../store/products";
import DeleteProduct from "../DeleteProduct/DeleteProduct";
import GetAllReviews from "../../Reviews/GetAllReviews/GetAllReviews";
import UpdateProduct from "../UpdateProduct/UpdateProduct";
import ReviewForm from "../../Reviews/CreateReview/ReviewForm";
import UpdateReviewForm from "../../Reviews/UpdateReview/UpdateReview";
import DeleteReview from "../../Reviews/DeleteReview/DeleteReview";
import OpenModalButton from "../../OpenModalButton";
import "./ShowOneProduct.css";

function ShowOneProduct() {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const product = useSelector((state) => state.products.allProducts[productId]);
  const currentUser = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.reviews.allReviews);

  const reviewsObj = Object.values(reviews).filter(
    (review) => review.product_id === parseInt(productId)
  );

  // useEffect(() => {
  //   dispatch(getOneProductThunk(productId));
  // }, [dispatch, productId]);

  useEffect(() => {
    dispatch(getOneProductThunk(productId));
  }, [dispatch, productId]);

  if (!productId) return null;

  let existingReview;
  if (currentUser) {
    existingReview = reviewsObj.find(
      (review) => review.user_id === currentUser.id
    );
  }

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
    if (reviews.length === 0) {
      return 0;
    }

    const totalRating = reviewsObj.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    return totalRating / reviewsObj.length;
  };

  const averageRating = calculateAverageRating();

  return (
    <>
      {product ? (
        <div id="product-information-parent">
          <div id="product-image-container">
            <div>
              <img
                id="product-image"
                src={product.product_image}
                alt="Product"
              />
            </div>

            <div id="update-delete-listing">
              {currentUser && currentUser?.id === product?.product_owner_id ? (
                <>
                  <OpenModalButton
                    buttonText="Delete Listing"
                    modalComponent={
                      <DeleteProduct productId={productId} />
                    }></OpenModalButton>
                  <OpenModalButton
                    buttonText="Update Listing"
                    modalComponent={
                      <UpdateProduct productId={productId} />
                    }></OpenModalButton>
                </>
              ) : null}
            </div>

            <div id="reviews-for-this-item">
              <h1>Product Reviews</h1>
              {/* <div> */}
              <GetAllReviews />
              {/* </div> */}
            </div>
          </div>
          <div id="product-information-right-parent-container">
            <div id="product-information-right">
              <h2
                style={{
                  fontWeight: "bold",
                  color: "#eb6d20",
                  fontSize: "35px",
                }}>
                {product.product_name}
              </h2>
              <h1>${product.product_price}</h1>
              <div id="shop-and-stars">
                <div>
                  <p style={{ fontWeight: "bold", padding: "5px 0px" }}>
                    Sold by {product?.user?.first_name}
                  </p>
                </div>
                <div style={{ fontWeight: "bold", padding: "5px 0px" }}>
                  {renderStars(averageRating)}
                </div>
              </div>
              <h3>{product.product_description}</h3>
              <h3 style={{ color: "#949494", padding: "5px 0px" }}>
                Category: {product.product_category}
              </h3>
            </div>
            <div id="create-review-parent-div">
              {currentUser &&
              !existingReview &&
              currentUser.id !== product.product_owner_id ? (
                <div id="review-form">
                  <ReviewForm />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <h1>Undefined</h1>
      )}
    </>
  );
}

export default ShowOneProduct;

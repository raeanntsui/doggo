import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllProductsThunk } from "../../store/products";
import "./Homepage.css";

function HomePage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.allProducts);
  const allProductsObject = Object.values(products);
  const productKeys = Object.keys(allProductsObject);
  const currentSessionUser = useSelector((state) => state.session.user);
  // console.log("🚀🚀🚀🚀🚀🚀 ~ currentSessionUser:", currentSessionUser);

  useEffect(() => {
    dispatch(getAllProductsThunk());
  }, [dispatch]);

  if (!products) return null;

  const shuffledProducts = [...productKeys].sort(() => Math.random() - 0.5);

  const randomProducts = shuffledProducts.slice(0, 3);

  return (
    <>
      <div id="homepage-parent">
        <div id="landing-page-about-info">
          {currentSessionUser ? (
            <h1
              style={{
                fontSize: "60px",
              }}>{`Welcome to Dogsy, ${currentSessionUser.first_name}!`}</h1>
          ) : (
            <h1 style={{ fontSize: "60px" }}>Welcome to Dogsy!</h1>
          )}

          <h3 style={{ paddingTop: "10px" }}>
            Here are some of our spotlight items! Feel free to check{" "}
            <NavLink id="these" exact to="/products">
              these
            </NavLink>{" "}
            shops out.
          </h3>
        </div>

        <div id="landing-page-parent">
          {randomProducts.map((productKey) => (
            <div id="landing-page-child">
              <NavLink
                key={productKey}
                to={`/products/${parseInt(productKey) + 1}`}>
                <p id="homepage-p-title">
                  {allProductsObject[productKey].product_name}
                </p>
                <img
                  id="homepage-image"
                  src={allProductsObject[productKey].product_image}
                />
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default HomePage;

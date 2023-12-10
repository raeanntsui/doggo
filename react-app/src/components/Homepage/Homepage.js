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

  useEffect(() => {
    dispatch(getAllProductsThunk());
  }, [dispatch]);

  if (!products) return null;

  const shuffledProducts = [...productKeys].sort(() => Math.random() - 0.5);

  const randomProducts = shuffledProducts.slice(0, 3);

  return (
    <>
      <div id="landing-page-about-info">
        <h1 style={{ fontSize: "80px" }}>Welcome to Dogsy!</h1>
        <h3>
          Here are some of our spotlight items! Feel free to check these shops
          out.
        </h3>
      </div>

      <div id="landing-page-parent">
        {randomProducts.map((productKey) => (
          <div id="landing-page-child">
            <NavLink
              key={productKey}
              to={`/products/${parseInt(productKey) + 1}`}>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "18px",
                  textAlign: "center",
                  color: "#eb6d20",
                }}>
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
    </>
  );
}

export default HomePage;

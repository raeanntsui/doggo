import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
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
            Here are some of our spotlight items! Feel free to check out{" "}
            <NavLink id="these" exact to="/products">
              other shops
            </NavLink>
            !
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
                <div id="product-price-corner">
                  <p
                    style={{
                      fontWeight: "bold",
                      fontSize: "20px",
                      padding: "0px 5px",
                    }}>
                    ${allProductsObject[productKey].product_price}
                  </p>
                </div>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
      <div id="footer-information">
        <h1 style={{ fontSize: "15px", padding: "10px", margin: "0px" }}>
          Created by Raeann Tsui
        </h1>
        <li
          id="github-li"
          style={{ padding: "10px", margin: "0px" }}
          className="linkedin">
          <a
            style={{ color: "#0077b5" }}
            href="https://www.linkedin.com/in/raeanntsui/"
            target="_blank"
            rel="noopener noreferrer">
            <i class="fa-brands fa-linkedin"></i>
          </a>
        </li>
        <li
          id="linkedin-li"
          style={{ padding: "10px", margin: "0px" }}
          className="social-icons-github">
          <a
            href="https://github.com/raeanntsui"
            target="_blank"
            rel="noopener noreferrer">
            <i className="fab fa-github" />
          </a>
        </li>
      </div>
    </>
  );
}

export default HomePage;

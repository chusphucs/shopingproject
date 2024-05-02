import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import store from "../../store";
import { addCart } from "../../actions/CartAction";

export default function WishList() {
  const [productList, setProductList] = useState([]);
  const userData = JSON.parse(localStorage.getItem("auth"));
  const { setWishListCount } = useContext(CartContext);
  const wishList = JSON.parse(localStorage.getItem("wishList"));
  const getWishList = () => {
    axios
      .get("http://localhost/laravel8/laravel8/public/api/product/wishlist")
      .then((res) => {
        const filteredProducts = res.data.data.filter((product) =>
          wishList.includes(product.id)
        );
        setProductList(filteredProducts);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getWishList();
  }, []);
  const handleAddCart = (productId) => {
    let cartItems = localStorage.getItem("cartItems");
    if (!cartItems) {
      cartItems = {};
    } else {
      cartItems = JSON.parse(cartItems);
    }
    if (cartItems.hasOwnProperty(productId)) {
      cartItems[productId] += 1;
    } else {
      cartItems[productId] = 1;
    }
    store.dispatch(addCart());

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };
  const handleRemoveWishList = (productId) => {
    let updateList = wishList.filter((wish) => wish != productId);
    localStorage.setItem("wishList", JSON.stringify(updateList));
    axios
      .get("http://localhost/laravel8/laravel8/public/api/product/wishlist")
      .then((res) => {
        const filteredProducts = res.data.data.filter((product) =>
          updateList.includes(product.id)
        );
        setProductList(filteredProducts);
        setWishListCount((prev) => {
          return prev - 1;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div>
        <section id="slider">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div
                  id="slider-carousel"
                  className="carousel slide"
                  data-ride="carousel"
                >
                  <ol className="carousel-indicators">
                    <li
                      data-target="#slider-carousel"
                      data-slide-to={0}
                      className="active"
                    />
                    <li data-target="#slider-carousel" data-slide-to={1} />
                    <li data-target="#slider-carousel" data-slide-to={2} />
                  </ol>
                  <div className="carousel-inner">
                    <div className="item active">
                      <div className="col-sm-6">
                        <h1>
                          <span>E</span>-SHOPPER
                        </h1>
                        <h2>Free E-Commerce Template</h2>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.{" "}
                        </p>
                        <button type="button" className="btn btn-default get">
                          Get it now
                        </button>
                      </div>
                      <div className="col-sm-6">
                        <img
                          src="images/home/girl1.jpg"
                          className="girl img-responsive"
                          alt
                        />
                        <img
                          src="images/home/pricing.png"
                          className="pricing"
                          alt
                        />
                      </div>
                    </div>
                    <div className="item">
                      <div className="col-sm-6">
                        <h1>
                          <span>E</span>-SHOPPER
                        </h1>
                        <h2>100% Responsive Design</h2>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.{" "}
                        </p>
                        <button type="button" className="btn btn-default get">
                          Get it now
                        </button>
                      </div>
                      <div className="col-sm-6">
                        <img
                          src="images/home/girl2.jpg"
                          className="girl img-responsive"
                          alt
                        />
                        <img
                          src="images/home/pricing.png"
                          className="pricing"
                          alt
                        />
                      </div>
                    </div>
                    <div className="item">
                      <div className="col-sm-6">
                        <h1>
                          <span>E</span>-SHOPPER
                        </h1>
                        <h2>Free Ecommerce Template</h2>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.{" "}
                        </p>
                        <button type="button" className="btn btn-default get">
                          Get it now
                        </button>
                      </div>
                      <div className="col-sm-6">
                        <img
                          src="images/home/girl3.jpg"
                          className="girl img-responsive"
                          alt
                        />
                        <img
                          src="images/home/pricing.png"
                          className="pricing"
                          alt
                        />
                      </div>
                    </div>
                  </div>
                  <a
                    href="#slider-carousel"
                    className="left control-carousel hidden-xs"
                    data-slide="prev"
                  >
                    <i className="fa fa-angle-left" />
                  </a>
                  <a
                    href="#slider-carousel"
                    className="right control-carousel hidden-xs"
                    data-slide="next"
                  >
                    <i className="fa fa-angle-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-sm-9 padding-right">
                <div className="features_items">
                  <h2 className="title text-center">Features Items</h2>
                  {productList?.map((product) => {
                    const image = JSON.parse(product.image);

                    return (
                      <div key={product.id} className="col-sm-4">
                        <div className="product-image-wrapper">
                          <div className="single-products">
                            <div className="productinfo text-center">
                              <img
                                src={
                                  `http://localhost/laravel8/laravel8/public/upload/product/${userData.id}/` +
                                  image[0]
                                }
                                alt="productimg"
                              />
                              <h2>${product.price}</h2>
                              <p>{product.name}</p>
                              <a
                                href="/"
                                className="btn btn-default add-to-cart"
                              >
                                <Link
                                  className="fa fa-shopping-cart"
                                  onClick={() => handleAddCart(product.id)}
                                />
                                Add to cart
                              </a>
                            </div>
                            <div className="product-overlay">
                              <div className="overlay-content">
                                <h2>${product.price}</h2>
                                <p>{product.name}</p>
                                <Link
                                  href="/"
                                  className="btn btn-default add-to-cart"
                                  onClick={() => handleAddCart(product.id)}
                                >
                                  Add to cart
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="choose">
                            <ul className="nav nav-pills nav-justified">
                              <li>
                                <Link to={`/product/detail/${product.id}`}>
                                  <i className="fa fa-plus-square" />
                                  Product detail
                                </Link>
                              </li>
                              <li>
                                <a
                                  href
                                  onClick={() =>
                                    handleRemoveWishList(product.id)
                                  }
                                >
                                  <i className="fa fa-plus-square" />
                                  Remove Wish List
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

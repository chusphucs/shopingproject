import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Carousel from "../../components/Carousel";

export default function ProductDetail() {
  const [selectedImage, setSelectedImage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    brand: "",
    status: "",
    sale: 0,
    company: "",
    image: [],
    detail: "",
  });
  const { id } = useParams();
  useEffect(() => {
    getProductById(id);
    getBrand();
  }, []);

  const getBrand = () => {
    axios
      .get("https://localhost/laravel8/laravel8/public/api/category-brand")
      .then((res) => {
        const { brand, category } = res.data;
        setBrands(brand);
        setCategories(category);
      })
      .catch((error) => console.log(error));
  };
  const getProductById = (id) => {
    axios
      .get(`http://localhost/laravel8/laravel8/public/api/product/detail/${id}`)
      .then((res) => {
        setProduct({
          name: res.data.data.name,
          price: res.data.data.price,
          category: res.data.data.id_category,
          brand: res.data.data.id_brand,
          status: res.data.data.status,
          sale: 0,
          company: res.data.data.company_profile,
          image: JSON.parse(res.data.data.image),
          detail: res.data.data.detail,
        });
        setSelectedImage(JSON.parse(res.data.data.image)[0]);
      })
      .catch((error) => console.log(error));
  };
  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };
  const handleZoomClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-sm-9 padding-right">
              <div className="product-details">
                <div className="col-sm-5">
                  <div className="view-product">
                    <img
                      src={`http://localhost/laravel8/laravel8/public/upload/product/19/${selectedImage}`}
                      alt="productimg"
                    />
                    <button onClick={handleZoomClick}>ZOOM</button>
                  </div>
                  <div>
                    <Carousel
                      arrImages={product.image}
                      onImageSelected={handleImageSelect}
                    />
                  </div>
                </div>
                <div className="col-sm-7">
                  <div className="product-information">
                    <h2>{product.name}</h2>
                    <p>Web ID: 1089772</p>
                    <span>
                      <span>US ${product.price}</span>
                      <label>Quantity:</label>
                      <input type="text" defaultValue={3} />
                      <button type="button" className="btn btn-fefault cart">
                        <i className="fa fa-shopping-cart" />
                        Add to cart
                      </button>
                    </span>
                    <p>
                      <b>Availability:</b> In Stock
                    </p>
                    <p>
                      <b>Condition:</b> New
                    </p>
                    <p>
                      <b>Brand:</b> brand
                    </p>
                  </div>
                </div>
              </div>
              <div className="category-tab shop-details-tab">
                <div className="col-sm-12">
                  <ul className="nav nav-tabs">
                    <li>
                      <a href="#details" data-toggle="tab">
                        Details
                      </a>
                    </li>
                    <li>
                      <a href="#companyprofile" data-toggle="tab">
                        Company Profile
                      </a>
                    </li>
                    <li>
                      <a href="#tag" data-toggle="tab">
                        Tag
                      </a>
                    </li>
                    <li className="active">
                      <a href="#reviews" data-toggle="tab">
                        Reviews (5)
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="tab-content">
                  <div className="tab-pane fade" id="details">
                    <div className="col-sm-3">
                      <div className="product-image-wrapper">
                        <div className="single-products">
                          <div className="productinfo text-center">
                            <img src="images/home/gallery1.jpg" alt />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <button
                              type="button"
                              className="btn btn-default add-to-cart"
                            >
                              <i className="fa fa-shopping-cart" />
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="product-image-wrapper">
                        <div className="single-products">
                          <div className="productinfo text-center">
                            <img src="images/home/gallery2.jpg" alt />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <button
                              type="button"
                              className="btn btn-default add-to-cart"
                            >
                              <i className="fa fa-shopping-cart" />
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="product-image-wrapper">
                        <div className="single-products">
                          <div className="productinfo text-center">
                            <img src="images/home/gallery3.jpg" alt />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <button
                              type="button"
                              className="btn btn-default add-to-cart"
                            >
                              <i className="fa fa-shopping-cart" />
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="product-image-wrapper">
                        <div className="single-products">
                          <div className="productinfo text-center">
                            <img src="images/home/gallery4.jpg" alt />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <button
                              type="button"
                              className="btn btn-default add-to-cart"
                            >
                              <i className="fa fa-shopping-cart" />
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="companyprofile">
                    <div className="col-sm-3">
                      <div className="product-image-wrapper">
                        <div className="single-products">
                          <div className="productinfo text-center">
                            <img src="images/home/gallery1.jpg" alt />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <button
                              type="button"
                              className="btn btn-default add-to-cart"
                            >
                              <i className="fa fa-shopping-cart" />
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="product-image-wrapper">
                        <div className="single-products">
                          <div className="productinfo text-center">
                            <img src="images/home/gallery3.jpg" alt />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <button
                              type="button"
                              className="btn btn-default add-to-cart"
                            >
                              <i className="fa fa-shopping-cart" />
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="product-image-wrapper">
                        <div className="single-products">
                          <div className="productinfo text-center">
                            <img src="images/home/gallery2.jpg" alt />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <button
                              type="button"
                              className="btn btn-default add-to-cart"
                            >
                              <i className="fa fa-shopping-cart" />
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="product-image-wrapper">
                        <div className="single-products">
                          <div className="productinfo text-center">
                            <img src="images/home/gallery4.jpg" alt />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <button
                              type="button"
                              className="btn btn-default add-to-cart"
                            >
                              <i className="fa fa-shopping-cart" />
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="tag">
                    <div className="col-sm-3">
                      <div className="product-image-wrapper">
                        <div className="single-products">
                          <div className="productinfo text-center">
                            <img src="images/home/gallery1.jpg" alt />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <button
                              type="button"
                              className="btn btn-default add-to-cart"
                            >
                              <i className="fa fa-shopping-cart" />
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="product-image-wrapper">
                        <div className="single-products">
                          <div className="productinfo text-center">
                            <img src="images/home/gallery2.jpg" alt />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <button
                              type="button"
                              className="btn btn-default add-to-cart"
                            >
                              <i className="fa fa-shopping-cart" />
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="product-image-wrapper">
                        <div className="single-products">
                          <div className="productinfo text-center">
                            <img src="images/home/gallery3.jpg" alt />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <button
                              type="button"
                              className="btn btn-default add-to-cart"
                            >
                              <i className="fa fa-shopping-cart" />
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="product-image-wrapper">
                        <div className="single-products">
                          <div className="productinfo text-center">
                            <img src="images/home/gallery4.jpg" alt />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <button
                              type="button"
                              className="btn btn-default add-to-cart"
                            >
                              <i className="fa fa-shopping-cart" />
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade active in" id="reviews">
                    <div className="col-sm-12">
                      <ul>
                        <li>
                          <a href>
                            <i className="fa fa-user" />
                            EUGEN
                          </a>
                        </li>
                        <li>
                          <a href>
                            <i className="fa fa-clock-o" />
                            12:41 PM
                          </a>
                        </li>
                        <li>
                          <a href>
                            <i className="fa fa-calendar-o" />
                            31 DEC 2014
                          </a>
                        </li>
                      </ul>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat.Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur.
                      </p>
                      <p>
                        <b>Write Your Review</b>
                      </p>
                      <form action="#">
                        <span>
                          <input type="text" placeholder="Your Name" />
                          <input type="email" placeholder="Email Address" />
                        </span>
                        <textarea name defaultValue={""} />
                        <b>Rating: </b>{" "}
                        <img src="images/product-details/rating.png" alt />
                        <button
                          type="button"
                          className="btn btn-default pull-right"
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {showModal && (
        <div
          className="modal"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: "#fefefe",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
              position: "relative",
            }}
          >
            <span
              className="close"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                fontSize: "20px",
                cursor: "pointer",
                color: "#aaa",
              }}
              onClick={handleCloseModal}
            >
              &times;
            </span>
            <img
              src={`http://localhost/laravel8/laravel8/public/upload/product/19/${selectedImage}`}
              alt="productimg"
            />
          </div>
        </div>
      )}
    </div>
  );
}

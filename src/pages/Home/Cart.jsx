import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import store from "../../store";
import { addCart, removeCart } from "../../actions/CartAction";

export default function Cart() {
  const { setCartCount } = useContext(CartContext);
  const userData = JSON.parse(localStorage.getItem("auth"));

  const jsonToApi = localStorage.getItem("cartItems");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (jsonToApi) {
      axios
        .post(
          "http://localhost/laravel8/laravel8/public/api/product/cart",
          jsonToApi
        )
        .then((res) => {
          setProducts(res.data.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  const increaseQuantityById = (productId) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return { ...product, qty: product.qty + 1 };
      }
      return product;
    });
    setProducts(updatedProducts);
    updateLocalStorage(updatedProducts);
    store.dispatch(addCart());
    // setCartCount((prev) => {
    //   return prev + 1;
    // });
  };

  const decreaseQuantityById = (productId) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId && product.qty > 0) {
        return { ...product, qty: product.qty - 1 };
      }
      return product;
    });
    setProducts(updatedProducts);
    updateLocalStorage(updatedProducts);
    store.dispatch(removeCart());
    // setCartCount((prev) => {
    //   return prev - 1;
    // });
  };

  const updateLocalStorage = (updatedProducts) => {
    const productsInLocalStorage = updatedProducts.reduce((acc, product) => {
      if (product.qty > 0) {
        acc[product.id] = product.qty;
      }
      return acc;
    }, {});
    localStorage.setItem("cartItems", JSON.stringify(productsInLocalStorage));
  };
  const removeFromCart = (productId) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(updatedProducts);
    updateLocalStorage(updatedProducts);
  };

  return (
    <div>
      <section id="cart_items">
        <div className="container">
          <div className="breadcrumbs">
            <ol className="breadcrumb">
              <li>
                <a href="#">Home</a>
              </li>
              <li className="active">Shopping Cart</li>
            </ol>
          </div>
          <div className="table-responsive cart_info">
            <table className="table table-condensed">
              <thead>
                <tr className="cart_menu">
                  <td className="image">Item</td>
                  <td className="description" />
                  <td className="price">Price</td>
                  <td className="quantity">Quantity</td>
                  <td className="total">Total</td>
                  <td />
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((product, index) => {
                    if (product.qty > 0) {
                      const image = JSON.parse(product.image);
                      return (
                        <tr key={product.id}>
                          <td className="cart_product">
                            <a href>
                              <img
                                src={`http://localhost/laravel8/laravel8/public/upload/product/${userData.id}/${image[0]}`}
                                alt="productimg"
                                style={{
                                  width: "60px",
                                  height: "60px",
                                }}
                              />
                            </a>
                          </td>
                          <td className="cart_description">
                            <h4>
                              <a href>{product.name}</a>
                            </h4>
                            <p>Web ID: 1089772</p>
                          </td>
                          <td className="cart_price">
                            <p>{product.price}</p>
                          </td>
                          <td className="cart_quantity">
                            <div className="cart_quantity_button">
                              <a
                                className="cart_quantity_up"
                                style={{
                                  cursor: "pointer",
                                }}
                                href
                                onClick={() => increaseQuantityById(product.id)}
                              >
                                +
                              </a>
                              <input
                                className="cart_quantity_input"
                                type="text"
                                name="quantity"
                                value={product.qty}
                                autoComplete="off"
                                size={2}
                              />
                              <a
                                className="cart_quantity_down"
                                style={{
                                  cursor: "pointer",
                                }}
                                href
                                onClick={() => decreaseQuantityById(product.id)}
                              >
                                -
                              </a>
                            </div>
                          </td>
                          <td className="cart_total">
                            <p className="cart_total_price">
                              {product.qty * product.price}
                            </p>
                          </td>
                          <td className="cart_delete">
                            <a
                              className="cart_quantity_delete"
                              href
                              onClick={() => removeFromCart(product.id)}
                            >
                              <i className="fa fa-times" />
                            </a>
                          </td>
                        </tr>
                      );
                    } else {
                      return null;
                    }
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section id="do_action">
        <div className="container">
          <div className="heading">
            <h3>What would you like to do next?</h3>
            <p>
              Choose if you have a discount code or reward points you want to
              use or would like to estimate your delivery cost.
            </p>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="chose_area">
                <ul className="user_option">
                  <li>
                    <input type="checkbox" />
                    <label>Use Coupon Code</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>Use Gift Voucher</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>Estimate Shipping &amp; Taxes</label>
                  </li>
                </ul>
                <ul className="user_info">
                  <li className="single_field">
                    <label>Country:</label>
                    <select>
                      <option>United States</option>
                      <option>Bangladesh</option>
                      <option>UK</option>
                      <option>India</option>
                      <option>Pakistan</option>
                      <option>Ucrane</option>
                      <option>Canada</option>
                      <option>Dubai</option>
                    </select>
                  </li>
                  <li className="single_field">
                    <label>Region / State:</label>
                    <select>
                      <option>Select</option>
                      <option>Dhaka</option>
                      <option>London</option>
                      <option>Dillih</option>
                      <option>Lahore</option>
                      <option>Alaska</option>
                      <option>Canada</option>
                      <option>Dubai</option>
                    </select>
                  </li>
                  <li className="single_field zip-field">
                    <label>Zip Code:</label>
                    <input type="text" />
                  </li>
                </ul>
                <a className="btn btn-default update" href>
                  Get Quotes
                </a>
                <a className="btn btn-default check_out" href>
                  Continue
                </a>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="total_area">
                <ul>
                  <li>
                    Cart Sub Total <span>$59</span>
                  </li>
                  <li>
                    Eco Tax <span>$2</span>
                  </li>
                  <li>
                    Shipping Cost <span>Free</span>
                  </li>
                  <li>
                    Total <span>$61</span>
                  </li>
                </ul>
                <a className="btn btn-default update" href>
                  Update
                </a>
                <a className="btn btn-default check_out" href>
                  Check Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

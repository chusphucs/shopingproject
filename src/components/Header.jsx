import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { useSelector } from "react-redux";

export default function Header() {
  const cartCountRedux = useSelector((state) => state.cart.count);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("auth"));
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("auth");
    navigate("/login");
  };
  const logoutLinkStyle = {
    cursor: "pointer",
  };

  const { wishListCount } = useContext(CartContext);
  return (
    <div>
      <header id="header">
        <div className="header_top">
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <div className="contactinfo">
                  <ul className="nav nav-pills">
                    <li>
                      <a href>
                        <i className="fa fa-phone" /> +2 95 01 88 821
                      </a>
                    </li>
                    <li>
                      <a href>
                        <i className="fa fa-envelope" /> info@domain.com
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="social-icons pull-right">
                  <ul className="nav navbar-nav">
                    <li>
                      <a href>
                        <i className="fa fa-facebook" />
                      </a>
                    </li>
                    <li>
                      <a href>
                        <i className="fa fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href>
                        <i className="fa fa-linkedin" />
                      </a>
                    </li>
                    <li>
                      <a href>
                        <i className="fa fa-dribbble" />
                      </a>
                    </li>
                    <li>
                      <a href>
                        <i className="fa fa-google-plus" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-middle">
          <div className="container">
            <div className="row">
              <div className="col-md-4 clearfix">
                <div className="logo pull-left">
                  <a href="/">
                    <img src="images/home/logo.png" alt />
                  </a>
                </div>
                <div className="btn-group pull-right clearfix">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-default dropdown-toggle usa"
                      data-toggle="dropdown"
                    >
                      USA
                      <span className="caret" />
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a href>Canada</a>
                      </li>
                      <li>
                        <a href>UK</a>
                      </li>
                    </ul>
                  </div>
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-default dropdown-toggle usa"
                      data-toggle="dropdown"
                    >
                      DOLLAR
                      <span className="caret" />
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a href>Canadian Dollar</a>
                      </li>
                      <li>
                        <a href>Pound</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-8 clearfix">
                <div className="shop-menu clearfix pull-right">
                  <ul className="nav navbar-nav">
                    {token ? (
                      <li>
                        {userData.name ? (
                          <Link to={`/user/update/${userData.id}`}>
                            <i className="fa fa-user" /> {userData.name}
                          </Link>
                        ) : (
                          <Link to={`/user/update/${userData.id}`}>
                            <i className="fa fa-user" /> User
                          </Link>
                        )}
                      </li>
                    ) : (
                      <li>
                        <a href="/">
                          <i className="fa fa-user" /> Guest
                        </a>
                      </li>
                    )}

                    <li>
                      <Link to={"/wishlist"}>
                        <i className="fa fa-lock">Wish list</i>
                        {userData ? wishListCount : ""}
                      </Link>
                    </li>
                    <li>
                      <a href="checkout.html">
                        <i className="fa fa-crosshairs" /> Checkout
                      </a>
                    </li>
                    <li>
                      <Link to={`/cart`}>
                        <i class="fa fa-shopping-cart"></i>
                        {userData ? cartCountRedux : ""}
                      </Link>
                    </li>
                    <li>
                      {!token ? (
                        <Link to={"/login"}>
                          <i className="fa fa-lock" /> Login
                        </Link>
                      ) : (
                        <a onClick={handleLogout} style={logoutLinkStyle}>
                          <i className="fa fa-lock" /> Logout
                        </a>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-bottom">
          <div className="container">
            <div className="row">
              <div className="col-sm-9">
                <div className="navbar-header">
                  <button
                    type="button"
                    className="navbar-toggle"
                    data-toggle="collapse"
                    data-target=".navbar-collapse"
                  >
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                  </button>
                </div>
                <div className="mainmenu pull-left">
                  <ul className="nav navbar-nav collapse navbar-collapse">
                    <li>
                      <a href="/">Home</a>
                    </li>
                    <li className="dropdown">
                      <a href="/">
                        Shop
                        <i className="fa fa-angle-down" />
                      </a>
                      <ul role="menu" className="sub-menu">
                        <li>
                          <a href="shop.html">Products</a>
                        </li>
                        <li>
                          <a href="product-details.html">Product Details</a>
                        </li>
                        <li>
                          <a href="checkout.html">Checkout</a>
                        </li>
                        <li>
                          <a href="cart.html">Cart</a>
                        </li>
                        <li>
                          <a href="login.html">Login</a>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown">
                      <a href="#" className="active">
                        Blog
                        <i className="fa fa-angle-down" />
                      </a>
                      <ul role="menu" className="sub-menu">
                        <li>
                          <Link to={"/blog"}>Blog List</Link>
                        </li>
                        <li>
                          <a href="blog-single.html">Blog Single</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="404.html">404</a>
                    </li>
                    <li>
                      <a href="contact-us.html">Contact</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="search_box pull-right">
                  <input type="text" placeholder="Search" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

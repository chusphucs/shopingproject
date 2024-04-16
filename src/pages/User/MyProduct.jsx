import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function MyProduct() {
  const accessToken = localStorage.getItem("token");
  const [myProductList, setMyProductList] = useState([]);
  const userData = JSON.parse(localStorage.getItem("auth"));
  useEffect(() => {
    axios
      .get("https://localhost/laravel8/laravel8/public/api/user/my-product", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setMyProductList(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleDelete = (productId) => {
    axios
      .get(
        `https://localhost/laravel8/laravel8/public/api/user/product/delete/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        setMyProductList(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="table-responsive cart_info">
        <table className="table table-condensed">
          <thead>
            <tr className="cart_menu">
              <td className="id">#</td>
              <td className="name">Name</td>
              <td className="image">Image</td>
              <td className="price">Price</td>
              <td className="action">Action</td>
              <td />
            </tr>
          </thead>
          <tbody>
            {myProductList &&
              myProductList.map((product) => {
                const image = JSON.parse(product.image);
                return (
                  <tr key={product.id}>
                    <td className="product_id">
                      <p>{product.id}</p>
                    </td>
                    <td className="product_name">
                      <p>{product.name}</p>
                    </td>
                    <td className="product_img">
                      <a href>
                        <img
                          src={
                            `http://localhost/laravel8/laravel8/public/upload/product/${userData.id}/` +
                            image[0]
                          }
                          alt="productimg"
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "10%",
                          }}
                        />
                      </a>
                    </td>
                    <td className="product_price">
                      <p>{product.price}</p>
                    </td>
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      <td className="cart_delete">
                        <a
                          className="cart_quantity_delete"
                          onClick={() => handleDelete(product.id)}
                          href
                        >
                          <i className="fa fa-times" />
                        </a>
                      </td>
                      <td className="cart_delete">
                        <Link
                          className="cart_quantity_delete"
                          to={`/user/product/update/${product.id}`}
                        >
                          <i className="fa fa-edit" />
                        </Link>
                      </td>
                    </div>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <Link to={"/user/addproduct"}>Add new</Link>
      </div>
    </div>
  );
}

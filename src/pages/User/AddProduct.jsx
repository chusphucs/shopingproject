// Import useEffect, useState, useNavigate và axios ở đây

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const accessToken = localStorage.getItem("token");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    brand: "",
    status: "",
    sale: 0,
    company: "",
    file: [],
    detail: "",
  });

  useEffect(() => {
    axios
      .get("https://localhost/laravel8/laravel8/public/api/category-brand")
      .then((res) => {
        const { brand, category } = res.data;
        setBrands(brand);
        setCategories(category);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(formData);
  };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      file: files,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formDataToSend = new FormData();
    for (let key in formData) {
      if (key === "file") {
        formData[key].forEach((file, index) => {
          formDataToSend.append(`file[${index}]`, file);
        });
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }
    console.log(formData);
    formDataToSend.forEach((value, key) => {
      console.log(key, value);
    });
    axios
      .post(
        "http://localhost/laravel8/laravel8/public/api/user/product/add",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          setErrors(res.data.errors);
        } else {
          navigate("/user/myproduct");
          alert("Thêm sản phẩm thành công");
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <section id="form">
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <div className="signup-form">
                <h2>Create Product</h2>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={handleChange}
                    value={formData.name}
                  />
                  <input
                    type="text"
                    placeholder="Price"
                    name="price"
                    onChange={handleChange}
                    value={formData.price}
                  />
                  <select
                    value={formData.category}
                    onChange={handleChange}
                    name="category"
                  >
                    <option value="">Chọn category</option>
                    {categories.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.category}
                      </option>
                    ))}
                  </select>
                  <select
                    value={formData.brand}
                    onChange={handleChange}
                    name="brand"
                  >
                    <option value="">Chọn Brand</option>
                    {brands.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.brand}
                      </option>
                    ))}
                  </select>
                  <select
                    value={formData.status}
                    onChange={handleChange}
                    name="status"
                  >
                    <option value="">Chọn status</option>
                    <option value="1">New</option>
                    <option value="0">Sale</option>
                  </select>
                  {formData.status === "0" && (
                    <input
                      type="number"
                      placeholder="Nhập giá sale"
                      value={formData.sale}
                      onChange={handleChange}
                      name="sale"
                    />
                  )}
                  <input
                    type="text"
                    placeholder="Company"
                    name="company"
                    onChange={handleChange}
                    value={formData.company}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                  />
                  <textarea
                    name="detail"
                    rows={11}
                    value={formData.detail}
                    onChange={handleChange}
                  />
                  <button type="submit" className="btn btn-default">
                    Signup
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

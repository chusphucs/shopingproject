import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    level: 0,
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://localhost/laravel8/laravel8/public/api/login", formData)
      .then((res) => {
        if (res.status === 200) {
          alert("dang nhap thanh cong");
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("auth", JSON.stringify(res.data.Auth));
          console.log(res);
          navigate("/");
        } else {
          alert("dang nhap that bai");
        }
      });
  };
  return (
    <div>
      <section id="form">
        <div className="container">
          <div className="col-sm-4 col-sm-offset-1">
            <div className="login-form">
              <h2>Login to your account</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <span>
                  <input type="checkbox" className="checkbox" name="" />
                  Keep me signed in
                </span>
                <button type="submit" className="btn btn-default">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

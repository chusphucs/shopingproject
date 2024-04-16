import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RenderError from "../../components/RenderError";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(null);
  const [file, setFile] = useState(null);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    avatar: "",
    level: 0,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formDataToSend = {
      ...formData,
      avatar: avatar,
    };
    axios
      .post(
        "https://localhost/laravel8/laravel8/public/api/register",
        formDataToSend
      )
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          setErrors(res.data.errors);
        } else {
          navigate("/login");
          alert("register thanh cong");
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleUserInputFile = (e) => {
    const files = e.target.files;
    const file = files[0];
    if (file.size > 1024 * 1024) {
      alert("Kích thước hình ảnh phải nhỏ hơn 1MB");
      return;
    }
    if (!file.type.startsWith("image/")) {
      alert("Vui lòng chỉ chọn tệp hình ảnh");
      return;
    }
    let reader = new FileReader();
    reader.onload = (e) => {
      setAvatar(e.target.result);
      setFile(file);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <section id="form">
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <div className="signup-form">
                <h2>New User Signup!</h2>
                <RenderError errors={errors} />

                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={handleChange}
                    value={formData.name}
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                  />
                  <input
                    type="text"
                    placeholder="Phone"
                    name="phone"
                    onChange={handleChange}
                    value={formData.phone}
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    name="address"
                    onChange={handleChange}
                    value={formData.address}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUserInputFile}
                  />
                  <input
                    type="number"
                    placeholder="Level (0 or 1)"
                    name="level"
                    onChange={handleChange}
                    value={formData.level}
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

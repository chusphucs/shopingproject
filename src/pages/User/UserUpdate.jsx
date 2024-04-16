import axios from "axios";
import React, { useState } from "react";

export default function UserUpdate() {
  const [avatar, setAvatar] = useState(null);
  const [new_pass, setNew_Pass] = useState("");
  const [file, setFile] = useState(null);

  const [errors, setErrors] = useState({});
  const userData = JSON.parse(localStorage.getItem("auth"));
  const token = localStorage.getItem("token");
  const initDataForm = {
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    address: userData.address,
    avatar: userData.avatar,
  };

  const [formData, setFormData] = useState(initDataForm);

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
      password: new_pass ? new_pass : "",
      avatar: avatar,
    };
    axios
      .post(
        `https://localhost/laravel8/laravel8/public/api/user/update/${userData.id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.errors) {
          setErrors(res.data.errors);
        } else {
          const updatedUserData = { ...userData, ...formData };
          localStorage.setItem("auth", JSON.stringify(updatedUserData));
          console.log(updatedUserData);
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
    <div
      style={{
        marginBottom: "32px",
        marginTop: "16px",
      }}
    >
      <div class="blog-post-area">
        <h2 class="title text-center">Update user</h2>
        <div class="signup-form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={formData.name}
            />
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              readOnly
            />
            <input
              type="password"
              name="newpass"
              onChange={(e) => {
                setNew_Pass(e.target.value);
              }}
              value={new_pass}
            />
            <input
              type="text"
              name="phone"
              onChange={handleChange}
              value={formData.phone}
            />
            <input
              type="text"
              name="address"
              onChange={handleChange}
              value={formData.address}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleUserInputFile}
            />

            <button type="submit" className="btn btn-default">
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

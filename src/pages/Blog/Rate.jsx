import axios from "axios";
import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";

export default function Rate({ idBlog, setNumRate }) {
  const userData = JSON.parse(localStorage.getItem("auth"));
  const [rate, setRate] = useState(0);
  // lấy rate trả về từ api tính toán và lưu giá trị
  const getRate = () => {
    axios
      .get(`http://localhost/laravel8/laravel8/public/api/blog/rate/${idBlog}`)
      .then((res) => {
        const data = Object.values(res.data.data);
        if (data && data.length > 0) {
          const sum = data.reduce((acc, curr) => acc + curr.rate, 0);
          const average = sum / data.length;
          setRate(average);
          setNumRate(data.length);
        } else {
          console.log("No data available for calculating rate.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeRating = (newRating, name) => {
    handleSendRating(newRating, name);
  };

  const handleSendRating = (Rating, name) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Ban chua dang nhap");
      return;
    }
    if (Rating === 0) {
      alert("Ban chua danh gia");
      return;
    }

    const newRating = {
      blog_id: idBlog,
      user_id: userData.id,
      rate: Rating,
    };

    axios
      .post(
        `http://localhost/laravel8/laravel8/public/api/blog/rate/${idBlog}`,
        newRating,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        getRate();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getRate();
  }, []);
  return (
    <div>
      <StarRatings
        rating={rate}
        starRatedColor="orange"
        starDimension="40px"
        starSpacing="15px"
        changeRating={changeRating}
        name="rating"
      />
    </div>
  );
}

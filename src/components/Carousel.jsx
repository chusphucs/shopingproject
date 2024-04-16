import React from "react";
import Slider from "react-slick";
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";

export default function Carousel({ arrImages, onImageSelected }) {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2200,
  };
  return (
    <Slider {...settings}>
      {arrImages.map((image, index) => (
        <img
          style={{
            width: "100px",
            height: "100px",
          }}
          key={index}
          src={`http://localhost/laravel8/laravel8/public/upload/product/19/${image}`}
          alt={`Slide ${index + 1}`}
          onClick={() => {
            onImageSelected(image);
          }}
        />
      ))}
    </Slider>
  );
}

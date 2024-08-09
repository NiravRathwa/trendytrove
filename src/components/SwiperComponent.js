import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import ProductCard from "./ProductCard";

const SwiperComponent = () => {
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper mt-10"
    >
      <SwiperSlide className="">
        <ProductCard />{" "}
      </SwiperSlide>
      <SwiperSlide className="">
        <ProductCard />{" "}
      </SwiperSlide>
      <SwiperSlide className="">
        <ProductCard />{" "}
      </SwiperSlide>
      <SwiperSlide className="">
        <ProductCard />{" "}
      </SwiperSlide>
      <SwiperSlide className="">
        <ProductCard />{" "}
      </SwiperSlide>
      <SwiperSlide className="">
        <ProductCard />{" "}
      </SwiperSlide>
      <SwiperSlide className="">
        <ProductCard />{" "}
      </SwiperSlide>
      <SwiperSlide className="">
        <ProductCard />{" "}
      </SwiperSlide>
      <SwiperSlide className="">
        <ProductCard />{" "}
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperComponent;

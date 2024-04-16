'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';

export default function AllCategory() {
  const [categorys, setCategorys] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/category');

        if (response.ok) {
          const data: any[] = await response.json();
          setCategorys(data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        <div>
          {categorys && categorys.map((category: any) => (
            <SwiperSlide className="m-8" key={category.id}>
              <button type="button">
                <div className=" text-center flex flex-col items-center">
                  <div className="flex items-center bg-gradient-to-b from-firstStepGradient via-secondStepGradient to-thirdStepGradient p-[2px] rounded-full h-32 w-32">
                    <Image src={category.image} alt={category.name} width={1000} height={1000} className="rounded-full" />
                  </div>
                  <h2 className="text-sm font-Luciole_Regular mt-4 text-nowrap text-center">{category.name}</h2>
                </div>
              </button>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </>
  );
}
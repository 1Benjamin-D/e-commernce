'use client'

import { cryptPassword } from "@/utils/bcrypt";
import React, { useEffect, useState } from "react";
import LoadingC from "../loadingC";
import Image from "next/image";

interface Category {
  id: number;
  name: string;
  image: string;
  id_sub_cat: { Sub_category: SubCategory }[];
}

interface SubCategory {
  id: number;
  name: string;
  image: string;
}

interface FiltersProps {
  onCategoryChange: (categoryId: number | null) => void;
  onSubCategoryChange: (subCategoryId: number | null) => void;
}

const Filters: React.FC<FiltersProps> = ({ onCategoryChange, onSubCategoryChange }) => {
  const [categorys, setCategorys] = useState<Category[]>([]);
  const [isloading, setLoading] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/category', {
          method: "GET",
          headers: {
            "api-key": await cryptPassword(process.env.NEXT_PUBLIC_API_KEY!)
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const data = await response.json();
        setCategorys(data);
        setLoading(true);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchData();
  }, []);

  const handleCategoryClick = (categoryId: number) => {
    setIsClicked(!isClicked);
    setSelectedCategory(categoryId);
    setSelectedSubCategory(null);
    onCategoryChange(categoryId);
  };

  const handleSubCategoryClick = (subCategoryId: number) => {
    setSelectedSubCategory(subCategoryId);
    onSubCategoryChange(subCategoryId);
  };
  if (!isloading || !categorys) {
    const loadingCards = Array.from({ length: 6 }, (_, index) => (
      <div key={index} className="categorys-card">
        <LoadingC />
      </div>
    ));

    return (
      <div className="flex items-center mt-[50px] mb-[50px] lg:flex-row lg:justify-around lg:flex-nowrap gap-4 m-4 lg:w-[60%] lg:ml-[20%]">
        {loadingCards}
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center overflow-y-scroll lg:overflow-y-hidden">
      {categorys && categorys.map((category) => (
        <div key={category.id} className="flex justify-center items-center flex-col gap-3">
          <div id={String(category.id)}
            onClick={() => handleCategoryClick(category.id)}
            className={`${isClicked && selectedCategory !== category.id ? "hidden" : "flex"} flex-col justify-center items-center gap-3 text-center w-128 p-5 cursor-pointer`}>
            <div className="bg-gradient-to-b from-firstStepGradient via-secondStepGradient to-thirdStepGradient w-28 h-28 p-1 rounded-full">
              <Image src={category.image}
                alt={category.name}
                height={0}
                width={100}
                className="w-[128px] h-auto rounded-full" />
            </div>
            <h2 className="text-sm font-Luciole_Regular mt-4 text-nowrap text-center">{category.name}</h2>
          </div>

          <div
            className={`${isClicked && selectedCategory === category.id ? "flex" : "hidden"}`}
          >
            {category.id_sub_cat.map((sub_cat) => (
              <div key={sub_cat.Sub_category.id} className="flex flex-col justify-center items-center text-center w-32 cursor-pointer" onClick={() => handleSubCategoryClick(sub_cat.Sub_category.id)}>
                <div className="bg-gradient-to-b from-firstStepGradient via-secondStepGradient to-thirdStepGradient p-1 rounded-full">
                  <Image src={sub_cat.Sub_category.image}
                    alt={sub_cat.Sub_category.name}
                    height={0}
                    width={100}
                    className="w-20 h-auto rounded-full" />
                </div>
                <h2 className="text-sm font-Luciole_Regular mt-4 text-nowrap text-center">{sub_cat.Sub_category.name}</h2>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Filters;

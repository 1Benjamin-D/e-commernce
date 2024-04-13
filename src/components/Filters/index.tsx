'use client'
import React, { useState, useEffect } from "react";

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
  const [data, setData] = useState<Category[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/category');
        const json: Category[] = await response.json();
        setData(json);
        setLoaded(true);
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

  if (!loaded) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center overflow-y-scroll">
      {data.map((category) => (
        <div key={category.id} className="flex justify-center items-center flex-col gap-3">
          <div
            id={String(category.id)}
            onClick={() => handleCategoryClick(category.id)}
            className={`${isClicked && selectedCategory !== category.id ? "hidden" : "flex"} flex-col justify-center items-center gap-3 text-center w-128 p-5 cursor-pointer`}
          >
            <div className="bg-gradient-to-b from-firstStepGradient via-secondStepGradient to-thirdStepGradient p-1 rounded-full">
              <img
                src={category.image}
                alt=""
                className="h-28 w-auto rounded-full"
              />
            </div>
            <h2 className="text-sm font-Luciole_Regular mt-4 text-nowrap text-center">{category.name}</h2>
          </div>
          <div
            className={`${isClicked && selectedCategory === category.id ? "flex" : "hidden"}`}
          >
            {category.id_sub_cat.map((sub_cat) => (
              <div key={sub_cat.Sub_category.id} className="flex flex-col justify-center items-center text-center w-32 cursor-pointer" onClick={() => handleSubCategoryClick(sub_cat.Sub_category.id)}>
                <div className="bg-gradient-to-b from-firstStepGradient via-secondStepGradient to-thirdStepGradient p-1 rounded-full">
                  <img
                    src={sub_cat.Sub_category.image}
                    alt=""
                    className="h-20 w-auto rounded-full"
                  />
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

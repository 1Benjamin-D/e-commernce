'use client'
import React, { useEffect, useState } from "react";

interface FiltersProps {
  onTypeChange: (selectedType: string | null) => void;
}

const Filters: React.FC<FiltersProps> = ({ onTypeChange }) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/category');

        if (response.ok) {
          const data: any[] = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = async (categoryId: string) => {
    if (categoryId === selectedCategory) {
      setSelectedCategory(null);
      onTypeChange(null);
    } else {
      try {
        const response = await fetch(`/api/category?id_cat=${categoryId}`);

        if (response.ok) {
          const data: any[] = await response.json();
          setCategories(data);
          setSelectedCategory(categoryId);
          onTypeChange(null);
        } else {
          console.error('Error fetching subcategories - response not OK');
        }
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    }
  };

  const handleSubCategoryChange = (subCategoryId: string) => {
    onTypeChange(subCategoryId === selectedCategory ? null : subCategoryId);
  };

  return (
    <div className="justify-around hidden lg:flex">
      {categories.map((category: any) => (
        <><div className="flex flex-col items-center">
          <div key={category.id} className={``}>
            <button
              type="button"
              value={category.id}
              onClick={() => handleCategoryChange(category.id)}
            >
              <div className="text-center flex flex-col items-center">
                <div className="bg-gradient-to-b from-firstStepGradient via-secondStepGradient to-thirdStepGradient p-[2px] rounded-full">
                  <img src={category.image} alt={category.name} className="rounded-full w-20 h-20" />
                </div>
                <h2 className="text-sm font-Luciole_Regular mt-4 text-nowrap text-center">{category.name}</h2>
              </div>
            </button>
          </div>

          <div className="w-[100%]">
            {selectedCategory === category.id && category.id_sub_cat && (
              <div className="justify-around">
                {category.id_sub_cat.map((subcatName: any) => (
                  <button
                    key={subcatName.Sub_category.id}
                    type="button"
                    value={subcatName.Sub_category.id}
                    onClick={() => handleSubCategoryChange(subcatName.Sub_category.id)}
                  >
                    <div className="text-center flex flex-col items-center">
                      <div className="bg-gradient-to-b from-firstStepGradient via-secondStepGradient to-thirdStepGradient p-[2px] rounded-full">
                        <img src={subcatName.Sub_category.image} alt={subcatName.Sub_category.name} className="rounded-full w-20 h-20" />
                      </div>
                      <h2 className="text-sm font-Luciole_Regular mt-4 text-nowrap text-center">{subcatName.Sub_category.name}</h2>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div></>
      ))}
    </div>
  );
};

export default Filters;

'use client'
import React, {useState} from "react";
import Products from "./products/page";
import Filters from "@/components/Filters";
import { SearchInput } from "@/components/SearchInput";

const Home: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<number | null>(null);

  const handleCategoryChange = (categoryId: number | null) => {
    if (categoryId === selectedCategoryId) {
      if (selectedSubCategoryId !== null) {
        setSelectedSubCategoryId(null);
      }
      setSelectedCategoryId(null);
    } else {
      setSelectedCategoryId(categoryId);
      setSelectedSubCategoryId(null);
    }
  };

  const handleSubCategoryChange = (subCategoryId: number | null) => {
    if (subCategoryId === selectedSubCategoryId) {
      setSelectedSubCategoryId(null);
    }else{
      setSelectedSubCategoryId(subCategoryId);
    }
  };

  return (
    <main>
      <Filters
        onCategoryChange={handleCategoryChange}
        onSubCategoryChange={handleSubCategoryChange}
      />
      <div className="lg:hidden">
        <SearchInput/>
      </div>
      <Products
        selectedCategoryId={selectedCategoryId}
        selectedSubCategoryId={selectedSubCategoryId}
      />
    </main>
  );
};

export default Home;

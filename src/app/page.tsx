'use client'
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Input from "@/components/ui/Input";
import Image from "next/image";
import Products from "./products/page";
import Footer from "@/components/Footer";
import Filters from "@/components/Filters";

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
      <Navbar />
      <Filters
        onCategoryChange={handleCategoryChange}
        onSubCategoryChange={handleSubCategoryChange}
      />
      <div className="lg:hidden">
        <Input>
          <Image src="/Images/Search-logo.png" alt="search_logo" width={1000} height={1000} className="w-7 h-7" />
        </Input>
      </div>
      <Products
        selectedCategoryId={selectedCategoryId}
        selectedSubCategoryId={selectedSubCategoryId}
      />
      <Footer />
    </main>
  );
};

export default Home;

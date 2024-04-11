'use client'
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Input from "@/components/ui/Input";
import Image from "next/image";
import Products from "./products/page";
import Footer from "@/components/Footer";
import Filters from "@/components/Filters";

const Home: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleTypeChange = (selectedType: string | null) => {
    setSelectedType(selectedType);
  };

  return (
    <main className="">
      <Navbar />
      <Filters onTypeChange={handleTypeChange}/>
      <div className="lg:hidden">
        <Input>
          <Image src="/Images/Search-logo.png" alt="search_logo" width={1000} height={1000} className="w-7 h-7" />
        </Input>
      </div>
      <Products/>
      <Footer />
    </main>
  );
};

export default Home;
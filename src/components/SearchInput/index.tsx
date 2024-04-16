'use client'

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BorderGradient from "../ui/BorderGradient";
import { cryptPassword } from "@/utils/bcrypt";

interface Product {
  id: number;
  product_name: string;
  product_image: string;
}

export function SearchInput() {
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProductSuggestions = async (searchTerm: string) => {
      try {
        if (searchTerm && searchTerm.length >= 3) {
          const response = await fetch(`/api/products?name=${encodeURIComponent(searchTerm)}`, {
            method: "GET",
            headers: {
              "api-key": await cryptPassword(process.env.NEXT_PUBLIC_API_KEY!)
            },
          });
          if (response.ok) {
            const data = await response.json();

            if (Array.isArray(data)) {
              const filteredSuggestions = data.filter((product: any) => {
                return product.product_name && product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) && product.product_image && product.id;
              });
              setSuggestions(filteredSuggestions);
            } else {
              setSuggestions([]);
            }
          } else {
            setSuggestions([]);
          }
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching product suggestions:", error);
        setSuggestions([]);
      }
    };

    if (typeof inputValue === 'string') {
      fetchProductSuggestions(inputValue.trim());
    }
  }, [inputValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const handleSuggestionClick = (suggestion: Product) => {
    setInputValue('');
    setSuggestions([]);
  };

  const renderSuggestions = () => {
    if (suggestions.length > 0) {
      return (
        <div className="absolute bg-white border border-gray-200 w-full rounded-b-md shadow-lg z-10">
          {suggestions.map((suggestion) => (
            <div key={suggestion.product_name} onClick={() => handleSuggestionClick(suggestion)}>
              <Link href={`/${suggestion.id}`} className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center justify-around border-t-2 border-double">
                <Image src={suggestion.product_image} alt={suggestion.product_name} width={100} height={100} />
                <span className="ml-2">{suggestion.product_name}</span>
              </Link>
            </div>
          ))}
        </div>
      );
    }

  };

  return (
    <div className="relative">
      <BorderGradient className=" w-[230px] h-[65px] lg:w-[410px] lg:h-[40px]">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="w-full focus:outline-none text-center outline-none p-3 text-2xl lg:text-sm lg:p-0"
        />
        <button type="button">
          <Image src="/Images/Search-logo.png" alt="search_logo" width={1000} height={1000} className="w-7 h-7" id="search" />
        </button>
      </BorderGradient>
      {renderSuggestions()}
    </div>
  );
}



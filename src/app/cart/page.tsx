"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

type CartItemProps = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string | null;
  onRemove: (id: number) => void; // Fonction à appeler pour retirer un produit du panier.
};

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  description,
  price,
  image,
  onRemove,
}) => {
  return (
    <div className="flex flex-col items-center justify-between p-4 border-b border-gray-300 bg-gradient-to-r from-[#FF5863] via-[#FD8F50] to-[#FFC53E] rounded-xl">
      {/* Affichage de l'image du produit s'il y en a une. */}
      {image && (
        <div className="mb-4">
          <Image src={image} alt={name} width={96} height={96} layout="fixed" />
        </div>
      )}
      {/* Nom et description du produit. */}
      <div className="text-center">
        <p className="text-lg font-bold">{name}</p>
        <p className="text-gray-700">{description}</p>
      </div>
      {/* Prix du produit. */}
      <div className="mt-4">
        <span className="font-bold">{`${price.toFixed(2)}€`}</span>
      </div>
      {/* Bouton pour supprimer le produit du panier. */}
      <button
        className="mt-4 text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded shadow"
        onClick={() => onRemove(id)}
      >
        Supprimer
      </button>
    </div>
  );
};

const Cart: React.FC = () => {
  const [items, setItems] = useState<CartItemProps[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch(`/api/getproductbyid`);

        if (!response.ok) {
          throw new Error(
            "Problème lors de la récupération des données du panier"
          );
        }
        const data = await response.json();

        let cartItems = data.data;
        console.log(cartItems);

        const newItems = cartItems.map((cartItem: any) => ({
          id: cartItem.id,
          name: cartItem.Product.product_name,
          description: cartItem.Product.product_description,
          price: cartItem.Product.product_price,
          image: cartItem.Product.product_image,
          onRemove: removeItemFromCart,
        }));
        setItems(newItems);
      } catch (error) {
        console.error("Erreur lors du chargement des produits :", error);
      }
    };

    loadProducts();
  }, []);

  // Fonction pour retirer un produit du panier.
  const removeItemFromCart = (id: number) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  // Calcul du prix total du panier.
  const totalPrice = items
    .reduce((total, item) => total + item.price, 0)
    .toFixed(2);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-white">
      <div className="w-full h-full p-4">
        <div className="grid grid-cols-3 gap-4 shadow-lg rounded-lg h-full">
          {items.length > 0 ? (
            items.map((item) => <CartItem key={item.id} {...item} />)
          ) : (
            <p className="text-center p-4 col-span-3">Votre panier est vide.</p>
          )}
          <div className="flex justify-center items-center p-4 gap-10 bg-gray-100 rounded-b-lg col-span-3">
            <span className="font-bold">Total: {totalPrice}€</span>
            <button className="bg-red-500 hover:bg-red-600  text-white px-5 py-2 rounded shadow">
              Payer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

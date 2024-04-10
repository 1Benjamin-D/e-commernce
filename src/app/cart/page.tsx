"use client";
import React, { useState } from "react";
import Image from "next/image";

type CartItemProps = {
  id: number;
  name: string;
  description: string;
  price: number;
  onRemove: (id: number) => void;
};

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  description,
  price,
  onRemove,
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-300">
      <div className="flex flex-col h-full w-fit bg-gradient-to-r from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-0.5 rounded-xl">
        <Image className="w-24 h-auto" src={""} alt={name} />
        <div className="flex-grow mx-4">
          <p className="text-lg font-bold">{name}</p>
          <p className="text-gray-700">{description}</p>
        </div>
        <span className="font-bold">{`${price}€`}</span>
        <button
          className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded shadow"
          onClick={() => onRemove(id)}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

const Cart: React.FC = () => {
  const [items, setItems] = useState<CartItemProps[]>([]);

  const totalPrice = items.reduce((total, item) => total + item.price, 0);

  const removeItemFromCart = (id: number) => {
    console.log(`Suppression de l'article avec l'id: ${id}`);
    setItems((currentItems) => {
      const updatedItems = currentItems.filter((item) => item.id !== id);
      console.log("Nouvel état du panier après suppression:", updatedItems);
      return updatedItems;
    });
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-4 min-h-screen bg-white">
      <div className="container mx-auto my-8">
        <div className="shadow-lg rounded-lg">
          {items.length > 0 ? (
            items.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                onRemove={removeItemFromCart}
              />
            ))
          ) : (
            <p className="text-center p-4">Votre panier est vide.</p>
          )}
          <div className="flex justify-between items-center p-4 bg-gray-100 rounded-b-lg">
            <span className="font-bold">Total: {totalPrice}€</span>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-5 py-2 rounded shadow">
              Payer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
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

// Composant CartItem, utilisé pour afficher les informations d'un produit dans le panier.
const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  description,
  price,
  image,
  onRemove,
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-300">
      <div className="flex flex-col h-full w-fit bg-gradient-to-r from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-0.5 rounded-xl">
        {/* Affichage de l'image du produit s'il y en a une. */}
        {image && <Image src={image} alt={name} width={96} height={96} />}
        <div className="flex-grow mx-4">
          {/* Nom et description du produit. */}
          <p className="text-lg font-bold">{name}</p>
          <p className="text-gray-700">{description}</p>
        </div>
        {/* Prix du produit. */}
        <span className="font-bold">{`${price}€`}</span>
        {/* Bouton pour supprimer le produit du panier. */}
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

// Composant Cart, utilisé pour gérer l'affichage et la logique du panier d'achat.
const Cart: React.FC = () => {
  // State pour stocker les produits dans le panier.
  const [items, setItems] = useState<CartItemProps[]>([]);

  useEffect(() => {
    // Fonction asynchrone pour charger les produits depuis une API.
    const loadProducts = async () => {
      try {
        const response = await fetch(`/api/getProduct`);
        if (!response.ok) {
          throw new Error('Problème lors de la récupération des données du panier');
        }
        const products = await response.json();
        const newItems = products.map((product: { id: any; name: any; description: any; price: any; image: any; }) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image,
          onRemove: removeItemFromCart, // Assignation de la fonction pour retirer un produit du panier.
        }));
        setItems(newItems); // Mise à jour des produits dans le panier.
      } catch (error) {
        console.error("Erreur lors du chargement des produits :", error);
      }
    };
  
    loadProducts(); // Appel de la fonction de chargement au montage du composant.
  }, []); // Le tableau de dépendances vide signifie que cet effet ne s'exécutera qu'une fois.

  // Fonction pour retirer un produit du panier.
  const removeItemFromCart = (id: number) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  // Calcul du prix total du panier.
  const totalPrice = items.reduce((total, item) => total + item.price, 0);

  return (
    <div className="flex flex-col justify-center items-center space-y-4 min-h-screen bg-white">
      <div className="container mx-auto my-8">
        <div className="shadow-lg rounded-lg">
          {/* Affichage des produits du panier ou d'un message si le panier est vide. */}
          {items.length > 0 ? (
            items.map((item) => <CartItem key={item.id} {...item} />)
          ) : (
            <p className="text-center p-4">Votre panier est vide.</p>
          )}
          {/* Affichage du prix total et du bouton pour payer. */}
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

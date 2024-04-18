"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { cryptPassword } from "@/utils/bcrypt";
import { useRouter } from "next/navigation";

// Définition du type TypeScript pour les props d'un élément de panier.
type CartItemProps = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string | null;
  quantity: number;
  onRemove: (id: number) => void;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
};

// Composant pour un élément de panier, prenant en charge l'affichage et les interactions.
const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  description,
  price,
  image,
  quantity,
  onRemove,
  onIncrement,
  onDecrement,
}) => {
  return (
    // Structure de l'élément avec style et responsive design.
    <div className="flex flex-col items-center justify-between p-4 border-b border-gray-300 bg-gradient-to-r from-[#FF5863] via-[#FD8F50] to-[#FFC53E] rounded-xl">
      <title>Panier</title>
      {image && (
        // Affichage conditionnel de l'image si disponible.
        <div className="mb-4">
          <Image src={image} alt={name} width={96} height={96} />
        </div>
      )}

      {/* Informations du produit et contrôles pour ajuster la quantité. */}
      <div className="text-center">
        <p className="text-lg font-bold">{name}</p>
        <p className="text-gray-700">{description}</p>
        <div className="flex items-center space-x-2 my-2 mx-2">
          <button onClick={() => onDecrement(id)}>-</button>
          <span className="min-w-[35px] text-center block">{quantity}</span>
          <button onClick={() => onIncrement(id)}>+</button>
        </div>
        <span className="font-bold">{`${(price * quantity).toFixed(2)}€`}</span>
      </div>

      {/* Bouton pour supprimer un élément du panier. */}
      <button
        className="mt-4 text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded shadow"
        onClick={() => onRemove(id)}
      >
        Supprimer
      </button>
    </div>
  );
};

// Composant principal pour le panier qui gère l'état des éléments du panier.
const Cart: React.FC = () => {
  // État pour stocker les éléments du panier.
  const [items, setItems] = useState<CartItemProps[]>([]);
  const [isloading, setIsloading] = useState(true);
  // Chargement des produits du panier à partir de l'API au montage du composant.
  //TODO: Montrer le nombre de quantité de produit, ajout et suppression quantité a faire
  const router = useRouter();
  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Appel API pour récupérer les produits du panier.
        if (!localStorage.getItem('token')) {
          router.push('/login')
          return;
        }
        const apiKey = await cryptPassword(process.env.NEXT_PUBLIC_API_KEY!);
        const response = await fetch(`/api/getcartbyuser?user_token=${localStorage.getItem('token')}&apiKey=${apiKey}`, {
          method: "GET"
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Erreur ${response.status}: ${errorData.message}`);
        }

        const data = await response.json();

        let cartItems = data.data;

        // Transformation des données de l'API en éléments utilisables par le panier.
        const newItems = cartItems.flatMap(
          (cartItem: { id_prod_cart: any[] }) =>
            cartItem.id_prod_cart.map((prodCart) => ({
              id: prodCart.id,
              name: prodCart.Product.product_name,
              description: prodCart.Product.product_description,
              price: parseFloat(prodCart.Product.product_price),
              image: prodCart.Product.product_image,
              quantity: prodCart.quantity || 1,
              onRemove: removeItemFromCart,
              onIncrement: incrementQuantity,
              onDecrement: decrementQuantity,
            }))
        );

        setItems(newItems);
        setIsloading(false)
      } catch (error) {
        console.error("Erreur lors du chargement des produits :", error);
      }
    };

    loadProducts();
  }, [router]);

  // Fonctions pour gérer les actions sur les éléments du panier.
  const removeItemFromCart = async (id: number) => {
    try {
      // Envoie la requête DELETE à l'API
      const response = await fetch(`/api/deleteproductbyid`, {
        method: "POST",
        headers: {
          'api-key': await cryptPassword(process.env.NEXT_PUBLIC_API_KEY!)
        },
        body: JSON.stringify({ id: id, user_token: localStorage.getItem('token') })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Une erreur est survenue lors de la suppression de l'article."
        );
      }

      // Met à jour l'état local si la suppression a été confirmée par l'API
      setItems((currentItems) => currentItems.filter((item) => item.id !== id));

      console.log("Article supprimé avec succès", data);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'article");
    }
  };

  const incrementQuantity = (id: number) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id: number) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      )
    );
  };

  // Calcul du prix total du panier.
  const totalPrice = items
    .reduce((total, item) => {
      const itemTotal = item.price * item.quantity;
      return total + (!isNaN(itemTotal) ? itemTotal : 0);
    }, 0)
    .toFixed(2);

  return (
    // Structure et mise en page du composant panier complet.
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-white">
      {isloading ? (
        <p className="animate-pulse">Chargement du panier...</p>
      ) : (
        <div className="w-full h-full p-4">
          <div className="grid grid-cols-3 gap-4 shadow-lg rounded-lg h-full">
            {items.length > 0 ? (
              items.map((item) => (
                <CartItem
                  key={item.id}
                  {...item}
                  onIncrement={incrementQuantity}
                  onDecrement={decrementQuantity}
                  onRemove={removeItemFromCart}
                />
              ))
            ) : (
              <p className="text-center p-4 col-span-3">Votre panier est vide.</p>
            )}
            <div className="flex justify-center items-center p-4 gap-10 bg-gray-100 rounded-b-lg col-span-3">
              <span className="font-bold">Total: {totalPrice}€</span>
              <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded shadow">
                Payer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

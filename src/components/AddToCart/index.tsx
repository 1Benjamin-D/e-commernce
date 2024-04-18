import RemoveButton from "@/components/removeButton";
import AddButton from "@/components/addButton";
import React from "react";

export default function AddToCart({quantity, clickEventAddToCart, clickEventQuantity}){
    return (
        <div
            className="bg-gradient-to-br rounded-lg from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-[2px] w-[300px]">
            <div
                className="flex flex-col justify-center items-center gap-2 p-2 bg-white rounded-[calc(0.5rem-2px)]">
                <div className="flex items-center justify-between gap-3 w-full">
                    <RemoveButton onClickEvent={() => clickEventQuantity("remove")}/>
                    <p>+{quantity}</p>
                    <AddButton onClickEvent={() => clickEventQuantity("add")}/>
                </div>
                <div
                    className="bg-gradient-to-br rounded-lg from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-px w-2/3 text-center">
                    <div className="bg-white rounded-[calc(0.5rem-1px)]">
                        <button className="p-2" onClick={clickEventAddToCart}>Ajouter au panier</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
import Image from "next/image";
import React from "react";

interface ButtonProps {
    onClickEvent: (e: React.MouseEvent<HTMLButtonElement>) => void
}
export default function AddButton({ onClickEvent }: ButtonProps) {
    return (
        <button onClick={onClickEvent}>
            <Image src={"/images/add.svg"} alt="add-button" height={100} width={0} className="h-12 w-auto" />
        </button>
    )
}
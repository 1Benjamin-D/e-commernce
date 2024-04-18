import Image from "next/image";
import React from "react";

interface ButtonProps {
    onClickEvent: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export default function RemoveButton({ onClickEvent }: ButtonProps) {
    return (
        <button onClick={onClickEvent}>
            <Image alt="remove-button" src={"/Images/remove.svg"} width={100} height={0} className="w-12 h-auto" />
        </button>
    )
}
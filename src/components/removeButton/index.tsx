import React from "react";

interface ButtonProps{
    onClickEvent: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export default function RemoveButton({onClickEvent}: ButtonProps) {
    return (
        <button onClick={onClickEvent}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10">
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: "#FF5863"}}/>
                        <stop offset="50%" style={{stopColor: "#FD8F50"}}/>
                        <stop offset="100%" style={{stopColor: "#FFC53E"}}/>
                    </linearGradient>
                </defs>
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H15C15.4142 11.25 15.75 11.5858 15.75 12Z"
                          className="gradient-fill"
                          fill="none"></path>
                </g>
            </svg>
        </button>
    )
}
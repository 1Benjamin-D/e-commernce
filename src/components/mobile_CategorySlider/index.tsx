'use client'
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function CategorySlider() {
    const [isClicked, setIsClicked] = useState(false)
    const [catSelected, setCatSelected] = useState("");
    const [data, setData] = useState({})
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('api/getCategoryAndSub', {
                method: "POST"
            })
            const json = await response.json();
            setData(json)
            setLoaded(true)
        }
        fetchData()
    }, []);

    const clickHandler = (e) => {
        setIsClicked(!isClicked)
        const clickedCat = e.target.closest("div").id;

        if (catSelected !== clickedCat) {
            setCatSelected(clickedCat);
        } else {
            setCatSelected("");
        }
    };
    if (loaded) {
        return (
            <>
                <div className="flex items-center overflow-y-scroll">
                    {data.data.map((category, category_index) => (
                        <React.Fragment key={category_index}>
                            <div className="flex justify-center items-center flex-col gap-3">
                                <div
                                    id={category.name}
                                    onClick={clickHandler}
                                    className={`${isClicked && catSelected !== category.name
                                        ? "hidden"
                                        : "flex"
                                        } flex-col justify-center items-center gap-3 text-center w-[128px] p-5`}
                                >
                                    <Image src={category.image} alt={category.name} height={100} width={0} className="h-20 w-auto rounded-full" />
                                    <p className="bg-slate-700 text-white">
                                        {category.name}
                                    </p>
                                </div>
                                <div
                                    key={`subcategory_${category_index}`}
                                    className={`${isClicked && catSelected === category.name ? "flex" : "hidden"}`}>
                                    {category.id_sub_cat.map(
                                        (sub_cat, sub_cat_index) => (
                                            <div
                                                key={sub_cat_index}
                                                className="flex flex-col justify-center items-center text-center w-32"
                                            >
                                                <Image src={sub_cat.Sub_category.image} alt={sub_cat.Sub_category.name} height={100} width={0} className="h-20 w-auto rounded-full" />
                                                <p>
                                                    {
                                                        sub_cat.Sub_category.name
                                                    }
                                                </p>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </>
        );
    }
    return (<p>Loading...</p>)
}
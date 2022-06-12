import React, {useState } from "react";

type CategoriesProps ={
  value: number;
  onClickCategory: (i: number) =>void;
}

const Categories: React.FC<CategoriesProps>=({ value, onClickCategory })=> {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className='categories'>
      <ul>
        {/* <li onClick={() => {setIndex(0);}} className={activeIndex === 0 ? "active" : ""}> Все</li> */}
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => {
              onClickCategory(i);
            }}
            className={value === i ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;

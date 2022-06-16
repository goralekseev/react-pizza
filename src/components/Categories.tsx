import React, {memo, useState } from "react";
import { useWhyDidYouUpdate } from 'ahooks';

type CategoriesProps ={
  value: number;
  onClickCategory: (i: number) =>void;
}
const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

const Categories: React.FC<CategoriesProps>=memo(({ value, onClickCategory })=> {
  

  // useWhyDidYouUpdate('Categories', { value, onClickCategory });

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
)
export default Categories;

import { useState } from "react";

function Categories() {
  const [activeIndex, setActiveIndex] = useState(0);

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const setIndex = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className='categories'>
      <ul>
        {/* <li onClick={() => {setIndex(0);}} className={activeIndex === 0 ? "active" : ""}> Все</li> */}
        {categories.map((value, index) => (
          <li
            key={index}
            onClick={() => {
              setIndex(index);
            }}
            className={activeIndex === index ? "active" : ""}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;

import React, { useEffect, useState } from "react";
import "../scss/app.scss";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Sleleton";

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://6292ef7e089f87a57ab6b800.mockapi.io/items").then((res) =>
      res.json().then((arr) => {
        setItems(arr);
        setIsLoading(false);
      })
    );
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => (
              <PizzaBlock
                key={obj.id}
                {...obj}
                // title={obj.title} The same< but with spread it`s shorter code
              />
            ))}
      </div>
    </div>
  );
};

export default Home;

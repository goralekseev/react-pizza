import React, { useEffect, useState, useContext } from "react";
import { SearchContext } from "../App";

import "../scss/app.scss";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Sleleton";
import Pagination from "../components/Pagination/Pagination";

const Home = () => {
  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setcategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sortProperty: "rating",
  });

  const onClickCategory = (id) => {
    setcategoryId(id);
  };

  const onClickSort = (id) => {
    setSortType(id);
  };

  const onChangePage = (number) => {
    setCurrentPage(number);
  };

  useEffect(() => {
    setIsLoading(true);

    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sortType.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    fetch(
      `https://6292ef7e089f87a57ab6b800.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    ).then((res) =>
      res.json().then((arr) => {
        setItems(arr);
        setIsLoading(false);
      })
    );
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((obj) => (
    <PizzaBlock
      key={obj.id}
      {...obj}
      // title={obj.title} The same< but with spread it`s shorter code
    />
  ));

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories
          value={categoryId}
          onClickCategory={(id) => {
            onClickCategory(id);
          }}
        />
        <Sort
          value={sortType}
          onClickSort={(id) => {
            onClickSort(id);
          }}
        />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={onChangePage} />
    </div>
  );
};

export default Home;

/* 
const pizzas = items
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }

      return false;
    })
    .map((obj) => (
      <PizzaBlock
        key={obj.id}
        {...obj}
        // title={obj.title} The same< but with spread it`s shorter code
      />
    ));
 */

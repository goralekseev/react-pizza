import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import qs from "qs";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { setItems, fetchPizzas } from "../redux/slices/pizzaSlice";

import Categories from "../components/Categories";
import Sort, { list } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Sleleton";
import Pagination from "../components/Pagination/Pagination";
import { SearchContext } from "../App";

import "../scss/app.scss";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const { status, items } = useSelector((state) => state.pizza);

  const { searchValue } = useContext(SearchContext);
  //const [isLoading, setIsLoading] = useState(true);
  //const [currentPage] = useState(1);
  // const [sortType, setSortType] = useState({
  //   name: "популярности",
  //   sortProperty: "rating",
  // });

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const order = sortType.includes("-") ? "asc" : "desc";
    const sortBy = sortType.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    //   axios
    //     .get(
    //       `https://6292ef7e089f87a57ab6b800.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    //     )
    //     .then((res) => {
    //       setItems(res.data);
    //       setIsLoading(false);
    //     })
    //        .catch((err =>{
    //            console.log(err)
    //}));
    // };

    // try {
    // const res = await axios.get(
    //   `https://6292ef7e089f87a57ab6b800.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    // );

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage,
      })
    );
    //   } catch (error) {
    //     alert("Error in getting data");
    //     console.log("ERROR", error);
    //   } finally {
    //     //setIsLoading(false);
    //   }
  };

  // if parametres changed and it is 2 render
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  //If first render, check URL params and save to Redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  //if first render happened fetch pizzas
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
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
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      {status === "error" ? (
        <div className='content__error-info'>
          <h2>Cart is empty 😕 </h2>
          <p>Cant find pizza list</p>
        </div>
      ) : (
        <div className='content__items'>
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
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

// fetch(
//   `https://6292ef7e089f87a57ab6b800.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
// ).then((res) =>
//   res.json().then((arr) => {
//     setItems(arr);
//     setIsLoading(false);
//   })
// );

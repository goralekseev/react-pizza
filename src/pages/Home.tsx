import React, { useEffect, useState, useContext, useRef, useCallback } from "react";
//import axios from "axios";
import qs from "qs";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  setCategoryId,
  setCurrentPage,
  setFilters,
  //searchValue,
} from "../redux/filter/slice";

// import {
//   setItems,
//   fetchPizzas,
//   selectPizzaData,
//   SearchPizzaParams,
// } from "../redux/pizza/slice";

import Categories from "../components/Categories";
import Sort, { list } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/Pagination";


//import { SearchContext } from "../App";

import "../scss/app.scss";
import { useAppDispatch } from "../redux/store";
import { selectFilter } from "../redux/filter/selectors";
import { selectPizzaData } from "../redux/pizza/selectors";
import { SearchPizzaParams } from "../redux/pizza/types";
import { fetchPizzas } from "../redux/pizza/asynsActions";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  //const categoryId = useSelector((state) => state.filter.categoryId);
  //const sort = useSelector((state) => state.filter.sort.sortProperty);
  //const currentPage = useSelector((state) => state.filter.currentPage);
  const { categoryId, currentPage, sort, searchValue } =
    useSelector(selectFilter);

  const { status, items } = useSelector(selectPizzaData);

  //const [isLoading, setIsLoading] = useState(true);
  //const [currentPage] = useState(1);
  // const [sortType, setSortType] = useState({
  //   name: "популярности",
  //   sortProperty: "rating",
  // });

  const onClickCategory = useCallback((index: number) => {
    dispatch(setCategoryId(index));
  }, []);


  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sort.sortProperty.replace("-", "");
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
        currentPage: String(currentPage),
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
        sortProperty: sort,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort, currentPage]);

  //If first render, check URL params and save to Redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;

      const sort = list.find((obj) => obj.sortProperty === params.sortBy);

      dispatch(setFilters({
        searchValue: params.search,
        categoryId: Number(params.category),
        currentPage: Number(params.currentPage),
        sort: sort || list[0]
      }));
    
    }  isSearch.current = true;
  }, []);

  //if first render happened fetch pizzas
  useEffect(() => {
    window.scrollTo(0, 0);
    getPizzas()

    //if (!isSearch.current) {
    //  getPizzas();
   // }

    isSearch.current = false;
  }, [categoryId, sort, searchValue, currentPage]);

  const pizzas = items.map((obj) => (
      <PizzaBlock key={obj.id}
    types={[]} sizes={[]} {...obj}        // title={obj.title} The same< but with spread it`s shorter code
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
        <Sort value={sort}/>
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

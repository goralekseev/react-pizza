import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string, price:number, title:string
  }>();
  const { id } = useParams();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://6292ef7e089f87a57ab6b800.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <>Loading</>;
  }

  return (
    <div className='container'>
      <img className="pizza-block__image" src={pizza.imageUrl} alt='pizza' />
      <h2>{pizza.title}</h2>

      <h4>{pizza.price}</h4>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};

export default FullPizza;

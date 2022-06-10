import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageURL: string, price:number, title:string
  }>();
  const { id } = useParams();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://6292ef7e089f87a57ab6b800.mockapi.io/items)" + id
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
      <img src={pizza.imageURL} alt='pizza' />
      <h2>{pizza.title}</h2>

      <h4>{pizza.price}</h4>
    </div>
  );
};

export default FullPizza;

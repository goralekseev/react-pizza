import React from "react";
import { Link } from "react-router-dom";
import emptyCartImg from "../assets/img/empty-cart.png";

const CartEmpty: React.FC = () => {
  return (
    <>
      <div className='cart cart--empty'>
        <h2>Cart is empty <span>😕</span></h2>
        <p>
          Probaply you haven't order pizza yet.
          <br />
          Return back to main page for order.
        </p>
        <img src={emptyCartImg} alt='Empty cart' />
        <Link to='/' className='button button--black'>
          <span>Вернуться назад</span>
        </Link>
      </div>
    </>
  );
};

export default CartEmpty;

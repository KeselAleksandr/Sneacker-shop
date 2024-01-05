import React, { useContext } from "react";
import {Link} from 'react-router-dom'
import AppContext from "../context";

function Header(props) {
  const {sumPrice} = useContext(AppContext)  
  return (
        <header className="d-flex justify-between align-center p-40">
        <Link to = "/">
        <div className="d-flex align-center">
        <img width={40} height={40} src="img/logo.png"/>
        <div>
          <h3 className="text-uppercase">React Sneakers</h3>
          <p className="opacity-5">Магазин лучших кроссовок</p>
        </div>
        </div>
        </Link>
        <ul className="d-flex">
          <li className="mr-30">
          <img onClick={props.onOpenCart} width={18} height={17} src="img/card.png" alt="Корзина"/>
            <span> {sumPrice() * 1.05} руб.</span>
          </li>
          <li className="mr-30">
            <Link to = "/favorites">
            <img width={18} height={17} src="img/favorites.svg" alt="Закладки"/>
            </Link>
          </li>
          <li>
          <Link to = "/order">
          <img width={18} height={17} src="img/user.png" alt="User"/>
          </Link>
          </li>
        </ul>
      </header>
    )
}

export default Header
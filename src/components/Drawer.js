import React, { useState } from "react"
import { useContext } from "react";
import AppContext from "../context";
import axios from "axios";

function Drawer ({onClose, items = [], onRemuve}) {
const {cartItems, setCartItems, sumPrice} = useContext(AppContext)
  const [empty, setEmpty] = useState(true)



const onClickOrder = () => {
  axios.post('https://6582f0b202f747c8367aa891.mockapi.io/orders', {items:cartItems})
  setEmpty(!empty)
  setCartItems([])

cartItems.forEach(element => {
  axios.delete(`https://65803f216ae0629a3f54be62.mockapi.io/cart/${element.id}`)
});

}

return (
<div className="overlay">
<div className="drawer d-flex">
  <h2 className="d-flex justify-between mb-30">Корзина 
  <img className='cu-p' onClick={onClose} src="/img/deleteCart.svg" alt="Remuve"/></h2>

  {empty?
  <>
  <div className="items">
    {
      items.map((obj)=> {
        return (
        <div className="cartItem d-flex align-center mb-20">
        <div style={{backgroundImage: `url(${obj.imageURL})`}} className="cartItemImg"></div>
        <div className="mr-20 flex">
        <p className="mb-5">{obj.title}</p>
        <b>{obj.price}</b>
        </div>
        <img onClick={()=>onRemuve(obj)} className='removeBtn' src="/img/deleteCart.svg" alt="Remuve"/>
      </div>)
      }) 
    }
  </div>

  <div className="cartTotalBlock">
    <ul >
      <li>
        <span>Итого:</span>
        <div></div>
        <b>{sumPrice() * 1.05} руб.</b>
     </li>
      <li className="d-flex">
        <span>Налог 5%:</span>
        <div></div>
        <b>{sumPrice() * 0.05} руб.</b>
      </li>
    </ul>
    <button onClick={onClickOrder} className="greenButton">Оформить заказ<img src="/img/arrow.svg" alt="Arrow" /></button>
  
  </div>
  </>
  :<div><img className="d-flex align-center" width={83} height={120} src="/img/offerComplited.svg" alt="offer"/></div>}
</div>
</div>)
}
export default Drawer
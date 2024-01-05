import React, { useContext } from 'react'
import Card from '../components/Card'
import AppContext from '../context'

const Order = () => {
  const {orders, setOrders} = useContext(AppContext)
  return (
      <div className="content p-40">
          <div className="d-flex align-center mb-40 justify-between">
              <h1>Мои заказы</h1>
          </div>
          <div className="d-flex flex-wrap">   
          {console.log(orders)}      
          {orders.map((item, index)=> {
          return <Card

              key={index}
              {...item}
              //favorited = {true}
              //onFavorite = {(obj)=> onAddToFavorite(obj)}
              //onRem = {(obj) => onRemuveFavorite(obj)}
              //onPlus = {(obj)=>onAddToCart(obj)}
              //onMinus = {(id)=>onRemuveToCart(id)}
          />})
          }
          </div>
      </div> 
      )
}

export default Order

import React,{useState,useContext} from "react";
import styles   from './Card.module.scss';
import AppContext from "../../context";

function Card ({id, title, price, imageURL, sn, onPlus, onMinus, onFavorite, favorited = false, onRem}) {
  const { isItemAdded, isFavorite} = useContext(AppContext);

    const onClickPlus = () => {
      onPlus({id, title, price, imageURL,sn});  
    }

    const onRemuvCart = () => {
      onMinus({id, title, price, imageURL, sn});  
    }

    const onClickFavorite = () =>{
      onFavorite({id, title, price, imageURL})
    }

    const onRemuveFavorite = () =>{
      onRem({id, title, price, imageURL,sn})
    }


  return (
    <div className={styles.card}>
    <div className={styles.favorite}>
      {isFavorite(id)?
      <img onClick={onRemuveFavorite} src={"/img/heart-liked.svg"} alt="liked"/>:
      <img onClick={onClickFavorite} src={"/img/heart-unliked.svg"} alt="unliked"/>
      }
      </div>
    <img width={133} height={112} src={imageURL} alt="Sneakers"></img>
    <h5>{title}</h5>
    <div className="d-flex justify-between">
      <div className="d-flex flex-column align-center">
        <span>Цена</span>
        <b>{price}</b>
      </div>
      {isItemAdded(id)?
      <img onClick={onRemuvCart} style={{cursor:"pointer"}} src="/img/btn-checked.svg"  alt="checked"/>:
      <img onClick={onClickPlus} style={{cursor:"pointer"}} src="/img/btn-plus.svg" alt="Plus"/>}
    </div>
  </div>
  );
}

export default Card
import { useContext } from "react";
import Card from "../components/Card";
import AppContext from "../context";

function Favorites({ onAddToFavorite, onRemuveFavorite}) {
   const {favorite} = useContext(AppContext);
    return (
        <div className="content p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1>Мои закладки</h1>
            </div>
            <div className="d-flex flex-wrap">         
            
            {favorite.map((item,index)=>{
            return(
            <Card
                key={index}
                {...item}
                favorited = {true}
                onFavorite = {(obj)=> onAddToFavorite(obj)}
                onRem = {(obj) => onRemuveFavorite(obj)}
                //onPlus = {(obj)=>onAddToCart(obj)}
                //onMinus = {(id)=>onRemuveToCart(id)}
            />
            )
            })}
            </div>
        </div> 
        )
}

export default Favorites;
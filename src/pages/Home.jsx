import React,{useContext} from "react";
import Card from "../components/Card";


function Home({items ,searchValue, setSearchValue, onChangeSearchInput, onAddToFavorite, onRemuveFavorite, onAddToCart, onRemuve, cartItems}) {

    
    const cardMass = items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((item,index)=>{
        return(
        <Card
            key={index}
            {...item}
            favorited = {false}
            onFavorite = {(obj)=> onAddToFavorite(obj)}
            onRem = {(obj)=> onRemuveFavorite(obj)}
            onPlus = {(obj)=>onAddToCart(obj)}
            onMinus = {(obj)=>onRemuve(obj)}
            
        />
        )
    })

    return (
        <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
        <h1>{searchValue?`Поиск по запросу ${searchValue}`:"Все кроссовки"}</h1>
            <div className="search-block d-flex">
            <img src = "/img/search.svg" alt="Search" />
            <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
            </div>
        </div>
        
            <div className="d-flex flex-wrap">         
            {cardMass}
            </div>
        </div>
        )
}

export default Home;
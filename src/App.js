import React,{ useState, useEffect, createContext } from "react";
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import AppContext from "./context";
import Order from "./pages/Order";



function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [orders, setOrders] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false)


  
  useEffect(()=> {  
    async function fetchData() {
      const cartResponse = await axios.get('https://65803f216ae0629a3f54be62.mockapi.io/cart');
      const favoriteResponse = await axios.get('https://6582f0b202f747c8367aa891.mockapi.io/favorites');
      const itemsResponse = await axios.get('https://65803f216ae0629a3f54be62.mockapi.io/items');
      const itemsOrders = await axios.get('https://6582f0b202f747c8367aa891.mockapi.io/orders');
      
      setFavorite(favoriteResponse.data);
      setItems(itemsResponse.data);
      setCartItems(cartResponse.data);
      setOrders(itemsOrders.data.reduce((prev, obj)=>[...prev,...obj.items],[]));
    }

    fetchData();
  }, []);
  
  const onAddToCart = (obj) => {
    let serNumber = 0;
    cartItems.map((e)=> {
      if(e.id===obj.id){
        serNumber = e.sn;
      return e}
    })
     if(cartItems.find((item) => item.id === obj.id)){
      setCartItems(prev=>prev.filter(item=> item.id !== obj.id ))
      axios.delete(`https://65803f216ae0629a3f54be62.mockapi.io/cart/${serNumber}`)
     }
      else{ 
    axios.post('https://65803f216ae0629a3f54be62.mockapi.io/cart', obj).then(res =>setCartItems(prev => [...prev, res.data])) ;
  }}
    
  
  const onAddToFavorite = (obj) => {
    let serNumber = 0;
    favorite.map((e)=> {
      if(e.id===obj.id){
        serNumber = e.sn;
      return e}
    })
    if(favorite.find((favObj) => favObj.id === obj.id)){
      axios.delete(`https://6582f0b202f747c8367aa891.mockapi.io/favorites/${serNumber}`);
    }
    else
    axios.post('https://6582f0b202f747c8367aa891.mockapi.io/favorites', obj).then(res =>setFavorite(prev => [...prev, res.data])) ;
  }

  const onRemuveFavorite = (obj) => {
    axios.delete(`https://6582f0b202f747c8367aa891.mockapi.io/favorites/${obj.sn}`);    
  } 

  const onRemuveToCart = (obj) => {
    axios.delete(`https://65803f216ae0629a3f54be62.mockapi.io/cart/${obj.sn}`);
    setCartItems(cartItems.filter(e=> e.id !== obj.id))}


  const onChangeSearchInput = (event) => {
   setSearchValue(event.target.value)
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj)=> Number(obj.id)=== Number(id))
  } 

  const isFavorite = (id) => {
    return favorite.some((obj)=> Number(obj.id)=== Number(id))
  }

  const sumPrice = () => {
  let summ = 0;
  cartItems.map((e)=>{
    return summ += e.price;
  })
  return summ 
}
  
  return (
    <AppContext.Provider value = {{cartItems, favorite,  items, isItemAdded, isFavorite, cartItems, setCartItems, sumPrice, orders, setOrders}}>
    <div className="wrapper clear">
      <Header 
      onOpenCart={()=>setCartOpened(true)} 
      items = {cartItems}
      />
      {cartOpened && <Drawer 
      onClose={()=>setCartOpened(false)} 
      items={cartItems}
      onRemuve = {(obj)=>onRemuveToCart(obj)}
      />}
    <Routes>
      <Route path ="/" 
        element={
          <Home
          items={items}
          cartItems = {cartItems}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
          onAddToFavorite={(obj)=>onAddToFavorite(obj)}
          onRemuveFavorite = {(obj)=>onRemuveFavorite(obj)}
          onAddToCart={(obj)=>onAddToCart(obj)}
          onRemuve = {(obj)=>onAddToCart(obj)} 
        />}
        exact>
      </Route>
      <Route path="/favorites" 
      element = {
      <Favorites 
      onAddToFavorite = {onAddToFavorite}
      onRemuveFavorite = {onRemuveFavorite}
     
      />}
      exact>
        </Route> 
        <Route path="/order"
          element = {<Order/>}
          exact>
        </Route> 
    </Routes>
    </div>
    </AppContext.Provider>
  );
}

export default App;
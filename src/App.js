import { useEffect, useCallback } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';

import useLocalStorage from './hooks/use-local-storage';
import { handleCartReplace } from './store/cart-slice';

import Layout from "./components/UI/Layout";
import MainShop from "./Pages/MainShop";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";

function App() {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const { saveState, loadState } = useLocalStorage()

  useEffect(() => {
    // replace cart in local storage from state and vice versa
    dispatch(handleCartReplace({
      cart, saveState, loadState
    }))
  }, [cart])

  return (
    <Layout>
      <Toaster toastOptions={{
        className: 'toaster'
      }} />

      <Switch>
        <Route path='/cart'>
          <Cart/>
        </Route>
        <Route path='/product/:productId'>
          <ProductDetails/>
        </Route>
        <Route path='/'>
          <MainShop />
        </Route>
      </Switch>
    </Layout>
  )
}

export default App;

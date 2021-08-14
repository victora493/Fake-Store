import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';

import { getCartData, storeCartData } from './store/cart-actions';

import Layout from "./components/UI/Layout";
import MainShop from "./Pages/MainShop";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";

let timesCalled = 0

function App() {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)

  useEffect(() => {
    dispatch(getCartData())
  }, [dispatch])

  // it's called two times due to first default use effect call, then in the second one is because when setting the initial state to redux it triggers another call
  // but since it's just for initialization, It's not needed
  useEffect(() => {
    if(timesCalled < 2) {
      timesCalled++
      return
    }

    dispatch(storeCartData(cart))
  }, [cart, dispatch])

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

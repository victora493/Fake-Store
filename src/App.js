import { Switch, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

import Layout from "./components/UI/Layout";
import MainShop from "./Pages/MainShop";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";

function App() {
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

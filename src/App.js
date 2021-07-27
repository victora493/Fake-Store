import { Switch, Route } from 'react-router-dom'

import Layout from "./components/UI/Layout";
import MainShop from "./Pages/MainShop";
import Cart from "./Pages/Cart";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/cart'>
          <Cart/>
        </Route>
        <Route path='/'>
          <MainShop />
        </Route>
      </Switch>
    </Layout>
  )
}

export default App;


import './App.css'
import CartProvider from './Context/CartContext'
// import OrderList from './components/OrderList'
import ProductList from './components/ProductList'

const Home = () => {
  return (
    <><CartProvider>
  <h2>PRODUCTS</h2>
      <ProductList />
      {/* <h1>ORDERS</h1>
      <OrderList /> */}

      
</CartProvider>    </>
  )
}

export default Home

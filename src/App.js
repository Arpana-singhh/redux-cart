import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from 'react-router-dom';
import Product from './components/Product.js'
import RootLayout from './components/RootLayout.js'
import Dashboard from './components/Dashboard.js'
import Cart from './components/Cart.js'

function App() {

  const router =createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>
      <Route index element={<Dashboard/>}></Route>
      <Route path="/cart" element={<Cart/>}></Route>
    </Route>
  )
)
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;

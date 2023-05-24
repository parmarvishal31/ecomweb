
import './App.css';
import HomePage from './pages/HomePage'
import About from './pages/About'
import Contact from './pages/Contect'
import Policy from './pages/Policy'
import Pagenotfound from './pages/Pagenotfound'
import {
  Routes,
  Route,
} from 'react-router-dom';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/routes/Private';
import ForgotPasssword from './pages/Auth/ForgotPasssword';
import AdminRoute from './components/routes/AdminRoutes';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from "./pages/Search";
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import CartPage from './pages/CartPage';
import AdminOrders from './pages/Admin/AdminOrders';


function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={< HomePage />}></Route>
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/search" element={<Search />} />
        <Route exact path='/dashboard' element={<PrivateRoute />}>
          <Route exact path='user' element={<Dashboard />}></Route>
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route exact path='/dashboard' element={<AdminRoute />}>
          <Route exact path='admin' element={<AdminDashboard />}></Route>
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />
          <Route path="admin/products" element={<Products />} />
        </Route>
        <Route exact path='/forgot-password' element={<ForgotPasssword />} />
        <Route exact path='/register' element={<Register />}></Route>
        <Route exact path='/login' element={<Login />}></Route>
        <Route exact path='/about' element={< About />}></Route>
        <Route exact path='/contact' element={< Contact />}></Route>
        <Route exact path='/policy' element={< Policy />}></Route>
        <Route exact path='/*' element={< Pagenotfound />}></Route>
      </Routes>

    </>
  );
}

export default App;

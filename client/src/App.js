import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Pages/Navbar';
import Login from './Pages/Login';
import Register from './Pages/Register';
import NewReciepe from './Pages/NewReciepe';
import Home from './Pages/Home';
import Product from './Pages/Product';
import MyRecipe from './Pages/MyRecipe';
import UpdateProduct from './Pages/UpdateProduct';
import { GithubStateLayout } from './Pages/GithubStateLayout';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
      <Routes>
        <Route path="/newreciepe" element={<NewReciepe />}></Route>
      </Routes>
      <Routes>
        <Route path="/recipeitem/:id" element={<Product />}></Route>
      </Routes>
      <Routes>
        <Route path="/myrecipe" element={<MyRecipe />}></Route>
      </Routes>
      <Routes>
        <Route path="/update/:id" element={<UpdateProduct />}></Route>
      </Routes>
    </div>
  );
}

export default App;

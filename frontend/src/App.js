import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProduct from "./components/product/addProduct";
import EditProduct from "./components/product/editProduct";
import ListProduct from "./components/product/listProduct";
import AddUser from "./components/user/addUser";
import EditUser from "./components/user/editUser";
import ListUser from "./components/user/listUser";
import MainLayout from "./components/layout/MainLayout";
import ListPegawai from "./components/pegawai/listPegawai";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="user/" element={<ListUser />} />
          <Route path="user/add" element={<AddUser />} />
          <Route path="user/edit/:id" element={<EditUser />} />
          <Route path="product/" element={<ListProduct />} />
          <Route path="product/add" element={<AddProduct />} />
          <Route path="product/edit/:id" element={<EditProduct />} />
          <Route path="pegawai/" element={<ListPegawai />} />
          <Route path='*' element={<h1 className='text-danger'>404</h1>} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
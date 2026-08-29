import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import Dashboard from "../pages/Dashboard";
import Orders from "../pages/Orders";
import MenuManagement from "../pages/MenuManagement";
import Categories from "../pages/Categories";
import Customers from "../pages/Customers";
import Messages from "../pages/Messages";


const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="menu" element={<MenuManagement />} />
        <Route path="categories" element={<Categories />} />
        <Route path="customers" element={<Customers />} />
        <Route path="messages" element={<Messages />} />
        {/* Aage Orders, Menu, Categories, Customers, Reviews, Settings yahan add honge */}
      </Route>
    </Routes>
  );
};

export default AdminRoutes;

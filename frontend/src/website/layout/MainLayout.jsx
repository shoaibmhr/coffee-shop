import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

const MainLayout = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <Navbar />
      <Outlet />
      <Footer /> 
    </div>
  );
};

export default MainLayout;

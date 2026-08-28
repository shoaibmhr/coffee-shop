import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import InstagramStrip from "../common/InstagramStrip";
const MainLayout = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <Navbar />
      <Outlet />
      <InstagramStrip />
      <Footer />
    </div>
  );
};

export default MainLayout;

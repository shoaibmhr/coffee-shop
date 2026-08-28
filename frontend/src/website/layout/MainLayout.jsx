import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import InstagramStrip from "../common/InstagramStrip";
import BackToTop from "../common/BackToTop";
const MainLayout = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <Navbar />
      <Outlet />
      <InstagramStrip />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default MainLayout;

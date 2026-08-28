import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
 import About from "../pages/About";
import Menu from "../pages/Menu";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import Reserve from "../pages/Reserve";
import Contact from "../pages/Contact";
import Checkout from "../pages/Checkout";
import OrderConfirmation from "../pages/OrderConfirmation";
import Gallery from "../pages/Gallery";
// import Gallery from "../pages/Gallery";
// import Reviews from "../pages/Reviews";
 
// import Cart from "../pages/Cart";
// import Checkout from "../pages/Checkout";
// import Blog from "../pages/Blog";
// import BlogSingle from "../pages/BlogSingle";
// import Profile from "../pages/Profile";

const WebsiteRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/about" element={<About />} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/gallery" element={<Gallery />} />

        {/* <Route path="/gallery" element={<Gallery />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogSingle />} />
          <Route path="/profile" element={<Profile />} />  */}
      </Route>
    </Routes>
  );
};

export default WebsiteRoutes;

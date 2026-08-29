import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebsiteRoutes from "./website/routes/WebsiteRoutes";
// import ScrollToTop from "./website/common/ScrollToTop";
import AdminRoutes from "./admin/routes/AdminRoutes";
import authRoutes from "./auth/routes/AuthRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {authRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/*" element={<WebsiteRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebsiteRoutes from "./website/routes/WebsiteRoutes";
// import ScrollToTop from "./website/common/ScrollToTop";
import AdminRoutes from "./admin/routes/AdminRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<WebsiteRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

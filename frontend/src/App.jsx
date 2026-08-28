import { BrowserRouter } from "react-router-dom";
import WebsiteRoutes from "./website/routes/WebsiteRoutes";
import ScrollToTop from "./website/common/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <WebsiteRoutes />
    </BrowserRouter>
  );
}

export default App;

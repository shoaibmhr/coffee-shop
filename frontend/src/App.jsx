import { BrowserRouter } from "react-router-dom";
import WebsiteRoutes from "./website/routes/WebsiteRoutes";

function App() {
  return (
    <BrowserRouter>
      <WebsiteRoutes />
    </BrowserRouter>
  );
}

export default App;

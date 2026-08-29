import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

// Route-config array — App.jsx maps over this to render actual <Route>
// elements. Just add another { path, element } object here to extend it.
const authRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  // :token is the reset token that will come from the emailed reset link
  { path: "/reset-password/:token", element: <ResetPassword /> },
];

export default authRoutes;

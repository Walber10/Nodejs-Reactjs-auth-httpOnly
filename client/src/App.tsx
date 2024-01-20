import { Routes, Route, Outlet } from "react-router-dom";
import { RequireAuth } from "./common/auth/RequireAuth";
import { LoginPage } from "./routes/login/Login";
import { WelcomePage } from "./routes/welcome/WelcomePage";
import { Public } from "./routes/public/Public";
import "../src/output.css";
import { RegisterUserPage } from "./routes/register/RegisterUserPage";
import { ForgotPasswordPage } from "./routes/forgot-password/ForgotPasswordPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterUserPage />} />
        <Route path="forgotpassword" element={<ForgotPasswordPage />} />
        <Route path="*" element={<div>404</div>} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="welcome" element={<WelcomePage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

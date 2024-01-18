import { Routes, Route, Outlet } from "react-router-dom";
import { RequireAuth } from "./common/auth/RequireAuth";
import { LoginPage } from "./routes/login/Login";
import { Welcome } from "./routes/welcome/Welcome";
import { Public } from "./routes/public/Public";
import "../src/output.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<LoginPage />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="welcome" element={<Welcome />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

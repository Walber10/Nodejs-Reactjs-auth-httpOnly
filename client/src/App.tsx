import { Routes, Route, Outlet } from "react-router-dom";

import "./App.css";
import { RequireAuth } from "./common/auth/RequireAuth";
import { Login } from "./routes/login/Login";
import { Welcome } from "./routes/welcome/Welcome";
import { Public } from "./routes/public/Public";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="welcome" element={<Welcome />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

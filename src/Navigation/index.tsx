import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "../Layout/Dashboard";
import Home from "../screen/Home";
import Notification from "../screen/Notification";

function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="notification" element={<Notification />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Navigation;

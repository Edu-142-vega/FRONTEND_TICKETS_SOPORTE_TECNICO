import { Routes, Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";

import Home from "../pages/public/Home";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import Chat from "../pages/public/Chat";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="chat" element={<Chat />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;

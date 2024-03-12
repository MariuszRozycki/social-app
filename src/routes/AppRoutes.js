import { Route, Routes } from "react-router-dom";
import Home from "../views/Home";
import Login from "../views/Login";
import SignUp from "../views/SignUp";

const AppRoutes = (props) => {
  const { setUser, user } = props;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login user={user} setUser={setUser} />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default AppRoutes;

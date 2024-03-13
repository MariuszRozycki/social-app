import "./AppNav.css";
import { Link } from "react-router-dom";
import { baseApi } from "../api/baseApi";
import axios from "axios";

const AppNav = (props) => {
  const { user, setUser } = props;

  const handleLogout = (e) => {
    e.preventDefault();

    const userLogoutApi = baseApi + "user/logout";

    axios
      .post(userLogoutApi)
      .then((response) => {
        if (response.data.message) {
          setUser(null);
          localStorage.setItem("user", null);
        }
      })
      .catch((error) => {
        setUser(null);
        localStorage.setItem("user", null);
        console.error(error);
      });
  };

  return (
    <nav className="mainNav">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {!user && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        {!user && (
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        )}
        {user && (
          <li>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default AppNav;

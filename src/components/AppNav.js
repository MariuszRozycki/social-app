import "./AppNav.css";
import { Link } from "react-router-dom";

const AppNav = (props) => {
  const { user } = props;
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
      </ul>
    </nav>
  );
};

export default AppNav;

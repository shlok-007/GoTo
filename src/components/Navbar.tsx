import navbarProps from "../types/navbarProps"
import "../styles/navbarStyle.css"
import { useNavigate } from "react-router-dom"

const Navbar: React.FC<navbarProps> = ({isLogged, profile, siteName, onLogout}) => {
  const navigate = useNavigate();
    return(
      <nav className="navbar">
        <div className="navbar__site-name" onClick={()=> navigate("/")}>{siteName}</div>
        {isLogged?
        <div className="navbar__user">
          <div className="navbar__avatar-frame">
            <img src={profile?.picture} alt="User Avatar" className="navbar__avatar" />
          </div>
          <button className="navbar__logout" onClick={onLogout}>Logout</button>
        </div>
        :<></>}
      </nav>
    )
}

export default Navbar;
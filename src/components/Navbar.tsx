import NavbarProps from "../types/navbarProps"
import "../styles/navbarStyle.css"

const Navbar: React.FC<NavbarProps> = ({isLogged, profile, siteName, onLogout}) => {
    
    return(
        <nav className="navbar">
        <div className="navbar__site-name">{siteName}</div>
        {isLogged?
        <div className="navbar__user">
          <div className="navbar__avatar-frame">
            <img src={profile.picture} alt="User Avatar" className="navbar__avatar" />
          </div>
          <button className="navbar__logout" onClick={()=>onLogout()}>Logout</button>
        </div>
        :<></>}
      </nav>
    )
}

export default Navbar;
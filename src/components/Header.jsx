import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import NavMain from "./NavMain";
import { useSelector, useDispatch } from "react-redux"
import { closeNav, toggleNav } from "../features/navOpen/navOpenSlice";

function Header() {

  const buttonRef = useRef();
  const navRef = useRef();
  
  const navOpen = useSelector((state) => state.navOpen.value);
  const dispatch = useDispatch();

  const handleNavButton = (e) => {
    e.preventDefault();
    dispatch(toggleNav(navOpen))
  }

  useEffect(() => {
    // Function that checks if there is a current reference and it doesn't contain the target
    // Clicked outside the nav element or the button (handles closing on its own)
    const handleClickOutside = (e) => {
      if (navRef.current && 
          !navRef.current.contains(e.target) && 
          buttonRef.current && 
          !buttonRef.current.contains(e.target) ) 
      {
        dispatch(closeNav())
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch, navRef, buttonRef])

  return (
    <header>
      <div className="navbar">
        <div className="navbar-logo">
          <Link to="/">
            <h1>DUNE</h1>
          </Link>
        </div>
        
        <button
          className={"navbar-btn" + (navOpen ? " navbar-toggled" : "")}
          id="btn-menu"
          aria-label="Navigation Menu"
          aria-controls="header-menu"
          aria-expanded={navOpen}
          onClick={handleNavButton}
          ref={buttonRef}
        >
          <span className="bar" id="bar-1"></span>
          <span className="bar" id="bar-2"></span>
          <span className="bar" id="bar-3"></span>
        </button>
        <NavMain reference={navRef}/>
      </div>
    </header>
  );
}

export default Header;

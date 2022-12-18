import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { navMainLinks } from "../global/globals";
import { closeNav } from "../features/navOpen/navOpenSlice"
import SearchBar from "./SearchBar";

function NavMain({ reference }) {

  const navOpen = useSelector((state) => state.navOpen.value);
  const [ desktop, setDesktop ] = useState(false)
  
  const dispatch = useDispatch()

  const hideNav = () => {
    dispatch(closeNav())
  }

  // If the window goes to desktop layout, close the nav
  useEffect(() => {
    const isDesktop = (e) => {
      if(e.matches){
        dispatch(closeNav());
        setDesktop(true)
      } else {
        setDesktop(false)
      }
    }
    
    let mediaQuery = window.matchMedia('(min-width: 56.25rem)');

    isDesktop(mediaQuery);

    mediaQuery.addEventListener('change', isDesktop);
    // this is the cleanup function to remove the listener
    return () => mediaQuery.removeEventListener('change', isDesktop);
  }, [dispatch]);

  return (
    <div className={"navbar-menu" + (navOpen ? " navbar-toggled" : "")} ref={reference}>
      <SearchBar tabIndex={(desktop || navOpen) ? 0 : -1}/>
      <nav >
        <ul>
          {navMainLinks.map(link => {
            return(
              <li key={link.name}>
                <NavLink to={link.path}
                         onClick={hideNav}
                         tabIndex={(desktop || navOpen) ? 0 : -1}>
                  {link.name}
                </NavLink>
              </li>
            )
            })}
        </ul>
      </nav>
    </div>
  )
}

export default NavMain
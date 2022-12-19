import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        {/* <section className="brand"> */}
        {/* <div className="logo">
            <h2>DUNE</h2>
          </div>
          <div className="social-icons">
            <Link to={"#"}>
              <FaFacebook />
              <span className="screen-reader-text">Facebook</span>
            </Link>
            <Link to={"#"}>
              <FaTwitter />
              <span className="screen-reader-text">Twitter</span>
            </Link>
            <Link to={"#"}>
              <FaInstagram />
              <span className="screen-reader-text">Instagram</span>
            </Link>
            <Link to={"#"}>
              <FaYoutube />
              <span className="screen-reader-text">YouTube</span>
            </Link>
          </div>
        </section> */}
        <section className="site-map">
          <nav>
            <div>
              <h3 className="link-category">Explore</h3>
              <ul className="links">
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <Link to={"/about"}>About</Link>
                </li>
                <li>
                  <Link to={"/favourites"}>Favourite</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="link-category">Legal</h3>
              <ul className="links">
                <li>Terms of Use</li>
                <li>Privacy Policy</li>
                <li>Accessibility</li>
              </ul>
            </div>
          </nav>
        </section>
        <p className="copyright">&copy; {new Date().getFullYear()} Matt Rao</p>
      </div>
    </footer>
  );
}

export default Footer;

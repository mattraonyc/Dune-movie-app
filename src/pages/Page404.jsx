import { useEffect } from "react";
import { appTitle } from "../global/globals";
import { Link } from "react-router-dom";
import confusedFace from "../images/confused-face.svg"

const Page404 = () => {
  
  // On mount: 
  //    Set document title
  //    Scroll back to the top
  useEffect(() => {
    document.title = `404 - ${appTitle}`;
    window.scrollTo(0, 0);
  }, [])

  return (
      <section className="page page-404">
        <h2>404</h2>
        <div className="content">
          <img src={confusedFace} alt="A confused emoticon" />
          <h3>Page not found.</h3>
          <p>The page you were looking for does not exist.</p>
          <Link to={"/"} className="btn">Go Home</Link>
        </div>
      </section>
  );

};

export default Page404;
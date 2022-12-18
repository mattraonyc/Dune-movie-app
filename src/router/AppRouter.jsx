import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHome from "../pages/PageHome";
import PageAbout from "../pages/PageAbout";
import PageFavourite from "../pages/PageFavourite";
import PageMovie from "../pages/PageMovie";
import PageSearch from "../pages/PageSearch";
import Page404 from "../pages/Page404";

function AppRouter() {
  return (
    <BrowserRouter basename="/dune">
      <a href="#site-main" className="screen-reader-text">Skip to content</a>
      <div className="site-wrapper">
        <Header />
        <main id="site-main">
          <Routes>
              <Route path="/" element={<PageHome />} />
              <Route path="/about" element={<PageAbout />} />
              <Route path="/favourites" element={<PageFavourite />} />
              <Route path="/movie/:id" element={<PageMovie />} />
              <Route path="/search/:query" element={<PageSearch />} />
              <Route path="*" element={<Page404 />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;

export const appTitle = "Dune movie app";
export const endpointGetMovies = "https://api.themoviedb.org/3/movie/";
export const endpointSearchMovies = "https://api.themoviedb.org/3/search/movie";
export const pathToPoster = "https://image.tmdb.org/t/p/w500";
export const pathToBackdrop780 = "https://image.tmdb.org/t/p/w780";
export const pathToBackdrop1280 = "https://image.tmdb.org/t/p/w1280";
export const pathToOriginalImage = "https://image.tmdb.org/t/p/original";
export const pathToActorProfile = "https://image.tmdb.org/t/p/w185";
export const API_KEY = "1c5722ca7dbafafe14457b8383097689";

// Main Navbar Links
export const navMainLinks = [
  {
    name: "Home",
    path: "/"
  },
  {
    name: "About",
    path: "/about"
  },
  {
    name: "Favourites",
    path: "/favourites"
  },
]

// Get localStorage favourites list as an array
export const localListName = "favouriteList";
export const getFavouritesList = () => {
  // Create an array of favourites and copy the local storage list if it exists
  const localListString = localStorage.getItem(localListName)
  let localListArr = [];
  if (localListString !== null && localListString !== "") {
    localListArr = JSON.parse(localListString);
  }

  return localListArr;
}

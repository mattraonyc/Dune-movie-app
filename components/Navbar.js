import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-black fixed top-0 z-10 w-[100vw]">
      <div className="font-bold text-neutral-100 h-[72px] p-4 mx-auto md:ml-8 tracking-widest flex flex-col md:flex-row items-center md:gap-12 gap-4">
        <Link href="/">
          <h1 className="text-3xl md:text-2xl shadow-lg shadow-white">DUNE</h1>
        </Link>
        <Link href="/">
          <h1 className="text-3xl md:text-2xl hidden md:block">Home</h1>
        </Link>
        <Link href="/About">
          <h1 className="text-3xl md:text-2xl hidden md:block">About</h1>
        </Link>
        <Link href="/Favourites">
          <h1 className="text-3xl md:text-2xl hidden md:block">Watchlist</h1>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

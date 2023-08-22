import "./Header.css";

import Navbar from "./Navbar/Navbar";

const Header = (...rest) => {
  return (
    <header className="header">
      <Navbar />
    </header>
  );
};

export default Header;

import './Header.css';

const Header = (...rest) => {
  return (
    <header className='header'>
      <nav className='navbar'>
        <h1 className='title'> Header </h1>
      </nav>
      <hr />
    </header>
  );
};

export default Header;

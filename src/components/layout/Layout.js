import { Footer } from './Footer';
import Header from './Header';
import './Layout.css';

const Layout = ({ children, ...rest }) => {
  return (
    <div>
      <Header />
      <main className='content'>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

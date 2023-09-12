import Footer from './Footer';
import Header from './Header';
import './Layout.css';

const Layout = ({ title, children, ...rest }) => {
  return (
    <div className="layout">
      <Header />
      <main className="content">
        <h2 className="layout-title">{title}</h2>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

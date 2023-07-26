import "./Header.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../shared/modal/Modal";
import { getIsLogged, getUi } from "../../store/selectors";
import { toggleModal } from "../../store/slices/ui";
import { authLogout } from "../../store/slices/auth";

const Header = (...rest) => {
  const isLogged = useSelector(getIsLogged);
  const dispatch = useDispatch();
  const { showModal } = useSelector(getUi);

  const onLogout = () => dispatch(authLogout());

  const handleLogoutClick = () => {
    dispatch(toggleModal());
  };

  const handleShowModalconfirm = async event => {
    onLogout();
    dispatch(toggleModal());
  };

  const handleShowModalCancel = () => {
    dispatch(toggleModal());
  };

  return (
    <header className="header">
      <nav className="navbar">
        <h1 className="title"> Header </h1>
        {isLogged ? (
          <button onClick={handleLogoutClick} variant="primary2">
            Logout
          </button>
        ) : (
          <button as={Link} variant="primary" to="/login">
            Login
          </button>
        )}
      </nav>
      <hr />
      {showModal && (
        <Modal
          title="Abandonar sesión"
          message="¿Estas seguro ? "
          onConfirm={handleShowModalconfirm}
          onCancel={handleShowModalCancel}
        />
      )}
    </header>
  );
};

export default Header;

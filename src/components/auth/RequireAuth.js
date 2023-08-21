import { useSelector } from 'react-redux';
import { getIsLogged } from '../../store/selectors';
import { Navigate, useLocation } from 'react-router-dom';

//NOTE The children property refers to the element that is inside the tag

//DONE Function that I use to cover a component if it is required to have authorization, I pass a location object through the state property to know which route I come from

const RequireAuth = ({ children }) => {
  const isLogged = useSelector(getIsLogged);
  const location = useLocation();

  if (!isLogged) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

export default RequireAuth;

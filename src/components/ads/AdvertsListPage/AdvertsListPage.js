import { getAdverts } from '../../../store/selectors';
import './advertListPage.css';
import AdsList from '../AdsList/AdsList';

const AdvertsListPage = () => {
  return <AdsList selector={getAdverts} />;
};

export default AdvertsListPage;

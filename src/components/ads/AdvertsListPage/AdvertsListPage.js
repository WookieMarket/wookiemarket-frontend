import { getAdverts } from '../../../store/selectors';
import AdsList from '../AdsList/AdsList';

const AdvertsListPage = () => {
  return <AdsList selector={getAdverts} />;
};

export default AdvertsListPage;

import AdsList from '../AdsList/AdsList';
import { getUserAds } from '../../../store/selectors';

const UserAdsListPage = () => {
  return <AdsList selector={getUserAds} />;
};

export default UserAdsListPage;

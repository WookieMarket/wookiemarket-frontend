import Layout from '../layout/Layout';
import { useTranslation } from 'react-i18next';
import AdvertsListPage from './AdvertsListPage';

const HomePage = (props) => {
  const { t } = useTranslation();
  return (
    <Layout title={t('welcome')} {...props}>
      <AdvertsListPage />
    </Layout>
  );
};

export default HomePage;

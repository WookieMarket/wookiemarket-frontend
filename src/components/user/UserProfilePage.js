import Layout from '../layout/Layout';
import Spinner from '../shared/spinner/Spinner';
import ProfileCard from './ProfileCard';
import { getUi } from '../../store/selectors';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function UserProfilePage() {
  const { t } = useTranslation();
  const { isLoading } = useSelector(getUi);
  const { username } = useParams();
  const userAdsURL = `/${username}/ads`;

  return (
    <Layout title="">
      <div>
        {isLoading ? (
          <Spinner message={t('charging...')} />
        ) : (
          <ProfileCard
            cardTitle={t('user profile')}
            userImage="/images/user-avatar-sw.jpg"
            userImageAlt={t('user avatar')}
            username={username}
            userAdsLink={userAdsURL}
            userAdsLinkText={t('user ads')}
          />
        )}
      </div>
    </Layout>
  );
}

export default UserProfilePage;

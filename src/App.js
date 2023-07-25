import './App.css';
import './css/Variables.css';
import './css/Reset.css';
import Layout from './components/layout/Layout';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className='App'>{t('welcome')}</div>
    </Layout>
  );
}

export default App;

import { useTranslation } from 'react-i18next';
import './Footer.css';
export function Footer() {
  const { t } = useTranslation();
  return (
    <footer>
      <hr />
      <div className="footer">
        <p>{t('footer')}</p>
      </div>
    </footer>
  );
}

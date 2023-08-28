import { useTranslation } from 'react-i18next';
import './Footer.css';
const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer>
      <hr />
      <div className="footer">
        <p>{t('@Keepcoding 2023 by Mandalorians')}</p>
      </div>
    </footer>
  );
}

export default Footer;

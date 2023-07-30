import Layout from "../layout/Layout";
import { useTranslation } from "react-i18next";

const HomePage = props => {
  const { t } = useTranslation();
  return <Layout title={t("welcome")} {...props}></Layout>;
};

export default HomePage;

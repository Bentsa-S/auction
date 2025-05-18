import './DemonstrationDescription.css'
import { useLanguage } from '../../../../../LanguageContext';
import { translations } from '../../../../../i18n';

interface Props {
  description: string;
}

const DemonstrationDescription: React.FC<Props> = ({ description }) => {
  const { lang } = useLanguage();
  const t = translations[lang];
  return (
    <div className="vehicle-card">
      <h2 className="title">{t.description}</h2>
      <p>{description}</p>
    </div>
  );
};

export default DemonstrationDescription;

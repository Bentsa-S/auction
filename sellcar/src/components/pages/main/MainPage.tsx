import styles from "./MainPage.module.scss";
import { useLanguage } from '../../../LanguageContext';
import { translations } from '../../../i18n';

const MainPage: React.FC = () => {
  const { lang } = useLanguage();
  const t = translations[lang];
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>{t.mainTitle}</h1>
          <p className={styles.subtitle}>{t.mainSubtitle}</p>
          <button className={styles.button}>{t.viewCars}</button>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.container}>
        <section className={styles.info}>
          <h2>{t.whyUs}</h2>
          <h3>{t.whyUsSubtitle}</h3>
          <ul>
            <li>{t.whyUs1}</li>
            <li>{t.whyUs2}</li>
            <li>{t.whyUs3}</li>
            <li>{t.whyUs4}</li>
            <li>{t.whyUs5}</li>
          </ul>
        </section>
      </div>


        <section className={styles.mapContainer}>
          {/* Тут додайте карту */}
        </section>

        <section className={styles.steps}>
          <h2>{t.buyEasy}</h2>
          <div className={styles.stepsList}>
            <div className={styles.step}>{t.step1}</div>
            <div className={styles.step}>{t.step2}</div>
            <div className={styles.step}>{t.step3}</div>
            <div className={styles.step}>{t.step4}</div>
          </div>
        </section>
      </div>

      <footer className={styles.footer}>
  <div className={styles.container}>
    <div className={styles.columns}>
      
      {/* Лого та короткий опис */}
      <div className={styles.column}>
        <h3 className={styles.logo}>AutoAuction</h3>
        <p>{t.footerDesc}</p>
      </div>

      {/* Навігація */}
      <div className={styles.column}>
        <h4>{t.navigation}</h4>
        <ul>
          <li><a href="/catalog">{t.catalog}</a></li>
          <li><a href="/how-it-works">{t.howItWorks}</a></li>
          <li><a href="/about">{t.about}</a></li>
          <li><a href="/contact">{t.contact}</a></li>
        </ul>
      </div>

      {/* Контакти */}
      <div className={styles.column}>
        <h4>{t.contacts}</h4>
        <p>📍 {t.address}</p>
        <p>📞 +38 (067) 123-45-67</p>
        <p>📧 info@autoauction.ua</p>
      </div>

      {/* Соцмережі */}
      <div className={styles.column}>
        <h4>{t.socials}</h4>
        <div className={styles.socials}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a><br />
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a><br />
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a>
        </div>
      </div>

    </div>

    {/* Низ футера */}
    <div className={styles.bottom}>
      <p>© {new Date().getFullYear()} AutoAuction. {t.rights}</p>
      <a href="/privacy">{t.privacy}</a>
    </div>
  </div>
</footer>

    </div>
    
  );
};

export default MainPage;

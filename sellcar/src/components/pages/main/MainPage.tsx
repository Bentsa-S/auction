import styles from "./MainPage.module.scss";

const MainPage: React.FC = () => {
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>
            Купуй авто з аукціонів США, Кореї та Європи
          </h1>
          <p className={styles.subtitle}>
            Понад 20 000 автомобілів щотижня. Доставка, розмитнення, повний супровід.
          </p>
          <button className={styles.button}>Переглянути авто</button>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.container}>
        <section className={styles.info}>
          <h2>Чому обирають саме нас</h2>
          <h3>Ми знаємо, як зробити імпорт авто простим і вигідним</h3>
          <ul>
            <li>✔ Працюємо з аукціонами Copart, IAAI, Manheim, AutoHero</li>
            <li>✔ Понад 8 років досвіду на ринку авто з-за кордону</li>
            <li>✔ Повний супровід: від підбору до реєстрації авто в Україні</li>
            <li>✔ Прозора калькуляція вартості ще до покупки</li>
            <li>✔ Доставка в будь-яке місто України</li>
          </ul>
        </section>
      </div>


        <section className={styles.mapContainer}>
          {/* Тут додайте карту */}
        </section>

        <section className={styles.steps}>
          <h2>Купуй транспортні засоби на аукціонах ЛЕГКО</h2>
          <div className={styles.stepsList}>
            <div className={styles.step}>ЗАРЕЄСТРУЙСЯ</div>
            <div className={styles.step}>ОБЕРИ</div>
            <div className={styles.step}>ЗРОБИ СТАВКУ</div>
            <div className={styles.step}>ВИГРАЙ</div>
          </div>
        </section>
      </div>

      <footer className={styles.footer}>
  <div className={styles.container}>
    <div className={styles.columns}>
      
      {/* Лого та короткий опис */}
      <div className={styles.column}>
        <h3 className={styles.logo}>AutoAuction</h3>
        <p>
          Допомагаємо обрати та купити авто з аукціонів США, Кореї та Європи. Повний супровід – від підбору до реєстрації.
        </p>
      </div>

      {/* Навігація */}
      <div className={styles.column}>
        <h4>Навігація</h4>
        <ul>
          <li><a href="/catalog">Каталог авто</a></li>
          <li><a href="/how-it-works">Як це працює</a></li>
          <li><a href="/about">Про нас</a></li>
          <li><a href="/contact">Контакти</a></li>
        </ul>
      </div>

      {/* Контакти */}
      <div className={styles.column}>
        <h4>Контакти</h4>
        <p>📍 м. Київ, вул. Велика Васильківська, 55</p>
        <p>📞 +38 (067) 123-45-67</p>
        <p>📧 info@autoauction.ua</p>
      </div>

      {/* Соцмережі */}
      <div className={styles.column}>
        <h4>Ми в соцмережах</h4>
        <div className={styles.socials}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a><br />
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a><br />
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a>
        </div>
      </div>

    </div>

    {/* Низ футера */}
    <div className={styles.bottom}>
      <p>© {new Date().getFullYear()} AutoAuction. Усі права захищені.</p>
      <a href="/privacy">Політика конфіденційності</a>
    </div>
  </div>
</footer>

    </div>
    
  );
};

export default MainPage;

import styles from "./MainPage.module.scss";

const MainPage: React.FC = () => {
  return (
    <div className={styles.container}>
        <header className={styles.header}>
        <div className={styles.stats}>
            <div className={styles.counter}>
            {['0', '2', '0', '2', '0', '0'].map((digit, index) => (
                <span key={index} className={styles.digit}>
                {digit}
                </span>
            ))}
            </div>
            <span>Продано автомобілів</span>
        </div>
        <div className={styles.stats}>
            <div className={styles.counter}>
            {['2', '2', '0', '2', '0', '0'].map((digit, index) => (
                <span key={index} className={styles.digit}>
                {digit}
                </span>
            ))}
            </div>
            <span>Задоволених клієнтів</span>
        </div>
        </header>
      
      <section className={styles.info}>
        <h2>Ла ла ла ла</h2>
        <h3>Да да ми круті</h3>
        <ul>
          <li>✔ Ми там то та</li>
          <li>✔ Ми там то та</li>
          <li>✔ Ми там то та</li>
          <li>✔ Ми там то та</li>
          <li>✔ Ми там то та</li>
        </ul>
      </section>

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
  );
};

export default MainPage;

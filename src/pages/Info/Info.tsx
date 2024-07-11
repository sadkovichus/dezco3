import { Link } from 'react-router-dom';
import s from './Info.module.scss';

const Info = () => {
  return (
    <main className={s.info_page}>
      <section className={s.content}>
        <section className={s.about}>
          <h1 className={s.title}>Info about Dezco</h1>
          <p className={s.text}>
            DEV is a community of software developers getting together to help one another out. The software industry relies on collaboration and
            networked learning. We provide a place for that to happen. DEV is built on Forem: open source software designed to empower communities.
          </p>
          <p className={s.text}>
            Because our application is open source, you can inspect every little detail of the code, or chip in yourself! Forem is available for
            anyone interested in creating similar communities in any niche or passion.
          </p>
          <p className={s.text}>
            Visit our meta Forem, forem.dev for more information. We believe in transparency and adding value to the ecosystem. We hope you enjoy
            poking around and participating!
          </p>
        </section>
        <section className={s.author_info}>
          <h1 className={s.title}>Author info</h1>
          <p className={s.text}>
            I'm Danil Sadkov, Dezco is a portfolio project that was released to the masses for experimental purposes. I'm 16, I haven't fucked yet, so
            you can write to me in <Link to={''}>TG</Link> or by <Link to={''}>email</Link>, I'm ready for offers (It is advisable that you are human and
            preferably female)
          </p>
        </section>
        <section>
          <h1 className={s.title}>Lorem ipsum dolor sit amet.</h1>
          <p className={s.text}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur magni nulla velit provident aliquam ad aperiam laborum ab ipsa, voluptas voluptatum, exercitationem necessitatibus voluptates incidunt perferendis. Inventore doloribus, quae, eligendi tenetur voluptate vero maxime fuga, provident facilis quidem ab sunt!
          </p>
          <p className={s.text}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, consequatur!
          </p>
          <p className={s.text}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi illo, atque ullam error aut quis hic dicta aspernatur necessitatibus architecto!
          </p>
        </section>
        <section>
          <h1 className={s.title}>Fuck my ass</h1>
          <p className={s.text}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam sunt dolorum at illum totam, earum quos beatae reiciendis magni dolores ipsum cupiditate aliquid sit placeat praesentium inventore eius quaerat reprehenderit voluptates minus. Odit, ipsam. Tempore assumenda officia necessitatibus quidem illo eos aliquam quasi ullam explicabo unde impedit autem repellendus consequatur culpa harum aliquid, beatae tenetur voluptatibus? Ut distinctio sunt sapiente beatae quasi doloribus ducimus quos! Blanditiis quasi ipsum asperiores veniam accusantium deleniti dignissimos fugiat sit aliquid aspernatur nesciunt nobis est veritatis quidem, natus esse aliquam quibusdam eaque quo et omnis ex numquam. Quasi veritatis ducimus laudantium totam molestiae quia illum.
          </p>          
        </section>
      </section>
    </main>
  );
};

export default Info;

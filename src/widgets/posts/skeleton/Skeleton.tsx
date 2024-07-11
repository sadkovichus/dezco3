import s from './Skeleton.module.scss';

const Skeleton = () => {
  const skeletons = new Array(2).fill(null).map((_, index) => index);

  return (
    <>
      {skeletons.map(item => (
        <section key={item} className={s.skeleton}>
          <section className={s.top}>
            <div className={`${s.before} ${s.photo}`}></div>
            <p className={s.name}>God</p>
            <p className={s.time}>1488</p>
          </section>
          <section className={s.post_content}>
            <div className={`${s.before} ${s.block} ${s.title}`}></div>
            <div className={`${s.before} ${s.block} ${s.text}`}></div>
          </section>
        </section>
      ))}
    </>
  );
};

export default Skeleton;

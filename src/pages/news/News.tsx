import { Link } from 'react-router-dom';
import s from './News.module.scss';
import { useAppSelector } from '../../store';
import useStorage from '../../hooks/useStorage';
import { useEffect, useState } from 'react';
import Input from '../../widgets/form-components/input/Input';
import TypeNews from '../../types/news/NewsType';
import Button from '../../widgets/form-components/btn/Button';
import { get, getDatabase, ref, set } from 'firebase/database';
import Loader from '../../widgets/loader/Loader';
import likeFn from '../../features/posts/like-fn/LikeFn';
import LittleLoader from '../../widgets/little-laoder/LittleLoader';
import formatter from '../../features/formatNumbers/formatNumbers';

const News = () => {
  const db = getDatabase();
  const selector = useAppSelector(state => state.userSlice);
  const { storageValue } = useStorage('userData', selector);
  const [newsState, setNewsState] = useState<TypeNews[]>([]);
  const [isActivePopup, setIsActivePopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [likeLoader, setLikeLoader] = useState(false);

  const createNews = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let id = Date.now().toString();
      const { title, text } = e.target;
      const now = new Date();
      const USDDate = new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
      const data: TypeNews = await {
        id,
        title: title.value,
        text: text.value.split('\n').filter((item: string) => item !== ''),
        time: USDDate.format(now) + ` - ${now.getHours()}:${now.getMinutes()}`,
        likes: 0,
        liked: [{ id: 'dev' }],
      };
      await set(ref(db, `news/${id}_${storageValue.id}`), data);
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    get(ref(db, `news`)).then(async res => {
      await setNewsState(Object.values(res.val()));
      setIsLoading(false);
    });
  }, []);

  return (
    <section className={s.container}>
      {isActivePopup && (
        <>
          <div onClick={() => setIsActivePopup(false)} className={s.back}></div>
          <form onSubmit={createNews} className={s.popup}>
            <Input bg placeholder='Title...' type='text' name='title' />
            <Input bg placeholder='Text...' as='textarea' type='text' rows={10} cols={30} />
            <Button>Create</Button>
          </form>
        </>
      )}
      {storageValue.role !== 'user' && <button onClick={() => setIsActivePopup(true)} className={s.create}></button>}
      <div className={s.news}>
        {isLoading ? (
          <Loader />
        ) : (
          newsState.map(item => (
            <article className={s.new} key={item.id}>
              <section className={s.top}>
                <img className={s.new_logo} src='../../../public/assets/Logo.svg' alt='' />
                <p className={s.name}>Dezco Company</p>
                <p className={s.time}>{item.time}</p>
              </section>
              <section className={s.content}>
                <Link to={item.id} className={s.title}>
                  {item.title}
                </Link>
                <Link to={item.id}>
                  {item.newsImg ? (
                    <div className={s.new_img}>
                      <img src={item.newsImg} alt='' />
                    </div>
                  ) : (
                    <p className={s.text}>
                      {item.text.map((item, index) => (
                        <p key={index}>{item}</p>
                      ))}
                    </p>
                  )}
                </Link>
              </section>
              <button onClick={e => likeFn(e, item, undefined, setLikeLoader, setNewsState, storageValue, 'news/')}>
                {likeLoader && <LittleLoader />}
                <img src='../../../public/assets/pages/posts/icons8-top-64 2.svg' alt='' />
                {formatter(item.likes) || 0}
              </button>
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default News;

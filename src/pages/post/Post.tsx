import { useEffect, useState } from 'react';
import s from './Post.module.scss';
import timeS from '../../main-styles/time-style/RoleTimeStyle.module.scss';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import TypePost from '../../types/entities/posts/TypePost';
import { DataSnapshot, child, get, getDatabase, ref, set } from 'firebase/database';
import tips from '../../entities/profile/tips/tips';
import { UserState } from '../../types/slice';
import Loader from '../../widgets/loader/Loader';
import { useAppSelector } from '../../store';
import useStorage from '../../hooks/useStorage';
import LittleLoader from '../../widgets/little-laoder/LittleLoader';
import formatter from '../../features/formatNumbers/formatNumbers';
import PostImgFocus from '../../widgets/post/PostImgFocus';

const Post = () => {
  const { user, id } = useParams();
  const [post, setPost] = useState<TypePost>();
  const db = getDatabase();
  const [currentTips, setCurrentTips] = useState(tips['user']);
  const [userData, setUser] = useState<UserState>();
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState<{ isLoading: boolean; isError?: boolean }>({ isLoading: true, isError: false });
  const selector = useAppSelector(state => state.userSlice);
  const { storageValue } = useStorage('userData', selector);
  const [likeLoader, setLikeLoader] = useState(false);
  const [isActiveImg, setIsActiveImg] = useState(false);
  const [focusImg, setFocusImg] = useState('');

  useEffect(() => {
    setIsLoading({ isLoading: true });
    const getData = async () => {
      let postSnapshot: DataSnapshot = await get(child(ref(db), `posts/${id}_${user}`));
      let userSnapshot: DataSnapshot = await get(child(ref(db), `users/${user}`));
      if (!postSnapshot.val()) return setIsLoading({ isLoading: false, isError: true });
      await Promise.all([
        setUser(userSnapshot.val()),
        setCurrentTips(tips[userSnapshot.val().role as 'user' | 'admin' | 'god']),
        setPost(() => postSnapshot.val()),
      ]);
      setIsLoading({ isLoading: false, isError: false });
    };
    getData();
  }, []);

  const likeFn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.target.dataset.name === 'post-like-loader') return false;

    setLikeLoader(true);

    const isLiked = post?.liked.find(item => item.id === storageValue.id);
    console.log(user);
    console.log(post?.liked.find(item => item.id === user));
    let returnData = post as TypePost;

    if (isLiked) {
      returnData = {
        ...returnData,
        likes: (returnData.likes -= 1),
        liked: [...returnData.liked.filter(item => item.id !== storageValue.id)],
      };
    } else {
      returnData = {
        ...returnData,
        likes: (returnData.likes += 1),
        liked: [...returnData.liked, { id: storageValue.id }],
      };
    }
    await set(ref(db, `posts/${id}_${user}`), returnData);
    setPost(returnData as TypePost);
    setTimeout(() => setLikeLoader(false), 1000);
  };

  useEffect(() => {
    console.log(isActiveImg);
  }, [isActiveImg])

  return (
    <section className={s.post}>
      <PostImgFocus setIsActive={setIsActiveImg} isActive={isActiveImg} img={focusImg} />
      {isLoading.isLoading ? (
        <Loader />
      ) : !isLoading.isError ? (
        <section className={s.content}>
          <section className={s.top}>
            <Link className={s.photo} to={`/users/${userData?.id}`}>
              <img src={userData?.photoURL} alt='' />
            </Link>
            <Link className={s.name} to={`/users/${userData?.id}`}>
              {userData?.name}
            </Link>
            <div className={s.role_container}>
              <article className={`${isActive ? s.active_role_desc : ''} ${s.role_description}`}>
                <span>Role: {currentTips.title || ''}</span>
                <span>Desc: {currentTips.text || ''}</span>
              </article>
              <p
                onMouseLeave={() => setIsActive(false)}
                onMouseEnter={() => setIsActive(true)}
                className={`${s.role} ${s[userData?.role as 'admin' | 'user' | 'god']}`}>
                {currentTips.title || ''}
              </p>
            </div>
            <p className={`${timeS[userData?.role as 'admin' | 'user' | 'god']} ${s.time}`}>{post?.time}</p>
          </section>
          <section className={s.post_content}>
            {post?.postImg && (
              <div className={s.post_photo}>
                {post.postImg.map(item => (
                  <div
                    onClick={() => {
                      console.log('click')
                      setIsActiveImg(true);
                      setFocusImg(item);
                    }}
                    key={item}>
                    <img src={item} alt='' />
                  </div>
                ))}
              </div>
            )}
            <p className={s.title}>{post?.title}</p>
            {post?.text && (
              <article className={s.text}>
                {post?.text.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </article>
            )}
          </section>
          <section className={s.interactive_panel}>
            <button onClick={likeFn} className={`${post?.liked.filter(item => item.id === storageValue.id)[0] ? s.liked : ''} ${s.interactive_btn}`}>
              {likeLoader && <LittleLoader />}
              <img src='../../../public/assets/pages/posts/icons8-top-64 2.svg' alt='' />
              {formatter(post?.likes as number) || 0}
            </button>
          </section>
        </section>
      ) : (
        <p>Not found post</p>
      )}
    </section>
  );
};

export default Post;

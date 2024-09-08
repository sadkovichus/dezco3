import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import s from './Post.module.scss';
import timeS from '../../main-styles/time-style/RoleTimeStyle.module.scss';
import { Link } from 'react-router-dom';
import formatter from '../../features/formatNumbers/formatNumbers';
import TypePost from '../../types/entities/posts/TypePost';
import { UserState } from '../../types/slice';
import useStorage from '../../hooks/useStorage';
import { useAppSelector } from '../../store';
import { get, getDatabase, ref, remove } from 'firebase/database';
import getPost from '../../features/posts/gettongPost';
import LittleLoader from '../../widgets/little-laoder/LittleLoader';
import likeFn from '../../features/posts/like-fn/LikeFn';

type Props = {
  post: { post: TypePost; author: UserState };
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setPosts: any;
};

const Post = ({ post, setIsLoading, setPosts }: Props) => {
  const selector = useAppSelector(state => state.userSlice);
  const { storageValue } = useStorage('userData', selector);
  const db = getDatabase();
  const [likeLoader, setLikeLoader] = useState(false);
  const [likedUsers, setLikedUsers] = useState<UserState[]>([]);

  useEffect(() => {
    setLikedUsers([]);
    post.post.liked.forEach(item => {
      if (item.id === 'dev') return false;
      get(ref(db, `users/${item.id}`)).then(res => {
        setLikedUsers(prev => [...prev, res.val()]);
      });
    });
  }, []);

  useEffect(() => {
    console.log(likedUsers);
  }, [likedUsers]);

  const deleteFn = async (currentPost: TypePost) => {
    await remove(ref(db, `posts/${currentPost.id}_${storageValue.id}`));
    getPost(setIsLoading, setPosts);
    location.reload();
  };

  return (
    <article key={post.post.id} className={s.post}>
      <section className={s.top}>
        <Link className={`${post.author.photoURL ? '' : s.null_path} ${s.photo}`} to={`/users/${post.author.id}`}>
          {post.author.photoURL && <img className={s.photo_img} src={post.author.photoURL} alt='' />}
        </Link>
        <Link className={s.name} to={`/users/${post.author.id}`}>
          {post.author.name}
        </Link>
        <p className={`${timeS[post.author.role]} ${s.time}`}>{post.post.time}</p>
        <div className={s.right_panel}>
          {post.author.id === storageValue.id ? (
            <button onClick={() => deleteFn(post.post)} className={` ${s.delete} ${s.top_btn}`}>
              delete
            </button>
          ) : (
            <button className={` ${s.follow} ${s.top_btn}`}>Follow</button>
          )}
        </div>
      </section>
      <section className={s.post_content}>
        {post.post.title && (
          <Link to={`${post.author.id}/${post.post.id}`} className={s.title}>
            {post.post.title}
          </Link>
        )}
        {post.post.text && (
          <Link to={`${post.author.id}/${post.post.id}`} className={s.text}>
            {post.post.postImg ? (
              <div className={s.imgs}>
                {post.post.postImg.map(item => (
                  <div className={s.post_photo}>
                    <img src={item} alt='' />
                  </div>
                ))}
              </div>
            ) : (
              post.post.text.map(item => item)
            )}
          </Link>
        )}
      </section>
      <section className={s.interactive_panel}>
        <button
          onClick={e => likeFn(e, post.post, post.author, setLikeLoader, setPosts, storageValue, 'posts/')}
          className={`${post.post.liked.filter(item => item.id === storageValue.id)[0] ? s.liked : ''} ${s.interactive_btn}`}>
          {likeLoader && <LittleLoader />}
          <img src='../../../public/assets/pages/posts/icons8-top-64 2.svg' alt='' />
          {formatter(post.post.likes) || 0}
        </button>
        <section className={s.liked_users}>
          {likedUsers.slice(0, 3).map(item => (
            <Link to={`users/${item.id}`}>
              <img src={item.photoURL} alt='' />
            </Link>
          ))}
        </section>
        <Link to={`${post.author.id}/${post.post.id}/comments`} className={`${s.chat_btn} ${s.interactive_btn}`}>
          <svg width='96' height='96' viewBox='0 0 96 96' fill='none' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'>
            <rect width='96' height='96' fill='url(#pattern0)' />
            <defs>
              <pattern id='pattern0' patternContentUnits='objectBoundingBox' width='1' height='1'>
                <use xlinkHref='#image0_337_37' transform='scale(0.0104167)' />
              </pattern>
              <image
                id='image0_337_37'
                width='96'
                height='96'
                xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAACoElEQVR4nO2czWoUQRRGy/gvqI8wBCIR0SphQIKgXRdG6y6Cu34Vlw6IC/HvVdzoG6jgNnmJLNWgxkQdmTiCiD3j0NNzq+1zoHYhN1WnvrpNQco5AAAAAAAAAACACi4Xty8G0adBdDuI7gbRUbdH+hAkbfmoj67eHFxobOMURXHMx/TMix7YT1qzHF5030t6WJbl0SYW/6X1BENLhpf0fKESJkeO+cRCi4aX9GAhi39F0jrHjs4vIaY9f+PWKrtfDJMQ9f4CBKQt6ziHlg4f9W1tAT6m99YTCW0dUXfqJyCmb9OKuOFwxXWU/ubmmekJSB9rF0FANQgwBgHGIMAYBOQuQNKn2kVowtVsbJSnEWAIAoxBgDEIMAYBmQsIop+z+woyvyCT6WOeuSBAbAX0iuIUCRAEdPYI6pEARUCXm3BvVgJi2pvn9/19wfgKqgQBYpuANdWTrUvA/8QaAmxBgDEIyF/Al9pF6AHVIMAYBBhzqSxPcAQZ0koBOV8tzAsCJG8B4/8Zq12EBFSDACEBne4B/X7/OEeQIIAECE14lOkRdFC7CHdB1SDAGAQYgwBjxo+Y0AMMQUDuAmL6WrsIX0HVIMAYBBiDAGMQYMz4XTiacMYCxh8wtYv4qO+WfYcfMh0+6utrqueWKoAny/SPG870av36nbOHizMcrjQvIKbH1jsvZJqEpSRg8mzlvvWkQ4ZJ6A8G52f83PfaAkiBTkvCm6UIOHy6WPSF9a4L7RuLEfBLQhB9wiu6aiPg954waczbP59uN99lo04J6BohprsIaK8EEmAsAQHWEhb6B4CbWwJrZiyhifrg/l0Ci2Usocn64GZLYJGMJSyjPrhqCc65IyyQoQQEGEtAgLEEBBhLQIAhPuq9Lj/pBgAAbio/ADUMSazL5t/BAAAAAElFTkSuQmCC'
              />
            </defs>
          </svg>
          {post.post.comments ? post.post.comments.length : 0}
        </Link>
      </section>
    </article>
  );
};

export default Post;

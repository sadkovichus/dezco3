import { useParams } from 'react-router';
import s from './Comments.module.scss';
import { useEffect, useState } from 'react';
import { get, getDatabase, ref } from 'firebase/database';
import { TypeComment } from '../../types/entities/posts/TypePost';

const Comments = () => {
  const { user, id } = useParams();
  const [comments, setComments] = useState<TypeComment[]>([]);
  const db = getDatabase();

  useEffect(() => {
    get(ref(db, `posts/${id}_${user}/comments`)).then(res => {
      console.log(res.val());
      if (res.val()) {
        setComments(res.val());
      } else {
        console.log('Нет коментов');
      }
    });
  }, []);

  return (
    <section className={s.comments}>
      <div className={s.container}>
        {comments.map(item => (
            <article className={s.comment}>
                <section className={s.top}>
                    <div className={s.photo}>
                        <img src={item.author.photoURL} alt="" />
                    </div>
                </section>
            </article>
        ))}
      </div>
    </section>
  );
};

export default Comments;

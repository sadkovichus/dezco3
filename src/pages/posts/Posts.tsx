import { Link } from 'react-router-dom';
import s from './Posts.module.scss';
import { useEffect, useState } from 'react';
import TypePost from '../../types/entities/posts/TypePost';
import Skeleton from '../../widgets/posts/skeleton/Skeleton';
import { RoutesName } from '../../app/Routing/Routing';
import { UserState } from '../../types/slice';
import getPost from '../../features/posts/gettongPost';
import Post from '../../entities/post/Post'

const Posts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<{ post: TypePost; author: UserState }[]>([]);

  useEffect(() => {
    getPost(setIsLoading, setPosts);
  }, []);

  return (
    <section className={s.posts}>
      <div className={s.container}>
        {isLoading ? (
          <Skeleton />
        ) : !posts.length ? (
          <div className={s.message}>
            <p className={s.not_posts_message}>
              This place is empty for now, you can post something using this <Link to={RoutesName.NewPost}> link</Link>
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <Post post={post} setPosts={setPosts} setIsLoading={setIsLoading}/>
          ))
        )}
      </div>
    </section>
  );
};

export default Posts;

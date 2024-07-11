import { ReactNode } from 'react';
import s from './Another.module.scss';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '../../../store';
import { UserState } from '../../../types/slice';
import useAuthFrom from '../../../hooks/auth/getAuthFromDatabase';
import { setUser } from '../../../store/slices/userSlices/userSlice';
import { setPosts } from '../../../store/slices/postsSlices/postSlice';

interface IProps {
  pattern: Record<
    'create' | 'signIn',
    {
      title: string;
      component: ReactNode;
      form: ReactNode;
    }
  >;
  data: 'create' | 'signIn';
}

const Another = ({ pattern, data }: IProps) => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const googleFunc = () => {
    signInWithPopup(auth, provider)
      .then(async (result: any) => {
        if (!result.user) return false;
        const { user } = result;

        const obj: UserState = await {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          password: '',
          friends: '[]',
          isOnline: false,
          checkMark: false,
          role: 'user',
        };
        await useAuthFrom(obj, `users/${user.uid}`, dispatch, setUser);
        await useAuthFrom(obj, `users/${user.uid}`, dispatch, setPosts);
        navigate('/', { replace: false });
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <div className={s.another}>
      <button onClick={googleFunc} className={`${s.another_btn} ${s.google}`}>
        <img
          className={s.another_img}
          src='../../../public/assets/auth/icons8-google.svg'
        />
        <p>{pattern[data].title} Google</p>
      </button>
    </div>
  );
};

export default Another;

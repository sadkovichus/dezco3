import s from './LogIn.module.scss';
import Input from '../input/Input';
import SendBtn from '../send-btn/SendBtn';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { get, getDatabase, ref } from 'firebase/database';
import { useAppDispatch } from '../../../store';
import { useNavigate } from 'react-router';
import { setUser } from '../../../store/slices/userSlices/userSlice';

const LogIn = () => {
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const db = getDatabase();

  const submit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (!data.password.toString().length) return false;
    signInWithEmailAndPassword(auth, data.email.toString(), data.password.toString()).then(async ({ user }) => {
      if (!user) return false; // Error!
      await get(ref(db, `users/${user.uid}`)).then(result => {
        if (!result.val()) return false; // Error!
        dispatch(setUser(result.val()));
      });
      navigate('/', { replace: false });
    });
  };

  return (
    <form onSubmit={submit} action='' className={s.auth_form}>
      <Input name='email' type='email' title='Email' className={s.email} />
      <Input name='password' type='password' title='Password' />
      <SendBtn>Log in</SendBtn>
    </form>
  );
};

export default LogIn;

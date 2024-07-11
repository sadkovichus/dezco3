import s from './CreateUser.module.scss';
import Input from '../input/Input';
import SendBtn from '../send-btn/SendBtn';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { ChangeEvent } from 'react';
import { UserState } from '../../../types/slice';
import { useAppDispatch } from '../../../store';
import { useNavigate } from 'react-router';
import { getDatabase, ref, set } from 'firebase/database';
import { setUser } from '../../../store/slices/userSlices/userSlice';

const CreateUser = () => {
  const auth = getAuth();
  const db = getDatabase();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (data.password !== data.conf_password || !data.password.toString().length) return false;
    createUserWithEmailAndPassword(auth, data.email.toString(), data.password.toString())
      .then(async ({user}) => {
        const userData: UserState = {
          id: user.uid,
          name: data.name.toString() || user.displayName || '',
          email: user.email || data.email.toString(),
          photoURL: user.photoURL || '',
          password: data.password.toString(),
          friends: '[]',
          checkMark: false,
          level: 1,
          role: 'user'
        }
        await set(ref(db, `users/${user.uid}`), userData); // если не работает то поставить вниз
        dispatch(setUser(userData));
        navigate('/', {replace: false})
      })
  }

  return (
    <form onSubmit={submit} action='' className={s.auth_form}>
      <Input type='name' title='Name' className={s.name} />
      <Input type='email' title='Email' className={s.email} />
      <Input type='password' title='Password' className={s.password} />
      <Input type='conf_password' title='Confirm password' />
      <SendBtn>Create</SendBtn>
    </form>
  );
};

export default CreateUser;

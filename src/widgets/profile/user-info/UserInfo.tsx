import { useEffect, useId, useState } from 'react';
import createPhoto from '../../../entities/profile/createPhoto/createPhoto';
import useStorage from '../../../hooks/useStorage';
import { useAppDispatch, useAppSelector } from '../../../store';
import tips from '../../../entities/profile/tips/tips';
import s from './UserInfo.module.scss';
import { useNavigate } from 'react-router';
import { getAuth, signOut } from 'firebase/auth';
import { UserState } from '../../../types/slice';
import { removeUser } from '../../../store/slices/userSlices/userSlice';

type Props = {
  user: UserState;
  isMe: boolean;
};

const UserInfo = ({ user, isMe }: Props) => {
  const selector = useAppSelector(state => state.userSlice);
  const id = useId();
  const { setValue, storageValue } = useStorage('userData', selector);
  const dispatch = useAppDispatch();
  const currentTips = tips[user.role as 'user' | 'admin' | 'god'];
  const [isActive, setIsActive] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  const [friendsLength, setFriendsLength] = useState(0);

  const leave = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
        navigate('/', { replace: true });
        console.log('sign out');
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    let arr = user.friends.replaceAll("'", '').replaceAll('[', '').replaceAll(']', '').replaceAll('"', '').replaceAll(' ', '').split(',');
    console.log(arr);
    if (arr[0] === '') {
      setFriendsLength(0);
    } else {
      setFriendsLength(arr.length);
    }
  }, [user]);

  return (
    <>
      <div className={`${s.prev} ${s.top_prev}`}></div>
      <section className={s.content}>
        <div className={s.top_info}>
          {isMe ? (
            <label htmlFor={id} className={s.user_photo}>
              <input onChange={e => createPhoto(e, storageValue, setValue, dispatch)} id={id} type='file' />
              {storageValue.photoURL && <img src={storageValue.photoURL} alt='' />}
            </label>
          ) : (
            <div className={s.user_photo}>
              <img className={s.user_photo} src={user.photoURL} alt='' />
            </div>
          )}
          <div className={s.right}>
            <div className={s.top_text}>
              <p>{user.name.split(' ')[0] || user.email}</p>
              <div className={`${isActive ? s.active_role_desc : ''} ${s.role_description}`}>
                <span>Role: {currentTips.title}</span>
                <span>Desc: {currentTips.text}</span>
              </div>
              <p onMouseLeave={() => setIsActive(false)} onMouseEnter={() => setIsActive(true)} className={`${s.role} ${s[user.role]}`}>
                {currentTips.title}
              </p>
              <p>{user.balance ? user.balance.toLocaleString('en') : 0} $</p>
            </div>
            <ul className={s.public_info}>
              <li>
                <img src='../../../../public/assets/widgets/profile/icons8-друзья-96 1 (1).svg' alt='' />
                {friendsLength}
              </li>
            </ul>
          </div>
        </div>
        {isMe && (
          <button className={s.leave} onClick={leave}>
            leave
          </button>
        )}
      </section>
    </>
  );
};

export default UserInfo;

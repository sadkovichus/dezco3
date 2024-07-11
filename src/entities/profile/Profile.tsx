import { useEffect, useState } from 'react';
import UserInfo from '../../widgets/profile/user-info/UserInfo';
import s from './Profile.module.scss';
import useStorage from '../../hooks/useStorage';
import { useAppSelector } from '../../store';
import { useParams } from 'react-router';
import { UserState } from '../../types/slice';
import { get, getDatabase, ref } from 'firebase/database';
import Loader from '../../widgets/loader/Loader';

const Profile = () => {
  const [isMe, setIsMe] = useState(true);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<{ isLoading: boolean; isError?: boolean }>({ isLoading: true, isError: false });
  const selector = useAppSelector(state => state.userSlice);
  const { storageValue } = useStorage('userData', selector);
  const [currentUser, setCurrentUser] = useState<UserState>(selector);
  const db = getDatabase();
  const [_, setNotFound] = useState('');

  const UserInfoComponent = <UserInfo user={currentUser} isMe={isMe} />;

  useEffect(() => {
    if (id === storageValue.id || id === selector.id) {
      setIsMe(true);
      setIsLoading({ isLoading: false });
      return setCurrentUser(storageValue || selector);
    }
    setIsLoading({ isLoading: true });
    setIsMe(false);
    get(ref(db, `users/${id}`))
      .then(async data => {
        if (!data.val()) {
          setIsLoading({ isLoading: false, isError: true });
        } else {
          await setCurrentUser(await data.val());
          setIsLoading({ isLoading: false });
        }
      })
      .catch(error => console.log(error));
  }, [id, selector]);

  return <div className={s.profile}>{isLoading.isLoading ? <Loader /> : !isLoading.isError ? UserInfoComponent : <p>User not found</p>}</div>;
};

export default Profile;
